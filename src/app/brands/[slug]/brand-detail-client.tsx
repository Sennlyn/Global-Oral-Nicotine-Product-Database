"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { ProductFamilyCard } from "@/components/products/product-family-card";
import { groupProductFamilies } from "@/lib/product-families";
import { ProductSources } from "@/components/products/product-sources";
import { categories, resolveCategoryId } from "@/data/categories";
import { formats, resolveFormatId } from "@/data/formats";
import { manufacturers, markets, products } from "@/data/products";
import { useLanguage } from "@/components/layout/language-provider";
import { tr } from "@/lib/i18n";
import type { Brand } from "@/types/catalog";

export function BrandDetailClient({ brand }: { brand: Brand }) {
  const { locale } = useLanguage();
  const records = products.filter((product) => product.brandId === brand.id);
  const families = groupProductFamilies(records);
  const marketNames = (brand.marketIds ?? []).map((id) => markets.find((market) => market.slug === id)?.name[locale] ?? id);
  const categoryNames = (brand.categoryIds ?? []).map((id) => categories.find((category) => category.id === resolveCategoryId(id))?.name[locale] ?? id);
  const formatNames = (brand.formatIds ?? []).map((id) => formats.find((format) => format.id === resolveFormatId(id))?.name[locale] ?? id);
  const manufacturerNames = (brand.manufacturerIds ?? []).map(id => tr(locale, manufacturers.find(item => item.id === id)?.name ?? id));
  const profileRows: [string, string | undefined][] = [[brand.id === "huabao" ? "Parent company / group" : "Parent company", brand.parentCompany], ["Manufacturer", manufacturerNames.join(" / ")], ["Brand country", brand.brandCountry ? tr(locale, brand.brandCountry) : undefined], ["Brand country basis", brand.brandCountryBasis?.[locale]], ["Categories", categoryNames.join(", ")], ["Formats", formatNames.join(", ")], ["Markets", marketNames.join(", ")]];

  return <div className="container page-shell">
    <Breadcrumb items={[{ label: "Brands", href: "/brands" }, { label: brand.name }]} />
    <div className="page-heading"><p className="eyebrow">{tr(locale, "BRAND PROFILE")}</p><h1>{brand.name}<span className="heading-period">.</span></h1><p>{brand.localizedDescription?.[locale] ?? brand.description ?? ""}</p></div>
    <div className="detail-main">
      <section className="content-panel"><h2>{tr(locale, "Brand profile")}</h2><div className="spec-table">
        {profileRows.map(([label, value]) => <div className="spec-row" key={label}><span>{tr(locale, label)}</span><strong>{value ? tr(locale,value) : tr(locale,"Not documented in reviewed sources")}</strong></div>)}
        <div className="spec-row"><span>{tr(locale, "Official website")}</span><strong>{brand.officialWebsite ? <a href={brand.officialWebsite} target="_blank" rel="noopener noreferrer">{brand.officialWebsite}</a> : tr(locale,"Not documented in reviewed sources")}</strong></div>
      </div></section>
      <section className="content-panel"><div className="panel-title-row"><h2>{tr(locale, "Products")} · {families.length} {locale === "zh" ? "款式" : "families"}<small className="family-record-count">{records.length} {locale === "zh" ? "规格" : "variants"}</small></h2><Link href={`/products?brand=${brand.id}`} className="text-link">{tr(locale, "View all")} <ArrowUpRight size={16} /></Link></div>
        {records.length ? <div className="product-grid">{families.slice(0, 12).map((family) => <ProductFamilyCard key={family.id} family={family} />)}</div> : <EmptyState title="No product records yet." description="Product records linked to this brand will appear here." />}
      </section>
      <section className="content-panel"><h2>{tr(locale, "Brand sources")}</h2><ProductSources sources={brand.sources} /></section>
    </div>
  </div>;
}
