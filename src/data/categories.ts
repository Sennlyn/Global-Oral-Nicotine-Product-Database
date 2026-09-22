import type { Category } from "@/types/catalog";

// The original ten-category taxonomy is kept intact for traceability and future record migration.
export const originalCategories: Category[] = [
  { id: "nicotine-pouches", slug: "nicotine-pouches", name: { en: "Nicotine Pouches", zh: "尼古丁袋" }, description: { en: "Portioned oral nicotine products in a pouch format.", zh: "以袋装形式置于口腔使用的尼古丁产品。" }, introduction: { en: "A category for oral nicotine products delivered in a pouch. Formats, source materials and technical properties are recorded separately for each verified product.", zh: "收录袋装口腔尼古丁产品；具体形态、来源与技术参数将在产品层单独记录。" }, icon: "pouch", typicalFormats: ["pouch", "portion"], typicalRoutes: ["gingival", "buccal"], keyParameters: ["Nicotine per pouch", "Portion weight", "Pouch size", "Moisture", "Pouch material"], subcategories: ["Mini", "Slim", "Regular", "Large", "Dry", "Moist", "All White"] },
  { id: "nicotine-films", slug: "nicotine-films", name: { en: "Nicotine Films", zh: "尼古丁口腔膜" }, description: { en: "Thin films and strips designed for oral placement or dissolution.", zh: "用于口腔放置或溶解的薄膜与薄片剂型。" }, introduction: { en: "Covers oral, buccal, sublingual and dissolvable film concepts. Delivery site and physical film measurements are tracked as independent fields.", zh: "覆盖口腔膜、颊黏膜膜、舌下膜与溶解膜等概念，并独立记录递送部位与物理尺寸。" }, icon: "film", typicalFormats: ["film", "strip", "sheet"], typicalRoutes: ["buccal", "sublingual", "oral-dissolution"], keyParameters: ["Nicotine per film", "Film dimensions", "Film thickness", "Film weight", "Dissolution time", "Matrix material"], subcategories: ["Oral Film", "Buccal Film", "Sublingual Film", "Dissolvable Film", "Oral Strip"] },
  { id: "nicotine-gum", slug: "nicotine-gum", name: { en: "Nicotine Gum", zh: "尼古丁口香糖" }, description: { en: "Chewable gum based oral nicotine products.", zh: "以咀嚼方式使用的尼古丁口香糖剂型。" }, introduction: { en: "A distinct gum category with chewing time, unit mass and release characteristics reserved for product records.", zh: "独立的口香糖类别，为咀嚼时间、单粒重量与释放特性预留字段。" }, icon: "gum", typicalFormats: ["gum", "chew"], typicalRoutes: ["chewing", "oral-mucosal"], keyParameters: ["Nicotine per piece", "Piece weight", "Pieces per pack", "Chewing time", "Release profile"] },
  { id: "nicotine-candy", slug: "nicotine-candy", name: { en: "Nicotine Candy & Confectionery", zh: "尼古丁糖果及糖果型产品" }, description: { en: "A framework for confectionery style oral nicotine formats.", zh: "糖果化口腔尼古丁剂型的分类框架。" }, introduction: { en: "Reserved for verified candy, gummy, mint and similar formats. A category in the taxonomy does not imply that products have been entered.", zh: "为经核实的糖果、软糖、薄荷糖等形态预留；分类存在不代表当前已有产品。" }, icon: "candy", typicalFormats: ["candy", "gummy", "mint", "chew", "tablet"], typicalRoutes: ["oral-dissolution", "chewing"], keyParameters: ["Nicotine per unit", "Unit weight", "Texture", "Dissolution time", "Chewing required"] },
  { id: "nicotine-lozenges", slug: "nicotine-lozenges", name: { en: "Nicotine Lozenges", zh: "尼古丁含片" }, description: { en: "Solid units intended to dissolve gradually in the mouth.", zh: "在口腔中逐渐溶解的固体含片。" }, introduction: { en: "Lozenge records can capture unit nicotine, dimensions, dissolution time and pack count.", zh: "含片记录可包含单粒尼古丁量、尺寸、溶解时间及包装数量。" }, icon: "lozenge", typicalFormats: ["lozenge", "mint"], typicalRoutes: ["oral-dissolution", "oral-mucosal"], keyParameters: ["Nicotine per lozenge", "Lozenge weight", "Size", "Dissolution time", "Pack size"] },
  { id: "nicotine-tablets", slug: "nicotine-tablets", name: { en: "Nicotine Tablets", zh: "尼古丁口腔片剂" }, description: { en: "Buccal, sublingual and dissolvable tablet formats.", zh: "颊黏膜、舌下及溶解型口腔片剂。" }, introduction: { en: "Tablet records distinguish placement, disintegration and dissolution from the general product classification.", zh: "片剂记录将使用部位、崩解及溶解特性与基础分类分开描述。" }, icon: "tablet", typicalFormats: ["tablet"], typicalRoutes: ["buccal", "sublingual", "oral-dissolution"], keyParameters: ["Nicotine per tablet", "Tablet weight", "Tablet size", "Disintegration time", "Dissolution time"], subcategories: ["Buccal Tablet", "Sublingual Tablet", "Dissolvable Tablet"] },
  { id: "other-solid-oral-nicotine", slug: "other-solid-oral-nicotine", name: { en: "Other Solid Oral Nicotine", zh: "其他固体口腔尼古丁产品" }, description: { en: "An extensible home for emerging solid oral formats.", zh: "用于扩展收录新型固体口腔剂型。" }, introduction: { en: "Reserved for beads, pearls, granules, powders and other verified solid forms that do not fit the primary categories.", zh: "为珠粒、颗粒、粉末及其他不适合现有主要类别的已核实固体剂型预留。" }, icon: "solid", typicalFormats: ["bead", "pearl", "granule", "powder"], typicalRoutes: ["oral-dissolution", "oral-mucosal"], keyParameters: ["Nicotine per unit", "Unit weight", "Particle size", "Release type"] },
  { id: "snus", slug: "snus", name: { en: "Snus", zh: "瑞典式口含烟" }, description: { en: "A distinct branch of oral smokeless tobacco.", zh: "口腔无烟烟草中的独立分支。" }, introduction: { en: "The taxonomy supports loose and portion variants. Actual tobacco composition and market claims require product level evidence.", zh: "分类支持散装与袋装等形态；具体烟草组成及市场信息须由产品级来源核实。" }, icon: "snus", typicalFormats: ["loose", "portion", "pouch"], typicalRoutes: ["gingival", "buccal"], keyParameters: ["Portion weight", "Moisture", "Tobacco type", "Net weight"], subcategories: ["Loose Snus", "Original Portion", "White Portion", "Mini Portion", "Other Snus"] },
  { id: "other-oral-smokeless-tobacco", slug: "other-oral-smokeless-tobacco", name: { en: "Other Oral Smokeless Tobacco", zh: "其他口腔无烟烟草产品" }, description: { en: "Oral tobacco formats beyond snus.", zh: "Snus 之外的口腔使用无烟烟草形态。" }, introduction: { en: "Reserved for verified moist snuff, dip, chewing tobacco, plugs, twists and related oral tobacco formats.", zh: "为经核实的湿鼻烟、蘸用烟、嚼烟、块状烟与绞条烟等形态预留。" }, icon: "tobacco", typicalFormats: ["loose", "portion", "plug", "chew"], typicalRoutes: ["chewing", "gingival", "oral-mucosal"], keyParameters: ["Tobacco type", "Moisture", "Unit weight", "Net weight"], subcategories: ["Moist Snuff", "Dip", "Chewing Tobacco", "Tobacco Pouch", "Plug Tobacco", "Twist Tobacco"] },
  { id: "other-oral-nicotine", slug: "other-oral-nicotine", name: { en: "Other Oral Nicotine Products", zh: "其他口腔尼古丁产品" }, description: { en: "An open category for future oral delivery innovations.", zh: "面向未来口腔递送创新的开放类别。" }, introduction: { en: "A flexible category for verified oral products that cannot be described accurately by another category. The taxonomy can expand as evidence grows.", zh: "用于准确归类其他已核实的口腔产品；后续可随证据增加扩展分类。" }, icon: "other", typicalFormats: ["other"], typicalRoutes: ["other"], keyParameters: ["Format specific specifications", "Delivery route", "Nicotine per unit"] },
];

