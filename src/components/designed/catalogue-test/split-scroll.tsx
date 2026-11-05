"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Image from "next/image";
import { ArrowRight, CircleDashed, FileText } from "lucide-react";
import { asset } from "@/lib/cdn";

/**
 * The homepage's second section, "Nobody buys what they cannot check", as split screens (owner, 5 Nov
 * 2026, after 21st.dev's "animated scroll"): one short message per screen, its text on one half and a
 * drawing on the other, the halves sliding in opposite directions as the page scrolls. No workflow, no
 * images: the drawings are tokens, and nothing in them is a measurement.
 *
 * Unlike the original it does not take over the wheel: the section is tall, the stage is pinned, and
 * the scroll position picks the screen, so keyboard, touch and the scrollbar all work as they do
 * elsewhere. Without JavaScript, and with reduced motion, the screens stack and nothing moves.
 */

type Result = "supported" | "partial" | "buried" | "insufficient";

const RESULT_TONE: Record<Result, string> = {
  supported: "border-success-line bg-success-bg text-success",
  partial: "border-warning-line bg-warning-bg text-warning",
  buried: "border-gap bg-gap-fill text-gap-strong",
  insufficient: "border-critical-line bg-critical-bg text-critical",
};

/** A made-up product page: a laptop glyph and three rows, each a label and a value drawn as bars. */
function PageCard({
  t,
  missing,
}: {
  t: (k: string) => string;
  missing?: boolean;
}) {
  return (
    <div className="w-full max-w-sm overflow-clip rounded-[14px] border border-line bg-card shadow-md">
      <div className="flex items-center gap-3 border-b border-line bg-surface-1 px-4 py-3">
        <svg
          viewBox="0 0 40 28"
          aria-hidden="true"
          className="w-9 fill-none stroke-line-control stroke-[1.8]"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="7" y="3" width="26" height="17" rx="2" />
          <path d="M3 24h34" />
        </svg>
        <span className="h-2.5 w-28 rounded-full bg-line" />
      </div>
      {[0, 1, 2].map((row) => {
        const gap = missing && row === 2;
        return (
          <div
            key={row}
            className={`flex items-center justify-between gap-4 border-t border-line px-4 py-3.5 first-of-type:border-t-0 ${missing && !gap ? "opacity-45" : ""}`}
          >
            <span className="grid gap-2">
              <span className="h-2 w-14 rounded-full bg-line" />
              {gap ? (
                <span className="h-2.5 w-24 rounded-full border border-dashed border-gap" />
              ) : (
                <span className="h-2.5 w-24 rounded-full bg-line-control/40" />
              )}
            </span>
            {gap ? (
              <span className="missing-flag">
                <CircleDashed className="size-3.5" aria-hidden />
                {t("fact_state_missing")}
              </span>
            ) : (
              <span className={`badge ${RESULT_TONE.supported}`}>
                {t("fact_state_visible")}
              </span>
            )}
          </div>
        );
      })}
      {missing && (
        <div className="flex justify-end border-t border-line bg-surface-1 px-4 py-3">
          <span className={`badge ${RESULT_TONE.insufficient}`}>
            {t("result_insufficient")}
          </span>
        </div>
      )}
    </div>
  );
}

/** robots.txt first, then one page at a time: once the screen is in view the four tiles light in
 *  turn, 1.5 seconds apart, and stay lit. */
function Cadence({ on }: { on: boolean }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4" aria-hidden="true">
      <span className="grid justify-items-center gap-1.5 rounded-[10px] border border-line bg-card px-3 py-3 shadow-sm">
        <FileText className="size-6 text-primary" />
        <span className="font-mono text-[0.72rem] text-muted">robots.txt</span>
      </span>
      <ArrowRight className="size-4 shrink-0 text-line-control" />
      <span className="flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            data-on={on || undefined}
            style={{ "--delay": `${0.8 + i * 1.5}s` } as CSSProperties}
            className="read-tick grid h-16 w-11 content-start gap-1.5 rounded-md border border-line bg-card p-2 sm:h-20 sm:w-14"
          >
            <span className="h-1.5 rounded-full bg-line" />
            <span className="h-1.5 w-2/3 rounded-full bg-line" />
            <span className="h-1.5 w-4/5 rounded-full bg-line" />
          </span>
        ))}
      </span>
    </div>
  );
}

