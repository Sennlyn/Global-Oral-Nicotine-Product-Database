"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/layout/language-provider";
import { tr } from "@/lib/i18n";

export function SectionHeader({ eyebrow, title, description, href, linkLabel }: { eyebrow: string; title: string; description?: string; href?: string; linkLabel?: string }) {
  const { locale } = useLanguage();
  return <div className="section-header">
    <div><p className="eyebrow">{tr(locale,eyebrow)}</p><h2>{tr(locale,title)}</h2>{description && <p className="section-description">{tr(locale,description)}</p>}</div>
    {href && <Link className="section-link" href={href}>{tr(locale,linkLabel ?? "View all")}<ArrowUpRight size={17}/></Link>}
  </div>;
}
