"use client";

import { CategoryCard } from "@/components/categories/category-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { categories } from "@/data/categories";
import { tr } from "@/lib/i18n";
import { useLanguage } from "@/components/layout/language-provider";

export default function CategoriesPage() { const { locale }=useLanguage(); return <div className="container page-shell"><Breadcrumb items={[{label:"Categories"}]}/><div className="page-heading"><p className="eyebrow">{tr(locale,"PRODUCT TAXONOMY / 01")}</p><h1>{tr(locale,"Product categories")}<span className="heading-period">.</span></h1><p>{tr(locale,"Six broad product classes cover oral nicotine and oral smokeless tobacco. Physical formats and subcategories remain separate research dimensions.")}</p></div><div className="taxonomy-intro"><span>{categories.length} {tr(locale,"CATEGORIES")}</span><p>{tr(locale,"Browse a category for typical formats, delivery routes, technical parameters and verified product records.")}</p></div><div className="category-grid">{categories.map((category,index)=><CategoryCard key={category.id} category={category} index={index}/>)}</div></div>; }
