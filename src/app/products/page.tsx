import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProductExplorer } from "@/components/products/product-explorer";
import type { ProductQuery } from "@/lib/catalog";
import { getLocale } from "@/lib/server-locale";
import { tr } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> { return { title: tr(await getLocale(),"Products") }; }
export default async function ProductsPage({searchParams}: {searchParams:Promise<Record<string,string|string[]|undefined>>}) {
  const raw=await searchParams; const initial=Object.fromEntries(Object.entries(raw).map(([key,value])=>[key,Array.isArray(value)?value[0]:value])) as ProductQuery;
  return <div className="container page-shell products-page"><Breadcrumb items={[{label:"Products"}]}/><ProductExplorer key={JSON.stringify(initial)} initial={initial}/></div>;
}
