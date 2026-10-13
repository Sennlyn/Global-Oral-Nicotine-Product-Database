"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProductFamily } from "@/lib/product-families";
import { variantLabel } from "@/lib/product-families";
import { hasVariantImage } from "@/lib/product-image-policy";
import { ProductPicture } from "./product-picture";
import { categories } from "@/data/categories";
import { brands } from "@/data/products";
import { useLanguage } from "@/components/layout/language-provider";

export function ProductFamilyCard({ family, view = "grid" }: { family: ProductFamily; view?: "grid" | "list" }) {
  const { locale } = useLanguage();
  const [selectedId, setSelectedId] = useState(() => (family.variants.find(hasVariantImage) ?? family.variants[0]).id);
  const selected = family.variants.find(p => p.id === selectedId) ?? family.variants[0];
  const brand = brands.find(b => b.id === family.brandId);
  const category = categories.find(c => c.id === selected.categoryId);
  return <article className={`product-card product-family-card ${view === "list" ? "product-card-list" : ""}`}>
    <Link className="product-image" href={`/products/${selected.slug}`} aria-label={`${family.name} · ${variantLabel(selected, locale)}`}>
      <ProductPicture key={selected.id} product={selected} lazy />
      {selected.recordKind === "historical" && <span className="family-history">{locale === "zh" ? "历史档案" : "Historical"}</span>}
    </Link>
    <div className="product-card-copy">
      <p className="eyebrow">{brand?.name}{family.series ? ` / ${family.series}` : ""}</p>
      <h3><Link href={`/products/${selected.slug}`}>{family.name}</Link></h3>
      <p className="family-category">{category?.name[locale]}</p>
      <div className="family-variants" role="group" aria-label={locale === "zh" ? "选择浓度与包装规格" : "Choose strength and pack specification"}>
        {family.variants.map(variant => <button key={variant.id} type="button" aria-pressed={selected.id === variant.id} onClick={() => setSelectedId(variant.id)}>{variantLabel(variant, locale)}</button>)}
      </div>
      <div className="family-card-footer"><span>{hasVariantImage(selected) ? (locale === "zh" ? "图片对应 " : "Image: ") + variantLabel(selected, locale) : locale === "zh" ? "该规格图片待查" : "Variant image not found"}</span><Link href={`/products/${selected.slug}`}>{locale === "zh" ? "查看档案" : "View record"}<ArrowUpRight size={15}/></Link></div>
    </div>
  </article>;
}
