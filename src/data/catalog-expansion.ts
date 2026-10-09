import type { Brand, Product, Source } from "@/types/catalog";

/** Each row below is an observed variant, never a brand-wide strength cross-product. */
const reviewed = "2026-10-09";
const source = (id: string, sourceName: string, sourceUrl: string, sourceType: Source["sourceType"], notes?: string): Source => ({
  id, sourceName, sourceUrl, sourceType, accessedAt: reviewed, verifiedAt: reviewed, notes,
});
const refs = {
  veloUK: source("velo-uk-range-20261009", "VELO UK: all cans and named strengths", "https://www.velo.com/en-gb/collections/all", "official-brand"),
  veloUS: source("velo-us-range-20261009", "VELO USA: original range", "https://www.velo.com/us/secure/products/velo.html", "official-brand"),
  veloPlus: source("velo-plus-range-20261009", "VELO USA: PLUS range", "https://www.velo.com/us/secure/products/velo-plus.html", "official-brand"),
  veloMax: source("velo-max-range-20261009", "VELO USA: MAX range", "https://www.velo.com/us/secure/products/max.html", "official-brand"),
  veloFAQ: source("velo-us-composition-20261009", "VELO USA: product information", "https://www.velo.com/us/secure/footer-links/faq.html", "official-brand", "Original VELO and VELO PLUS have different nicotine origins. Do not apply PLUS composition to MAX or UK products. / 原 VELO 与 PLUS 的尼古丁来源不同；PLUS 成分不套用到 MAX 或英国产品。"),
  veloPK: source("velo-pakistan-range-20261009", "VELO Pakistan: exact flavor, size and strength listings", "https://pk.velo.com/collections/velo-flavours", "official-brand", "Music Edition is a package design, retained in provenance rather than counted as a duplicate flavor/strength. / Music Edition 是包装设计，记录在来源中，不重复计算同口味同强度产品。"),
  on: source("on-retail-range-20261009", "Northerner US: on! mini dry variants", "https://www.northerner.com/us/on", "retail-reference"),
  rogue: source("rogue-retail-range-20261009", "Northerner US: Rogue and Rogue Max variant table", "https://www.northerner.com/us/rogue", "retail-reference"),
  rogueOfficial: source("rogue-official-range-20261009", "Rogue: official named pouch range", "https://www.roguenicotine.com/products", "official-brand"),
  lucy: source("lucy-retail-range-20261009", "Northerner US: Lucy Slim and Breakers", "https://www.northerner.com/us/lucy", "retail-reference"),
  lucyPouches: source("lucy-pouches-official-20261009", "Lucy: official pouches", "https://lucy.co/products/pouches", "official-brand"),
  lucyBreakers: source("lucy-breakers-official-20261009", "Lucy: official Breakers", "https://lucy.co/products/breakers", "official-brand"),
  lucyGum: source("lucy-gum-official-20261009", "Lucy: official gum", "https://lucy.co/products/gum", "official-brand"),
  zone: source("zone-retail-range-20261009", "Northerner US: zone flavor and strength table", "https://www.northerner.com/us/zone", "retail-reference"),
  fre: source("fre-retail-range-20261009", "Northerner US: FRE named strength selectors", "https://www.northerner.com/us/fre", "retail-reference"),
  alp: source("alp-retail-range-20261009", "Northerner US: ALP flavors and strength selectors", "https://www.northerner.com/us/alp", "retail-reference"),
  grizzly: source("grizzly-retail-range-20261009", "Northerner US: Grizzly nicotine pouch variant table", "https://www.northerner.com/us/grizzly-nicotine-pouches", "retail-reference"),
  nordic: source("nordic-official-range-20261009", "Nordic Spirit UK: named standard and mini products", "https://nordicspirit.co.uk/shop/standard-pouches", "official-brand"),
  nordic2: source("nordic-official-range-page2-20261009", "Nordic Spirit UK: product catalog page 2", "https://nordicspirit.co.uk/shop/standard-pouches?p=2", "official-brand"),
  loop: source("loop-retail-range-20261009", "Snusdirect: LOOP named variants", "https://www.snusdirect.eu/loop-nicotine-pouches", "retail-reference"),
  klint: source("klint-retail-range-20261009", "Snusdirect: KLINT current and unavailable variants", "https://www.snusdirect.eu/klint-nicotine-pouches", "retail-reference"),
  loopRename: source("loop-blackcurrant-rename-20261009", "Snuslagret: Blackcurrant formerly Cassis Bliss", "https://snuslagret.se/produkt/vitt-snus/bar/loop-cassis-bliss-strong/", "retail-reference", "Former name merged as a searchable alias; numeric strength is not copied between old and reformulated versions. / 旧名称合并为可搜索别名；旧配方与更新配方之间不套用数值强度。"),
  snusdirectStrong: source("snusdirect-strong-index-20261009", "Snusdirect: strong nicotine pouch directory (indexed listing)", "https://www.snusdirect.eu/strong-nicotine-pouches", "retail-reference", "Identity from search-indexed retailer listing; full product-page specifications remain unconfirmed. / 身份依据为搜索引擎收录的零售目录；完整产品页规格尚未核实。"),
  snusdirectRegular: source("snusdirect-regular-index-20261009", "Snusdirect: regular nicotine pouch directory (indexed listing)", "https://www.snusdirect.eu/regular-strength-nicotine-pouches", "retail-reference", "Identity from search-indexed retailer listing; exact specifications remain unconfirmed. / 身份依据为搜索引擎收录的零售目录；具体规格尚未核实。"),
  snusdirectAll: source("snusdirect-all-index-20261009", "Snusdirect: all products (indexed listing)", "https://www.snusdirect.eu/all-products", "retail-reference", "Only named nicotine product excerpts are retained; nicotine-free candy, caffeine products and zero-nicotine pouches are excluded. / 仅保留具名含尼古丁产品摘录；不收录普通糖果、咖啡因产品或零尼古丁袋。"),
  nicorette: source("nicorette-official-range-20261009", "Nicorette UK: exact product names and pack sizes", "https://www.nicorette.co.uk/products", "official-brand"),
  nicotinell: source("nicotinell-medicines-20261009", "emc: Nicotinell medicine records", "https://www.medicines.org.uk/emc/search?q=Nicotinell", "manufacturer"),
  historical: source("historical-snus-paper-2008", "Stepanov et al. (2008): New and traditional smokeless tobacco", "https://pmc.ncbi.nlm.nih.gov/articles/PMC2892835/", "scientific", "Named test-market products sampled for the 2008 publication. Historical formulation and measurements must not be treated as today's pack specifications. / 2008 年论文所采集的具名试销产品；历史配方及测量不作为今天的包装规格。"),
  arivaFDA: source("ariva-stonewall-nse-20261009", "FDA: products receiving NSE orders and named enforcement records", "https://www.fda.gov/tobacco-products/market-and-distribute-tobacco-product/marketed-tobacco-products-receive-nse", "regulator"),
  stonewallSEC: source("stonewall-sec-2011", "Star Scientific 2010 Form 10-K: Stonewall blends introduced in 2007", "https://www.sec.gov/Archives/edgar/data/776008/000095012311025988/c14074e10vk.htm", "manufacturer"),
  niquitin: source("niquitin-hpra-withdrawn", "HPRA Ireland: NiQuitin Strips Mint 2.5 mg withdrawn medicine", "https://www.hpra.ie/find-a-medicine/for-human-use/withdrawn-medicines/details/25393", "regulator"),
  oliverUK: source("oliver-uk-assortment-20261009", "Oliver Twist: UK chewing tobacco bits assortment", "https://oliver-twist.dk/en/the-assortment/", "official-brand"),
  oliverUS: source("oliver-us-assortment-20261009", "Oliver Twist: USA chewing tobacco bits assortment", "https://oliver-twist.dk/us/assortment/", "official-brand"),
  pixotine: source("pixotine-assortment-20261009", "Pixotine: nicotine toothpick assortment", "https://pixotine.com/collections/nicotine-toothpicks", "official-brand"),
  india: source("india-mumbai-surveillance-2024", "Mumbai smokeless tobacco surveillance study (2024)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11384967/", "scientific", "Named samples in the published study, not evidence of present legal availability or standardized flavor/strength. / 论文中的具名样品，不作为当前合法销售或统一口味／强度的依据。"),
  indiaPDF: source("india-mumbai-table1-2024", "Healis: Mumbai surveillance study, table 1 and sampling methods", "https://healis.in/docs/Variability%20in%20addictive%20and%20carcinogenic%20potential%20of%20smokeless%20tobacco%20products%20marketed%20in%20Mumbai,%20India%20a%20surveillance%20study.pdf", "scientific", "Samples purchased August–September 2019; paper published in 2024. This distinguishes acquisition from publication date. / 样品于 2019 年 8—9 月购买，论文于 2024 年发表；采样日期与发表日期分别记录。"),
};

