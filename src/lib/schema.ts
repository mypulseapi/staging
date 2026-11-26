import { COMPANY_NAME, SITE } from "./site";
import { SAME_AS } from "./social";
import { img } from "./cdn";
import { localeMeta } from "@/i18n/locales";

/**
 * One JSON-LD graph per page, assembled here.
 *
 * The standard (seo_and_aeo_engineering_standard.md section 5.3) requires exactly one
 * `<script type="application/ld+json">` per document holding a single `@graph`. The reason is
 * not tidiness: nodes in separate blocks cannot reference each other by `@id`, so the
 * relationships an answer engine uses to resolve "who published this" are lost.
 *
 * Before this, the layout emitted an Organization and WebSite graph and 66 pages emitted a second
 * block of their own, which is the failure the rule describes.
 *
 * Every page therefore builds its whole graph through `buildGraph`, and the layout emits none.
 */

export interface GraphNode {
  "@type": string | string[];
  "@id"?: string;
  [key: string]: unknown;
}

export interface Crumb {
  /** The navigation label, not the SERP title: "Decision Audit", not the full headline. */
  name: string;
  /** Locale-relative, e.g. "/product/decision-audit". */
  path: string;
}

const ORG_ID = `${SITE.www}/#organization`;
const SITE_ID = `${SITE.www}/#website`;

/** Absolute URL for a locale-relative path. `/en`, `/en/pricing`. */
export const pageUrl = (locale: string, path = "") =>
  `${SITE.www}/${locale}${path === "/" ? "" : path}`;

/**
 * The organization, repeated in full on every page because each page's graph has to stand alone.
 *
 * `logo` is an ImageObject with its own `@id` rather than a bare string: a bare URL cannot be
 * referenced by the WebSite or Article nodes that need to point at it.
 */
function organization(): GraphNode {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Pulse",
    legalName: COMPANY_NAME,
    url: SITE.www,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE.www}/#logo`,
      url: img("brand/logo.png"),
      caption: "Pulse",
    },
    description:
      // The entity definition from the SEO/AEO audit (2026-10-26); the home page and layout carry the same sentence.
      "Pulse is commerce decision intelligence for product data. It measures whether a catalogue holds the evidence shoppers and AI agents need to make product decisions, identifies the gaps worth fixing, and verifies the repair.",
    // From the same place the footers link, so `sameAs` cannot claim a profile we do not link.
    sameAs: SAME_AS,
  };
}

function website(locale: string): GraphNode {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    name: "Pulse",
    url: SITE.www,
    publisher: { "@id": ORG_ID },
    inLanguage: localeMeta(locale).tag,
  };
}

/**
 * Position 1 is always the home page and the last item is the current page.
 *
 * Any crumb whose URL already appears is dropped, so a section index renders `Home > Product`
 * rather than `Home > Product > Product`.
 */
function breadcrumbList(
  locale: string,
  url: string,
  crumbs: Crumb[],
): GraphNode {
  const items = [{ name: "Home", path: "" }, ...crumbs];
  const seen = new Set<string>();
  const unique = items.filter((c) => {
    const u = pageUrl(locale, c.path);
    if (seen.has(u)) return false;
    seen.add(u);
    return true;
  });

  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: unique.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: pageUrl(locale, c.path),
    })),
  };
}

export interface GraphOptions {
  locale: string;
  /** Locale-relative path, "" for the home page. */
  path?: string;
  /** Navigation trail, excluding Home and excluding the page itself if it is a section index. */
  crumbs?: Crumb[];
  /** Page-specific nodes: Article, FAQPage, SoftwareApplication, JobPosting. */
  nodes?: GraphNode[];
}

/**
 * Build the single `@graph` for a page.
 *
 * The home page gets no BreadcrumbList, because a one-item trail is noise.
 */
