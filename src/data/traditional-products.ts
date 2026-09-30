import type { Brand, Manufacturer, Product, Source } from "@/types/catalog";

const reviewed = "2026-09-30";
const source = (id: string, sourceName: string, sourceUrl: string, sourceType: Source["sourceType"], notes?: string): Source => ({ id, sourceName, sourceUrl, sourceType, accessedAt: reviewed, notes });
const reportUrl = "https://extranet.who.int/fctcapps/sites/default/files/kh-media/SmokelessTobaccoAndPublicHealth.pdf";
const report = source("nci-cdc-global-2014", "NCI / CDC (2014): Smokeless Tobacco and Public Health, chapter 3 and appendix B", reportUrl, "government", "Historical formats and manufacturer names; not evidence of present retail availability. / 历史剂型及制造商资料，不作为当前零售供应依据。");
const archivedPhoto = (label: string) => source("nci-cdc-figure-3-2-image", `NCI / CDC (2014), figure 3-2: ${label}`, reportUrl + "#page=108", "government", "Photograph credited to Clifford Watson, CDC. The site frames only the identified package in the unchanged figure. Historical packaging; no substitute or generated product image. / 照片署名 Clifford Watson（CDC）；网页仅显示原图中该款包装的区域。为历史包装，没有使用替代或生成图片。");
const starClosure = source("star-2012-closure", "Star Scientific: December 2012 SEC filing announcing discontinuation", "https://www.sec.gov/Archives/edgar/data/776008/000114420412068279/v330419_8k.htm", "manufacturer", "Manufacture, distribution and sale of Ariva and Stonewall Hard Snuff ceased on 31 December 2012. / Ariva 和 Stonewall Hard Snuff 的制造、分销与销售于 2012 年 12 月 31 日结束。");
const starMaker = source("star-tobacco-2011", "Star Scientific 2011 annual report: Star Tobacco subsidiary and products", "https://www.sec.gov/Archives/edgar/data/776008/000119312512117380/d305197d10k.htm", "manufacturer");
const usstc = source("usstc-brand-origin", "USSTC: company history and American brand portfolio", "https://www.ussmokeless.com/company/about-usstc", "manufacturer");
const copenhagenOfficial = source("copenhagen-official-product", "Altria Science: Copenhagen Classic Snuff", "https://sciences.altria.com/en/harm-reduction/smoke-free-product-platforms/smokeless-tobacco", "manufacturer");
const copenhagenFDA = source("copenhagen-fda-market-basis", "FDA: Copenhagen Classic Snuff is a pre-existing marketed tobacco product", "https://www.fda.gov/tobacco-products/advertising-and-promotion/us-smokeless-tobacco-company-modified-risk-tobacco-product-mrtp-application", "regulator", "FDA explicitly identifies Copenhagen Snuff Fine Cut as the earlier name of Classic Snuff and confirms its pre-existing-product market basis. MRTP is a specific claim authorization, not a declaration that the product is safe. / FDA 明确对应旧名 Copenhagen Snuff Fine Cut，并确认其既有烟草产品的市场依据；MRTP 是特定声明授权，不表示产品安全。");
const copenhagenRetail = source("copenhagen-exact-package", "Super 1 Foods: Copenhagen Snuff, UPC 00073100001079", "https://www.super1foods.com/product/copenhagen-snuff-original-12-ounce-id-00073100001079", "retail-reference", "Exact Copenhagen Snuff photo uses the 2022 anniversary lid. Image: https://images.cdn.retail.brookshires.com/detail/00073100001079_C1C1.jpeg. Not a photo of Long Cut or a nicotine pouch. / 对应 Copenhagen Snuff 的 2022 年周年罐盖照片，区别于 Long Cut 或尼古丁袋。");
const abcOfficial = source("abc-official", "America's Best Chew: official Original Blend product range", "https://www.americasbestchew.com/", "official-brand");
const abcRename = source("abc-red-man-rename", "Swedish Match: Red Man renamed America's Best Chew (20 January 2022)", "https://www.prnewswire.com/news-releases/red-man-rebrands-as-americas-best-chew-301465071.html", "manufacturer", "The company confirms a name and packaging change with the same product. The historical name is kept as an alias, not a second product. / 公司确认产品不变，仅改名和包装；历史名作为别名保留，不重复录入。");
const abcOwner = source("abc-operator", "America's Best Chew: Swedish Match North America operator and U.S. address", "https://www.americasbestchew.com/terms_of_use/", "manufacturer");
const abcRetail = source("abc-original-pack", "Matchboxbros: America's Best Original Blend, six 3 oz retail bags", "https://matchboxbros.com/collections/americas-best-chew/products/americas-best-original-blend-6-3oz", "retail-reference", "Photo shows the original-blend display carton; a retail bag contains loose leaf, not individual oral pouches. / 图片为原味展示盒；其中的零售袋装有散叶，并非独立口含袋。");
const tobaccoRules = source("fda-smokeless-scope", "FDA: moist snuff, snus and chewing tobacco product definitions", "https://www.fda.gov/tobacco-products/products-ingredients-components/smokeless-tobacco-products-including-dip-snuff-snus-and-chewing-tobacco", "regulator");
const lawlerStudy = source("lawler-2013-exact-variant", "Lawler et al. (2013): oral tobacco chemical characterization, table 2", "https://pmc.ncbi.nlm.nih.gov/articles/PMC5659123/", "scientific");
const measuredVariants: Record<string, [number, number, number]> = {
  "ariva-wintergreen-historical": [5.81, 7.57, 4.56],
  "stonewall-java-historical": [8.74, 7.34, 4.64],
  "camel-orbs-fresh-historical": [3.90, 7.88, 6.15],
};

