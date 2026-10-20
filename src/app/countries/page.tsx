"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Globe2 } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useLanguage } from "@/components/layout/language-provider";
import { countryProfiles, confirmedCountryProfiles } from "@/lib/countries";
import { regions } from "@/data/regions";
import { tr } from "@/lib/i18n";

export default function CountriesPage() {
  const { locale } = useLanguage();
  const [region, setRegion] = useState("");
  const visible = confirmedCountryProfiles.filter(country => !region || country.regions.includes(region));
  const unconfirmed = countryProfiles.find(country => country.slug === "unconfirmed");
  return <div className="container page-shell">
    <Breadcrumb items={[{ label: "Countries / regions" }]} />
    <div className="page-heading"><p className="eyebrow">{tr(locale, "BRAND GEOGRAPHY / 04")}</p><h1>{tr(locale, "Countries / regions")}<span className="heading-period">.</span></h1><p>{tr(locale, "Browse products by their brand's documented country or region of affiliation.")}</p></div>
    <div className="market-callout"><Globe2 size={24} /><div><strong>{tr(locale, "Grouped by brand affiliation")}</strong><span>{tr(locale, "Country affiliation follows the brand's documented origin or operator, with the basis shown in its profile. Manufacturing locations and sales evidence remain separate.")}</span></div></div>
    <div className="country-region-tabs" role="group" aria-label={tr(locale, "Regional navigation")}>
      {[{ slug: "", en: "All regions", zh: "全部区域" }, ...regions.filter(item => confirmedCountryProfiles.some(country => country.regions.includes(item.slug)))].map(item => <button type="button" key={item.slug} aria-pressed={region === item.slug} onClick={() => setRegion(item.slug)}>{item[locale]}</button>)}
    </div>
    {region === "asia" || region === "europe" ? <p className="country-index-note">{tr(locale, "Russia is shown in both Asia and Europe; the global total counts it once.")}</p> : null}
    <div className="region-grid country-index-grid">{visible.map((country, index) => <Link className="region-card" href={`/countries/${country.slug}`} key={country.slug}><span className="region-num">{String(index + 1).padStart(2, "0")}</span><div><strong>{country.name[locale]}</strong><small>{country.brands.length} {tr(locale, "brands")} · {country.products.length} {tr(locale, "variants")}</small><small>{country.brands.slice(0, 3).map(brand => brand.name).join(" · ")}{country.brands.length > 3 ? " …" : ""}</small></div><ArrowUpRight size={18} /></Link>)}</div>
    {unconfirmed && <section className="country-unconfirmed"><div><h2>{unconfirmed.name[locale]}</h2><p>{tr(locale, "A retail destination alone does not establish a brand's country. These records stay available while affiliation is researched.")}</p></div><Link className="button button-outline" href="/countries/unconfirmed">{unconfirmed.brands.length} {tr(locale, "brands")} · {tr(locale, "View records")} <ArrowUpRight size={16} /></Link></section>}
  </div>;
}
