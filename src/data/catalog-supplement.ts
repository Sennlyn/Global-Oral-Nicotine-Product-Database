import type { Brand, Product, Source } from "@/types/catalog";
import tobaccoRows from "./catalog-tobacco-followups.json";
import followups from "./catalog-brand-followups.json";
import { pouch, range } from "./catalog-expansion";

const date = "2026-10-09";
const reference = (id: string, name: string, url: string, official = false): Source => ({id, sourceName: name, sourceUrl: url, sourceType: official ? "official-brand" : "retail-reference", accessedAt: date, verifiedAt: date});
const us: Partial<Product> = {markets: ["united-states"]};
const clew = reference("clew-range", "Northerner: CLEW named flavor/strength table", "https://www.northerner.com/us/clew");
const sesh = reference("sesh-range", "Northerner: Sesh+ named flavor/strength table", "https://www.northerner.com/us/sesh");
const juice = reference("juice-head-range", "Northerner: Juice Head catalog and strength selectors", "https://www.northerner.com/us/juice-head");
const lucy = reference("lucy-additions", "Northerner: Lucy Slim and Breakers separate product listings", "https://www.northerner.com/us/lucy");
const on = reference("on-plus-12mg", "Northerner: on! PLUS 12mg catalog listings", "https://www.northerner.com/us/on");
const fre = reference("fre-mega-packs", "Northerner: FRE Mega Pack named strength selectors", "https://www.northerner.com/us/fre");
const alp = (flavor: string) => reference("alp-" + flavor, "ALP official product strength selector", "https://alppouch.com/products/" + flavor, true);