export function buildGraph({
  locale,
  path = "",
  crumbs = [],
  nodes = [],
}: GraphOptions) {
  const url = pageUrl(locale, path);
  const isHome = path === "" || path === "/";

  const webPage: GraphNode = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: localeMeta(locale).tag,
    ...(isHome ? {} : { breadcrumb: { "@id": `${url}#breadcrumb` } }),
    // Point at the page's own primary entity when it declares one, so an answer engine knows
    // which node the page is actually about rather than guessing from order.
    ...(nodes[0]
      ? {
          mainEntity: {
            "@id":
              (nodes[0]["@id"] as string | undefined) ??
              `${url}#${String([].concat(nodes[0]["@type"] as never)[0]).toLowerCase()}`,
          },
        }
      : {}),
  };

  /*
   * A page node may arrive without an `@id`, and it needs one: the WebPage above references the
   * primary entity by id, and a node nothing can point at is invisible to the relationships an
   * answer engine resolves. Derived from the type so a page passes only its content.
   */
  const identified = nodes.map((n) =>
    n["@id"]
      ? n
      : {
          ...n,
          "@id": `${url}#${String([].concat(n["@type"] as never)[0]).toLowerCase()}`,
        },
  );

  const graph: GraphNode[] = [
    organization(),
    website(locale),
    webPage,
    ...(isHome ? [] : [breadcrumbList(locale, url, crumbs)]),
    ...identified,
  ];

  // A duplicate @id silently drops a node, so it is worth failing the build instead.
  const ids = graph.map((n) => n["@id"]).filter(Boolean) as string[];
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length > 0) {
    throw new Error(
      `Duplicate JSON-LD @id on ${url}: ${[...new Set(dupes)].join(", ")}`,
    );
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/**
 * Breadcrumb labels, by route prefix.
 *
 * The standard says the crumb label is the navigation label rather than the SERP title:
 * "Decision Audit", not "Decision Audit: which product data to fix first". Those live in the
 * header menu (`shell` in messages/designed.*.json), but the menu does not cover legal
 * pages, `/why/*` or `/use-cases/*`, so the trail would break exactly where the hierarchy is
 * deepest. One explicit map covers every route instead, and `check-page-catalogue.mjs` already
 * fails the build when a route exists without a catalogue entry.
 *
 * Bilingual, because the page declares `inLanguage` and an English trail on a Vietnamese page
 * contradicts it.
 */
const CRUMB_LABELS: Record<string, { en: string; vi: string }> = {
  "/product": { en: "Product", vi: "Sản phẩm" },
  "/product/decision-audit": { en: "Decision Audit", vi: "Decision Audit" },
  "/product/decision-verification": {
    en: "Decision Verification",
    vi: "Decision Verification",
  },
  "/product/return-verification": {
    en: "Return Verification",
    vi: "Return Verification",
  },
  "/product/visual-evidence": {
    en: "Visual Evidence",
    vi: "Visual Evidence",
  },
  "/product/promotion-audit": {
    en: "Promotion Audit",
    vi: "Promotion Audit",
  },
  "/product/decision-monitor": {
    en: "Decision Monitor",
    vi: "Decision Monitor",
  },
  "/product/decision-api": { en: "Decision API", vi: "Decision API" },
  "/product/search": { en: "Search", vi: "Tìm kiếm" },
  "/product/recommendations": { en: "Recommendations", vi: "Gợi ý" },
  "/product/pages": { en: "Pages", vi: "Trang" },
  "/product/merchandising-studio": {
    en: "Merchandising Studio",
    vi: "Merchandising Studio",
  },
  "/why": { en: "Why Pulse", vi: "Vì sao Pulse" },
  "/why/method": { en: "Method", vi: "Phương pháp" },
  "/why/limits": { en: "Limits", vi: "Giới hạn" },
  "/why/compare": { en: "Compare", vi: "So sánh" },
  "/why/audit": { en: "The audit", vi: "Bản kiểm tra" },
  "/use-cases": { en: "Use cases", vi: "Trường hợp sử dụng" },
  "/use-cases/seo-aeo": { en: "SEO and AEO", vi: "SEO và AEO" },
  "/use-cases/seo-beyond-google": { en: "SEO beyond Google", vi: "SEO ngoài Google" },
  "/use-cases/time-to-market": { en: "Time to market", vi: "Thời gian ra mắt" },
  "/use-cases/promotions-that-pay": {
    en: "Promotions that pay",
    vi: "Khuyến mãi có lãi",
  },
  "/use-cases/fixable-returns": {
    en: "Fixable returns",
    vi: "Hàng bị trả có thể sửa",
  },
  "/industries": { en: "Industries", vi: "Ngành hàng" },
  "/agents": { en: "For AI Agents", vi: "Cho tác tử AI" },
  "/agents/shopping-assistants": {
    en: "Shopping Assistants",
    vi: "Trợ lý mua sắm",
  },
  "/agents/procurement": { en: "Procurement Agents", vi: "Tác tử mua hàng" },
  "/agents/travel": { en: "Travel and Booking", vi: "Du lịch và đặt chỗ" },
  "/agents/coding-agents": { en: "Coding Agents", vi: "Tác tử lập trình" },
  "/pricing": { en: "Pricing", vi: "Bảng giá" },
  "/contact": { en: "Contact", vi: "Liên hệ" },
  "/docs": { en: "Documentation", vi: "Tài liệu" },
  "/integrations": { en: "Integrations", vi: "Tích hợp" },
  "/status": { en: "Status", vi: "Trạng thái" },
  "/about": { en: "About us", vi: "Về chúng tôi" },
  "/opensource": { en: "Opensource", vi: "Mã nguồn mở" },
  "/blog": { en: "Notes", vi: "Ghi chép" },
  "/careers": { en: "Careers", vi: "Tuyển dụng" },
  "/privacy": { en: "Privacy", vi: "Quyền riêng tư" },
  "/terms": { en: "Terms", vi: "Điều khoản" },
  "/cookies": { en: "Cookies", vi: "Cookie" },
  "/gdpr": { en: "GDPR", vi: "GDPR" },
};

/**
 * The trail for a path, excluding Home, which `buildGraph` prepends.
 *
 * `leaf` names the final crumb for a dynamic route, where the label is the item's own title and
 * cannot be in a static map: an industry, a note, a job. Without it such a page would end on a
 * slug.
 *
 * A `/use-cases` segment has no page of its own; it is kept in the trail because dropping it
 * would claim `/use-cases/seo-aeo` sits directly under Home, which is not where it is.
 */
export function crumbsFor(
  locale: string,
  path: string,
  leaf?: string,
): Crumb[] {
  const lang = locale === "vi" ? "vi" : "en";
  const segments = path.split("/").filter(Boolean);
  const crumbs: Crumb[] = [];

  segments.forEach((_, i) => {
    const prefix = "/" + segments.slice(0, i + 1).join("/");
    const known = CRUMB_LABELS[prefix];
    const isLast = i === segments.length - 1;

    if (known) crumbs.push({ name: known[lang], path: prefix });
    else if (isLast && leaf) crumbs.push({ name: leaf, path: prefix });
    // An unknown mid-path segment is dropped rather than rendered as a slug. It would be a route
    // with no catalogue entry, which check-page-catalogue.mjs fails the build for anyway.
  });

  return crumbs;
}
