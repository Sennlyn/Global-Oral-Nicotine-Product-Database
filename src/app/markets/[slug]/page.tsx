import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { regions } from "@/data/regions";
import { resolveCategoryId } from "@/data/categories";
import { resolveFormatId } from "@/data/formats";
import { brands, markets, products } from "@/data/products";
import { getLocale } from "@/lib/server-locale";
import { tr } from "@/lib/i18n";
import { MarketDetailClient } from "./market-detail-client";

export function generateStaticParams() { return [...regions.map(({slug})=>({slug})),...markets.map(({slug})=>({slug}))]; }
export async function generateMetadata({params}: {params:Promise<{slug:string}>}):Promise<Metadata> { const [{slug},locale]=await Promise.all([params,getLocale()]); return {title:regions.find((item)=>item.slug===slug)?.[locale] ?? markets.find((item)=>item.slug===slug)?.name[locale] ?? tr(locale,"Market")}; }
async function LegacyMarketDetail({params}: {params:Promise<{slug:string}>}) { const [{slug},locale]=await Promise.all([params,getLocale()]); const region=regions.find((item)=>item.slug===slug); const market=markets.find((item)=>item.slug===slug); if (!region && !market) notFound(); const name=region?.[locale] ?? market!.name[locale]; const matched=products.filter((item)=>item.markets.includes(slug)); return <div className="container page-shell"><Breadcrumb items={[{label:"Markets",href:"/markets"},{label:name}]}/><div className="page-heading"><p className="eyebrow">{tr(locale,region?"REGIONAL FRAMEWORK":"MARKET PROFILE")}</p><h1>{name}<span className="heading-period">.</span></h1><p>{tr(locale,region?"Regional overview of the country product records in this database.":"Product records and country-specific listing evidence for this market.")}</p></div><div className="market-stats"><div><span>{tr(locale,"Products")}</span><strong>{matched.length}</strong></div><div><span>{tr(locale,"Brands")}</span><strong>{brands.filter((brand)=>brand.marketIds?.includes(slug)).length}</strong></div><div><span>{tr(locale,"Categories")}</span><strong>{new Set(matched.map((item)=>resolveCategoryId(item.categoryId))).size}</strong></div><div><span>{tr(locale,"Formats")}</span><strong>{new Set(matched.map((item)=>resolveFormatId(item.formatId))).size}</strong></div></div><div className="detail-main"><section className="content-panel"><h2>{tr(locale,"Product records")}</h2><EmptyState title="No product records for this market yet." description="Products will appear here when their country relationship is supported by traceable sources."/></section></div></div>; }

export default async function MarketDetail({params}: {params:Promise<{slug:string}>}) {
  const { slug } = await params;
  const region = regions.find((item) => item.slug === slug);
  const market = markets.find((item) => item.slug === slug);
  if (!region && !market) notFound();
  return <MarketDetailClient slug={slug} region={region} market={market}/>;
}
