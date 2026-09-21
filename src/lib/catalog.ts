import { brands, products } from "@/data/products";
import type { Product, ProductSpecification } from "@/types/catalog";
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
  sort?: string;
};

export function searchProducts(filters: ProductQuery, records: Product[] = products): Product[] {
  const q = filters.query?.trim().toLowerCase();
  const matches = records.filter((product) => {
    const brand = brands.find((item) => item.id === product.brandId)?.name ?? "";
    const searchable = [product.productName, brand, product.series, product.manufacturerId, product.categoryId, product.formatId, product.countryOfOrigin, product.flavor?.name, ...product.markets].filter(Boolean).join(" ").toLowerCase();
    return (!q || searchable.includes(q)) &&
      (!filters.category || product.categoryId === filters.category) &&
      (!filters.format || product.formatId === filters.format) &&
      (!filters.brand || product.brandId === filters.brand) &&
      (!filters.manufacturer || product.manufacturerId === filters.manufacturer) &&
      (!filters.country || product.countryOfOrigin === filters.country) &&
      (!filters.market || product.markets.includes(filters.market)) &&
      (!filters.flavor || product.flavor?.name === filters.flavor) &&
      (!filters.strength || product.nicotine?.nicotineStrength?.toLowerCase().includes(filters.strength.toLowerCase()) || String(product.nicotine?.nicotineStrengthMg ?? "").includes(filters.strength)) &&
      (!filters.nicotineSource || product.nicotine?.nicotineSource === filters.nicotineSource) &&
      (!filters.containsTobacco || String(product.containsTobacco) === filters.containsTobacco) &&
      (!filters.tobaccoFree || String(product.tobaccoFree) === filters.tobaccoFree) &&
      (!filters.deliveryRoute || product.deliveryRoute?.includes(filters.deliveryRoute as NonNullable<Product["deliveryRoute"]>[number])) &&
      (!filters.status || product.status === filters.status);
  });
  return matches.sort((a, b) => filters.sort === "name-desc" ? b.productName.localeCompare(a.productName) : a.productName.localeCompare(b.productName));
}

export function specificationRows(spec: ProductSpecification, locale: Locale = "en"): { label: string; value: string }[] {
  const labels: Record<string, string> = {
    unitWeightMg: "Unit weight · mg", netWeightG: "Net weight · g", ph: "pH", sweetener: "Sweetener", releaseType: "Release type",
    portionWeightMg: "Portion weight · mg", pouchSize: "Pouch size", portionsPerCan: "Portions per can", moisture: "Moisture", pouchMaterial: "Pouch material",
    filmWeightMg: "Film weight · mg", filmLengthMm: "Film length · mm", filmWidthMm: "Film width · mm", filmThicknessMm: "Film thickness · mm", filmAreaMm2: "Film area · mm²", dissolutionTimeSec: "Dissolution time · sec", filmMaterial: "Film material", deliverySite: "Delivery site",
    pieceWeightMg: "Piece weight · mg", piecesPerPack: "Pieces per pack", chewingTimeMin: "Chewing time · min", gumBase: "Gum base", releaseProfile: "Release profile",
    lozengeWeightMg: "Lozenge weight · mg", sizeMm: "Size · mm", dissolutionTimeMin: "Dissolution time · min", tabletWeightMg: "Tablet weight · mg", tabletSizeMm: "Tablet size · mm", disintegrationTimeMin: "Disintegration time · min", unitsPerPack: "Units per pack", texture: "Texture", chewingRequired: "Chewing required", tobaccoType: "Tobacco type", format: "Format", attributes: "Additional attributes",
  };
  return Object.entries(spec).filter(([key, value]) => key !== "kind" && value !== undefined && value !== null).map(([key, value]) => ({ label: tr(locale,labels[key] ?? key), value: typeof value === "object" ? JSON.stringify(value) : typeof value === "boolean" ? tr(locale,value ? "Yes" : "No") : String(value) }));
}
