import { cookies } from "next/headers";
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n";

export async function getLocale(): Promise<Locale> {
  return (await cookies()).get(LANGUAGE_COOKIE)?.value === "zh" ? "zh" : "en";
}
