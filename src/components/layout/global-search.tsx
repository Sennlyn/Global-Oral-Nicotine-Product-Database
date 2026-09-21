"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/layout/language-provider";
import { tr } from "@/lib/i18n";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { locale } = useLanguage();
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen((value) => !value); } if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, []);
  function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); router.push(`/products${query.trim() ? `?query=${encodeURIComponent(query.trim())}` : ""}`); setOpen(false); }
  return <><button type="button" className="nav-search" onClick={() => setOpen(true)} aria-label={tr(locale,"Open global search")}><Search size={17}/><span>{tr(locale,"Search")}</span><kbd>Ctrl K</kbd></button>
    {open && <div className="search-overlay" onMouseDown={() => setOpen(false)}><div className="search-dialog" role="dialog" aria-modal="true" aria-label={tr(locale,"Global search")} onMouseDown={(event) => event.stopPropagation()}><form onSubmit={submit}><Search size={21}/><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tr(locale,"Search products, brands, formats...")} aria-label={tr(locale,"Search catalog")}/><button type="button" onClick={() => setOpen(false)} aria-label={tr(locale,"Close search")}><X size={19}/></button></form><div className="search-hint">{tr(locale,"The verified product database is currently empty. Explore the taxonomy while records are prepared.")}</div><button type="button" className="search-submit" onClick={() => { router.push(`/products${query.trim() ? `?query=${encodeURIComponent(query.trim())}` : ""}`); setOpen(false); }}>{tr(locale,"Open products search")} <span>↗</span></button></div></div>}
  </>;
}
