"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { type Locale } from "@/lib/i18n";

const LanguageContext = createContext<{ locale: Locale; changeLanguage: (locale: Locale) => void } | null>(null);

export function LanguageProvider({ initialLocale, children }: { initialLocale: Locale; children: React.ReactNode }) {
  const [locale, setLocale] = useState(initialLocale);
  useEffect(() => {
    const storedLocale = window.localStorage.getItem("gonpd-locale");
    if (storedLocale === "en" || storedLocale === "zh") setLocale(storedLocale);
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);
  function changeLanguage(next: Locale) {
    if (next === locale) return;
    window.localStorage.setItem("gonpd-locale", next);
    setLocale(next);
  }
  return <LanguageContext.Provider value={{ locale, changeLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
