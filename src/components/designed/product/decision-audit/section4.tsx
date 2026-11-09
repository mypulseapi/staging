/**
 * Converted from `decision-audit.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../../t";
import { renderLocale } from "@/i18n/render-locale";
import Image from "next/image";
import { img } from "@/lib/cdn";
import FIGURE_TEXT from "../figures/text.json";
import { StepsZigzag } from "../steps-zigzag";

/**
 * The three steps, as markup rather than as the exported SVG figure.
 *
 * The export drew the rail, the labels, the titles and the bodies inside three `foreignObject`
 * blocks, which fixed their order: label, title, body, and nowhere for an illustration to go. The
 * order here is rail, then illustration, then the words, and that cannot be expressed without
 * taking the pieces out of the drawing. It is also where the empty band under this section came
 * from: each block reserved 286 units of a 330-unit viewBox while the words filled about 130.
 *
 * Nothing is retyped to do it. The copy is still the figure's own `text.json`, keyed per step and
 * already carrying both locales, so `/vi` reads exactly as it did when the SVG rendered it.
 *
 * The illustrations are this page's own: they show a catalogue arriving as CSV and JSON, the
 * attributes being measured, and the ranked report that comes back, which is this page's three
 * steps and not the verification page's.
 *
 * 26 Oct 2026, the owner: laid out as the zig-zag of the newer product pages (`steps-zigzag.tsx`),
 * one row per step with its number large, instead of three columns on a rail. The three are different shapes
 * (514x836, 489x670, 486x920), so each sits centred in a fixed band rather than sized by width.
 */
const STEPS = [
  {
    n: "step-1",
    src: "use-cases/seo-aeo-hero-page-read-by-two-engines.webp",
    w: 1600,
    h: 846,
    alt: "figure1Alt",
  },
  {
    n: "step-2",
    src: "product/decision-audit-attribute-coverage-measured.webp",
    w: 489,
    h: 670,
    alt: "figure2Alt",
  },
  {
    n: "step-3",
    src: "product/decision-audit-ranked-opportunities-report.webp",
    w: 486,
    h: 920,
    alt: "figure3Alt",
  },
] as const;

const LINES = FIGURE_TEXT as Record<
  string,
  Record<string, { en: string; vi: string }>
>;

export function Section4Section() {
  const t = designedText("product.decision-audit.section4");
  const locale = renderLocale() === "vi" ? "vi" : "en";
  const lines = LINES["decision-audit/decision-audit-how-it-works"] ?? {};
  const line = (key: string) => lines[key]?.[locale] ?? lines[key]?.en ?? "";

  return (
    <StepsZigzag
      heading={t("1")}
      steps={STEPS.map((s) => ({
        label: line(`${s.n}-label`),
        title: line(`${s.n}-title`),
        body: line(`${s.n}-body`),
        picture: (
          <div className="how-glow flex min-h-[26rem] items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface-1 p-4 sm:p-5">
            <Image
              src={img(s.src)}
              alt={t(s.alt)}
              width={s.w}
              height={s.h}
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="max-h-[24rem] w-auto max-w-full object-contain"
            />
          </div>
        ),
      }))}
    />
  );
}
