"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpenCheck, Database, Layers3, MapPinned, ShieldCheck } from "lucide-react";
import { brands, markets, products } from "@/data/products";
import { useLanguage } from "@/components/layout/language-provider";
import { tr } from "@/lib/i18n";
import { HomeCoverageMap } from "@/components/home-coverage-map";

const overviewCards = [
  {
    href: "/products",
    icon: Database,
    number: "01",
    title: "Product catalogue",
    description: "Browse individual oral nicotine and oral smokeless tobacco product records, with source and review status shown on each record.",
    action: "Explore products",
    kind: "catalog",
  },
  {
    href: "/categories",
    icon: Layers3,
    number: "02",
    title: "Classification framework",
    description: "See how product families and physical forms are organized as distinct research dimensions.",
    action: "Explore classification",
    kind: "framework",
  },
  {
    href: "/markets",
    icon: MapPinned,
    number: "03",
    title: "Market index",
    description: "Navigate the country and market framework, and review product coverage where source-backed records are available.",
    action: "Browse markets",
    kind: "markets",
  },
];

const newsItems = [
  {
    date: "2026-08-21",
    dateLabel: "21 August 2026",
    type: "FDA PRODUCT AUTHORISATION",
    title: "FDA authorizes 11 new ZYN ULTRA pouch products",
    description: "The U.S. FDA authorized 11 ZYN ULTRA nicotine pouches made by Swedish Match USA through the PMTA pathway.",
    source: "https://www.fda.gov/tobacco-products/ctp-newsroom/fda-authorizes-11-new-nicotine-pouches",
  },
  {
    date: "2026-08-04",
    dateLabel: "4 August 2026",
    type: "FDA PRODUCT AUTHORISATION",
    title: "FDA authorizes four new on! nicotine pouches",
    description: "The authorized products are Rich Berry 2 mg, Cappuccino 2 mg and 4 mg, and Autumn Spice 2 mg, made by Helix Innovations.",
    source: "https://www.fda.gov/tobacco-products/ctp-newsroom/pilot-program-update-fda-authorizes-4-new-nicotine-pouches",
  },
  {
    date: "2026-06-30",
    dateLabel: "30 June 2026",
    type: "FDA REGULATORY UPDATE",
    title: "FDA grants modified-risk orders for 20 ZYN pouches",
    description: "The order applies to 10 named ZYN varieties in 3 mg and 6 mg strengths and authorizes only the specified wording.",
    source: "https://www.fda.gov/tobacco-products/ctp-newsroom/fda-authorizes-20-zyn-nicotine-pouches-be-marketed-specific-modified-risk-claim",
  },
];

export default function Home() {
  const { locale } = useLanguage();
  const marketsWithProducts = markets.filter((market) => products.some((product) => product.markets.includes(market.slug)));
  const metrics = [
    { label: "Product records", value: products.length, icon: Database },
    { label: "Brand profiles", value: brands.length, icon: BookOpenCheck },
    { label: "Markets with records", value: marketsWithProducts.length, icon: MapPinned },
  ];

  return (
    <main className="home-overview">
      <section className="overview-hero">
        <div className="container overview-hero-grid">
          <div className="overview-copy">
            <p className="overview-eyebrow"><span className="live-dot" />{tr(locale, "GLOBAL ORAL NICOTINE DATABASE")}<span className="overview-version">V1.5</span></p>
            <h1 className={locale === "zh" ? "overview-title-zh" : undefined}>
              {locale === "zh" ? <><span>全球口腔尼古丁产品</span><em>数据库。</em></> : <>{tr(locale, "A clearer view of")} <em>{tr(locale, "oral nicotine.")}</em></>}
            </h1>
            <p className="overview-lede">{tr(locale, "A research database bringing together oral nicotine and smokeless tobacco products in a structured, source-aware catalog.")}</p>
            <p className="overview-sublede">{tr(locale, "Explore real product records, understand how they are classified, and follow documented details back to their sources.")}</p>
            <div className="overview-actions">
              <Link href="/products" className="button button-primary">{tr(locale, "Explore the database")}<ArrowUpRight size={17} /></Link>
              <Link href="/about" className="overview-text-link">{tr(locale, "How this database works")}<ArrowRight size={16} /></Link>
            </div>
          </div>

          <HomeCoverageMap locale={locale} />
        </div>
      </section>

      <section className="overview-metrics" aria-label={tr(locale, "Catalog at a glance")}>
        <div className="container overview-metrics-inner">
          <div className="overview-metrics-label"><span>{tr(locale, "CATALOG AT A GLANCE")}</span><p>{tr(locale, "Records can have different review states. Open an entry to see its status and sources.")}</p></div>
          <div className="overview-metrics-grid">
            {metrics.map((metric) => <div className="overview-metric" key={metric.label}><metric.icon size={18} strokeWidth={1.6} /><strong>{String(metric.value).padStart(2, "0")}</strong><span>{tr(locale, metric.label)}</span></div>)}
          </div>
        </div>
      </section>

      <section className="overview-news section container">
        <div className="overview-section-heading">
          <div><p className="eyebrow">{tr(locale, "OFFICIAL PRODUCT & REGULATORY UPDATES")}</p><h2>{tr(locale, "Recent product updates")}</h2></div>
          <p>{tr(locale, "Selected announcements from official sources, with the original notice one click away.")}</p>
        </div>
        <div className="overview-news-grid">
          {newsItems.map((item) => (
            <a className="overview-news-card" href={item.source} target="_blank" rel="noreferrer" key={item.date}>
              <div className="overview-news-meta"><time dateTime={item.date}>{tr(locale, item.dateLabel)}</time><span>{tr(locale, item.type)}</span></div>
              <h3>{tr(locale, item.title)}</h3>
              <p>{tr(locale, item.description)}</p>
              <div className="overview-news-source"><span>{tr(locale, "Read the FDA notice")}</span><ArrowUpRight size={17} /></div>
            </a>
          ))}
        </div>
      </section>

      <section className="overview-explore section container">
        <div className="overview-section-heading">
          <div><p className="eyebrow">{tr(locale, "START WITH THE OVERVIEW")}</p><h2>{tr(locale, "Explore the database")}</h2></div>
          <p>{tr(locale, "A single entry point to the catalog, its classification system and current market index.")}</p>
        </div>
        <div className="overview-card-grid">
          {overviewCards.map((card) => <Link href={card.href} className={`overview-card overview-card-${card.kind}`} key={card.href}>
            <div className="overview-card-top"><span className="overview-card-icon"><card.icon size={21} strokeWidth={1.6} /></span><span className="overview-card-number">{card.number}</span></div>
            <div className="overview-card-copy"><h3>{tr(locale, card.title)}</h3><p>{tr(locale, card.description)}</p></div>
            <div className="overview-card-bottom"><span>{tr(locale, card.action)}</span><ArrowUpRight size={18} /></div>
          </Link>)}
        </div>
      </section>

      <section className="overview-evidence">
        <div className="container overview-evidence-inner">
          <div className="overview-evidence-icon"><ShieldCheck size={24} strokeWidth={1.5} /></div>
          <div className="overview-evidence-copy"><p className="overview-evidence-eyebrow">{tr(locale, "RESEARCH BUILT AROUND EVIDENCE")}</p><h2>{tr(locale, "Know what is documented.")}</h2><p>{tr(locale, "Each product record shows its available sources and verification status. Unconfirmed details remain marked for review.")}</p></div>
          <Link href="/about" className="overview-evidence-link">{tr(locale, "Read the methodology")}<ArrowUpRight size={17} /></Link>
        </div>
      </section>
    </main>
  );
}
