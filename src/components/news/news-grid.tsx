import { ArrowUpRight } from "lucide-react";
import type { HomeNews } from "@/data/home-updates";
import { localize, tr, type Locale } from "@/lib/i18n";

export function NewsGrid({ items, locale }: { items: HomeNews[]; locale: Locale }) {
  return <div className="overview-news-grid">
    {items.map((item) => (
      <a className="overview-news-card" href={item.source} target="_blank" rel="noreferrer" key={item.id}>
        <div className="overview-news-meta"><time dateTime={item.date}>{localize(locale, item.dateLabel)}</time><span>{localize(locale, item.type)}</span></div>
        <h3>{localize(locale, item.title)}</h3>
        <p>{localize(locale, item.description)}</p>
        <div className="overview-news-source"><span>{tr(locale, "Read original notice")} · {item.publisher}</span><ArrowUpRight size={17} /></div>
      </a>
    ))}
  </div>;
}
