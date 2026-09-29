"use client";

import { ArrowUpRight, Globe2 } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { regions } from "@/data/regions";
import { brands, markets, products } from "@/data/products";
import { tr } from "@/lib/i18n";
import { useLanguage } from "@/components/layout/language-provider";
import { getMarketListingStatus, marketListingLabel } from "@/lib/market-listings";

export default function MarketsPage() {
  const { locale } = useLanguage();
  return <div className="container page-shell"><Breadcrumb items={[{ label: "Markets" }]} /><div className="page-heading"><p className="eyebrow">{tr(locale, "GEOGRAPHIC INDEX / 04")}</p><h1>{tr(locale, "Global markets")}<span className="heading-period">.</span></h1><p>{tr(locale, "Explore product records and country-specific listing evidence. Coverage is being expanded market by market.")}</p></div><div className="market-callout"><Globe2 size={24} /><div><strong>{tr(locale, "Country product records")}</strong><span>{tr(locale, "Products are assigned to the markets documented in their product-specific sources. Brand country and manufacturing site are recorded separately.")}</span></div></div><h2 className="index-section-title">{tr(locale, "Markets with product records")}</h2><div className="region-grid market-region-grid">{markets.map((market, index) => {
    const records = products.filter((product) => product.markets.includes(market.slug));
    const brandCount = brands.filter((brand) => brand.marketIds?.includes(market.slug)).length;
    const listed = records.filter((product) => getMarketListingStatus(product, market.slug) === "marketed").length;
    const pending = records.length - listed;
    return <Link className="region-card" href={`/markets/${market.slug}`} key={market.slug}><span className="region-num">{String(index + 1).padStart(2, "0")}</span><div><strong>{market.name[locale]}</strong><small>{records.length} {tr(locale, "products")} · {brandCount} {tr(locale, "brands")}</small><small>{listed} {marketListingLabel(locale, "marketed")} · {pending} {marketListingLabel(locale, "pending")}</small></div><ArrowUpRight size={18} /></Link>;
  })}</div><h2 className="index-section-title section-spacer">{tr(locale, "Regional navigation")}</h2><div className="region-grid market-region-grid">{regions.map((region, index) => <Link className="region-card" href={`/markets/${region.slug}`} key={region.slug}><span className="region-num">{String(index + 1).padStart(2, "0")}</span><div><strong>{region[locale]}</strong><small>{markets.filter((market) => market.region === region.en).length} {tr(locale, "country profiles")}</small></div><ArrowUpRight size={18} /></Link>)}</div></div>;
}
