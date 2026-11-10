import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderLocale } from "@/i18n/render-locale";
import VI from "./figures/text.json";

/**
 * The four pricing-flow illustrations, read at build time and inlined, like the product figures.
 *
 * Inlined rather than an <img> so the labels can be translated: each `>Label<` in the SVG is
 * swapped for its Vietnamese line from `figures/text.json`. Three labels from the designer's files
 * were replaced before they landed, because they described a "+32%" result nobody measured and
 * features Pulse does not have (generated content, image scoring, data enrichment).
 */
const DIR = join(
  process.cwd(),
  "src",
  "components",
  "designed",
  "pricing",
  "figures",
);
export type FlowFigureName = keyof typeof VI;

export function FlowFigure({
  name,
  label,
  idSuffix,
}: {
  name: FlowFigureName;
  label: string;
  /**
   * For a second copy on the same page: its `pf-*` ids (the audit gradient) get this suffix, so its
   * `url(#…)` does not resolve to the other copy, which may be hidden and then paints nothing.
   */
  idSuffix?: string;
}) {
  let svg = readFileSync(join(DIR, `${name}.svg`), "utf8");
  if (idSuffix) {
    svg = svg.replace(/(id="|url\(#|href="#)(pf-[\w-]+)/g, `$1$2${idSuffix}`);
  }
  if (renderLocale() === "vi") {
    for (const [en, vi] of Object.entries(VI[name] as Record<string, string>)) {
      svg = svg.split(`>${en}<`).join(`>${vi}<`);
    }
  }
  return (
    <div
      role="img"
      aria-label={label}
      className="h-full w-full [&>svg]:h-full [&>svg]:w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
