"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useLanguage } from "@/components/layout/language-provider";
import { NewsGrid } from "@/components/news/news-grid";
import { homeNews, HOME_UPDATES_CHECKED } from "@/data/home-updates";
import { tr } from "@/lib/i18n";

export default function NewsPageClient() {
  const { locale } = useLanguage();
  return <main className="container page-shell news-archive">
    <Breadcrumb items={[{ label: "All product updates" }]} />
    <div className="overview-section-heading">
      <div><p className="eyebrow">{tr(locale, "OFFICIAL PRODUCT & REGULATORY UPDATES")}</p><h1>{tr(locale, "All product updates")}</h1></div>
      <p>{tr(locale, "Browse all recorded official announcements, newest first, with links to the original sources.")}</p>
    </div>
    <div className="news-archive-meta">
      <p>{homeNews.length} {tr(locale, "recorded updates")} · {tr(locale, "Sources checked")} <time dateTime={HOME_UPDATES_CHECKED}>{locale === "zh" ? "2026 年 10 月 12 日" : "12 October 2026"}</time></p>
      <Link href="/" className="overview-text-link"><ArrowLeft size={16} />{tr(locale, "Back to home")}</Link>
    </div>
    <NewsGrid items={homeNews} locale={locale} />
  </main>;
}
