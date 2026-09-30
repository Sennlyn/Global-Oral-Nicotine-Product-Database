"use client";

import Link from "next/link";
import { ArrowUpRight, ImageOff } from "lucide-react";
import type { Product } from "@/types/catalog";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SpecificationTable } from "@/components/products/specification-table";
import { ProductSources } from "@/components/products/product-sources";
import { ProductMarketStatusDetails } from "@/components/products/market-status";
import { categories, resolveCategoryId } from "@/data/categories";
import { formats, resolveFormatId } from "@/data/formats";
import { brands, markets, manufacturers } from "@/data/products";
import { useLanguage } from "@/components/layout/language-provider";
import { tr, type Locale } from "@/lib/i18n";
import { containsTobacco, nicotineStrengthLabel } from "@/lib/catalog";
import { ProductPicture } from "@/components/products/product-picture";

type Value = string | number | boolean | undefined | null;
function InfoGrid({ rows, locale }: { rows: [string, Value][]; locale: Locale }) {
  return <div className="spec-table">{rows.map(([label, value]) => (
    <div className="spec-row" key={label}>
      <span>{tr(locale, label)}</span>
      <strong>{value === undefined || value === null || value === "" ? tr(locale, "Not documented in reviewed sources") : typeof value === "boolean" ? tr(locale, value ? "Yes" : "No") : typeof value === "string" ? tr(locale, value) : String(value)}</strong>
    </div>
  ))}</div>;
}

