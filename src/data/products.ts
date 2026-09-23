import type { Brand, Manufacturer, Market, Product, Source } from "@/types/catalog";

const accessedAt = "2026-09-23";

function officialSource(id: string, sourceName: string, sourceUrl: string, notes?: string): Source {
  return { id, sourceName, sourceType: "official-brand", sourceUrl, accessedAt, verifiedAt: accessedAt, notes };
}

function manufacturerSource(id: string, sourceName: string, sourceUrl: string, notes?: string): Source {
  return { id, sourceName, sourceType: "manufacturer", sourceUrl, accessedAt, verifiedAt: accessedAt, notes };
}

function userProvidedSource(id: string, sourceName: string, sourceUrl?: string, notes?: string): Source {
  return { id, sourceName, sourceType: "user-provided", sourceUrl, accessedAt, notes };
}

const nicoretteManufacturerReferences: Record<string, { url: string; productName: string }> = {
  "nicorette-uk-fresh-mint-gum-2mg-105": {
    url: "https://www.medicines.org.uk/emc/files/pil.6205.pdf",
    productName: "Nicorette Freshmint 2 mg Gum",
  },
  "nicorette-uk-original-gum-2mg-105": {
    url: "https://www.medicines.org.uk/emc/files/pil.1089.pdf",
    productName: "Nicorette 2 mg Gum",
  },
  "nicorette-uk-cools-lozenge-2mg-40": {
    url: "https://www.medicines.org.uk/emc/files/pil.4110.pdf",
    productName: "Nicorette Cools 2 mg Lozenge",
  },
  "nicorette-uk-fruit-lozenge-2mg-40": {
    url: "https://www.medicines.org.uk/emc/files/pil.9438.pdf",
    productName: "Nicorette Fruit 2 mg Lozenge",
  },
  "nicorette-uk-microtab-2mg-100": {
    url: "https://www.medicines.org.uk/emc/files/pil.6182.pdf",
    productName: "Nicorette Microtab 2 mg Sublingual Tablet",
  },
};

const zynCatalogs = {
  "1.5": {
    url: "https://us.zyn.com/zyn-1-5mg-nicotine-pouches/",
    imageDirectory: "1.5mg",
    imagePrefix: "20260604_flagship_",
    imageSuffix: "-15mg-15p_straight.png",
    filePrefix: "zyn-us-20260604-flagship-",
  },
  "3": {
    url: "https://us.zyn.com/zyn-3mg-nicotine-pouches/",
    imageDirectory: "3mg-and-6mg",
    imagePrefix: "zyn_",
    imageSuffix: "_3_straight_bright.png",
    filePrefix: "zyn-us-",
  },
  "6": {
    url: "https://us.zyn.com/zyn-6mg-nicotine-pouches/",
    imageDirectory: "3mg-and-6mg",
    imagePrefix: "zyn_",
    imageSuffix: "_6_straight_bright.png",
    filePrefix: "zyn-us-",
  },
} as const;

const zynFlavors = [
  { name: "Cool Mint", key: "coolmint", imageKey: "coolmint", flavorCategory: "mint" },
  { name: "Peppermint", key: "peppermint", imageKey: "peppermint", flavorCategory: "mint" },
  { name: "Wintergreen", key: "wintergreen", imageKey: "wintergreen", flavorCategory: "mint" },
  { name: "Spearmint", key: "spearmint", imageKey: "spearmint", flavorCategory: "mint" },
  { name: "Cinnamon", key: "cinnamon", imageKey: "cinnamon", flavorCategory: "spice" },
  { name: "Coffee", key: "coffee", imageKey: "coffee", flavorCategory: "coffee" },
  { name: "Citrus", key: "citrus", imageKey: "citrus", flavorCategory: "citrus" },
  { name: "Menthol", key: "menthol", imageKey: "menthol", flavorCategory: "mint" },
  { name: "Smooth", key: "smooth", imageKey: "smooth", flavorCategory: "unflavored" },
  { name: "Chill", key: "chill", imageKey: "chill", flavorCategory: "unflavored" },
  { name: "Black Cherry", key: "black-cherry", imageKey: "blk-cherry", sourceKey: "blk_cherry", newLaunch: true, flavorCategory: "fruit" },
  { name: "Peach", key: "peach", imageKey: "peach", sourceKey: "peach", newLaunch: true, flavorCategory: "fruit" },
  { name: "Dragonberry", key: "dragonberry", imageKey: "dragon-berry", sourceKey: "dragon_berry", newLaunch: true, flavorCategory: "fruit" },
] as const;

const lowStrengthZynFlavors = zynFlavors.slice(0, 10);

function makeZynProduct(
  flavor: (typeof zynFlavors)[number],
  strength: 1.5 | 3 | 6,
): Product {
  const catalog = zynCatalogs[String(strength) as keyof typeof zynCatalogs];
  const slug = `zyn-us-${flavor.key}-${String(strength).replace(".", "-")}mg`;
  const imageAsset = strength === 1.5
    ? `${catalog.imagePrefix}${flavor.imageKey}${catalog.imageSuffix}`
    : `${catalog.imagePrefix}${"sourceKey" in flavor ? flavor.sourceKey : flavor.imageKey}${catalog.imageSuffix}`;
  const imageDirectory = strength !== 1.5 && "newLaunch" in flavor && flavor.newLaunch
    ? "2026-new-flavors-launch"
    : catalog.imageDirectory;
  const imageSourceUrl = `https://us.zyn.com/globalassets/products/${imageDirectory}/${imageAsset}?width=${strength === 6 && ["citrus", "coffee", "peach", "dragon-berry"].includes(flavor.imageKey) ? 600 : 945}`;
  const imageFile = strength === 1.5
    ? `${catalog.filePrefix}${flavor.imageKey}-1.5mg.png`
    : `${catalog.filePrefix}${flavor.imageKey}-${strength}mg.png`;
  const officialName = `ZYN ${flavor.name} ${strength} mg`;
  const listingSource = officialSource(
    "official-catalog",
    "ZYN U.S. official product catalog",
    catalog.url,
    `Official catalog names ${officialName}; the product image is matched to the flavor and strength shown in the catalog. / 官方目录列出该口味与强度；图片文件与目录中的对应包装相匹配。`,
  );
  const detailsSource = officialSource(
    "official-product-details",
    "ZYN U.S. official product information / FAQ",
    "https://us.zyn.com/questions/",
    "The official FAQ documents nicotine salt form and other product-level details. / 官网 FAQ 记录尼古丁盐形式及其他产品信息。",
  );
  const imageSource = officialSource(
    "official-product-image",
    "ZYN U.S. official package image",
    imageSourceUrl,
    `Official package image for ${officialName}. / ${officialName} 的官方包装图。`,
  );

  return {
    id: slug,
    slug,
    productName: officialName,
    brandId: "zyn",
    categoryId: "nicotine-pouches",
    formatId: "pouch",
    markets: ["united-states"],
    status: "active",
    shortDescription: `${strength} mg of nicotine per pouch; 15 pouches per can.`,
    localizedShortDescription: {
      en: `${strength} mg of nicotine per pouch; 15 pouches per can.`,
      zh: `每袋含尼古丁 ${strength} 毫克；每罐 15 袋。`,
    },
    productImage: `/products/${imageFile}`,
    imageSource,
    officialWebsite: catalog.url,
    flavor: { name: flavor.name, category: flavor.flavorCategory },
    nicotine: {
      nicotineStrength: `${strength} mg per pouch`,
      nicotineStrengthMg: strength,
      nicotinePerUnit: strength,
      nicotineForm: "Nicotine bitartrate dihydrate",
    },
    deliveryRoute: ["gingival", "buccal"],
    productTechnology: ["pouch-matrix"],
    specifications: { kind: "pouch", portionsPerCan: 15 },
    sources: [listingSource, detailsSource],
    verificationStatus: "verified",
    lastVerified: accessedAt,
  };
}

