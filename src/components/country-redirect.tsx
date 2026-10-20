"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { tr } from "@/lib/i18n";
import { useLanguage } from "@/components/layout/language-provider";

/** Static-host-compatible migration for bookmarks to the retired market index. */
export function CountryRedirect({ href = "/countries" }: { href?: string }) {
  const router = useRouter();
  const { locale } = useLanguage();
  useEffect(() => { router.replace(href); }, [href, router]);
  return <div className="container page-shell"><Link className="button button-primary" href={href}>{tr(locale, "Countries / regions")} ↗</Link></div>;
}
