"use client";

import { useState } from "react";
import type { RequirementResult } from "@/lib/catalogue-test";

/**
 * The verdict as a ring (the designer's donut, option A, owner's pick, 5 Nov 2026): one segment per
 * result, its share of the requirements, from 12 o'clock clockwise. Each segment has its own dark
 * border and rounded corners, with an even gap between segments, as in the owner's 21st.dev
 * reference. A colour key beside it; on hover a segment moves out and a tooltip gives its count.
 */

// In the SVG's 240-unit box: rim, hole, half the gap, corner radius, and the hover lift.
const C = 120;
const R = 108;
const r = 68;
const HALF_GAP = 4;
const CORNER = 7;
const LIFT = 5;

const SEG: Record<RequirementResult, string> = {
  supported: "fill-success",
  partial: "fill-[color-mix(in_oklab,var(--color-gap)_78%,var(--color-card))]",
  buried: "fill-baseline",
  insufficient: "fill-critical",
};
const SWATCH: Record<RequirementResult, string> = {
  supported: "bg-success",
  partial: "bg-[color-mix(in_oklab,var(--color-gap)_78%,var(--color-card))]",
  buried: "bg-baseline",
  insufficient: "bg-critical",
};
/** The segments' border: ink on light, a black below the page on dark. */
const EDGE =
  "light-dark(color-mix(in oklab, var(--color-ink) 80%, var(--color-card)), color-mix(in oklab, var(--color-surface-0) 55%, #000))";

const at = (rho: number, a: number) =>
  `${+(C + rho * Math.sin(a)).toFixed(2)} ${+(C - rho * Math.cos(a)).toFixed(2)}`;

/**
 * A ring segment from angle a0 to a1 (radians, clockwise from 12 o'clock). Its straight edges are
 * offset parallel by half the gap, so the gap is as wide at the rim as at the hole, and each corner is
 * a fillet tangent to the edge and the circle. A small segment gets smaller corners, then a narrower gap.
 */
function sector(a0: number, a1: number) {
  const span = a1 - a0;
  const fits = (h: number, k: number) =>
    2 * Math.asin((h + k) / (r + k)) < span * 0.9;
  let h = HALF_GAP;
  let k = CORNER;
  while (k > 0 && !fits(h, k)) k -= 0.5;
  if (!fits(h, k)) h = r * Math.sin(span * 0.4);
  // A point on a straight edge, where the fillet meets it; `side` 1 is the start edge, -1 the end.
  const edge = (a: number, side: number, rho: number) => {
    const d = Math.sqrt(rho * rho - (h + k) ** 2);
    const x = C + d * Math.sin(a) + side * h * Math.cos(a);
    const y = C - d * Math.cos(a) + side * h * Math.sin(a);
    return `${+x.toFixed(2)} ${+y.toFixed(2)}`;
  };
  const dOut = Math.asin((h + k) / (R - k));
  const dIn = Math.asin((h + k) / (r + k));
  const bigOut = span - 2 * dOut > Math.PI ? 1 : 0;
  const bigIn = span - 2 * dIn > Math.PI ? 1 : 0;
  const fillet = `A${k} ${k} 0 0 1`;
  return [
    `M${at(R, a0 + dOut)}`,
    `A${R} ${R} 0 ${bigOut} 1 ${at(R, a1 - dOut)}`,
    `${fillet} ${edge(a1, -1, R - k)}`,
    `L${edge(a1, -1, r + k)}`,
    `${fillet} ${at(r, a1 - dIn)}`,
    `A${r} ${r} 0 ${bigIn} 0 ${at(r, a0 + dIn)}`,
    `${fillet} ${edge(a0, 1, r + k)}`,
    `L${edge(a0, 1, R - k)}`,
    `${fillet} ${at(R, a0 + dOut)}Z`,
  ].join("");
}

/** One result is every requirement: the whole ring, no gap. */
const ANNULUS = `M${C} ${C - R}A${R} ${R} 0 1 1 ${C} ${C + R}A${R} ${R} 0 1 1 ${C} ${C - R}ZM${C} ${C - r}A${r} ${r} 0 1 0 ${C} ${C + r}A${r} ${r} 0 1 0 ${C} ${C - r}Z`;

