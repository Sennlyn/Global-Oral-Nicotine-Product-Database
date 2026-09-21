"use client";

import type { ProductSpecification } from "@/types/catalog";
import { specificationRows } from "@/lib/catalog";
import { useLanguage } from "@/components/layout/language-provider";
import { tr } from "@/lib/i18n";

export function SpecificationTable({ specification }: { specification: ProductSpecification }) {
  const { locale }=useLanguage(); const rows=specificationRows(specification,locale);
  return rows.length ? <div className="spec-table">{rows.map((row)=><div className="spec-row" key={row.label}><span>{row.label}</span><strong>{row.value}</strong></div>)}</div> : <p className="muted-copy">{tr(locale,"Format specific values have not been recorded.")}</p>;
}
