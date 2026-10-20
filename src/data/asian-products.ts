import type { Brand, Manufacturer, Product, Source } from "@/types/catalog";

const checked = "2026-10-19";
const source = (id: string, sourceName: string, sourceUrl: string, sourceType: Source["sourceType"], notes?: string): Source => ({ id, sourceName, sourceUrl, sourceType, accessedAt: checked, notes });
const jtHistory = source("jt-zerostyle-history", "Japan Tobacco: Business Report Vol.51, Zerostyle Snus", "https://www.jti.co.jp/investors/others/12g3_2/pdf/20151228_E1.pdf", "manufacturer");
const jtPrices = source("jt-zerostyle-prices-2021", "JT: 2021 named Zerostyle Snus price application", "https://www.jt.com/media/news/2021/pdf/20210730_14.pdf", "manufacturer");
const japanApproval = source("jp-mof-zerostyle-2023", "Japan Ministry of Finance: 2023 retail prices, Rich Strong and Apple Mint Strong", "https://www.mof.go.jp/policy/tab_salt/topics/20230801_kouriteika.pdf", "government", "Historical price approval and manufacturing country; not proof of current availability. / 历史价格批准及制造国记录，不作为当前供应依据。");
const jpCatalog = source("jp-zerostyle-retailer", "Hamakiyasan: named Zerostyle Snus range, end-of-stock notices", "https://hamakiyasan.easy-myshop.jp/c-item-list?category_id=7", "retail-reference");
const russianCase = source("ru-court-a56-2020", "Arbitration judgment A56-22873/2020, 8 October 2020 (SudAct reproduction)", "https://sudact.ru/arbitral/doc/gpw4uoJvApNF/", "government", "Judgment reproduces product names and named Russian manufacturers from the December 2019 inspection. It records enforcement, not permission to sell. / 裁判文本转录2019年12月检查的品名与俄罗斯制造商，属执法资料，并非销售许可。");
const corvusCase = source("ru-court-a31-2020", "Arbitration judgment A31-2019/2020: Corvus Extreme mentol label and oral pouch format", "https://sudact.ru/arbitral/doc/2HHr4uKSfI1u/", "government");
const handok = source("kr-nicostop-launch-2013", "Handok: Nicostop gum launch, 11 December 2013", "https://www.handok.co.kr/board/pressView?idx=2915", "manufacturer");
const samyang = source("kr-samyang-nicostop-2019", "Samyang Biopharmaceuticals: 2019 pharmaceutical brochure, Nicostop Patch & Gum", "https://www.cphi-online.com/46/resourcefile/10/87/61/SYB_Pharma_Spread_Low_2019.pdf.pdf", "manufacturer");
const koreanList = source("kr-archived-nrt-list", "Korean Presidential Archives: smoking-cessation medicine list, gum manufacturers/importers", "https://dams.pa.go.kr/dams/DOCUMENT/2024/10/30/DOC/SRC/0A04202410301451454111973013961.pdf", "government");
const koreanLecture = source("kr-nrt-lecture", "Korean Academy of Tuberculosis and Respiratory Diseases: smoking-cessation pharmacotherapy lecture, pp.8,18", "https://new.lungkorea.org/common/fileDownload/only/scheduleFile/eyJpdiI6IkVMcHBUbzUxWm5QZEVzY3JxV3BNY0E9PSIsInZhbHVlIjoiWlZZdGEvYWhWeWdiZ2huVFlTNmoydz09IiwibWFjIjoiOGNmMjlkZDUxYzBkYjBmNzA5NmNhMjRmMjFjZGQ0ZjA0ZmUwYzc0NTc5OTgyMjVhZjBkZjdkZGI1YTA5NzVhOCIsInRhZyI6IiJ9", "scientific");
const nicorakRecord = source("kr-nicorak-mfds-reproduction", "DOUMDOC: MFDS record 201601546, Nicorak oral dissolving film 2.5mg", "https://doumdoc.com/User_inform/inform_drug_detail/du01_pk/55558", "other", "Reproduced medicine record; reports cancellation on 17 March 2021 for expiry. The live MFDS record was not accessible during this review. / 药品记录转载，载明2021年3月17日因有效期届满取消；本次无法直接读取MFDS原站条目。");

