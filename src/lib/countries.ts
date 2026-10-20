import { brands, products } from "@/data/products";
import { brandCountries, countryForBrand } from "@/data/countries";

export const countryProfiles = brandCountries.map(country => {
  const entries = brands.filter(brand => countryForBrand(brand).slug === country.slug);
  const brandIds = new Set(entries.map(brand => brand.id));
  const records = products.filter(product => brandIds.has(product.brandId));
  return { ...country, brands: entries, products: records };
}).filter(country => country.brands.length > 0);

export const confirmedCountryProfiles = countryProfiles.filter(country => country.slug !== "unconfirmed");
