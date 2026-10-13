import type { Product } from "@/types/catalog";

/** Only the selected specification's matched image may be shown as its product photo. */
export function hasVariantImage(product: Product): product is Product & { productImage: string } {
  return Boolean(product.productImage) && (!product.imageMatch || product.imageMatch === "exact-variant");
}
