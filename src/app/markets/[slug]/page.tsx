import { CountryRedirect } from "@/components/country-redirect";
import { countryProfiles } from "@/lib/countries";
import { markets } from "@/data/products";
import { regions } from "@/data/regions";
export function generateStaticParams() { return [...markets, ...regions].map(({slug}) => ({slug})); }
export default async function LegacyMarketPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  return <CountryRedirect href={countryProfiles.some(country => country.slug === slug) ? `/countries/${slug}` : "/countries"} />;
}
