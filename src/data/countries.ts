import type { Brand, LocalizedText } from "@/types/catalog";

/** Brand affiliation only. Manufacturing and sales destinations are separate fields. */
export type BrandCountry = {
  slug: string;
  name: LocalizedText;
  regions: string[];
  coordinates?: { lon: number; lat: number };
};

export const brandCountries: BrandCountry[] = [
  { slug: "china", name: { en: "China", zh: "中国" }, regions: ["asia"], coordinates: { lon: 104, lat: 35 } },
  { slug: "japan", name: { en: "Japan", zh: "日本" }, regions: ["asia"], coordinates: { lon: 138, lat: 37 } },
  { slug: "south-korea", name: { en: "South Korea", zh: "韩国" }, regions: ["asia"], coordinates: { lon: 127.8, lat: 36 } },
  { slug: "russia", name: { en: "Russia", zh: "俄罗斯" }, regions: ["asia", "europe"], coordinates: { lon: 90, lat: 60 } },
  { slug: "india", name: { en: "India", zh: "印度" }, regions: ["asia"], coordinates: { lon: 79, lat: 22 } },
  { slug: "pakistan", name: { en: "Pakistan", zh: "巴基斯坦" }, regions: ["asia"], coordinates: { lon: 69, lat: 30 } },
  { slug: "sweden", name: { en: "Sweden", zh: "瑞典" }, regions: ["europe"], coordinates: { lon: 15, lat: 62 } },
  { slug: "denmark", name: { en: "Denmark", zh: "丹麦" }, regions: ["europe"], coordinates: { lon: 9.5, lat: 56 } },
  { slug: "united-kingdom", name: { en: "United Kingdom", zh: "英国" }, regions: ["europe"], coordinates: { lon: -2.5, lat: 54 } },
  { slug: "switzerland", name: { en: "Switzerland", zh: "瑞士" }, regions: ["europe"], coordinates: { lon: 8.2, lat: 46.8 } },
  { slug: "united-states", name: { en: "United States", zh: "美国" }, regions: ["north-america"], coordinates: { lon: -98.5, lat: 39.8 } },
  { slug: "unconfirmed", name: { en: "Country / region unconfirmed", zh: "所属国家／地区待确认" }, regions: [] },
];

export function countryForBrand(brand: Brand): BrandCountry {
  return brandCountries.find(country => country.name.en === brand.brandCountry) ?? brandCountries[brandCountries.length - 1];
}
