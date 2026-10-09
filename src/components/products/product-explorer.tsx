"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Grid2X2, List, Search, SlidersHorizontal } from "lucide-react";
import { categories, resolveCategoryId } from "@/data/categories";
import { formats, resolveFormatId } from "@/data/formats";
import { brands, markets, products } from "@/data/products";
import { searchProducts, type ProductQuery } from "@/lib/catalog";
import { EmptyState } from "@/components/ui/empty-state";
import { ProductCard } from "@/components/products/product-card";
import { ProductFamilyCard } from "@/components/products/product-family-card";
import { groupProductFamilies } from "@/lib/product-families";
import { useLanguage } from "@/components/layout/language-provider";
import { tr, type Locale } from "@/lib/i18n";

const sourceOptions = ["tobacco-derived", "synthetic", "tobacco-material", "unknown", "other"];
const routeOptions = ["buccal", "gingival", "sublingual", "oral-dissolution", "chewing", "oral-mucosal", "mixed", "other"];
const advanced = ["Moisture", "Product weight", "Unit weight", "pH", "Sweetener", "Cooling", "Release type", "Material", "Technology"];

function FilterSelect({ name, label, value, options, locale }: { name: string; label: string; value?: string; options: {value:string;label:string}[]; locale:Locale }) { return <label className="filter-field"><span>{tr(locale,label)}</span><select name={name} defaultValue={value ?? ""}><option value="">{locale === "zh" ? `全部${tr(locale,label)}` : `All ${label.toLowerCase()}`}</option>{options.map((item)=><option value={item.value} key={item.value}>{tr(locale,item.label)}</option>)}</select></label>; }
function FilterInput({ name, label, value, placeholder, locale }: { name:string; label:string; value?:string; placeholder?:string; locale:Locale }) { return <label className="filter-field"><span>{tr(locale,label)}</span><input name={name} defaultValue={value ?? ""} placeholder={placeholder ? tr(locale,placeholder) : locale === "zh" ? `不限${tr(locale,label)}` : `Any ${label.toLowerCase()}`} /></label>; }