const zynProducts: Product[] = [
  ...lowStrengthZynFlavors.map((flavor) => makeZynProduct(flavor, 1.5)),
  ...zynFlavors.map((flavor) => makeZynProduct(flavor, 3)),
  ...zynFlavors.map((flavor) => makeZynProduct(flavor, 6)),
];

const zynUltraFlavors = [
  { name: "Citrus Zest", key: "citrus-zest", flavorCategory: "citrus", image9: "57fe6165-5dc7-46c1-9c48-641d53b15819", image11: "2f83b0e3-925b-458e-9b4e-fb8f5c176089" },
  { name: "Peppermint Frost", key: "peppermint-frost", flavorCategory: "mint", image9: "700b90a9-ed15-4b46-bc6f-79f7135fefde", image11: "76bc076f-d4d3-44c4-a55e-faca693bcd88" },
  { name: "Wintergreen Blast", key: "wintergreen-blast", flavorCategory: "mint", image9: "07eb0d55-d012-486e-9af4-2c2b65b4626f", image11: "4b2444b8-d41b-44ae-8a13-a0e9f1b38185" },
  { name: "Arctic Mint", key: "arctic-mint", flavorCategory: "mint", image9: "2049176c-255f-4f79-a1dd-698659674b39", image11: "8f454ce2-1a2c-42c1-ad3b-c31536456fa2" },
  { name: "Fresh Spearmint", key: "fresh-spearmint", flavorCategory: "mint", image9: "d6da6d2c-c4b2-4c1f-b0a5-46da368febb5", image11: "4cf2fc9f-8761-4ff3-a57f-18c6a0a9f0bd" },
  { name: "Menthol Ice", key: "menthol-ice", flavorCategory: "mint", image9: "77c80ec4-86dd-4ca1-82db-51b92d624e52", image11: "34438d83-5ccc-4dab-bbfc-72cfeab9edd6" },
  { name: "Chill Mist", key: "chill-mist", flavorCategory: "unflavored", image9: "ce728eae-51f6-4022-bad9-764d203acde9", image11: "f9372931-d169-4ae4-8591-6c795da47102" },
  { name: "Signature Smooth", key: "signature-smooth", flavorCategory: "unflavored", image9: "6cdfe668-a48d-44ca-89b8-c2dc29dda73b", image11: "02cf6585-d95e-4ddc-b31e-4e2dee1642d1" },
] as const;

const zynUltraProducts: Product[] = zynUltraFlavors.flatMap((flavor) => [9, 11].map((strength) => {
  const slug = "zyn-us-ultra-" + flavor.key + "-" + strength + "mg";
  const officialWebsite = "https://us.zyn.com/all-products/zyn-ultra-" + flavor.key + "/";
  const imageId = strength === 9 ? flavor.image9 : flavor.image11;
  const imageSourceUrl = "https://smpmi.cdn-norce.tech/" + imageId + ".png?w=500";
  const officialName = "ZYN Ultra " + flavor.name + " " + strength + " mg";

  return {
    id: slug,
    slug,
    productName: officialName,
    brandId: "zyn",
    categoryId: "nicotine-pouches",
    formatId: "pouch",
    markets: ["united-states"],
    status: "active",
    shortDescription: strength + " mg nicotine per pouch; 20 pouches per can.",
    localizedShortDescription: {
      en: strength + " mg nicotine per pouch; 20 pouches per can. Hydro-boosted pouch format.",
      zh: "每袋含尼古丁 " + strength + " 毫克；每罐 20 袋。水分增强型袋装。",
    },
    productImage: "/products/" + slug + ".png",
    imageSource: officialSource(
      "official-product-image",
      "ZYN U.S. official package image",
      imageSourceUrl,
      "The image file is the official front-of-can package image for " + officialName + ". / 图片为 " + officialName + " 的官网罐装正面图。",
    ),
    officialWebsite,
    flavor: { name: flavor.name, category: flavor.flavorCategory },
    nicotine: {
      nicotineStrength: strength + " mg per pouch",
      nicotineStrengthMg: strength,
      nicotinePerUnit: strength,
      nicotineForm: "Nicotine bitartrate dihydrate",
    },
    containsTobacco: false,
    tobaccoFree: true,
    deliveryRoute: ["gingival", "buccal"],
    productTechnology: ["pouch-matrix"],
    specifications: { kind: "pouch", portionsPerCan: 20 },
    sources: [
      officialSource(
        "official-ultra-product-page",
        "ZYN U.S. official product page",
        officialWebsite,
        "The page lists this flavor in 9 mg and 11 mg strengths and states 20 pouches per can. / 页面列出该口味的 9 毫克和 11 毫克规格，并说明每罐 20 袋。",
      ),
      officialSource(
        "official-ultra-faq",
        "ZYN U.S. official ZYN Ultra FAQ",
        "https://us.zyn.com/zyn-ultra-11mg-nicotine-pouches/",
        "The FAQ confirms ZYN Ultra's hydro-boosted pouch format, 20 pouches per can, nicotine salt and production in Kentucky, U.S. and Sweden. / FAQ 确认 ZYN Ultra 为水分增强型袋装、每罐 20 袋、使用尼古丁盐，生产地包括美国肯塔基州和瑞典。",
      ),
    ],
    verificationStatus: "verified",
    lastVerified: accessedAt,
  } satisfies Product;
}));

const zynSwissProducts: Product[] = [
  {
    id: "zyn-ch-switzerland-cool-mint-mini-3mg",
    slug: "zyn-ch-switzerland-cool-mint-mini-3mg",
    productName: "ZYN Cool Mint Mini 3 mg",
    brandId: "zyn",
    categoryId: "nicotine-pouches",
    formatId: "pouch",
    markets: ["switzerland"],
    status: "active",
    localizedShortDescription: {
      en: "Mini-format tobacco-free nicotine pouch; 3 mg per pouch, about 20 pouches per can.",
      zh: "迷你型无烟草尼古丁袋；每袋 3 毫克，每罐约 20 袋。",
    },
    productImage: "/products/zyn-ch-switzerland-cool-mint-mini-3mg.png",
    imageSource: officialSource("official-product-image", "ZYN Switzerland official product image", "https://www.zyn.com/on/demandware.static/-/Sites-CH_Master_Catalog/default/dw92da400d/images/RITM0224839/Cool_Mint_Mini-3_MG/Large/ZYN_CH_3-1_MINI_Cool-Mint_3mg_Front_800x800.png", "The official Swiss product page labels this package Cool Mint Mini 3 mg. / 瑞士官网商品页将此包装标注为 Cool Mint Mini 3 mg。"),
    officialWebsite: "https://www.zyn.com/ch/de/shop/zyn/NP001256.00-PCE-CH.html",
    flavor: { name: "Cool Mint", category: "mint" },
    nicotine: { nicotineStrength: "3 mg per pouch", nicotineStrengthMg: 3, nicotinePerUnit: 3 },
    containsTobacco: false,
    tobaccoFree: true,
    deliveryRoute: ["gingival", "buccal"],
    productTechnology: ["pouch-matrix"],
    specifications: { kind: "pouch", portionsPerCan: 20, pouchSize: "Mini" },
    sources: [
      officialSource("official-product-page", "ZYN Switzerland official product page", "https://www.zyn.com/ch/de/shop/zyn/NP001256.00-PCE-CH.html", "The page lists Cool Mint Mini 3 mg and states that a can contains an average of 20 pouches. / 页面列出 Cool Mint Mini 3 mg，并说明每罐平均含 20 袋。"),
      officialSource("official-product-faq", "ZYN Switzerland official product FAQ", "https://www.zyn.com/ch/de/faq/nikotinbeutel-zyn", "The FAQ states that ZYN pouches contain no tobacco. / 官网 FAQ 说明 ZYN 袋不含烟草。"),
    ],
    verificationStatus: "verified",
    lastVerified: accessedAt,
  },
];