const slugify = (name: string) => name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const researchNotes = {
  en: "Product identity is documented in the linked source. Commercial listings and historical mentions do not establish present regulatory authorization. Unconfirmed parameters remain blank. No exact variant image has been verified for this added record; no substitute packaging image is used.",
  zh: "所列来源记录了该产品身份。购物网站展示或历史记载不等于已确认当前销售许可。未核实的参数留空；本次尚未核对到该具体规格的实物图片，不使用其他款式包装图替代。",
};

export function pouch(brandId: string, brandName: string, flavor: string, strength: number | undefined, reference: Source, options: Partial<Product> = {}): Product {
  const productName = `${brandName} ${flavor}${strength === undefined ? "" : ` ${strength} mg`}`;
  const id = slugify(productName);
  return {
    id, slug: id, productName, brandId, categoryId: "nicotine-pouches", formatId: "pouch",
    markets: [], status: "unknown", recordKind: "current", flavor: { name: flavor },
    nicotine: strength === undefined ? undefined : { nicotineStrength: `${strength} mg per pouch`, nicotineStrengthMg: strength, nicotinePerUnit: strength },
    tobaccoFree: true, containsTobacco: false, deliveryRoute: ["buccal", "gingival"], productTechnology: ["pouch-matrix"],
    specifications: { kind: "pouch" }, sources: [reference], verificationStatus: "pending", lastVerified: reviewed,
    localizedShortDescription: {
      en: `${flavor}${strength === undefined ? "; numeric strength not established" : `; ${strength} mg nicotine per pouch`}. See linked evidence and unconfirmed fields.`,
      zh: `${flavor}${strength === undefined ? "；尚未确认数值强度" : `；每袋标称尼古丁 ${strength} 毫克`}。产品依据和未确认字段见详情。`,
    }, researchNotes, ...options,
  };
}

