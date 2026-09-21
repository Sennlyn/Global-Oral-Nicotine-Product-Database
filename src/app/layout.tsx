import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LanguageProvider } from "@/components/layout/language-provider";
import { getLocale } from "@/lib/server-locale";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: { default: locale === "zh" ? "全球口腔尼古丁产品数据库" : "Global Oral Nicotine Product Database", template: "%s | GONPD" }, description: locale === "zh" ? "全球口腔尼古丁与无烟烟草产品的结构化研究数据库框架。" : "A structured research framework for global oral nicotine and smokeless tobacco product data." };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  return <html lang={locale === "zh" ? "zh-CN" : "en"}><body><LanguageProvider key={locale} initialLocale={locale}><Header/><main id="main-content">{children}</main><Footer/></LanguageProvider></body></html>;
}
