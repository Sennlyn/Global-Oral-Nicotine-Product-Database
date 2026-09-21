import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { categories } from "@/data/categories";
import { formats, getFormat } from "@/data/formats";
import { products } from "@/data/products";
import { getLocale } from "@/lib/server-locale";
import { tr } from "@/lib/i18n";

export function generateStaticParams() { return formats.map(({slug})=>({slug})); }
export async function generateMetadata({params}: {params: Promise<{slug:string}>}): Promise<Metadata> { const [{slug},locale]=await Promise.all([params,getLocale()]); return {title:getFormat(slug)?.name[locale] ?? tr(locale,"Format")}; }
export default async function FormatDetail({params}: {params: Promise<{slug:string}>}) {
  const [{slug},locale]=await Promise.all([params,getLocale()]); const format=getFormat(slug); if (!format) notFound(); const matched=products.filter((item)=>item.formatId===format.id);
  return <div className="container page-shell"><Breadcrumb items={[{label:"Formats",href:"/formats"},{label:format.name[locale]}]}/><div className="detail-hero"><span className="detail-icon format-detail-icon">{format.name.en.slice(0,2).toUpperCase()}</span><div><p className="eyebrow">{tr(locale,"FORMAT / PHYSICAL FORM")}</p><h1>{format.name[locale]}<span className="heading-period">.</span></h1><p className="detail-lede">{format.description[locale]}</p></div></div><div className="detail-layout"><div className="detail-main"><section className="content-panel"><h2>{tr(locale,"Format overview")}</h2><p>{format.description[locale]}</p><div className="definition-row"><span>{tr(locale,"Typical structure")}</span><strong>{locale === "zh" ? tr(locale,format.typicalStructure.en) : format.typicalStructure.en}</strong></div></section><section className="content-panel"><h2>{tr(locale,"Common categories")}</h2><div className="chip-list">{format.categoryIds.map((id)=>{const category=categories.find((item)=>item.id===id);return category && <Link className="chip-link" href={`/categories/${category.slug}`} key={id}>{category.name[locale]}<ArrowUpRight size={13}/></Link>;})}</div></section><section className="content-panel"><h2>{tr(locale,"Related products")} <span className="count-pill">{matched.length}</span></h2><EmptyState title="No verified products have been added yet." description="Products using this physical format will appear here once their sources are verified." action={{label:"Browse product database",href:`/products?format=${format.slug}`}}/></section></div><aside className="detail-side"><div className="side-panel"><p className="eyebrow">{tr(locale,"TECHNICAL FRAMEWORK")}</p><h3>{tr(locale,"Typical parameters")}</h3><div className="side-list">{format.typicalParameters.map((item)=><span key={item}>{tr(locale,item)}</span>)}</div><p className="side-note">{tr(locale,"Parameter values belong to individual verified products. This page defines the format only.")}</p></div></aside></div></div>;
}
