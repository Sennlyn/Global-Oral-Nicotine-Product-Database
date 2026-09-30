# Catalog research notes — 2026-09-30

## Scope and evidence

Product identity may be established by regulator documents, scientific papers,
government reports, manufacturer records and historical archives. A currently
accessible official shop is not required for a historical record. Present sales
and product-country legal market evidence remain separate.

This round adds nine records: Copenhagen Classic Snuff, America's Best Chew
Original Blend, Ariva Wintergreen, Stonewall Java, Camel Orbs Fresh, Camel Strips
Fresh, Camel Sticks Mellow, Marlboro Cool Mint Tobacco Stick and Skoal Original
Tobacco Stick. Seven are explicitly historical records. Red Man is an alias of
the renamed Original Blend record, not a duplicate product.

## Exact image matching

- Copenhagen: exact Snuff UPC 00073100001079 from Super 1 Foods, retained with
  2022 anniversary packaging. Not a Long Cut or pouch photo.
- America's Best: retailer Original Blend display carton, six 3 oz bags. Loose
  leaf is inside retail packaging; the bag is not an oral portion.
- Seven historical records: unchanged embedded photograph from NCI/CDC,
  *Smokeless Tobacco and Public Health* (2014), figure 3-2, printed page 82,
  PDF page 108. Photo credit: Clifford Watson, CDC. Original image 1210 × 1568.
  Each record saves its named package rectangle; the website clips that rectangle
  in SVG, without generating or modifying the original package photograph.

Sources and exact framing coordinates are stored in
`src/data/traditional-products.ts`. The downloaded working PDFs and extraction
outputs remain local and ignored by Git.

## Dated measurements

Lawler et al. (2013), table 2, provides exact named variant measurements for
Ariva Wintergreen, Stonewall Java and Camel Orbs Fresh. The acquisition window
is May 2007–May 2009; individual acquisition dates are not given. Nicotine is
reported on a wet-weight basis (n=3), pH in an aqueous suspension (n=2), and
moisture as a single measurement. These values are displayed in a separate
historical measurement section and are not copied into current pack strengths.

<https://pmc.ncbi.nlm.nih.gov/articles/PMC5659123/>

No category averages, other-flavour values, cooling intensity or sweetness
ratings have been substituted for unavailable exact-variant data. Current
manufacturing sites are not inferred from brand countries. FDA's pre-existing
product market basis for Copenhagen is separate from modified-risk claim
authorization. A Camel Mint regulatory decision is not assigned to Fresh or
Mellow without an exact correspondence.

## Checks

`node scripts/audit-catalog.cjs` checks identities, duplicate names, joins,
photo attribution/framing, listing evidence, historical metadata and aliases.
Monthly research submits candidates for review and does not edit or publish.
