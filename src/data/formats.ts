import type { FormatGroup, FormatGroupId, LocalizedText, ProductFormat } from "@/types/catalog";

type LegacyFormatDefinition = {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  typicalStructure: LocalizedText;
  categoryIds: string[];
  typicalParameters: string[];
};

const legacyFormat = (slug: string, en: string, zh: string, description: string, structure: string, categoryIds: string[], typicalParameters: string[]): LegacyFormatDefinition => ({
  id: slug,
  slug,
  name: { en, zh },
  description: { en: description, zh: `${zh}形态用于独立描述产品的物理剂型。` },
  typicalStructure: { en: structure, zh: structure },
  categoryIds,
  typicalParameters,
});

/** The original nineteen entries are retained as historical taxonomy evidence. */
export const legacyFormatDefinitions: LegacyFormatDefinition[] = [
  legacyFormat("pouch", "Pouch", "袋", "A contained pouch unit for oral placement.", "Filled permeable pouch", ["nicotine-pouches", "snus"], ["Pouch size", "Portion weight", "Pouch material"]),
  legacyFormat("portion", "Portion", "份装", "A measured portion supplied as a discrete unit.", "Discrete portion", ["nicotine-pouches", "snus", "other-oral-smokeless-tobacco"], ["Portion weight", "Portions per pack", "Moisture"]),
  legacyFormat("film", "Film", "膜", "A thin flexible unit placed in the mouth.", "Thin polymer or other matrix sheet", ["nicotine-films"], ["Film dimensions", "Film thickness", "Dissolution time"]),
  legacyFormat("strip", "Strip", "条状膜", "A narrow oral strip form.", "Narrow flexible strip", ["nicotine-films"], ["Strip dimensions", "Film weight", "Dissolution time"]),
  legacyFormat("sheet", "Sheet", "片状膜", "A sheet shaped oral film form.", "Flexible sheet", ["nicotine-films"], ["Sheet area", "Thickness", "Matrix material"]),
  legacyFormat("gum", "Gum", "口香糖", "A chewable gum unit.", "Gum base with active ingredients", ["nicotine-gum"], ["Piece weight", "Chewing time", "Release profile"]),
  legacyFormat("lozenge", "Lozenge", "含片", "A solid unit designed to dissolve in the mouth.", "Solid dissolving matrix", ["nicotine-lozenges"], ["Unit weight", "Dissolution time", "Size"]),
  legacyFormat("tablet", "Tablet", "片剂", "A compressed or otherwise formed oral tablet.", "Formed solid tablet", ["nicotine-tablets", "nicotine-candy"], ["Tablet weight", "Disintegration time", "Size"]),
  legacyFormat("candy", "Candy", "糖果", "A confectionery style oral unit.", "Candy matrix", ["nicotine-candy"], ["Unit weight", "Texture", "Dissolution time"]),
  legacyFormat("gummy", "Gummy", "软糖", "A soft gelatinous or gel like oral unit.", "Soft gel matrix", ["nicotine-candy"], ["Unit weight", "Texture", "Chewing required"]),
  legacyFormat("mint", "Mint", "薄荷糖", "A mint style oral unit.", "Solid mint matrix", ["nicotine-candy", "nicotine-lozenges"], ["Unit weight", "Dissolution time", "Flavor"]),
  legacyFormat("bead", "Bead", "微珠", "A small bead form.", "Discrete rounded units", ["other-solid-oral-nicotine"], ["Bead size", "Unit weight", "Release type"]),
  legacyFormat("pearl", "Pearl", "珠粒", "A pearl like solid form.", "Rounded solid units", ["other-solid-oral-nicotine"], ["Unit size", "Unit weight", "Release type"]),
  legacyFormat("granule", "Granule", "颗粒", "A granular oral format.", "Granular system", ["other-solid-oral-nicotine"], ["Particle size", "Portion weight", "Release type"]),
  legacyFormat("powder", "Powder", "粉末", "A powdered oral portion.", "Powder system", ["other-solid-oral-nicotine"], ["Portion weight", "Particle size", "Material"]),
  legacyFormat("loose", "Loose", "散装", "A non portioned loose format.", "Loose material", ["snus", "other-oral-smokeless-tobacco"], ["Net weight", "Moisture", "Tobacco type"]),
  legacyFormat("plug", "Plug", "块状", "A compressed block or plug form.", "Compressed tobacco block", ["other-oral-smokeless-tobacco"], ["Net weight", "Tobacco type", "Moisture"]),
  legacyFormat("chew", "Chew", "咀嚼型", "An oral form intended for chewing.", "Chewable matrix", ["nicotine-gum", "nicotine-candy", "other-oral-smokeless-tobacco"], ["Unit weight", "Chewing time", "Texture"]),
  legacyFormat("other", "Other", "其他", "A format that requires a more precise future definition.", "Format specific", ["other-oral-nicotine"], ["Format specific parameters"]),
];

