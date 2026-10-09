/* Read-only audit of catalog joins, historical identity, variant photos and quantities. */
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function(request, ...args) {
  return originalResolve.call(this, request.startsWith("@/") ? path.join(root, "src", request.slice(2)) : request, ...args);
};
require.extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText, filename);
const {products, brands, manufacturers, markets} = require(path.join(root,"src/data/products.ts"));
const {categories} = require(path.join(root,"src/data/categories.ts"));
const {formats} = require(path.join(root,"src/data/formats.ts"));
const {searchProducts} = require(path.join(root,"src/lib/catalog.ts"));
const {validateVerifiedProduct} = require(path.join(root,"src/lib/validation.ts"));
const {expandedProducts} = require(path.join(root,"src/data/catalog-expansion.ts"));
const baseline = JSON.parse(fs.readFileSync(path.join(root,"scripts/research/catalog-baseline-2026-10-09.json"),"utf8"));
const failures = [];
const assert = (condition, message) => {if (!condition) failures.push(message);};
const unique = (items, name) => {for (const key of ["id","slug"]) assert(new Set(items.map(item=>item[key])).size===items.length, `${name}: duplicate ${key}`);};
for (const [name,items] of Object.entries({products,brands,manufacturers,markets})) unique(items,name);
const productIds = new Set(products.map(p=>p.id));
for (const id of baseline.productIds) assert(productIds.has(id),`Original record removed: ${id}`);
const ids = items => new Set(items.map(item=>item.id));
const brandIds=ids(brands), makerIds=ids(manufacturers), categoryIds=ids(categories), formatIds=ids(formats), marketIds=ids(markets);
for (const brand of brands) {
  assert(brand.brandCountryBasis?.en && brand.brandCountryBasis?.zh && brand.sources.length, `${brand.id}: missing brand-country evidence or explicit uncertainty`);
  for(const id of brand.manufacturerIds ?? []) assert(makerIds.has(id),`${brand.id}: broken maker ${id}`);
}
for (const p of products) {
  assert(brandIds.has(p.brandId),`${p.id}: broken brand join`);
  if(p.manufacturerId) assert(makerIds.has(p.manufacturerId),`${p.id}: broken manufacturer join`);
  for(const error of validateVerifiedProduct(p)) assert(false,`${p.id}: ${error}`);
  assert(categoryIds.has(p.categoryId) && formatIds.has(p.formatId),`${p.id}: broken taxonomy`);
  assert(p.sources.length,`${p.id}: no sources`);
  assert(p.subcategory && p.physicalFormDetails?.useMode && p.physicalFormDetails?.unitization && p.flavor?.name,`${p.id}: incomplete structural fields`);
  for(const m of p.markets) assert(marketIds.has(m),`${p.id}: unknown market ${m}`);
  for(const listing of p.marketListings ?? []) {
    assert(p.markets.includes(listing.marketId),`${p.id}: listing outside documented markets`);
    if(listing.status==="marketed") assert(listing.officialProductSource?.sourceUrl && listing.regulatorySource?.sourceUrl && p.status!=="discontinued",`${p.id}: marketed without required evidence`);
  }
  if(p.productImage) {
    assert(fs.existsSync(path.join(root,"public",p.productImage)),`${p.id}: missing image`);
    assert(p.imageSource,`${p.id}: unattributed image`);
    assert(fs.statSync(path.join(root,"public",p.productImage)).size>500,`${p.id}: invalid image file`);
  }
  if(p.imageRegion) {
    const r=p.imageRegion;
    assert(r.x>=0 && r.y>=0 && r.width>0 && r.height>0 && r.x+r.width<=r.sourceWidth && r.y+r.height<=r.sourceHeight,`${p.id}: image framing outside source`);
  }
  if(p.physicalFormDetails?.unitization==="loose") assert(p.nicotine?.nicotinePerUnit===undefined,`${p.id}: fabricated fixed portion for loose tobacco`);
  if(p.recordKind==="historical") {
    assert(p.recordContext?.en && p.recordContext?.zh,`${p.id}: historical record lacks period context`);
    assert(p.sources.some(s=>["scientific","regulator","government","manufacturer","official-brand"].includes(s.sourceType)),`${p.id}: historical record lacks documentary evidence`);
    if(p.verificationStatus==="verified") assert(p.productImage && p.imageSource,`${p.id}: verified historical record lacks exact photo evidence`);
  }
}
const huabao=brands.find(b=>b.id==="huabao");
assert(huabao.brandCountry==="China", "HUABAO country incorrect");
assert(products.filter(p=>p.brandId==="huabao").every(p=>!p.markets.includes("china")),"HUABAO market inferred from brand country");
assert(searchProducts({query:"Red Man"}).some(p=>p.id==="americas-best-original-blend"),"Historical alias is not searchable");
assert(searchProducts({recordKind:"historical"}).length===products.filter(p=>p.recordKind==="historical").length,"Historical filter mismatch");
for(const p of expandedProducts) {
  assert(p.verificationStatus==="pending" || (p.productImage && p.imageSource),`${p.id}: missing image incorrectly verified`);
  assert(p.lastVerified==="2026-10-09" && p.sources.every(s=>s.sourceUrl && s.accessedAt==="2026-10-09"),`${p.id}: expansion provenance missing`);
}
const veloUS=products.filter(p=>p.brandId==="velo" && p.markets.includes("united-states"));
assert(veloUS.length>0 && veloUS.every(p=>p.manufacturerId!=="bat-velo-sites" && !p.sources.some(s=>s.sourceUrl?.includes("velo-packaging"))),"VELO US inherits UK factory evidence");
assert(products.filter(p=>p.brandId==="velo" && p.flavor?.name!=="Smooth Papaya").every(p=>!p.flavor?.sensoryNotes?.includes("Papaya with tropical")),"VELO inherits unrelated papaya description");
assert(products.filter(p=>p.brandId==="nicorette").every(p=>!p.sources.some(s=>s.sourceUrl?.includes("/undefined/"))),"Nicorette inherits undefined medicine reference");
assert(searchProducts({query:"LOOP Cassis Bliss Strong"}).filter(p=>p.brandId==="loop").length===1,"Renamed LOOP product is missing or duplicated");
assert(products.filter(p=>p.brandId==="velo" && p.productName==="VELO Wintry Watermelon 10 mg").length===1,"Cross-market VELO record duplicated");
const allProductSlugs=new Set();
for(const p of products) for(const slug of [p.slug,...(p.legacySlugs??[])]) {assert(!allProductSlugs.has(slug),`${p.id}: ambiguous current/legacy slug ${slug}`);allProductSlugs.add(slug);}
const normalizedNames=new Map();
for(const p of products) {const key=p.brandId+"|"+p.productName.toLowerCase().replace(/[^a-z0-9]/g,""); assert(!normalizedNames.has(key),`${p.id}: duplicate name with ${normalizedNames.get(key)}`);normalizedNames.set(key,p.id);}
console.log(JSON.stringify({products:products.length,brands:brands.length,historical:products.filter(p=>p.recordKind==="historical").length,photos:products.filter(p=>p.productImage).length,brandCountries:[...new Set(brands.map(b=>b.brandCountry))],marketedPairs:products.flatMap(p=>p.marketListings??[]).filter(x=>x.status==="marketed").length,failures},null,2));
if(failures.length) process.exitCode=1;
