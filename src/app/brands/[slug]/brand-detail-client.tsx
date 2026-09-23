"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { ProductCard } from "@/components/products/product-card";
import { ProductSources } from "@/components/products/product-sources";
import { categories, resolveCategoryId } from "@/data/categories";
import { formats, resolveFormatId } from "@/data/formats";
import { markets, products } from "@/data/products";
import { useLanguage } from "@/components/layout/language-provider";
import { tr } from "@/lib/i18n";
import type { Brand } from "@/types/catalog";

export function BrandDetailClient({ brand }: { brand: Brand }) {
  const { locale } = useLanguage();
  const records = products.filter((product) => product.brandId === brand.id);
  const marketNames = (brand.marketIds ?? []).map((id) => markets.find((market) => market.slug === id)?.name[locale] ?? id);
  const categoryNames = (brand.categoryIds ?? []).map((id) => categories.find((category) => category.id === resolveCategoryId(id))?.name[locale] ?? id);
  const formatNames = (brand.formatIds ?? []).map((id) => formats.find((format) => format.id === resolveFormatId(id))?.name[locale] ?? id);
  const profileRows: [string, string | undefined][] = [["Parent company", brand.parentCompany], ["Country", brand.countryOfOrigin], ["Categories", categoryNames.join(", ")], ["Formats", formatNames.join(", ")], ["Markets", marketNames.join(", ")]];

  return <div className="container page-shell"><Breadcrumb items={[{ label: "Brands", href: "/brands" }, { label: brand.name }]} /><div className="page-heading"><p className="eyebrow">{tr(locale, "VERIFIED BRAND PROFILE")}</p><h1>{brand.name}<span className="heading-period">.</span></h1><p>{brand.localizedDescription?.[locale] ?? brand.description ?? ""}</p></div><div className="detail-layout"><div className="detail-main"><section className="content-panel"><h2>{tr(locale, "Brand profile")}</h2><div className="spec-table">{profileRows.map(([label, value]) => <div className="spec-row" key={label}><span>{tr(locale, label)}</span><strong>{value || "—"}</strong></div>)}<div className="spec-row"><span>{tr(locale, "Official website")}</span><strong>{brand.officialWebsite ? <a href={brand.officialWebsite} target="_blank" rel="noopener noreferrer">{brand.officialWebsite}</a> : "—"}</strong></div></div></section><section className="content-panel"><div className="panel-title-row"><h2>{tr(locale, "Products")} · {records.length}</h2><Link href={`/products?brand=${brand.id}`} className="text-link">{tr(locale, "View all")} <ArrowUpRight size={16} /></Link></div>{records.length ? <div className="product-grid">{records.slice(0, 12).map((product) => <ProductCard key={product.id} product={product} />)}</div> : <EmptyState title="No product records yet." description="Verified records linked to this brand will appear here." />}</section><section className="content-panel"><h2>{tr(locale, "Official brand sources")}</h2><ProductSources sources={brand.sources} /></section></div><aside className="detail-side"><div className="side-panel"><p className="eyebrow">{tr(locale, "PROVENANCE")}</p><h3>{brand.sources.length} {tr(locale, "sources")}</h3><p className="side-note">{tr(locale, "Last verified")}: {brand.lastVerified ?? "—"}</p></div></aside></div></div>;
}
