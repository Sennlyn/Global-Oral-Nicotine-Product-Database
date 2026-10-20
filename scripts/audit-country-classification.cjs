/* Brand-country classification must never derive from a product's sales markets. */
require("./audit-catalog.cjs");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { brands, products } = require("../src/data/products.ts");
const { countryProfiles, confirmedCountryProfiles } = require("../src/lib/countries.ts");
const { countryForBrand, brandCountries } = require("../src/data/countries.ts");
const { searchProducts } = require("../src/lib/catalog.ts");
const { asianProducts } = require("../src/data/asian-products.ts");
const { hasVariantImage } = require("../src/lib/product-image-policy.ts");

// A committed snapshot also works after this update is committed or shallow-cloned.
const baseline = require("./research/catalog-baseline-2026-10-19.json");
const currentIds = new Set(products.map(product => product.id));
assert(baseline.productIds.every(id => currentIds.has(id)), "A pre-existing product was removed");
assert.equal(products.length, baseline.productIds.length + asianProducts.length);

assert.equal(new Set(countryProfiles.flatMap(country => country.brands.map(brand => brand.id))).size, brands.length);
assert.equal(countryProfiles.reduce((sum, country) => sum + country.products.length, 0), products.length);
assert.equal(countryProfiles.reduce((sum, country) => sum + country.brands.length, 0), brands.length);
for (const brand of brands) {
  if (brand.brandCountry) assert(brandCountries.some(country => country.name.en === brand.brandCountry), `${brand.id}: country missing from registry`);
  const slug = countryForBrand(brand).slug;
  assert(searchProducts({ brandCountry: slug }).some(product => product.brandId === brand.id), `${brand.id}: country filter missing product`);
}
for (const profile of countryProfiles) {
  const matches = searchProducts({ brandCountry: profile.slug });
  assert.deepEqual(new Set(matches.map(product => product.id)), new Set(profile.products.map(product => product.id)));
}
assert.equal(brands.find(brand => brand.id === "huabao").brandCountry, "China");
assert(products.filter(product => product.brandId === "huabao").every(product => product.markets.length === 0));
const japan = searchProducts({ brandCountry: "japan" });
assert.equal(japan.length, 8);
assert(japan.some(product => product.countryOfOrigin === "Sweden"));
assert(!searchProducts({ brandCountry: "sweden" }).some(product => product.brandId === "zerostyle-snus"));
assert.equal(searchProducts({ brandCountry: "south-korea" }).length, 2);
assert.equal(searchProducts({ brandCountry: "russia" }).length, 6);
assert.deepEqual(countryProfiles.find(country => country.slug === "russia").regions, ["asia", "europe"]);
assert.equal(confirmedCountryProfiles.filter(country => country.slug === "russia").length, 1);
for (const product of asianProducts) {
  assert.equal(product.recordKind, "historical");
  assert(product.sources.some(source => ["manufacturer", "government", "scientific"].includes(source.sourceType)));
  assert(product.markets.length > 0);
  if (hasVariantImage(product)) {
    assert.equal(product.imageMatch, "exact-variant");
    assert(product.imageCaption.en && product.imageCaption.zh && product.imageSource.sourceUrl);
  }
}
for (const key of ["spice-strong", "deep-menthol-strong"]) assert(!hasVariantImage(asianProducts.find(product => product.id === `zerostyle-snus-${key}`)));
const nicostop = products.find(product => product.id === "nicostop-gum-2mg-historical");
assert.equal(nicostop.nicotine.totalNicotine, 2 * 32);
assert.equal(products.find(product => product.id === "nicorak-oral-film-2-5mg-historical").specifications.filmThicknessMm, 0.104);
for (const filename of ["src/components/layout/header.tsx", "src/components/layout/footer.tsx", "src/app/page.tsx", "src/components/products/product-explorer.tsx"]) {
  const text = fs.readFileSync(path.resolve(__dirname, "..", filename), "utf8");
  assert(!text.includes('href: "/markets"') && !text.includes('href="/markets"') && !text.includes('name="market" label="Market"'), `${filename}: retired market classification remains`);
}
console.log(JSON.stringify({ baselineProductsPreserved: baseline.productIds.length, added: asianProducts.length, addedMatchedPhotos: asianProducts.filter(hasVariantImage).length, confirmedCountries: confirmedCountryProfiles.map(country => ({ country: country.name.en, brands: country.brands.length, variants: country.products.length })), unconfirmedBrands: countryProfiles.find(country => country.slug === "unconfirmed").brands.length, result: "pass" }, null, 2));
