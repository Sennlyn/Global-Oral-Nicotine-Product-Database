import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FormatCard } from "@/components/formats/format-card";
import { formatGroups, formats } from "@/data/formats";
import { getLocale } from "@/lib/server-locale";
import { tr } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> { return { title: tr(await getLocale(),"Formats") }; }
export default async function FormatsPage() {
  const locale = await getLocale();
  return <div className="container page-shell">
    <Breadcrumb items={[{ label: "Formats" }]}/>
    <div className="page-heading">
      <p className="eyebrow">{tr(locale,"PHYSICAL FORM / 02")}</p>
      <h1>{tr(locale,"Product formats")}<span className="heading-period">.</span></h1>
      <p>{tr(locale,"A physical-form taxonomy that describes structure only. Product category, unitization, use mode and flavour are recorded separately.")}</p>
    </div>
    <div className="taxonomy-intro">
      <span>{formats.length} {tr(locale,"FORMATS")}</span>
      <p>{tr(locale,"Browse by physical structure. Each product has one primary physical form; shape, unitization, use mode and flavour remain separate fields.")}</p>
    </div>
    <div className="format-groups">
      {formatGroups.map((group, index) => {
        const groupFormats = formats.filter((format) => format.groupId === group.id);
        return <section className="format-group" key={group.id}>
          <div className="format-group-heading">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><h2>{group.name[locale]}</h2><p>{group.description[locale]}</p></div>
          </div>
          <div className="format-grid format-group-grid">{groupFormats.map((format) => <FormatCard key={format.id} format={format}/>)}</div>
        </section>;
      })}
    </div>
  </div>;
}
