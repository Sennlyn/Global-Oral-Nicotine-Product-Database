import type { Product } from "@/types/catalog";
import { useId } from "react";
import { publicAssetPath } from "@/lib/public-path";

/** Archival framing preserves the original photograph; it never synthesizes packaging. */
export function ProductPicture({ product, lazy = false }: { product: Product; lazy?: boolean }) {
  const clipId = useId();
  if (!product.productImage) return null;
  const src = publicAssetPath(product.productImage);
  const region = product.imageRegion;
  if (region) return <svg className="catalog-product-image archival-product-picture" role="img" aria-label={product.productName} viewBox={`${region.x} ${region.y} ${region.width} ${region.height}`} preserveAspectRatio="xMidYMid meet">
    <defs><clipPath id={clipId}><rect x={region.x} y={region.y} width={region.width} height={region.height}/></clipPath></defs>
    <image href={src} width={region.sourceWidth} height={region.sourceHeight} clipPath={`url(#${clipId})`} />
  </svg>;
  // Static export serves local, source-attributed product photos without an image optimization server.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="catalog-product-image" src={src} alt={product.productName} loading={lazy ? "lazy" : "eager"} decoding="async" />;
}
