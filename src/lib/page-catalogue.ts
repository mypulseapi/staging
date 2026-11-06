/**
 * B2: every page as an item with attributes.
 *
 * The engine ranks items against inferred requirements. On a storefront an item is a product; here
 * it is a page. Without this, B1's `page_view` signals carry a route string and nothing else, and
 * the engine correctly reports them as matching nothing.
 *
 * The `decides` vocabulary is A1's pattern applied to a content site, documented in
 * `ODIN/engine/REQUIREMENTS-CONTENT.md`. It is the second instance of a requirement vocabulary and
 * deliberately shares the shape of the first: a requirement belongs to the visitor's task, not to
 * the visitor.
 *
 * Kept in sync with the filesystem by `scripts/check-page-catalogue.mjs`, which runs in `build`.
 * A page added without an entry fails the build rather than silently emitting an unattributed view.
 */

/** Who the page is written for. `any` means it genuinely serves all of them, not that nobody chose. */
export type Audience =
  | "merchant"
  | "developer"
  | "investor"
  | "candidate"
  | "any";

/** Which part of the product it concerns. `none` for company and legal pages. */
export type ProductArea =
  | "audit"
  | "verification"
  | "returns"
  | "promotions"
  | "monitor"
  | "api"
  | "search"
  | "recommendations"
  | "pages"
  | "studio"
  | "none";

/** How far down the funnel the page sits. Depth is not quality; a legal page is deep and necessary. */
export type Depth =
  | "entry"
  | "explainer"
  | "reference"
  | "proof"
  | "legal"
  | "transactional";

/**
 * What a visitor to a B2B intent-layer site is trying to decide.
 *
 * Nine requirements, from `ODIN/engine/REQUIREMENTS-CONTENT.md`. A page `decides` the ones it can
 * actually resolve, which is usually one or two. Listing everything a page mentions would make the
 * field useless, and is the content equivalent of a catalogue tagging every product for every
 * persona.
 */
export type ContentRequirement =
  | "what-it-does"
  | "does-it-fit-me"
  | "how-it-works"
  | "what-it-costs"
  | "how-to-integrate"
  | "is-it-proven"
  | "is-it-safe"
  | "who-are-they"
  | "how-do-i-start";

export interface PageItem {
  /** Route with the locale prefix stripped, matching `routeOf()` in PulseAnalytics. */
  route: string;
  audience: Audience;
  area: ProductArea;
  depth: Depth;
  decides: ContentRequirement[];
}

/**
 * Dynamic segments are kept as their literal Next.js form (`[slug]`).
 *
 * The alternative, an entry per blog post, would make this file a second copy of the content and
 * guarantee it goes stale. A visitor on `/blog/anything` is deciding the same thing.
 */
