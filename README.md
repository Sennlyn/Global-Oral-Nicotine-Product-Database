# Global Oral Nicotine Product Database / 全球口腔尼古丁产品数据库

V1.0 is a local research website framework for oral nicotine and oral smokeless tobacco products. The formal product, brand, manufacturer and market datasets are intentionally empty. **No real products were researched or entered in this phase.** This is not an e-commerce site.

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

Use the **EN / 中文** selector beside Search in the header to switch the entire interface between English and Simplified Chinese. The selection is saved in a cookie, so it persists across page navigation and reloads. Switching languages keeps the current page and any product search or filter parameters. The page language and metadata also follow the selection. Proper names and established technical abbreviations can remain in their original form.

In this Windows Codex workspace, `pnpm` may not be on `PATH`. Use the bundled executable directly from PowerShell if needed:

```powershell
& 'C:\Users\zhaos\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd' dev
```

## Structure

```text
src/
  app/            App Router pages and global CSS
  components/     layout, categories, formats, products and reusable UI
  data/           category and format taxonomy, regions, empty formal datasets
  lib/            search/filter and future record validation helpers
  types/          catalog TypeScript model
```

## Routes

`/`, `/products`, `/products/template`, `/products/[slug]`, `/categories`, `/categories/[slug]`, `/formats`, `/formats/[slug]`, `/brands`, `/brands/[slug]`, `/markets`, `/markets/[slug]`, `/compare`, `/about`.

`/products/template` is a field layout preview and contains no product claim. Dynamic product and brand routes show actual profiles only when matching records have been entered. Unknown slugs return 404.

## Classification

**Product Category** (6): Nicotine Pouches; Nicotine Films; Nicotine Gum & Confectionery; Nicotine Lozenges & Solid Formats; Oral Smokeless Tobacco; Other Oral Nicotine Products. Gum and confectionery share one top-level category. Snus remains an identifiable subcategory of Oral Smokeless Tobacco.

**Physical Form** (11): Pouch, Oral Film, Lozenge, Tablet, Hard Candy, Gum, Gummy, Bead / Pellet, Granule, Powder and Compacted Block. The browse page groups these by physical structure: flexible carriers, formed solids, elastic and gel matrices, particulate systems and compacted masses.

Physical form is independent from product category. Each future product record has one primary physical form; its shape, unitization, use mode, commercial presentation and flavour are separate fields. “Portion” and “loose” are unitization values, “chew” is a use mode, and “mint” is a flavour or commercial presentation rather than a physical form.

The original nineteen entries are preserved in `legacyFormatDefinitions` for traceability. Exact structural aliases (such as Strip → Oral Film and Bead → Bead / Pellet) resolve to an active physical form. Ambiguous former entries redirect to the formats overview so a future source-backed record can be classified from its actual structure.

The original ten category definitions remain in `originalCategories` for traceability. `categoryIdAliases` maps their IDs to the six active categories, and old category URLs redirect to the corresponding new page. Formal product records are still empty, so no real product records were moved or removed.

## Product model

`src/types/catalog.ts` defines `Product`, `Brand`, `Manufacturer`, `Market`, `Source`, `Flavor` and `NicotineSpecification`. A product has stable IDs/slugs, brand and manufacturer references, independent category and primary physical-form references, markets, optional descriptive attributes, source links, verification status and last verification date. `physicalFormDetails` keeps structural shape, unitization, use mode and commercial presentation separate from category and flavour. Unknown attributes are optional rather than invented.

Physical specifications are a discriminated union selected by `specifications.kind`: `pouch`, `film`, `gum`, `lozenge`, `tablet`, `candy`, `particulate`, `plug`, `tobacco` or `other`. Each variant has its own optional technical fields. `SpecificationTable` renders only fields present in that product's selected variant. The `other` variant provides an extension point for new formats.

## Authenticity and future entry policy

1. Add a real product only after checking credible, traceable sources. Record the URL, source type, access date and verification date.
2. Keep unverified or unknown values blank or explicitly pending. Do not infer nicotine origin, tobacco content, strength, manufacturer, market status or regulatory details from a category label.
3. Use `validateVerifiedProduct()` before publishing a verified record. Resolve contradictory or unsupported data first.
4. Keep official product images linked to an `imageSource`; do not create fictional packaging or imagery.
5. Keep non-oral inhaled cigarettes, vapes, heated tobacco sticks and waterpipe products outside this database.

## V1 interface status

Search, filtering, sorting, grid/list controls, taxonomy navigation, category and format detail pages, brand and market shells, a product detail template and a neutral comparison table are built. With zero formal records, the interface shows intentional empty states. The comparison slots, brand profiles, country records, regulatory notes and product content will become useful once verified records are added.

## Suggested next phase

After reviewing V1, establish a small evidence-backed entry workflow and record validation checklist, then add a limited set of verified products across different formats to test the model. Database migration can follow once the content workflow is stable. Do not add records without the project owner's authorization for that phase.
