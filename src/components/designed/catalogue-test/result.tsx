"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ChevronDown,
  Code,
  Filter,
  Lock,
  RotateCcw,
  Tag,
  TrendingUp,
} from "lucide-react";
import { SIGNUP_URL } from "@/lib/constants";
import type {
  Finding,
  RequirementResult,
  Teaser,
  TestState,
} from "@/lib/catalogue-test";

/**
 * The result as one ranked list (the designer's version C, styled "Report", owner's pick C-3, 5 Nov
 * 2026; no motion, the calculator as it was). A verdict panel tinted with the most common result,
 * then every finding in one list, most products first, each with how many products it hits and the
 * Pulse product that fixes it; the first is open as proof and the rest locked behind the full audit.
 * Then the requirements, the AI shopper test, the calculator, what the test cannot see, and every
 * Pulse product folded into one list. Nothing is drawn once per product: past 12, per-product marks
 * become a proportional bar and the laptops a grid of the sample, so 8 pages and 100 read the same.
 */

type T = (k: string, v?: Record<string, string | number>) => string;

const ORDER: RequirementResult[] = [
  "supported",
  "partial",
  "buried",
  "insufficient",
];

const BADGE: Record<RequirementResult, string> = {
  supported: "border-success-line bg-success-bg text-success",
  partial: "border-warning-line bg-warning-bg text-warning",
  buried: "border-gap bg-gap-fill text-gap-strong",
  insufficient: "border-critical-line bg-critical-bg text-critical",
};

/** The verdict panel takes the most common result's colour. */
const PANEL: Record<RequirementResult, string> = {
  supported: "border-success-line bg-success-bg",
  partial: "border-warning-line bg-warning-bg",
  buried: "border-gap bg-gap-fill",
  insufficient: "border-critical-line bg-critical-bg",
};

/** Amber is 1.8:1 on white, so every amber mark carries a gap-strong edge and a number beside it. */
const AMBER =
  "bg-[color-mix(in_oklab,var(--color-gap)_78%,var(--color-card))] shadow-[inset_0_0_0_1px_var(--color-gap-strong)]";
const FILL: Record<RequirementResult, string> = {
  supported: "bg-success",
  partial: AMBER,
  buried: "bg-gap shadow-[inset_0_0_0_1px_var(--color-gap-strong)]",
  insufficient: "bg-critical",
};
const EMPTY = "bg-surface-1 shadow-[inset_0_0_0_1px_var(--color-line)]";

/**
 * Every Pulse product, with the plan that includes it (rainbow `ODIN/product/PRICING.md` §3.2) and
 * its marker. `fixes` names the teaser's per-product count, where this test measures one. Markers
 * from the brand's blues, slate and amber only (no violet, and Signal Red is the hero's).
 */
const PRODUCTS: {
  key: string;
  name: string;
  plan: "free" | "starter" | "growth" | "scale";
  dot: string;
  fixes?: string;
  href: string;
}[] = [
  {
    key: "audit",
    name: "Decision Audit",
    plan: "free",
    dot: "bg-primary",
    fixes: "Decision Audit",
    href: "/en/product/decision-audit",
  },
  {
    key: "verification",
    name: "Decision Verification",
    plan: "starter",
    dot: "bg-sky",
    href: "/en/product/decision-verification",
  },
  {
    key: "monitor",
    name: "Decision Monitor",
    plan: "starter",
    dot: "bg-baseline",
    href: "/en/product/decision-monitor",
  },
  {
    key: "returns",
    name: "Return Verification",
    plan: "starter",
    dot: "bg-baseline",
    href: "/en/product/return-verification",
  },
  {
    key: "visual",
    name: "Visual Evidence",
    plan: "starter",
    dot: "bg-gap-strong",
    fixes: "Visual Evidence",
    href: "/en/product/visual-evidence",
  },
  {
    key: "api",
    name: "Decision API",
    plan: "growth",
    dot: "bg-primary",
    fixes: "Decision API / MCP",
    href: "/en/product/decision-api",
  },
  {
    key: "promotions",
    name: "Promotion Audit",
    plan: "growth",
    dot: "bg-baseline",
    href: "/en/product/promotion-audit",
  },
  {
    key: "pages",
    name: "Pages",
    plan: "scale",
    dot: "bg-sky",
    fixes: "Pages and merchandising",
    href: "/en/product/pages",
  },
  {
    key: "search",
    name: "Search",
    plan: "scale",
    dot: "bg-primary",
    href: "/en/product/search",
  },
  {
    key: "recommendations",
    name: "Recommendations",
    plan: "scale",
    dot: "bg-sky",
    href: "/en/product/recommendations",
  },
];

