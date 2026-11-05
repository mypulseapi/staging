/**
 * Test My Catalogue: the homepage since 2026-11-04 (owner: "just this design", Pingdom's speed
 * test, the face of thepulseapi.com), and still at `/test-my-catalogue` for links already sent.
 *
 * Pingdom's structure in Pulse's brand: a band with the heading and one row (address, category,
 * the button), one line under it for those who would rather have us run it, the result on white
 * below, About Pulse as its own section, the "why" as split screens (`split-scroll.tsx`, owner, 5 Nov 2026), and the site's closing band (owner's pick B, 5 Nov 2026:
 * the ask left the hero so the bar is the only button there). The client component draws the band,
 * the live run and the result; the heading, that line and every label come from here, and the
 * calculator as a server-rendered child.
 */
import en from "../../../../messages/designed.en.json";
import { designedHref, designedText } from "../t";
import { renderLocale } from "@/i18n/render-locale";
import { ArrowRight } from "lucide-react";
import { CalculatorBlock } from "../calculator";
import { CtaBoxes } from "../cta-boxes";
import { CatalogueTest } from "./catalogue-test";
import { SplitScroll } from "./split-scroll";
import { StatsCounter } from "./stats-counter";

export function CatalogueTestPage() {
  const t = designedText("catalogueTest.page");
  const labels = Object.fromEntries(
    Object.keys(en.catalogueTest.page).map((k) => [k, t(k)]),
  );
  const [before, after] = t("title").split(t("titleMark"));
  const header = (
    <div key="header" className="mx-auto w-full max-w-3xl text-center">
      {/* No description under it (owner, 5 Nov 2026); the missing word in Signal Red, its one use here. */}
      <h1 className="text-hero text-balance">
        {before}
        <span className="text-signal-text">{t("titleMark")}</span>
        {after}
      </h1>
      <StatsCounter labels={labels} locale={renderLocale()} />
    </div>
  );
  const ask = (
    <p
      key="ask"
      className="mt-6 text-center text-[0.9375rem] text-pretty text-muted"
    >
      {t("askLead")}{" "}
      <a
        href={designedHref("/en/contact")}
        className="group font-medium text-primary underline-offset-4 hover:underline"
      >
        {t("ctaButton")}
        <ArrowRight
          className="ml-0.5 inline size-3.5 align-[-2px] transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5"
          aria-hidden
        />
      </a>
    </p>
  );

  return (
    <>
      {/* The hero and About Pulse fill the first screen under the header together (68px and its 1px border),
          so the split screens never start above the fold (owner,
          5 Nov 2026). About keeps its own height; the hero takes the rest, its content centred. On a
          short screen the two are taller than it and simply run on. */}
      <div className="flex min-h-[calc(100svh-4.25rem-1px)] flex-col">
        <CatalogueTest
          labels={labels}
          locale={renderLocale()}
          calculator={<CalculatorBlock key="calculator" bare />}
          header={header}
          ask={ask}
        />

        {/* About Pulse, a section of its own after the hero, on white, its heading at the section title size
          (owner, 5 Nov 2026). A text link, so the hero's bar keeps the page's first button. */}
        <section aria-labelledby="about-pulse-title" className="bg-card">
          <div className="frame grid items-center gap-x-16 gap-y-5 py-20 md:grid-cols-2 lg:py-28">
            <h2 id="about-pulse-title" className="text-title text-balance">
              {t("aboutTitle")}
            </h2>
            <div>
              <p className="max-w-[56ch] text-lg text-pretty text-muted">
                {t("aboutP1")}
              </p>
              <a
                href={designedHref("/en/overview")}
                className="group mt-5 inline-block font-medium text-primary underline-offset-4 hover:underline"
              >
                {t("overview")}
                <ArrowRight
                  className="ml-1 inline size-4 align-[-3px] transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </div>
          </div>
        </section>
      </div>

      <SplitScroll labels={labels} />

      <section
        id="request"
        className="cta-boxes scroll-mt-16 border-t border-line"
      >
        <CtaBoxes />
        <div className="frame py-24 text-center lg:py-32">
          <h2 className="reveal mx-auto max-w-3xl text-headline text-balance">
            {t("ctaStrong")}
          </h2>
          <p className="reveal mx-auto mt-4 max-w-xl text-lg text-pretty text-muted delay-100">
            {t("ctaText")}
          </p>
          <div className="reveal mt-8 flex justify-center delay-200">
            <a href={designedHref("/en/contact")} className="btn-primary">
              {t("ctaButton")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
