import type { Brand, Product, Source } from "@/types/catalog";

const reviewed = "2026-09-30";
const reference = (id: string, name: string, url: string, sourceType: Source["sourceType"] = "manufacturer"): Source => ({
  id, sourceName: name, sourceUrl: url, sourceType, accessedAt: reviewed,
});
const zynFDA = reference("zyn-fda-physical-specifications", "FDA: exact ZYN 3/6 mg product specifications", "https://www.accessdata.fda.gov/static/searchtobacco/2-6-25/MGO_Ltr_SMUSA_PM593-PM612_Zyn_MM_DD_2024_Redacted.pdf", "regulator");
const zynUltraOfficial = reference("zyn-ultra-official-range", "ZYN USA: official ZYN Ultra product range and specifications", "https://us.zyn.com/zyn-ultra-11mg-nicotine-pouches/", "official-brand");
const classic = new Set(["Chill", "Cinnamon", "Citrus", "Coffee", "Cool Mint", "Menthol", "Peppermint", "Smooth", "Spearmint", "Wintergreen"]);
const smpcIds: Record<string, string> = {"nicorette-uk-fresh-mint-gum-2mg-105":"6205", "nicorette-uk-original-gum-2mg-105":"1089", "nicorette-uk-cools-lozenge-2mg-40":"4110", "nicorette-uk-fruit-lozenge-2mg-40":"9438", "nicorette-uk-microtab-2mg-100":"6182"};

