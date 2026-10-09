"use client";

import type { Product } from "@/types/catalog";
import { useId, useState } from "react";
import { ImageOff } from "lucide-react";
import { publicAssetPath } from "@/lib/public-path";
import { useLanguage } from "@/components/layout/language-provider";

/** Archival framing preserves the original photograph; it never synthesizes packaging. */
export function ProductPicture({ product, lazy = false }: { product: Product; lazy?: boolean }) {
  const clipId = useId();
  const { locale } = useLanguage();
  const [failedSource, setFailedSource] = useState<string>();
  if (!product.productImage || failedSource === product.productImage) return <div className="image-placeholder"><ImageOff size={28} strokeWidth={1.3}/><span>{locale === "zh" ? (product.productImage ? "图片暂无法加载" : "包装图片待查") : product.productImage ? "Image temporarily unavailable" : "Packaging image not found"}</span><small>{locale === "zh" ? "保留真实档案与来源" : "Product record and sources retained"}</small></div>;
  const src = publicAssetPath(product.productImage);
  const region = product.imageRegion;
  if (region) return <svg className="catalog-product-image archival-product-picture" role="img" aria-label={product.productName} viewBox={`${region.x} ${region.y} ${region.width} ${region.height}`} preserveAspectRatio="xMidYMid meet">
    <defs><clipPath id={clipId}><rect x={region.x} y={region.y} width={region.width} height={region.height}/></clipPath></defs>
    <image href={src} width={region.sourceWidth} height={region.sourceHeight} clipPath={`url(#${clipId})`} onError={() => setFailedSource(product.productImage)} />
  </svg>;
  // Static export serves local, source-attributed product photos without an image optimization server.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="catalog-product-image" src={src} alt={product.productName} loading={lazy ? "lazy" : "eager"} decoding="async" onError={() => setFailedSource(product.productImage)} referrerPolicy="no-referrer" />;
}
