"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  Check,
  ChevronDown,
  Circle,
  FileCheck2,
  FileSearch,
  Hand,
  Hourglass,
  ListChecks,
  LoaderCircle,
  ScanSearch,
  ScanText,
  X,
} from "lucide-react";
import type { RequirementResult } from "@/lib/catalogue-test";

/**
 * A running test as a pipeline of stations (owner, 5 Nov 2026: 21st.dev's "build pipeline" look, the
 * designer's progress mockup in the result's Report language; lucide icons, no new dependency). Five
 * isometric blocks, In line → Find pages → Read pages → Test requirements → Result, each coloured by
 * its state and joined by arrows (solid once passed), on desktop; on a phone, the same stages as a list;
 * four stats; and a
 * panel for the selected stage: the queue, the products found, the pages read, or the requirements.
 * The only thing that moves is the spinner on the running stage, and not with reduced motion.
 */

type T = (k: string, v?: Record<string, string | number>) => string;
type Mark = "passed" | "running" | "waiting" | "failed" | "stopped";
type Facts = {
  visible: number;
  buried: number;
  missing: number;
  conflicting: number;
};
export interface PipelinePage {
  url: string;
  title?: string;
  state: "queued" | "inspecting" | "done" | "skipped";
  reason?: string;
  facts?: Facts;
}

const STAGES = [
  { id: "queued", icon: Hourglass, name: "stageQueued" },
  { id: "discovering", icon: FileSearch, name: "stageFind" },
  { id: "inspecting", icon: ScanText, name: "stageRead" },
  { id: "evaluating", icon: ListChecks, name: "stageTest" },
  { id: "done", icon: FileCheck2, name: "stageDone" },
] as const;
type Stage = (typeof STAGES)[number]["id"];

/** Each state's fill, ink and edge, as variables the blocks, tiles and badges read. */
const TONE: Record<Mark, string> = {
  passed:
    "[--st-bg:var(--color-success-bg)] [--st-fg:var(--color-success)] [--st-line:var(--color-success-line)]",
  running:
    "[--st-bg:var(--color-primary-tint)] [--st-fg:var(--color-primary)] [--st-line:var(--color-primary-line)]",
  waiting:
    "[--st-bg:var(--color-surface-1)] [--st-fg:var(--color-muted)] [--st-line:var(--color-line)]",
  failed:
    "[--st-bg:var(--color-critical-bg)] [--st-fg:var(--color-critical)] [--st-line:var(--color-critical-line)]",
  stopped:
    "[--st-bg:var(--color-gap-fill)] [--st-fg:var(--color-gap-strong)] [--st-line:var(--color-gap)]",
};

const RESULTS: RequirementResult[] = [
  "supported",
  "partial",
  "buried",
  "insufficient",
];
/** A first-draft checklist: dashed, so it reads as unfinished, and not amber, which means missing. */
export const DRAFT_TAG =
  "inline-flex shrink-0 items-center rounded-full border border-dashed border-line-control px-2 py-0.5 text-xs font-semibold whitespace-nowrap text-ink";
const BAR: Record<RequirementResult, string> = {
  supported: "bg-success",
  partial: "bg-[color-mix(in_oklab,var(--color-gap)_78%,var(--color-card))]",
  buried: "bg-baseline",
  insufficient: "bg-critical",
};
const FACT_BAR: [keyof Facts, string][] = [
  ["visible", "bg-success"],
  ["buried", "bg-baseline"],
  ["missing", "bg-gap"],
  ["conflicting", "bg-critical"],
];
const FACT_BADGE: [string, string][] = [
  ["visible", "border-success-line bg-success-bg text-success"],
  ["buried", "border-line-control bg-surface-1 text-ink"],
  [
    "missing",
    "border-[1.5px] border-dashed border-gap bg-gap-fill text-gap-strong",
  ],
  ["conflicting", "border-critical-line bg-critical-bg text-critical"],
];
const numeral =
  // Proportional digits: Mona Sans draws a slashed zero with its tabular ones.
  "font-[family-name:var(--font-title)] font-[620] [font-stretch:112%] tracking-[-0.02em]";

