import type { Locale } from "@/lib/i18n";

type Text = Record<Locale, string>;
type MilestoneKind = "brand" | "format" | "medicine" | "regulation";
export type HomeMilestone = {
  id: string; date: string; dateLabel: Text; kind: MilestoneKind;
  title: Text; description: Text; source: string; publisher: string;
};
export type HomeNews = Omit<HomeMilestone, "kind"> & { type: Text };

const text = (en: string, zh: string): Text => ({ en, zh });
const milestone = (id: string, date: string, kind: MilestoneKind, title: Text, description: Text, source: string, publisher = "Swedish Match"): HomeMilestone => ({
  id, date, dateLabel: text(date, date), kind, title, description, source, publisher,
});
export const HOME_UPDATES_CHECKED = "2026-10-12";
export const milestoneKinds: Record<MilestoneKind, Text> = {
  brand: text("Brand history", "品牌沿革"),
  format: text("Format & packaging", "形态与包装"),
  medicine: text("Nicotine replacement medicine", "尼古丁替代药品"),
  regulation: text("Regulatory milestone", "监管里程碑"),
};

const canHistory = "https://news.cision.com/swedish-match/r/congratulations---the-round-snus-can-is-turning-40-,c368712";
const rapeHistory = "https://www.mynewsdesk.com/se/swedishmatch/pressreleases/bubblig-goeteborgare-fyller-100-aar-ny-xr-goeteborgs-rape-sparkling-2860870";
const nicoretteHistory = "https://www.nicorette.co.uk/about-nicorette";
const zynHistory = "https://www.zyn.com/gb/en/blog/when-were-nicotine-pouches-invented.html";
const generalOrders = "https://www.fda.gov/tobacco-products/advertising-and-promotion/swedish-match-usa-inc-modified-risk-tobacco-product-mrtp-applications-general-snus-products";
const zynPmta = "https://www.fda.gov/news-events/press-announcements/fda-authorizes-marketing-20-zyn-nicotine-pouch-products-after-extensive-scientific-review";
const zynMrtp = "https://www.fda.gov/tobacco-products/ctp-newsroom/fda-authorizes-20-zyn-nicotine-pouches-be-marketed-specific-modified-risk-claim";
const onFlavors = "https://www.fda.gov/tobacco-products/ctp-newsroom/pilot-program-update-fda-authorizes-4-new-nicotine-pouches";
const zynUltra = "https://www.fda.gov/tobacco-products/ctp-newsroom/fda-authorizes-11-new-nicotine-pouches";

