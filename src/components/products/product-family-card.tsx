"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProductFamily } from "@/lib/product-families";
import { familyPicture, variantLabel } from "@/lib/product-families";
import { ProductPicture } from "./product-picture";
import { categories } from "@/data/categories";
import { brands } from "@/data/products";
import { useLanguage } from "@/components/layout/language-provider";

export function ProductFamilyCard({ family, view = "grid" }: { family: ProductFamily; view?: "grid" | "list" }) {
  const { locale } = useLanguage();
  const [selectedId, setSelectedId] = useState(() => (family.variants.find(p => p.productImage && (!p.imageMatch || p.imageMatch === "exact-variant")) ?? family.variants.find(p => p.productImage) ?? family.variants[0]).id);
  const selected = family.variants.find(p => p.id === selectedId) ?? family.variants[0];
  const pictured = familyPicture(selected, family);
  const isReference = pictured.id !== selected.id;
  const brand = brands.find(b => b.id === family.brandId);
  const category = categories.find(c => c.id === selected.categoryId);
  return <article className={`product-card product-family-card ${view === "list" ? "product-card-list" : ""}`}>
    <Link className="product-image" href={`/products/${selected.slug}`} aria-label={`${family.name} · ${variantLabel(selected, locale)}`}>
      <ProductPicture key={pictured.id} product={pictured} lazy />
      {selected.recordKind === "historical" && <span className="family-history">{locale === "zh" ? "历史档案" : "Historical"}</span>}
    </Link>
    <div className="product-card-copy">
      <p className="eyebrow">{brand?.name}{family.series ? ` / ${family.series}` : ""}</p>
      <h3><Link href={`/products/${selected.slug}`}>{family.name}</Link></h3>
      <p className="family-category">{category?.name[locale]}</p>
      <div className="family-variants" role="group" aria-label={locale === "zh" ? "选择浓度与包装规格" : "Choose strength and pack specification"}>
        {family.variants.map(variant => <button key={variant.id} type="button" aria-pressed={selected.id === variant.id} onClick={() => setSelectedId(variant.id)}>{variantLabel(variant, locale)}</button>)}
      </div>
      <div className="family-card-footer"><span>{isReference ? (locale === "zh" ? "系列参考图：" : "Family reference: ") + variantLabel(pictured, locale) + (locale === "zh" ? "；所选规格图片待查" : "; selected photo pending") : selected.imageMatch && selected.imageMatch !== "exact-variant" ? (locale === "zh" ? "包装／历史参考图" : "Pack / archive reference") : selected.productImage ? (locale === "zh" ? "图片对应 " : "Image: ") + variantLabel(selected, locale) : locale === "zh" ? "该规格图片待查" : "Variant image not found"}</span><Link href={`/products/${selected.slug}`}>{locale === "zh" ? "查看档案" : "View record"}<ArrowUpRight size={15}/></Link></div>
    </div>
  </article>;
}
