"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { tr } from "@/lib/i18n";
import { useLanguage } from "@/components/layout/language-provider";

const groups = [
  { title: "Basic information", fields: ["Brand", "Product name", "Series", "Manufacturer", "Parent company", "Country of origin", "Markets", "Official website", "Status"] },
  { title: "Classification", fields: ["Product category", "Subcategory", "Product format", "Form shape", "Unitization", "Use mode", "Commercial presentation", "Delivery route", "Contains tobacco", "Tobacco-free", "Nicotine source", "Product technology"] },
  { title: "Nicotine information", fields: ["Nicotine strength", "Nicotine per unit", "Nicotine per gram", "Total nicotine", "Nicotine form", "Strength label"] },
  { title: "Flavor & sensory", fields: ["Flavor", "Flavor category", "Cooling", "Sweetness", "Sensory notes"] },
  { title: "Dynamic specifications", fields: ["Pouch, film, gum, lozenge, tablet, confectionery, particulate, compacted block or tobacco fields are selected by specification kind."] },
  { title: "Sources & verification", fields: ["Source name", "Source type", "Source URL", "Accessed at", "Verified at", "Last verified"] },
];
export default function ProductTemplate() { const { locale }=useLanguage(); return <div className="container page-shell"><Breadcrumb items={[{label:"Products",href:"/products"},{label:"Detail template"}]}/><div className="page-heading"><p className="eyebrow">{tr(locale,"SCHEMA PREVIEW / NO PRODUCT DATA")}</p><h1>{tr(locale,"Product detail template")}<span className="heading-period">.</span></h1><p>{tr(locale,"This page shows the structure reserved for future verified records. Labels below are fields, not product claims.")}</p></div><div className="template-banner">{tr(locale,"TEMPLATE ONLY")} <span>{tr(locale,"No brand, product, specification or image is represented here.")}</span></div><div className="template-grid">{groups.map((group)=><section className="content-panel" key={group.title}><h2>{tr(locale,group.title)}</h2><div className="spec-table">{group.fields.map((field)=><div className="spec-row" key={field}><span>{tr(locale,field)}</span><strong>—</strong></div>)}</div></section>)}</div></div>; }
