/**
 * Converted from `decision-verification.html` at afedfc1 by scripts/html-to-jsx.mjs.
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
 * The illustrations are this page's own, and they are the three steps rather than the audit's:
 * a category being exported again with its progress part-way, the same attributes set before
 * against after, and the coverage that moved with the report it comes back in.
 *
 * 26 Oct 2026, the owner: laid out as the zig-zag of the newer product pages (`steps-zigzag.tsx`),
 * one row per step with its number large, instead of three columns on a rail. The three pictures are
 * the owner's transparent versions (28 Oct 2026), 3 : 2, on the Decision Audit's picture panel
 * (`how-glow` on `surface-1`), which follows the theme, in the same full-width 3 : 2 box as the other
 * product pages' steps (`Picture` in chapters.tsx). The white plate the opaque ones needed is gone.
 */
const STEPS = [
  {
    n: "step-1",
    src: "product/merchandising-studio-step-1-manage-what-the-engine-reads.webp",
    w: 1000,
    h: 667,
    alt: "figure1Alt",
  },
  {
    n: "step-2",
    src: "product/decision-verification-before-after.webp",
    w: 720,
    h: 480,
    alt: "figure2Alt",
  },
  {
    n: "step-3",
    src: "product/decision-verification-coverage-gap-report.webp",
    w: 720,
    h: 480,
    alt: "figure3Alt",
  },
] as const;

const LINES = FIGURE_TEXT as Record<
  string,
  Record<string, { en: string; vi: string }>
>;

export function Section3Section() {
  const t = designedText("product.decision-verification.section3");
  const locale = renderLocale() === "vi" ? "vi" : "en";
  const lines =
    LINES["decision-verification/decision-verification-how-it-works"] ?? {};
  const line = (key: string) => lines[key]?.[locale] ?? lines[key]?.en ?? "";

  return (
    <StepsZigzag
      heading={t("1")}
      steps={STEPS.map((s) => ({
        label: line(`${s.n}-label`),
        title: line(`${s.n}-title`),
        body: line(`${s.n}-body`),
        picture: (
          <div className="how-glow grid aspect-3/2 place-items-center overflow-hidden rounded-2xl border border-line bg-surface-1">
            <Image
              src={img(s.src)}
              alt={t(s.alt)}
              width={s.w}
              height={s.h}
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="size-full object-contain"
            />
          </div>
        ),
      }))}
    />
  );
}
