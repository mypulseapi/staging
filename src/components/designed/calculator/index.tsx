/**
 * The calculator: what a lift in conversion is worth to the merchant, in their own numbers, as five
 * steps. At the top of /pricing, inside the hero (owner, 2026-11-04: this is what we sell, so it comes
 * first), as its own section on /contact, and bare after a Test My Catalogue run, where step 5 shows the
 * store's own gaps (`TestedGapsContext`). Never a page of its own.
 *
 * rainbow `ODIN/business/CONVERSION-MODEL.md`: one formula for every industry (§ 1), an industry
 * layer (§ 3, technology first), and categories whose questions come from the requirement library
 * (`apps/api/road-runner/config/vision-requirements.json`, laptop and monitor). A category is listed
 * only once it is in that library, so nothing here is a guess about the shopper.
 */
import Link from "next/link";
import en from "../../../../messages/designed.en.json";
import { designedHref, designedText } from "../t";
import { renderLocale } from "@/i18n/render-locale";
import { Calculator } from "./calculator";

// The requirement library's ids, in its order. Labels are translated in the message files.
const CATEGORIES = {
  laptop: [
    "portable",
    "two-monitors",
    "all-day-battery",
    "memory",
    "screen",
    "operating-system",
    "look",
  ],
  monitor: [
    "size",
    "sharpness",
    "smooth-motion",
    "connects",
    "desk-fit",
    "look",
  ],
} as const;

/**
 * Calculator and the category questions, with no section around them. `bare`: the calculator alone,
 * for Test My Catalogue's result, which has its own heading above it. The old lede went with the
 * design: its title asks the question, and step 1 says the numbers are an example.
 */
export function CalculatorBlock({ bare = false }: { bare?: boolean }) {
  const t = designedText("calculator.page");
  const labels = Object.fromEntries(
    Object.keys(en.calculator.page).map((k) => [k, t(k)]),
  );
  if (bare) return <Calculator labels={labels} locale={renderLocale()} />;
  return (
    <div id="calculator" className="mx-auto max-w-[1100px] scroll-mt-24">
      <Calculator labels={labels} locale={renderLocale()} heading />

      <details className="group mt-4 rounded-2xl border border-line bg-card text-left">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4">
          <span>
            <span className="block font-semibold text-ink">
              {t("questionsTitle")}
            </span>
            <span className="mt-0.5 block text-sm text-muted">
              {t("industry")}{" "}
              <Link
                href={designedHref("/en/industries/technology")}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {t("industryName")}
              </Link>
            </span>
          </span>
          <svg
            className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180"
            aria-hidden="true"
          >
            <use href="#i-chevron-down" />
          </svg>
        </summary>
        <div className="border-t border-line px-6 pt-4 pb-6">
          <p className="text-sm text-pretty text-muted">{t("questionsLede")}</p>
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            {(Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[]).map(
              (cat) => (
                <div key={cat}>
                  <h4 className="font-semibold text-ink">{t(`${cat}Name`)}</h4>
                  <ul className="mt-2">
                    {CATEGORIES[cat].map((id) => (
                      <li
                        key={id}
                        className="flex items-start gap-3 border-t border-line py-2.5 first:border-t-0"
                      >
                        <svg
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        >
                          <use href="#i-check" />
                        </svg>
                        <span className="text-sm text-pretty text-ink">
                          {t(`${cat}-${id}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
          <p className="mt-4 text-sm text-pretty text-muted">
            {t("questionsNote")} {t("measureBody")}
          </p>
        </div>
      </details>
    </div>
  );
}

/** The block as a section of its own, for /contact. */
export function CalculatorSection() {
  return (
    <section className="border-b border-line">
      <div className="frame py-16 lg:py-20">
        <CalculatorBlock />
      </div>
    </section>
  );
}
