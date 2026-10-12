import type { Metadata } from "next";
import NewsPageClient from "./news-page-client";

export const metadata: Metadata = {
  title: "Product & regulatory updates | GONPD",
  description: "Browse source-linked official product announcements and regulatory updates in chronological order.",
};

export default function NewsPage() {
  return <NewsPageClient />;
}
