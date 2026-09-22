import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LanguageProvider } from "@/components/layout/language-provider";
import "./globals.css";

export const metadata: Metadata = { title: { default: "Global Oral Nicotine Product Database", template: "%s | GONPD" }, description: "A structured research framework for global oral nicotine and smokeless tobacco product data." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><LanguageProvider initialLocale="en"><Header/><main id="main-content">{children}</main><Footer/></LanguageProvider></body></html>;
}