/** Enrichment is shared by detail, comparison, filters and all catalog indexes. */
export function enrichProduct(record: Product): Product {
  const p: Product = {...record, nicotine: {...record.nicotine}, flavor: {...record.flavor, name: record.flavor?.name ?? "Not documented in reviewed sources"}, specifications: {...record.specifications}, sources: [...record.sources]};
  const kind = p.specifications.kind;
  p.physicalFormDetails = {
    unitization: p.formatId === "loose" ? "loose" : "pre-portioned",
    useMode: kind === "gum" ? "chewing" : kind === "lozenge" || kind === "tablet" ? "dissolution" : "placement",
    commercialPresentation: p.productName,
    ...p.physicalFormDetails,
  };
  if (p.formatId === "film") p.physicalFormDetails.shape ??= "sheet";
  p.subcategory ??= kind === "tobacco" && p.formatId === "pouch" ? "Portion snus" : kind === "gum" ? "Nicotine replacement gum" : kind === "lozenge" ? "Nicotine replacement lozenge" : kind === "tablet" ? "Sublingual nicotine tablet" : kind === "film" ? "Gel oral film" : p.brandId === "huabao" ? (p.productName.includes("AERO") ? "Film-in-pouch" : "Gel-fragment pouch") : kind === "pouch" ? "Tobacco-leaf-free nicotine pouch" : undefined;
  p.nicotine!.strengthLabel ??= p.nicotine?.nicotineStrength;
  if (p.tobaccoFree !== undefined) p.containsTobacco ??= !p.tobaccoFree;
  if (p.brandId === "zyn") { p.containsTobacco = false; p.tobaccoFree = true; }
  if (p.containsTobacco === true) {
    p.nicotine!.nicotineSource = "tobacco-material";
    p.nicotine!.nicotineForm ??= "Nicotine naturally present in tobacco; speciation not disclosed";
  }
  if (p.brandId === "zyn" && p.markets.includes("united-states") && classic.has(p.flavor!.name) && [3,6].includes(p.nicotine?.nicotinePerUnit ?? 0)) {
    p.specifications = {...p.specifications, kind:"pouch", unitWeightMg:400, netWeightG:6, portionsPerCan:15, pouchSize:"28 × 14 × 4.5 mm"};
    p.physicalFormDetails = {...p.physicalFormDetails, shape:"rectangular-pouch"};
    p.nicotine!.nicotineSource = "tobacco-derived";
    p.sources.push(zynFDA);
  }
  if (p.brandId === "zyn" && p.id.includes("ultra")) {
    p.sources.push(zynUltraOfficial);
  }
  if (p.brandId === "nicorette") {
    const id = smpcIds[p.id];
    p.sources.push(reference("product-characteristics", "Nicorette: product composition and pharmaceutical form", `https://www.medicines.org.uk/emc/product/${id}/smpc`));
    p.containsTobacco = false; p.tobaccoFree = true;
    p.nicotine!.nicotineForm = kind === "tablet" ? "Nicotine beta-cyclodextrin complex" : "Nicotine resinate";
    if (kind === "tablet") p.specifications = {...p.specifications, kind:"tablet", piecesPerPack:100, dissolutionTimeMin:30};
    if (kind === "lozenge") p.physicalFormDetails.shape = "oval";
    if (kind === "gum") p.specifications = {...p.specifications, kind:"gum", chewingTimeMin:30, gumBase:"Chewing gum base containing butylated hydroxytoluene (E321) | 中文：含丁基羟基甲苯（E321）的胶基"};
    const fresh = p.id.includes("fresh-mint");
    const fruit = p.id.includes("fruit");
    if (kind === "gum") p.specifications.sweetener = fresh ? ["Xylitol", "Acesulfame potassium"] : ["Sorbitol"];
    if (kind === "lozenge") p.specifications.sweetener = ["Sucralose", "Acesulfame potassium"];
    p.flavor!.sensoryNotes = fresh ? "Peppermint oil and levomenthol listed in the formulation; no standardized sensory rating published" : fruit ? "Tutti-frutti flavouring listed in the formulation; no standardized sensory rating published" : kind === "tablet" ? "No flavouring listed in the reviewed excipient list; sensory intensity not documented" : "See the product leaflet for formulation; no standardized sensory rating published";
  }
  if (p.brandId === "on-plus") p.flavor!.category = p.flavor!.name === "Tobacco" ? "tobacco flavor" : "mint";
  if (!p.flavor!.category) {
    const flavorName = p.flavor!.name.toLowerCase();
    p.flavor!.category = flavorName.startsWith("not documented") ? "Not documented in reviewed sources"
      : flavorName.includes("coffee") ? "coffee"
      : flavorName.includes("mint") || flavorName.includes("menthol") || flavorName.includes("wintergreen") ? "mint"
      : flavorName.includes("citrus") || flavorName.includes("orange") || flavorName.includes("lemon") ? "citrus"
      : flavorName.includes("fruit") || flavorName.includes("berry") || flavorName.includes("cherry") || flavorName.includes("peach") || flavorName.includes("papaya") || flavorName.includes("grape") || flavorName.includes("mango") ? "fruit"
      : flavorName.includes("cinnamon") ? "spice"
      : flavorName.includes("tobacco") ? "tobacco flavor"
      : flavorName === "original" ? "original" : ["smooth","chill","signature smooth","chill mist"].includes(flavorName) ? "unflavored" : "Not documented in reviewed sources";
  }
  if (p.brandId === "velo") {
    p.flavor!.sensoryNotes = "Papaya with tropical fruit notes (manufacturer description)";
    p.sources.push(reference("velo-papaya-description", "VELO UK: Smooth Papaya product and use information", "https://www.velo.com/gb/en/our-products/product/smooth-papaya", "official-brand"));
  }
  p.flavor!.sweetness ??= "No standardized sweetness rating documented";
  p.flavor!.sensoryNotes ??= "Flavor designation recorded above; no additional sensory assessment documented";
  p.nicotine!.nicotineSource ??= "unknown";

  const spec = p.specifications;
  const count = "portionsPerCan" in spec ? spec.portionsPerCan : "piecesPerPack" in spec ? spec.piecesPerPack : undefined;
  const perUnit = p.nicotine?.nicotinePerUnit;
  const formulasEn: string[] = [], formulasZh: string[] = [];
  if (count && spec.netWeightG && !spec.unitWeightMg) {
    spec.unitWeightMg = Math.round(spec.netWeightG / count * 1000 * 100) / 100;
    formulasEn.push(`Average unit mass = ${spec.netWeightG} g ÷ ${count} × 1000 = ${spec.unitWeightMg} mg.`);
    formulasZh.push(`平均单份质量 = ${spec.netWeightG} 克 ÷ ${count} × 1000 = ${spec.unitWeightMg} 毫克。`);
  }
  if (perUnit !== undefined && count) {
    p.nicotine!.totalNicotine = Math.round(perUnit * count * 100) / 100;
    formulasEn.push(`Nominal pack nicotine = ${perUnit} mg × ${count} = ${p.nicotine!.totalNicotine} mg.`);
    formulasZh.push(`整包装标称尼古丁量 = ${perUnit} 毫克 × ${count} = ${p.nicotine!.totalNicotine} 毫克。`);
  }
  if (perUnit !== undefined && spec.unitWeightMg) {
    p.nicotine!.nicotinePerGram = Math.round(perUnit / (spec.unitWeightMg / 1000) * 100) / 100;
    formulasEn.push(`Nicotine per gram = ${perUnit} mg ÷ (${spec.unitWeightMg} mg / 1000) = ${p.nicotine!.nicotinePerGram} mg/g.`);
    formulasZh.push(`每克尼古丁量 = ${perUnit} 毫克 ÷ (${spec.unitWeightMg} 毫克 / 1000) = ${p.nicotine!.nicotinePerGram} 毫克/克。`);
  }
  p.calculationNotes = formulasEn.length ? {en:formulasEn.join(" ")+" Calculated from recorded nominal values, not a laboratory measurement or absorbed dose.", zh:formulasZh.join(" ")+"根据已记录的标称数值计算，不代表实测值或人体吸收量。"} : undefined;
  p.researchNotes ??= {
    en:"Classification describes the documented format, packaging and use. Missing values are explicitly marked as not documented in reviewed sources, not zero. Cooling and sweetness are not inferred from flavour names. Strength and unit mass are never copied between different variants. Sources are listed below.",
    zh:"分类依据已记录的剂型、包装及使用方式整理。尚未查到依据的参数明确标注为“所查来源未载明”，不代表零值。清凉感和甜度不根据口味名称推测；不同规格之间不套用强度或单份质量。依据见下方来源。",
  };
  return p;
}