// Exact days are used only when the source gives them; year-only dates remain year-only.
// Manufacturer histories establish their own brands and packaging, not universal invention claims.
export const homeMilestones: HomeMilestone[] = [
  milestone("ettan", "1822", "brand", text("Ettan is established", "Ettan 品牌创立"),
    text("Swedish Match dates Ettan to 1822, documenting one of the long-running brands of loose Swedish snus.", "Swedish Match 将 Ettan 的创立年份记为 1822 年；这一散装瑞典 snus 品牌延续至今，是观察传统产品演变的早期节点。"),
    "https://www.swedishmatch.com/globalassets/reports/annual-reports/2005_annualreport_en.pdf"),
  milestone("general", "1866", "brand", text("General's recipe takes shape", "General 配方形成"),
    text("Johan A. Boman developed the General recipe in 1866. The manufacturer's history describes selected tobacco with bergamot oil, a flavor identity retained as the range expanded.", "Johan A. Boman 于 1866 年开发 General 配方。制造商史料记载其以精选烟草和佛手柑油形成风味特征，之后逐步扩展为多个产品规格。"),
    "https://www.mynewsdesk.com/se/swedishmatch/pressreleases/general-787855"),
  milestone("monopoly-packaging", "1915", "format", text("Swedish snus packaging is standardized", "瑞典 snus 包装趋于统一"),
    text("The Swedish tobacco monopoly rationalized producers' packaging. Oval 50 g and 100 g cans and a square 250 g package became established formats.", "瑞典烟草专卖制度建立后，不同生产者的包装被整合，采用 50 克、100 克椭圆罐及 250 克方形包装，体现散装 snus 的早期包装规格化。"),
    canHistory),
  milestone("rape", "1919", "brand", text("Göteborgs Rapé becomes a brand", "Göteborgs Rapé 品牌成立"),
    text("Swedish Match dates the brand to 1919, while tracing its blends to Gothenburg harbor in the 1850s. The brand later became a platform for new portion formats.", "Swedish Match 记载该品牌成立于 1919 年，并将其调配传统追溯至 19 世纪 50 年代的哥德堡港；后来该品牌也用于推出新的袋装形态。"),
    rapeHistory),
  milestone("round-can", "1967", "format", text("The round snus can arrives", "圆形 snus 罐面世"),
    text("Svenska Tobaks AB introduced round paper cans with metal lids, replacing familiar oval packs. Brand colors helped distinguish General, Ettan and Grov.", "Svenska Tobaks AB 推出配金属盖的圆形纸罐，改变此前常见的椭圆包装，并用不同配色区分 General、Ettan 和 Grov 等品牌。"),
    canHistory),
  milestone("gum-research", "1967", "medicine", text("Nicotine gum research begins", "尼古丁口香糖研发构想提出"),
    text("Nicorette's history credits Claes Lundgren and Stephan Lichtneckert in Sweden with the idea of nicotine chewing gum to address withdrawal, beginning a separate medicinal development path.", "Nicorette 史料记载，瑞典医生 Claes Lundgren 和 Stephan Lichtneckert 提出用含尼古丁口香糖缓解戒断症状的构想，开启区别于消费型烟草的药品研发路径。"),
    nicoretteHistory, "Nicorette"),
  milestone("portion", "1973", "format", text("Portion snus arrives", "预分装 snus 面世"),
    text("Swedish Match records the launch of its first portion-packed snus in Sweden. Tobacco was supplied in ready-to-use pouches rather than loose material shaped by the user.", "Swedish Match 记载首款预分装 snus 于 1973 年在瑞典推出。烟草被装入可直接使用的小袋，使用者不再需要自行把散装烟草捏成单份。"),
    "https://www.swedishmatch.com/globalassets/reports/annual-reports/2021_swedishmatchannualreport_interactive_en.pdf"),
  milestone("gum-switzerland", "1978", "medicine", text("Nicotine gum launches in Switzerland", "尼古丁口香糖在瑞士推出"),
    text("After years of development, Nicorette nicotine gum became available to consumers in Switzerland in 1978, bringing a measured oral nicotine medicine to market.", "经过多年研发，Nicorette 尼古丁口香糖于 1978 年在瑞士推出，将具有规定剂量的口腔尼古丁替代药品带入市场。"),
    nicoretteHistory, "Nicorette"),
  milestone("gum-uk", "1980", "medicine", text("Nicorette is registered in the UK", "Nicorette 在英国注册为药品"),
    text("Nicorette records UK medicine registration in 1980. This medicinal status is distinct from tobacco or consumer nicotine pouch marketing rules.", "Nicorette 官方历史记载其于 1980 年在英国注册为药品。尼古丁替代药品的许可路径与烟草及消费型尼古丁袋的上市规则不同。"),
    nicoretteHistory, "Nicorette"),
  milestone("catch", "1984", "format", text("Catch expands portion flavors", "Catch 拓展袋装 snus 口味"),
    text("Catch Licorice launched in 1984. Swedish Match describes it as the first portion snus with a non-traditional snus flavor on the Swedish market.", "Catch Licorice 于 1984 年推出。Swedish Match 将其描述为瑞典市场首款具有非传统 snus 风味的预分装产品，甘草味成为产品差异化的一个节点。"),
    "https://www.mynewsdesk.com/se/swedishmatch/pressreleases/foersta-smaksatta-snuset-stoersta-smaksatta-snusvarumaerket-1062959"),
  milestone("white-portion", "1998", "format", text("White Portion emerges", "White Portion 形态推出"),
    text("Swedish Match identifies Göteborgs Rapé as its first White product in 1998. White Portion is a tobacco snus format and should not be confused with tobacco-leaf-free nicotine pouches.", "Swedish Match 记载 Göteborgs Rapé 于 1998 年成为其首款 White 产品。White Portion 是含烟草 snus 的袋装形态，不能与后来的无烟叶尼古丁袋混为一类。"),
    rapeHistory),
  milestone("gothiatek", "2000", "format", text("GOTHIATEK quality standard is introduced", "GOTHIATEK 企业质量标准启用"),
    text("Swedish Match has applied GOTHIATEK to its snus since 2000, setting company requirements for raw materials and production. It is a manufacturer standard, not a market authorization.", "Swedish Match 自 2000 年起对其 snus 应用 GOTHIATEK，规定原料和生产方面的企业质量要求；这是制造商标准，不是产品上市许可。"),
    "https://www.swedishmatch.com/Our-business/"),
  milestone("zyn-us", "2014", "brand", text("ZYN launches initially in Colorado", "ZYN 在美国科罗拉多州初步推出"),
    text("ZYN's official brand history dates its initial U.S. launch to Colorado in 2014. The pouches contain tobacco-derived nicotine without tobacco leaf.", "ZYN 官方品牌历史记载其于 2014 年先在美国科罗拉多州推出；产品使用烟草来源尼古丁，但不含烟叶，体现从含烟草袋到无烟叶尼古丁袋的变化。"),
    zynHistory, "ZYN"),
  milestone("general-pmta", "2015-11-10", "regulation", text("General snus receives U.S. PMTA orders", "General snus 获美国 PMTA 上市许可"),
    text("FDA issued marketing orders for eight specified General snus products through the PMTA pathway. The later permission to make modified-risk claims required a separate review.", "FDA 通过 PMTA 路径对八款具体 General snus 产品发出上市许可；后来允许使用改良风险宣传声明，仍需另行审查，不能与上市许可混同。"),
    generalOrders, "FDA"),
  milestone("zyn-sweden", "2016", "brand", text("ZYN enters Sweden", "ZYN 在瑞典推出"),
    text("The brand's official history records its first Swedish marketing in 2016 and wider U.S. distribution that year. Launch history does not establish current permission in every market.", "ZYN 官方历史记录其于 2016 年首次在瑞典销售，同年也扩展至更多美国州；历史上市记录与今天各市场的监管许可分别判断。"),
    zynHistory, "ZYN"),
  milestone("general-mrtp", "2019-10-22", "regulation", text("General receives modified-risk orders", "General 获改良风险宣传许可"),
    text("FDA issued its first modified-risk orders for eight General snus products. The orders permitted a specific comparison with cigarettes, applying only to the named products.", "FDA 首次对八款 General snus 产品发出改良风险许可，允许使用针对卷烟的指定比较声明；许可仅适用于列名产品，不是对整个 snus 类别的认定。"),
    generalOrders, "FDA"),
  milestone("synthetic-nicotine", "2022-04-14", "regulation", text("U.S. authority covers nicotine from any source", "美国监管权限扩展至任何来源尼古丁"),
    text("A federal law took effect clarifying FDA authority over tobacco products containing nicotine from any source, including synthetic nicotine. Non-tobacco origin does not itself exempt a product.", "美国联邦法律生效，明确 FDA 对含任何来源尼古丁的烟草产品拥有监管权限，包括合成尼古丁；非烟草来源本身不再构成监管豁免。"),
    "https://www.fda.gov/tobacco-products/ctp-newsroom/requirements-products-made-non-tobacco-nicotine-take-effect-april-14", "FDA"),
  milestone("general-renewal", "2024-11-07", "regulation", text("General's modified-risk orders are renewed", "General 改良风险许可续期"),
    text("FDA renewed the orders for eight General snus products until November 7, 2032. The renewal retains the specified claim and product scope.", "FDA 对八款 General snus 产品的改良风险许可续期至 2032 年 11 月 7 日；指定宣传声明和具体产品范围继续适用。"),
    generalOrders, "FDA"),
  milestone("zyn-pmta", "2025-01-16", "regulation", text("First U.S. nicotine pouch marketing orders", "美国首次授权尼古丁袋上市"),
    text("FDA authorized 20 ZYN products: ten varieties in 3 mg and 6 mg. This was the first FDA nicotine pouch marketing authorization and did not authorize reduced-risk claims at that time.", "FDA 授权 20 款 ZYN 产品上市，即十种口味的 3 毫克和 6 毫克规格。这是 FDA 首次授权尼古丁袋上市，当时的许可并不允许改良风险宣传声明。"),
    zynPmta, "FDA"),
  milestone("zyn-mrtp", "2026-06-30", "regulation", text("ZYN receives specified modified-risk orders", "ZYN 获指定改良风险宣传许可"),
    text("FDA granted modified-risk orders for the 20 named ZYN 3 mg and 6 mg pouches. The permission covers specified wording and does not extend to every ZYN strength or product.", "FDA 对列名的 20 款 ZYN 3 毫克和 6 毫克尼古丁袋授予改良风险许可，允许使用指定措辞；这不延伸至 ZYN 的所有浓度或其他产品。"),
    zynMrtp, "FDA"),
  milestone("on-new-flavors", "2026-08-04", "regulation", text("Four on! flavor specifications are authorized", "四款 on! 口味规格获上市许可"),
    text("FDA authorized Rich Berry 2 mg, Cappuccino 2 mg and 4 mg, and Autumn Spice 2 mg from Helix Innovations. Authorization follows the exact flavor and dose, not the whole brand.", "FDA 授权 Helix Innovations 的 Rich Berry 2 毫克、Cappuccino 2 毫克和 4 毫克，以及 Autumn Spice 2 毫克上市；许可对应具体口味和剂量，不能推广到整个品牌。"),
    onFlavors, "FDA"),
  milestone("zyn-ultra", "2026-08-21", "regulation", text("Eleven ZYN ULTRA specifications are authorized", "十一款 ZYN ULTRA 规格获上市许可"),
    text("FDA authorized eleven ZYN ULTRA products from Swedish Match USA: ten 9 mg specifications and Smooth 11 mg, expanding the set of individually reviewed nicotine pouches.", "FDA 授权 Swedish Match USA 的十一款 ZYN ULTRA 产品上市，包括十款 9 毫克规格及 Smooth 11 毫克，扩展了经过逐项审查的尼古丁袋范围。"),
    zynUltra, "FDA"),
];