type VariantRow = readonly [flavor: string, strengths: readonly number[]];
export function range(brandId: string, displayName: string, rows: readonly VariantRow[], reference: Source, options: Partial<Product> = {}): Product[] {
  return rows.flatMap(([flavor, strengths]) => strengths.map(strength => pouch(brandId, displayName, flavor, strength, reference, options)));
}

// These are the combinations actually printed on the official UK catalog.
const veloUKRows: VariantRow[] = [
  ["Bright Spearmint", [4, 6, 8, 14]], ["Strawberry Ice", [6, 10]], ["Purple Grape", [4, 6, 8, 14, 17]],
  ["Freezing Peppermint", [11, 14, 17]], ["Peach Ice", [6, 10]], ["Tropical Ice", [6, 10]],
  ["Crispy Peppermint", [6, 10]], ["Ruby Berry", [4, 6, 10, 14, 17]], ["Tropical Mango", [6, 10]],
  ["Tangy Lime", [4, 6]], ["Cherry Ice", [6, 10]], ["Icy Berries", [10, 14, 17]], ["Blueberry Ice", [8]],
  ["Peppermint Storm", [11, 14, 17]], ["Lime Flame", [8]], ["Mango Ice", [10]], ["Wintry Watermelon", [10, 14, 17]],
  ["Mango Flame", [10, 14]], ["Orange Spark", [10, 17]], ["Minty Lemon", [10]],
  ["Mystery Collection 1", [8]], ["Mystery Collection 2", [8]], ["Mystery Collection 3", [8]],
];
const veloExpansion = [
  ...range("velo", "VELO", veloUKRows, refs.veloUK, { markets: ["united-kingdom"], status: "active", series: "UK range" }),
  ...range("velo", "VELO USA", ["Black Cherry", "Citrus Burst", "Dragon Fruit", "Wintergreen", "Peppermint", "Spearmint", "Cinnamon", "Coffee"].map(f => [f, [4, 7]]), refs.veloUS, {
    markets: ["united-states"], series: "US original", status: "active",
  }).map(p => ({ ...p, nicotine: { ...p.nicotine, nicotineSource: "tobacco-derived" as const }, sources: [...p.sources, refs.veloFAQ] })),
  ...range("velo", "VELO PLUS", [
    ["Watermelon Chill", [3, 6, 9]], ["Mint", [6, 9]], ["Peppermint", [3, 6, 9]], ["Spearmint", [3, 6, 9]],
    ["Wintergreen", [3, 6, 9]], ["Citrus Chill", [6, 9]], ["Dragon Fruit", [6]], ["Tropical Heat", [6]],
    ["Wild Berry", [3, 6, 9]], ["Cappuccino", [3, 6, 9]], ["Smooth Tobacco", [3, 6, 9]],
  ], refs.veloPlus, { markets: ["united-states"], series: "PLUS", status: "active", specifications: { kind: "pouch", portionsPerCan: 20 } })
    .map(p => ({ ...p, nicotine: { ...p.nicotine, nicotineSource: "synthetic" as const }, sources: [...p.sources, refs.veloFAQ] })),
  ...range("velo", "VELO MAX", [["Wintergreen", [8, 12]], ["Cool Mint", [8, 12]], ["Berry", [8]], ["Cinnamon", [8]]], refs.veloMax,
    { markets: ["united-states"], series: "MAX (8/12 mg US range)", status: "active", specifications: { kind: "pouch", portionsPerCan: 20 } }),
];
const veloPakistan = range("velo", "VELO", [
  ["Polar Mint Mini", [4, 6]], ["Berry Frost Mini", [6]], ["Frosty Lemon", [10]], ["Wintry Watermelon", [10]],
  ["Tropical Ice", [10]], ["Polar Mint", [10, 14, 17]], ["Purple Grape", [10, 17]], ["Berry Frost", [10, 14]],
  ["Rich Elaichi", [10]], ["Freezing Peppermint", [10]], ["Peppermint Storm", [14]], ["Mango Flame", [14]],
], refs.veloPK, { markets: ["pakistan"], status: "active" });