const nicoretteProducts: Product[] = [
  {
    id: "nicorette-uk-fresh-mint-gum-2mg-105",
    slug: "nicorette-uk-fresh-mint-gum-2mg-105",
    productName: "Nicorette Fresh Mint Gum 2 mg (105 pieces)",
    brandId: "nicorette",
    categoryId: "nicotine-gum-confectionery",
    formatId: "gum",
    markets: ["united-kingdom"],
    status: "active",
    localizedShortDescription: { en: "Medicinal nicotine gum; 2 mg per piece, 105 pieces.", zh: "英国市场的药用尼古丁口香糖；每片 2 毫克，每盒 105 片。" },
    productImage: "/products/nicorette-uk-fresh-mint-gum-2mg-105.webp",
    imageSource: officialSource("official-product-image", "Nicorette U.K. official product image", "https://images.ctfassets.net/gx4uyacaj0xz/4XQXbRVPl3Vy09ieh2FYuM/79815a465b1071772dd73fd907288ec2/NIC_EU_UK_5010123717841_90720901_458607_GUM_FRSHMNT_2MG_105ct_000_TIF.WEBP", "The package image is for Fresh Mint Gum, 2 mg, 105 pieces. / 对应 Fresh Mint 2 毫克、105 片装。"),
    officialWebsite: "https://www.nicorette.co.uk/products/nicorette-gum-fresh-mint-2mg-105",
    flavor: { name: "Fresh Mint", category: "mint" },
    nicotine: { nicotineStrength: "2 mg per piece", nicotineStrengthMg: 2, nicotinePerUnit: 2 },
    deliveryRoute: ["chewing", "oral-mucosal"],
    productTechnology: ["gum-base"],
    specifications: { kind: "gum", piecesPerPack: 105 },
    sources: [officialSource("official-product-page", "Nicorette U.K. official product page", "https://www.nicorette.co.uk/products/nicorette-gum-fresh-mint-2mg-105", "Product name, nicotine strength, format and 105-piece pack are listed on the product page. / 产品页列明名称、强度、剂型和 105 片装。")],
    verificationStatus: "verified",
    lastVerified: accessedAt,
  },
  {
    id: "nicorette-uk-original-gum-2mg-105",
    slug: "nicorette-uk-original-gum-2mg-105",
    productName: "Nicorette Original Gum 2 mg (105 pieces)",
    brandId: "nicorette",
    categoryId: "nicotine-gum-confectionery",
    formatId: "gum",
    markets: ["united-kingdom"],
    status: "active",
    localizedShortDescription: { en: "Medicinal nicotine gum; 2 mg per piece, 105 pieces.", zh: "英国市场的药用尼古丁口香糖；每片 2 毫克，每盒 105 片。" },
    productImage: "/products/nicorette-uk-original-gum-2mg-105.webp",
    imageSource: officialSource("official-product-image", "Nicorette U.K. official product image", "https://images.ctfassets.net/gx4uyacaj0xz/3nZ7CT0phjSgWxrYdGt0f4/234a3794d69da8a6871f140048e500a3/NIC_EMEA_UK_3574660413052_90691301_GUM_CLASSIC_2MG_105ct_000_TIF.WEBP", "The package image is for Original Gum, 2 mg, 105 pieces. / 对应 Original 2 毫克、105 片装。"),
    officialWebsite: "https://www.nicorette.co.uk/products/nicorette-gum-original-2mg-105",
    flavor: { name: "Original", category: "original" },
    nicotine: { nicotineStrength: "2 mg per piece", nicotineStrengthMg: 2, nicotinePerUnit: 2 },
    deliveryRoute: ["chewing", "oral-mucosal"],
    productTechnology: ["gum-base"],
    specifications: { kind: "gum", piecesPerPack: 105 },
    sources: [officialSource("official-product-page", "Nicorette U.K. official product page", "https://www.nicorette.co.uk/products/nicorette-gum-original-2mg-105", "Product name, nicotine strength, format and 105-piece pack are listed on the product page. / 产品页列明名称、强度、剂型和 105 片装。")],
    verificationStatus: "verified",
    lastVerified: accessedAt,
  },
  {
    id: "nicorette-uk-cools-lozenge-2mg-40",
    slug: "nicorette-uk-cools-lozenge-2mg-40",
    productName: "Nicorette Cools Icy Mint Lozenge 2 mg (40 pieces)",
    brandId: "nicorette",
    categoryId: "nicotine-lozenges-solids",
    formatId: "lozenge",
    markets: ["united-kingdom"],
    status: "active",
    localizedShortDescription: { en: "Medicinal nicotine lozenge; 2 mg per lozenge, 40 pieces.", zh: "英国市场的药用尼古丁含片；每片 2 毫克，每盒 40 片。" },
    productImage: "/products/nicorette-uk-cools-lozenge-2mg-40.webp",
    imageSource: officialSource("official-product-image", "Nicorette U.K. official product image", "https://images.ctfassets.net/gx4uyacaj0xz/QHLPYmTclK81zMbIDfuke/70a59e954960f0b6e314b000dc7fcdc8/NIC_EU_UK_3574661775128_90717000_495001_CO_LOZENGE_MINT_2MG_40ct_000_TIF.WEBP", "The package image is for Cools Icy Mint Lozenge, 2 mg, 40 pieces. / 对应 Cools Icy Mint 2 毫克、40 片装。"),
    officialWebsite: "https://www.nicorette.co.uk/products/nicorette-lozenge-icy-white-2mg-40",
    flavor: { name: "Icy Mint", category: "mint" },
    nicotine: { nicotineStrength: "2 mg per lozenge", nicotineStrengthMg: 2, nicotinePerUnit: 2 },
    deliveryRoute: ["oral-dissolution", "oral-mucosal"],
    productTechnology: ["lozenge-matrix"],
    specifications: { kind: "lozenge", piecesPerPack: 40 },
    sources: [officialSource("official-product-page", "Nicorette U.K. official product page", "https://www.nicorette.co.uk/products/nicorette-lozenge-icy-white-2mg-40", "Product page identifies the 2 mg Cools Icy Mint lozenge and 40-piece pack. / 产品页列明 2 毫克 Cools Icy Mint 含片及 40 片装。")],
    verificationStatus: "verified",
    lastVerified: accessedAt,
  },
  {
    id: "nicorette-uk-fruit-lozenge-2mg-40",
    slug: "nicorette-uk-fruit-lozenge-2mg-40",
    productName: "Nicorette Fruit Lozenge 2 mg (40 pieces)",
    brandId: "nicorette",
    categoryId: "nicotine-lozenges-solids",
    formatId: "lozenge",
    markets: ["united-kingdom"],
    status: "active",
    localizedShortDescription: { en: "Medicinal nicotine lozenge; 2 mg per lozenge, 40 pieces.", zh: "英国市场的药用尼古丁含片；每片 2 毫克，每盒 40 片。" },
    productImage: "/products/nicorette-uk-fruit-lozenge-2mg-40.png",
    imageSource: officialSource("official-product-image", "Nicorette U.K. official product image", "https://images.ctfassets.net/gx4uyacaj0xz/5EdQtfiKU66sXoVuiO4NpC/3880a2c6d49a781ce1b2110a396b863f/Lozenge_2mg_Fruit_40ct_GB-removebg-preview.png", "The package image is for Fruit Lozenge, 2 mg, 40 pieces. / 对应 Fruit 2 毫克、40 片装。"),
    officialWebsite: "https://www.nicorette.co.uk/products/nicorette-lozenge-fruit-2mg-40",
    flavor: { name: "Fruit", category: "fruit" },
    nicotine: { nicotineStrength: "2 mg per lozenge", nicotineStrengthMg: 2, nicotinePerUnit: 2 },
    deliveryRoute: ["oral-dissolution", "oral-mucosal"],
    productTechnology: ["lozenge-matrix"],
    specifications: { kind: "lozenge", piecesPerPack: 40 },
    sources: [officialSource("official-product-page", "Nicorette U.K. official product page", "https://www.nicorette.co.uk/products/nicorette-lozenge-fruit-2mg-40", "Product page identifies the 2 mg Fruit lozenge and 40-piece pack. / 产品页列明 2 毫克 Fruit 含片及 40 片装。")],
    verificationStatus: "verified",
    lastVerified: accessedAt,
  },
  {
    id: "nicorette-uk-microtab-2mg-100",
    slug: "nicorette-uk-microtab-2mg-100",
    productName: "Nicorette Microtab Sublingual Tablet 2 mg (100 tablets)",
    brandId: "nicorette",
    categoryId: "nicotine-lozenges-solids",
    formatId: "tablet",
    markets: ["united-kingdom"],
    status: "active",
    localizedShortDescription: { en: "Medicinal sublingual nicotine tablet; 2 mg per tablet, 100 tablets.", zh: "英国市场的药用舌下尼古丁片；每片 2 毫克，每盒 100 片。" },
    productImage: "/products/nicorette-uk-microtab-2mg-100.webp",
    imageSource: officialSource("official-product-image", "Nicorette U.K. official product image", "https://images.ctfassets.net/gx4uyacaj0xz/4Q24qsaKKDyLHz77SJgOYH/4bae4e9302aca935af191b202b3abb21/441310_Nicorette_Microtab_2mg_100CT_PNG.WEBP", "The package image is for Microtab 2 mg, 100 tablets. / 对应 Microtab 2 毫克、100 片装。"),
    officialWebsite: "https://www.nicorette.co.uk/products/nicorette-microtab-2mg-100",
    nicotine: { nicotineStrength: "2 mg per tablet", nicotineStrengthMg: 2, nicotinePerUnit: 2 },
    deliveryRoute: ["sublingual", "oral-dissolution"],
    productTechnology: ["compressed-tablet"],
    specifications: { kind: "tablet" },
    sources: [officialSource("official-product-page", "Nicorette U.K. official product page", "https://www.nicorette.co.uk/products/nicorette-microtab-2mg-100", "Product page identifies a 2 mg sublingual tablet and the 100-tablet pack. / 产品页列明 2 毫克舌下片及 100 片装。")],
    verificationStatus: "verified",
    lastVerified: accessedAt,
  },
];

