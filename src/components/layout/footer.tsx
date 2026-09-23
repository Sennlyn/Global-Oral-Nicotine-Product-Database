"use client";

import Link from "next/link";
import { useLanguage } from "@/components/layout/language-provider";
import { tr } from "@/lib/i18n";

export function Footer() {
  const { locale } = useLanguage();
  const disclaimer="This website is solely for product information organization, industry research and technical research. It does not sell tobacco or nicotine products or provide purchase advice. Nicotine is addictive, and tobacco and nicotine products may pose health risks. Regulations vary by country and region. Product specifications, market status and availability should be checked against the latest official brand, manufacturer or regulator information.";
  return <footer className="site-footer"><div className="container"><div className="footer-main"><div><Link href="/" className="footer-logo">GONPD<span>.</span></Link><p className="footer-tagline">{tr(locale,"A structured reference for the evolving landscape of oral nicotine and smokeless tobacco.")}</p></div><div className="footer-links"><div><strong>{tr(locale,"Explore")}</strong><Link href="/products">{tr(locale,"Products")}</Link><Link href="/categories">{tr(locale,"Categories")}</Link><Link href="/formats">{tr(locale,"Formats")}</Link></div><div><strong>{tr(locale,"Database")}</strong><Link href="/brands">{tr(locale,"Brands")}</Link><Link href="/markets">{tr(locale,"Markets")}</Link><Link href="/compare">{tr(locale,"Compare")}</Link></div><div><strong>{tr(locale,"Project")}</strong><Link href="/about">{tr(locale,"About")}</Link><span>{tr(locale,"Version 1.0 · Framework")}</span></div></div></div><div className="footer-disclaimer"><strong>{tr(locale,"Research use only")}</strong><p>{tr(locale,disclaimer)}</p></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {locale === "zh" ? "全球口腔尼古丁产品数据库" : "Global Oral Nicotine Product Database"}</span><span>{tr(locale,"Independent research database · source-linked product records")}</span></div></div></footer>;
}