const historicalNotes = {
  en: "Historical identity is documented. Present availability, legal sale and undisclosed technical or sensory measurements are unconfirmed. A qualitative strength name is not a measured dose.",
  zh: "历史产品身份有来源记录；当前供应、合法销售与未披露的技术／感官参数仍待确认。定性强度名称不作为实测剂量。",
};
function historical(record: Pick<Product, "id" | "productName" | "brandId" | "categoryId" | "formatId" | "specifications" | "sources" | "recordContext"> & Partial<Product>): Product {
  return { slug: record.id, markets: [], status: "unknown", recordKind: "historical", verificationStatus: "pending", lastVerified: checked, researchNotes: historicalNotes, ...record };
}

const jpRows = [
  ["vanilla-light", "Vanilla Lights", "Vanilla", "Lights", "A000001713", "1705", "1705.3"],
  ["apple-mint-light", "Apple Mint Lights", "Apple Mint", "Lights", "A000001714", "1706", "1706.3"],
  ["rich-medium", "Rich Medium", "Rich", "Medium", "A000001710", "1702", "1702.3"],
  ["cool-mint-medium", "Cool Mint Medium", "Cool Mint", "Medium", "A000001712", "1704", "1704.3"],
  ["rich-strong", "Rich Strong", "Rich", "Strong", "A000001955", "1939", "1939.1"],
  ["apple-mint-strong", "Apple Mint Strong", "Apple Mint", "Strong", "A000001956", "1941", "1941.1"],
  ["spice-strong", "Spice Strong", "Spice", "Strong", "A000001707", "1700", "224.2"],
  ["deep-menthol-strong", "Deep Menthol Strong", "Deep Menthol", "Strong", "A000001709", "1701", "225.2"],
] as const;

const japaneseProducts: Product[] = jpRows.map(([key, name, flavor, strength, sku, imageFolder, imageFile]) => {
  const approved = key === "rich-strong" || key === "apple-mint-strong";
  const exactPhoto = key !== "spice-strong" && key !== "deep-menthol-strong";
  const page = source(`zerostyle-${key}-listing`, `Hamakiyasan: Zerostyle Snus ${name}, 18 portions`, `https://hamakiyasan.easy-myshop.jp/c-item-detail?ic=${sku}`, "retail-reference");
  return historical({
    id: `zerostyle-snus-${key}`, productName: `Zerostyle Snus ${name}`, brandId: "zerostyle-snus", series: "Zerostyle Snus",
    categoryId: "oral-smokeless-tobacco", subcategory: "Portion snus", formatId: "pouch", manufacturerId: "japan-tobacco-zerostyle", parentCompany: "Japan Tobacco Inc.",
    markets: ["japan"], containsTobacco: true, tobaccoFree: false,
    countryOfOrigin: approved ? "Sweden" : undefined,
    countryOfOriginBasis: approved ? { en: "Sweden is stated for this exact Strong product in the 2023 Japanese Ministry of Finance price record.", zh: "日本财务省2023年价格记录将该具体Strong品种的制造国列为瑞典。" } : undefined,
    physicalFormDetails: { shape: "rectangular-pouch", unitization: "pre-portioned", useMode: "placement", commercialPresentation: `Zerostyle Snus ${name}` },
    flavor: { name: flavor }, nicotine: { strengthLabel: strength, nicotineStrength: `${strength} (qualitative label; dose not published)` },
    deliveryRoute: ["buccal", "gingival"], productTechnology: ["tobacco-matrix"],
    specifications: { kind: "tobacco", portionsPerCan: 18, ...(approved ? { netWeightG: 8.1 } : {}) },
    ...(exactPhoto ? { productImage: `/products/zerostyle-snus-${key}.jpg`, imageMatch: "exact-variant" as const,
      imageCaption: { en: `Retailer photo: ${name} label matched; historical packaging.`, zh: `零售商照片：已核对${name}标签，为历史包装。` },
      imageSource: source(`zerostyle-${key}-photo`, `Hamakiyasan product photo: ${name}`, `https://www31.easy-myshop.jp/emsrsc/hamakiyasan/itemimg/${imageFolder}/big.${imageFile}.jpg`, "retail-reference") } : {}),
    sources: [jtHistory, page, jpCatalog, ...(approved ? [japanApproval] : []), jtPrices],
    localizedShortDescription: { en: `Japanese JT oral tobacco line; ${name}, 18 portions. Current stock not established.`, zh: `日本JT口含烟系列；${name}，每罐18袋，当前现货未确认。` },
    recordContext: { en: "Named in the retailer's run-out/discontinuation catalog. Older 2021 flavors are context only: their names, weights and formulations are not assigned to this later variant.", zh: "零售目录已标注库存售罄后结束销售。2021年旧口味资料仅作历史背景，不将旧品名、净重或配方套用到该后期规格。" },
    researchNotes: { en: `${historicalNotes.en} ${exactPhoto ? "The photo matches the flavor and qualitative strength label." : "The retailer uses an older photo without the later strength label; it is not displayed as an exact variant photo."}`, zh: `${historicalNotes.zh}${exactPhoto ? "照片已对应口味与定性强度标签。" : "零售页使用未标新版强度的旧图，故不将其展示为该规格对应图。"}` },
  });
});

