import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { brands } from "@/data/products";
import { getLocale } from "@/lib/server-locale";
import { tr } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> { return { title: tr(await getLocale(),"Brands") }; }
export default async function BrandsPage() { const locale=await getLocale(); return <div className="container page-shell"><Breadcrumb items={[{label:"Brands"}]}/><div className="page-heading"><p className="eyebrow">{tr(locale,"BRAND INDEX / 03")}</p><h1>{tr(locale,"Brands")}<span className="heading-period">.</span></h1><p>{tr(locale,"A future index of verified brands, parent companies, manufacturers, markets and product portfolios.")}</p></div><div className="index-masthead"><span>{brands.length.toString().padStart(2,"0")}</span><div><strong>{tr(locale,"Verified brands")}</strong><p>{tr(locale,"Brand records will be added with traceable official or other reliable sources.")}</p></div></div><EmptyState title="Brand database coming soon." description="No brand profiles have been entered in this framework phase." action={{label:"Explore product categories",href:"/categories"}}/></div>; }
