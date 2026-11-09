"use client";

import { useInView } from "@/components/charts/useInView";
import { EASE } from "@/components/charts/tokens";

/**
 * Three small drawings for a page's three steps.
 *
 * That section was a number, a heading and a paragraph, three times over, on
 * the six sector pages and on every story page using the timeline shape. Nothing wrong with the words; they just had nothing to
 * look at, and it is the part of the page that explains the actual engagement.
 *
 * Drawn rather than photographed, for the reasons the rest of this codebase is:
 * an SVG carries no text to translate, costs a few hundred bytes, matches the
 * validated palette exactly, and can animate on scroll. A stock photograph of a
 * warehouse would say less and weigh fifty times more.
 *
 * Decorative: each one repeats what its heading already says, so they are
 * `aria-hidden` and a screen reader is not made to sit through them.
 */

const GOOD = "var(--sig-deep)";
const WORK = "var(--sig-deep)";
const HOLD = "#A16207";
const LINE = "#d7dbe2";

function Frame({ children, shown }: { children: React.ReactNode; shown: boolean }) {
  return (
    <svg
      viewBox="0 0 160 96"
      aria-hidden
      className="h-auto w-full max-w-[13rem]"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(8px)",
        transition: `opacity 520ms ${EASE}, transform 520ms ${EASE}`,
      }}
    >
      {children}
    </svg>
  );
}

/** 01: the store's public product pages are read. */
function SendArt({ shown }: { shown: boolean }) {
  return (
    <Frame shown={shown}>
      <rect x="6" y="14" width="56" height="68" rx="6" fill="#fff" stroke={LINE} strokeWidth="2" />
      {[24, 34, 44, 54, 64].map((y, i) => (
        <rect
          key={y}
          x="15"
          y={y}
          width={i === 4 ? 22 : 38}
          height="4"
          rx="2"
          fill={i < 2 ? GOOD : LINE}
          style={{
            opacity: shown ? 1 : 0,
            transition: `opacity 300ms ${EASE}`,
            transitionDelay: `${180 + i * 70}ms`,
          }}
        />
      ))}
      {/* the rows leaving, one row at a time */}
      {[30, 48, 66].map((y, i) => (
        <g
          key={y}
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateX(0)" : "translateX(-10px)",
            transition: `opacity 420ms ${EASE}, transform 420ms ${EASE}`,
            transitionDelay: `${520 + i * 130}ms`,
          }}
        >
          <rect x="74" y={y} width="34" height="8" rx="4" fill="var(--sig-tint)" stroke={GOOD} strokeWidth="1.5" />
        </g>
      ))}
      <path
        d="M118 48 h26 m0 0 l-7 -6 m7 6 l-7 6"
        stroke={GOOD}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{
          opacity: shown ? 1 : 0,
          transition: `opacity 400ms ${EASE}`,
          transitionDelay: "940ms",
        }}
      />
    </Frame>
  );
}

/** 02 — the attributes come back in an order. */
function RankArt({ shown }: { shown: boolean }) {
  const rows = [
    { w: 118, c: GOOD, top: true },
    { w: 86, c: WORK, top: false },
    { w: 58, c: WORK, top: false },
    { w: 34, c: LINE, top: false },
  ];
  return (
    <Frame shown={shown}>
      {rows.map((r, i) => {
        const y = 14 + i * 20;
        return (
          <g key={y}>
            <rect x="6" y={y} width="10" height="10" rx="3" fill={r.top ? GOOD : "#eef0f4"} />
            <rect
              x="22"
              y={y + 2}
              height="6"
              rx="3"
              fill={r.c}
              width={shown ? r.w : 0}
              style={{ transition: `width 760ms ${EASE}`, transitionDelay: `${160 + i * 120}ms` }}
            />
          </g>
        );
      })}
      {/* the badge on the one to do first */}
      <g
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "scale(1)" : "scale(0.7)",
          transformOrigin: "11px 19px",
          transition: `opacity 360ms ${EASE}, transform 360ms ${EASE}`,
          transitionDelay: "760ms",
        }}
      >
        <path d="M8.5 19 l2 2 l3.5 -4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </Frame>
  );
}

/** 03 — the same measurement, run again on the repaired catalogue. */
function VerifyArt({ shown }: { shown: boolean }) {
  return (
    <Frame shown={shown}>
      {/* before */}
      <rect x="6" y="22" width="60" height="10" rx="5" fill="#eef0f4" />
      <rect
        x="6"
        y="22"
        height="10"
        rx="5"
        fill={HOLD}
        width={shown ? 26 : 0}
        style={{ transition: `width 680ms ${EASE}`, transitionDelay: "160ms" }}
      />
      <text x="6" y="16" fontSize="8" fontWeight="700" fill={HOLD}>before</text>

      {/* after */}
      <rect x="6" y="62" width="60" height="10" rx="5" fill="#eef0f4" />
      <rect
        x="6"
        y="62"
        height="10"
        rx="5"
        fill={GOOD}
        width={shown ? 60 : 0}
        style={{ transition: `width 900ms ${EASE}`, transitionDelay: "520ms" }}
      />
      <text x="6" y="56" fontSize="8" fontWeight="700" fill={GOOD}>after</text>

      <path
        d="M78 47 h16 m0 0 l-6 -5 m6 5 l-6 5"
        stroke={LINE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <g
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "scale(1)" : "scale(0.6)",
          transformOrigin: "128px 47px",
          transition: `opacity 420ms ${EASE}, transform 420ms ${EASE}`,
          transitionDelay: "1180ms",
        }}
      >
        <circle cx="128" cy="47" r="18" fill="var(--sig-tint)" stroke={GOOD} strokeWidth="2" />
        <path d="M120 47 l6 6 l11 -13" stroke={GOOD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </Frame>
  );
}

const ART = [SendArt, RankArt, VerifyArt] as const;

/**
 * `above` on the sector pages, where the drawing leads the step, and `below`
 * on the story pages, where the numbered rail already leads it.
 */
export function StepArt({ step, place = "above" }: { step: 1 | 2 | 3; place?: "above" | "below" }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  const Art = ART[step - 1];
  return (
    <div ref={ref} className={place === "above" ? "mb-6" : "mt-auto pt-7"}>
      <Art shown={shown} />
    </div>
  );
}
