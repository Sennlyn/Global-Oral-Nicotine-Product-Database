import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FormatCard } from "@/components/formats/format-card";
import { formats } from "@/data/formats";
import { getLocale } from "@/lib/server-locale";
import { tr } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> { return { title: tr(await getLocale(),"Formats") }; }
export default async function FormatsPage() { const locale=await getLocale(); return <div className="container page-shell"><Breadcrumb items={[{label:"Formats"}]}/><div className="page-heading"><p className="eyebrow">{tr(locale,"PHYSICAL FORM / 02")}</p><h1>{tr(locale,"Product formats")}<span className="heading-period">.</span></h1><p>{tr(locale,"A second, independent way to navigate the database. Format describes physical form while category describes product family.")}</p></div><div className="taxonomy-intro"><span>{formats.length} {tr(locale,"FORMATS")}</span><p>{tr(locale,"A single format may appear across multiple categories, and a category may contain multiple formats.")}</p></div><div className="format-grid formats-page-grid">{formats.map((format)=><FormatCard key={format.id} format={format}/>)}</div></div>; }
