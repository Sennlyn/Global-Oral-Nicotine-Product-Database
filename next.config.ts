import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    return [
      { source: "/categories/nicotine-gum", destination: "/categories/nicotine-gum-confectionery", permanent: true },
      { source: "/categories/nicotine-candy", destination: "/categories/nicotine-gum-confectionery", permanent: true },
      { source: "/categories/nicotine-lozenges", destination: "/categories/nicotine-lozenges-solids", permanent: true },
      { source: "/categories/nicotine-tablets", destination: "/categories/nicotine-lozenges-solids", permanent: true },
      { source: "/categories/other-solid-oral-nicotine", destination: "/categories/nicotine-lozenges-solids", permanent: true },
      { source: "/categories/snus", destination: "/categories/oral-smokeless-tobacco", permanent: true },
      { source: "/categories/other-oral-smokeless-tobacco", destination: "/categories/oral-smokeless-tobacco", permanent: true },
    ];
  },
};

export default nextConfig;
