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
      { source: "/formats/strip", destination: "/formats/film", permanent: true },
      { source: "/formats/sheet", destination: "/formats/film", permanent: true },
      { source: "/formats/candy", destination: "/formats/hard-candy", permanent: true },
      { source: "/formats/bead", destination: "/formats/bead-pellet", permanent: true },
      { source: "/formats/pearl", destination: "/formats/bead-pellet", permanent: true },
      { source: "/formats/portion", destination: "/formats", permanent: false },
      { source: "/formats/mint", destination: "/formats", permanent: false },
      { source: "/formats/loose", destination: "/formats", permanent: false },
      { source: "/formats/chew", destination: "/formats", permanent: false },
      { source: "/formats/other", destination: "/formats", permanent: false },
    ];
  },
};

export default nextConfig;
