import type { ProductFormat } from "@/types/catalog";

const format = (slug: string, en: string, zh: string, description: string, structure: string, categoryIds: string[], typicalParameters: string[]): ProductFormat => ({
  id: slug, slug, name: { en, zh }, description: { en: description, zh: `${zh}形态用于独立描述产品的物理剂型。` }, typicalStructure: { en: structure, zh: structure }, categoryIds, typicalParameters,
});

export const formats: ProductFormat[] = [
  format("pouch", "Pouch", "袋", "A contained pouch unit for oral placement.", "Filled permeable pouch", ["nicotine-pouches", "snus"], ["Pouch size", "Portion weight", "Pouch material"]),
  format("portion", "Portion", "份装", "A measured portion supplied as a discrete unit.", "Discrete portion", ["nicotine-pouches", "snus", "other-oral-smokeless-tobacco"], ["Portion weight", "Portions per pack", "Moisture"]),
  format("film", "Film", "膜", "A thin flexible unit placed in the mouth.", "Thin polymer or other matrix sheet", ["nicotine-films"], ["Film dimensions", "Film thickness", "Dissolution time"]),
  format("strip", "Strip", "条状膜", "A narrow oral strip form.", "Narrow flexible strip", ["nicotine-films"], ["Strip dimensions", "Film weight", "Dissolution time"]),
  format("sheet", "Sheet", "片状膜", "A sheet shaped oral film form.", "Flexible sheet", ["nicotine-films"], ["Sheet area", "Thickness", "Matrix material"]),
  format("gum", "Gum", "口香糖", "A chewable gum unit.", "Gum base with active ingredients", ["nicotine-gum"], ["Piece weight", "Chewing time", "Release profile"]),
  format("lozenge", "Lozenge", "含片", "A solid unit designed to dissolve in the mouth.", "Solid dissolving matrix", ["nicotine-lozenges"], ["Unit weight", "Dissolution time", "Size"]),
  format("tablet", "Tablet", "片剂", "A compressed or otherwise formed oral tablet.", "Formed solid tablet", ["nicotine-tablets", "nicotine-candy"], ["Tablet weight", "Disintegration time", "Size"]),
  format("candy", "Candy", "糖果", "A confectionery style oral unit.", "Candy matrix", ["nicotine-candy"], ["Unit weight", "Texture", "Dissolution time"]),
  format("gummy", "Gummy", "软糖", "A soft gelatinous or gel like oral unit.", "Soft gel matrix", ["nicotine-candy"], ["Unit weight", "Texture", "Chewing required"]),
  format("mint", "Mint", "薄荷糖", "A mint style oral unit.", "Solid mint matrix", ["nicotine-candy", "nicotine-lozenges"], ["Unit weight", "Dissolution time", "Flavor"]),
  format("bead", "Bead", "微珠", "A small bead form.", "Discrete rounded units", ["other-solid-oral-nicotine"], ["Bead size", "Unit weight", "Release type"]),
  format("pearl", "Pearl", "珠粒", "A pearl like solid form.", "Rounded solid units", ["other-solid-oral-nicotine"], ["Unit size", "Unit weight", "Release type"]),
  format("granule", "Granule", "颗粒", "A granular oral format.", "Granular system", ["other-solid-oral-nicotine"], ["Particle size", "Portion weight", "Release type"]),
  format("powder", "Powder", "粉末", "A powdered oral portion.", "Powder system", ["other-solid-oral-nicotine"], ["Portion weight", "Particle size", "Material"]),
  format("loose", "Loose", "散装", "A non portioned loose format.", "Loose material", ["snus", "other-oral-smokeless-tobacco"], ["Net weight", "Moisture", "Tobacco type"]),
  format("plug", "Plug", "块状", "A compressed block or plug form.", "Compressed tobacco block", ["other-oral-smokeless-tobacco"], ["Net weight", "Tobacco type", "Moisture"]),
  format("chew", "Chew", "咀嚼型", "An oral form intended for chewing.", "Chewable matrix", ["nicotine-gum", "nicotine-candy", "other-oral-smokeless-tobacco"], ["Unit weight", "Chewing time", "Texture"]),
  format("other", "Other", "其他", "A format that requires a more precise future definition.", "Format specific", ["other-oral-nicotine"], ["Format specific parameters"]),
];

export const getFormat = (slug: string) => formats.find((item) => item.slug === slug);
