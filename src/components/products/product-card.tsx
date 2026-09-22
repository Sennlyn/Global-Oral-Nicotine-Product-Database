"use client";

import Link from "next/link";
import { ArrowUpRight, PackageOpen } from "lucide-react";
import type { Product } from "@/types/catalog";
import { categories, resolveCategoryId } from "@/data/categories";
import { formats } from "@/data/formats";
import { brands } from "@/data/products";
import { useLanguage } from "@/components/layout/language-provider";
import { tr } from "@/lib/i18n";

export function ProductCard({ product, view = "grid" }: { product: Product; view?: "grid" | "list" }) {
  const {locale}=useLanguage();
  return <Link href={`/products/${product.slug}`} className={`product-card ${view === "list" ? "product-card-list" : ""}`}><div className="product-image">{product.productImage ? <span>{tr(locale,"Verified product image")}</span> : <PackageOpen size={33} strokeWidth={1.3}/>}</div><div className="product-card-copy"><p className="eyebrow">{brands.find((item)=>item.id===product.brandId)?.name ?? tr(locale,"Brand pending")}</p><h3>{product.productName}</h3><p>{categories.find((item)=>item.id===resolveCategoryId(product.categoryId))?.name[locale]} · {formats.find((item)=>item.id===product.formatId)?.name[locale]}</p><span className="verification-label">{tr(locale,product.verificationStatus)}</span></div><ArrowUpRight className="product-arrow" size={19}/></Link>;
}