function MarkIcon({
  m,
  className = "size-3.5",
}: {
  m: Mark;
  className?: string;
}) {
  if (m === "passed") return <Check aria-hidden className={className} />;
  if (m === "running")
    return (
      <LoaderCircle
        aria-hidden
        className={`${className} motion-safe:animate-spin`}
      />
    );
  if (m === "failed") return <X aria-hidden className={className} />;
  if (m === "stopped") return <Hand aria-hidden className={className} />;
  return <Circle aria-hidden className={className} />;
}

export function RunPipeline({
  t,
  num,
  status,
  domain,
  ahead,
  found,
  sampled,
  read,
  now,
  pages,
  reqs,
  startedAt,
  elapsed,
  category,
  draft,
  onReset,
}: {
  t: T;
  num: (n: number) => string;
  /** queued, discovering, inspecting, evaluating, failed, blocked (stopped before a result). */
  status: string;
  domain: string;
  ahead?: number;
  /** Products found on the store, pages sampled from them, and pages read so far. */
  found: number | null;
  sampled: number;
  read: number;
  now: string | null;
  pages: PipelinePage[];
  reqs: Record<string, Record<RequirementResult, number>>;
  startedAt: number | null;
  elapsed: number | null;
  /** The category tested, in the page's language, and whether its checklist is a first draft. */
  category: string | null;
  draft: boolean;
  onReset: () => void;
}) {
  const plot = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(960);
  const [chosen, setChosen] = useState<{ stage: Stage; at: number } | null>(
    null,
  );

  const ids = STAGES.map((s) => s.id) as Stage[];
  const stuck = status === "failed" || status === "blocked";
  // The run finished: every stage passed, the pipeline stays as a record above the result.
  const finished = status === "done";
  const at = stuck ? 2 : Math.max(0, ids.indexOf(status as Stage));
  const mark = (i: number): Mark =>
    finished || i < at
      ? "passed"
      : i > at
        ? "waiting"
        : status === "failed"
          ? "failed"
          : status === "blocked"
            ? "stopped"
            : status === "queued"
              ? "waiting"
              : "running";
  // The stage the reader opened lapses when the run moves on.
  const sel = chosen?.at === at ? ids.indexOf(chosen.stage) : at;
  const runMark: Mark = finished
    ? "passed"
    : stuck
      ? mark(at)
      : at === 0
        ? "waiting"
        : "running";
  const statusText = t(
    status === "blocked" ? "status_stopped" : `status_${status}`,
  );

  useLayoutEffect(() => {
    const el = plot.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      setWidth(el.getBoundingClientRect().width),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const detail = (i: number) =>
    i === 0
      ? status === "queued" && ahead
        ? t("aheadShort", { n: num(ahead) })
        : ""
      : i === 1
        ? found !== null
          ? t("foundShort", { n: num(found) })
          : ""
        : i === 2
          ? sampled && status !== "blocked"
            ? `${num(read)} / ${num(sampled)}`
            : ""
          : "";
  const word = (i: number) => {
    const m = mark(i);
    return m === "passed"
      ? t("status_done")
      : m === "failed"
        ? t("markFailed")
        : m === "stopped"
          ? t("status_stopped")
          : detail(i);
  };
  const label = (i: number) => {
    const m = mark(i);
    return `${t(STAGES[i].name)}, ${
      m === "passed"
        ? t("status_done")
        : m === "running"
          ? t(`status_${STAGES[i].id}`)
          : m === "failed"
            ? t("markFailed")
            : m === "stopped"
              ? t("status_stopped")
              : t("notStarted")
    }`;
  };
  const pick = (i: number) => setChosen({ stage: ids[i], at });

  // The blocks: 5 in a row while they fit, smaller and snaking on a phone.
  const narrow = width < 560;
  const bw = narrow ? 96 : 120;
  const s = bw / 120;
  const cols = Math.max(1, Math.min(5, Math.floor((width - 8) / bw)));
  const svgH = 100 * s;
  const rowH = svgH + 64;
  const H = Math.ceil(STAGES.length / cols) * rowH + 8;
  const nodes = STAGES.map((_, i) => {
    const row = Math.floor(i / cols);
    const c = row % 2 ? cols - 1 - (i % cols) : i % cols;
    return { row, x: ((c + 0.5) * width) / cols, top: row * rowH + 8 };
  });

  // The pages read, latest first: six shown, the rest folded with their skips counted.
  const doneRows = pages.filter(
    (p) => p.state === "done" || p.state === "skipped",
  );
  const latest = doneRows.slice(-6).reverse();
  const earlier = doneRows.slice(0, Math.max(0, doneRows.length - 6)).reverse();
  const skips = earlier.reduce<Record<string, number>>((n, p) => {
    if (p.state === "skipped" && p.reason) n[p.reason] = (n[p.reason] ?? 0) + 1;
    return n;
  }, {});
  const path = (u: string) => {
    try {
      return new URL(u).pathname;
    } catch {
      return u;
    }
  };
  const pageRow = (p: PipelinePage) => (
    <li
      key={p.url}
      className="grid grid-cols-[8px_minmax(0,1fr)_auto] items-center gap-3 border-t border-line bg-card px-5 py-2.5 text-sm first:border-t-0 max-md:px-4"
    >
      <span
        aria-hidden="true"
        className={`size-2 rounded-full ${p.state === "skipped" ? "bg-baseline" : "bg-primary"}`}
      />
      {p.state === "skipped" ? (
        <>
          <span className="truncate font-mono text-xs text-muted">
            {path(p.url)}
          </span>
          <span className="text-xs whitespace-nowrap text-muted">
            {t(`skip_${p.reason}`)}
          </span>
        </>
      ) : (
        <>
          <span className="truncate text-ink">{p.title || path(p.url)}</span>
          {p.facts && (
            <span
              role="img"
              aria-label={FACT_BAR.map(
                ([k]) => `${t(`fact_state_${k}`)} ${p.facts![k]}`,
              ).join(", ")}
              className="inline-flex h-2 w-18 overflow-hidden rounded-[2px] bg-surface-1 max-md:w-14"
            >
              {FACT_BAR.filter(([k]) => p.facts![k] > 0).map(([k, bg]) => (
                <i
                  key={k}
                  className={`min-w-0 ${bg}`}
                  style={{ flex: `${p.facts![k]} 1 0` }}
                />
              ))}
            </span>
          )}
        </>
      )}
    </li>
  );

  // The page being read, in the panel's header beside its status (owner, 6 Nov 2026).
  const readNow =
    sel === 2 && mark(2) !== "waiting" && status !== "blocked" ? (
      <span className="flex min-w-0 flex-1 items-center gap-2 text-xs max-md:order-last max-md:basis-full">
        {status === "inspecting" && now ? (
          <span className="min-w-0 truncate font-mono text-muted">
            {t("reading")} {path(now)}
          </span>
        ) : (
          <span className="text-muted">
            {t("runningProgress", { n: num(read), of: num(sampled) })}
          </span>
        )}
      </span>
    ) : null;
  const reqIds = Object.keys(reqs);
  const panel = (() => {
    const m = mark(sel);
    const quiet = (text: string) => (
      <p className="px-5 py-4.5 text-sm text-muted max-md:px-4">{text}</p>
    );
    if (sel === 2) {
      if (m === "waiting") return quiet(t("notStarted"));
      if (status === "blocked")
        return (
          <div
            className={`flex items-start gap-3 bg-(--st-bg) px-5 py-3.5 text-sm text-ink max-md:px-4 ${TONE.stopped}`}
          >
            <Hand aria-hidden className="mt-0.5 size-4 text-(--st-fg)" />
            <p>{t("stoppedNone")}</p>
          </div>
        );
      return (
        <>
          <ol>{latest.map(pageRow)}</ol>
          {earlier.length > 0 && (
            <details className="group border-t border-line bg-card">
              <summary className="flex min-h-12 cursor-pointer list-none flex-wrap items-center gap-x-2.5 gap-y-1.5 px-5 py-1.5 text-sm text-primary max-md:px-4 [&::-webkit-details-marker]:hidden">
                <ChevronDown
                  aria-hidden
                  className="size-4 group-open:rotate-180"
                />
                {t("earlierPages", { n: num(earlier.length) })}
                {Object.entries(skips).map(([r, n]) => (
                  <span key={r} className="badge border-line text-muted">
                    {t(`skip_${r}`)} {num(n)}
                  </span>
                ))}
              </summary>
              <ol className="max-h-65 overflow-auto border-t border-line">
                {earlier.map(pageRow)}
              </ol>
            </details>
          )}
          <div className="flex flex-wrap gap-2 border-t border-line px-5 py-3 max-md:px-4">
            {FACT_BADGE.map(([k, tone]) => (
              <span key={k} className={`badge ${tone}`}>
                {t(`fact_state_${k}`)}
              </span>
            ))}
          </div>
        </>
      );
    }
    if (m === "waiting")
      return quiet(t(sel === 4 ? "resultSoon" : "notStarted"));
    // Testing: each requirement's pages so far, split by result.
    return (
      <>
        <p className="flex min-h-11 items-center border-b border-line bg-card px-5 py-3 text-xs text-muted max-md:px-4">
          {t("soFar")}
        </p>
        <ul className="grid gap-3.5 bg-card px-5 pt-4.5 pb-1.5 max-md:px-4">
          {reqIds.map((rid) => {
            const c = reqs[rid];
            const total = RESULTS.reduce((n, r) => n + c[r], 0) || 1;
            return (
              <li key={rid}>
                <div className="mb-1.5 flex justify-between gap-3 text-sm">
                  <span className="text-ink">{t(`req_${rid}`)}</span>
                  <span className="font-mono text-muted">
                    {num(c.supported)} / {num(total)}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="flex h-3 overflow-hidden rounded-md bg-surface-1 outline-1 -outline-offset-1 outline-line-control"
                >
                  {RESULTS.filter((r) => c[r]).map((r) => (
                    <i
                      key={r}
                      className={`min-w-0 ${BAR[r]}`}
                      style={{ flex: `${c[r]} 1 0` }}
                    />
                  ))}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-wrap gap-2 bg-card px-5 pt-3.5 pb-4.5 max-md:px-4">
          {RESULTS.map((r) => (
            <span
              key={r}
              className={`badge ${
                {
                  supported: "border-success-line bg-success-bg text-success",
                  partial: "border-warning-line bg-warning-bg text-warning",
                  buried: "border-line-control bg-surface-1 text-ink",
                  insufficient:
                    "border-critical-line bg-critical-bg text-critical",
                }[r]
              }`}
            >
              {t(`result_${r}`)}
            </span>
          ))}
        </div>
      </>
    );
  })();

  const clock = (ms: number) => {
    const sec = Math.max(0, Math.round(ms / 1000));
    return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
  };
  const stats: [string, ReactNode][] = [
    [
      t("stRead"),
      <>
        {num(read)}
        <small className="ml-1 font-sans text-lg font-medium tracking-normal text-muted max-md:text-sm">
          / {sampled ? num(sampled) : "–"}
        </small>
      </>,
    ],
    [t("stFound"), found !== null ? num(found) : "–"],
    [t("stElapsed"), elapsed !== null ? clock(elapsed) : "–"],
  ];

  return (
    <section
      aria-label={t("runningTitle")}
      className="overflow-hidden rounded-2xl border border-line bg-card [--side:var(--color-ink)] theme-dark:[--side:var(--color-void)]"
    >
      <header className="flex flex-wrap items-center justify-between gap-3.5 px-7 pt-6 max-md:px-4 max-md:pt-4.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-line bg-surface-1 text-muted">
            <ScanSearch aria-hidden className="size-5" strokeWidth={1.7} />
          </span>
          <div className="min-w-0">
            <h2
              className={`${numeral} truncate text-xl leading-tight text-ink`}
            >
              {domain}
            </h2>
            <p className="text-[13px] text-muted">
              {t(finished ? "doneTitle" : "runningTitle")}
            </p>
          </div>
        </div>
        {category && (
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-line py-1 pr-1.5 pl-3.5 text-sm text-ink">
            <span className="truncate">{category}</span>
            {draft ? (
              <span className={DRAFT_TAG}>{t("draftBadge")}</span>
            ) : (
              <span aria-hidden className="w-0" />
            )}
          </p>
        )}
      </header>

      <dl className="mx-7 mt-6 grid grid-cols-[1.5fr_1fr_1fr_1fr] border-y border-line max-md:mx-4 max-md:mt-4.5 max-md:grid-cols-3">
        <div
          className={`min-w-0 py-4 pr-5 max-md:col-span-3 max-md:border-b max-md:border-line ${TONE[runMark]}`}
        >
          <dt className="text-[13px] text-muted max-md:text-xs">
            {t("stStatus")}
          </dt>
          <dd
            aria-live="polite"
            className="mt-1.5 text-lg leading-snug font-semibold text-balance text-(--st-fg)"
          >
            {statusText}
          </dd>
        </div>
        {stats.map(([lab, value], i) => (
          <div
            key={lab}
            className={`min-w-0 border-l border-line px-5 py-4 max-md:px-3 ${i === 0 ? "max-md:border-l-0 max-md:pl-0" : ""}`}
          >
            <dt className="text-[13px] text-muted max-md:text-xs">{lab}</dt>
            <dd
              className={`${numeral} mt-1.5 text-[32px] leading-[1.1] text-ink max-md:text-2xl`}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
      {draft && category && (
        <p className="mx-7 mt-4 text-sm text-pretty text-muted max-md:mx-4">
          {t("draftProgress", { category })}
        </p>
      )}

      <div className="px-7 pt-6 max-md:px-4 max-md:pt-2">
        {/* Desktop: the blocks. Phones: the list (owner, 5 Nov 2026). */}
        <div
          ref={plot}
          className="relative w-full max-md:hidden"
          style={{ height: H }}
        >
          <svg
            aria-hidden="true"
            width={width}
            height={H}
            className="pointer-events-none absolute inset-0 overflow-visible"
          >
            <defs>
              {(
                [
                  ["rp-pass", "var(--color-success)"],
                  ["rp-wait", "var(--color-line-control)"],
                ] as const
              ).map(([id, fill]) => (
                <marker
                  key={id}
                  id={id}
                  viewBox="0 0 8 8"
                  refX={6}
                  refY={4}
                  markerWidth={7}
                  markerHeight={7}
                  orient="auto-start-reverse"
                >
                  <path d="M1 1 7 4 1 7z" fill={fill} />
                </marker>
              ))}
            </defs>
            {nodes.slice(0, -1).map((n, i) => {
              const m = nodes[i + 1];
              const passed = i < at;
              const y = n.top + 48 * s;
              let d: string;
              if (n.row === m.row) {
                const dir = m.x > n.x ? 1 : -1;
                d = `M${n.x + dir * 36 * s},${y} H${m.x - dir * 38 * s}`;
              } else {
                const dir = n.row % 2 ? -1 : 1;
                const edge = n.x + dir * Math.min(46, width / cols / 2 - 6);
                d = `M${n.x + dir * 36 * s},${y} H${edge} V${m.top + 48 * s} H${m.x + dir * 38 * s}`;
              }
              return (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke={
                    passed
                      ? "var(--color-success)"
                      : "var(--color-line-control)"
                  }
                  strokeWidth={1.5}
                  strokeDasharray={passed ? undefined : "4 4"}
                  strokeLinejoin="round"
                  markerEnd={`url(#${passed ? "rp-pass" : "rp-wait"})`}
                />
              );
            })}
          </svg>
          {nodes.map((n, i) => {
            const st = STAGES[i];
            const m = mark(i);
            const lift = i === sel ? -5 : 0;
            return (
              <button
                key={st.id}
                type="button"
                aria-pressed={i === sel}
                aria-label={label(i)}
                onClick={() => pick(i)}
                style={{ left: n.x - bw / 2, top: n.top, width: bw }}
                className={`absolute flex cursor-pointer flex-col items-center gap-0.5 text-center text-ink ${TONE[m]}`}
              >
                <span className="relative">
                  <svg
                    width={bw}
                    height={svgH}
                    viewBox="0 0 120 100"
                    aria-hidden="true"
                  >
                    <ellipse
                      cx="60"
                      cy="76"
                      rx="38"
                      ry="9"
                      className="fill-[color-mix(in_oklab,var(--color-ink)_9%,transparent)]"
                    />
                    <g
                      transform={`translate(0,${lift})`}
                      className="stroke-(--st-line) [stroke-linejoin:round]"
                    >
                      <polygon
                        points="32,40 60,54 60,78 32,64"
                        className="fill-[color-mix(in_oklab,var(--st-bg)_89%,var(--side))]"
                      />
                      <polygon
                        points="60,54 88,40 88,64 60,78"
                        className="fill-[color-mix(in_oklab,var(--st-bg)_75%,var(--side))]"
                      />
                      <polygon
                        points="60,26 88,40 60,54 32,40"
                        className="fill-(--st-bg)"
                      />
                    </g>
                  </svg>
                  <span
                    className="absolute left-1/2 grid -translate-1/2 place-items-center text-(--st-fg)"
                    style={{ top: (40 + lift) * s } as CSSProperties}
                  >
                    <st.icon
                      aria-hidden
                      strokeWidth={1.8}
                      className={narrow ? "size-5" : "size-5.5"}
                    />
                  </span>
                </span>
                <span className="text-[13px] leading-tight font-semibold">
                  {t(st.name)}
                </span>
                <span className="inline-flex max-w-full items-start justify-center gap-1.5 text-xs leading-snug font-medium text-balance text-(--st-fg)">
                  <MarkIcon m={m} className="mt-0.5 size-3.5 shrink-0" />
                  {word(i)}
                </span>
              </button>
            );
          })}
        </div>
        <ul className="overflow-hidden rounded-xl border border-line md:hidden">
          {STAGES.map((st, i) => {
            const m = mark(i);
            return (
              <li key={st.id} className="border-t border-line first:border-t-0">
                <button
                  type="button"
                  aria-pressed={i === sel}
                  onClick={() => pick(i)}
                  className={`grid min-h-14 w-full cursor-pointer grid-cols-[36px_minmax(0,1fr)_auto_auto] items-center gap-3.5 px-4 py-3 text-left aria-pressed:bg-surface-1 max-md:grid-cols-[36px_minmax(0,1fr)_auto] ${TONE[m]}`}
                >
                  <span className="grid size-9 place-items-center rounded-[10px] border border-(--st-line) bg-(--st-bg) text-(--st-fg)">
                    <st.icon
                      aria-hidden
                      strokeWidth={1.8}
                      className="size-4.5"
                    />
                  </span>
                  <span className="text-[15px] font-semibold text-ink">
                    {t(st.name)}
                  </span>
                  <span className="font-mono text-[13px] text-muted max-md:hidden">
                    {m === "running" ? "" : detail(i)}
                  </span>
                  <span className="inline-flex min-w-30 items-center justify-end gap-1.5 text-xs font-medium text-(--st-fg) max-md:min-w-0">
                    <MarkIcon m={m} />
                    {word(i) ||
                      (m === "waiting" ? (
                        <span className="sr-only">{t("notStarted")}</span>
                      ) : null)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* The stage's table while it runs; once done, the result below says it all (owner, 6 Nov 2026). */}
      {/* A table only while pages are read and requirements tested: the queue and the search for pages
          need none (owner, 6 Nov 2026). */}
      {!finished && sel >= 2 && (
        <section
          aria-live="polite"
          className="mx-7 mt-6 overflow-hidden rounded-xl border border-line bg-surface-1 max-md:mx-4 max-md:mt-5"
        >
          <div
            className={`flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line bg-card px-5 py-3.5 max-md:px-4 ${TONE[mark(sel)]}`}
          >
            {/* While pages are read, the page being read leads and the status sits right; the stage's
              name stays for screen readers only (owner, 6 Nov 2026). */}
            <h3
              className={
                readNow ? "sr-only" : "text-[15px] font-semibold text-ink"
              }
            >
              {t(STAGES[sel].name)}
            </h3>
            {readNow}
            <span
              className={`${readNow ? "ml-auto max-md:ml-0" : ""} inline-flex shrink-0 items-center gap-1.5 rounded-full border border-(--st-line) bg-(--st-bg) px-2.5 py-0.5 text-xs font-semibold text-(--st-fg)`}
            >
              <MarkIcon m={mark(sel)} className="size-3" />
              {mark(sel) === "passed"
                ? t("status_done")
                : mark(sel) === "running"
                  ? t(`status_${STAGES[sel].id}`)
                  : mark(sel) === "failed"
                    ? t("markFailed")
                    : mark(sel) === "stopped"
                      ? t("status_stopped")
                      : sel === 0 && status === "queued"
                        ? t("status_queued")
                        : t("notStarted")}
            </span>
          </div>
          {panel}
        </section>
      )}

      <footer className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 px-7 pt-4.5 pb-5.5 text-[13px] text-muted max-md:px-4">
        <span>
          {startedAt !== null &&
            `${t("startedAt", {
              t: new Intl.DateTimeFormat(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              }).format(startedAt),
            })} · `}
          {t("stageCount", { n: num(STAGES.length) })}
        </span>
        {stuck && (
          <button
            type="button"
            onClick={onReset}
            className="btn-primary max-md:w-full"
          >
            {t("testAnother")}
          </button>
        )}
      </footer>
    </section>
  );
}