export const formatGroups: FormatGroup[] = [
  { id: "flexible-carrier", name: { en: "Flexible carriers", zh: "柔性载体" }, description: { en: "Flexible structures that carry material in a pouch or film.", zh: "以袋体或薄膜承载内容物的柔性结构。" } },
  { id: "formed-solid", name: { en: "Formed solids", zh: "成型固体" }, description: { en: "Discrete solid units distinguished by their physical matrix and construction.", zh: "按物理基质与成型方式区分的独立固体单元。" } },
  { id: "elastic-gel", name: { en: "Elastic and gel matrices", zh: "弹性与凝胶基质" }, description: { en: "Elastic or gelled material structures.", zh: "具有弹性或凝胶结构的基质。" } },
  { id: "particulate", name: { en: "Particulate systems", zh: "微粒体系" }, description: { en: "Products composed of discrete small particles or powder.", zh: "由离散微粒、颗粒或粉末构成的体系。" } },
  { id: "compacted-mass", name: { en: "Compacted masses", zh: "压制块状物" }, description: { en: "Material compacted into a stable block-shaped mass.", zh: "经压制形成稳定块状实体的材料。" } },
];

const physicalForm = (groupId: FormatGroupId, slug: string, name: LocalizedText, description: LocalizedText, typicalStructure: LocalizedText, typicalParameters: string[]): ProductFormat => ({
  id: slug,
  slug,
  groupId,
  name,
  description,
  typicalStructure,
  typicalParameters,
});

/**
 * Active physical-form taxonomy. It is intentionally independent from product
 * categories, flavour, unitization and oral use mode.
 */
export const formats: ProductFormat[] = [
  physicalForm("flexible-carrier", "pouch", { en: "Pouch", zh: "袋装" }, { en: "A permeable pouch that contains a fill.", zh: "由透气袋材包裹填充物的独立单元。" }, { en: "Filled permeable pouch", zh: "填充式透气袋" }, ["Pouch size", "Fill weight", "Pouch material"]),
  physicalForm("flexible-carrier", "film", { en: "Oral Film", zh: "口腔膜" }, { en: "A thin, flexible sheet designed for oral use.", zh: "用于口腔使用的薄而柔性的膜状结构。" }, { en: "Thin polymer or other matrix sheet", zh: "聚合物或其他基质薄片" }, ["Film dimensions", "Film thickness", "Film material"]),
  physicalForm("formed-solid", "lozenge", { en: "Lozenge", zh: "含化锭" }, { en: "A formed solid designed to dissolve gradually in the mouth.", zh: "设计为在口腔内逐渐溶解的成型固体。" }, { en: "Solid dissolving matrix", zh: "固体溶解基质" }, ["Unit weight", "Lozenge dimensions", "Dissolution time"]),
  physicalForm("formed-solid", "tablet", { en: "Tablet", zh: "压制片" }, { en: "A compacted or otherwise formed solid tablet.", zh: "经压制或其他成型工艺制成的固体片。" }, { en: "Formed solid tablet", zh: "成型固体片" }, ["Tablet weight", "Tablet dimensions", "Disintegration time"]),
  physicalForm("formed-solid", "hard-candy", { en: "Hard Candy", zh: "硬糖／糖锭" }, { en: "A rigid confectionery solid with a hard sugar or comparable glassy matrix.", zh: "以硬质糖基或类似玻璃态基质构成的固体。" }, { en: "Hard confectionery matrix", zh: "硬质糖果基质" }, ["Unit weight", "Hardness", "Dissolution time"]),
  physicalForm("elastic-gel", "gum", { en: "Gum", zh: "口香糖" }, { en: "A formed unit based on an elastic gum matrix.", zh: "以弹性胶基构成的成型单元。" }, { en: "Gum base with active ingredients", zh: "含活性成分的口香糖胶基" }, ["Piece weight", "Gum base", "Release profile"]),
  physicalForm("elastic-gel", "gummy", { en: "Gummy", zh: "软糖" }, { en: "A soft, gelled or gelatinous confectionery unit.", zh: "由软质凝胶或胶体基质构成的糖果单元。" }, { en: "Soft gel matrix", zh: "软质凝胶基质" }, ["Unit weight", "Texture", "Gel system"]),
  physicalForm("particulate", "bead-pellet", { en: "Bead / Pellet", zh: "微粒／珠粒" }, { en: "A discrete rounded unit, including bead and pellet forms.", zh: "由独立圆形或近圆形单元构成的形态，包括微珠与珠粒。" }, { en: "Discrete rounded units", zh: "独立圆形单元" }, ["Particle size", "Particle shape", "Release type"]),
  physicalForm("particulate", "granule", { en: "Granule", zh: "颗粒" }, { en: "A product composed of discrete granular material.", zh: "由离散颗粒材料构成的形态。" }, { en: "Granular system", zh: "颗粒体系" }, ["Particle size", "Bulk density", "Release type"]),
  physicalForm("particulate", "powder", { en: "Powder", zh: "粉末" }, { en: "A product composed of fine powdered material.", zh: "由细粉状材料构成的形态。" }, { en: "Powder system", zh: "粉末体系" }, ["Particle size", "Bulk density", "Moisture"]),
  physicalForm("compacted-mass", "plug", { en: "Compacted Block", zh: "压制块状物" }, { en: "A material compacted into a stable block-shaped mass.", zh: "经压制形成稳定块状实体的材料。" }, { en: "Compacted block-shaped mass", zh: "压制块状实体" }, ["Dimensions", "Unit weight", "Compression profile"]),
];

/** Exact physical-form aliases from the former taxonomy. */
export const formatIdAliases: Record<string, string> = {
  strip: "film",
  sheet: "film",
  candy: "hard-candy",
  bead: "bead-pellet",
  pearl: "bead-pellet",
};

export const resolveFormatId = (id: string) => formatIdAliases[id] ?? id;
export const getFormat = (slug: string) => formats.find((item) => item.slug === resolveFormatId(slug));