const usPouches = [
  ...range("on", "on!", ["Mint", "Original", "Coffee", "Wintergreen", "Cinnamon", "Citrus", "Berry"].map(f => [f, [2, 4, 8]]), refs.on,
    { markets: ["united-states"], series: "Mini Dry", specifications: { kind: "pouch", portionsPerCan: 20, pouchSize: "Mini", moisture: "Dry" } }),
  ...range("rogue", "Rogue", ["Wintergreen", "Peppermint", "Spearmint", "Apple", "Berry", "Cinnamon", "Mango", "Honey Lemon", "Citrus", "Original", "Bold", "Smooth", "Blue Raspberry"].map(f => [f, [3, 6]]), refs.rogue,
    { markets: ["united-states"], series: "Original", specifications: { kind: "pouch", portionsPerCan: 20 } }),
  ...range("rogue", "Rogue Max", ["Wintergreen", "Spearmint", "Citrus", "Blue Raspberry"].map(f => [f, [9, 12, 15]]), refs.rogue,
    { markets: ["united-states"], series: "Max", specifications: { kind: "pouch", portionsPerCan: 20, pouchSize: "Slim", moisture: "Moist" } }),
  ...range("zone", "zone", ["Tobacco", "Wintergreen", "Mint", "Spearmint", "Peppermint", "Dragonfruit", "Citrus", "Chill", "Smooth", "White", "Jalapeño Lime", "Spicy Mango", "Spicy Strawberry", "Cranberry"].map(f => [f, [6, 9]]), refs.zone,
    { markets: ["united-states"], specifications: { kind: "pouch", portionsPerCan: 20, pouchSize: "Slim" } }),
  ...range("zone", "zone", [["Dragonfruit", [3, 12]], ["Wintergreen", [3, 12]]], refs.zone,
    { markets: ["united-states"], specifications: { kind: "pouch", portionsPerCan: 20, pouchSize: "Slim" } }),
  ...range("fre", "FRE", ["Mint", "Wintergreen", "Watermelon", "Lush", "Sweet", "Original"].map(f => [f, [3, 6, 9, 12, 15]]), refs.fre,
    { markets: ["united-states"], specifications: { kind: "pouch", portionsPerCan: 20 } }),
  ...range("alp", "ALP", ["Chilled Mint", "Mountain Wintergreen", "Refreshing Chill", "Tropical Fruit", "Sweet Nectar", "Spearmint", "Classic"].map(f => [f, [3, 6, 9]]), refs.alp,
    { markets: ["united-states"] }),
  ...range("grizzly-pouches", "Grizzly Nicotine Pouches", [["Mint", [9, 12]], ["Wintergreen", [6, 9, 12, 15]], ["Original", [6, 9, 12, 15]], ["Southern", [9, 12]]], refs.grizzly,
    { markets: ["united-states"], series: "Nicotine Pouches (tobacco-leaf-free)" }),
];

const lucyPouches = [
  ...range("lucy", "Lucy", ["Mint", "Wintergreen", "Cinnamon", "Mango"].map(f => [f, [4, 8, 12]]), refs.lucy,
    { markets: ["united-states"], series: "Slim", specifications: { kind: "pouch", portionsPerCan: 15, pouchSize: "Slim" } }),
  ...range("lucy", "Lucy Breakers", ["Mint", "Apple Cider", "Berry Citrus", "Espresso", "Mango"].map(f => [f, [4, 8]]), refs.lucy,
    { markets: ["united-states"], series: "Breakers", subcategory: "Nicotine pouch with burstable capsule", specifications: { kind: "pouch", portionsPerCan: 15 } }),
  // 12 mg is observed for Mint on the official page; other flavors are not extrapolated.
  pouch("lucy", "Lucy Breakers", "Mint", 12, refs.lucyBreakers, { markets: ["united-states"], series: "Breakers", subcategory: "Nicotine pouch with burstable capsule" }),
];

const nordicNames = [
  "Icy Peppermint Max", "Sweet Mint Mini Mellow", "Raspberry Mini Mellow", "Icy Strawberry Regular", "Icy Strawberry Strong",
  "Spearmint Regular", "Mint Regular", "Watermelon Regular", "Sweet Mint Regular", "Raspberry Strong", "Forest Berries Regular",
  "Dark Fizz Regular", "Frosty Berry X-Strong", "Frosty Mint Max", "Blueberry Regular",
  "Zesty Pear Regular", "Melon Fresh Regular", "Spearmint Strong", "Spearmint X-Strong", "Mint Strong", "Mint X-Strong",
  "Raspberry Regular", "Sweet Mint X-Strong", "Tropical Mix Strong", "Dark Fizz Strong", "Forest Berries Strong",
  "Frosty Mint Strong", "Frosty Berry Max", "Frosty Mint X-Strong", "Blueberry Strong", "Frosty Berry Strong",
];
const nordicPouches = nordicNames.map((name, i) => pouch("nordic-spirit", "Nordic Spirit", name, undefined, i < 15 ? refs.nordic : refs.nordic2, {
  markets: ["united-kingdom"], nicotine: { nicotineStrength: name.match(/(X-Strong|Strong|Regular|Max|Mellow)$/)?.[1] },
  researchNotes: { en: "Exact catalog name and strength class are recorded. Regular has more than one numeric strength in the site's filters, so no numeric dose is inferred. Stock status is not a discontinuation date. Exact image remains unconfirmed.", zh: "记录目录原名及强度等级。网站筛选中的 Regular 对应不止一种数值强度，因此不猜测每袋剂量。缺货不等于停产；具体规格图片尚未核实。" },
}));

