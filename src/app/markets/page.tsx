"use client";

import { ArrowUpRight, Globe2 } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { regions } from "@/data/regions";
import { markets } from "@/data/products";
import { tr } from "@/lib/i18n";
import { useLanguage } from "@/components/layout/language-provider";

export default function MarketsPage() { const { locale }=useLanguage(); return <div className="container page-shell"><Breadcrumb items={[{label:"Markets"}]}/><div className="page-heading"><p className="eyebrow">{tr(locale,"GEOGRAPHIC INDEX / 04")}</p><h1>{tr(locale,"Global markets")}<span className="heading-period">.</span></h1><p>{tr(locale,"A regional navigation framework for future country and market profiles. No country product or regulatory data has been entered.")}</p></div><div className="market-callout"><Globe2 size={24}/><div><strong>{tr(locale,"Geography is a research dimension.")}</strong><span>{tr(locale,"Regions below are navigation shells. Verified country profiles and product counts will come later.")}</span></div></div><div className="region-grid market-region-grid">{regions.map((region,index)=><Link className="region-card" href={`/markets/${region.slug}`} key={region.slug}><span className="region-num">{String(index+1).padStart(2,"0")}</span><div><strong>{region[locale]}</strong></div><ArrowUpRight size={18}/></Link>)}</div><div className="section-spacer"><EmptyState title="Market product data will be added in a future update." description={locale === "zh" ? `目前有 ${markets.length} 个已核实国家档案。` : `${markets.length} verified country profiles are currently available.`}/></div></div>; }