const ruRows = [
  ["corvus-brutal-historical", "Corvus Brutal", "corvus-historical", "corvus-russia-historical", "Mint", "https://kupit-snus.in.ua/corvus-brutal/"],
  ["corvus-logan-melon-historical", "Corvus Logan melon", "corvus-historical", "corvus-russia-historical", "Melon", "https://kupit-snus.in.ua/corvus-logan/"],
  ["corvus-extreme-menthol-historical", "Corvus Extreme menthol", "corvus-historical", "corvus-russia-historical", "Menthol", "https://sudact.ru/arbitral/doc/2HHr4uKSfI1u/"],
  ["corvus-flash-historical", "Corvus Flash", "corvus-historical", "corvus-russia-historical", "Orange", "https://snus-optom-catalog.com/product/corvus-flash/"],
  ["snussbor-raspberry-portion-historical", "Snussbor Raspberry (Portion)", "snussbor-historical", "inter-fuda-trade-historical", "Raspberry", "https://sudact.ru/arbitral/doc/gpw4uoJvApNF/"],
  ["snussbor-raspberry-dry-cool-historical", "Snussbor Raspberry Dry cool (Portion)", "snussbor-historical", "inter-fuda-trade-historical", "Raspberry", "https://sudact.ru/arbitral/doc/gpw4uoJvApNF/"],
] as const;
const russianProducts: Product[] = ruRows.map(([id, productName, brandId, manufacturerId, flavor, url]) => historical({
  id, productName, brandId, manufacturerId, categoryId: "nicotine-pouches", subcategory: "Historical tobacco-free oral mixture in portions", formatId: "pouch",
  markets: ["russia"], containsTobacco: false, tobaccoFree: true, flavor: { name: flavor },
  physicalFormDetails: { unitization: "pre-portioned", useMode: "placement", commercialPresentation: productName }, deliveryRoute: ["oral-mucosal"],
  specifications: { kind: "pouch" }, sources: [russianCase, ...(id.includes("extreme") ? [corvusCase] : url.includes("sudact") ? [] : [source(`${id}-form`, `${productName}: named pouch listing`, url, "retail-reference")])],
  localizedShortDescription: { en: "Historical oral nicotine product named in a 2020 Russian judgment; current supply and strength unconfirmed.", zh: "2020年俄罗斯裁判文本列名的历史口含尼古丁产品；当前供应与具体剂量未确认。" },
  recordContext: { en: "December 2019 inspection, judgment dated 8 October 2020. Russian affiliation identifies the named historical product operator; it does not establish current trademark ownership. Retail nicotine and portion counts conflict across sources, so no numeric dose is assigned.", zh: "对应2019年12月检查、2020年10月8日判决。俄罗斯归属记录的是该历史产品关联主体，不代表当前商标权属。不同零售来源的剂量、袋数存在冲突，不填入统一数值。" },
}));