const loopNames = [
  "Smooth Mint Strong", "Smooth Mint Extra Strong", "Jalapeño Lime Strong", "Smooth Mint Hyper Strong", "Jalapeño Lime Hyper Strong",
  "Habanero Mint Hyper Strong", "Red Chili Melon Hyper Strong", "Smooth Mint Mini", "Spicy Apple Strong", "Creamy Cappuccino Strong",
  "Hot Peach Strong", "Pineapple Ice Strong", "Ice Cool Mint Strong", "Jalapeño Lime Extra Strong", "Sicily Spritz Strong",
  "Smooth Mint Hyper Strong Mini", "Red Chili Melon Extra Strong", "Red Chili Melon Strong", "Red Chili Melon Mini", "Jalapeño Lime Mini",
  "Fresh Peppermint Hyper Strong", "Creamy Cappuccino Mini", "Blueberry Ice Strong", "Blackcurrant Strong", "Fresh Spearmint Hyper Strong",
  "Smooth Mint Hyper Strong Mega", "Strawberry Ice Strong", "Habanero Mint Extra Strong", "Smooth Mint Mini Xtended", "Hot Rhubarb Strong",
  "Jalapeño Lime Medium", "Hot Peach Hyper Strong", "Red Chili Melon Medium", "Fresh Spearmint Hyper Strong Mini", "Fresh Peppermint Hyper Strong Mini",
  "Licorice Raspberry Strong", "Ice Cool Mint Hyper Strong", "Cassis Bliss Strong",
];
const klintNames = [
  "Cola Lime Strong", "Freeze Mint", "Mint 4mg", "Avalanche Mint Ultra Strong", "Polar Mint", "Breeze Mint", "Arctic Mint X-Strong",
  "Spearmint Mini", "Tropical Breeze", "Arctic Mint Max", "Cola Lime Mini 3.2mg", "Salty Liquorice Mini 3.2mg", "Alaskan Mint",
  "Watermelon Mini", "Strawberry Mini 3.2mg", "Blueberry Mini", "Easy Mint Mini 3.2mg", "Crystal Mint", "Apple Mint X-Strong",
  "Blåklint X-Strong", "Fresh Lime", "Honeymelon", "Liquorice", "Liquorice 4mg", "Passionfruit", "Pink Grapefruit Strong", "Pomegranate", "White Mulberry",
];
const europeanPouches = [
  ...loopNames.filter(name => name !== "Cassis Bliss Strong").map(name => pouch("loop", "LOOP", name, undefined, refs.loop, {
    nicotine: { nicotineStrength: name.match(/(Hyper Strong|Extra Strong|Strong|Medium)/)?.[1] },
    ...(name === "Blackcurrant Strong" ? { historicalNames: ["LOOP Cassis Bliss Strong"], legacySlugs: ["loop-cassis-bliss-strong"], sources: [refs.loop, refs.loopRename] } : {}),
  })),
  ...klintNames.map(name => pouch("klint", "KLINT", name, undefined, refs.klint)),
];
const otherEuropeanRows: [string, string, string, Source][] = [
  ["ace", "ACE", "X Cosmic Cool Mint", refs.snusdirectStrong],
  ["skruf-superwhite", "Skruf Superwhite", "no.54 Fresh Mint Xtra Strong", refs.snusdirectAll],
  ["apres", "Après", "No.4 Cola", refs.snusdirectRegular],
  ["thor", "Thor", "Honeymelon Heaven Strong", refs.snusdirectAll],
];
const otherEuropeanPouches = otherEuropeanRows.map(([id, name, variant, reference]) => pouch(id, name, variant, undefined, reference));

function oralProduct(brandId: string, productName: string, formatId: string, specifications: Product["specifications"], reference: Source, options: Partial<Product> = {}): Product {
  const id = slugify(productName);
  return {
    id, slug: id, productName, brandId, categoryId: formatId === "gum" ? "nicotine-gum-confectionery" : formatId === "film" ? "nicotine-films" : "nicotine-lozenges-solids",
    formatId, specifications, markets: [], status: "unknown", verificationStatus: "pending", lastVerified: reviewed,
    sources: [reference], researchNotes, ...options,
  };
}

const lucyGums = ["Berry Citrus", "Mango", "Mint"].flatMap(flavor => [2, 4, 6].map(strength => oralProduct("lucy", `Lucy Gum ${flavor} ${strength} mg`, "gum", { kind: "gum", piecesPerPack: 10 }, refs.lucyGum, {
  series: "Gum", markets: ["united-states"], status: "active", flavor: { name: flavor }, tobaccoFree: true, deliveryRoute: ["chewing", "buccal"],
  nicotine: { nicotineStrength: `${strength} mg per piece`, nicotineStrengthMg: strength, nicotinePerUnit: strength },
})));

