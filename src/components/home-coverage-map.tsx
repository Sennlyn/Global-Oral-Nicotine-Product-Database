"use client";

import Link from "next/link";
import { useState } from "react";
import { markets, products } from "@/data/products";
import { getMarketListing } from "@/lib/market-listings";
import { tr, type Locale } from "@/lib/i18n";
import { publicAssetPath } from "@/lib/public-path";

const mapPoints: Record<string, { longitude: number; latitude: number; align: "left" | "right" }> = {
  "united-states": { longitude: -98.5, latitude: 39.8, align: "left" },
  "united-kingdom": { longitude: -2.5, latitude: 54, align: "right" },
  sweden: { longitude: 15, latitude: 62, align: "right" },
  switzerland: { longitude: 8.2, latitude: 46.8, align: "right" },
};

const project = (longitude: number, latitude: number) => ({
  x: (longitude + 180) / 360 * 1080,
  y: (80 - latitude) / 160 * 540,
});

export function HomeCoverageMap({ locale }: { locale: Locale }) {
  const [activeMarket, setActiveMarket] = useState<string | null>(null);
  const coveredMarkets = markets.flatMap((market) => {
    const point = mapPoints[market.slug];
    const records = products.filter((product) => product.markets.includes(market.slug));
    return point && records.length > 0 ? [{ market, point, records }] : [];
  });

  return (
    <div
      className="overview-art coverage-card"
      role="group"
      aria-label={tr(locale, "Map of countries with product records in this database")}
    >
      <div className="overview-art-header">
        <span>{tr(locale, "MARKETS WITH PRODUCT RECORDS")}</span>
        <span>{String(coveredMarkets.length).padStart(2, "0")} {tr(locale, "MARKETS")}</span>
      </div>

      <div className="coverage-map-frame">
        <div className="coverage-map-canvas" style={{ backgroundImage: `url("${publicAssetPath("/world-map.svg")}")` }}>
          {coveredMarkets.map(({ market, point, records }) => {
            const location = project(point.longitude, point.latitude);
            const listedCount = records.filter((product) => getMarketListing(product, market.slug)?.status === "marketed").length;
            const pendingCount = records.length - listedCount;
            const isOpen = activeMarket === market.slug;
            const summary = `${market.name[locale]} · ${records.length} ${tr(locale, "records")} · ${listedCount} ${tr(locale, "Listed")} · ${pendingCount} ${tr(locale, "Not on market")}`;
            return (
              <div
                className={`coverage-marker coverage-marker-${point.align}`}
                key={market.slug}
                style={{ left: `${location.x / 10.8}%`, top: `${location.y / 5.4}%` }}
              >
                <button
                  className="coverage-marker-dot"
                  type="button"
                  aria-label={summary}
                  aria-expanded={isOpen}
                  aria-controls={`coverage-tooltip-${market.slug}`}
                  onClick={() => setActiveMarket(isOpen ? null : market.slug)}
                />
                <div
                  id={`coverage-tooltip-${market.slug}`}
                  className={`coverage-tooltip${isOpen ? " is-open" : ""}`}
                  role="region"
                  aria-label={market.name[locale]}
                >
                  <strong>{market.name[locale]}</strong>
                  <span>{records.length} {tr(locale, "records")}</span>
                  <span>{listedCount} {tr(locale, "Listed")} · {pendingCount} {tr(locale, "Not on market")}</span>
                  <Link href={`/markets/${market.slug}`}>{tr(locale, "Open market profile")} ↗</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="overview-art-footer coverage-footer">
        <span><i />{tr(locale, "Hover, focus or tap a marker for market details")}</span>
        <a href="https://www.naturalearthdata.com/downloads/110m-cultural-vectors/" target="_blank" rel="noreferrer">
          {tr(locale, "Map data: Natural Earth")}
        </a>
      </div>
    </div>
  );
}
