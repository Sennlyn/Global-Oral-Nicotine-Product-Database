"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProductExplorer } from "@/components/products/product-explorer";
import type { ProductQuery } from "@/lib/catalog";

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const initial = Object.fromEntries(searchParams.entries()) as ProductQuery;
  return <div className="container page-shell products-page"><Breadcrumb items={[{label:"Products"}]}/><ProductExplorer key={JSON.stringify(initial)} initial={initial}/></div>;
}

export default function ProductsPage() {
  return <Suspense><ProductsPageContent/></Suspense>;
}
