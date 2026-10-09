import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { TaxonomyIcon } from "@/components/ui/taxonomy-icon";
import { categories, getCategory, resolveCategoryId } from "@/data/categories";
import { formats } from "@/data/formats";
import { products } from "@/data/products";
import { getLocale } from "@/lib/server-locale";
import { tr } from "@/lib/i18n";
import { CategoryDetailClient } from "./category-detail-client";

export function generateStaticParams() { return categories.map(({ slug }) => ({ slug })); }
export async function generateMetadata({params}: {params: Promise<{slug:string}>}): Promise<Metadata> { const [{slug},locale]=await Promise.all([params,getLocale()]); return {title:getCategory(slug)?.name[locale] ?? tr(locale,"Category")}; }
async function LegacyCategoryDetail({params}: {params: Promise<{slug:string}>}) {
  const [{slug},locale]=await Promise.all([params,getLocale()]); const category=getCategory(slug); if (!category) notFound();
  const related=formats.filter((format)=>category.typicalFormats.includes(format.slug));
  const matched=products.filter((product)=>resolveCategoryId(product.categoryId)===category.id);
  return <div className="container page-shell"><Breadcrumb items={[{label:"Categories",href:"/categories"},{label:category.name[locale]}]}/><div className="detail-hero"><span className="detail-icon"><TaxonomyIcon type={category.icon} size={38}/></span><div><p className="eyebrow">{tr(locale,"CATEGORY")} / {String(categories.indexOf(category)+1).padStart(2,"0")}</p><h1>{category.name[locale]}<span className="heading-period">.</span></h1><p className="detail-lede">{category.introduction[locale]}</p></div></div><div className="detail-main"><section className="content-panel"><h2>{tr(locale,"Category overview")}</h2><p>{category.introduction[locale]}</p></section><section className="content-panel"><div className="panel-title-row"><h2>{tr(locale,"Related formats")}</h2><Link href="/formats" className="text-link">{tr(locale,"All formats")} <ArrowUpRight size={16}/></Link></div><div className="chip-list">{related.map((item)=><Link className="chip-link" href={`/formats/${item.slug}`} key={item.id}>{item.name[locale]} <ArrowUpRight size={13}/></Link>)}</div></section><section className="content-panel"><h2>{tr(locale,"Product records")} <span className="count-pill">{matched.length}</span></h2><EmptyState title="No product records yet." description="This category is ready for source-backed product records as they are documented." action={{label:"Browse product database",href:`/products?category=${category.slug}`}}/></section></div></div>;
}

export default async function CategoryDetail({params}: {params: Promise<{slug:string}>}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  return <CategoryDetailClient category={category}/>;
}
