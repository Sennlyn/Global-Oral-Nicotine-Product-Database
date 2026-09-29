"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { type Locale } from "@/lib/i18n";

const LanguageContext = createContext<{ locale: Locale; changeLanguage: (locale: Locale) => void } | null>(null);

export function LanguageProvider({ initialLocale, children }: { initialLocale: Locale; children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      window.addEventListener("gonpd-locale-change", callback);
      return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("gonpd-locale-change", callback);
      };
    },
    () => window.localStorage.getItem("gonpd-locale") === "zh" ? "zh" : "en",
    () => initialLocale,
  );
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);
  function changeLanguage(next: Locale) {
    if (next === locale) return;
    window.localStorage.setItem("gonpd-locale", next);
    window.dispatchEvent(new Event("gonpd-locale-change"));
  }
  return <LanguageContext.Provider value={{ locale, changeLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
