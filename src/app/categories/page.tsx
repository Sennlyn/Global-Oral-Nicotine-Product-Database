import type { Metadata } from "next";
import { CategoryCard } from "@/components/categories/category-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { categories } from "@/data/categories";
import { getLocale } from "@/lib/server-locale";
import { tr } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> { return { title: tr(await getLocale(),"Categories") }; }
export default async function CategoriesPage() { const locale=await getLocale(); return <div className="container page-shell"><Breadcrumb items={[{label:"Categories"}]}/><div className="page-heading"><p className="eyebrow">{tr(locale,"PRODUCT TAXONOMY / 01")}</p><h1>{tr(locale,"Product categories")}<span className="heading-period">.</span></h1><p>{tr(locale,"Ten extensible product classes covering oral nicotine formats and oral smokeless tobacco. Categories describe the product family; physical format is tracked separately.")}</p></div><div className="taxonomy-intro"><span>10 {tr(locale,"CATEGORIES")}</span><p>{tr(locale,"Browse a category for typical formats, delivery routes, technical parameters and future verified product records.")}</p></div><div className="category-grid">{categories.map((category,index)=><CategoryCard key={category.id} category={category} index={index}/>)}</div></div>; }
