"use client";

import Link from "next/link";
import { tr } from "@/lib/i18n";
import { useLanguage } from "@/components/layout/language-provider";
export default function NotFound(){const { locale }=useLanguage();return <div className="container not-found"><span>{tr(locale,"404 / RECORD NOT FOUND")}</span><h1>{tr(locale,"This record is not in the database.")}</h1><p>{tr(locale,"No verified entry exists at this address.")}</p><Link className="button button-primary" href="/">{tr(locale,"Return home")} ↗</Link></div>}