const veloProducts: Product[] = [
  {
    id: "velo-uk-smooth-papaya-8mg",
    slug: "velo-uk-smooth-papaya-8mg",
    productName: "VELO Smooth Papaya 8 mg",
    brandId: "velo",
    categoryId: "nicotine-pouches",
    formatId: "pouch",
    markets: ["united-kingdom"],
    status: "active",
    localizedShortDescription: { en: "Slim nicotine pouch; 8 mg nicotine per pouch, 20 pouches per can.", zh: "纤细型尼古丁袋；每袋含尼古丁 8 毫克，每罐 20 袋。" },
    productImage: "/products/velo-uk-smooth-papaya-8mg.jpg",
    imageSource: officialSource("official-product-image", "VELO U.K. official product image", "https://gb.velo.com/cdn/shop/files/Gallery01_47a2414f-4f39-401b-acd3-6bedb5a37768.jpg?height=1000&v=1784725269&width=1000", "The official product page identifies this image as VELO Smooth Papaya. / VELO 官方商品页将此图片标注为 Smooth Papaya。"),
    officialWebsite: "https://www.velo.com/en-gb/products/smooth-papaya",
    flavor: { name: "Smooth Papaya", category: "fruit" },
    nicotine: { nicotineStrength: "8 mg per pouch", nicotineStrengthMg: 8, nicotinePerUnit: 8 },
    tobaccoFree: true,
    deliveryRoute: ["gingival", "buccal"],
    productTechnology: ["pouch-matrix"],
    specifications: { kind: "pouch", portionsPerCan: 20, pouchSize: "Slim" },
    sources: [officialSource("official-product-page", "VELO U.K. official product page", "https://www.velo.com/en-gb/products/smooth-papaya", "The product page identifies Smooth Papaya, 8 mg, and Slim format. The official FAQ specifies 20 pouches for Slim cans. / 商品页列明 Smooth Papaya、8 毫克和 Slim 袋型；官网 FAQ 说明 Slim 罐装为 20 袋。")],
    verificationStatus: "verified",
    lastVerified: accessedAt,
  },
];

