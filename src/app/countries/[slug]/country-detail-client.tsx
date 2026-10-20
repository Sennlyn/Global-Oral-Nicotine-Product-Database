"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProductFamilyCard } from "@/components/products/product-family-card";
import { useLanguage } from "@/components/layout/language-provider";
import { countryProfiles } from "@/lib/countries";
import { groupProductFamilies } from "@/lib/product-families";
import { tr } from "@/lib/i18n";

export function CountryDetailClient({ slug }: { slug: string }) {
  const { locale } = useLanguage();
  const country = countryProfiles.find(item => item.slug === slug)!;
  const families = groupProductFamilies(country.products);
  const historical = country.products.filter(product => product.recordKind === "historical").length;
  return <div className="container page-shell">
    <Breadcrumb items={[{ label: "Countries / regions", href: "/countries" }, { label: country.name[locale] }]} />
    <div className="page-heading"><p className="eyebrow">{tr(locale, "BRAND COUNTRY / REGION")}</p><h1>{country.name[locale]}<span className="heading-period">.</span></h1><p>{tr(locale, slug === "unconfirmed" ? "Brand affiliation is not yet established. Product identities and source links remain available." : "Brands affiliated with this country or region, including documented historical products. This is not a list of local sales permissions.")}</p></div>
    <div className="market-stats"><div><span>{tr(locale, "Brands")}</span><strong>{country.brands.length}</strong></div><div><span>{tr(locale, "Product families")}</span><strong>{families.length}</strong></div><div><span>{tr(locale, "Variants")}</span><strong>{country.products.length}</strong></div><div><span>{tr(locale, "Historical records")}</span><strong>{historical}</strong></div></div>
    <section className="content-panel"><h2>{tr(locale, "Brand profiles")}</h2><div className="country-brand-grid">{country.brands.map(brand => <Link href={`/brands/${brand.slug}`} className="country-brand-card" key={brand.id}><h3>{brand.name}<ArrowUpRight size={17} /></h3><p>{brand.brandCountryBasis?.[locale] ?? tr(locale, "Country / region unconfirmed")}</p><small>{country.products.filter(product => product.brandId === brand.id).length} {tr(locale, "variants")}</small></Link>)}</div></section>
    <section className="content-panel section-spacer"><div className="panel-title-row"><h2>{tr(locale, "Related products")}</h2><Link href={`/products?brandCountry=${slug}`} className="text-link">{tr(locale, "View all")} <ArrowUpRight size={16} /></Link></div><div className="product-grid">{families.slice(0, 12).map(family => <ProductFamilyCard key={family.id} family={family} />)}</div></section>
  </div>;
}
