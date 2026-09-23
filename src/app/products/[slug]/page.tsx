import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/product-detail";
import { products } from "@/data/products";
import { getLocale } from "@/lib/server-locale";
import { tr } from "@/lib/i18n";

function productForSlug(slug: string) { return products.find((item) => item.slug === slug || item.legacySlugs?.includes(slug)); }
export function generateStaticParams() { return products.length ? products.flatMap((product) => [product.slug, ...(product.legacySlugs ?? [])].map((slug) => ({ slug }))) : [{ slug: "__no-product-record__" }]; }
export async function generateMetadata({params}: {params:Promise<{slug:string}>}):Promise<Metadata> { const [{slug},locale]=await Promise.all([params,getLocale()]); return {title:productForSlug(slug)?.productName ?? tr(locale,"Product")}; }
export default async function ProductPage({params}: {params:Promise<{slug:string}>}) { const {slug}=await params; const product=productForSlug(slug); if (!product) notFound(); return <ProductDetail product={product}/>; }
