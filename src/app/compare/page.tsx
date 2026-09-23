"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRightLeft, ArrowUpRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { categories, resolveCategoryId } from "@/data/categories";
import { formats, resolveFormatId } from "@/data/formats";
import { brands, markets, products } from "@/data/products";
import { specificationRows } from "@/lib/catalog";
import { tr } from "@/lib/i18n";
import { useLanguage } from "@/components/layout/language-provider";
import type { Product } from "@/types/catalog";

const fields = ["Brand", "Product", "Product category", "Product format", "Nicotine strength", "Nicotine per unit", "Contains tobacco", "Nicotine source", "Flavor", "Unit weight", "Country of origin", "Markets", "Delivery route", "Status", "Verification status"];

function productValue(product: Product, field: string, locale: "en" | "zh"): string {
  const category = categories.find((item) => item.id === resolveCategoryId(product.categoryId));
  const format = formats.find((item) => item.id === resolveFormatId(product.formatId));
  const brand = brands.find((item) => item.id === product.brandId);
  const values: Record<string, string | undefined> = {
    Brand: brand?.name,
    Product: product.productName,
    "Product category": category?.name[locale],
    "Product format": format?.name[locale],
    "Nicotine strength": product.nicotine?.nicotineStrength,
    "Nicotine per unit": product.nicotine?.nicotinePerUnit === undefined ? undefined : `${product.nicotine.nicotinePerUnit} mg`,
    "Contains tobacco": product.containsTobacco === undefined ? undefined : tr(locale, product.containsTobacco ? "Yes" : "No"),
    "Nicotine source": product.nicotine?.nicotineSource ? tr(locale, product.nicotine.nicotineSource.replaceAll("-", " ")) : undefined,
    Flavor: product.flavor?.name,
    "Unit weight": product.specifications.unitWeightMg === undefined ? undefined : `${product.specifications.unitWeightMg} mg`,
    "Country of origin": product.countryOfOrigin,
    Markets: product.markets.map((slug) => markets.find((market) => market.slug === slug)?.name[locale] ?? slug).join(", "),
    "Delivery route": product.deliveryRoute?.map((route) => tr(locale, route.replaceAll("-", " "))).join(", "),
    Status: tr(locale, product.status), "Verification status": tr(locale, product.verificationStatus),
  };
  return values[field] || "—";
}

export default function ComparePage() {
  const { locale } = useLanguage();
  const [selectedIds, setSelectedIds] = useState(["", "", "", ""]);
  const selectedProducts = selectedIds.map((id) => products.find((product) => product.id === id));
  const selectedRecords = selectedProducts.filter((product): product is Product => product !== undefined);
  const chooseProduct = (slot: number, id: string) => setSelectedIds((current) => current.map((selected, index) => index === slot ? id : selected));
  const sortedProducts = [...products].sort((a, b) => a.productName.localeCompare(b.productName));

  return <div className="container page-shell"><Breadcrumb items={[{ label: "Compare" }]} /><div className="page-heading"><p className="eyebrow">{tr(locale, "SIDE BY SIDE / 05")}</p><h1>{tr(locale, "Product comparison")}<span className="heading-period">.</span></h1><p>{tr(locale, "Compare up to four products. Format-specific attributes are grouped separately.")}</p></div><div className="compare-intro"><ArrowRightLeft size={25} /><div><strong>{tr(locale, "Compare up to 4 products")}</strong><span>{tr(locale, "Choose products below. Values without a supporting source remain blank.")}</span></div></div><div className="compare-selectors">{selectedIds.map((selectedId, index) => <label className="compare-select" key={index}><span>{String(index + 1).padStart(2, "0")} / {tr(locale, "Product slot")}</span><select aria-label={`${tr(locale, "Select a product")} ${index + 1}`} value={selectedId} onChange={(event) => chooseProduct(index, event.target.value)}><option value="">{tr(locale, "Select a product")}</option>{sortedProducts.filter((product) => product.id === selectedId || !selectedIds.includes(product.id)).map((product) => <option key={product.id} value={product.id}>{product.productName} · {brands.find((brand) => brand.id === product.brandId)?.name}</option>)}</select></label>)}</div>{selectedRecords.length ? <><div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>{tr(locale, "ATTRIBUTE")}</th>{selectedProducts.map((product, index) => <th key={index}><div className="compare-slot"><span>0{index + 1}</span><strong>{product?.productName ?? tr(locale, "Product slot")}</strong><small>{product ? brands.find((brand) => brand.id === product.brandId)?.name : tr(locale, "No product selected")}</small></div></th>)}</tr></thead><tbody>{fields.map((field) => <tr key={field}><th>{tr(locale, field)}</th>{selectedProducts.map((product, index) => <td key={index}>{product ? productValue(product, field, locale) : "—"}</td>)}</tr>)}</tbody></table></div><div className="compare-note">{tr(locale, "Cross format comparisons show common fields here; each product’s unique specifications appear in a separate section when records exist.")}</div><div className="compare-specifications"><h2>{tr(locale, "Product-specific specifications")}</h2><div className="compare-spec-grid">{selectedProducts.map((product) => product && <section className="content-panel" key={product.id}><div className="panel-title-row"><h3>{product.productName}</h3><Link className="text-link" href={`/products/${product.slug}`}>{tr(locale, "View record")} <ArrowUpRight size={15} /></Link></div>{specificationRows(product.specifications, locale).length ? <div className="spec-table">{specificationRows(product.specifications, locale).map((row) => <div className="spec-row" key={row.label}><span>{row.label}</span><strong>{row.value}</strong></div>)}</div> : <p className="side-note">{tr(locale, "No format-specific measurements are recorded.")}</p>}</section>)}</div></div></> : <div className="section-spacer"><EmptyState title="Add a product to this comparison." description="Choose one or more products above to compare recorded values; review the verification status of each product." action={{ label: "View product database", href: "/products" }} /></div>}</div>;
}