export const categoryIdAliases: Record<string, string> = {
  "nicotine-gum": "nicotine-gum-confectionery",
  "nicotine-candy": "nicotine-gum-confectionery",
  "nicotine-lozenges": "nicotine-lozenges-solids",
  "nicotine-tablets": "nicotine-lozenges-solids",
  "other-solid-oral-nicotine": "nicotine-lozenges-solids",
  snus: "oral-smokeless-tobacco",
  "other-oral-smokeless-tobacco": "oral-smokeless-tobacco",
};

export const resolveCategoryId = (id: string) => categoryIdAliases[id] ?? id;

export const categories: Category[] = [
  { ...originalCategories[0], typicalFormats: ["pouch"] },
  { ...originalCategories[1], typicalFormats: ["film"] },
  {
    id: "nicotine-gum-confectionery", slug: "nicotine-gum-confectionery",
    name: { en: "Nicotine Gum & Confectionery", zh: "尼古丁口香糖与糖果制品" },
    description: { en: "Gum, candy, gummies and related confectionery-style oral nicotine products.", zh: "收录口香糖、糖果、软糖等糖果型口腔尼古丁产品。" },
    introduction: { en: "This category brings gum and confectionery together while keeping gum, candy, gummy, mint and chew as distinct physical formats. A mint-style product may instead belong with lozenges when its verified product information supports that classification.", zh: "将口香糖与糖果型产品归为一类，同时将口香糖、糖果、软糖、薄荷糖及咀嚼型形态分别记录。薄荷糖类产品如经核实更符合含片定义，可归入含片与固体剂型类别。" },
    icon: "gum", typicalFormats: ["gum", "hard-candy", "gummy"],
    typicalRoutes: ["chewing", "oral-dissolution", "oral-mucosal"],
    keyParameters: ["Nicotine per unit", "Unit weight", "Texture", "Chewing time", "Dissolution time"],
    subcategories: ["Nicotine Gum", "Candy", "Gummy", "Mint"],
  },
  {
    id: "nicotine-lozenges-solids", slug: "nicotine-lozenges-solids",
    name: { en: "Nicotine Lozenges & Solid Formats", zh: "尼古丁含片与固体剂型" },
    description: { en: "Lozenges, oral tablets, beads, granules, powders and other solid formats.", zh: "收录含片、口腔片剂、珠粒、颗粒、粉末等固体剂型。" },
    introduction: { en: "Combines lozenges, oral tablets and other solid oral nicotine forms. Physical format, delivery site, dissolution and disintegration remain separate product-level fields. Mint-style products are classified from verified product information, not flavor alone.", zh: "整合含片、口腔片剂及其他固体口腔尼古丁形态。具体剂型、使用部位、溶解与崩解特性仍在产品层独立记录；薄荷糖类产品不单凭口味归类。" },
    icon: "lozenge", typicalFormats: ["lozenge", "tablet", "bead-pellet", "granule", "powder"],
    typicalRoutes: ["oral-dissolution", "buccal", "sublingual", "oral-mucosal"],
    keyParameters: ["Nicotine per unit", "Unit weight", "Dissolution time", "Disintegration time", "Particle size"],
    subcategories: ["Nicotine Lozenges", "Nicotine Tablets", "Bead", "Pearl", "Granule", "Powder"],
  },
  {
    id: "oral-smokeless-tobacco", slug: "oral-smokeless-tobacco",
    name: { en: "Oral Smokeless Tobacco", zh: "口腔无烟烟草" },
    description: { en: "Snus and other oral smokeless tobacco products.", zh: "收录瑞典式口含烟及其他口腔无烟烟草产品。" },
    introduction: { en: "Snus remains an identifiable subcategory alongside moist snuff, dip, chewing tobacco and other oral tobacco forms. Loose, portion and pouch formats are recorded independently; tobacco composition requires product-level evidence.", zh: "将瑞典式口含烟作为可识别的二级分类，并收录湿鼻烟、蘸用烟、嚼烟等其他口腔烟草形态。散装、份装与袋装形态独立记录；具体烟草组成须依据产品级来源核实。" },
    icon: "tobacco", typicalFormats: ["pouch", "plug"],
    typicalRoutes: ["gingival", "buccal", "chewing", "oral-mucosal"],
    keyParameters: ["Portion weight", "Moisture", "Tobacco type", "Net weight"],
    subcategories: ["Snus", "Moist Snuff", "Dip", "Chewing Tobacco", "Tobacco Pouch", "Plug Tobacco", "Twist Tobacco"],
  },
  { ...originalCategories[9], typicalFormats: [] },
];

export const getCategory = (slug: string) => categories.find((item) => item.slug === resolveCategoryId(slug));
