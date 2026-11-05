#!/usr/bin/env node
/**
 * The automated gates from seo_and_aeo_engineering_standard.md section 8.
 *
 * It reads the exported HTML in `out/` rather than the source, because every rule here is about
 * what a crawler receives: a canonical assembled correctly in TypeScript and dropped by a layout
 * is still a missing canonical. Run it after `pnpm build`.
 *
 * Rules that cannot be checked here are not checked anywhere, which is the point of section 8:
 * the ones left to review drift within two sprints.
 *
 *   node scripts/check-seo.mjs           report, exit 1 on any failure
 *   node scripts/check-seo.mjs --warn    report, always exit 0
 */
import { readFileSync, existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

const OUT = "out";
const WARN_ONLY = process.argv.includes("--warn");

/* Pages that are deliberately not indexed carry no schema and need no canonical (section 2.4). */
const NOINDEX =
  /\/(signin|signup|forgot-password|reset-password|verify-email)\.html$/;
/* The root redirect documents (`/`, `/opensource`) and Next's internal 404 shell are not pages in their own right. */
const NOT_A_PAGE = /^(index|opensource|404|_not-found)\.html$/;

const failures = [];
const fail = (file, rule, detail) => failures.push({ file, rule, detail });

/*
 * Staging (NEXT_PUBLIC_NOINDEX=true) says noindex on every page, so the meta tag no longer tells a
 * page meant for search from one that is not. There the sitemap does: it lists the indexable pages,
 * and each is checked exactly as production will serve it.
 */
const STAGING = process.env.NEXT_PUBLIC_NOINDEX === "true";
const listed = new Set(
  STAGING && existsSync(join(OUT, "sitemap.xml"))
    ? [...readFileSync(join(OUT, "sitemap.xml"), "utf8").matchAll(/<loc>(.*?)<\/loc>/g)].map(
        (m) => (m[1].replace(/^https?:\/\/[^/]+\/?/, "") || "index") + ".html",
      )
    : [],
);

/*
 * Reported, but not a gate.
 *
 * Section 8 separates the rules that block from the ones that get reviewed, and image format is
 * the second kind: a PNG that should be a WebP costs bytes, it does not break the page or hide it
 * from a crawler. Making it fail would mean either converting artwork on someone else's behalf or
 * watching the next person reach for `--warn` on the whole suite to get past it, which would take
 * the real gates down with it.
 */
const warnings = [];
const warn = (file, rule, detail) => warnings.push({ file, rule, detail });

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1] : null;
};

/** Entity-decode just enough to measure a description honestly. */
const decode = (s) =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const files = (await walk(OUT)).sort();
const titles = new Map();
const descs = new Map();
const canons = new Map();
let indexable = 0;