export function SplitScroll({
  labels,
  overviewHref,
}: {
  labels: Record<string, string>;
  overviewHref: string;
}) {
  const t = (k: string) => labels[k] ?? k;
  const root = useRef<HTMLElement>(null);
  // Stacked until the page knows it may move: what the export, no-JS and reduced-motion readers see.
  const [pin, setPin] = useState(false);
  const [wide, setWide] = useState(true);
  const [cur, setCur] = useState(0);

  // ponytail: infoP1 is two sentences and each gets its own screen, so it is split here rather than
  // split into two keys in both catalogues.
  const [say, passed] = t("infoP1").split(/(?<=\.)\s+/, 2);

  const text =
    "flex flex-col justify-center gap-4 px-6 py-10 sm:px-10 lg:px-16";
  const body = "max-w-[46ch] text-base text-pretty text-muted md:text-lg";
  const screens: { text: ReactNode; art: ReactNode; tone: string }[] = [
    {
      text: (
        <>
          <h2 id="split-scroll-title" className="text-headline text-balance">
            {t("infoTitle")}
          </h2>
          <p className={body}>{say}</p>
        </>
      ),
      art: <PageCard t={t} />,
      tone: "bg-success-bg",
    },
    {
      text: (
        <p className="max-w-[24ch] text-title text-balance text-ink">
          {passed}
        </p>
      ),
      art: <PageCard t={t} missing />,
      tone: "bg-gap-fill",
    },
    {
      text: <p className={body}>{t("infoP2")}</p>,
      art: (
        <div className="w-full max-w-sm rounded-[14px] border border-line bg-card p-4 shadow-md sm:p-5">
          <p className="mb-2 font-semibold text-ink">
            {t("legendResultsTitle")}
          </p>
          <dl className="grid gap-2.5">
            {(Object.keys(RESULT_TONE) as Result[]).map((r) => (
              <div
                key={r}
                className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-3 text-sm text-muted"
              >
                <dt>
                  <span className={`badge ${RESULT_TONE[r]}`}>
                    {t(`result_${r}`)}
                  </span>
                </dt>
                <dd className="text-pretty">{t(`legend_${r}`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      ),
      tone: "bg-primary-tint",
    },
    {
      text: <p className={body}>{t("infoP3")}</p>,
      art: <Cadence on={!pin || cur === 3} />,
      tone: "bg-surface-1",
    },
    {
      text: (
        <>
          <h3 className="text-title text-balance">{t("aboutTitle")}</h3>
          <p className={body}>{t("aboutP1")}</p>
          <a
            href={overviewHref}
            className="group w-fit font-medium text-primary underline-offset-4 hover:underline"
          >
            {t("overview")}
            <ArrowRight
              className="ml-1 inline size-4 align-[-3px] transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </>
      ),
      art: (
        <Image
          src={asset("brand/logo-white-v2.webp")}
          alt=""
          width={168}
          height={56}
          loading="lazy"
          className="h-14 w-auto"
        />
      ),
      tone: "bg-signal-gradient",
    },
  ];
  const n = screens.length;

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const md = window.matchMedia("(min-width: 48rem)");
    let raf = 0;
    const update = () => {
      setPin(!still.matches);
      setWide(md.matches);
      const el = root.current;
      const stage = el?.querySelector("[data-stage]");
      if (!el || !stage) return;
      // How far the pinned stage has travelled through the section picks the screen.
      const r = el.getBoundingClientRect();
      const span = r.height - stage.getBoundingClientRect().height;
      const p = span > 0 ? -r.top / span : 0;
      setCur(Math.min(n - 1, Math.max(0, Math.floor(p * n))));
    };
    const kick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    still.addEventListener("change", kick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      still.removeEventListener("change", kick);
    };
  }, [n]);

  /** A dot scrolls to the middle of its screen's stretch of the section. */
  const go = (i: number) => {
    const el = root.current;
    const stage = el?.querySelector("[data-stage]");
    if (!el || !stage) return;
    const r = el.getBoundingClientRect();
    const span = r.height - stage.getBoundingClientRect().height;
    window.scrollTo({
      top: window.scrollY + r.top + ((i + 0.5) / n) * span,
      behavior: "smooth",
    });
  };

  // Left half from below and right half from above on a wide screen; on a phone the halves are stacked,
  // so the top one comes from the right and the bottom one from the left. A screen already passed
  // leaves the other way.
  const move = (i: number, half: 1 | -1) => {
    if (!pin) return undefined;
    const d = (i < cur ? -100 : i > cur ? 100 : 0) * half;
    return { transform: wide ? `translateY(${d}%)` : `translateX(${d}%)` };
  };
  const half = pin
    ? "min-h-0 overflow-hidden transition-transform duration-1000 ease-in-out-cubic"
    : "min-h-[22rem]";

  return (
    <section
      ref={root}
      aria-labelledby="split-scroll-title"
      style={pin ? { height: `${n * 100}svh` } : undefined}
      className="relative border-t border-line bg-card"
    >
      <div
        data-stage
        className={
          pin
            ? "sticky top-17 h-[calc(100svh-4.25rem)] overflow-hidden"
            : undefined
        }
      >
        {/* Before the screens, so Tab reaches the dots and then the shown screen's link. */}
        {pin && (
          <nav
            className="absolute z-10 flex gap-1 max-md:inset-x-0 max-md:bottom-2 max-md:justify-center md:top-1/2 md:right-3 md:-translate-y-1/2 md:flex-col"
            aria-label={t("infoTitle")}
          >
            {screens.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`${i + 1} / ${n}`}
                aria-current={i === cur ? "step" : undefined}
                className="group grid size-6 cursor-pointer place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-focus"
              >
                <span className="size-2 rounded-full bg-ink/25 transition-[background-color,scale] duration-300 ease-out-soft group-hover:bg-ink/50 group-aria-[current=step]:scale-125 group-aria-[current=step]:bg-primary" />
              </button>
            ))}
          </nav>
        )}

        {screens.map((s, i) => {
          // Screens alternate sides, as in the original: text left on the first, right on the second.
          const halves = [
            [`bg-card ${text}`, s.text],
            [`${s.tone} grid place-items-center px-6 py-10 sm:px-10`, s.art],
          ] as const;
          const [a, b] = i % 2 ? [halves[1], halves[0]] : halves;
          return (
            <div
              key={i}
              inert={pin && i !== cur}
              className={`grid md:grid-cols-2 ${pin ? "absolute inset-0 max-md:grid-rows-2" : "border-t border-line first:border-t-0"}`}
            >
              <div style={move(i, 1)} className={`${a[0]} ${half}`}>
                {a[1]}
              </div>
              <div style={move(i, -1)} className={`${b[0]} ${half}`}>
                {b[1]}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
