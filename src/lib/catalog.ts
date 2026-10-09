import { brands, manufacturers, products } from "@/data/products";
import { resolveCategoryId } from "@/data/categories";
import { resolveFormatId } from "@/data/formats";
import type { Product, ProductSpecification } from "@/types/catalog";
import { productMatchesMarketListingStatus } from "@/lib/market-listings";
import { tr, type Locale } from "@/lib/i18n";

export type ProductQuery = {
  query?: string;
  category?: string;
  format?: string;
  brand?: string;
  manufacturer?: string;
  country?: string;
  market?: string;
  flavor?: string;
  strength?: string;
  nicotineSource?: string;
  containsTobacco?: string;
  tobaccoFree?: string;
  deliveryRoute?: string;
  status?: string;
  marketStatus?: "marketed" | "pending";
  recordKind?: "current" | "historical";
  sort?: string;
  display?: "families" | "variants";
  imageStatus?: "exact" | "reference" | "missing";
};

// Keep legacy tobaccoFree data and links compatible with one visible attribute.
export function containsTobacco(product: Product): boolean | undefined {
  return product.containsTobacco ?? (product.tobaccoFree === undefined ? undefined : !product.tobaccoFree);
}

export function nicotineStrengthLabel(product: Product, locale: Locale): string | undefined {
  const mg = product.nicotine?.nicotineStrengthMg;
  if (mg === undefined || locale === "en") return product.nicotine?.nicotineStrength;
  const kind = product.specifications.kind;
  const unit = kind === "gum" ? "片" : kind === "lozenge" ? "含片" : kind === "tablet" ? "片" : product.formatId === "film" ? "膜片" : product.formatId === "stick" ? "支" : "袋";
  return "每" + unit + " " + mg + " 毫克";
}

export function searchProducts(filters: ProductQuery, records: Product[] = products): Product[] {
  const q = filters.query?.trim().toLowerCase();
  const numericStrength = filters.strength?.trim().match(/^(\d+(?:\.\d+)?)\s*(?:mg)?$/i);
  const matches = records.filter((product) => {
    const brand = brands.find((item) => item.id === product.brandId)?.name ?? "";
    const manufacturer = manufacturers.find((item) => item.id === product.manufacturerId)?.name ?? product.manufacturerId ?? "";
    const searchable = [product.productName, ...(product.historicalNames ?? []), brand, product.series, manufacturer, tr("zh", manufacturer), product.categoryId, product.subcategory, product.formatId, product.recordContext?.en, product.recordContext?.zh, product.countryOfOrigin, product.flavor?.name, ...product.markets].filter(Boolean).join(" ").toLowerCase();
    return (!q || searchable.includes(q)) &&
      (!filters.imageStatus || (filters.imageStatus === "missing" ? !product.productImage : filters.imageStatus === "reference" ? !!product.imageMatch && product.imageMatch !== "exact-variant" : !!product.productImage && (!product.imageMatch || product.imageMatch === "exact-variant"))) &&
      (!filters.category || resolveCategoryId(product.categoryId) === resolveCategoryId(filters.category)) &&
      (!filters.format || resolveFormatId(product.formatId) === resolveFormatId(filters.format)) &&
      (!filters.brand || product.brandId === filters.brand) &&
      (!filters.manufacturer || product.manufacturerId === filters.manufacturer || [manufacturer, tr("zh", manufacturer)].join(" ").toLowerCase().includes(filters.manufacturer.trim().toLowerCase())) &&
      (!filters.country || product.countryOfOrigin === filters.country) &&
      (!filters.market || product.markets.includes(filters.market)) &&
      (!filters.flavor || product.flavor?.name === filters.flavor) &&
      (!filters.strength || (numericStrength ? (product.nicotine?.nicotinePerUnit ?? product.nicotine?.nicotineStrengthMg) === Number(numericStrength[1]) : !!product.nicotine?.nicotineStrength?.toLowerCase().includes(filters.strength.toLowerCase()))) &&
      (!filters.nicotineSource || product.nicotine?.nicotineSource === filters.nicotineSource) &&
      (!filters.containsTobacco || String(containsTobacco(product)) === filters.containsTobacco) &&
      (!filters.tobaccoFree || (containsTobacco(product) !== undefined && String(!containsTobacco(product)) === filters.tobaccoFree)) &&
      (!filters.deliveryRoute || product.deliveryRoute?.includes(filters.deliveryRoute as NonNullable<Product["deliveryRoute"]>[number])) &&
      (!filters.status || product.status === filters.status) &&
      (!filters.recordKind || (product.recordKind ?? "current") === filters.recordKind) &&
      (!filters.marketStatus || productMatchesMarketListingStatus(product, filters.marketStatus, filters.market));
  });
  return matches.sort((a, b) => filters.sort === "name-desc" ? b.productName.localeCompare(a.productName) : a.productName.localeCompare(b.productName));
}

export function specificationRows(spec: ProductSpecification, locale: Locale = "en"): { label: string; value: string }[] {
  const labels: Record<string, string> = {
    unitWeightMg: "Unit weight · mg", netWeightG: "Net weight · g", ph: "pH", sweetener: "Sweetener", releaseType: "Release type",
    portionWeightMg: "Portion weight · mg", pouchSize: "Pouch size", portionsPerCan: "Portions per can", moisture: "Moisture", pouchMaterial: "Pouch material",
    filmWeightMg: "Film weight · mg", filmLengthMm: "Film length · mm", filmWidthMm: "Film width · mm", filmThicknessMm: "Film thickness · mm", filmAreaMm2: "Film area · mm²", dissolutionTimeSec: "Dissolution time · sec", filmMaterial: "Film material", deliverySite: "Delivery site",
    pieceWeightMg: "Piece weight · mg", piecesPerPack: "Pieces per pack", chewingTimeMin: "Chewing time · min", gumBase: "Gum base", releaseProfile: "Release profile",
    lozengeWeightMg: "Lozenge weight · mg", sizeMm: "Size · mm", dissolutionTimeMin: "Dissolution time · min", tabletWeightMg: "Tablet weight · mg", tabletSizeMm: "Tablet size · mm", disintegrationTimeMin: "Disintegration time · min", unitsPerPack: "Units per pack", texture: "Texture", chewingRequired: "Chewing required", tobaccoType: "Tobacco type", format: "Format", attributes: "Additional attributes", particleSize: "Particle size", particleShape: "Particle shape", bulkDensity: "Bulk density", dimensions: "Dimensions", compressionProfile: "Compression profile",
  };
  return Object.entries(spec)
    .filter(([key, value]) => key !== "kind" && value !== undefined && value !== null)
    .map(([key, value]) => {
      const rawValue = Array.isArray(value) ? value.map((item) => tr(locale, String(item))).join(", ") : typeof value === "boolean" ? tr(locale,value ? "Yes" : "No") : String(value);
      const [englishValue, chineseValue] = rawValue.split(" | 中文：", 2);
      return { label: tr(locale,labels[key] ?? key), value: locale === "zh" ? chineseValue ?? tr(locale, englishValue) : englishValue };
    });
}