const swedishSnusProducts: Product[] = [
  {
    id: "general-sweden-white-portion",
    slug: "general-sweden-white-portion",
    productName: "General White Portion",
    brandId: "general",
    categoryId: "oral-smokeless-tobacco",
    formatId: "pouch",
    markets: ["sweden"],
    status: "active",
    localizedShortDescription: { en: "White-portion oral smokeless tobacco; 24 portions per can, 21.6 g net weight.", zh: "白色袋装口腔烟草；每罐 24 份，净重 21.6 克。" },
    productImage: "/products/general-sweden-white-portion.webp",
    imageSource: officialSource("official-product-image", "Swedish Match official product image", "https://swm-nordics.cdn-norce.tech/a924c956-45b8-4ec9-97fa-9155781b423b.jpg?f=webp&h=900&q=90&w=900", "The image is labeled General White Portion on the official Swedish Match product page. / Swedish Match 官方商品页将图片标注为 General White Portion。"),
    officialWebsite: "https://www.swedishmatch.se/kop-snus/general/general-white-portion-v105904/",
    flavor: { name: "Tobacco-like, Bergamot", category: "tobacco and citrus" },
    containsTobacco: true,
    tobaccoFree: false,
    deliveryRoute: ["gingival", "buccal"],
    productTechnology: ["tobacco-matrix"],
    specifications: { kind: "tobacco", portionsPerCan: 24, netWeightG: 21.6, moisture: "53.4%", ph: 8.6, tobaccoType: "Snus", format: "White Portion" },
    sources: [officialSource("official-product-page", "Swedish Match official product page", "https://www.swedishmatch.se/kop-snus/general/general-white-portion-v105904/", "The page lists General White Portion, 24 portions, net weight 21.6 g, moisture 53.4%, pH 8.6, tobacco-containing ingredients, and current online availability. / 页面列明 General White Portion、每罐 24 份、净重 21.6 克、水分 53.4%、pH 8.6、含烟草成分及当前在线库存状态。")],
    verificationStatus: "verified",
    lastVerified: accessedAt,
  },
  {
    id: "grov-sweden-original-portion",
    slug: "grov-sweden-original-portion",
    productName: "Grov Original Portion",
    brandId: "grov",
    categoryId: "oral-smokeless-tobacco",
    formatId: "pouch",
    markets: ["sweden"],
    status: "active",
    localizedShortDescription: { en: "Original-portion oral tobacco; 24 portions per can, 24 g net weight.", zh: "原味袋装口腔烟草；每罐 24 份，净重 24 克。" },
    productImage: "/products/grov-sweden-original-portion.webp",
    imageSource: officialSource("official-product-image", "Swedish Match official product image", "https://swm-nordics.cdn-norce.tech/87998bdd-4441-4bfd-b5d8-5f291ba28982.jpg?f=webp&h=900&q=90&w=900", "The image is labeled Grov Original Portion on the official Swedish Match product page. / Swedish Match 官方商品页将图片标注为 Grov Original Portion。"),
    officialWebsite: "https://www.swedishmatch.se/kop-snus/grov/grov-original-portion/",
    flavor: { name: "Tobacco-like, floral", category: "tobacco and floral" },
    nicotine: { nicotineStrength: "Normal" },
    containsTobacco: true,
    tobaccoFree: false,
    deliveryRoute: ["gingival", "buccal"],
    productTechnology: ["tobacco-matrix"],
    specifications: { kind: "tobacco", portionsPerCan: 24, netWeightG: 24, ph: 8.6, moisture: "49%", tobaccoType: "Snus", format: "Original Portion" },
    sources: [officialSource("official-product-page", "Swedish Match official product page", "https://www.swedishmatch.se/kop-snus/grov/grov-original-portion/", "The page identifies the product, Normal strength class, Original Portion format, 24 portions, 24 g net weight, pH 8.6, 49% moisture and tobacco-containing ingredients. / 页面列明产品名称、Normal 强度等级、Original Portion 袋型、每罐 24 份、净重 24 克、pH 8.6、水分 49% 及含烟草成分。")],
    verificationStatus: "verified",
    lastVerified: accessedAt,
  },
  {
    id: "kaliber-sweden-original-portion",
    slug: "kaliber-sweden-original-portion",
    productName: "Kaliber Original Portion",
    brandId: "kaliber",
    categoryId: "oral-smokeless-tobacco",
    formatId: "pouch",
    markets: ["sweden"],
    status: "active",
    localizedShortDescription: { en: "Original-portion oral tobacco; 20 portions per can, 18 g net weight.", zh: "原味袋装口腔烟草；每罐 20 份，净重 18 克。" },
    productImage: "/products/kaliber-sweden-original-portion.webp",
    imageSource: officialSource("official-product-image", "Swedish Match official product image", "https://swm-nordics.cdn-norce.tech/a7e96047-7e82-415b-93e1-e380bcddf9c6.jpg?f=webp&h=900&q=90&w=900", "The image is labeled Kaliber Original Portion on the official Swedish Match product page. / Swedish Match 官方商品页将图片标注为 Kaliber Original Portion。"),
    officialWebsite: "https://www.swedishmatch.se/kop-snus/kaliber/kaliber-original-portion/",
    flavor: { name: "Tobacco-like, herbs and citrus", category: "tobacco and herbs" },
    nicotine: { nicotineStrength: "Normal" },
    containsTobacco: true,
    tobaccoFree: false,
    deliveryRoute: ["gingival", "buccal"],
    productTechnology: ["tobacco-matrix"],
    specifications: { kind: "tobacco", portionsPerCan: 20, netWeightG: 18, ph: 8.6, moisture: "48.5%", tobaccoType: "Snus", format: "Original Portion" },
    sources: [officialSource("official-product-page", "Swedish Match official product page", "https://www.swedishmatch.se/kop-snus/kaliber/kaliber-original-portion/", "The page identifies the product, Normal strength class, Original Portion format, 20 portions, 18 g net weight, pH 8.6, 48.5% moisture and tobacco-containing ingredients. / 页面列明产品名称、Normal 强度等级、Original Portion 袋型、每罐 20 份、净重 18 克、pH 8.6、水分 48.5% 及含烟草成分。")],
    verificationStatus: "verified",
    lastVerified: accessedAt,
  },
  {
    id: "kapten-sweden-original-portion",
    slug: "kapten-sweden-original-portion",
    productName: "Kapten Original Portion",
    brandId: "kapten",
    categoryId: "oral-smokeless-tobacco",
    formatId: "pouch",
    markets: ["sweden"],
    status: "active",
    localizedShortDescription: { en: "Original-portion oral tobacco; 20 portions per can, 18 g net weight.", zh: "原味袋装口腔烟草；每罐 20 份，净重 18 克。" },
    productImage: "/products/kapten-sweden-original-portion.webp",
    imageSource: officialSource("official-product-image", "Swedish Match official product image", "https://swm-nordics.cdn-norce.tech/959df8b6-83fd-4fd7-a8e5-f24c5161bc7a.jpg?f=webp&h=900&q=90&w=900", "The image is labeled Kapten Original Portion on the official Swedish Match product page. / Swedish Match 官方商品页将图片标注为 Kapten Original Portion。"),
    officialWebsite: "https://www.swedishmatch.se/kop-snus/kapten/kapten-original-portion/",
    flavor: { name: "Tobacco-like, bergamot", category: "tobacco and citrus" },
    nicotine: { nicotineStrength: "Normal" },
    containsTobacco: true,
    tobaccoFree: false,
    deliveryRoute: ["gingival", "buccal"],
    productTechnology: ["tobacco-matrix"],
    specifications: { kind: "tobacco", portionsPerCan: 20, netWeightG: 18, ph: 8.5, moisture: "48.5%", tobaccoType: "Snus", format: "Original Portion" },
    sources: [officialSource("official-product-page", "Swedish Match official product page", "https://www.swedishmatch.se/kop-snus/kapten/kapten-original-portion/", "The page identifies the product, Normal strength class, Original Portion format, 20 portions, 18 g net weight, pH 8.5, 48.5% moisture and tobacco-containing ingredients. / 页面列明产品名称、Normal 强度等级、Original Portion 袋型、每罐 20 份、净重 18 克、pH 8.5、水分 48.5% 及含烟草成分。")],
    verificationStatus: "verified",
    lastVerified: accessedAt,
  },
];

