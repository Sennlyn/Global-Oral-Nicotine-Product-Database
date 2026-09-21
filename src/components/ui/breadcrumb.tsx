"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/layout/language-provider";
import { tr } from "@/lib/i18n";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  const { locale } = useLanguage();
  return <nav className="breadcrumb" aria-label={tr(locale,"Breadcrumb")}><Link href="/">{tr(locale,"Home")}</Link>{items.map((item, index) => <span key={`${item.label}-${index}`} className="breadcrumb-part"><ChevronRight size={14}/>{item.href ? <Link href={item.href}>{tr(locale,item.label)}</Link> : <span aria-current="page">{tr(locale,item.label)}</span>}</span>)}</nav>;
}