const region = (x: number, y: number, width: number, height: number): NonNullable<Product["imageRegion"]> => ({ x, y, width, height, sourceWidth: 1210, sourceHeight: 1568 });
type HistoricalInput = Pick<Product, "id" | "productName" | "brandId" | "formatId" | "subcategory" | "specifications" | "physicalFormDetails" | "flavor" | "manufacturerId" | "status" | "recordContext" | "imageRegion">;
function historical(input: HistoricalInput): Product {
  const closed = input.brandId === "ariva" || input.brandId === "stonewall";
  const photo = archivedPhoto(input.productName);
  const measurement = measuredVariants[input.id];
  return {
    ...input, slug: input.id, series: "Historical oral tobacco", parentCompany:closed ? "Star Scientific, Inc. (historical)" : input.brandId === "camel-oral" ? "R.J. Reynolds Tobacco Company (historical oral line)" : "Altria Group, Inc.", categoryId: "oral-smokeless-tobacco", markets: ["united-states"],
    recordKind: "historical", containsTobacco: true, tobaccoFree: false,
    deliveryRoute: ["oral-mucosal"], productTechnology: ["tobacco-matrix"],
    productImage: "/products/nci-cdc-dissolvables-2014.jpg", imageSource: photo,
    localizedShortDescription: input.recordContext,
    nicotine: { nicotineSource: "tobacco-material" },
    sources: [report, photo, ...(closed ? [starMaker, starClosure] : []), ...(measurement ? [lawlerStudy] : [])], verificationStatus: "verified", lastVerified: reviewed,
    historicalMeasurements: measurement ? {
      samplePeriod: { en: "May 2007–May 2009 acquisition window; published 2013", zh: "2007 年 5 月至 2009 年 5 月样品购得时间范围；2013 年发表" },
      nicotineMgPerGWet: measurement[0], ph: measurement[1], moisturePercent: measurement[2], source: lawlerStudy,
      notes: { en: "Exact named variant, historical samples only. Nicotine is measured per gram of wet product (n=3); pH is an aqueous suspension measurement (n=2); moisture is a single measurement. These are not current label strengths or absorbed doses. The study does not assign an exact acquisition date to each variant.", zh: "对应具名款式，仅代表历史样品。尼古丁按产品湿重计（n=3）；pH 为水悬液测量（n=2）；水分为单次测量。不作为当前标签强度或人体吸收量；研究未逐款给出精确购样日期。" },
    } : undefined,
    researchNotes: {
      en: "Identity and format are documented in a historical report and its labelled photograph. Numeric nicotine, pH, moisture and sensory values are not copied from pooled category ranges or other flavours. Current production and sale must be checked separately.",
      zh: "名称与剂型依据历史报告及具名照片确认。尼古丁、pH、水分和感官参数不从类别汇总范围或其他口味套用；当前生产与销售情况须另行核对。",
    },
    marketListings: [{ marketId: "united-states", status: "pending", regulatorySource: tobaccoRules, notes: {
      en: closed ? "Historical U.S. product. The manufacturer's SEC filing confirms discontinuation on 31 December 2012; not listed as currently marketed." : "Historical U.S. product documented in the 2014 report. Present sale and exact product regulatory evidence are not confirmed; historical availability does not establish present marketed status.",
      zh: closed ? "美国历史产品；制造商 SEC 公告确认于 2012 年 12 月 31 日停产停售，不标为当前已上市。" : "2014 年报告收录的美国历史产品；未确认当前销售与具体产品监管依据，历史供应情况不作为当前已上市依据。",
    } }],
  };
}

