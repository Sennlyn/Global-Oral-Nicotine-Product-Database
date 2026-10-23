# GONPD: Global Oral Nicotine Product Database

Guide for Claude. Read it at the start of every session, and update **Current status** at the end of each one.

The owner's original rules are in AGENTS.md and are loaded here. **They always apply:**

@AGENTS.md

---

## WHAT: the project

A bilingual (English / 简体中文) research website that catalogs **every oral nicotine and oral smokeless tobacco product in the world**: real products only, each backed by traceable sources.

- **Live site:** https://sennlyn.github.io/Global-Oral-Nicotine-Product-Database/
- **Repo:** https://github.com/Sennlyn/Global-Oral-Nicotine-Product-Database (public, account `Sennlyn`)
- **Current version:** 1.9.2, with 763 product variants from 82 brands (as of 2026-10-19)

**In scope:** nicotine pouches, nicotine films, nicotine gum and confectionery, lozenges, tablets and other solid formats, oral smokeless tobacco (snus, moist snuff, chew and so on), and other oral nicotine products.
**Out of scope:** cigarettes, vapes, heated tobacco, waterpipe and anything else that is inhaled.

**Features today:** catalog with search, filters, sorting and grid/list views; pages for products, categories, physical forms, brands and countries; a compare table; a news/updates page; a global coverage map; an EN/中文 switch.

## WHY: the purpose

- The oral nicotine market is growing fast. Products, strengths, brands and rules change constantly, and the information is scattered across brand sites, retailers, regulators, scientific papers and archives.
- **No neutral, complete, source-linked global reference exists.** GONPD aims to be that reference.
- The owner is an oral nicotine product R&D professional. The site serves R&D, industry, research and regulatory readers.
- It is an **information resource, not a shop.** Its value comes from accuracy, traceability and neutrality, not from the number of records.

## HOW: the way we work

### Tech stack

- **Next.js 16** (App Router), React 19, TypeScript, Tailwind CSS 4, lucide-react icons
- **Static export** (`output: "export"` in `next.config.ts`). There is no server, no database and no login. All data is TypeScript/JSON in `src/data/`.
- **Package manager:** pnpm (CI uses pnpm 10 and Node 22).
- **Next.js 16 has breaking changes.** Before writing Next.js code, read the guide in `node_modules/next/dist/docs/` (see the note in AGENTS.md).

