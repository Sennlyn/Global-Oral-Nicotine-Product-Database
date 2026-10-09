# Global Oral Nicotine Product Database / 全球口腔尼古丁产品数据库

V1.9.2 is a source-linked research website for oral nicotine and oral smokeless tobacco products. Each product-country pair records its market status separately; uncertain details are clearly marked. This is not an e-commerce site.

## Stack

- Next.js App Router, React and TypeScript
- Tailwind CSS 4 with a custom responsive design system in `src/app/globals.css`
- Local TypeScript configuration data; no database server, authentication or admin panel

## Run locally

Node.js 20.9 or newer is required. The project includes a `pnpm-lock.yaml` after dependencies are installed.

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>. For validation and production output:

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

## Language selection

Use the **EN / 中文** selector beside Search in the header to switch the interface between English and Simplified Chinese. The selection is saved in browser storage and persists across page navigation and reloads. Switching languages keeps the current page and any product search or filter parameters. The page language and metadata also follow the selection. Proper names and established technical abbreviations can remain in their original form.

In this Windows Codex workspace, `pnpm` may not be on `PATH`. Use the bundled executable directly from PowerShell if needed:

```powershell
& 'C:\Users\zhaos\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd' dev
```

## Structure

```text
src/
  app/            App Router pages and global CSS
  components/     layout, categories, formats, products and reusable UI
  data/           product catalog, category and format taxonomy, regions
  lib/            search/filter and future record validation helpers
  types/          catalog TypeScript model
```

## Routes

`/`, `/products`, `/products/template`, `/products/[slug]`, `/categories`, `/categories/[slug]`, `/formats`, `/formats/[slug]`, `/brands`, `/brands/[slug]`, `/markets`, `/markets/[slug]`, `/compare`, `/about`.

`/products/template` is a field layout preview and contains no product claim. Dynamic product and brand routes show actual profiles only when matching records have been entered. Unknown slugs return 404.

## Classification

**Product Category** (6): Nicotine Pouches; Nicotine Films; Nicotine Gum & Confectionery; Nicotine Lozenges & Solid Formats; Oral Smokeless Tobacco; Other Oral Nicotine Products. Gum and confectionery share one top-level category. Snus remains an identifiable subcategory of Oral Smokeless Tobacco.

**Physical Form** (11): Pouch, Oral Film, Lozenge, Tablet, Hard Candy, Gum, Gummy, Bead / Pellet, Granule, Powder and Compacted Block. The browse page groups these by physical structure: flexible carriers, formed solids, elastic and gel matrices, particulate systems and compacted masses.

Physical form is independent from product category. Each product record has one primary physical form; its shape, unitization, use mode, commercial presentation and flavour are separate fields. “Portion” and “loose” are unitization values, “chew” is a use mode, and “mint” is a flavour or commercial presentation rather than a physical form.

The original nineteen entries are preserved in `legacyFormatDefinitions` for traceability. Exact structural aliases (such as Strip → Oral Film and Bead → Bead / Pellet) resolve to an active physical form. Ambiguous former entries redirect to the formats overview so a future source-backed record can be classified from its actual structure.

The original ten category definitions remain in `originalCategories` for traceability. `categoryIdAliases` maps their IDs to the six active categories, and old category URLs redirect to the corresponding new page. The 2026-10-09 catalog contains 570 source-linked records across 74 brands, including 66 historical records. All 81 pre-expansion records and their URLs remain available.

Existing product records remain in the catalog while category aliases resolve legacy category IDs to the six active categories. No product record is deleted as part of taxonomy updates.

## Product model

`src/types/catalog.ts` defines `Product`, `Brand`, `Manufacturer`, `Market`, `Source`, `Flavor` and `NicotineSpecification`. A product has stable IDs/slugs, brand and manufacturer references, independent category and primary physical-form references, market links, country-specific listing evidence, a separate lifecycle field, source links and review dates. `Brand.brandCountry` is separate from product manufacturing location and sales markets. `physicalFormDetails` keeps structural shape, unitization, use mode and commercial presentation separate from category and flavour. Unknown attributes are optional rather than invented.

Physical specifications are a discriminated union selected by `specifications.kind`: `pouch`, `film`, `gum`, `lozenge`, `tablet`, `candy`, `particulate`, `plug`, `tobacco` or `other`. Each variant has its own optional technical fields. `SpecificationTable` renders only fields present in that product's selected variant. The `other` variant provides an extension point for new formats.

## Authenticity and future entry policy

1. Add a real product only after checking credible, traceable sources. Record the URL, source type, access date and verification date.
2. Keep unsupported or unknown values blank or explicitly unconfirmed. Assess listing status for each product and country; do not infer nicotine origin, tobacco content, strength, manufacturer, market status or regulatory details from a category label.
3. Use `validateVerifiedProduct()` for record-completeness checks. It is an internal validation helper; public listing status is determined independently for each product-country pair.
4. Keep official product images linked to an `imageSource`; do not create fictional packaging or imagery.
5. Keep non-oral inhaled cigarettes, vapes, heated tobacco sticks and waterpipe products outside this database.

## V1.9.2 interface status

Search, filtering, sorting, grid/list controls, taxonomy navigation, category and format detail pages, brand and market profiles, product records, country-specific listing status and a neutral comparison table are available. “Not on market” includes pre-market, withdrawn and historical records; lifecycle remains a separate field.

## Suggested next phase

After reviewing V1.9.2, continue expanding source-backed product records across formats and markets. Database migration can follow once the content workflow is stable. New records must be supported by traceable sources and an exact product-image match.

## Broad catalog research — 2026-10-09

`src/data/catalog-expansion.ts` adds 489 records from official catalogs, retailer listings, medicines registers, scientific papers and historical company disclosures. These are research entries: `verificationStatus: "pending"` retains identities with sources while exact product photos and missing parameters await verification. They remain searchable and visible; they are not presented as fully verified entries. A missing manufacturer or brand country is left unknown.

Identical named variants across sources and countries share one record. Flavor, nicotine strength, pouch size and series changes can distinguish variants, but multipacks and artwork changes alone do not. Confirmed former names are searchable aliases; LOOP Cassis Bliss Strong resolves to Blackcurrant Strong. Evidence about UK factories, papaya flavor and medicine composition is applied only to the matching records.

This catalog is not an exhaustive list of every product ever sold. The dated scope, unresolved leads and evidence limitations are recorded in `scripts/research/catalog-2026-10-09.md`. Run `node scripts/audit-catalog.cjs` to check provenance, identity collisions, retained baseline IDs, aliases and record joins.
