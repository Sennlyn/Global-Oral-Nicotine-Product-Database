import Link from "next/link";
import type { Product } from "@/types/catalog";
import { markets } from "@/data/products";
import { getMarketListing, getMarketListingStatus, marketListingLabel, marketListingNotes } from "@/lib/market-listings";
import { tr, type Locale } from "@/lib/i18n";

export function ProductMarketStatusBadges({ product, locale, marketIds }: { product: Product; locale: Locale; marketIds?: string[] }) {
  const scopedMarkets = marketIds ?? product.markets;
  if (!scopedMarkets.length) {
    return <span className="market-status-badge is-pending">{tr(locale, "No market confirmed")} · {marketListingLabel(locale, "pending")}</span>;
  }
  return (
    <div className="market-status-badges">
      {scopedMarkets.map((marketId) => {
        const market = markets.find((item) => item.slug === marketId);
        const status = getMarketListingStatus(product, marketId);
        return (
          <span className={`market-status-badge is-${status}`} key={marketId}>
            {market?.name[locale] ?? marketId} · {marketListingLabel(locale, status)}
          </span>
        );
      })}
    </div>
  );
}

export function ProductMarketStatusDetails({ product, locale }: { product: Product; locale: Locale }) {
  if (!product.markets.length) {
    return <div className="market-listing-empty">
      <span className="market-status-badge is-pending">{tr(locale, "No market confirmed")} · {marketListingLabel(locale, "pending")}</span>
      <p>{tr(locale, "No product-specific sales market is currently supported by the available sources. The brand country does not establish a product's manufacturing country or sales market.")}</p>
    </div>;
  }
  return <div className="market-listing-grid">
    {product.markets.map((marketId) => {
      const market = markets.find((item) => item.slug === marketId);
      const listing = getMarketListing(product, marketId);
      const status = getMarketListingStatus(product, marketId);
      return <article className="market-listing-item" key={marketId}>
        <div className="market-listing-heading"><strong>{market?.name[locale] ?? marketId}</strong><span className={`market-status-badge is-${status}`}>{marketListingLabel(locale, status)}</span></div>
        <p>{marketListingNotes(locale, listing)}</p>
        <div className="market-listing-sources">
          {listing?.officialProductSource?.sourceUrl && <a href={listing.officialProductSource.sourceUrl} target="_blank" rel="noopener noreferrer">{tr(locale, "Official product source")} ↗</a>}
          {listing?.regulatorySource?.sourceUrl && <a href={listing.regulatorySource.sourceUrl} target="_blank" rel="noopener noreferrer">{tr(locale, "Government / regulator source")} ↗</a>}
          {!listing?.officialProductSource?.sourceUrl && <Link href={`/markets/${marketId}`}>{tr(locale, "Market profile")} ↗</Link>}
        </div>
      </article>;
    })}
  </div>;
}
