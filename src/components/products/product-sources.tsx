"use client";

import type { Source } from "@/types/catalog";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/layout/language-provider";
import { tr } from "@/lib/i18n";

export function ProductSources({ sources }: { sources: Source[] }) { const {locale}=useLanguage(); return sources.length ? <ul className="source-list">{sources.map((source)=><li key={source.id}><a href={source.sourceUrl} target="_blank" rel="noopener noreferrer">{source.sourceName}<ExternalLink size={14}/></a><span>{tr(locale,source.sourceType)} · {tr(locale,"Accessed at")} {source.accessedAt}</span></li>)}</ul> : <p className="muted-copy">{tr(locale,"No sources attached to this template.")}</p>; }
