"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/types/catalog";
import { TaxonomyIcon } from "@/components/ui/taxonomy-icon";
import { useLanguage } from "@/components/layout/language-provider";
import { tr } from "@/lib/i18n";

export function CategoryCard({ category, index }: { category: Category; index: number }) {
  const { locale } = useLanguage();
  return <Link href={`/categories/${category.slug}`} className="category-card">
    <div className="card-top"><span className="category-icon"><TaxonomyIcon type={category.icon}/></span><span className="card-index">{String(index + 1).padStart(2, "0")}</span></div>
    <div><h3>{category.name[locale]}</h3><p className="card-description">{category.description[locale]}</p></div>
    <span className="card-action">{tr(locale,"Explore category")} <ArrowUpRight size={16}/></span>
  </Link>;
}