/** Locked findings shown as rows; the rest are counted in one line, so the list stays short. */
const MASKED_SHOWN = 5;
/** Up to this many, marks are drawn one per product; past it, a proportional bar. */
const PER_UNIT = 12;

/** A fact's state, and the repair the spec maps it to (record, show, reconcile). */
const REPAIR: Record<string, string> = {
  missing: "record",
  buried: "show",
  conflicting: "reconcile",
};
const FACT_PILL: Record<string, string> = {
  missing:
    "border-[1.5px] border-dashed border-gap bg-gap-fill text-gap-strong",
  buried: BADGE.partial,
  conflicting: BADGE.insufficient,
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Proportional digits: Mona Sans draws a slashed zero with its tabular ones.
const bigNumber =
  "font-[family-name:var(--font-title)] font-[620] [font-stretch:112%] tracking-[-0.03em]";

/** An evidence finding's title in the page's language, from its fields; others as sent. */
function findingTitle(f: Finding, t: T, num: (n: number) => string) {
  const req = f.requirements?.[0];
  if (f.kind === "evidence" && req)
    return t("findingEvidence", {
      req: t(`req_${req}`),
      n: num(f.affected),
      of: num(f.of),
    });
  return f.title;
}

/** `n` of `of`: one mark per product up to 12, then one bar with the share filled. */
function Share({
  n,
  of,
  on,
  rest,
}: {
  n: number;
  of: number;
  on: string;
  rest: string;
}) {
  if (of <= PER_UNIT)
    return (
      <span aria-hidden="true" className="inline-flex gap-[3px]">
        {Array.from({ length: of }, (_, i) => (
          <i
            key={i}
            className={`h-3 w-5 rounded-md max-md:w-4 ${i < n ? on : rest}`}
          />
        ))}
      </span>
    );
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-3 w-33 overflow-hidden rounded-md bg-surface-1 outline-1 -outline-offset-1 outline-line-control"
    >
      <i className={`h-full ${on}`} style={{ flex: `${n / of} 1 0` }} />
      <i
        className={`h-full ${rest} shadow-none!`}
        style={{ flex: `${(of - n) / of} 1 0` }}
      />
    </span>
  );
}

/** The sample at a glance: a laptop per page up to 12, then a grid of up to 100 cells. */
function Sample({
  of,
  read,
  toFix,
  label,
}: {
  of: number;
  read: number;
  toFix: number;
  label: string;
}) {
  const cells = Math.min(of, 100);
  const tone = (i: number) => (i < toFix ? "fix" : i < read ? "ok" : "off");
  if (of <= PER_UNIT)
    return (
      <div
        role="img"
        aria-label={label}
        className="flex max-w-75 flex-wrap justify-end gap-1.5 max-md:justify-start"
      >
        {Array.from({ length: cells }, (_, i) => (
          <svg
            key={i}
            viewBox="0 0 52 38"
            aria-hidden="true"
            className={`h-9.5 w-13 max-md:h-7.5 max-md:w-10 ${
              {
                fix: "fill-gap-fill stroke-gap",
                ok: "fill-success-bg stroke-success",
                off: "fill-none stroke-baseline [stroke-dasharray:3_2.5]",
              }[tone(i)]
            }`}
          >
            <rect x="9" y="3" width="34" height="23" rx="3" strokeWidth="2" />
            <path d="M3 31h46l-3 4H6z" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        ))}
      </div>
    );
  return (
    <div className="flex flex-col items-end gap-2 max-md:items-start">
      <div
        role="img"
        aria-label={label}
        className="grid grid-cols-[repeat(10,13px)] gap-1"
      >
        {Array.from({ length: cells }, (_, i) => (
          <i
            key={i}
            className={`size-[13px] rounded-[2px] border ${
              {
                fix: "border-gap bg-gap-fill",
                ok: "border-success bg-success-bg",
                off: "border-dashed border-baseline",
              }[tone(i)]
            }`}
          />
        ))}
      </div>
      <p className="text-xs font-medium text-muted">{label}</p>
    </div>
  );
}