export const homeNews: HomeNews[] = [
  {
    id: "gao-review", date: "2026-10-01", dateLabel: text("1 October 2026", "2026 年 10 月 1 日"),
    type: text("GAO REGULATORY REPORT", "GAO 监管审查报告"),
    title: text("GAO publishes tobacco review timeliness findings", "GAO 公开烟草产品审查时效报告"),
    description: text("Publicly released October 1 after publication on September 30, the report recommends better monitoring of FDA scientific review timelines and discusses the nicotine pouch pilot. It does not authorize products.", "报告于 9 月 30 日发布、10 月 1 日公开，建议 FDA 改善科学审查时效监测，并讨论尼古丁袋审查试点。该报告不构成任何产品上市许可。"),
    source: "https://www.gao.gov/products/gao-26-108195", publisher: "U.S. GAO",
  },
  {
    id: "fda-registration", date: "2026-09-29", dateLabel: text("29 September 2026", "2026 年 9 月 29 日"),
    type: text("FDA REGULATORY UPDATE", "FDA 监管动态"),
    title: text("FDA unifies registration and product listing forms", "FDA 统一机构登记与产品列报表格"),
    description: text("FDA announced the redesigned Form 3741, launched September 28, covering smokeless tobacco and oral nicotine products including pouches. Registration and listing do not replace marketing authorization.", "FDA 公告说明，9 月 28 日启用的新版 3741 表格统一覆盖无烟烟草和尼古丁袋等口腔尼古丁产品。机构登记及产品列报不等于获得上市许可。"),
    source: "https://www.fda.gov/tobacco-products/ctp-newsroom/fda-updates-tobacco-product-establishment-registration-and-product-listing-form-increase-efficiency", publisher: "FDA",
  },
  {
    id: "zyn-ultra", date: "2026-08-21", dateLabel: text("21 August 2026", "2026 年 8 月 21 日"),
    type: text("FDA PRODUCT AUTHORISATION", "FDA 产品上市许可"),
    title: text("FDA authorizes 11 new ZYN ULTRA pouch products", "FDA 授权 11 款 ZYN ULTRA 尼古丁袋上市"),
    description: text("The PMTA orders cover ten 9 mg specifications and Smooth 11 mg from Swedish Match USA. Each authorization applies to the listed product.", "PMTA 许可覆盖 Swedish Match USA 的十款 9 毫克规格及 Smooth 11 毫克；授权范围以公告列出的具体产品为准。"),
    source: zynUltra, publisher: "FDA",
  },
  {
    id: "on-new-flavors", date: "2026-08-04", dateLabel: text("4 August 2026", "2026 年 8 月 4 日"),
    type: text("FDA PRODUCT AUTHORISATION", "FDA 产品上市许可"),
    title: text("FDA authorizes four new on! nicotine pouches", "FDA 授权四款 on! 尼古丁袋上市"),
    description: text("The authorized products are Rich Berry 2 mg, Cappuccino 2 mg and 4 mg, and Autumn Spice 2 mg, made by Helix Innovations.", "获授权产品为 Helix Innovations 制造的 Rich Berry 2 毫克、Cappuccino 2 毫克和 4 毫克，以及 Autumn Spice 2 毫克。"),
    source: onFlavors, publisher: "FDA",
  },
  {
    id: "zyn-mrtp", date: "2026-06-30", dateLabel: text("30 June 2026", "2026 年 6 月 30 日"),
    type: text("FDA REGULATORY UPDATE", "FDA 监管动态"),
    title: text("FDA grants modified-risk orders for 20 ZYN pouches", "FDA 向 20 款 ZYN 尼古丁袋授予改良风险许可"),
    description: text("The orders cover ten named varieties in 3 mg and 6 mg and permit only specified claims. They are separate from PMTA marketing orders.", "许可涉及十种指定口味各自的 3 毫克和 6 毫克产品，仅允许指定宣传声明；它与 PMTA 上市许可属于不同监管决定。"),
    source: zynMrtp, publisher: "FDA",
  },
];