const huabaoContextSource = officialSource(
  "huabao-oral-tobacco-rd-context",
  "Huabao 2026 technology projects article",
  "https://www.hbglobal.com/news-graphics/591.html",
  "Huabao says it is advancing oral-tobacco formulation, release-mechanism and controlled-release-carrier research. This article does not name NF1.0, NF2.0/AERO or MO and does not verify their specifications, commercial status, or manufacturer attribution. | 中文：华宝公开资料提到口含烟制剂、释放机理及控释载体研究，但未提及 NF1.0、NF2.0/AERO 或 MO，也未核实这些产品的规格、上市状态或制造商归属。",
);

const huabaoProducts: Product[] = [
  {
    id: "huabao-incootine-nf1-oral-film",
    slug: "huabao-incootine-nf1-oral-film",
    productName: "INCOOTINE NF1.0 Oral Nicotine Film",
    brandId: "incootine",
    series: "NF1.0",
    categoryId: "nicotine-films",
    subcategory: "Oral Film",
    formatId: "film",
    physicalFormDetails: { shape: "sheet", unitization: "pre-portioned" },
    manufacturerId: "huabao-research-institute-reported",
    markets: [],
    status: "unknown",
    shortDescription: "Project-owner-described as a single gel film sheet; product image and product-level specifications have not been independently verified.",
    localizedShortDescription: {
      en: "Project-owner-described as a single gel film sheet; product image and product-level specifications have not been independently verified.",
      zh: "据项目提供者描述，为一张凝胶膜片；对应实物图及产品级规格尚未独立核实。",
    },
    sources: [
      userProvidedSource("nf1-owner-description", "Project-owner-provided NF1.0 product description", undefined, "The project owner describes NF1.0 as a single oral gel film sheet. Nicotine strength, film composition, dimensions, release behavior, product availability, and exact manufacturer remain unverified. | 中文：项目提供者描述 NF1.0 为一张口含凝胶膜片；尼古丁强度、膜片组成与尺寸、释放特性、产品供应情况及具体制造商仍待核实。"),
      huabaoContextSource,
    ],
    verificationStatus: "pending",
    specifications: { kind: "film", filmMaterial: "Gel film (project-owner description; composition unverified) | 中文：凝胶膜（据项目提供者描述；具体组成待核实）" },
  },
  {
    id: "huabao-incootine-nf2-aero-pouch",
    slug: "huabao-incootine-nf2-aero-pouch",
    productName: "INCOOTINE AERO Pouch (NF2.0)",
    brandId: "incootine",
    series: "NF2.0 / AERO",
    categoryId: "nicotine-pouches",
    formatId: "pouch",
    physicalFormDetails: { shape: "other", unitization: "pre-portioned" },
    manufacturerId: "huabao-research-institute-reported",
    markets: [],
    status: "unknown",
    shortDescription: "Described as a gel film sheet covered by nonwoven fabric; the supplied infographic depicts the layered construction but is not retail-packaging photography.",
    localizedShortDescription: {
      en: "Described as a gel film sheet covered by nonwoven fabric; the supplied infographic depicts the layered construction but is not retail-packaging photography.",
      zh: "据描述，以无纺布覆盖凝胶薄片；所附说明图展示了层状结构，但不是零售包装实拍图。",
    },
    productImage: "/products/huabao-incootine-aero-pouch-infographic.png",
    imageSource: userProvidedSource("aero-infographic-image", "Project-owner-supplied INCOOTINE AERO Pouch infographic", "/products/huabao-incootine-aero-pouch-infographic.png", "Infographic, not a retail pack photo. It depicts nonwoven fabric / nicotine film / nonwoven fabric. Example strengths and flavours on the image are not treated as verified variants. | 中文：说明图，并非零售包装实拍；图示结构为无纺布／尼古丁膜／无纺布。图中强度与口味示例未作为已核实规格录入。"),
    sources: [
      userProvidedSource("aero-owner-description", "Project-owner-provided NF2.0 / AERO product description", undefined, "The project owner describes NF2.0, also called AERO, as a gel film sheet covered by nonwoven fabric. | 中文：项目提供者描述 NF2.0（又称 AERO）为以无纺布覆盖凝胶薄片的口含薄膜袋。"),
      userProvidedSource("aero-infographic", "Project-owner-supplied INCOOTINE AERO Pouch infographic", "/products/huabao-incootine-aero-pouch-infographic.png", "The infographic labels the product AERO Pouch and depicts the layered structure. Example flavour and strength lists are incomplete marketing claims and have not been independently verified. | 中文：说明图标注 AERO Pouch 并展示层状结构；图中的口味和强度示例为不完整宣传信息，尚未独立核实。"),
      huabaoContextSource,
    ],
    verificationStatus: "pending",
    specifications: { kind: "pouch", pouchMaterial: "Nonwoven fabric layers shown in supplied infographic; exact materials and construction unverified | 中文：所附说明图显示无纺布层；具体材料与结构待核实" },
  },
  {
    id: "huabao-incootine-mo-gel-pouch",
    slug: "huabao-incootine-mo-gel-pouch",
    productName: "INCOOTINE MO Gel Pouch",
    brandId: "incootine",
    series: "MO",
    categoryId: "nicotine-pouches",
    formatId: "pouch",
    physicalFormDetails: { shape: "other", unitization: "pre-portioned" },
    manufacturerId: "huabao-research-institute-reported",
    markets: [],
    status: "unknown",
    shortDescription: "Described as a nicotine pouch combining nicotine particles and gel fragments; the supplied infographic is illustrative and not retail-packaging photography.",
    localizedShortDescription: {
      en: "Described as a nicotine pouch combining nicotine particles and gel fragments; the supplied infographic is illustrative and not retail-packaging photography.",
      zh: "据描述，为尼古丁颗粒与凝胶碎片混合的尼古丁袋；所附说明图为示意图，并非零售包装实拍图。",
    },
    productImage: "/products/huabao-incootine-gel-pouch-infographic.png",
    imageSource: userProvidedSource("gel-pouch-infographic-image", "Project-owner-supplied INCOOTINE Gel Pouch infographic", "/products/huabao-incootine-gel-pouch-infographic.png", "Infographic, not a retail pack photo. Product structure and examples are attributed to the supplied image; manufacturing location, regulatory claims, and listed variants have not been independently verified. | 中文：说明图，并非零售包装实拍；产品结构与示例信息来自所附图片，生产地点、监管声明及所列规格尚未独立核实。"),
    sources: [
      userProvidedSource("mo-owner-description", "Project-owner-provided MO product description", undefined, "The project owner describes MO as a nicotine gel pouch combining nicotine particles and gel fragments. | 中文：项目提供者描述 MO 为尼古丁颗粒与凝胶碎片混合的尼古丁凝胶袋。"),
      userProvidedSource("gel-pouch-infographic", "Project-owner-supplied INCOOTINE Gel Pouch infographic", "/products/huabao-incootine-gel-pouch-infographic.png", "The infographic describes gel-shard nicotine pouches and displays example strengths and flavours. It also contains production and regulatory claims; none are independently verified or recorded as facts here. | 中文：说明图描述含凝胶碎片的尼古丁袋，并列出强度和口味示例。图片还含生产地及监管声明，均未独立核实，因此未作为事实录入。"),
      huabaoContextSource,
    ],
    verificationStatus: "pending",
    specifications: { kind: "pouch" },
  },
];

const productRecords: Product[] = [...zynProducts, ...zynUltraProducts, ...zynSwissProducts, ...nicoretteProducts, ...veloProducts, ...swedishSnusProducts, ...huabaoProducts];

