import type { Product } from "@/types/catalog";
import type { Locale } from "@/lib/i18n";

export interface ProductFamily {
  id: string;
  name: string;
  brandId: string;
  series?: string;
  variants: Product[];
}

/** Presentation grouping only: every specification keeps its ID, evidence and URL. */
export function familyName(product: Product): string {
  const rawName = product.brandId === "skruf-superwhite" ? product.productName.replace(/no\.\s*\d+\s+/i, "") : product.productName;
  const name = product.brandId === "nordic-spirit" ? rawName.replace(/\s+Max$/i, "") : rawName;
  return name
    .replace(/\s*\(\d+\s+(?:pieces|lozenges|tablets|nicotine toothpicks)\)\s*$/i, "")
    .replace(/\s+\d+(?:\.\d+)?\s*mg(?:\s*\/\s*(?:pouch|piece))?\b/gi, "")
    .replace(/\s+(?:Hyp[èe]r Strong|Extra Strong|Ultra Strong|Xtra Strong|X[- ]Strong|Strong|Regular|Medium|Mellow)(?=\s+(?:Mini|Mega)\b|$)/gi, "")
    .replace(/\bFresh\s+Mint\b/gi, "Freshmint")
    .replace(/\bCools Icy Mint\b/gi, "Cools")
    .replace(/\s+/g, " ").trim();
}

/** A sibling photograph is a labelled reference, never evidence of the selected dose. */
export function familyPicture(product: Product, family: ProductFamily): Product {
  if (product.productImage) return product;
  return family.variants.find(variant => variant.productImage && variant.imageMatch !== "historical-context") ?? product;
}

export function productFamilyId(product: Product): string {
  // Series, nicotine origin, format, moisture and historical scope are boundaries.
  // Mini/Mega and named technologies remain in the family name.
  const spec = product.specifications;
  return JSON.stringify([
    product.brandId, product.series ?? "", product.categoryId, product.formatId,
    product.recordKind ?? "current", product.nicotine?.nicotineSource ?? "unknown",
    product.containsTobacco ?? null, spec.kind === "pouch" ? spec.moisture ?? "" : "",
    familyName(product).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase(),
  ]);
}

export function groupProductFamilies(records: Product[]): ProductFamily[] {
  const grouped = new Map<string, ProductFamily>();
  for (const product of records) {
    const id = productFamilyId(product);
    const family = grouped.get(id);
    if (family) family.variants.push(product);
    else grouped.set(id, { id, name: familyName(product), brandId: product.brandId, series: product.series, variants: [product] });
  }
  return [...grouped.values()].map(family => ({ ...family, variants: family.variants.sort((a, b) =>
    (a.nicotine?.nicotinePerUnit ?? a.nicotine?.nicotineStrengthMg ?? Infinity) -
    (b.nicotine?.nicotinePerUnit ?? b.nicotine?.nicotineStrengthMg ?? Infinity) ||
    a.productName.localeCompare(b.productName)
  ) }));
}

export function variantLabel(product: Product, locale: Locale): string {
  const strength = product.nicotine?.nicotinePerUnit ?? product.nicotine?.nicotineStrengthMg;
  const textual = product.nicotine?.nicotineStrength ?? product.productName.match(/(?:Hyper Strong|Extra Strong|Ultra Strong|X[- ]Strong|Strong|Regular|Medium|Mellow|Max)/i)?.[0];
  const count = "piecesPerPack" in product.specifications ? product.specifications.piecesPerPack : undefined;
  const label = strength !== undefined ? `${strength} mg` : textual ?? (locale === "zh" ? "规格未公开" : "Specification unknown");
  return label + (count ? ` · ${count}${locale === "zh" ? "片" : " pcs"}` : "");
}