// Existing 2 mg / 40 and 105 packs retain their original IDs and photos.
const nicoretteExtra = [
  ...[80, 160].flatMap(count => ["Cools", "Fruit"].map(flavor => oralProduct("nicorette", `Nicorette ${flavor} Lozenge 2 mg (${count} lozenges)`, "lozenge", { kind: "lozenge", piecesPerPack: count }, refs.nicorette, { flavor: { name: flavor }, nicotine: { nicotineStrengthMg: 2, nicotinePerUnit: 2, nicotineStrength: "2 mg per lozenge" } }))),
  ...[["Fruitfusion", 105], ["Fruitfusion", 210], ["Freshmint", 210], ["Icy White", 105]].map(([flavor, count]) => oralProduct("nicorette", `Nicorette ${flavor} Gum 2 mg (${count} pieces)`, "gum", { kind: "gum", piecesPerPack: Number(count) }, refs.nicorette, { flavor: { name: String(flavor) }, nicotine: { nicotineStrengthMg: 2, nicotinePerUnit: 2, nicotineStrength: "2 mg per piece" } })),
  ...["Original", "Freshmint", "Fruitfusion", "Icy White"].map(flavor => oralProduct("nicorette", `Nicorette ${flavor} Gum 4 mg`, "gum", { kind: "gum" }, refs.nicorette, { flavor: { name: flavor }, nicotine: { nicotineStrengthMg: 4, nicotinePerUnit: 4, nicotineStrength: "4 mg per piece" } })),
  ...["Cools", "Fruit"].map(flavor => oralProduct("nicorette", `Nicorette ${flavor} Lozenge 4 mg`, "lozenge", { kind: "lozenge" }, refs.nicorette, { flavor: { name: flavor }, nicotine: { nicotineStrengthMg: 4, nicotinePerUnit: 4, nicotineStrength: "4 mg per lozenge" } })),
].map(p => ({ ...p, markets: ["united-kingdom"], tobaccoFree: true, containsTobacco: false, subcategory: "Nicotine replacement medicine" }));

const nicotinellExtra = [
  ...["Fruit", "Mint"].flatMap(flavor => [2, 4].map(strength => oralProduct("nicotinell", `Nicotinell ${flavor} Medicated Gum ${strength} mg`, "gum", { kind: "gum" }, refs.nicotinell, { flavor: { name: flavor }, nicotine: { nicotineStrengthMg: strength, nicotinePerUnit: strength, nicotineStrength: `${strength} mg per piece` } }))),
  ...[1, 2].map(strength => oralProduct("nicotinell", `Nicotinell Mint Lozenge ${strength} mg`, "lozenge", { kind: "lozenge" }, refs.nicotinell, { flavor: { name: "Mint" }, nicotine: { nicotineStrengthMg: strength, nicotinePerUnit: strength, nicotineStrength: `${strength} mg per lozenge` } })),
].map(p => ({ ...p, markets: ["united-kingdom"], tobaccoFree: true, containsTobacco: false, subcategory: "Nicotine replacement medicine" }));

function historicalPouch(brandId: string, name: string, flavor: string): Product {
  return oralProduct(brandId, name, "pouch", { kind: "tobacco", tobaccoType: "Oral smokeless tobacco" }, refs.historical, {
    categoryId: "oral-smokeless-tobacco", subcategory: name.includes("Snus") ? "Historical US snus" : "Historical dry snuff pouch",
    markets: ["united-states"], recordKind: "historical", containsTobacco: true, tobaccoFree: false, flavor: { name: flavor },
    physicalFormDetails: { unitization: "pre-portioned", useMode: "placement" },
    recordContext: { en: "Exact named test-market variant in the 2008 study. Current availability and exact package image are unconfirmed; historical laboratory values are not assigned as current specifications.", zh: "2008 年研究中的具名试销版本。未确认当前供应及对应包装照片；不把历史实验数值当成当前规格。" },
  });
}
const historicalExtra = [
  ...["Rich", "Mild", "Spice", "Mint"].map(f => historicalPouch("marlboro-oral-us", `Marlboro Snus ${f}`, f)),
  ...["Original", "Spice", "Frost"].map(f => historicalPouch("camel-oral", `Camel Snus ${f}`, f)),
  ...["Regular", "Cinnamon", "Menthol"].map(f => historicalPouch("skoal", `Skoal Dry ${f}`, f)),
  ...["Original", "Green"].map(f => historicalPouch("taboka", `Taboka ${f}`, f)),
  ...["Cinnamon", "Mint", "Java", "Citrus"].map(flavor => oralProduct("ariva", `Ariva ${flavor}`, "tablet", { kind: "tablet" }, refs.arivaFDA, {
    categoryId: "oral-smokeless-tobacco", subcategory: "Dissolvable Tobacco", recordKind: "historical", markets: ["united-states"],
    containsTobacco: true, tobaccoFree: false, flavor: { name: flavor },
    recordContext: { en: "Named historical dissolvable tobacco variant in FDA NSE/enforcement records from 2014–2015. No present availability or exact pack photo established.", zh: "FDA 2014—2015 年 NSE／执法记录中的具名历史可溶烟草。未确认当前供应或对应包装照片。" },
  })),
  ...["Natural", "Wintergreen"].map(flavor => oralProduct("stonewall", `Stonewall ${flavor}`, "tablet", { kind: "tablet" }, refs.stonewallSEC, {
    categoryId: "oral-smokeless-tobacco", subcategory: "Dissolvable Tobacco", recordKind: "historical", markets: ["united-states"],
    containsTobacco: true, tobaccoFree: false, flavor: { name: flavor },
    recordContext: { en: "Star Scientific's 2010 annual report documents this dissolvable blend. Current availability and exact pack photo are not established.", zh: "Star Scientific 2010 年年报记录该可溶烟草口味；未确认当前供应和对应包装照片。" },
  })),
  oralProduct("niquitin", "NiQuitin Strips Mint 2.5 mg", "film", { kind: "film" }, refs.niquitin, {
    subcategory: "Nicotine replacement oral film", recordKind: "historical", markets: ["ireland"], flavor: { name: "Mint" },
    nicotine: { nicotineStrengthMg: 2.5, nicotinePerUnit: 2.5, nicotineStrength: "2.5 mg per orodispersible film" },
    physicalFormDetails: { shape: "strip", unitization: "pre-portioned", useMode: "dissolution" },
    recordContext: { en: "Listed in HPRA Ireland's withdrawn-medicines directory. Withdrawal in Ireland does not establish global discontinuation. No verified exact product image.", zh: "载于爱尔兰 HPRA 已撤回药品目录；该市场撤回不等于全球停产。尚未核实对应产品照片。" },
  }),
];

