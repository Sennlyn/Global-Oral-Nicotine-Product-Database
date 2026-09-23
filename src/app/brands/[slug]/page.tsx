import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brands } from "@/data/products";
import { getLocale } from "@/lib/server-locale";
import { tr } from "@/lib/i18n";
import { BrandDetailClient } from "./brand-detail-client";

export function generateStaticParams() { return brands.length ? brands.map(({slug})=>({slug})) : [{ slug: "__no-brand-record__" }]; }
export async function generateMetadata({params}: {params:Promise<{slug:string}>}):Promise<Metadata> { const [{slug},locale]=await Promise.all([params,getLocale()]); return {title:brands.find((item)=>item.slug===slug)?.name ?? tr(locale,"Brand")}; }
export default async function BrandDetail({params}: {params:Promise<{slug:string}>}) { const {slug}=await params; const brand=brands.find((item)=>item.slug===slug); if (!brand) notFound(); return <BrandDetailClient brand={brand}/>; }
