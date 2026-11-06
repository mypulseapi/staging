"use client";

import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  CircleAlert,
  FileSearch,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

/**
 * The investor MVP (dev, 2026-11-06): the whole Pulse journey on one sample store, step by step:
 * store → AI Shelf Test → the 2×2 → one verdict with its evidence → the repair plan → the
 * holdback that verifies it → what Pulse learns. Every figure is a fixed, labelled sample, never a
 * result (ROADMAP.md §3 to §5 in rainbow's ODIN); the last panel says what is live today.
 */

type L = Record<string, string>;
const fill = (s: string, v: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));

const STEPS = ["step1", "step2", "step3", "step4", "step5", "step6", "step7"];

// Sample figures: 60 products tested, 100 requirements × 3 agents × 5 runs = 1,500 answers.
const GRID = [
  { id: "healthy", n: 14, tone: "border-success-line bg-success-bg" },
  { id: "discoverability", n: 9, tone: "border-line-control bg-surface-1" },
  { id: "unsupported", n: 11, tone: "border-critical-line bg-critical-bg" },
  { id: "evidence", n: 26, tone: "border-gap bg-gap-fill" },
] as const;
const FACTS = [
  { f: "f1", v: "f1v", src: "srcPage", state: "stated" },
  // Two sources disagree, so each is its own row: provenance shows the conflict.
  { f: "f2a", v: "f2av", src: "srcDesc", state: "conflicting" },
  { f: "f2b", v: "f2bv", src: "srcTable", state: "conflicting" },
  { f: "f3", v: "f3v", src: "srcNone", state: "missing" },
  { f: "f4", v: "f4v", src: "srcNone", state: "missing" },
] as const;
const STATE_BADGE = {
  stated: "border-success-line bg-success-bg text-success",
  conflicting: "border-critical-line bg-critical-bg text-critical",
  missing: "border-dashed border-gap bg-gap-fill text-gap-strong",
};
const REPAIRS = [
  { g: "g1", a: "a_record", n: 9, fix: true },
  { g: "g2", a: "a_reconcile", n: 4, fix: true },
  { g: "g4", a: "a_ask", n: 3, fix: true },
  { g: "g3", a: "a_show", n: 1, fix: true },
  { g: "g5", a: "a_dont", n: 43, fix: false },
];
// Pick rate before → after per arm, in percent: what a pass looks like, not a measurement.
const ARMS = [
  // Widths are fractions of a 50% scale, so each bar is traceable to its figure (DESIGN.md §3).
  { id: "arm_verified", before: 31, after: 43, bar: "bg-chart-main w-43/50" },
  { id: "arm_filler", before: 31, after: 34, bar: "bg-chart-second w-34/50" },
  {
    id: "arm_control",
    before: 31,
    after: 32,
    bar: "bg-chart-baseline w-32/50",
  },
];
const EXPORTS = [
  "Google Merchant Center",
  "OpenAI product feed",
  "Shopify",
  "Haravan",
];

const card = "rounded-xl border border-line bg-card";
const stat = "font-display text-h2 tabular-nums text-ink";

