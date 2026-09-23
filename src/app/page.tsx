"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpenCheck, Database, Globe2, Layers3, Microscope, Network, SearchCheck, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { CategoryCard } from "@/components/categories/category-card";
import { FormatCard } from "@/components/formats/format-card";
import { SectionHeader } from "@/components/ui/section-header";
import { categories } from "@/data/categories";
import { formats } from "@/data/formats";
import { regions } from "@/data/regions";
import { brands, products, markets } from "@/data/products";
import { tr } from "@/lib/i18n";
import { useLanguage } from "@/components/layout/language-provider";

const principles = [
  { icon: ShieldCheck, title: "Verified products", text: "Formal records require evidence before publication." },
  { icon: SearchCheck, title: "Traceable sources", text: "Source links and verification dates travel with each record." },
  { icon: Layers3, title: "Structured data", text: "Each format can carry its own technical specifications." },
  { icon: Globe2, title: "Global coverage", text: "Designed to grow across countries and market regions." },
  { icon: BookOpenCheck, title: "Regular verification", text: "Records can be revisited as official information changes." },
  { icon: Network, title: "Technical taxonomy", text: "Category, format, source and route remain separate dimensions." },
];

export default function Home() {
  const { locale } = useLanguage();
  const stats = [ { label: "Products", value: String(products.length).padStart(2,"0"), icon: Database }, { label: "Brands", value: String(brands.length).padStart(2,"0"), icon: BookOpenCheck }, { label: "Markets", value: String(markets.length).padStart(2,"0"), icon: Globe2 }, { label: "Categories", value: String(categories.length).padStart(2,"0"), icon: Layers3 }, { label: "Formats", value: String(formats.length).padStart(2,"0"), icon: SlidersHorizontal } ];
  return <>
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><div className="hero-eyebrow"><span className="live-dot"/> {tr(locale,"A RESEARCH DATABASE FRAMEWORK")} <span className="eyebrow-divider"/> V1.5</div><h1>{tr(locale,"Mapping the world of")} <em>{tr(locale,"oral nicotine.")}</em></h1><p className="hero-lede">{tr(locale,"Explore oral nicotine products and smokeless tobacco formats from markets around the world.")}</p><p className="hero-zh">{tr(locale,"A global structured database for oral nicotine, smokeless tobacco and emerging oral delivery formats.")}</p><div className="hero-buttons"><Link href="/products" className="button button-primary">{tr(locale,"Browse products")} <ArrowUpRight size={18}/></Link><Link href="/categories" className="button button-secondary">{tr(locale,"Explore categories")} <ArrowRight size={18}/></Link></div><div className="hero-note"><span className="note-line"/> {tr(locale,"Source-backed product records are now available.")}</div></div><div className="hero-visual" aria-label={tr(locale,"A conceptual illustration of the database classification system")}><div className="visual-orbit orbit-one"/><div className="visual-orbit orbit-two"/><div className="visual-node node-a"><span>01</span><strong>{tr(locale,"CATEGORY")}</strong><small>{tr(locale,"What it is")}</small></div><div className="visual-node node-b"><span>02</span><strong>{tr(locale,"FORMAT")}</strong><small>{tr(locale,"How it takes shape")}</small></div><div className="visual-node node-c"><span>03</span><strong>{tr(locale,"DELIVERY")}</strong><small>{tr(locale,"How it is used")}</small></div><div className="visual-center"><div className="visual-center-mark"><Microscope size={31} strokeWidth={1.4}/></div><strong>{tr(locale,"ORAL NICOTINE")}</strong><span>{tr(locale,"PRODUCT INTELLIGENCE")}</span></div><div className="visual-footer">{tr(locale,"MULTI-DIMENSIONAL CLASSIFICATION")} <span>↗</span></div></div></div></section>
    <section className="stats-strip"><div className="container stats-grid">{stats.map((item) => <div className="stat-item" key={item.label}><item.icon size={19} strokeWidth={1.6}/><div><strong className={item.value === "Coming soon" ? "stat-upcoming" : ""}>{tr(locale,item.value)}</strong><span>{tr(locale,item.label)}</span></div></div>)}</div></section>
    <section className="section container" id="categories"><SectionHeader eyebrow="01 / TAXONOMY" title="Explore by category" description="A broad product hierarchy built for oral nicotine and smokeless tobacco research." href="/categories" linkLabel="All categories"/><div className="category-grid home-category-grid">{categories.map((category, index) => <CategoryCard key={category.id} category={category} index={index}/>)}</div></section>
    <section className="section section-tinted"><div className="container"><SectionHeader eyebrow="02 / PHYSICAL FORM" title="Explore physical forms" description="Physical form describes a product's structure. Product category, unitization, use mode and flavour remain separate fields." href="/formats" linkLabel="All formats"/><div className="format-grid">{formats.map((format) => <FormatCard key={format.id} format={format}/>)}</div></div></section>
    <section className="section container"><SectionHeader eyebrow="03 / GEOGRAPHY" title="Global markets" description="Verified product records from our current market coverage." href="/markets" linkLabel="Explore markets"/><div className="region-grid">{regions.map((region, index) => <Link className="region-card" href={`/markets/${region.slug}`} key={region.slug}><span className="region-num">{String(index+1).padStart(2,"0")}</span><div><strong>{region[locale]}</strong></div><ArrowUpRight size={18}/></Link>)}</div></section>
    <section className="section section-dark"><div className="container"><SectionHeader eyebrow="04 / METHODOLOGY" title="Built around evidence." description="The catalog is designed to make research claims inspectable, comparable and updateable."/><div className="principle-grid">{principles.map((item) => <div className="principle" key={item.title}><item.icon size={24} strokeWidth={1.5}/><h3>{tr(locale,item.title)}</h3><p>{tr(locale,item.text)}</p></div>)}</div><div className="framework-callout"><div><span className="callout-tag">{tr(locale,"CURRENT PHASE")}</span><strong>{tr(locale,"Source-backed product records, published with traceable evidence.")}</strong><p>{tr(locale,"Records are being added as product details and matching official images are verified.")}</p></div><Link href="/about" className="button button-light">{tr(locale,"About this database")} <ArrowUpRight size={18}/></Link></div></div></section>
  </>;
}