const koreanProducts: Product[] = [
  historical({
    id: "nicostop-gum-2mg-historical", productName: "Nicostop Gum 2 mg (니코스탑껌)", brandId: "nicostop", manufacturerId: "samyang-biopharm-historical", parentCompany: "Samyang (historical product developer); Handok (2013 marketer)",
    categoryId: "nicotine-gum-confectionery", subcategory: "Nicotine replacement gum", formatId: "gum", markets: ["south-korea"], containsTobacco: false, tobaccoFree: true,
    nicotine: { nicotineStrength: "2 mg per piece", nicotineStrengthMg: 2, nicotinePerUnit: 2, totalNicotine: 64, nicotineForm: "Nicotine polacrilex" },
    flavor: { name: "Pine (manufacturer description)", sensoryNotes: "Pine flavor and soft texture reported in the 2013 launch notice; no standardized sensory score" },
    physicalFormDetails: { shape: "other", unitization: "pre-portioned", useMode: "chewing" }, deliveryRoute: ["chewing", "oral-mucosal"], productTechnology: ["gum-base"],
    specifications: { kind: "gum", piecesPerPack: 32 }, sources: [handok, samyang, koreanList, koreanLecture],
    productImage: "/products/nicostop-gum-historical-lecture.jpg", imageMatch: "exact-variant",
    imageSource: koreanLecture,
    imageRegion: { x: 575, y: 15, width: 250, height: 340, sourceWidth: 825, sourceHeight: 359 },
    imageCaption: { en: "Nicostop gum box and blister in the Korean medical lecture, page 18; unchanged archival photograph, framed to this product.", zh: "韩国医学讲义第18页的Nicostop口香糖盒及泡罩；保留历史原图，仅框选该产品。" },
    localizedShortDescription: { en: "Korean nicotine replacement gum: 2 mg per piece, 32 pieces in the 2013 launch pack.", zh: "韩国尼古丁替代口香糖：每片2毫克，2013年发布包装每盒32片。" },
    calculationNotes: { en: "Nominal 64 mg per launch pack = 2 mg × 32 pieces; not an absorbed dose or a claim about today's packs.", zh: "发布包装标称总量64毫克＝2毫克×32片；不代表实际吸收量或今天的包装规格。" },
    recordContext: { en: "Handok's December 2013 announcement identifies Samyang Biopharm as developer. The archived Korean medicine list identifies it as the gum manufacturer. Current marketing authorization was not established.", zh: "Handok于2013年12月的公告说明由三养生物制药开发；韩国历史药品清单将其列为该口香糖制造商。未确认当前上市许可。" },
  }),
  historical({
    id: "nicorak-oral-film-2-5mg-historical", productName: "Nicorak Oral Dissolving Film 2.5 mg (니코락구강용해필름)", brandId: "nicorak", manufacturerId: "cl-pharm", categoryId: "nicotine-films", subcategory: "Nicotine replacement oral film", formatId: "film", markets: ["south-korea"], status: "unknown", containsTobacco: false, tobaccoFree: true,
    nicotine: { nicotineStrength: "2.5 mg per film", nicotineStrengthMg: 2.5, nicotinePerUnit: 2.5, nicotineForm: "Nicotine" },
    physicalFormDetails: { shape: "sheet", unitization: "pre-portioned", useMode: "dissolution" }, deliveryRoute: ["oral-dissolution", "oral-mucosal"],
    specifications: { kind: "film", filmWeightMg: 82.5, filmLengthMm: 36, filmWidthMm: 24, filmThicknessMm: 0.104 },
    sources: [koreanLecture, nicorakRecord],
    localizedShortDescription: { en: "Historical Korean oral film: 2.5 mg nicotine per film; reproduced record reports authorization expiry in 2021.", zh: "韩国历史口腔溶解膜：每片2.5毫克；药品记录转载载明2021年许可有效期届满。" },
    recordContext: { en: "Korean respiratory-medicine lecture lists CL Pharm and this exact film. Reproduced MFDS item 201601546 reports cancellation on 17 March 2021 due to expiry. This market withdrawal does not prove global discontinuation; current manufacture is unconfirmed.", zh: "韩国呼吸医学讲义列明该膜片及씨엘팜（CL Pharm）。MFDS品目201601546的转载记录载明2021年3月17日因有效期届满取消。该市场记录不等于全球停产，当前生产状况待确认。" },
  }),
];

export const asianProducts: Product[] = [...japaneseProducts, ...russianProducts, ...koreanProducts];

