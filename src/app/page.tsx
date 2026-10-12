"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpenCheck, Database, Layers3, MapPinned, ShieldCheck } from "lucide-react";
import { brands, markets, products } from "@/data/products";
import { useLanguage } from "@/components/layout/language-provider";
import { localize, tr } from "@/lib/i18n";
import { homeNews, homeMilestones, milestoneKinds, HOME_UPDATES_CHECKED } from "@/data/home-updates";
import { useRef } from "react";
import { HomeCoverageMap } from "@/components/home-coverage-map";
import { NewsGrid } from "@/components/news/news-grid";

const overviewCards = [
  {
    href: "/products",
    icon: Database,
    number: "01",
    title: "Product catalogue",
    description: "Browse source-linked oral nicotine and smokeless tobacco products, with market status assessed separately for each country.",
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

export default function Home() {
  const { locale } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollHistory = (direction: number) => {
    const track = timelineRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
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
            <p className="overview-eyebrow"><span className="live-dot" />{tr(locale, "GLOBAL ORAL NICOTINE DATABASE")}<span className="overview-version">V1.9.2</span></p>
            <h1 className={locale === "zh" ? "overview-title-zh" : undefined}>
              {locale === "zh" ? <><span>全球口腔尼古丁产品</span><em>数据库</em></> : <>{tr(locale, "A clearer view of")} <em>{tr(locale, "oral nicotine.")}</em></>}
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
          <div className="overview-metrics-label"><span>{tr(locale, "CATALOG AT A GLANCE")}</span><p>{tr(locale, "Market status is assessed for each product and country. Open a record to see its evidence and lifecycle.")}</p></div>
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
        <p className="overview-updated">{tr(locale, "Sources checked")} <time dateTime={HOME_UPDATES_CHECKED}>{locale === "zh" ? "2026 年 10 月 12 日" : "12 October 2026"}</time></p>
        <NewsGrid items={homeNews.slice(0, 3)} locale={locale} />
        <div className="overview-news-more"><Link href="/news" className="overview-text-link">{tr(locale, "View all updates")}<ArrowRight size={16} /></Link></div>
      </section>

      <section className="overview-timeline">
        <div className="container">
          <div className="overview-section-heading">
            <div><p className="eyebrow">{tr(locale, "A HISTORY OF ORAL PRODUCT FORMATS")}</p><h2>{tr(locale, "Oral product evolution and regulatory milestones")}</h2></div>
            <p>{tr(locale, "Follow brands, packaging, nicotine replacement medicines and product-specific regulatory decisions through original sources.")}</p>
          </div>
          <div className="overview-timeline-controls"><span>{homeMilestones.length} {tr(locale, "documented events")} · 1822–2026</span><div><button type="button" aria-label={tr(locale, "Earlier events")} onClick={() => scrollHistory(-1)}>←</button><button type="button" aria-label={tr(locale, "Later events")} onClick={() => scrollHistory(1)}>→</button></div></div>
          <div id="home-history" ref={timelineRef} className="overview-timeline-scroll" tabIndex={0} role="region" aria-label={tr(locale, "Oral product milestones")}>
          <ol className="overview-timeline-track">
            {homeMilestones.map((item) => <li className="overview-timeline-item" key={item.id}>
              <time dateTime={item.date}>{localize(locale, item.dateLabel)}</time>
              <span className="overview-timeline-node" aria-hidden="true" />
              <span className="overview-timeline-kind">{localize(locale, milestoneKinds[item.kind])}</span>
              <h3>{localize(locale, item.title)}</h3>
              <p>{localize(locale, item.description)}</p>
              <a href={item.source} target="_blank" rel="noreferrer">{tr(locale, "Read source")} · {item.publisher} ↗</a>
            </li>)}
          </ol>
          </div>
          <p className="overview-timeline-hint">{tr(locale, "Scroll to explore the milestones")} <span aria-hidden="true">↔</span></p>
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
          <div className="overview-evidence-copy"><p className="overview-evidence-eyebrow">{tr(locale, "RESEARCH BUILT AROUND EVIDENCE")}</p><h2>{tr(locale, "Know what is documented.")}</h2><p>{tr(locale, "Every product record shows its sources, product lifecycle and country-specific listing evidence.")}</p></div>
          <Link href="/about" className="overview-evidence-link">{tr(locale, "Read the methodology")}<ArrowUpRight size={17} /></Link>
        </div>
      </section>
    </main>
  );
}
