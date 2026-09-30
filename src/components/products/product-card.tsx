"use client";

import Link from "next/link";
import { ArrowUpRight, PackageOpen } from "lucide-react";
import type { Product } from "@/types/catalog";
import { categories, resolveCategoryId } from "@/data/categories";
import { formats, resolveFormatId } from "@/data/formats";
import { brands } from "@/data/products";
import { useLanguage } from "@/components/layout/language-provider";
import { tr } from "@/lib/i18n";
import { ProductPicture } from "@/components/products/product-picture";
import { ProductMarketStatusBadges } from "@/components/products/market-status";

export function ProductCard({ product, view = "grid", marketIds }: { product: Product; view?: "grid" | "list"; marketIds?: string[] }) {
  const {locale}=useLanguage();
  return <Link href={`/products/${product.slug}`} className={`product-card ${view === "list" ? "product-card-list" : ""}`}><div className="product-image">{product.productImage ? <ProductPicture product={product} lazy /> : <PackageOpen size={33} strokeWidth={1.3}/>}</div><div className="product-card-copy"><p className="eyebrow">{tr(locale,brands.find((item)=>item.id===product.brandId)?.name ?? "Brand pending")}</p><h3>{product.productName}</h3><p>{categories.find((item)=>item.id===resolveCategoryId(product.categoryId))?.name[locale]} · {formats.find((item)=>item.id===resolveFormatId(product.formatId))?.name[locale]}</p>{product.recordKind === "historical" && <span className="record-history-label">{tr(locale, "Historical record")}{product.status === "discontinued" ? " · " + tr(locale,"discontinued") : ""}</span>}<ProductMarketStatusBadges product={product} locale={locale} marketIds={marketIds}/></div><ArrowUpRight className="product-arrow" size={19}/></Link>;
}