export function Mvp({ l, testHref }: { l: L; testHref: string }) {
  const [step, setStep] = useState(0);
  const go = (i: number) => {
    setStep(i);
    document
      .getElementById("mvp-stage")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const last = step === STEPS.length - 1;

  const panels: ReactNode[] = [
    // 1. Store
    <div key="s1" className="grid gap-6 md:grid-cols-2 md:items-end">
      <Head l={l} k="s1" />
      <div className={`${card} p-5`}>
        <label className="text-caption text-muted">{l.s1Store}</label>
        <div className="mt-1 rounded-lg border border-line-control bg-surface-1 px-3 py-2 font-mono text-data text-ink">
          https://demo-electronics.example/laptops
        </div>
        <p className="mt-3 text-caption text-muted">
          {l.s1Category}:{" "}
          <span className="font-medium text-ink">{l.s1CategoryValue}</span>
        </p>
        <button
          type="button"
          onClick={() => go(1)}
          className="btn btn-primary mt-4 w-full"
        >
          {l.s1Run} <ArrowRight aria-hidden className="size-4" />
        </button>
        <p className="mt-3 text-caption text-pretty text-muted">{l.s1Note}</p>
      </div>
    </div>,

    // 2. Shelf Test
    <div key="s2" className="grid gap-6">
      <Head l={l} k="s2" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["s2Requirements", "100"],
          ["s2Agents", "3"],
          ["s2Runs", "5"],
          ["s2Calls", "1,500"],
        ].map(([k, v]) => (
          <div key={k} className={`${card} p-4`}>
            <p className="text-caption text-muted">{l[k]}</p>
            <p className={stat}>{v}</p>
          </div>
        ))}
      </div>
      <div className={`${card} divide-y divide-line`}>
        <p className="px-5 py-3 text-caption text-muted">{l.s2Sample}</p>
        {["s2r1", "s2r2", "s2r3", "s2r4", "s2r5"].map((k) => (
          <div
            key={k}
            className="flex items-center justify-between gap-3 px-5 py-3"
          >
            <span className="text-data text-ink">&ldquo;{l[k]}&rdquo;</span>
            <span className="flex shrink-0 gap-1.5" aria-hidden>
              {["ChatGPT", "Gemini", "Perplexity"].map((a) => (
                <span key={a} className="badge badge-primary">
                  <Bot className="size-3" /> {a}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
      <p className="flex items-center gap-2 text-data text-muted">
        <FileSearch aria-hidden className="size-4 text-primary" />
        {l.s2Reading}{" "}
        <span className="badge badge-success">
          <Check aria-hidden className="size-3" /> {l.s2Done}
        </span>
      </p>
    </div>,

    // 3. The 2×2
    <div key="s3" className="grid gap-6">
      <Head l={l} k="s3" />
      <div className="grid grid-cols-[auto_1fr_1fr] gap-2 text-data">
        <span />
        <span className="text-center text-caption font-medium text-muted">
          {l.s3AgentYes}
        </span>
        <span className="text-center text-caption font-medium text-muted">
          {l.s3AgentNo}
        </span>
        {[
          ["s3EvYes", GRID[0], GRID[1]],
          ["s3EvNo", GRID[2], GRID[3]],
        ].map(([row, a, b]) => (
          <Row key={row as string} label={l[row as string]}>
            {[a, b].map((q) => {
              const g = q as (typeof GRID)[number];
              const open = g.id === "unsupported";
              const Box = open ? "button" : "div";
              return (
                <Box
                  key={g.id}
                  {...(open && { type: "button", onClick: () => go(3) })}
                  className={`rounded-xl border p-4 text-left ${g.tone} ${open ? "ring-2 ring-signal" : ""}`}
                >
                  <p className="font-medium text-ink">{l[`q_${g.id}`]}</p>
                  <p className={stat}>{fill(l.s3Products, { n: g.n })}</p>
                  <p className="mt-1 text-caption text-pretty text-muted">
                    {l[`q_${g.id}Desc`]}
                  </p>
                  {g.id === "unsupported" && (
                    <p className="mt-2 text-caption font-medium text-primary">
                      {l.s3Open} →
                    </p>
                  )}
                </Box>
              );
            })}
          </Row>
        ))}
      </div>
      <p className="flex items-start gap-2 text-data text-pretty text-ink">
        <ShieldCheck
          aria-hidden
          className="mt-0.5 size-4 shrink-0 text-success"
        />
        {l.s3Neutral}
      </p>
    </div>,

    // 4. Verdict
    <div key="s4" className="grid gap-6">
      <Head l={l} k="s4" />
      <div className={`${card} p-5`}>
        <p className="font-display text-h3 text-ink">{l.s4Product}</p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-3">
          <Fact k={l.s4Requirement} v={l.s4RequirementValue} />
          <Fact
            k={l.s4Agent}
            v={
              <span className="badge badge-primary">
                <Bot aria-hidden className="size-3" /> {l.s4AgentValue}
              </span>
            }
          />
          <Fact
            k={l.s4Verdict}
            v={
              <span className="badge badge-warning">
                <CircleAlert aria-hidden className="size-3" />{" "}
                {l.s4VerdictValue}
              </span>
            }
          />
        </dl>
        <p className="mt-4 text-data text-pretty text-ink">{l.s4Why}</p>
      </div>
      <div className={`${card} overflow-hidden`}>
        <p className="border-b border-line px-5 py-3 text-caption text-muted">
          {l.s4Evidence}
        </p>
        <table className="w-full text-left text-data">
          <thead className="bg-surface-1 text-caption text-muted">
            <tr>
              <th className="px-5 py-2 font-medium">{l.s4Fact}</th>
              <th className="px-3 py-2 font-medium">{l.s4Value}</th>
              <th className="hidden px-3 py-2 font-medium sm:table-cell">
                {l.s4Source}
              </th>
              <th className="hidden px-3 py-2 font-medium md:table-cell">
                {l.s4Seen}
              </th>
              <th className="px-5 py-2 font-medium">{l.s4State}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {FACTS.map((r) => (
              <tr key={r.f}>
                <td className="px-5 py-2.5 text-ink">{l[r.f]}</td>
                <td className="px-3 py-2.5 text-ink">{l[r.v]}</td>
                <td className="hidden px-3 py-2.5 text-muted sm:table-cell">
                  {l[r.src]}
                </td>
                <td className="hidden px-3 py-2.5 text-muted md:table-cell">
                  2026-11-06
                </td>
                <td className="px-5 py-2.5">
                  <span
                    className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${STATE_BADGE[r.state]}`}
                  >
                    {l[`st_${r.state}`]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="flex items-start gap-2 text-data text-pretty text-ink">
        <ShieldCheck
          aria-hidden
          className="mt-0.5 size-4 shrink-0 text-success"
        />
        {l.s4Neutral}
      </p>
    </div>,

    // 5. Repair
    <div key="s5" className="grid gap-6">
      <Head l={l} k="s5" />
      <div className={`${card} overflow-hidden`}>
        <table className="w-full text-left text-data">
          <thead className="bg-surface-1 text-caption text-muted">
            <tr>
              <th className="px-5 py-2 font-medium">{l.s5Gap}</th>
              <th className="px-3 py-2 font-medium">{l.s5Action}</th>
              <th className="px-5 py-2 text-right font-medium">
                {l.s5Products}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {REPAIRS.map((r) => (
              <tr key={r.g} className={r.fix ? "" : "bg-surface-1"}>
                <td className="px-5 py-2.5 text-ink">{l[r.g]}</td>
                <td className="px-3 py-2.5">
                  <span className={`badge ${r.fix ? "badge-primary" : ""}`}>
                    {l[r.a]}
                  </span>
                </td>
                <td className="px-5 py-2.5 text-right tabular-nums text-ink">
                  {r.n}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between border-t border-line px-5 py-3 text-caption">
          <span className="text-success">{l.s5Fix}: 17</span>
          <span className="text-muted">{l.s5Ignore}: 43</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-caption text-muted">
        {l.s5Export}
        {EXPORTS.map((e) => (
          <span key={e} className="badge">
            {e} · {l.s5Planned}
          </span>
        ))}
      </div>
      <div>
        <button type="button" onClick={() => go(5)} className="btn btn-primary">
          {l.s5Apply} <ArrowRight aria-hidden className="size-4" />
        </button>
        <p className="mt-2 text-caption text-muted">{l.s5ApplyNote}</p>
      </div>
    </div>,

    // 6. Verify
    <div key="s6" className="grid gap-6">
      <Head l={l} k="s6" />
      <div className={`${card} grid gap-5 border-dashed p-5`}>
        <p className="rounded-lg border border-dashed border-warning-line bg-warning-bg px-3 py-2 text-center text-data font-semibold text-warning">
          {l.s6Watermark}
        </p>
        <p className="text-caption text-muted">{l.s6PickRate}</p>
        {ARMS.map((a) => (
          <div key={a.id}>
            <div className="mb-1.5 flex justify-between text-data">
              <span className="text-ink">{l[a.id]}</span>
              <span className="tabular-nums text-muted">
                {a.before}% → <span className="text-ink">{a.after}%</span>
              </span>
            </div>
            <div className="relative h-3 rounded-full bg-surface-1">
              <span
                className={`absolute inset-y-0 left-0 rounded-full ${a.bar}`}
              />
              {/* The common baseline, 31 of 50. */}
              <span
                className="absolute inset-y-0 left-31/50 w-0.5 bg-ink"
                aria-hidden
              />
            </div>
          </div>
        ))}
        <p className="text-data text-pretty text-ink">
          {fill(l.s6Result, { v: "+12", f: "+3", c: "+1" })}
        </p>
        <p className="text-caption text-pretty text-muted">{l.s6Design}</p>
      </div>
      <p className="badge badge-warning w-fit">{l.s6Illustrative}</p>
    </div>,

    // 7. Learn
    <div key="s7" className="grid gap-6">
      <Head l={l} k="s7" />
      <div className="grid gap-3 md:grid-cols-3">
        <div className={`${card} p-5 md:col-span-2`}>
          <dl className="grid gap-3 sm:grid-cols-3">
            <Fact k={l.s7Pattern} v={l.s7PatternValue} />
            <Fact k={l.s7Seen} v={l.s7SeenValue} />
            <Fact k={l.s7Effect} v={l.s7EffectValue} />
          </dl>
          <p className="mt-4 border-t border-line pt-4 text-data text-ink">
            <span className="font-medium">{l.s7Monitor}:</span>{" "}
            {l.s7MonitorValue}
          </p>
        </div>
        <div className={`${card} p-5`}>
          <p className="font-medium text-ink">{l.s7Pays}</p>
          <ul className="mt-2 grid gap-1.5 text-data text-ink">
            {["s7Pays1", "s7Pays2", "s7Pays3", "s7Pays4"].map((k) => (
              <li key={k} className="flex gap-2">
                <Check aria-hidden className="mt-0.5 size-4 text-success" />
                {l[k]}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-medium text-ink">{l.s7Never}</p>
          <p className="mt-1 flex gap-2 text-data text-ink">
            <ShieldCheck aria-hidden className="mt-0.5 size-4 text-success" />
            {l.s7Never1}
          </p>
        </div>
      </div>
      <div>
        <p className="text-caption text-muted">{l.loopTitle}</p>
        <ol className="mt-2 flex flex-wrap items-center gap-2 text-data">
          {["loop1", "loop2", "loop3", "loop4", "loop5", "loop6"].map(
            (k, i) => (
              <li key={k} className="flex items-center gap-2">
                <span className="rounded-lg border border-primary-line bg-primary-tint px-3 py-1.5 font-medium text-ink">
                  {l[k]}
                </span>
                {i < 5 && (
                  <ArrowRight aria-hidden className="size-4 text-muted" />
                )}
              </li>
            ),
          )}
        </ol>
      </div>
    </div>,
  ];

  return (
    <div className="grid gap-8">
      <p className="rounded-lg border border-dashed border-line-control bg-surface-1 px-4 py-3 text-caption text-pretty text-ink">
        {l.sampleBanner}
      </p>

      <ol className="grid grid-cols-4 gap-2 sm:grid-cols-7" aria-label="Steps">
        {STEPS.map((k, i) => (
          <li key={k}>
            <button
              type="button"
              onClick={() => go(i)}
              aria-current={i === step ? "step" : undefined}
              className={`w-full rounded-lg border px-2 py-2 text-left text-caption ${
                i === step
                  ? "border-primary bg-primary-tint text-ink"
                  : i < step
                    ? "border-success-line bg-success-bg text-ink"
                    : "border-line bg-card text-muted"
              }`}
            >
              <span className="block tabular-nums">{i + 1}</span>
              <span className="font-medium">{l[k]}</span>
            </button>
          </li>
        ))}
      </ol>

      <section
        id="mvp-stage"
        aria-live="polite"
        className="scroll-mt-24 rounded-xl border border-line blueprint-grid bg-surface-1/50 p-5 sm:p-8"
      >
        {panels[step]}
      </section>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => go(Math.max(0, step - 1))}
          disabled={step === 0}
          className="btn btn-secondary disabled:invisible"
        >
          <ArrowLeft aria-hidden className="size-4" /> {l.back}
        </button>
        {last ? (
          <button
            type="button"
            onClick={() => go(0)}
            className="btn btn-secondary"
          >
            <RotateCcw aria-hidden className="size-4" /> {l.restart}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => go(step + 1)}
            className="btn btn-primary"
          >
            {l.next} <ArrowRight aria-hidden className="size-4" />
          </button>
        )}
      </div>

      <div className={`${card} overflow-hidden`}>
        <p className="border-b border-line px-5 py-3 font-medium text-ink">
          {l.realTitle}
        </p>
        <table className="w-full text-left text-data">
          <tbody className="divide-y divide-line">
            {[
              ["r1", true],
              ["r2", true],
              ["r3", true],
              ["r4", false],
              ["r5", false],
              ["r6", false],
            ].map(([k, live]) => (
              <tr key={k as string}>
                <td className="px-5 py-2.5 text-ink">{l[k as string]}</td>
                <td className="px-5 py-2.5">
                  <span
                    className={`badge ${live ? "badge-success" : "badge-warning"}`}
                  >
                    {l[`${k}s`]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <p className="font-display text-h2 text-ink">{l.ctaTitle}</p>
        <a href={testHref} className="btn btn-primary mt-4">
          {l.ctaButton} <ArrowRight aria-hidden className="size-4" />
        </a>
      </div>
    </div>
  );
}

// What each step is today, so no reader mistakes a sample for a result (ChatGPT review, 2026-11-06).
const TAGS: Record<string, [string, string][]> = {
  s1: [["tag_live", "badge-success"]],
  s2: [
    ["tag_build", "badge-warning"],
    ["tag_sample", ""],
  ],
  s3: [["tag_sample", ""]],
  s4: [
    ["tag_liveEvidence", "badge-success"],
    ["tag_sample", ""],
  ],
  s5: [
    ["tag_liveRepair", "badge-success"],
    ["tag_proposedExport", "badge-warning"],
  ],
  s6: [
    ["tag_testing", "badge-warning"],
    ["tag_sample", ""],
  ],
  s7: [
    ["tag_proposed", "badge-warning"],
    ["tag_sample", ""],
  ],
};

function Head({ l, k }: { l: L; k: string }) {
  return (
    <div>
      <p className="mb-2 flex flex-wrap gap-1.5">
        {TAGS[k]!.map(([t, tone]) => (
          <span key={t} className={`badge ${tone}`}>
            {l[t]}
          </span>
        ))}
      </p>
      <h2 className="text-h2 text-balance">{l[`${k}Title`]}</h2>
      <p className="mt-2 max-w-2xl text-body text-pretty text-muted">
        {l[`${k}Lede`]}
      </p>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <span className="flex items-center text-caption font-medium text-muted [writing-mode:vertical-rl] rotate-180 sm:[writing-mode:horizontal-tb] sm:rotate-0">
        {label}
      </span>
      {children}
    </>
  );
}

function Fact({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div>
      <dt className="text-caption text-muted">{k}</dt>
      <dd className="mt-1 text-data text-ink">{v}</dd>
    </div>
  );
}
