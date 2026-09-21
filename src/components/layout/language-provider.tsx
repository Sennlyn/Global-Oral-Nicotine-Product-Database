"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { LANGUAGE_COOKIE, type Locale } from "@/lib/i18n";

const LanguageContext = createContext<{ locale: Locale; changeLanguage: (locale: Locale) => void } | null>(null);

export function LanguageProvider({ initialLocale, children }: { initialLocale: Locale; children: React.ReactNode }) {
  const [locale, setLocale] = useState(initialLocale);
  const router = useRouter();
  function changeLanguage(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LANGUAGE_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
    setLocale(next);
    router.refresh();
  }
  return <LanguageContext.Provider value={{ locale, changeLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
