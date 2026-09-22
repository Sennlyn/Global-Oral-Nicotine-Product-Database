"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { useLanguage } from "@/components/layout/language-provider";
import { brands, products } from "@/data/products";
import { regions } from "@/data/regions";
import { resolveCategoryId } from "@/data/categories";
import { resolveFormatId } from "@/data/formats";
import { tr } from "@/lib/i18n";
import type { Market } from "@/types/catalog";

export function MarketDetailClient({ slug, region, market }: { slug: string; region?: (typeof regions)[number]; market?: Market }) {
  const { locale } = useLanguage();
  const name = region?.[locale] ?? market!.name[locale];
  const matched = products.filter((item) => item.markets.includes(slug));
  return <div className="container page-shell"><Breadcrumb items={[{label:"Markets",href:"/markets"},{label:name}]}/><div className="page-heading"><p className="eyebrow">{tr(locale,region?"REGIONAL FRAMEWORK":"MARKET PROFILE")}</p><h1>{name}<span className="heading-period">.</span></h1><p>{tr(locale,region?"A regional entry point for future verified country and product records.":"A source backed market profile.")}</p></div><div className="market-stats"><div><span>{tr(locale,"Products")}</span><strong>{matched.length}</strong></div><div><span>{tr(locale,"Brands")}</span><strong>{brands.filter((brand)=>brand.marketIds?.includes(slug)).length}</strong></div><div><span>{tr(locale,"Categories")}</span><strong>{new Set(matched.map((item)=>resolveCategoryId(item.categoryId))).size}</strong></div><div><span>{tr(locale,"Formats")}</span><strong>{new Set(matched.map((item)=>resolveFormatId(item.formatId))).size}</strong></div></div><div className="detail-layout"><div className="detail-main"><section className="content-panel"><h2>{tr(locale,"Products")}</h2><EmptyState title="No verified market products yet." description="Products associated with this market will appear after source verification."/></section></div><aside className="detail-side"><div className="side-panel"><p className="eyebrow">{tr(locale,"RESEARCH NOTES")}</p><h3>{tr(locale,"Regulatory context")}</h3><p className="side-note">{market?.regulatoryNotes ?? tr(locale,"No verified regulatory notes have been entered.")}</p></div></aside></div></div>;
}