export const PAGE_CATALOGUE: readonly PageItem[] = [
  // Entry
  // Test My Catalogue since 2026-11-04 (owner): the store-address test, Pingdom-style.
  {
    route: "/",
    // Everyone lands here, whoever they are: a landing is not evidence of audience.
    audience: "any",
    area: "audit",
    depth: "entry",
    decides: ["does-it-fit-me", "how-do-i-start"],
  },
  // The page that was the homepage until 2026-11-04.
  {
    route: "/overview",
    audience: "any",
    area: "none",
    depth: "explainer",
    decides: ["what-it-does", "how-it-works"],
  },
  // Temporary: the converted home page, rendered alongside the current one so the two can be
  // compared before anything a visitor sees changes. noindex, and deleted once it lands on /.
  {
    route: "/preview-home",
    audience: "any",
    area: "none",
    depth: "entry",
    decides: ["what-it-does", "does-it-fit-me"],
  },

  // Product
  {
    route: "/product",
    audience: "merchant",
    area: "none",
    depth: "explainer",
    decides: ["what-it-does"],
  },
  {
    route: "/product/decision-audit",
    audience: "merchant",
    area: "audit",
    depth: "explainer",
    decides: ["what-it-does", "how-do-i-start"],
  },
  {
    route: "/product/decision-verification",
    audience: "merchant",
    area: "verification",
    depth: "explainer",
    decides: ["what-it-does", "is-it-proven"],
  },
  {
    route: "/product/visual-evidence",
    audience: "merchant",
    area: "audit",
    depth: "explainer",
    decides: ["what-it-does", "how-it-works"],
  },
  {
    route: "/product/return-verification",
    audience: "merchant",
    area: "returns",
    depth: "explainer",
    decides: ["what-it-does", "how-it-works"],
  },
  {
    route: "/product/promotion-audit",
    audience: "merchant",
    area: "promotions",
    depth: "explainer",
    decides: ["what-it-does", "how-it-works"],
  },
  {
    route: "/product/decision-monitor",
    audience: "merchant",
    area: "monitor",
    depth: "explainer",
    decides: ["what-it-does"],
  },
  {
    route: "/product/decision-api",
    audience: "developer",
    area: "api",
    depth: "explainer",
    decides: ["what-it-does", "how-to-integrate"],
  },
  {
    route: "/product/search",
    audience: "merchant",
    area: "search",
    depth: "explainer",
    decides: ["what-it-does", "how-it-works"],
  },
  {
    route: "/product/recommendations",
    audience: "merchant",
    area: "recommendations",
    depth: "explainer",
    decides: ["what-it-does", "how-it-works"],
  },
  {
    route: "/product/pages",
    audience: "merchant",
    area: "pages",
    depth: "explainer",
    decides: ["what-it-does"],
  },
  {
    route: "/product/merchandising-studio",
    audience: "merchant",
    area: "studio",
    depth: "explainer",
    decides: ["what-it-does"],
  },

  // Why: the mechanism and its limits
  {
    route: "/why",
    audience: "any",
    area: "none",
    depth: "explainer",
    decides: ["how-it-works"],
  },
  {
    route: "/why/method",
    audience: "any",
    area: "none",
    depth: "reference",
    decides: ["how-it-works", "is-it-proven"],
  },
  {
    route: "/why/limits",
    audience: "any",
    area: "none",
    depth: "proof",
    decides: ["is-it-proven", "is-it-safe"],
  },
  {
    route: "/why/compare",
    audience: "merchant",
    area: "none",
    depth: "proof",
    decides: ["does-it-fit-me", "is-it-proven"],
  },
  {
    route: "/why/audit",
    audience: "any",
    area: "audit",
    depth: "proof",
    decides: ["is-it-proven", "how-it-works"],
  },
  // The catalogue measurement: how much of what a catalogue records the photograph already shows.
  {
    route: "/research/photographs",
    audience: "any",
    area: "audit",
    depth: "proof",
    decides: ["is-it-proven", "how-it-works"],
  },

  // The old address of the photograph study and the Research menu item; redirects to /research.
  {
    route: "/visual-evidence",
    audience: "any",
    area: "none",
    depth: "proof",
    decides: ["is-it-proven"],
  },
  // Research, product by product; the photograph study above is one of its entries.
  {
    route: "/research",
    audience: "any",
    area: "none",
    depth: "proof",
    decides: ["is-it-proven"],
  },

  // Use cases and industries
  {
    route: "/use-cases/seo-aeo",
    audience: "merchant",
    area: "pages",
    depth: "explainer",
    decides: ["does-it-fit-me"],
  },
  {
    route: "/use-cases/time-to-market",
    audience: "merchant",
    area: "none",
    depth: "explainer",
    decides: ["does-it-fit-me"],
  },
  {
    route: "/use-cases/promotions-that-pay",
    audience: "merchant",
    area: "none",
    depth: "explainer",
    decides: ["does-it-fit-me"],
  },
  {
    route: "/use-cases/fixable-returns",
    audience: "merchant",
    area: "none",
    depth: "explainer",
    decides: ["does-it-fit-me"],
  },
  {
    route: "/industries",
    audience: "merchant",
    area: "none",
    depth: "entry",
    decides: ["does-it-fit-me"],
  },
  {
    route: "/industries/[slug]",
    audience: "merchant",
    area: "none",
    depth: "explainer",
    decides: ["does-it-fit-me"],
  },
  {
    route: "/agents/[slug]",
    audience: "developer",
    area: "api",
    depth: "explainer",
    decides: ["does-it-fit-me", "how-to-integrate"],
  },

  // Commercial
  // Test My Catalogue: a store's public pages tested against buying requirements (2026-11-04).
  {
    route: "/test-my-catalogue",
    audience: "merchant",
    area: "audit",
    depth: "transactional",
    decides: ["how-do-i-start"],
  },
  // The investor walkthrough of the whole journey on a sample store (2026-11-06), noindex.
  {
    route: "/mvp",
    audience: "any",
    area: "audit",
    depth: "explainer",
    decides: ["does-it-fit-me"],
  },
  {
    route: "/pricing",
    audience: "merchant",
    area: "none",
    depth: "transactional",
    decides: ["what-it-costs", "how-do-i-start"],
  },
  {
    route: "/contact",
    audience: "any",
    area: "none",
    depth: "transactional",
    decides: ["how-do-i-start"],
  },

  // Developer
  {
    route: "/docs", // forwards to the developer handbook since 2026-10-27
    audience: "developer",
    area: "api",
    depth: "reference",
    decides: ["how-to-integrate"],
  },
  {
    route: "/integrations",
    audience: "developer",
    area: "api",
    depth: "reference",
    decides: ["how-to-integrate", "does-it-fit-me"],
  },
  {
    route: "/status",
    audience: "developer",
    area: "api",
    depth: "reference",
    decides: ["is-it-safe"],
  },

  // Company
  {
    route: "/about",
    audience: "any",
    area: "none",
    depth: "explainer",
    decides: ["who-are-they"],
  },
  {
    route: "/opensource",
    audience: "developer",
    area: "none",
    depth: "explainer",
    decides: ["is-it-safe", "how-do-i-start"],
  },
  {
    route: "/blog",
    audience: "any",
    area: "none",
    depth: "explainer",
    decides: ["how-it-works", "who-are-they"],
  },
  {
    route: "/blog/[slug]",
    audience: "any",
    area: "none",
    depth: "explainer",
    decides: ["how-it-works"],
  },
  {
    route: "/careers",
    audience: "candidate",
    area: "none",
    depth: "explainer",
    decides: ["who-are-they"],
  },
  {
    route: "/careers/[id]",
    audience: "candidate",
    area: "none",
    depth: "transactional",
    decides: ["who-are-they"],
  },

  // Legal and trust
  {
    route: "/privacy",
    audience: "any",
    area: "none",
    depth: "legal",
    decides: ["is-it-safe"],
  },
  {
    route: "/terms",
    audience: "any",
    area: "none",
    depth: "legal",
    decides: ["is-it-safe"],
  },
  {
    route: "/cookies",
    audience: "any",
    area: "none",
    depth: "legal",
    decides: ["is-it-safe"],
  },
  {
    route: "/gdpr",
    audience: "any",
    area: "none",
    depth: "legal",
    decides: ["is-it-safe"],
  },

  // Auth
  {
    route: "/signin",
    audience: "any",
    area: "none",
    depth: "transactional",
    decides: ["how-do-i-start"],
  },
  {
    route: "/signup",
    audience: "any",
    area: "none",
    depth: "transactional",
    decides: ["how-do-i-start"],
  },
  {
    route: "/forgot-password",
    audience: "any",
    area: "none",
    depth: "transactional",
    decides: [],
  },
  {
    route: "/reset-password",
    audience: "any",
    area: "none",
    depth: "transactional",
    decides: [],
  },
  {
    route: "/verify-email",
    audience: "any",
    area: "none",
    depth: "transactional",
    decides: [],
  },
];

