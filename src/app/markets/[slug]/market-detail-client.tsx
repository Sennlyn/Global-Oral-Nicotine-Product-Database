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
import { getMarketListingStatus } from "@/lib/market-listings";

export function MarketDetailClient({ slug, region, market }: { slug: string; region?: (typeof regions)[number]; market?: Market }) {
  const { locale } = useLanguage();
  const name = region?.[locale] ?? market!.name[locale];
  const marketSlugs = region ? markets.filter((item) => item.region === region.en).map((item) => item.slug) : [slug];
  const matched = products.filter((item) => item.markets.some((marketSlug) => marketSlugs.includes(marketSlug)));
  const marketBrands = brands.filter((brand) => brand.marketIds?.some((marketSlug) => marketSlugs.includes(marketSlug)));
  const listingStatuses = matched.flatMap((product) =>
    product.markets.filter((marketId) => marketSlugs.includes(marketId)).map((marketId) => getMarketListingStatus(product, marketId)),
  );
  const listedCount = listingStatuses.filter((status) => status === "marketed").length;
  const pendingCount = listingStatuses.length - listedCount;
  const regulatoryNotes = typeof market?.regulatoryNotes === "string" ? market.regulatoryNotes : market?.regulatoryNotes?.[locale];

  return <div className="container page-shell">
    <Breadcrumb items={[{ label: "Markets", href: "/markets" }, { label: name }]} />
    <div className="page-heading"><p className="eyebrow">{tr(locale, region ? "REGIONAL FRAMEWORK" : "MARKET PROFILE")}</p><h1>{name}<span className="heading-period">.</span></h1><p>{tr(locale, region ? "Regional overview of the country product records in this database." : "Product records and country-specific listing evidence for this market.")}</p></div>
    <div className="market-stats"><div><span>{tr(locale, "Products")}</span><strong>{matched.length}</strong></div><div><span>{tr(locale, "Brands")}</span><strong>{marketBrands.length}</strong></div><div><span>{tr(locale, "Categories")}</span><strong>{new Set(matched.map((item) => resolveCategoryId(item.categoryId))).size}</strong></div><div><span>{tr(locale, "Formats")}</span><strong>{new Set(matched.map((item) => resolveFormatId(item.formatId))).size}</strong></div></div>
    <div className="market-status-summary"><div><span>{tr(locale, "Listed product-country records")}</span><strong>{listedCount}</strong></div><div><span>{tr(locale, "Pending product-country records")}</span><strong>{pendingCount}</strong></div></div>
    {!region && <section className="content-panel country-brand-panel"><h2>{tr(locale, "Brands in this market")}</h2><div className="chip-list">{marketBrands.map((brand) => <Link className="chip-link" href={`/brands/${brand.slug}`} key={brand.id}>{brand.name}</Link>)}</div></section>}
    <section className="content-panel market-products-panel"><div className="panel-title-row"><h2>{tr(locale, "Product records")} <span className="count-pill">{matched.length}</span></h2></div>{matched.length ? <div className="product-grid">{matched.slice(0, 12).map((product) => <ProductCard key={product.id} product={product} marketIds={market ? [market.slug] : undefined} />)}</div> : <EmptyState title="No product records for this market yet." description="Products will appear here when their country relationship is supported by traceable sources."/>}</section>
    {market && <section className="content-panel market-regulatory-panel"><p className="eyebrow">{tr(locale, "RESEARCH NOTES")}</p><h2>{tr(locale, "Regulatory context")}</h2><p>{regulatoryNotes ?? tr(locale, "No regulatory notes have been entered.")}</p>{market.regulatorySources?.length ? <div className="market-listing-sources">{market.regulatorySources.map((source) => source.sourceUrl && <a href={source.sourceUrl} key={source.id} target="_blank" rel="noopener noreferrer">{source.sourceName} ↗</a>)}</div> : null}</section>}
  </div>;
}
