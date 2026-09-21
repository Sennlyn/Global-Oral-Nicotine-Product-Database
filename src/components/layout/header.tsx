"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages, Menu, X } from "lucide-react";
import { useState } from "react";
import { GlobalSearch } from "@/components/layout/global-search";
import { useLanguage } from "@/components/layout/language-provider";
import { tr, type Locale } from "@/lib/i18n";

const links = [{ href: "/", label: "Home" }, { href: "/products", label: "Products" }, { href: "/categories", label: "Categories" }, { href: "/formats", label: "Formats" }, { href: "/brands", label: "Brands" }, { href: "/markets", label: "Markets" }, { href: "/compare", label: "Compare" }, { href: "/about", label: "About" }];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, changeLanguage } = useLanguage();
  const path = usePathname();
  return <header className="site-header"><div className="header-inner"><Link href="/" className="brand-lockup" onClick={() => setMenuOpen(false)} aria-label={locale === "zh" ? "返回全球口腔尼古丁产品数据库首页" : "Global Oral Nicotine Database home"}><span className="brand-mark"><span/></span><span className="brand-text"><strong>GONPD<span className="brand-dot">.</span></strong><small>{tr(locale,"GLOBAL ORAL NICOTINE DATABASE")}</small></span></Link><nav className="desktop-nav" aria-label={tr(locale,"Main navigation")}>{links.map((link) => <Link key={link.href} href={link.href} className={path === link.href || (link.href !== "/" && path.startsWith(`${link.href}/`)) ? "active" : ""}>{tr(locale,link.label)}</Link>)}</nav><div className="header-actions"><GlobalSearch/><label className="language-control"><Languages size={17} aria-hidden="true"/><select aria-label={locale === "zh" ? "选择语言" : "Select language"} value={locale} onChange={(event) => changeLanguage(event.target.value as Locale)}><option value="en">EN</option><option value="zh">中文</option></select></label><button type="button" className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={tr(locale,menuOpen ? "Close menu" : "Open menu")} aria-expanded={menuOpen}>{menuOpen ? <X size={23}/> : <Menu size={23}/>}</button></div></div>{menuOpen && <nav className="mobile-nav" aria-label={tr(locale,"Mobile navigation")}>{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={path === link.href ? "active" : ""}>{tr(locale,link.label)}<span>↗</span></Link>)}</nav>}</header>;
}
