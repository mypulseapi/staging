"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { img } from "@/lib/cdn";

/**
 * The homepage's third section, "Nobody buys what they can't verify", as split screens (owner, 5 Nov
 * 2026, after 21st.dev's "animated scroll"): one short message per screen, its text on one half and a
 * photo on the other (Unsplash, the designer's picks with the owner's choice for the first), the halves
 * sliding in opposite directions as the page scrolls. No workflow; nothing pictured is a measurement.
 *
 * Unlike the original it does not take over the wheel: the section is tall, the stage is pinned, and
 * the scroll position picks the screen, so keyboard, touch and the scrollbar all work as they do
 * elsewhere. Without JavaScript, and with reduced motion, the screens stack and nothing moves.
 */

/** Scroll per screen, in svh. */
const STEP = 25;

type Result = "supported" | "partial" | "buried" | "insufficient";

const RESULT_TONE: Record<Result, string> = {
  supported: "border-success-line bg-success-bg text-success",
  partial: "border-warning-line bg-warning-bg text-warning",
  buried: "border-gap bg-gap-fill text-gap-strong",
  insufficient: "border-critical-line bg-critical-bg text-critical",
};

/**
 * A screen's photo, full bleed, with the screen's colour washed over it so the half keeps its meaning
 * (the designer's "Tinted", owner's picks, 5 Nov 2026): multiplied in light, a light wash over a dimmed
 * photo in dark. Decorative, so no alt text; credits in `IMAGE-CREDITS.json`.
 */
function Photo({ src, pos, tone }: { src: string; pos: string; tone: string }) {
  return (
    <>
      <Image
        src={img(src)}
        alt=""
        fill
        sizes="(min-width: 48rem) 50vw, 100vw"
        loading="lazy"
        style={{ objectPosition: pos }}
        className="-z-10 object-cover theme-dark:brightness-[.82] theme-dark:contrast-[1.03]"
      />
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 mix-blend-multiply theme-dark:opacity-40 theme-dark:mix-blend-normal ${tone}`}
      />
    </>
  );
}

export function SplitScroll({ labels }: { labels: Record<string, string> }) {
  const t = (k: string) => labels[k] ?? k;
  const root = useRef<HTMLElement>(null);
  // Stacked until the page knows it may move: what the export, no-JS and reduced-motion readers see.
  const [pin, setPin] = useState(false);
  const [wide, setWide] = useState(true);
  const [cur, setCur] = useState(0);

  // One line per screen, its last words in Pulse Blue (owner, 5 Nov 2026), and no paragraph under it.
  const line = (i: number) => {
    const [before, after] = t(`why${i}`).split(t(`why${i}Mark`));
    return (
      <>
        {before}
        <span className="text-primary">{t(`why${i}Mark`)}</span>
        {after}
      </>
    );
  };
  const text = "flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-16";
  const head = "max-w-[18ch] text-headline text-balance text-ink";
  const screens: {
    text: ReactNode;
    photo: string;
    pos: string;
    tone: string;
    /** The text half: the screen's tone a step deeper, a site-token mix (the designer's version A,
     *  owner's pick, 5 Nov 2026). Every pair stays AA in both themes. */
    field: string;
    card?: ReactNode;
  }[] = [
    {
      text: (
        <h2 id="split-scroll-title" className={head}>
          {line(1)}
        </h2>
      ),
      photo: "home/why-shopper-phone.webp",
      pos: "55% 40%",
      tone: "bg-success-bg",
      field:
        "bg-[color-mix(in_oklab,var(--color-success)_9%,var(--color-success-bg))]",
    },
    {
      text: <p className={head}>{line(2)}</p>,
      photo: "home/why-empty-shelves.webp",
      pos: "50% 40%",
      tone: "bg-gap-fill",
      field:
        "bg-[color-mix(in_oklab,var(--color-gap)_12%,var(--color-gap-fill))]",
    },
    {
      text: <p className={head}>{line(3)}</p>,
      photo: "home/why-laptop-notebook.webp",
      pos: "50% 50%",
      // The result colours sit over the photo, in its empty top; on a phone, the badges only.
      card: (
        <div className="absolute inset-x-3.5 top-3.5 rounded-[14px] border border-line bg-card p-4 shadow-md md:inset-x-auto md:top-[6%] md:left-1/2 md:w-[min(88%,24rem)] md:-translate-x-1/2 md:p-5">
          <p className="mb-2 font-semibold text-ink">
            {t("legendResultsTitle")}
          </p>
          <dl className="flex flex-wrap gap-2 md:grid md:gap-2.5">
            {(Object.keys(RESULT_TONE) as Result[]).map((r) => (
              <div
                key={r}
                className="items-start gap-3 text-sm text-muted md:grid md:grid-cols-[6.5rem_minmax(0,1fr)]"
              >
                <dt>
                  <span className={`badge ${RESULT_TONE[r]}`}>
                    {t(`result_${r}`)}
                  </span>
                </dt>
                <dd className="text-pretty max-md:sr-only">
                  {t(`legend_${r}`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ),
      tone: "bg-primary-tint",
      field:
        "bg-[color-mix(in_oklab,var(--color-primary)_7%,var(--color-primary-tint))]",
    },
    {
      text: <p className={head}>{line(4)}</p>,
      photo: "home/why-reading-laptop.webp",
      pos: "40% 55%",
      tone: "bg-surface-1",
      field:
        "bg-[color-mix(in_oklab,var(--color-sky)_9%,var(--color-surface-1))]",
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
      // The stage's own height plus 25svh of scroll per screen, so a screen changes after a short scroll
      // (owner, 5 Nov 2026: a full screen of scroll per screen felt long).
      style={
        pin ? { height: `calc(100svh - 4.25rem + ${n * STEP}svh)` } : undefined
      }
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
            aria-label={t("why1")}
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
            [`${s.field} ${text}`, s.text],
            [
              "relative isolate",
              <>
                <Photo src={s.photo} pos={s.pos} tone={s.tone} />
                {s.card}
              </>,
            ],
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
