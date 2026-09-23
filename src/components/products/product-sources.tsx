"use client";

import type { Source } from "@/types/catalog";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/layout/language-provider";
import { tr } from "@/lib/i18n";
import { publicAssetPath } from "@/lib/public-path";

export function ProductSources({ sources }: { sources: Source[] }) { const {locale}=useLanguage(); return sources.length ? <ul className="source-list">{sources.map((source)=>{const notes=source.notes?.split(" | 中文：");const localizedNotes=locale==="zh"?notes?.[1]??notes?.[0]:notes?.[0];const sourceName=tr(locale,source.sourceName);const sourceHref=source.sourceUrl?.startsWith("/")?publicAssetPath(source.sourceUrl):source.sourceUrl;return <li key={source.id}>{sourceHref ? <a href={sourceHref} target="_blank" rel="noopener noreferrer">{sourceName}<ExternalLink size={14}/></a> : <strong>{sourceName}</strong>}<span>{tr(locale,source.sourceType)} · {tr(locale,"Accessed at")} {source.accessedAt}</span>{localizedNotes && <span>{localizedNotes}</span>}</li>;})}</ul> : <p className="muted-copy">{tr(locale,"No sources attached to this template.")}</p>; }