export function ProductExplorer({ initial }: { initial: ProductQuery }) {
  const { locale } = useLanguage();
  const router = useRouter();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [limit, setLimit] = useState(24);
  const result = searchProducts(initial, products);
  const families = groupProductFamilies(result);
  const showVariants = initial.display === "variants";
  const visibleCount = showVariants ? result.length : families.length;
  const selectedCategory = initial.category ? resolveCategoryId(initial.category) : undefined;
  const selectedFormat = initial.format ? resolveFormatId(initial.format) : undefined;
  const hasMoreFilters = [initial.manufacturer, initial.country, initial.marketStatus, initial.nicotineSource, initial.containsTobacco, initial.tobaccoFree, initial.deliveryRoute, initial.recordKind, initial.status, initial.imageStatus].some(Boolean);

  const navigate = (params: URLSearchParams) => router.push("/products" + (params.size ? "?" + params.toString() : ""));
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    new FormData(event.currentTarget).forEach((value, key) => {
      if (String(value).trim()) params.set(key, String(value).trim());
    });
    navigate(params);
  };
  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get("query") ?? "").trim();
    const params = new URLSearchParams(window.location.search);
    if (query) params.set("query", query);
    else params.delete("query");
    navigate(params);
  };

  return <div className="products-explorer">
    <div className="products-toolbar">
      <div className="products-toolbar-top">
        <div><p className="eyebrow">{tr(locale, "PRODUCT DATABASE")}</p><h1>{tr(locale, "Product database")}<span className="heading-period">.</span></h1><p>{tr(locale, "Structured records for oral nicotine and smokeless tobacco products.")}</p></div>
        <span className="results-count">{families.length} {locale === "zh" ? "款式" : "families"} · {result.length} {locale === "zh" ? "规格" : "variants"}</span>
      </div>
      <form className="products-search" onSubmit={search}>
        <Search size={21} />
        <input name="query" defaultValue={initial.query ?? ""} placeholder={tr(locale, "Search products, brands, manufacturers, categories...")} aria-label={tr(locale, "Search products")} />
        <button type="submit">{tr(locale, "Search")} <span>↗</span></button>
      </form>
    </div>

    <p className="catalog-coverage-note">{locale === "zh" ? `图片核对：${result.filter(p=>p.productImage).length} / ${result.length} 个规格有图片依据（含参考图）；其余规格保留待补，系列参考图另行标注。` : `Image coverage: ${result.filter(p=>p.productImage).length} / ${result.length} variants have image evidence, including labelled references. Missing variant photos remain pending.`}</p>

    <div className="products-stack">
      <form className="filter-form filters-horizontal" onSubmit={submit} aria-label={tr(locale, "Product filters")}>
        <input type="hidden" name="query" value={initial.query ?? ""} />
        <input type="hidden" name="sort" value={initial.sort ?? ""} />
        <input type="hidden" name="display" value={initial.display ?? "families"} />
        <div className="filter-header"><div><SlidersHorizontal size={17} /><strong>{tr(locale, "Filters")}</strong></div></div>
        <div className="filter-body">
          <div className="filter-primary-grid">
            <FilterSelect locale={locale} name="category" label="Product category" value={selectedCategory} options={categories.map(item => ({value:item.id, label:item.name[locale]}))} />
            <FilterSelect locale={locale} name="format" label="Product format" value={selectedFormat} options={formats.map(item => ({value:item.id, label:item.name[locale]}))} />
            <FilterSelect locale={locale} name="brand" label="Brand" value={initial.brand} options={brands.map(item => ({value:item.id, label:item.name}))} />
            <FilterSelect locale={locale} name="market" label="Market" value={initial.market} options={markets.map(item => ({value:item.slug, label:item.name[locale]}))} />
            <FilterInput locale={locale} name="flavor" label="Flavor" value={initial.flavor} />
            <FilterInput locale={locale} name="strength" label="Nicotine strength" value={initial.strength} placeholder="e.g. mg per unit" />
          </div>
          <details className="filter-more" open={hasMoreFilters}>
            <summary>{tr(locale, "More filters")}<ChevronDown size={16} aria-hidden="true" /></summary>
            <div className="filter-extra-grid">
              <FilterSelect locale={locale} name="imageStatus" label={locale === "zh" ? "图片状态" : "Image coverage"} value={initial.imageStatus} options={[{value:"exact",label:locale === "zh" ? "对应规格图" : "Matched variant image"},{value:"reference",label:locale === "zh" ? "包装／历史参考图" : "Pack / archive reference"},{value:"missing",label:locale === "zh" ? "具体规格图片待补" : "Variant image pending"}]} />
              <FilterInput locale={locale} name="manufacturer" label="Manufacturer" value={initial.manufacturer} />
              <FilterInput locale={locale} name="country" label="Country of origin" value={initial.country} />
              <FilterSelect locale={locale} name="marketStatus" label="Market listing status" value={initial.marketStatus} options={[{value:"marketed", label:"Listed"}, {value:"pending", label:"Not on market"}]} />
              <FilterSelect locale={locale} name="nicotineSource" label="Nicotine source" value={initial.nicotineSource} options={sourceOptions.map(item => ({value:item, label:item.replaceAll("-", " ")}))} />
              <FilterSelect locale={locale} name="containsTobacco" label="Contains tobacco" value={initial.containsTobacco ?? (initial.tobaccoFree === "true" ? "false" : initial.tobaccoFree === "false" ? "true" : undefined)} options={[{value:"true", label:"Yes"}, {value:"false", label:"No"}]} />
              <FilterSelect locale={locale} name="deliveryRoute" label="Delivery route" value={initial.deliveryRoute} options={routeOptions.map(item => ({value:item, label:item.replaceAll("-", " ")}))} />
              <FilterSelect locale={locale} name="recordKind" label="Record scope" value={initial.recordKind} options={[{value:"current", label:"Current record"}, {value:"historical", label:"Historical record"}]} />
              <FilterSelect locale={locale} name="status" label="Product lifecycle" value={initial.status} options={[{value:"active", label:"Active"}, {value:"discontinued", label:"Discontinued"}, {value:"unknown", label:"Unknown"}]} />
            </div>
            <details className="advanced-filters">
              <summary>{tr(locale, "Future technical filters")} <span>＋</span></summary>
              <p>{tr(locale, "Reserved in the data model and UI for sourced product records.")}</p>
              <div className="advanced-tags">{advanced.map(item => <span key={item}>{tr(locale, item)}</span>)}</div>
            </details>
          </details>
        </div>
        <div className="filter-actions">
          <button type="button" className="clear-button" onClick={() => router.push("/products")}>{tr(locale, "Clear all")}</button>
          <button type="submit" className="button button-primary">{tr(locale, "Apply filters")}</button>
        </div>
      </form>

      <div className="results-controls">
        <div className="family-display-control"><label>{locale === "zh" ? "展示方式" : "Display"} <select value={showVariants ? "variants" : "families"} onChange={event => {
          const params = new URLSearchParams(window.location.search);
          params.set("display", event.target.value);
          navigate(params);
        }}><option value="families">{locale === "zh" ? "按款式归组" : "Group by family"}</option><option value="variants">{locale === "zh" ? "展开全部规格" : "Individual variants"}</option></select></label><span>{locale === "zh" ? `已显示 ${Math.min(limit, visibleCount)} / ${visibleCount}` : `Showing ${Math.min(limit, visibleCount)} of ${visibleCount}`}</span></div>
        <div className="controls-right">
          <label>{tr(locale, "Sort")} <select defaultValue={initial.sort ?? "name-asc"} onChange={event => {
            const params = new URLSearchParams(window.location.search);
            params.set("sort", event.target.value);
            navigate(params);
          }}><option value="name-asc">{tr(locale, "Name A–Z")}</option><option value="name-desc">{tr(locale, "Name Z–A")}</option></select></label>
          <div className="view-toggle" role="group" aria-label={tr(locale, "Result view")}>
            <button type="button" className={view === "grid" ? "selected" : ""} onClick={() => setView("grid")} aria-label={tr(locale, "Grid view")} aria-pressed={view === "grid"}><Grid2X2 size={17} /></button>
            <button type="button" className={view === "list" ? "selected" : ""} onClick={() => setView("list")} aria-label={tr(locale, "List view")} aria-pressed={view === "list"}><List size={18} /></button>
          </div>
        </div>
      </div>
      <div className="products-results">
        {result.length ? <div className={"product-grid " + (view === "list" ? "list-view" : "")}>
          {showVariants ? result.slice(0, limit).map(product => <ProductCard key={product.id} product={product} view={view} />) : families.slice(0, limit).map(family => <ProductFamilyCard key={family.id} family={family} view={view} />)}
        </div> : <EmptyState title={products.length ? "No matching products." : "No product records yet."} description={products.length ? "Try a different query or clear the filters." : "The product database framework is ready for sourced product records."} action={{label:"Explore the category taxonomy", href:"/categories"}} />}
        {limit < visibleCount && <div className="family-load-more"><button type="button" className="button button-outline" onClick={() => setLimit(value => value + 24)}>{locale === "zh" ? "显示更多" : "Show more"} · {visibleCount - limit}</button></div>}
        <div className="results-footnote">{locale === "zh" ? "同系列同口味的浓度与包装规格归组展示；每个规格保留独立来源和详情。" : "Strengths and pack sizes are grouped by family; each variant keeps its sources and detail page."} {tr(locale, "Records show product-country listing status, lifecycle and traceable sources. Database size:")} {products.length}.</div>
      </div>
    </div>
  </div>;
}
