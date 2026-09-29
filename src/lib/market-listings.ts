import type { Locale } from "@/lib/i18n";
import type { MarketListingStatus, Product, ProductMarketListing } from "@/types/catalog";
import { tr } from "@/lib/i18n";

const defaultPendingNotes = {
  en: "The required official product and local regulatory evidence has not been confirmed for this exact product-market pair. This status also covers pre-market, withdrawn and historical records; it does not mean the product never existed.",
  zh: "尚未找到足以确认该产品在此市场符合当地销售要求的产品级官方证据。待上市也包含上市前、已下架及历史产品记录，不代表该产品从未存在。",
};

export function getMarketListing(product: Product, marketId: string): ProductMarketListing | undefined {
  return product.marketListings?.find((listing) => listing.marketId === marketId);
}

export function getMarketListingStatus(product: Product, marketId?: string): MarketListingStatus {
  const listings = marketId
    ? [getMarketListing(product, marketId)].filter((listing): listing is ProductMarketListing => Boolean(listing))
    : product.marketListings ?? [];
  return listings.some((listing) => listing.status === "marketed") ? "marketed" : "pending";
}

export function productMatchesMarketListingStatus(product: Product, status: MarketListingStatus, marketId?: string): boolean {
  if (marketId) return getMarketListingStatus(product, marketId) === status && product.markets.includes(marketId);
  return getMarketListingStatus(product) === status;
}

export function marketListingLabel(locale: Locale, status: MarketListingStatus): string {
  return tr(locale, status === "marketed" ? "Listed" : "Not on market");
}

export function marketListingNotes(locale: Locale, listing?: ProductMarketListing): string {
  return listing?.notes[locale] ?? defaultPendingNotes[locale];
}

export function countMarketListingStatus(products: Product[], marketId: string, status: MarketListingStatus): number {
  return products.filter((product) => product.markets.includes(marketId) && getMarketListingStatus(product, marketId) === status).length;
}