export const products: Product[] = productRecords.map((product) => {
  if (product.brandId === "zyn" && product.markets.includes("switzerland")) {
    return {
      ...product,
      manufacturerId: "swedish-match-ab",
      parentCompany: "Swedish Match AB",
      countryOfOrigin: "Scandinavia (the Swiss FAQ does not name a specific country)",
      sources: [...product.sources, officialSource("manufacturer-location", "ZYN Switzerland official FAQ", "https://www.zyn.com/ch/en/faq/nicotine-pouches-zyn", "The FAQ says ZYN is produced in Swedish Match factories in Scandinavia. / 官网 FAQ 说明 ZYN 在斯堪的纳维亚的 Swedish Match 工厂生产。")],
    };
  }
  if (product.brandId === "zyn") {
    return {
      ...product,
      manufacturerId: "swedish-match-north-america",
      parentCompany: "Swedish Match North America LLC",
      countryOfOrigin: "United States or Sweden (production site varies by batch)",
      sources: [...product.sources, officialSource("manufacturer-location", "ZYN U.S. official FAQ", "https://us.zyn.com/zyn-ultra-11mg-nicotine-pouches/", "The FAQ says ZYN is produced at Swedish Match factories in Kentucky and Sweden; the package-specific site is not identified here. / 官网 FAQ 说明 ZYN 在 Swedish Match 位于肯塔基州和瑞典的工厂生产；此处无法据此确定单罐产地。")],
    };
  }
  if (product.brandId === "nicorette") {
    const manufacturerReference = nicoretteManufacturerReferences[product.id];
    return {
      ...product,
      manufacturerId: "mcneil-ab",
      parentCompany: "Kenvue UK Limited",
      countryOfOrigin: "Sweden",
      sources: [...product.sources, manufacturerSource(
        "manufacturer-location",
        `${manufacturerReference?.productName ?? "Nicorette U.K. product"} patient leaflet`,
        manufacturerReference?.url ?? "https://www.medicines.org.uk/emc/ingredient/2036",
        "The product leaflet names McNeil AB, Helsingborg, Sweden as manufacturer and McNeil Products Ltd as the U.K. product-licence holder. / 该产品说明书将瑞典赫尔辛堡 McNeil AB 列为生产商，并将 McNeil Products Ltd 列为英国产品许可持有人。",
      )],
    };
  }
  if (product.brandId === "velo") {
    return {
      ...product,
      manufacturerId: "bat-velo-sites",
      parentCompany: "British American Tobacco p.l.c.",
      countryOfOrigin: "Hungary, Sweden or Italy (varies by package code)",
      sources: [...product.sources, officialSource("manufacturer-location", "VELO U.K. official manufacturing-location page", "https://www.velo.com/en-gb/pages/velo-packaging", "The official page maps package-code prefixes to BAT manufacturing facilities in Pécs, Hungary; Malmö, Sweden; and Trieste, Italy. / 官网按包装代码前缀列出匈牙利佩奇、瑞典马尔默和意大利的里雅斯特生产厂。")],
    };
  }
  if (["general", "grov", "kaliber", "kapten"].includes(product.brandId)) {
    return {
      ...product,
      manufacturerId: "swedish-match-ab",
      parentCompany: "Philip Morris International (PMI)",
      countryOfOrigin: "Sweden",
      sources: [...product.sources, manufacturerSource("manufacturer-location", "Swedish Match official company information", "https://www.swedishmatch.com/Our-business/", "Swedish Match states that it develops and manufactures snus, and identifies its company as Swedish Match AB. / Swedish Match 官网说明其研发并生产 snus，企业主体为 Swedish Match AB。")],
    };
  }
  return product;
});