const affiliation: Record<string, {country:string; en:string; zh:string; source:Source}> = {
  "on-plus": {country:"United States", en:"Current brand operator: Helix Innovations, an Altria company in the United States. This is not the historical origin of the original on! brand.", zh:"按当前品牌运营主体归属：美国 Altria 旗下 Helix Innovations；不表示原 on! 品牌的历史起源。", source:reference("brand-affiliation", "Altria: Helix Innovations and on! PLUS", "https://www.altria.com/about-altria/our-companies/helix-innovations")},
  zyn:{country:"Sweden", en:"Brand development origin: Swedish Match, Sweden; first commercial launch in the US is recorded separately from origin.", zh:"按品牌研发起源归属：瑞典 Swedish Match；首次在美国商业上市与品牌起源分别记录。",source:reference("brand-affiliation", "ZYN UK: brand development history", "https://www.zyn.com/gb/en/blog/when-were-nicotine-pouches-invented.html", "official-brand")},
  nicorette:{country:"Sweden", en:"Brand development origin: Leo AB and nicotine gum research in Sweden. Ownership and license holders vary by market.", zh:"按品牌研发起源归属：瑞典 Leo AB 的尼古丁口香糖研究；各市场品牌权利人及许可持有人可能不同。",source:reference("brand-affiliation", "Nicorette: company history", "https://www.nicorette.com/history/", "official-brand")},
  velo:{country:"Sweden", en:"Brand origin: BAT states that VELO originated in Sweden. This does not identify the production site of any individual pouch.", zh:"按品牌起源归属：BAT 说明 VELO 起源于瑞典；这不代表具体产品的生产地点。",source:reference("brand-affiliation", "BAT: VELO brand profile and origin", "https://www.bat.com/brands-and-innovation/velo", "official-brand")},
};
export function enrichBrand(brand: Brand): Brand {
  if (brand.id === "huabao") return {...brand, brandCountry:"China", brandCountryBasis:{en:"China, as identified by the project owner, with the Shenzhen manufacturer named in Huabao International's NGP business profile; not evidence of any specific factory or sales market.",zh:"据项目提供者确认归属中国；华宝国际 NGP 业务官网亦列明深圳制造商主体。品牌所属国不作为具体工厂或销售市场依据。"},lastVerified:"2026-09-30"};
  const entry = affiliation[brand.id];
  if (entry) return {...brand, brandCountry:entry.country, brandCountryBasis:{en:entry.en,zh:entry.zh}, sources:[...brand.sources,entry.source],lastVerified:reviewed};
  if (["general","grov","kaliber","kapten"].includes(brand.id)) return {...brand,brandCountry:"Sweden",brandCountryBasis:{en:"Swedish snus brand in the Swedish Match portfolio. Parent-company ownership is recorded separately.",zh:"Swedish Match 品牌组合中的瑞典 snus 品牌；母公司股权归属单独记录。"},sources:[...brand.sources,reference("brand-affiliation","Swedish Match: brand portfolio and Swedish distribution","https://www.swedishmatch.se/vara-varumarken/","official-brand")],lastVerified:reviewed};
  return {...brand,brandCountryBasis:brand.brandCountryBasis ?? {en:"Brand country has not been established from the sources reviewed.",zh:"所查来源尚不能确定品牌所属国。"}};
}
