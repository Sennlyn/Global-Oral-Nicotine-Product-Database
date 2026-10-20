import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { countryProfiles } from "@/lib/countries";
import { CountryDetailClient } from "./country-detail-client";

export function generateStaticParams() { return countryProfiles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const country = countryProfiles.find(item => item.slug === slug);
  return { title: country ? `${country.name.zh} · ${country.name.en}` : "Countries / regions" };
}
export default async function CountryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!countryProfiles.some(country => country.slug === slug)) notFound();
  return <CountryDetailClient slug={slug} />;
}
