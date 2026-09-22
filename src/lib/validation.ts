import { categories, resolveCategoryId } from "@/data/categories";
import { formats, resolveFormatId } from "@/data/formats";
import type { Product } from "@/types/catalog";

/** Call this before a future record is published; incomplete records stay pending. */
export function validateVerifiedProduct(product: Product): string[] {
  const errors: string[] = [];
  if (!product.id || !product.slug || !product.productName.trim()) errors.push("Product identity is incomplete.");
  if (!categories.some((item) => item.id === resolveCategoryId(product.categoryId))) errors.push("Unknown category.");
  if (!formats.some((item) => item.id === resolveFormatId(product.formatId))) errors.push("Unknown physical form.");
  if (product.containsTobacco === true && product.tobaccoFree === true) errors.push("Tobacco status is contradictory.");
  if (product.verificationStatus === "verified") {
    if (!product.sources.length) errors.push("Verified products need at least one traceable source.");
    if (!product.lastVerified) errors.push("Verified products need a verification date.");
  }
  for (const source of product.sources) {
    if (!source.sourceName || !source.accessedAt || !/^https?:\/\//.test(source.sourceUrl)) errors.push(`Source ${source.id} is incomplete.`);
  }
  return errors;
}
