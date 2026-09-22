export type LocalizedText = { en: string; zh: string };
export type VerificationStatus = "verified" | "pending";
export type ProductStatus = "active" | "discontinued" | "unknown";
export type SourceType = "official-brand" | "manufacturer" | "regulator" | "government" | "scientific" | "industry" | "retail-reference" | "other";
export type NicotineSource = "tobacco-derived" | "synthetic" | "tobacco-material" | "unknown" | "other";
export type DeliveryRoute = "buccal" | "gingival" | "sublingual" | "oral-dissolution" | "chewing" | "oral-mucosal" | "mixed" | "other";
export type ProductTechnology = "pouch-matrix" | "polymer-film" | "hydrogel-film" | "compressed-tablet" | "lozenge-matrix" | "gum-base" | "candy-matrix" | "tobacco-matrix" | "powder-system" | "other";
export type FormatGroupId = "flexible-carrier" | "formed-solid" | "elastic-gel" | "particulate" | "compacted-mass";
export type PhysicalFormShape = "strip" | "sheet" | "spherical" | "pearl" | "other";
export type Unitization = "pre-portioned" | "loose";
export type OralUseMode = "placement" | "dissolution" | "chewing" | "other";

export interface Source {
  id: string;
  sourceName: string;
  sourceType: SourceType;
  sourceUrl: string;
  accessedAt: string;
  verifiedAt?: string;
  notes?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  introduction: LocalizedText;
  icon: "pouch" | "film" | "gum" | "candy" | "lozenge" | "tablet" | "solid" | "snus" | "tobacco" | "other";
  typicalFormats: string[];
  typicalRoutes: DeliveryRoute[];
  keyParameters: string[];
  subcategories?: string[];
}

export interface ProductFormat {
  id: string;
  slug: string;
  groupId: FormatGroupId;
  name: LocalizedText;
  description: LocalizedText;
  typicalStructure: LocalizedText;
  typicalParameters: string[];
}

export interface FormatGroup {
  id: FormatGroupId;
  name: LocalizedText;
  description: LocalizedText;
}

/**
 * Structural descriptors for a product's physical form. These do not determine
 * product category, flavour or delivery route.
 */
export interface PhysicalFormDetails {
  shape?: PhysicalFormShape;
  unitization?: Unitization;
  useMode?: OralUseMode;
  commercialPresentation?: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  parentCompany?: string;
  manufacturerIds?: string[];
  countryOfOrigin?: string;
  officialWebsite?: string;
  description?: string;
  categoryIds?: string[];
  formatIds?: string[];
  marketIds?: string[];
  sources: Source[];
  lastVerified?: string;
}

export interface Manufacturer {
  id: string;
  slug: string;
  name: string;
  country?: string;
  officialWebsite?: string;
  sources: Source[];
}

export interface Market {
  id: string;
  slug: string;
  name: LocalizedText;
  region?: string;
  countryCode?: string;
  regulatoryNotes?: string;
  regulatorySources?: Source[];
}

export interface Flavor {
  name: string;
  category?: string;
  cooling?: boolean;
  sweetness?: string;
  sensoryNotes?: string;
}

export interface NicotineSpecification {
  nicotineStrength?: string;
  nicotineStrengthMg?: number;
  nicotinePerUnit?: number;
  nicotinePerGram?: number;
  totalNicotine?: number;
  nicotineForm?: string;
  nicotineSource?: NicotineSource;
  strengthLabel?: string;
}

export interface BaseSpecification {
  kind: string;
  unitWeightMg?: number;
  netWeightG?: number;
  ph?: number;
  sweetener?: string[];
  releaseType?: string;
}
export interface PouchSpecification extends BaseSpecification {
  kind: "pouch";
  portionWeightMg?: number;
  pouchSize?: string;
  portionsPerCan?: number;
  moisture?: string;
  pouchMaterial?: string;
}
export interface FilmSpecification extends BaseSpecification {
  kind: "film";
  filmWeightMg?: number;
  filmLengthMm?: number;
  filmWidthMm?: number;
  filmThicknessMm?: number;
  filmAreaMm2?: number;
  dissolutionTimeSec?: number;
  filmMaterial?: string;
  deliverySite?: string;
}
export interface GumSpecification extends BaseSpecification {
  kind: "gum";
  pieceWeightMg?: number;
  piecesPerPack?: number;
  chewingTimeMin?: number;
  gumBase?: string;
  releaseProfile?: string;
}
export interface LozengeSpecification extends BaseSpecification {
  kind: "lozenge";
  lozengeWeightMg?: number;
  sizeMm?: number;
  dissolutionTimeMin?: number;
  piecesPerPack?: number;
}
export interface TabletSpecification extends BaseSpecification {
  kind: "tablet";
  tabletWeightMg?: number;
  tabletSizeMm?: number;
  disintegrationTimeMin?: number;
  dissolutionTimeMin?: number;
}
export interface CandySpecification extends BaseSpecification {
  kind: "candy";
  unitsPerPack?: number;
  texture?: string;
  dissolutionTimeMin?: number;
  chewingRequired?: boolean;
}
export interface ParticulateSpecification extends BaseSpecification {
  kind: "particulate";
  particleSize?: string;
  particleShape?: string;
  bulkDensity?: string;
  moisture?: string;
}
export interface PlugSpecification extends BaseSpecification {
  kind: "plug";
  dimensions?: string;
  compressionProfile?: string;
}
export interface TobaccoSpecification extends BaseSpecification {
  kind: "tobacco";
  portionWeightMg?: number;
  portionsPerCan?: number;
  moisture?: string;
  tobaccoType?: string;
  format?: string;
}
export interface OtherSpecification extends BaseSpecification {
  kind: "other";
  attributes?: Record<string, string | number | boolean>;
}
export type ProductSpecification = PouchSpecification | FilmSpecification | GumSpecification | LozengeSpecification | TabletSpecification | CandySpecification | ParticulateSpecification | PlugSpecification | TobaccoSpecification | OtherSpecification;

export interface Product {
  id: string;
  slug: string;
  productName: string;
  brandId: string;
  series?: string;
  categoryId: string;
  subcategory?: string;
  formatId: string;
  physicalFormDetails?: PhysicalFormDetails;
  manufacturerId?: string;
  parentCompany?: string;
  countryOfOrigin?: string;
  markets: string[];
  status: ProductStatus;
  description?: string;
  shortDescription?: string;
  productImage?: string;
  imageSource?: Source;
  officialWebsite?: string;
  flavor?: Flavor;
  nicotine?: NicotineSpecification;
  containsTobacco?: boolean;
  tobaccoFree?: boolean;
  deliveryRoute?: DeliveryRoute[];
  productTechnology?: ProductTechnology[];
  specifications: ProductSpecification;
  sources: Source[];
  verificationStatus: VerificationStatus;
  lastVerified?: string;
}