export function VerdictDonut({
  order,
  count,
  total,
  t,
  num,
}: {
  order: RequirementResult[];
  count: Record<RequirementResult, number>;
  total: number;
  t: (k: string, vars?: Record<string, string | number>) => string;
  num: (n: number) => string;
}) {
  const [hover, setHover] = useState<RequirementResult | null>(null);
  const shown = order.filter((res) => count[res]);
  const before = (i: number) =>
    shown.slice(0, i).reduce((n, res) => n + count[res], 0);
  const segs = shown.map((res, i) => {
    const a0 = (before(i) / total) * 2 * Math.PI;
    const a1 = (before(i + 1) / total) * 2 * Math.PI;
    const mid = (a0 + a1) / 2;
    return { res, a0, a1, sin: Math.sin(mid), cos: Math.cos(mid) };
  });
  const tip = segs.find((s) => s.res === hover);

  return (
    // Beside the headline on desktop, under it and centred on a phone; the colour key to the ring's right,
    // one result a line, its counts in the tooltip (owner, 5 Nov 2026).
    <div className="flex shrink-0 items-center gap-6 max-md:gap-5 max-md:self-center">
      <div className="relative size-58 shrink-0 max-md:size-48">
        <svg
          viewBox="0 0 240 240"
          role="img"
          aria-label={order
            .map((res) => `${t(`result_${res}`)} ${count[res]} / ${total}`)
            .join(", ")}
          className="block size-full overflow-visible"
        >
          {segs.map((s) => (
            <path
              key={s.res}
              d={segs.length === 1 ? ANNULUS : sector(s.a0, s.a1)}
              fillRule="evenodd"
              className={SEG[s.res]}
              style={{
                stroke: EDGE,
                strokeWidth: 3,
                strokeLinejoin: "round",
                transform:
                  hover === s.res
                    ? `translate(${LIFT * s.sin}px, ${-LIFT * s.cos}px)`
                    : undefined,
              }}
              onMouseEnter={() => setHover(s.res)}
              onMouseLeave={() => setHover(null)}
            />
          ))}
        </svg>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[25%] flex flex-col items-center justify-center text-center"
        >
          <p className="flex items-baseline justify-center gap-1">
            <b className="font-[family-name:var(--font-title)] text-[44px] leading-none max-md:text-4xl font-[620] [font-stretch:112%] tracking-[-0.03em] text-ink">
              {num(count.supported)}
            </b>
            <small className="text-xl font-medium text-muted max-md:text-lg">
              / {num(total)}
            </small>
          </p>
          <p className="mt-1 text-sm leading-tight max-md:text-xs text-balance text-muted">
            {t("donutCentre")}
          </p>
        </div>
        {tip && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-10 w-max min-w-42 rounded-[10px] whitespace-nowrap border border-void-line bg-void px-3 py-2.5 text-void-text shadow-[0_6px_18px_rgb(0_0_0/0.28)]"
            style={{
              left: `${((C + (R + 6) * tip.sin) / 240) * 100}%`,
              top: `${((C - (R + 6) * tip.cos) / 240) * 100}%`,
              // Opens toward the ring's middle sideways, so it stays inside the card with the ring at its edge.
              transform: `translate(calc(-50% - ${tip.sin * 50}%), calc(-50% + ${-tip.cos * 50}%))`,
            }}
          >
            <p className="text-xs text-void-muted">{t("donutTip")}</p>
            <p className="mt-1 flex items-center gap-2 text-sm">
              <i
                className={`size-[15px] shrink-0 rounded-[5px] border-[1.5px] border-void shadow-[0_0_0_1px_var(--color-void-line-strong)] ${SWATCH[tip.res]}`}
              />
              {t(`result_${tip.res}`)}
              <b className="ml-auto pl-3 font-[family-name:var(--font-title)] font-[620] [font-stretch:112%]">
                {num(count[tip.res])} / {num(total)}
              </b>
            </p>
          </div>
        )}
      </div>
      <ul className="grid gap-y-2.5">
        {order.map((res) => (
          <li
            key={res}
            className={`flex items-center gap-2 text-sm ${count[res] ? "text-ink" : "text-muted"}`}
          >
            <i
              aria-hidden="true"
              className={`size-[15px] shrink-0 rounded-[5px] border-[1.5px] ${count[res] ? SWATCH[res] : "border-dashed border-line-control"}`}
              style={count[res] ? { borderColor: EDGE } : undefined}
            />
            {t(`result_${res}`)}
          </li>
        ))}
      </ul>
    </div>
  );
}
