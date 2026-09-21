"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProductFormat } from "@/types/catalog";
import { useLanguage } from "@/components/layout/language-provider";

export function FormatCard({ format }: { format: ProductFormat }) {
  const { locale } = useLanguage();
  return <Link href={`/formats/${format.slug}`} className="format-card"><span className="format-symbol" aria-hidden>{format.name.en.slice(0, 2).toUpperCase()}</span><span className="format-name">{format.name[locale]}</span><ArrowUpRight size={17}/></Link>;
}
