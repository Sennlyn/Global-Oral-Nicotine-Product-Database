"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brands, products } from "@/data/products";
import { tr } from "@/lib/i18n";
import { useLanguage } from "@/components/layout/language-provider";

export default function BrandsPage() { const { locale }=useLanguage(); return <div className="container page-shell"><Breadcrumb items={[{label:"Brands"}]}/><div className="page-heading"><p className="eyebrow">{tr(locale,"BRAND INDEX / 03")}</p><h1>{tr(locale,"Brands")}<span className="heading-period">.</span></h1><p>{tr(locale,"Verified brand profiles linked to sourced product records and market coverage.")}</p></div><div className="index-masthead"><span>{brands.length.toString().padStart(2,"0")}</span><div><strong>{tr(locale,"Verified brands")}</strong><p>{tr(locale,"Each brand profile links its official product sources and current database records.")}</p></div></div>{brands.length ? <div className="record-index-grid">{brands.map((brand,index)=>{const count=products.filter((product)=>product.brandId===brand.id).length;return <Link className="record-index-card" href={`/brands/${brand.slug}`} key={brand.id}><span className="record-index-number">{String(index+1).padStart(2,"0")}</span><h2>{brand.name}</h2><p>{brand.localizedDescription?.[locale] ?? brand.description ?? ""}</p><div className="record-index-meta"><span>{count} {tr(locale,"products")}</span><span>{brand.marketIds?.length ?? 0} {tr(locale,"markets")}</span></div><span className="card-action">{tr(locale,"View brand profile")} <ArrowUpRight size={16}/></span></Link>;})}</div> : <EmptyState title="Brand database coming soon." description="No brand profiles have been entered in this framework phase." action={{label:"Explore product categories",href:"/categories"}}/>}</div>; }