const BY_ROUTE = new Map(PAGE_CATALOGUE.map((p) => [p.route, p]));

/**
 * Resolve a live pathname to its catalogue entry.
 *
 * Exact match first, then the dynamic patterns, so `/blog/[slug]` cannot shadow a real `/blog/rss`
 * page if one is ever added above it.
 */
export function lookupPage(route: string): PageItem | undefined {
  const exact = BY_ROUTE.get(route);
  if (exact) return exact;

  for (const item of PAGE_CATALOGUE) {
    if (!item.route.includes("[")) continue;
    const pattern = new RegExp(
      "^" +
        item.route
          .replace(/\[\.\.\..+?\]/g, ".+")
          .replace(/\[.+?\]/g, "[^/]+") +
        "$",
    );
    if (pattern.test(route)) return item;
  }
  return undefined;
}

/**
 * The signals a page view emits.
 *
 * One signal per attribute rather than one compound signal, because the engine matches on
 * `type:value` pairs and a compound string would match nothing. `decides` fans out: a page that
 * resolves two requirements is evidence for both.
 */
export function signalsForPage(
  route: string,
): Array<{ type: string; value: string }> {
  const page = lookupPage(route);
  if (!page) return [{ type: "page_view", value: route }];

  return [
    { type: "page_view", value: page.route },
    { type: "content_audience", value: page.audience },
    { type: "content_area", value: page.area },
    { type: "content_depth", value: page.depth },
    ...page.decides.map((d) => ({ type: "content_requirement", value: d })),
  ];
}