const oliver = ["Original", "Tropical", "Black", "Royal", "Arctic", "Frosted", "Sunberry", "Wintergreen"].map(flavor => {
  const inUK = ["Original", "Tropical", "Black", "Royal", "Arctic", "Frosted"].includes(flavor);
  const inUS = ["Original", "Tropical", "Sunberry", "Wintergreen"].includes(flavor);
  return oralProduct("oliver-twist", `Oliver Twist ${flavor}`, "bead-pellet", { kind: "tobacco", tobaccoType: "Rolled chewing tobacco bits" }, inUK ? refs.oliverUK : refs.oliverUS, {
    categoryId: "oral-smokeless-tobacco", subcategory: "Chewing tobacco bits", flavor: { name: flavor }, containsTobacco: true, tobaccoFree: false,
    physicalFormDetails: { unitization: "pre-portioned", useMode: "chewing" }, markets: [...(inUK ? ["united-kingdom"] : []), ...(inUS ? ["united-states"] : [])],
    sources: [...(inUK ? [refs.oliverUK] : []), ...(inUS ? [refs.oliverUS] : [])],
  });
});
const toothpicks = ["Cinnamon", "Original Flavor", "Tobacco Flavor", "Winter Ice"].map(flavor => oralProduct("pixotine", `Pixotine ${flavor} (15 nicotine toothpicks)`, "stick", { kind: "other", attributes: { "Picks per pack": "15", "Carrier": "Toothpick; not a dissolving tobacco stick" } }, refs.pixotine, {
  categoryId: "other-oral-nicotine", subcategory: "Nicotine-infused toothpick", markets: ["united-states"], flavor: { name: flavor },
  physicalFormDetails: { shape: "stick", unitization: "pre-portioned", useMode: "placement" }, deliveryRoute: ["oral-mucosal"],
}));