export const traditionalProducts: Product[] = [
  {
    id: "copenhagen-classic-snuff", slug: "copenhagen-classic-snuff", productName: "Copenhagen Classic Snuff", historicalNames: ["Copenhagen Snuff Fine Cut", "Copenhagen Original Snuff"],
    brandId: "copenhagen", series: "Copenhagen Snuff", categoryId: "oral-smokeless-tobacco", subcategory: "Moist Snuff", formatId: "loose",
    physicalFormDetails: { shape: "loose-cut", unitization: "loose", useMode: "placement", commercialPresentation: "Fine-cut moist snuff in a can" },
    manufacturerId: "us-smokeless-tobacco", parentCompany: "Altria Group, Inc.", markets: ["united-states"], status: "active",
    localizedShortDescription: { en: "Fine-cut oral moist snuff. FDA explicitly connects the historical Fine Cut name with Classic Snuff.", zh: "用于口腔放置的细切湿鼻烟。FDA 明确将旧名 Fine Cut 与 Classic Snuff 对应。" },
    recordContext: { en: "A traditional oral moist-snuff record. Historical names are aliases of this product, not additional SKUs. The retail photograph uses the Fine Cut name; nicotine levels from old studies are not presented as current pack specifications.", zh: "传统口用湿鼻烟档案。历史名称作为该产品的别名保留，不另算 SKU。零售照片使用 Fine Cut 名称；旧研究中的尼古丁测量值不作为当前包装规格展示。" },
    productImage: "/products/copenhagen-snuff-fine-cut.jpg", imageSource: copenhagenRetail, officialWebsite: copenhagenOfficial.sourceUrl,
    flavor: { name: "Tobacco", category: "tobacco flavor" }, nicotine: { nicotineSource: "tobacco-material" },
    containsTobacco: true, tobaccoFree: false, deliveryRoute: ["gingival", "buccal"], productTechnology: ["tobacco-matrix"],
    specifications: { kind: "tobacco", format: "Fine-cut loose moist snuff | 中文：细切散装湿鼻烟", tobaccoType: "Tobacco leaf | 中文：烟草叶" },
    sources: [copenhagenFDA, copenhagenOfficial, usstc, copenhagenRetail, tobaccoRules], verificationStatus: "verified", lastVerified: reviewed,
    marketListings: [{ marketId: "united-states", status: "marketed", officialProductSource: copenhagenOfficial, regulatorySource: copenhagenFDA, notes: {
      en: "FDA explicitly confirms the product's pre-existing tobacco status permits U.S. marketing, and the manufacturer identifies Classic Snuff. This legal basis is separate from its March 2023 modified-risk claim authorization.",
      zh: "FDA 明确确认该产品的既有烟草产品身份支持其在美国上市；制造商资料列明 Classic Snuff。此市场依据与 2023 年 3 月的减害声明授权分别记录。",
    } }],
  },
  {
    id: "americas-best-original-blend", slug: "americas-best-original-blend", productName: "America's Best Chew Original Blend", historicalNames: ["Red Man Original", "Red Man Original Blend"],
    brandId: "americas-best-chew", series: "Original Blend", categoryId: "oral-smokeless-tobacco", subcategory: "Loose-leaf Chewing Tobacco", formatId: "loose",
    physicalFormDetails: { shape: "loose-cut", unitization: "loose", useMode: "chewing", commercialPresentation: "Loose-leaf chew in retail bags" },
    manufacturerId: "swedish-match-north-america", parentCompany: "Swedish Match (a Philip Morris International subsidiary)", markets: ["united-states"], status: "active",
    localizedShortDescription: { en: "Traditional loose-leaf chewing tobacco; the Red Man name is retained as a historical alias after the 2022 rebrand.", zh: "传统散叶嚼烟；2022 年改名后，将 Red Man 作为历史别名保留。" },
    recordContext: { en: "The manufacturer announced unchanged product with new branding in January 2022. Current official range and retail evidence establish product existence and availability; an exact government market record is still needed for this database's Listed status.", zh: "制造商于 2022 年 1 月宣布产品不变、更新名称与包装。现官网及零售资料确认其存在与供应；按本库标准，仍需具体政府市场记录才能标为“已上市”。" },
    productImage: "/products/americas-best-original-blend.jpg", imageSource: abcRetail, officialWebsite: abcOfficial.sourceUrl,
    flavor: { name: "Original", category: "tobacco flavor", sensoryNotes: "Full-bodied tobacco character (manufacturer description)" },
    nicotine: { nicotineSource: "tobacco-material" }, containsTobacco: true, tobaccoFree: false, deliveryRoute: ["chewing", "oral-mucosal"], productTechnology: ["tobacco-matrix"],
    specifications: { kind: "tobacco", format: "Loose-leaf chew; 3 oz per retail bag | 中文：散叶嚼烟，每零售袋 3 盎司", tobaccoType: "Leaf tobacco | 中文：烟草叶" },
    sources: [abcOfficial, abcRename, abcOwner, abcRetail, report, tobaccoRules], verificationStatus: "verified", lastVerified: reviewed,
  },
  historical({ id: "ariva-wintergreen-historical", productName: "Ariva Wintergreen", brandId: "ariva", manufacturerId: "star-tobacco-historical", formatId: "tablet", subcategory: "Dissolvable Tobacco", status: "discontinued",
    imageRegion: region(0, 0, 565, 385), physicalFormDetails: { shape: "oval", unitization: "pre-portioned", useMode: "dissolution" }, flavor: { name: "Wintergreen", category: "mint" }, specifications: { kind: "tablet", piecesPerPack: 20 },
    recordContext: { en: "Historical wintergreen dissolvable tobacco tablet. The archived pack shows 20 pieces; discontinued with the Ariva line at the end of 2012.", zh: "历史冬青口味可溶烟草片。档案包装标注 20 片；随 Ariva 系列于 2012 年底停产。" } }),
  historical({ id: "stonewall-java-historical", productName: "Stonewall Java", brandId: "stonewall", manufacturerId: "star-tobacco-historical", formatId: "tablet", subcategory: "Dissolvable Tobacco", status: "discontinued",
    imageRegion: region(630, 0, 580, 385), physicalFormDetails: { shape: "oval", unitization: "pre-portioned", useMode: "dissolution" }, flavor: { name: "Java", category: "coffee" }, specifications: { kind: "tablet", piecesPerPack: 20 },
    recordContext: { en: "Historical Java dissolvable tobacco tablet, not Stonewall moist or dry snuff. The archived pack shows 20 pieces; the dissolvable line ended in December 2012.", zh: "历史 Java 可溶烟草片，区别于 Stonewall 湿鼻烟或干鼻烟。档案包装标注 20 片；可溶产品系列于 2012 年 12 月结束。" } }),
  historical({ id: "camel-orbs-fresh-historical", productName: "Camel Orbs Fresh", brandId: "camel-oral", manufacturerId: "rj-reynolds-historical", formatId: "tablet", subcategory: "Dissolvable Tobacco", status: "unknown",
    imageRegion: region(70, 460, 340, 410), physicalFormDetails: { shape: "oval", unitization: "pre-portioned", useMode: "dissolution" }, flavor: { name: "Fresh" }, specifications: { kind: "tablet" },
    recordContext: { en: "Early Camel dissolvable tobacco tablet, shown as Fresh in the 2014 report photograph. The line was introduced in 2009; current availability of this named version is unconfirmed.", zh: "早期 Camel 可溶烟草片；2014 年报告照片标注 Fresh。系列于 2009 年推出，未确认该具名版本当前仍有供应。" } }),
  historical({ id: "camel-strips-fresh-historical", productName: "Camel Strips Fresh", brandId: "camel-oral", manufacturerId: "rj-reynolds-historical", formatId: "film", subcategory: "Dissolvable Tobacco", status: "unknown",
    imageRegion: region(800, 470, 340, 500), physicalFormDetails: { shape: "strip", unitization: "pre-portioned", useMode: "dissolution" }, flavor: { name: "Fresh" }, specifications: { kind: "film", filmMaterial: "Tobacco-containing dissolvable strip | 中文：含烟草的可溶条状薄片" },
    recordContext: { en: "Historical tobacco-containing oral strip, shown as Fresh in the report. It is classified as oral tobacco rather than a tobacco-free nicotine film; current sale is not established.", zh: "报告所示历史 Fresh 含烟草口用条状薄片。归入口腔烟草，区别于无烟草尼古丁膜；未确认当前销售。" } }),
  historical({ id: "camel-sticks-mellow-historical", productName: "Camel Sticks Mellow", brandId: "camel-oral", manufacturerId: "rj-reynolds-historical", formatId: "stick", subcategory: "Dissolvable Tobacco", status: "unknown",
    imageRegion: region(480, 470, 240, 395), physicalFormDetails: { shape: "stick", unitization: "pre-portioned", useMode: "dissolution" }, flavor: { name: "Mellow" }, specifications: { kind: "tobacco", format: "Dissolvable formed tobacco stick | 中文：可溶成型烟草棒" },
    recordContext: { en: "Historical fully dissolvable tobacco stick labelled Mellow. Unlike the coated Marlboro and Skoal sticks, this format does not retain a toothpick core. Current sale of this version is unconfirmed.", zh: "历史 Mellow 可完全溶解烟草棒。与 Marlboro、Skoal 的涂覆棒不同，此形态不保留牙签芯；未确认该版本当前销售。" } }),
  historical({ id: "marlboro-cool-mint-tobacco-stick-historical", productName: "Marlboro Cool Mint Tobacco Stick", brandId: "marlboro-oral-us", manufacturerId: "philip-morris-usa-historical", formatId: "stick", subcategory: "Tobacco-coated Stick", status: "unknown",
    imageRegion: region(135, 1020, 410, 292), physicalFormDetails: { shape: "stick", unitization: "pre-portioned", useMode: "dissolution" }, flavor: { name: "Cool Mint", category: "mint" }, specifications: { kind: "tobacco", portionsPerCan: 10, format: "Tobacco-coated toothpick; core does not dissolve | 中文：烟草涂覆牙签，芯不溶解" },
    recordContext: { en: "Historical oral tobacco stick introduced in limited test markets in 2011. The pictured pack contains ten sticks; the tobacco coating dissolves but the support is discarded. Not a cigarette or heated-tobacco stick.", zh: "2011 年在有限市场测试的历史口用烟草棒。图示包装为十支；烟草涂层溶解后须丢弃载体。并非卷烟或加热烟草烟支。" } }),
  historical({ id: "skoal-original-tobacco-stick-historical", productName: "Skoal Original Tobacco Stick", brandId: "skoal", manufacturerId: "us-smokeless-tobacco", formatId: "stick", subcategory: "Tobacco-coated Stick", status: "unknown",
    imageRegion: region(640, 1020, 430, 292), physicalFormDetails: { shape: "stick", unitization: "pre-portioned", useMode: "dissolution" }, flavor: { name: "Original", category: "original" }, specifications: { kind: "tobacco", portionsPerCan: 10, format: "Tobacco-coated toothpick; core does not dissolve | 中文：烟草涂覆牙签，芯不溶解" },
    recordContext: { en: "Historical Original tobacco-coated stick, documented in the 2014 report and introduced in 2011 test markets. Ten sticks are labelled on the pack. It is distinct from Skoal loose moist snuff and oral tobacco pouches.", zh: "2014 年报告收录的历史 Original 烟草涂覆棒，2011 年进入测试市场。包装标注十支；区别于 Skoal 散装湿鼻烟及口含烟草袋。" } }),
];

