import { markets, products } from "@/data/products";
import { tr, type Locale } from "@/lib/i18n";

const mapPoints: Record<string, {
  longitude: number;
  latitude: number;
  labelX: number;
  labelY: number;
}> = {
  "united-states": { longitude: -98.5, latitude: 39.8, labelX: 190, labelY: 92 },
  "united-kingdom": { longitude: -2.5, latitude: 54, labelX: 480, labelY: 76 },
  sweden: { longitude: 15, latitude: 62, labelX: 640, labelY: 41 },
  switzerland: { longitude: 8.2, latitude: 46.8, labelX: 625, labelY: 139 },
};

const project = (longitude: number, latitude: number) => ({
  x: (longitude + 180) / 360 * 1080,
  y: (80 - latitude) / 160 * 540,
});

export function HomeCoverageMap({ locale }: { locale: Locale }) {
  const coveredMarkets = markets.flatMap((market) => {
    const point = mapPoints[market.slug];
    const productCount = products.filter((product) => product.markets.includes(market.slug)).length;
    return point && productCount > 0 ? [{ market, point, productCount }] : [];
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

      <div className="coverage-map-frame" aria-hidden="true">
        <div className="coverage-map-canvas">
          <svg className="coverage-pin-layer" viewBox="0 0 1080 540" preserveAspectRatio="none">
            {coveredMarkets.map(({ market, point }, index) => {
              const location = project(point.longitude, point.latitude);
              const number = String(index + 1).padStart(2, "0");
              return (
                <g key={market.slug}>
                  <path
                    d={`M${location.x.toFixed(1)},${location.y.toFixed(1)} L${point.labelX},${point.labelY}`}
                    className="coverage-pin-line"
                  />
                  <circle cx={location.x} cy={location.y} r="9" className="coverage-pin-location" />
                  <circle cx={point.labelX} cy={point.labelY} r="18" className="coverage-pin-number" />
                  <text x={point.labelX} y={point.labelY + 5} textAnchor="middle" className="coverage-pin-text">{number}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="coverage-market-key" role="list" aria-label={tr(locale, "Markets with product records")}>
        {coveredMarkets.map(({ market, productCount }, index) => (
          <div className="coverage-market-key-item" role="listitem" key={market.slug}>
            <span className="coverage-market-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="coverage-market-name">{market.name[locale]}</span>
            <span className="coverage-market-count">{productCount} {tr(locale, "records")}</span>
          </div>
        ))}
      </div>

      <div className="overview-art-footer coverage-footer">
        <span><i />{tr(locale, "MARKERS FOLLOW PRODUCT MARKET RECORDS")}</span>
        <a
          href="https://www.naturalearthdata.com/downloads/110m-cultural-vectors/"
          target="_blank"
          rel="noreferrer"
        >
          {tr(locale, "Map data: Natural Earth")}
        </a>
      </div>
    </div>
  );
}