export const asianBrands: Brand[] = [
  { id: "zerostyle-snus", slug: "zerostyle-snus", name: "Zerostyle Snus", brandCountry: "Japan", parentCompany: "Japan Tobacco Inc.", manufacturerIds: ["japan-tobacco-zerostyle"], sources: [jtHistory, jtPrices, japanApproval], brandCountryBasis: { en: "Japanese JT-developed oral snus brand, documented in JT's business report. The documented Swedish manufacturing country for two Strong variants is recorded separately.", zh: "按JT业务报告记录的日本JT研发口含烟品牌归属日本；两款Strong产品有据可查的瑞典制造国另行记录。" }, localizedDescription: { en: "JT's Japanese oral tobacco line, including run-out and historical portion snus records.", zh: "日本JT口含烟系列，包含库存售罄结束销售及历史袋装snus档案。" } },
  { id: "corvus-historical", slug: "corvus-historical", name: "Corvus (historical Russian records)", brandCountry: "Russia", manufacturerIds: ["corvus-russia-historical"], sources: [russianCase, corvusCase], brandCountryBasis: { en: "Historical affiliation: the 2019–2020 judicial records identify the Russian Corvus LLC operator/manufacturer for these named products. Current trademark ownership is not established here.", zh: "历史归属：2019—2020年司法记录将这些具名产品关联至俄罗斯ООО «Корвус»主体／制造商；不据此确认当前商标归属。" }, localizedDescription: { en: "Period-specific Corvus oral nicotine mixtures named in Russian court records.", zh: "俄罗斯司法记录中的特定时期Corvus口含尼古丁混合物。" } },
  { id: "snussbor-historical", slug: "snussbor-historical", name: "Snussbor (historical)", brandCountry: "Russia", manufacturerIds: ["inter-fuda-trade-historical"], sources: [russianCase], brandCountryBasis: { en: "Historical Russian product affiliation based on the named Inter Fuda Trade LLC entity in Rostov-on-Don in the 2020 judgment; current rights and operators are unconfirmed.", zh: "按2020年判决列明的俄罗斯顿河畔罗斯托夫ООО «Интер Фуда Трейд»主体记录历史产品归属；当前权利及运营主体待确认。" }, localizedDescription: { en: "Historical raspberry portion products named in a Russian inspection and judgment.", zh: "俄罗斯检查及裁判文本列名的历史树莓口味分装产品。" } },
  { id: "nicostop", slug: "nicostop", name: "Nicostop (oral gum)", brandCountry: "South Korea", parentCompany: "Samyang (historical developer)", manufacturerIds: ["samyang-biopharm-historical"], officialWebsite: "https://nicostop.com/", sources: [handok, samyang, koreanList], brandCountryBasis: { en: "Korean Samyang-developed brand extension documented in the 2013 Handok announcement and Samyang's brochure. Only the oral gum is included; patches are excluded.", zh: "依据2013年Handok公告及三养产品册，按韩国三养开发的品牌扩展归属韩国；本库仅收录口香糖，不收录贴剂。" }, localizedDescription: { en: "Nicostop's historical oral gum, kept separate from its transdermal products.", zh: "Nicostop历史口用口香糖档案，与其透皮产品分别处理。" } },
  { id: "nicorak", slug: "nicorak", name: "Nicorak (니코락)", brandCountry: "South Korea", manufacturerIds: ["cl-pharm"], sources: [koreanLecture, nicorakRecord], brandCountryBasis: { en: "Historical Korean medicine brand attributed to CL Pharm in the Korean medical lecture and reproduced MFDS record; global rights are not asserted.", zh: "韩国医学讲义及MFDS药品记录转载将该历史韩国药品关联至씨엘팜（CL Pharm）；不据此主张全球品牌权属。" }, localizedDescription: { en: "Historical nicotine oral dissolving film, with market withdrawal recorded separately from lifecycle.", zh: "历史尼古丁口腔溶解膜，市场撤回记录与产品生命周期单独保留。" } },
].map(brand => ({ ...brand, lastVerified: checked, verificationStatus: "pending" }));

export const asianManufacturers: Manufacturer[] = [
  { id: "japan-tobacco-zerostyle", slug: "japan-tobacco-zerostyle", name: "Japan Tobacco / JT Group (exact manufacturing entity unconfirmed)", country: "Japan", sources: [jtHistory, japanApproval] },
  { id: "corvus-russia-historical", slug: "corvus-russia-historical", name: "ООО «Корвус» (historical Russian manufacturer)", country: "Russia", sources: [russianCase, corvusCase] },
  { id: "inter-fuda-trade-historical", slug: "inter-fuda-trade-historical", name: "ООО «Интер Фуда Трейд» (historical)", country: "Russia", sources: [russianCase] },
  { id: "samyang-biopharm-historical", slug: "samyang-biopharm-historical", name: "Samyang Biopharm (historical gum manufacturer)", country: "South Korea", sources: [koreanList, handok, samyang] },
  { id: "cl-pharm", slug: "cl-pharm", name: "CL Pharm Co., Ltd. (씨엘팜)", country: "South Korea", sources: [koreanLecture, nicorakRecord] },
];