function americanBrand(id: string, name: string, manufacturerId: string, sources: Source[], basis: Brand["brandCountryBasis"], formats: string[]): Brand {
  const parentCompanies: Record<string,string> = {copenhagen:"Altria Group, Inc.",skoal:"Altria Group, Inc.","americas-best-chew":"Swedish Match (a Philip Morris International subsidiary)",ariva:"Star Scientific, Inc. (historical)",stonewall:"Star Scientific, Inc. (historical)","camel-oral":"R.J. Reynolds Tobacco Company (historical oral line)","marlboro-oral-us":"Philip Morris USA (historical oral line)"};
  return { id, slug: id, name, parentCompany:parentCompanies[id], brandCountry: "United States", brandCountryBasis: basis, localizedDescription:{en:"Source-linked oral tobacco profile. Historical product names, manufacturing identity and present market status are recorded separately.",zh:"有来源的口腔烟草品牌档案。历史产品名称、制造主体与当前市场状态分别记录。"}, manufacturerIds: [manufacturerId], categoryIds: ["oral-smokeless-tobacco"], formatIds: formats, marketIds: ["united-states"], sources, lastVerified: reviewed };
}
const historicalBasis = { en: "U.S. affiliation of the oral product line and manufacturer documented in the NCI/CDC report. This does not establish the manufacturing plant or a present sales market.", zh: "按 NCI/CDC 报告所记载的美国口用产品系列及制造主体归属；不据此确定制造工厂或当前销售市场。" };
export const traditionalBrands: Brand[] = [
  americanBrand("copenhagen", "Copenhagen", "us-smokeless-tobacco", [usstc, copenhagenFDA], { en: "U.S. brand origin: USSTC records the Copenhagen Snuff business founded in Pittsburgh in 1822. The name does not imply Danish origin.", zh: "按美国品牌起源归属：USSTC 记载 Copenhagen Snuff 业务于 1822 年始于匹兹堡；名称不代表丹麦起源。" }, ["loose"]),
  {...americanBrand("americas-best-chew", "America's Best Chew", "swedish-match-north-america", [abcRename, abcOwner], { en: "U.S. brand and current American operator, as documented by the manufacturer. Swedish parent ownership does not make it a Swedish-origin brand.", zh: "按制造商记载的美国品牌及现美国运营主体归属；瑞典母公司股权不作为瑞典品牌起源依据。" }, ["loose"]), legacySlugs:["red-man"], officialWebsite:abcOfficial.sourceUrl},
  americanBrand("ariva", "Ariva", "star-tobacco-historical", [report,starMaker,starClosure], historicalBasis, ["tablet"]),
  americanBrand("stonewall", "Stonewall", "star-tobacco-historical", [report,starMaker,starClosure], historicalBasis, ["tablet"]),
  americanBrand("camel-oral", "Camel (historical oral tobacco)", "rj-reynolds-historical", [report], historicalBasis, ["tablet","film","stick"]),
  americanBrand("marlboro-oral-us", "Marlboro (U.S. historical oral tobacco)", "philip-morris-usa-historical", [report], historicalBasis, ["stick"]),
  americanBrand("skoal", "Skoal", "us-smokeless-tobacco", [usstc,report], historicalBasis, ["stick"]),
];
export const traditionalManufacturers: Manufacturer[] = [
  { id:"us-smokeless-tobacco", slug:"us-smokeless-tobacco", name:"U.S. Smokeless Tobacco Company LLC", country:"United States", officialWebsite:usstc.sourceUrl, sources:[usstc,copenhagenFDA] },
  { id:"star-tobacco-historical", slug:"star-tobacco-historical", name:"Star Tobacco, Inc. (historical)", country:"United States", sources:[starMaker,starClosure] },
  { id:"rj-reynolds-historical", slug:"rj-reynolds-historical", name:"R.J. Reynolds Tobacco Company (historical oral products)", country:"United States", sources:[report] },
  { id:"philip-morris-usa-historical", slug:"philip-morris-usa-historical", name:"Philip Morris USA (historical oral products)", country:"United States", sources:[report] },
];
