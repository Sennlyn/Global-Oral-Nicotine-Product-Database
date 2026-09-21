"use client";

import { DatabaseZap } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/layout/language-provider";
import { tr } from "@/lib/i18n";

export function EmptyState({ title, description, action }: { title: string; description: string; action?: { label: string; href: string } }) {
  const { locale } = useLanguage();
  return <div className="empty-state">
    <div className="empty-icon"><DatabaseZap size={25} strokeWidth={1.6} /></div>
    <h3>{tr(locale,title)}</h3>
    <p>{tr(locale,description)}</p>
    {action && <Link className="text-link" href={action.href}>{tr(locale,action.label)} <span aria-hidden>↗</span></Link>}
  </div>;
}