export const brands: Brand[] = [
  {
    id: "incootine",
    slug: "incootine",
    name: "INCOOTINE",
    manufacturerIds: ["huabao-research-institute-reported"],
    localizedDescription: {
      en: "Name shown on project-owner-supplied Huabao product infographics. The brand ownership, full portfolio and specific product records remain pending independent verification.",
      zh: "项目提供者提交的华宝产品说明图上出现的名称；品牌归属、完整产品组合及具体产品记录仍待独立核实。",
    },
    categoryIds: ["nicotine-films", "nicotine-pouches"],
    formatIds: ["film", "pouch"],
    sources: [
      userProvidedSource("incootine-owner-attribution", "Project-owner attribution of INCOOTINE to Huabao Research Institute", undefined, "The supplied AERO and Gel Pouch infographics display HUABAO / INCOOTINE. The relationship between the named institute, Huabao International Holdings Limited, the brand, and the reported NF1.0 concept remains unverified. | 中文：所附 AERO 与 Gel Pouch 说明图显示 HUABAO / INCOOTINE；研究院、华宝国际控股有限公司、该品牌及 NF1.0 产品概念之间的关系仍待核实。"),
      huabaoContextSource,
    ],
    verificationStatus: "pending",
  },
  {
    id: "zyn",
    slug: "zyn",
    name: "ZYN",
    parentCompany: "Swedish Match (a Philip Morris International subsidiary)",
    manufacturerIds: ["swedish-match-north-america", "swedish-match-ab"],
    countryOfOrigin: "United States and Scandinavia; exact production site varies by market and package",
    officialWebsite: "https://us.zyn.com/all-products/",
    localizedDescription: { en: "Nicotine pouch varieties documented from ZYN's U.S. and Swiss official product pages.", zh: "依据 ZYN 美国与瑞士官网产品页整理的尼古丁袋品种。" },
    categoryIds: ["nicotine-pouches"],
    formatIds: ["pouch"],
    marketIds: ["united-states", "switzerland"],
    sources: [officialSource("official-brand-profile", "ZYN U.S. official website", "https://us.zyn.com/about-zyn/"), officialSource("official-brand-profile-ch", "ZYN Switzerland official website", "https://www.zyn.com/ch/de/"), officialSource("official-company-profile", "Swedish Match official company information", "https://www.swedishmatch.com/Our-business/")],
    lastVerified: accessedAt,
  },
  {
    id: "nicorette",
    slug: "nicorette",
    name: "Nicorette",
    parentCompany: "Kenvue UK Limited",
    manufacturerIds: ["mcneil-ab"],
    officialWebsite: "https://www.nicorette.co.uk/products",
    localizedDescription: { en: "U.K. nicotine replacement products in gum, lozenge and sublingual tablet forms.", zh: "英国市场的尼古丁替代产品，包含口香糖、含片和舌下片剂。" },
    categoryIds: ["nicotine-gum-confectionery", "nicotine-lozenges-solids"],
    formatIds: ["gum", "lozenge", "tablet"],
    marketIds: ["united-kingdom"],
    sources: [officialSource("official-brand-profile", "Nicorette U.K. official product range", "https://www.nicorette.co.uk/products"), officialSource("official-brand-owner", "Nicorette U.K. official FAQ", "https://www.nicorette.co.uk/useful-information/faq")],
    lastVerified: accessedAt,
  },
  {
    id: "velo",
    slug: "velo",
    name: "VELO",
    parentCompany: "British American Tobacco p.l.c.",
    manufacturerIds: ["bat-velo-sites"],
    officialWebsite: "https://www.velo.com/en-gb/collections/our-products",
    localizedDescription: { en: "U.K. nicotine pouch varieties documented from VELO's official product pages.", zh: "依据 VELO 英国官网产品页整理的尼古丁袋品种。" },
    categoryIds: ["nicotine-pouches"],
    formatIds: ["pouch"],
    marketIds: ["united-kingdom"],
    sources: [officialSource("official-brand-profile", "VELO U.K. official product range", "https://www.velo.com/en-gb/collections/our-products"), officialSource("official-parent-company", "British American Tobacco official VELO profile", "https://www.bat.com/brands-and-innovation/velo")],
    lastVerified: accessedAt,
  },
  {
    id: "general",
    slug: "general",
    name: "General",
    parentCompany: "Philip Morris International (PMI)",
    manufacturerIds: ["swedish-match-ab"],
    countryOfOrigin: "Sweden",
    officialWebsite: "https://www.swedishmatch.se/kop-snus/general/",
    localizedDescription: { en: "Swedish Match's General snus range, with product records tied to individual official pages.", zh: "Swedish Match 的 General 口含烟系列；产品记录逐款关联官方商品页。" },
    categoryIds: ["oral-smokeless-tobacco"],
    formatIds: ["pouch"],
    marketIds: ["sweden"],
    sources: [officialSource("official-brand-profile", "Swedish Match General product range", "https://www.swedishmatch.se/kop-snus/general/")],
    lastVerified: accessedAt,
  },
  {
    id: "grov",
    slug: "grov",
    name: "Grov",
    parentCompany: "Philip Morris International (PMI)",
    manufacturerIds: ["swedish-match-ab"],
    countryOfOrigin: "Sweden",
    officialWebsite: "https://www.swedishmatch.se/kop-snus/grov/",
    localizedDescription: { en: "Swedish Match's Grov oral smokeless tobacco range, documented from individual official product pages.", zh: "Swedish Match 的 Grov 口腔无烟烟草系列，依据各款官方商品页记录。" },
    categoryIds: ["oral-smokeless-tobacco"],
    formatIds: ["pouch"],
    marketIds: ["sweden"],
    sources: [officialSource("official-brand-profile", "Swedish Match Grov product range", "https://www.swedishmatch.se/kop-snus/grov/")],
    lastVerified: accessedAt,
  },
  {
    id: "kaliber",
    slug: "kaliber",
    name: "Kaliber",
    parentCompany: "Philip Morris International (PMI)",
    manufacturerIds: ["swedish-match-ab"],
    countryOfOrigin: "Sweden",
    officialWebsite: "https://www.swedishmatch.se/kop-snus/kaliber/",
    localizedDescription: { en: "Swedish Match's Kaliber oral smokeless tobacco range, documented from individual official product pages.", zh: "Swedish Match 的 Kaliber 口腔无烟烟草系列，依据各款官方商品页记录。" },
    categoryIds: ["oral-smokeless-tobacco"],
    formatIds: ["pouch"],
    marketIds: ["sweden"],
    sources: [officialSource("official-brand-profile", "Swedish Match Kaliber product range", "https://www.swedishmatch.se/kop-snus/kaliber/")],
    lastVerified: accessedAt,
  },
  {
    id: "kapten",
    slug: "kapten",
    name: "Kapten",
    parentCompany: "Philip Morris International (PMI)",
    manufacturerIds: ["swedish-match-ab"],
    countryOfOrigin: "Sweden",
    officialWebsite: "https://www.swedishmatch.se/kop-snus/kapten/",
    localizedDescription: { en: "Swedish Match's Kapten oral smokeless tobacco range, documented from individual official product pages.", zh: "Swedish Match 的 Kapten 口腔无烟烟草系列，依据各款官方商品页记录。" },
    categoryIds: ["oral-smokeless-tobacco"],
    formatIds: ["pouch"],
    marketIds: ["sweden"],
    sources: [officialSource("official-brand-profile", "Swedish Match Kapten product range", "https://www.swedishmatch.se/kop-snus/kapten/")],
    lastVerified: accessedAt,
  },
];

export const manufacturers: Manufacturer[] = [
  {
    id: "huabao-research-institute-reported",
    slug: "huabao-research-institute-reported",
    name: "Huabao Research Institute (reported; legal entity and manufacturing site unverified)",
    sources: [
      userProvidedSource("huabao-institute-owner-attribution", "Project-owner attribution to Huabao Research Institute", undefined, "Recorded as reported by the project owner. The exact legal manufacturer and factory for NF1.0, NF2.0/AERO, and MO have not been independently confirmed. | 中文：据项目提供者信息记录；NF1.0、NF2.0/AERO 与 MO 的具体法律制造商及工厂尚未独立确认。"),
      huabaoContextSource,
    ],
  },
  {
    id: "swedish-match-north-america",
    slug: "swedish-match-north-america",
    name: "Swedish Match North America LLC",
    country: "United States",
    officialWebsite: "https://us.zyn.com/",
    sources: [manufacturerSource("manufacturer-profile", "ZYN U.S. official website", "https://us.zyn.com/zyn-ultra-11mg-nicotine-pouches/", "The site identifies Swedish Match North America LLC and says ZYN is produced at Swedish Match factories in Kentucky and Sweden.")],
  },
  {
    id: "swedish-match-ab",
    slug: "swedish-match-ab",
    name: "Swedish Match AB",
    country: "Sweden",
    officialWebsite: "https://www.swedishmatch.com/",
    sources: [manufacturerSource("manufacturer-profile", "Swedish Match official company information", "https://www.swedishmatch.com/Our-business/", "Swedish Match identifies itself as a manufacturer of snus and a subsidiary of Philip Morris International.")],
  },
  {
    id: "mcneil-ab",
    slug: "mcneil-ab",
    name: "McNeil AB",
    country: "Sweden",
    officialWebsite: "https://www.medicines.org.uk/emc/ingredient/2036",
    sources: [manufacturerSource("manufacturer-profile", "U.K. Nicorette patient leaflets", "https://www.medicines.org.uk/emc/files/pil.9438.pdf", "The leaflet names McNeil AB, Helsingborg, Sweden as manufacturer; McNeil Products Ltd is the U.K. product-licence holder.")],
  },
  {
    id: "bat-velo-sites",
    slug: "bat-velo-sites",
    name: "British American Tobacco (manufacturing site varies by package code)",
    country: "Hungary, Sweden or Italy",
    officialWebsite: "https://www.velo.com/en-gb/pages/velo-packaging",
    sources: [manufacturerSource("manufacturer-profile", "VELO U.K. official manufacturing-location page", "https://www.velo.com/en-gb/pages/velo-packaging", "The official page lists BAT facilities in Pécs, Malmö and Trieste and explains how package-code prefixes identify the site.")],
  },
];

export const markets: Market[] = [
  { id: "united-states", slug: "united-states", name: { en: "United States", zh: "美国" }, region: "North America", countryCode: "US" },
  { id: "united-kingdom", slug: "united-kingdom", name: { en: "United Kingdom", zh: "英国" }, region: "Europe", countryCode: "GB" },
  { id: "sweden", slug: "sweden", name: { en: "Sweden", zh: "瑞典" }, region: "Europe", countryCode: "SE" },
  { id: "switzerland", slug: "switzerland", name: { en: "Switzerland", zh: "瑞士" }, region: "Europe", countryCode: "CH" },
];