function tobaccoRecord(row: typeof tobaccoRows[number]): Product {
  const loose = row.format === "loose";
  const official = row.pageUrl.includes("swedishmatch.se");
  return {id: row.id, slug: row.id, productName: row.name, brandId: row.brand, categoryId: "oral-smokeless-tobacco", formatId: row.format, subcategory: row.brand === "americas-best-chew" ? "Loose-leaf Chewing Tobacco" : row.brand === "copenhagen" ? "Moist Snuff" : "Swedish Snus",
    markets: row.brand === "copenhagen" || row.brand === "americas-best-chew" ? ["united-states"] : official ? ["sweden"] : [],
    status: "unknown", recordKind: "current", tobaccoFree: false, containsTobacco: true,
    nicotine: {nicotineSource: "tobacco-material"}, flavor: {name: row.name.replace(/^(?:Copenhagen|General|Grov|Kaliber|Kapten|America's Best Chew) /, "")},
    physicalFormDetails: {unitization: loose ? "loose" : "pre-portioned", useMode: row.brand === "americas-best-chew" ? "chewing" : "placement"},
    deliveryRoute: row.brand === "americas-best-chew" ? ["chewing", "oral-mucosal"] : ["buccal", "gingival"], productTechnology: ["tobacco-matrix"],
    specifications: loose ? {kind: "tobacco"} : {kind: "pouch"},
    sources: [reference(row.id + "-source", official ? "Swedish Match official product page" : "Named tobacco product listing", row.pageUrl, official)],
    verificationStatus: "pending", lastVerified: date,
    localizedShortDescription: {en: "Documented tobacco product; fixed portion dose, composition and current authorization require separate evidence.", zh: "来源已记录的烟草产品；固定份量剂量、配方与当前许可须另行核实。"},
  };
}

export const supplementalProducts: Product[] = [
  ...tobaccoRows.map(tobaccoRecord),
  ...followups.map(row => pouch(row.brand, row.prefix, row.flavor, undefined, reference(row.id + "-page", "SnusDirect named product page", row.url), {sources: [reference(row.id + "-page", "SnusDirect named product page", row.url), reference(row.id + "-catalog", "SnusDirect brand catalog", "https://www.snusdirect.eu/" + ({ace:"ace-nicotine-pouches",apres:"apres-nicotine-pouches",thor:"thor-nicotine-pouches","skruf-superwhite":"skruf-super-white"}[row.brand as "ace" | "apres" | "thor" | "skruf-superwhite"]))], id: row.id, slug: row.id, productName: row.name, series: row.series ?? undefined, nicotine: row.strength !== null ? {nicotineStrengthMg: row.strength, nicotinePerUnit: row.strength, nicotineStrength: `${row.strength} mg per pouch`} : undefined})),
  ...range("on-plus", "on! PLUS", ["Mint", "Tobacco", "Wintergreen"].map(f => [f, [12]]), on, {...us, series: "on! PLUS", specifications: {kind: "pouch", portionsPerCan: 14}}).map(p => ({...p, nicotine: {...p.nicotine, nicotineSource: "tobacco-derived" as const}, sources: [...p.sources, reference(p.id + "-nicotine-origin", "Bluegrass Tobacco: on! PLUS nicotine origin and named 12mg listings", "https://bluegrasstobacco.com/StoreDetails.aspx/Nicotine-Pouches/ON-Nicotine-Pouches/", false)]})),
  ...range("lucy", "Lucy", ["Apple Ice", "Espresso"].map(f => [f, [4, 8, 12]]), lucy, {...us, series: "Slim", specifications: {kind: "pouch", portionsPerCan: 15, pouchSize: "Slim"}}),
  ...range("lucy", "Lucy Breakers", [["Apple Ice", [4, 8]]], lucy, {...us, series: "Breakers", subcategory: "Nicotine pouch with burstable capsule", specifications: {kind: "pouch", portionsPerCan: 15}}),
  // The linked product selectors explicitly list 12mg; an older description still lists 3/6/9mg.
  ...["Tropical Fruit", "Sweet Nectar", "Spearmint", "Classic"].flatMap(f => range("alp", "ALP", [[f, [12]]], alp(f.toLowerCase().replaceAll(" ", "-")), {...us, researchNotes: {en: "12mg is listed in the dated official selector. Older descriptive text omits it; current stock and market authorization remain unconfirmed.", zh: "所查日期的官方规格选择器列出12毫克；旧介绍文字未列该强度，现货与市场许可仍待确认。"}})),
  ...range("fre", "FRE", ["Watermelon", "Mint", "Lush", "Wintergreen"].map(f => [f + " Mega Pack", [3, 6, 9, 12, 15]]), fre, {...us, series: "Mega Pack", researchNotes: {en: "Mega Pack is a separately named retail package. Do not infer its portion count from a standard can.", zh: "Mega Pack是零售目录独立命名的包装；不从标准罐装推断其袋数。"}}),
  ...range("clew", "CLEW", ["Blueberry", "Wintergreen", "Cool Mint", "Spearmint", "Citrus", "Original"].map(f => [f, [3, 6, 9, 12, 15]]), clew, {...us, specifications: {kind: "pouch", portionsPerCan: 20, moisture: "Moist"}}),
  ...range("sesh", "Sesh+", ["Mint", "Wintergreen", "Mango", "Cappuccino", "Clear", "Raspberry Lemon"].map(f => [f, [4, 6, 8]]), sesh, {...us, specifications: {kind: "pouch", portionsPerCan: 20, pouchSize: "Slim"}}),
  ...range("juice-head", "Juice Head", ["Watermelon Strawberry Mint", "Blueberry Lemon Mint", "Raspberry Lemonade Mint", "Mango Strawberry Mint", "Peach Pineapple Mint"].map(f => [f, [6, 12]]), juice, {...us, specifications: {kind: "pouch", portionsPerCan: 20, pouchSize: "Slim"}}),
];

export const supplementalBrands: Brand[] = [["clew", "CLEW", clew], ["sesh", "Sesh+", sesh], ["juice-head", "Juice Head", juice]].map(([id, name, source]) => ({
  id: id as string, slug: id as string, name: name as string, verificationStatus: "pending", lastVerified: date, sources: [source as Source],
  brandCountryBasis: {en: "Brand country has not been independently established. Retail destination and manufacturing claims are not country-of-brand evidence.", zh: "尚未独立确认品牌所属国；零售目的地和生产地宣传不作为品牌所属国依据。"},
  localizedDescription: {en: "Source-linked catalog with separately retained strength variants.", zh: "依据来源目录收录，浓度规格保留独立档案。"},
}));