for (const f of files) {
  const rel = relative(OUT, f);
  if (NOT_A_PAGE.test(rel)) continue;
  const html = readFileSync(f, "utf8");
  const noindex =
    NOINDEX.test("/" + rel) ||
    (STAGING ? !listed.has(rel) : /content="noindex/.test(html));

  const title = pick(html, /<title>(.*?)<\/title>/s);
  const desc = pick(html, /<meta name="description" content="(.*?)"/s);
  const canonical = pick(html, /<link rel="canonical" href="(.*?)"/);
  const blocks = html.match(/<script type="application\/ld\+json">/g) ?? [];
  const h1s = html.match(/<h1[\s>]/g) ?? [];

  /* --- every page, indexed or not ------------------------------------- */
  if (!title) fail(rel, "title", "missing");
  else if (decode(title).length > 60)
    fail(rel, "title", `${decode(title).length} chars, over 60`);

  if (h1s.length !== 1)
    fail(rel, "h1", `${h1s.length} found, expected exactly 1`);

  /*
   * The page is actually in the page.
   *
   * Every other rule here reads the head, and all of them passed on an export where 112 of 118
   * pages had a `<main>` holding the single word "Loading" and nothing else: a `loading.tsx`
   * had wrapped each route in a Suspense boundary that `output: export` resolved to the
   * fallback. Perfect titles, canonicals and JSON-LD on a site with no content (BUG-25).
   *
   * A crawler reads the body, and so does a visitor whose JavaScript never arrived. 200
   * characters sits well under the shortest real page here and well above any skeleton.
   *
   * Indexable pages only. The auth pages are deliberately a heading and a form, 61 characters
   * on `reset-password`, and nothing crawls them.
   */
  if (!noindex) {
    const main = pick(html, /<main[^>]*>([\s\S]*?)<\/main>/i);
    const mainText = decode((main ?? "").replace(/<[^>]+>/g, " "))
      .replace(/\s+/g, " ")
      .trim();
    if (!main) fail(rel, "main-content", "no <main> element");
    else if (mainText.length < 200) {
      fail(
        rel,
        "main-content",
        `${mainText.length} chars of text: ${JSON.stringify(mainText.slice(0, 40))}`,
      );
    }
  }
  /* --- every image is named, sized and in a modern format (section 4.4) ---
   *
   * Three faults, and the third is the one that hides. An `<img>` with no `alt` at all is
   * invisible to a crawler and to a screen reader; an `<img>` with neither dimensions nor a
   * reserved box shifts the layout as it loads; and a raster served as PNG costs a visitor
   * bytes the standard says to spend on WebP or AVIF.
   *
   * `alt=""` is not a fault. It is the correct marking for a decorative image, and this site
   * uses it deliberately: the dark-theme logo and the hover duplicate of each team portrait are
   * both `aria-hidden` copies of something already named next to them. Flagging those would
   * teach the next person to silence the rule rather than read it.
   *
   * Neither is a missing `width`/`height` on a `fill` image. Next drops both by design there and
   * positions the image absolutely, so the parent's `aspect-ratio` reserves the space and the
   * layout does not move. The check looks for the reserved box, not for the attributes.
   */
  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    const attr = (n) => tag.match(new RegExp(`${n}="([^"]*)"`, "i"))?.[1];
    const src = (attr("src") ?? "").replace(/\?.*$/, "");
    const short = src.replace(/^https?:\/\/[^/]+\//, "");

    if (attr("alt") === undefined) fail(rel, "image-alt", `no alt: ${short}`);

    const sized = attr("width") && attr("height");
    const filled = /\bposition:\s*absolute/i.test(attr("style") ?? "");
    if (!sized && !filled)
      fail(rel, "image-size", `no width/height and not filled: ${short}`);

    if (/\.(png|jpe?g)$/i.test(src) && !/favicon|apple-touch-icon/i.test(src)) {
      warn(rel, "image-format", `serve WebP or AVIF: ${short}`);
    }
  }

  /* --- noindex pages carry no schema (section 2.4) --------------------- */
  if (noindex) {
    if (blocks.length > 0)
      fail(rel, "schema-on-noindex", `${blocks.length} JSON-LD block(s)`);
    continue;
  }

  indexable++;

  if (!desc) fail(rel, "description", "missing");
  else {
    const n = decode(desc).length;
    if (n < 140 || n > 160)
      fail(rel, "description", `${n} chars, outside 140-160`);
  }

  if (!canonical) fail(rel, "canonical", "missing");
  else if (!canonical.startsWith("https://"))
    fail(rel, "canonical", `not absolute https: ${canonical}`);

  if (!/<meta name="robots"/.test(html)) fail(rel, "robots", "no robots meta");
  if (!/og:title/.test(html)) fail(rel, "open-graph", "no og:title");
  if (!/twitter:card/.test(html)) fail(rel, "twitter", "no twitter:card");

  /* --- one graph per page (section 5.3) -------------------------------- */
  if (blocks.length === 0) fail(rel, "json-ld", "no JSON-LD block");
  else if (blocks.length > 1)
    fail(rel, "json-ld", `${blocks.length} blocks, expected exactly 1`);
  else {
    const raw = pick(
      html,
      /<script type="application\/ld\+json">(.*?)<\/script>/s,
    );
    try {
      const data = JSON.parse(raw);
      const graph = data["@graph"];
      if (!Array.isArray(graph)) fail(rel, "json-ld", "no @graph array");
      else {
        const ids = graph.map((n) => n["@id"]).filter(Boolean);
        const dupes = [
          ...new Set(ids.filter((id, i) => ids.indexOf(id) !== i)),
        ];
        if (dupes.length)
          fail(rel, "json-ld", `duplicate @id: ${dupes.join(", ")}`);
        const types = graph.flatMap((n) => [].concat(n["@type"] ?? []));
        for (const required of ["Organization", "WebSite", "WebPage"]) {
          if (!types.includes(required))
            fail(rel, "json-ld", `no ${required} node`);
        }
        /* Breadcrumbs everywhere but the home page (section 5.4). */
        const isHome = /^(en|vi)\.html$/.test(rel);
        if (!isHome && !types.includes("BreadcrumbList")) {
          fail(rel, "breadcrumb", "no BreadcrumbList");
        }
        if (isHome && types.includes("BreadcrumbList")) {
          fail(rel, "breadcrumb", "home page should have none");
        }
      }
    } catch (e) {
      fail(rel, "json-ld", `invalid JSON: ${e.message}`);
    }
  }

  /* --- uniqueness across indexable pages ------------------------------- */
  if (title) titles.set(title, [...(titles.get(title) ?? []), rel]);
  if (desc) descs.set(desc, [...(descs.get(desc) ?? []), rel]);
  if (canonical) canons.set(canonical, [...(canons.get(canonical) ?? []), rel]);
}

/*
 * A title repeated across locales is correct, not duplicated: /en/pricing and /vi/pricing are
 * translations and their canonicals differ. Only a repeat WITHIN one locale is a fault, and a
 * repeated canonical always is.
 */
const localeOf = (p) => p.split("/")[0];
for (const [title, pages] of titles) {
  const perLocale = pages.reduce(
    (m, p) => ((m[localeOf(p)] ??= []).push(p), m),
    {},
  );
  for (const [loc, ps] of Object.entries(perLocale)) {
    if (ps.length > 1)
      fail(ps.join(", "), "title-unique", `${loc}: "${title.slice(0, 60)}"`);
  }
}
for (const [canonical, pages] of canons) {
  if (pages.length > 1) fail(pages.join(", "), "canonical-unique", canonical);
}

/* --- crawl files (sections 2.4 and 7) --------------------------------- */
for (const name of ["robots.txt", "sitemap.xml", "llms.txt"]) {
  if (!existsSync(join(OUT, name)))
    fail(name, "crawl-file", "missing from the export");
}

/* The sitemap must list only indexable URLs (section 2.4). */
if (existsSync(join(OUT, "sitemap.xml"))) {
  const xml = readFileSync(join(OUT, "sitemap.xml"), "utf8");
  for (const m of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
    const path = m[1].replace(/^https?:\/\/[^/]+/, "");
    if (
      /\/(signin|signup|forgot-password|reset-password|verify-email)$/.test(
        path,
      )
    ) {
      fail("sitemap.xml", "sitemap", `lists a noindex URL: ${path}`);
    }
  }
}

/* --- report ------------------------------------------------------------ */
const group = (list) =>
  list.reduce((m, f) => ((m[f.rule] ??= []).push(f), m), {});
const byRule = group(failures);

/* Printed on a green run too, which is the only run anyone reads to the end. */
function report(title, list) {
  if (list.length === 0) return;
  console.log(`\n${title}\n`);
  for (const [rule, rows] of Object.entries(group(list))) {
    console.log(`  ${String(rows.length).padStart(4)}  ${rule}`);
    for (const f of rows.slice(0, 3))
      console.log(`        ${f.file}: ${f.detail}`);
    if (rows.length > 3) console.log(`        ... and ${rows.length - 3} more`);
  }
}

if (failures.length === 0) {
  console.log(`seo ok — ${indexable} indexable pages, every gate passed`);
  report(`seo: ${warnings.length} warning(s), reported not gated`, warnings);
  process.exit(0);
}

console.log(
  `\nseo: ${failures.length} failure(s) across ${indexable} indexable pages\n`,
);
for (const [rule, list] of Object.entries(byRule).sort(
  (a, b) => b[1].length - a[1].length,
)) {
  console.log(`  ${String(list.length).padStart(4)}  ${rule}`);
  for (const f of list.slice(0, 3))
    console.log(`        ${f.file}: ${f.detail}`);
  if (list.length > 3) console.log(`        ... and ${list.length - 3} more`);
}
console.log("");
process.exit(WARN_ONLY ? 0 : 1);