export function Result({
  teaser,
  state,
  t,
  num,
  id,
  locale,
  calculator,
  onReset,
}: {
  teaser: Teaser;
  state: TestState;
  t: T;
  num: (n: number) => string;
  id: string;
  locale: string;
  calculator: ReactNode;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const open = teaser.open;
  const title = useMemo(
    () => (open ? findingTitle(open, t, num) : ""),
    [open, t, num],
  );
  const href = (path: string) => path.replace(/^\/en(?=\/|$)/, `/${locale}`);
  const signup = (plan: string) =>
    `${SIGNUP_URL}${SIGNUP_URL.includes("?") ? "&" : "?"}plan=${plan}`;
  const fixesOf = (name?: string) =>
    teaser.byProduct.find((p) => p.product === name);
  const productFor = (name?: string) =>
    PRODUCTS.find((p) => p.fixes === name) ?? PRODUCTS[0];
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const count = { supported: 0, partial: 0, buried: 0, insufficient: 0 };
  teaser.requirements.forEach((r) => count[r.result]++);
  // The most common result tints the verdict; on a tie, the worse one, so a mixed store never reads as fine.
  const top = [...ORDER].reverse().sort((a, b) => count[b] - count[a])[0];
  const tested = teaser.products;
  const sampled = Math.max(state.progress.of, tested);
  const findings = (open ? 1 : 0) + teaser.masked.length;
  const tiles = [
    {
      label: t("tileProducts"),
      value: num(teaser.tiles.productsTested),
      of: t("tileFound", { n: num(teaser.discovered) }),
    },
    {
      label: t("tileRequirements"),
      value: num(teaser.tiles.requirementsTested),
    },
    {
      label: t("tileFix"),
      value: num(teaser.tiles.productsToFix),
      of: t("tileOf", { n: num(teaser.tiles.productsTested) }),
    },
    {
      label: t("tileAgent"),
      value: num(teaser.tiles.questionsAnswerable),
      of: t("tileOf", { n: num(teaser.tiles.questions) }),
    },
  ];
  const h3 =
    "font-[family-name:var(--font-title)] text-[clamp(1.375rem,1.2rem+0.7vw,1.625rem)] leading-tight font-[620] [font-stretch:112%] tracking-[-0.02em] text-ink";
  const card = "rounded-2xl border border-line bg-card";
  const rowGrid = "md:grid-cols-[290px_minmax(0,1fr)_190px_28px] md:gap-x-4";
  const fixedBy = (name?: string) => {
    const p = productFor(name);
    return (
      <span className="inline-flex items-center gap-2 text-[15px] text-ink">
        <span aria-hidden="true" className={`size-2.5 rounded-full ${p.dot}`} />
        {p.name}
      </span>
    );
  };
  const affected = (n: number, of: number) => (
    <span className="flex flex-col items-start gap-2.5 max-md:flex-row max-md:flex-wrap max-md:items-center max-md:gap-3">
      <span
        className={`${bigNumber} text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] leading-none text-ink max-md:text-xl`}
      >
        {t("maskedCount", { n: num(n), of: num(of) })}
      </span>
      <Share n={n} of={of} on={FILL.buried} rest={EMPTY} />
    </span>
  );
  const unreadable = teaser.cannotSee.unreadable;
  const cannot: [ReactNode, string][] = [
    [<RotateCcw key="r" />, t("cannotReturns")],
    [<Tag key="t" />, t("cannotPromo")],
    [<TrendingUp key="u" />, t("cannotUplift")],
    ...(!teaser.cannotSee.filtersRead
      ? ([[<Filter key="f" />, t("cannotFilters")]] as [ReactNode, string][])
      : []),
    ...(unreadable > 0
      ? ([
          [
            <Code key="c" />,
            t(unreadable === 1 ? "cannotUnreadableOne" : "cannotUnreadable", {
              n: num(unreadable),
            }),
          ],
        ] as [ReactNode, string][])
      : []),
  ];

  return (
    <div className="space-y-14 max-md:space-y-10">
      <section className="space-y-6">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-title">
              {t("resultsTitle", { domain: state.domain })}
            </h2>
            <div className="flex flex-wrap gap-2 max-md:w-full">
              <button
                type="button"
                onClick={share}
                className="btn-secondary btn-sm"
              >
                {copied ? t("copied") : t("share")}
              </button>
              <button
                type="button"
                onClick={onReset}
                className="btn-ghost btn-sm"
              >
                {t("testAnother")}
              </button>
            </div>
          </div>
          {teaser.stoppedAfter !== undefined && (
            <p className="mt-2 text-sm text-muted">
              {t("status_blocked", { n: teaser.stoppedAfter })}
            </p>
          )}
        </div>

        {/* The verdict, tinted with the most common result. */}
        <section
          aria-labelledby="verdict-title"
          className={`rounded-2xl border px-9 pt-9 pb-7 max-md:px-5 max-md:pt-6 max-md:pb-4 ${PANEL[top]}`}
        >
          <div className="flex items-center justify-between gap-8 max-md:flex-col max-md:items-start max-md:gap-5">
            <h3
              id="verdict-title"
              className="max-w-[14ch] font-[family-name:var(--font-title)] text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] leading-[1.06] font-[620] [font-stretch:112%] tracking-[-0.03em] text-balance text-ink"
            >
              {t("verdictTitle", {
                n: num(count.supported),
                of: num(teaser.requirements.length),
              })}
            </h3>
            <Sample
              of={sampled}
              read={tested}
              toFix={teaser.tiles.productsToFix}
              label={t("waffleRead", {
                n: num(tested),
                of: num(sampled),
              })}
            />
          </div>
          <div className="mt-6">
            <div
              role="img"
              aria-label={ORDER.map(
                (r) =>
                  `${t(`result_${r}`)} ${count[r]} / ${teaser.requirements.length}`,
              ).join(", ")}
              className="flex h-5 overflow-hidden rounded-[10px] outline-1 -outline-offset-1 outline-line-control"
            >
              {/* One unbroken bar, each result's share of the requirements, like every other bar here: it
                  reads the same at 5 requirements or 50 (owner, 5 Nov 2026). */}
              {ORDER.filter((r) => count[r]).map((r) => (
                <i
                  key={r}
                  className={`min-w-0 ${FILL[r]} shadow-none!`}
                  style={{ flex: `${count[r]} 1 0` }}
                />
              ))}
            </div>
            {/* Each result's count as a figure with its base, as the other numbers on the page. */}
            <dl className="mt-4 grid grid-cols-4 gap-x-6 gap-y-4 max-md:grid-cols-2">
              {ORDER.map((r) => (
                <div key={r} className="min-w-0">
                  <dt className="flex items-center gap-2 text-sm text-ink">
                    <span
                      aria-hidden="true"
                      className={`size-2.5 shrink-0 rounded-full ${FILL[r]}`}
                    />
                    {t(`result_${r}`)}
                  </dt>
                  <dd
                    className={`${bigNumber} mt-1 text-[28px] leading-none ${count[r] ? "text-ink" : "text-muted"}`}
                  >
                    {num(count[r])}
                    <small className="ml-1 font-sans text-sm font-medium tracking-normal text-muted">
                      / {num(teaser.requirements.length)}
                    </small>
                  </dd>
                </div>
              ))}
            </dl>
            <details className="group mt-3 text-sm">
              <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-muted hover:text-ink [&::-webkit-details-marker]:hidden">
                <ChevronDown
                  aria-hidden
                  className="size-4 group-open:rotate-180"
                />
                {t("legendResultsTitle")}
              </summary>
              <ul className="mt-2.5 grid gap-2">
                {ORDER.map((r) => (
                  <li
                    key={r}
                    className="flex items-baseline gap-2.5 text-muted"
                  >
                    <span
                      className={`badge min-w-23 justify-center ${BADGE[r]}`}
                    >
                      {t(`result_${r}`)}
                    </span>
                    {t(`legend_${r}`)}
                  </li>
                ))}
              </ul>
            </details>
          </div>
          <dl className="mt-8 grid grid-cols-4 border-t border-[color-mix(in_oklab,var(--color-ink)_14%,transparent)] max-md:grid-cols-2">
            {tiles.map((x) => (
              <div
                key={x.label}
                className="flex flex-col pt-6 pr-6 max-md:pt-4.5 max-md:pr-3"
              >
                {/* The label first for a reader, the number first on screen. */}
                <dt className="order-3 mt-1 text-sm text-pretty text-ink">
                  {x.label}
                </dt>
                <dd
                  className={`${bigNumber} order-1 text-[clamp(2.5rem,2rem+1.8vw,3.5rem)] leading-none text-ink`}
                >
                  {x.value}
                </dd>
                {x.of && (
                  <dd className="order-2 mt-1.5 text-xs text-muted">{x.of}</dd>
                )}
              </div>
            ))}
          </dl>
        </section>
      </section>

      {/* Every finding in one list, most products first: what, how many, and what fixes it. */}
      {findings > 0 && (
        <section aria-labelledby="findings-title">
          <h3 id="findings-title" className={h3}>
            {t("findingsTitle", { n: num(findings) })}
          </h3>
          <div className={`${card} mt-3 overflow-hidden`}>
            <div
              aria-hidden="true"
              className={`grid bg-surface-1 px-6 py-3 text-xs font-medium tracking-wider text-muted uppercase max-md:hidden ${rowGrid}`}
            >
              <span>{t("colAffected")}</span>
              <span>{t("colFinding")}</span>
              <span>{t("colFixedBy")}</span>
              <span />
            </div>
            <ul className="divide-y divide-line">
              {open && (
                <li
                  className={
                    expanded
                      ? "bg-[color-mix(in_oklab,var(--color-primary)_3%,var(--color-card))]"
                      : undefined
                  }
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls="open-finding"
                    onClick={() => setExpanded((e) => !e)}
                    className={`grid min-h-23 w-full cursor-pointer grid-cols-[minmax(0,1fr)_24px] items-center gap-2 px-6 py-4.5 text-left hover:bg-surface-1/60 max-md:px-5 ${rowGrid}`}
                  >
                    <span className="max-md:row-start-2">
                      {affected(open.affected, open.of)}
                    </span>
                    <span className="text-[17px] font-medium text-pretty text-ink max-md:row-start-1">
                      {open.requirements?.[0]
                        ? t(`req_${open.requirements[0]}`)
                        : open.title}
                    </span>
                    <span className="max-md:row-start-3">
                      {fixedBy(open.product)}
                    </span>
                    <ChevronDown
                      aria-hidden
                      className={`size-4 text-muted max-md:col-start-2 max-md:row-start-1 ${expanded ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    id="open-finding"
                    hidden={!expanded}
                    className="px-6 pt-1 pb-8 max-md:px-5 max-md:pb-6"
                  >
                    <p className="mb-4 max-w-[62ch] text-[15px] text-pretty text-muted">
                      {title}
                    </p>
                    <ul className="grid gap-5">
                      {open.examples.map((e) => (
                        <li
                          key={e.url}
                          className="border-t border-line pt-4 first:border-t-0 first:pt-0"
                        >
                          <a
                            href={e.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-primary underline-offset-4 hover:underline"
                          >
                            {e.title || e.url}
                          </a>
                          <ul className="mt-2.5 grid gap-2.5">
                            {e.facts.map((f) => {
                              const fix = REPAIR[f.state];
                              return (
                                <li
                                  key={f.fact}
                                  className="grid grid-cols-[120px_auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 text-[15px] max-md:grid-cols-[auto_minmax(0,1fr)]"
                                >
                                  <span className="text-muted max-md:col-span-2">
                                    {t(`fact_${slug(f.fact)}`)}
                                  </span>
                                  <span
                                    className={`badge w-fit font-medium ${FACT_PILL[f.state] ?? "border-line text-muted"}`}
                                  >
                                    {f.state === "conflicting" && "! "}
                                    {t(`state_${f.state}`)}
                                  </span>
                                  <span className="font-mono text-xs text-muted max-md:col-span-2">
                                    {f.value
                                      ? `“${f.value.slice(0, 80)}”`
                                      : f.found
                                        ? t("pageSays", { v: f.found })
                                        : ""}
                                  </span>
                                  {fix && (
                                    <span className="inline-flex w-fit items-center gap-1.5 rounded-md border border-primary-line bg-primary-tint px-2 py-0.5 text-xs font-semibold whitespace-nowrap text-primary-hover max-md:col-span-2">
                                      <span className="font-medium text-muted">
                                        {t("repairLabel")}
                                      </span>
                                      <ArrowRight
                                        aria-hidden
                                        className="size-3"
                                      />
                                      {t(`repair_${fix}`)}
                                    </span>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-muted">{t("openCheck")}</p>
                    {(() => {
                      const p = productFor(open.product);
                      return (
                        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[10px] border border-primary-line bg-primary-tint px-5 py-4">
                          <span className="inline-flex items-center gap-2 text-sm">
                            <span
                              aria-hidden="true"
                              className={`size-2.5 rounded-full ${p.dot}`}
                            />
                            <b className="font-semibold text-ink">{p.name}</b>
                          </span>
                          <span className="text-xs font-medium text-muted">
                            {t(`plan_${p.plan}`)}
                          </span>
                          <a
                            href={signup(p.plan)}
                            className="btn-secondary btn-sm ml-auto bg-card max-md:ml-0 max-md:w-full"
                          >
                            {t(p.plan === "free" ? "startFree" : "subscribe")}
                          </a>
                        </div>
                      );
                    })()}
                  </div>
                </li>
              )}
              {teaser.masked.slice(0, MASKED_SHOWN).map((m, i) => (
                // The finding's text is withheld by spider; a bar stands where it would be.
                <li
                  key={i}
                  className={`grid min-h-23 grid-cols-[minmax(0,1fr)_24px] items-center gap-2 px-6 py-4.5 max-md:px-5 ${rowGrid}`}
                >
                  <span className="max-md:row-start-2">
                    {affected(m.affected, m.of)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="block h-3 rounded bg-surface-1 blur-[1px] max-md:row-start-1"
                  />
                  <span className="max-md:row-start-3">
                    {fixedBy(m.product)}
                  </span>
                  <Lock
                    aria-label={t("inFullAudit")}
                    className="size-4 text-muted max-md:col-start-2 max-md:row-start-1"
                  />
                </li>
              ))}
            </ul>
            {teaser.masked.length > MASKED_SHOWN && (
              <p className="border-t border-line px-6 py-3 text-sm text-muted max-md:px-5">
                {t("maskedMore", { n: teaser.masked.length - MASKED_SHOWN })}
              </p>
            )}
            {teaser.masked.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-primary-line bg-primary-tint px-6 py-7 max-md:px-5">
                <div>
                  <h4 className="text-lg font-semibold text-ink">
                    {t("unlockTitle", { n: num(teaser.masked.length) })}
                  </h4>
                  <p className="mt-1 max-w-[56ch] text-sm text-pretty text-muted">
                    {t("unlockLede")}
                  </p>
                </div>
                <a
                  href={`/${locale}/contact?ref=${id}`}
                  className="btn-primary max-md:w-full"
                >
                  {t("unlock")}
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      <section aria-labelledby="requirements-title">
        <h3 id="requirements-title" className={h3}>
          {t("requirementsTitle")}
        </h3>
        <div className={`${card} mt-3 overflow-hidden`}>
          <p
            aria-hidden="true"
            className="bg-surface-1 px-6 py-3 text-right text-xs font-medium tracking-wider text-muted uppercase max-md:hidden"
          >
            {t("colSupported")}
          </p>
          <ul className="divide-y divide-line">
            {teaser.requirements.map((r) => (
              <li
                key={r.id}
                className="grid grid-cols-[104px_minmax(0,1fr)_auto_76px] items-center gap-x-4 gap-y-2 px-6 py-3.5 max-md:grid-cols-[auto_minmax(0,1fr)] max-md:px-5"
              >
                <span className={`badge w-fit ${BADGE[r.result]}`}>
                  {t(`result_${r.result}`)}
                </span>
                <span className="text-base text-ink">{t(`req_${r.id}`)}</span>
                <Share
                  n={r.counts.supported}
                  of={tested}
                  on={FILL.supported}
                  rest={r.result === "supported" ? EMPTY : FILL[r.result]}
                />
                <span className="text-right font-mono text-sm whitespace-nowrap text-ink max-md:text-left">
                  {num(r.counts.supported)} / {num(tested)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="agent-title">
        <h3 id="agent-title" className={h3}>
          {t("requestsTitle")}
        </h3>
        <div className={`${card} mt-3 overflow-hidden`}>
          <p className="bg-surface-1 px-6 py-3 text-right text-xs font-medium text-muted max-md:px-5 max-md:text-left">
            {t("agentCol")}
          </p>
          <ul className="divide-y divide-line">
            {teaser.requests.map((q) => (
              <li
                key={q.id}
                className="grid grid-cols-[minmax(0,1fr)_auto_76px] items-center gap-x-4 gap-y-2 px-6 py-4 text-base max-md:grid-cols-[auto_minmax(0,1fr)] max-md:px-5"
              >
                <span className="text-pretty text-ink max-md:col-span-2">
                  &ldquo;{t(`ask_${q.id}`)}&rdquo;
                </span>
                <Share
                  n={q.canRecommend}
                  of={q.of}
                  on={FILL.supported}
                  rest={EMPTY}
                />
                <span className="text-right font-mono text-sm whitespace-nowrap text-ink max-md:text-left">
                  {num(q.canRecommend)} / {num(q.of)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="money-title">
        <h3 id="money-title" className={h3}>
          {t("moneyTitle")}
        </h3>
        <p className="mt-1 text-[15px] text-pretty text-muted">
          {t("moneyLede", {
            n: num(teaser.tiles.productsToFix),
            of: num(teaser.tiles.productsTested),
          })}
        </p>
        <div className="mt-4">{calculator}</div>
      </section>

      <section aria-labelledby="cannot-title">
        <h3 id="cannot-title" className={h3}>
          {t("cannotTitle")}
        </h3>
        <ul
          className={`${card} mt-3 grid grid-cols-2 gap-x-6 gap-y-4 p-7 max-md:grid-cols-1 max-md:p-5`}
        >
          {cannot.map(([icon, text], i) => {
            // "Returns: …" leads with its subject in bold, as the result names what it cannot see.
            const m = /^([^:]{3,32}): (.*)$/.exec(text);
            return (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-pretty text-muted"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-surface-1 text-muted [&_svg]:size-4">
                  {icon}
                </span>
                <span>
                  {m ? (
                    <>
                      <b className="font-semibold text-ink">{m[1]}</b>: {m[2]}
                    </>
                  ) : (
                    text
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="products-title">
        <h3 id="products-title" className={h3}>
          {t("productsTitle")}
        </h3>
        <p className="mt-1 max-w-[64ch] text-[15px] text-pretty text-muted">
          {t("productsLede")}
        </p>
        <details className="group mt-1">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm font-medium text-primary [&::-webkit-details-marker]:hidden">
            <ChevronDown aria-hidden className="size-4 group-open:rotate-180" />
            {t("allProducts", { n: num(PRODUCTS.length) })}
          </summary>
          <ul className={`${card} mt-3 divide-y divide-line overflow-hidden`}>
            {PRODUCTS.map((p) => {
              const f = fixesOf(p.fixes);
              return (
                <li
                  key={p.key}
                  className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)_minmax(0,1fr)_132px] items-center gap-x-5 gap-y-2 px-5 py-3.5 text-sm max-md:grid-cols-1 max-md:p-4"
                >
                  <div>
                    <a
                      href={href(p.href)}
                      className="inline-flex items-center gap-2 font-semibold text-ink underline-offset-4 hover:underline"
                    >
                      <span
                        aria-hidden="true"
                        className={`size-2.5 shrink-0 rounded-full ${p.dot}`}
                      />
                      {p.name}
                    </a>
                    <p className="text-[13px] text-pretty text-muted">
                      {t(`prod_${p.key}`)}
                    </p>
                  </div>
                  <div className="text-[13px] text-muted">
                    {f && f.fixes !== null ? (
                      <>
                        <b className="mr-1.5 font-display text-[22px] leading-none font-semibold tracking-tight text-ink tabular-nums">
                          {num(f.fixes)}
                        </b>
                        {t(`unit_${slug(p.fixes!)}`)}
                      </>
                    ) : (
                      t(f ? "notChecked" : "inFullAudit")
                    )}
                  </div>
                  <div className="text-xs font-medium text-ink">
                    {t(`plan_${p.plan}`)}
                  </div>
                  <a
                    href={signup(p.plan)}
                    className="btn-secondary btn-sm w-full justify-center"
                  >
                    {t(p.plan === "free" ? "startFree" : "subscribe")}
                  </a>
                </li>
              );
            })}
          </ul>
        </details>
      </section>
    </div>
  );
}
