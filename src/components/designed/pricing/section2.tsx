/**
 * How the price grows: audit, repair, monitor, API, told as a scroll story (owner, 2026-11-10).
 *
 * On a wide, tall screen the section pins under the header while the visitor scrolls through it,
 * and `[data-scroll-story]` in designed-motion.js sets `data-scroll-step` and `--story` from how far they are: the
 * matching step lights up, its figure fades in, and the bar fills. All four steps' text is always in
 * the page; only the highlight moves. On a phone, a short screen, or with reduced motion, the same
 * four steps are stacked cards instead (`.story-pin` / `.story-stack` in globals.css).
 *
 * The figures are the designer's (`figures/`, through `FlowFigure`), unchanged. Each step is entered
 * only once the previous one has found something worth the next, which is the part of the business
 * model a tiered table cannot express.
 */
import { designedText } from "../t";
import { FlowFigure, type FlowFigureName } from "./flow-figure";

const STEPS: {
  key: "1" | "2" | "3" | "4";
  figure: FlowFigureName;
  icon: string;
}[] = [
  { key: "1", figure: "audit", icon: "i-user-search" },
  { key: "2", figure: "repair", icon: "i-pen" },
  { key: "3", figure: "monitor", icon: "i-trending-up" },
  { key: "4", figure: "decision-api", icon: "i-sparkles" },
];

/** The soft brand field behind the story: Sky top right, Pulse Blue bottom left. */
const FIELD =
  "bg-[radial-gradient(55%_60%_at_88%_8%,color-mix(in_oklab,var(--brand-sky)_22%,transparent),transparent),radial-gradient(50%_55%_at_8%_95%,color-mix(in_oklab,var(--color-primary)_12%,transparent),transparent)]";

function Head() {
  const t = designedText("pricing.section1");
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-title text-balance">{t("growsTitle")}</h2>
      <p className="mt-3 text-body text-pretty text-muted">{t("growsIntro")}</p>
    </div>
  );
}

function StepText({ s }: { s: (typeof STEPS)[number] }) {
  const t = designedText("pricing.section1");
  return (
    <>
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="story-num grid size-9 shrink-0 place-items-center rounded-full bg-surface-1 font-semibold text-ink transition-colors"
        >
          {s.key}
        </span>
        <h3 className="min-w-0 flex-1 pt-1 text-lg font-semibold text-balance text-ink">
          {t(`grows${s.key}Name`)}
        </h3>
        <span className="shrink-0 rounded-full border border-line bg-surface-1 px-2.5 py-0.5 text-xs font-semibold text-ink">
          {t(`grows${s.key}Tier`)}
        </span>
      </div>
      <p className="mt-2 pl-12 text-data text-pretty text-muted">
        {t(`grows${s.key}Copy`)}
      </p>
      <p className="mt-2 flex items-center gap-2 pl-12 text-data font-semibold text-ink">
        <svg className="size-4 text-primary" aria-hidden="true">
          <use href={`#${s.icon}`} />
        </svg>
        {t(`grows${s.key}Out`)}
      </p>
    </>
  );
}

export function Section2Section() {
  const t = designedText("pricing.section1");
  return (
    <section className="border-b border-line">
      {/* Pinned: wide and tall screens that allow motion. */}
      <div
        data-scroll-story="4"
        data-scroll-step="1"
        className="story-pin relative h-[380vh]"
      >
        <div
          className={`sticky top-17 flex h-[calc(100svh-4.25rem)] flex-col justify-center ${FIELD}`}
        >
          <div className="frame w-full">
            <Head />
            <div
              className="mt-6 flex items-center justify-center gap-2"
              aria-hidden="true"
            >
              {STEPS.map((s, i) => (
                <span
                  key={s.key}
                  className="h-1 w-24 overflow-hidden rounded-full bg-line"
                >
                  <span
                    className="block h-full origin-left bg-primary"
                    style={{
                      transform: `scaleX(clamp(0, calc(var(--story, 0) * 4 - ${i}), 1))`,
                    }}
                  />
                </span>
              ))}
              <span className="ml-3 text-sm font-semibold text-muted">
                {STEPS.map((s) => (
                  <span
                    key={s.key}
                    data-i={s.key}
                    className="story-label hidden"
                  >
                    {t("storyStep").replace("{n}", s.key)}
                  </span>
                ))}
              </span>
            </div>
            <div className="mx-auto mt-8 grid max-w-[1120px] grid-cols-[5fr_6fr] gap-10">
              <ol className="space-y-3">
                {STEPS.map((s) => (
                  <li
                    key={s.key}
                    data-i={s.key}
                    className="story-step rounded-2xl border border-line bg-card p-4 shadow-sm"
                  >
                    <StepText s={s} />
                  </li>
                ))}
              </ol>
              <div className="relative rounded-3xl border border-line bg-card shadow-sm">
                {STEPS.map((s) => (
                  <div
                    key={s.key}
                    data-i={s.key}
                    className="story-fig absolute inset-0 flex items-center justify-center p-10"
                  >
                    <FlowFigure name={s.figure} label={t(`grows${s.key}Alt`)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stacked: phones, short screens and reduced motion. */}
      <div className={`story-stack frame py-16 ${FIELD}`}>
        <Head />
        <ol className="mx-auto mt-10 max-w-xl space-y-5">
          {STEPS.map((s) => (
            <li
              key={s.key}
              className="rounded-3xl border border-line bg-card p-5 shadow-sm"
            >
              <StepText s={s} />
              <div className="mt-4 h-[180px]">
                <FlowFigure
                  name={s.figure}
                  label={t(`grows${s.key}Alt`)}
                  idSuffix="-stack"
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
