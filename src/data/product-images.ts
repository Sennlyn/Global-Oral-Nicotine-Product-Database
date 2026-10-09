import type { Product, Source } from "@/types/catalog";
import manifest from "./product-image-manifest.json";

type ImageEntry = typeof manifest[number] & {nicotinePerUnit?: number; pouchSize?: string};
const byId = new Map(manifest.map(entry => [entry.productId, entry]));
export function attachProductImage(product: Product): Product {
  const entry: ImageEntry | undefined = byId.get(product.id);
  if (!entry || product.productImage) return product;
  const host = new URL(entry.pageUrl).hostname;
  const official = /(?:^|\.)(?:velo\.com|alppouch\.com|pixotine\.com|nordicspirit\.co\.uk|lucy\.co|roguenicotine\.com|seshproducts\.com|nicorette\.co\.uk|ministryofsnus\.com|swedishmatch\.se)$/.test(host);
  const source: Source = {id: product.id + "-photo-page", sourceName: `${host}: ${entry.label}`, sourceUrl: entry.pageUrl, sourceType: official ? "official-brand" : "retail-reference", accessedAt: "2026-10-09", verifiedAt: "2026-10-09", notes: "Packaging evidence only; does not establish current authorization or factory location. / 图片依据，不证明当前许可或生产地。"};
  const imageMatch = entry.match as NonNullable<Product["imageMatch"]>;
  const caption = imageMatch === "historical-context" ? {en: entry.label + "; archive context, not a photo of each laboratory specimen.", zh: "2006年Camel Original／Frost／Spice测试销售包装合照；图片来源：www.trinketsandtrash.org。为历史背景图，并非各研究样品实拍。"} : imageMatch === "pack-reference" ? {en: "Pack reference: " + entry.label + ". Pack size or regional packaging may differ from this record.", zh: "包装参考图：" + entry.label + "。包装数量或地区版式可能与本档案不同。"} : {en: "Variant image: " + entry.label, zh: "对应规格图片：" + entry.label};
  return {...product, productImage: entry.imageUrl, imageMatch, imageCaption: caption, imageSource: {...source, id: product.id + "-photo-asset", sourceUrl: entry.imageUrl, notes: caption.en + " / " + caption.zh}, sources: [...product.sources, source], nicotine: entry.nicotinePerUnit !== undefined ? {...product.nicotine, nicotinePerUnit: entry.nicotinePerUnit, nicotineStrengthMg: entry.nicotinePerUnit} : product.nicotine, specifications: entry.pouchSize && product.specifications.kind === "pouch" ? {...product.specifications, pouchSize: entry.pouchSize} : product.specifications, researchNotes: {en: "Product identity and packaging sources are linked separately. Undocumented composition, manufacturing site, release profile and current market authorization remain unconfirmed.", zh: "产品身份与图片来源分别列出。未公开的配方、生产地点、释放曲线及当前市场许可继续保留待核实。"}};
}