// Research sample identities: no manufacturer, dose, flavor or current legal sale is invented.
const indiaRows = [
  ["gai-chap", "Gai Chap", "Packaged plain tobacco", "loose"],
  ["om-special-pandharpuri", "Om Special Pandharpuri", "Packaged plain tobacco", "loose"],
  ["chaini-khaini", "Chaini Khaini", "Khaini", "loose"],
  ["miraj", "Miraj Khaini", "Khaini", "loose"],
  ["vimal", "Vimal Pan Masala with Companion Tobacco", "Pan masala with tobacco", "granule"],
  ["ekka", "Ekka Gutkha-like Tobacco", "Gutkha-like tobacco mixture", "granule"],
] as const;
const indiaAdditionalRows: [string, string, string, string][] = [
  ...["Kamath Hathi Chhap", "Aasha Jyoti", "No 555", "Mrugaraj", "Veer", "No 777", "Pandharpuri Sandeep", "Kalaa", "Barika", "Jagata"].map(name => [slugify(name), `${name} Plain Chewing Tobacco`, "Packaged plain tobacco", "loose"] as [string, string, string, string]),
  ...["Kuber", "Dhariwal Special Tobacco"].map(name => [slugify(name), `${name} Khaini`, "Khaini", "loose"] as [string, string, string, string]),
  ...["Shikhar", "Goa", "Kolhapuri", "Sagar", "4K", "RMD"].map(name => [slugify(name), `${name} Gutkha / Gutkha-like Tobacco`, "Gutkha / gutkha-like tobacco mixture", "granule"] as [string, string, string, string]),
  ...["Rajanigandha", "Raj Niwas", "Rajashree", "RMD", "Musafir", "Tansen Blue", "Jafri", "Shudh Plus", "Pan Bahar", "Cash Gold", "Pukar", "Kamala Pasand", "Rokada", "Hot", "Banarasi Ashik", "Vilasa"].map(name => [slugify(name), `${name} Companion Tobacco for Pan Masala`, "Companion tobacco for pan masala", "loose"] as [string, string, string, string]),
];
const allIndiaRows: readonly (readonly [string, string, string, string])[] = [...indiaRows, ...indiaAdditionalRows];
const indiaProducts = allIndiaRows.map(([brandId, name, subcategory, formatId]) => oralProduct(brandId, name, formatId, { kind: "tobacco", tobaccoType: subcategory }, refs.india, {
  categoryId: "oral-smokeless-tobacco", subcategory, recordKind: "historical", markets: ["india"], containsTobacco: true, tobaccoFree: false,
  physicalFormDetails: { unitization: "loose", useMode: "chewing" }, sources: [refs.india, refs.indiaPDF],
  historicalNames: brandId === "chaini-khaini" ? ["Khaini Chaini"] : brandId === "gai-chap" ? ["Gai Chhap"] : undefined,
  recordContext: { en: "Named tobacco-containing sample purchased in Mumbai in August–September 2019, documented in the 2024 study's table 1. This is a study-era identity, not a verified current SKU. Flavor, numerical strength, manufacturing identity and exact package image remain unconfirmed.", zh: "2019 年 8—9 月于孟买购买的具名含烟草样品，载于 2024 年论文表 1。记录研究时期的身份，不声称是已核实的当前 SKU。口味、数值强度、制造商及对应包装照片均尚未确认。" },
}));

/** Same named variant across sources/markets is one record; bundles are not new products. */
function mergeObservedProducts(records: Product[]): Product[] {
  const result = new Map<string, Product>();
  for (const record of records) {
    const key = `${record.brandId}|${slugify(record.productName)}`;
    const existing = result.get(key);
    if (!existing) { result.set(key, record); continue; }
    if (existing.nicotine?.nicotinePerUnit !== record.nicotine?.nicotinePerUnit || existing.formatId !== record.formatId)
      throw new Error(`Conflicting identity requires research: ${record.productName}`);
    result.set(key, { ...existing,
      markets: [...new Set([...existing.markets, ...record.markets])],
      sources: [...new Map([...existing.sources, ...record.sources].map(s => [s.id, s])).values()],
    });
  }
  return [...result.values()];
}
export const expandedProducts: Product[] = mergeObservedProducts([
  ...veloExpansion, ...veloPakistan, ...usPouches, ...lucyPouches, ...nordicPouches, ...europeanPouches, ...otherEuropeanPouches,
  ...lucyGums, ...nicoretteExtra, ...nicotinellExtra, ...historicalExtra, ...oliver, ...toothpicks, ...indiaProducts,
]);

const brandRows: [string, string, Source][] = [
  ["on", "on!", refs.on], ["rogue", "Rogue", refs.rogue], ["lucy", "Lucy", refs.lucy], ["zone", "zone", refs.zone],
  ["fre", "FRE", refs.fre], ["alp", "ALP", refs.alp], ["grizzly-pouches", "Grizzly Nicotine Pouches", refs.grizzly],
  ["nordic-spirit", "Nordic Spirit", refs.nordic], ["loop", "LOOP", refs.loop], ["klint", "KLINT", refs.klint],
  ["nicotinell", "Nicotinell", refs.nicotinell], ["taboka", "Taboka", refs.historical], ["niquitin", "NiQuitin", refs.niquitin],
  ["oliver-twist", "Oliver Twist", refs.oliverUK], ["pixotine", "Pixotine", refs.pixotine],
  ...otherEuropeanRows.map(([id, name, , reference]) => [id, name, reference] as [string, string, Source]),
  ...new Map(allIndiaRows.map(([id, name]) => [id, [id, name.replace(/ (Plain Chewing Tobacco|Gutkha \/ Gutkha-like Tobacco|Companion Tobacco for Pan Masala|Pan Masala with Companion Tobacco|Gutkha-like Tobacco)$/, ""), refs.india] as [string, string, Source]])).values(),
];
export const expandedBrands: Brand[] = brandRows.map(([id, name, reference]) => ({
  id, slug: id, name, sources: [reference], lastVerified: reviewed, verificationStatus: "verified",
  officialWebsite: reference.sourceType === "official-brand" ? reference.sourceUrl : undefined,
  brandCountryBasis: { en: "Brand country has not been established from the sources reviewed. A sales destination or study location is not a brand-country attribution.", zh: "所查来源尚未确认品牌所属国。销售目的地和研究采样地点不作为品牌所属国依据。" },
  localizedDescription: { en: "Source-linked oral product identities. Undocumented attributes and current availability are kept separate from evidence of existence.", zh: "依据可追溯来源记录口含产品身份；缺失规格、当前供应与产品曾经存在的证据分开记录。" },
}));