export function ProductDetail({ product }: { product: Product }) {
  const { locale } = useLanguage();
  const category = categories.find((item) => item.id === resolveCategoryId(product.categoryId));
  const format = formats.find((item) => item.id === resolveFormatId(product.formatId));
  const brand = brands.find((item) => item.id === product.brandId);
  const manufacturer = manufacturers.find((item) => item.id === product.manufacturerId);
  const kind = product.specifications.kind[0].toUpperCase() + product.specifications.kind.slice(1);
  const specificationTitle = locale === "zh" ? (kind === "Pouch" ? "口含袋 参数" : tr(locale, kind) + " 参数") : kind + " specifications";
  const marketNames = product.markets.map((slug) => markets.find((market) => market.slug === slug)?.name[locale] ?? slug).join(", ");
  const linkedSources = [...product.sources, ...(product.imageSource ? [product.imageSource] : [])];
  const lifecycle = product.status === "unknown" ? tr(locale, "Product lifecycle unknown") : tr(locale, product.status);
  const nicotine = product.nicotine;
  const calculation = product.calculationNotes?.[locale];
  const perUnitMissing = product.physicalFormDetails?.unitization === "loose" ? "Not applicable: loose product has no fixed portion" : undefined;

  return <div className="container page-shell">
    <Breadcrumb items={[{ label: "Products", href: "/products" }, { label: product.productName }]} />
    <div className="record-head">
      <div className="record-image">{product.productImage ? <ProductPicture product={product} /> : <ImageOff size={38} />}</div>
      <div><p className="eyebrow">{brand?.name ?? tr(locale, "Brand pending")} / {tr(locale, "PRODUCT RECORD")}</p>
        <h1>{product.productName}</h1><p>{product.localizedShortDescription?.[locale] ?? product.shortDescription}</p>
        <div className="chip-list"><span className="chip-link">{category?.name[locale]}</span><span className="chip-link">{format?.name[locale]}</span>{product.recordKind === "historical" && <span className="chip-link">{tr(locale,"Historical record")}</span>}<span className="chip-link">{lifecycle}</span><span className="chip-link">{product.markets.length} {tr(locale, "market records")}</span></div>
      </div>
    </div>
    <div className="detail-layout"><div className="detail-main">
      {product.recordContext && <section className="content-panel record-context"><h2>{tr(locale,"Record context")}</h2><p>{product.recordContext[locale]}</p>{product.historicalNames?.length ? <p><strong>{tr(locale,"Historical names")}</strong> · {product.historicalNames.join(" / ")}</p> : null}</section>}
      <section className="content-panel"><h2>{tr(locale, "Basic information")}</h2><InfoGrid locale={locale} rows={[
        ["Brand", brand?.name], ["Brand country", brand?.brandCountry], ["Product name", product.productName], ["Series", product.series],
        ["Manufacturer", manufacturer?.name ?? product.manufacturerId], [product.brandId === "huabao" ? "Parent company / group" : "Parent company", product.parentCompany],
        ["Country of origin", product.countryOfOrigin], ["Markets", marketNames], ["Product lifecycle", lifecycle],
        ...(product.countryOfOriginBasis ? [["Manufacturing location basis", product.countryOfOriginBasis[locale]] as [string, Value]] : []),
      ]} /></section>
      <section className="content-panel market-status-panel"><h2>{tr(locale, "Market listing status")}</h2>
        <p className="market-status-explainer">{tr(locale, "Listed requires an official product listing and evidence that local sale requirements are met. Not on market also includes pre-market, withdrawn and historical products; it means this database has not confirmed marketed status for the product-country pair.")}</p>
        <ProductMarketStatusDetails product={product} locale={locale} />
      </section>
      <section className="content-panel"><h2>{tr(locale, "Classification")}</h2><InfoGrid locale={locale} rows={[
        ["Product category", category?.name[locale]], ["Subcategory", product.subcategory], ["Product format", format?.name[locale]],
        ["Form shape", product.physicalFormDetails?.shape], ["Unitization", product.physicalFormDetails?.unitization],
        ["Use mode", product.physicalFormDetails?.useMode], ["Commercial presentation", product.physicalFormDetails?.commercialPresentation],
        ["Delivery route", product.deliveryRoute?.map((route) => tr(locale, route.replaceAll("-", " "))).join(", ")],
        ["Contains tobacco", containsTobacco(product)],
        ["Nicotine source", nicotine?.nicotineSource?.replaceAll("-", " ")], ["Product technology", product.productTechnology?.map((value) => tr(locale, value)).join(", ")],
      ]} /></section>
      <section className="content-panel"><h2>{tr(locale, "Nicotine information")}</h2><InfoGrid locale={locale} rows={[
        ["Strength", nicotineStrengthLabel(product, locale)],
        ["Strength (mg)", nicotine?.nicotineStrengthMg === undefined ? perUnitMissing : nicotine.nicotineStrengthMg + " mg"],
        ["Nicotine per unit", nicotine?.nicotinePerUnit === undefined ? perUnitMissing : nicotine.nicotinePerUnit + " mg"],
        ["Nicotine per gram", nicotine?.nicotinePerGram === undefined ? undefined : nicotine.nicotinePerGram + " mg/g"],
        ["Total nicotine per pack", nicotine?.totalNicotine === undefined ? undefined : nicotine.totalNicotine + " mg"],
        ["Nicotine form", nicotine?.nicotineForm], ["Strength label", nicotine?.nicotineStrengthMg === undefined ? nicotine?.strengthLabel : nicotineStrengthLabel(product, locale)],
      ]} />
        {calculation && <p className="data-provenance-note"><strong>{tr(locale, "Calculation basis")}</strong> · {calculation}</p>}
      </section>
      {product.historicalMeasurements && <section className="content-panel"><h2>{tr(locale,"Historical laboratory measurements")}</h2><InfoGrid locale={locale} rows={[
        ["Sample period", product.historicalMeasurements.samplePeriod[locale]],
        ["Nicotine per gram (wet weight)", product.historicalMeasurements.nicotineMgPerGWet + " mg/g"],
        ["Measured pH", product.historicalMeasurements.ph],
        ["Measured moisture", product.historicalMeasurements.moisturePercent + " %"],
      ]}/><p className="data-provenance-note">{product.historicalMeasurements.notes[locale]}</p><ProductSources sources={[product.historicalMeasurements.source]}/></section>}
      <section className="content-panel"><h2>{tr(locale, "Flavor & sensory")}</h2><InfoGrid locale={locale} rows={[
        ["Flavor", product.flavor?.name], ["Flavor category", product.flavor?.category],
        ["Cooling", product.flavor?.cooling], ["Sweetness", product.flavor?.sweetness], ["Sensory notes", product.flavor?.sensoryNotes],
      ]} /></section>
      <section className="content-panel"><h2>{specificationTitle}</h2><SpecificationTable specification={product.specifications} /></section>
      <p className="data-provenance-note">{product.researchNotes?.[locale]}</p>
      <section className="content-panel"><h2>{tr(locale, "Sources")}</h2><ProductSources sources={linkedSources} /></section>
    </div>
    <aside className="detail-side"><div className="side-panel"><p className="eyebrow">{tr(locale, "MARKET LISTING")}</p>
      <h3>{product.marketListings?.length ?? 0} {tr(locale, "market records")}</h3>
      <div className="side-list"><span>{lifecycle}</span><span>{linkedSources.length} {tr(locale, "linked sources")}</span></div>
      {product.officialWebsite && <a className="text-link" href={product.officialWebsite} target="_blank" rel="noopener noreferrer">{tr(locale, "Official website")} <ArrowUpRight size={16} /></a>}
      <Link className="text-link" href="/compare">{tr(locale, "Open comparison")} <ArrowUpRight size={16} /></Link>
    </div></aside></div>
  </div>;
}
