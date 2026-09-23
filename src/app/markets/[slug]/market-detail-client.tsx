"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";
import { useLanguage } from "@/components/layout/language-provider";
import { brands, markets, products } from "@/data/products";
import { regions } from "@/data/regions";
import { resolveCategoryId } from "@/data/categories";
import { resolveFormatId } from "@/data/formats";
import { tr } from "@/lib/i18n";
import type { Market } from "@/types/catalog";
import { ProductCard } from "@/components/products/product-card";

export function MarketDetailClient({ slug, region, market }: { slug: string; region?: (typeof regions)[number]; market?: Market }) {
  const { locale } = useLanguage();
  const name = region?.[locale] ?? market!.name[locale];
  const marketSlugs = region ? markets.filter((item) => item.region === region.en).map((item) => item.slug) : [slug];
  const matched = products.filter((item) => item.markets.some((marketSlug) => marketSlugs.includes(marketSlug)));
  const marketBrands = brands.filter((brand) => brand.marketIds?.some((marketSlug) => marketSlugs.includes(marketSlug)));
  return <div className="container page-shell"><Breadcrumb items={[{label:"Markets",href:"/markets"},{label:name}]}/><div className="page-heading"><p className="eyebrow">{tr(locale,region?"REGIONAL FRAMEWORK":"MARKET PROFILE")}</p><h1>{name}<span className="heading-period">.</span></h1><p>{tr(locale,region?"Regional overview of the country product records verified so far.":"Product records documented from official sources for this market.")}</p></div><div className="market-stats"><div><span>{tr(locale,"Products")}</span><strong>{matched.length}</strong></div><div><span>{tr(locale,"Brands")}</span><strong>{marketBrands.length}</strong></div><div><span>{tr(locale,"Categories")}</span><strong>{new Set(matched.map((item)=>resolveCategoryId(item.categoryId))).size}</strong></div><div><span>{tr(locale,"Formats")}</span><strong>{new Set(matched.map((item)=>resolveFormatId(item.formatId))).size}</strong></div></div>{!region && <section className="content-panel country-brand-panel"><h2>{tr(locale,"Brands in this market")}</h2><div className="chip-list">{marketBrands.map((brand)=><Link className="chip-link" href={`/brands/${brand.slug}`} key={brand.id}>{brand.name}</Link>)}</div></section>}<section className="content-panel market-products-panel"><div className="panel-title-row"><h2>{tr(locale,"Verified products")} <span className="count-pill">{matched.length}</span></h2></div>{matched.length ? <div className="product-grid">{matched.slice(0,12).map((product)=><ProductCard key={product.id} product={product}/>)}</div> : <EmptyState title="No verified market products yet." description="Products associated with this market will appear after source verification."/>}</section>{market && <div className="detail-layout market-notes-layout"><div></div><aside className="detail-side"><div className="side-panel"><p className="eyebrow">{tr(locale,"RESEARCH NOTES")}</p><h3>{tr(locale,"Regulatory context")}</h3><p className="side-note">{market.regulatoryNotes ?? tr(locale,"No verified regulatory notes have been entered.")}</p></div></aside></div>}</div>;
}
