import Link from "next/link";
import { getLocale } from "@/lib/server-locale";
import { tr } from "@/lib/i18n";
export default async function NotFound(){const locale=await getLocale();return <div className="container not-found"><span>{tr(locale,"404 / RECORD NOT FOUND")}</span><h1>{tr(locale,"This record is not in the database.")}</h1><p>{tr(locale,"No verified entry exists at this address.")}</p><Link className="button button-primary" href="/">{tr(locale,"Return home")} ↗</Link></div>}