### Commands

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck
pnpm lint
pnpm build
node scripts/audit-catalog.cjs                 # provenance, IDs, aliases, images, families
node scripts/audit-country-classification.cjs  # brand-country aggregation and Asian records
```

`scripts/check-catalog-ui.cjs` checks a running preview with Playwright (it needs `CATALOG_PREVIEW_URL`).

**On this Mac:** Node.js 26 and pnpm 12 are installed with Homebrew, which is newer than CI (Node 22, pnpm 10). Install with `pnpm install --frozen-lockfile` so the lockfile isn't rewritten. After installing any tool, delete its downloaded installer packages (`brew cleanup --prune=all -s`). Earlier work was done with Codex on Windows, so ignore the Windows-only pnpm path in README.md.

### Where things live

| Path | Contents |
|---|---|
| `src/types/catalog.ts` | Data model: `Product`, `Brand`, `Manufacturer`, `Market`, `Source`, `NicotineSpecification`. Specs are a union keyed by `specifications.kind`. |
| `src/data/products.ts` | Core catalog (the original records) |
| `src/data/catalog-expansion.ts`, `catalog-supplement.ts`, `catalog-enrichment.ts`, `asian-products.ts`, `traditional-products.ts` | Later research batches |
| `src/data/categories.ts`, `formats.ts`, `countries.ts`, `regions.ts` | Taxonomy: 6 categories, 11 physical forms, country registry |
| `src/data/product-image-manifest.json`, `product-images.ts` | Image evidence per variant |
| `src/lib/` | Search/filter, product families, i18n, validation (`validateVerifiedProduct()`) |
| `src/app/` | Routes (`/products`, `/brands`, `/countries`, `/categories`, `/formats`, `/compare`, `/news`, `/about`) |
| `scripts/research/` | Dated research notes and baselines. Record every research round here. |

### Data rules (most important)

1. **Real products only, with sources.** Each record needs a source URL, source type, access date and verification date. No source, no record.
2. **Prefer primary sources:** manufacturer or brand sites, then regulators and government registers, then scientific papers, then major retailers. Use news and forums only to discover leads.
3. **Never guess or infer.** Leave unknown values blank or mark them as unconfirmed. Don't infer strength, nicotine origin, manufacturer, brand country or market status from a category or a sibling product. Mark unconfirmed records `verificationStatus: "pending"`.
4. **Keep these as separate fields:** category vs. physical form vs. flavour; brand country vs. manufacturing location vs. sales markets; lifecycle vs. market status. Market status is recorded for each product–country pair.
5. **Variants:** one record per distinct flavour, strength, size or series. Multipacks and artwork changes are not new variants. Former names become aliases, not duplicates.
6. **Images:** show only an image that matches that exact variant, with its `imageSource`. Otherwise show the placeholder. Never generate or invent packaging.
7. **Replace rather than pile up.** Deleting does not need the owner's OK. When something new is clearly better than the old version (code, data, files, docs), delete the old one, and say what was removed in the session summary. If a removed product or brand page had a public URL, point it at its replacement where possible.
8. After any data change, run both audit scripts plus `pnpm typecheck`, `pnpm lint` and `pnpm build`, and record the research round in `scripts/research/`.

### Content rules

- Neutral, factual tone in both languages. **No health claims, no "safer than smoking" claims, no marketing language, no purchase or affiliate links.**
- Every user-facing string needs both `en` and `zh` text.

### Git and publishing

- **Pushing to `main` publishes the live site automatically** through GitHub Actions to GitHub Pages. So:
  - **Ask the owner before pushing.** The owner decides whether a change goes straight to `main` or through a branch (`claude/<topic>-<date>`) and a pull request.
  - Before pushing anything that changes the site, make sure `pnpm build` and both audits pass.
- Bump the version in `package.json` (and where the site displays it) for each release.
- Keep README.md in step with the real numbers and features.

### Session workflow

1. Read this file and **Current status**, then pull the latest `main`.
2. Agree on the session's goal with the owner.
3. Work on a branch, run the checks, and preview locally.
4. Update README.md, `scripts/research/` and **Current status** before finishing.

## Roadmap (refine with the owner)

- [x] Set up the local toolchain on this Mac (Node, pnpm) and confirm `pnpm build` and both audits pass
- [ ] Clear the 4 lint warnings (unused code in `formats/[slug]/page.tsx` and `data/products.ts`)
- [ ] Find matching images for the 347 variants that still use placeholders (416 have matched photos)
- [ ] Turn `pending` research records into verified ones and fill missing specs from primary sources
- [ ] Confirm brand countries for the ~58 brands that are still unconfirmed
- [ ] Expand coverage by region and format, with gaps tracked in `scripts/research/`
- [ ] Consider an adults-only notice or age gate (there is no age gate today; the footer has the disclaimer)
- [ ] Later, once the content workflow is stable: consider moving the data to a database

## Current status

- **2026-10-23:** Connected GitHub (`gh` CLI, signed in as `Sennlyn`) and cloned the repo into this folder on `main` (v1.9.2, last deploy 2026-10-20 succeeded). Wrote this guide. Changed the AGENTS.md deletion rule: the owner no longer needs to approve deletions. Installed Node 26 and pnpm 12 and deleted the installer downloads. `pnpm typecheck`, `pnpm build` and both audits pass; lint has 0 errors and 4 warnings. Nothing committed yet.
