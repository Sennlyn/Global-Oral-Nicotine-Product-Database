import type { Brand, LocalizedText, Source } from "@/types/catalog";

const reviewed = "2026-10-19";
const source = (id: string, sourceName: string, sourceUrl: string, sourceType: Source["sourceType"]): Source => ({ id, sourceName, sourceUrl, sourceType, accessedAt: reviewed });
const evidence: Record<string, { country: string; basis: LocalizedText; sources: Source[] }> = {
  "chaini-khaini": {
    country: "India",
    basis: { en: "The brand's company page identifies Harsh International / MAHAK in New Delhi, India. The Indian tribunal record independently identifies its production of Chaini Khaini; no current manufacturing site is inferred for the sampled product.", zh: "品牌公司介绍将Harsh International／MAHAK列于印度新德里；印度税务裁判资料亦列明其生产Chaini Khaini。不据此推断所收录样品当前的生产地点。" },
    sources: [source("chaini-country-official", "Chaini Khaini: company profile, Harsh International in India", "https://chainikhaini.com/about.htm", "official-brand"), source("chaini-country-tribunal", "Indian Income Tax Appellate Tribunal: Harsh International / Chaini Khaini", "https://itat.gov.in/public/files/upload/47194885806825005801351REFNOHarsh_copy_new.pdf", "government")],
  },
  miraj: {
    country: "India",
    basis: { en: "Historical Miraj khaini affiliation: the Indian Journal of Community Medicine identifies Miraj Group and its khaini brand in India; the group's headquarters in Rajasthan are separately recorded by Vital Strategies.", zh: "历史Miraj khaini归属：《Indian Journal of Community Medicine》将该品牌关联至印度Miraj集团；Vital Strategies报告另列其总部位于印度拉贾斯坦邦。" },
    sources: [source("miraj-country-paper", "Indian Journal of Community Medicine: Miraj khaini and corporate diversification", "https://doi.org/10.4103/ijcm.ijcm_938_25", "scientific"), source("miraj-country-report", "Vital Strategies: Hidden in Plain Sight, headquarters of Miraj Group", "https://www.vitalstrategies.org/wp-content/uploads/TERM_HiddeninPlainSight_December-2022.pdf", "industry")],
  },
  "pan-bahar": {
    country: "India",
    basis: { en: "DJ Group's brand history identifies Pan Bahar in the Jain family's Indian business, with the group office in New Delhi. Brand affiliation does not establish nicotine content of other products sharing this brand name.", zh: "DJ集团品牌沿革将Pan Bahar关联至Jain家族的印度业务，并列明新德里总部。品牌归属不代表同品牌其他产品均含尼古丁。" },
    sources: [source("pan-bahar-country-official", "DJ Group: Pan Bahar brand history and New Delhi headquarters", "https://www.djgroup.in/branding/", "manufacturer")],
  },
};

export function applyResearchedAffiliation(brand: Brand): Brand {
  const entry = evidence[brand.id];
  return entry ? { ...brand, brandCountry: entry.country, brandCountryBasis: entry.basis, sources: [...brand.sources, ...entry.sources], lastVerified: reviewed } : brand;
}
