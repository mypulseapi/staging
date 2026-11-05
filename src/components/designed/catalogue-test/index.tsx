/**
 * Test My Catalogue: the homepage since 2026-11-04 (owner: "just this design", Pingdom's speed
 * test, the face of thepulseapi.com), and still at `/test-my-catalogue` for links already sent.
 *
 * Pingdom's structure in Pulse's brand: a band with the heading and one row (address, category,
 * the button), one line under it for those who would rather have us run it, the result on white
 * below, About Pulse on white, the "why" as split screens (`split-scroll.tsx`, owner, 5 Nov 2026), and the site's closing band (owner's pick B, 5 Nov 2026:
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
  const header = (
    <div key="header" className="mx-auto max-w-3xl text-center">
      <h1 className="text-hero text-balance">{t("title")}</h1>
      <p className="mt-4 text-lg text-pretty text-muted">{t("lede")}</p>
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
      <CatalogueTest
        labels={labels}
        locale={renderLocale()}
        calculator={<CalculatorBlock key="calculator" bare />}
        header={header}
        ask={ask}
      />

      {/* About Pulse, out of the scroll story and second on the page, on white (owner, 5 Nov 2026). */}
      <section
        aria-labelledby="about-pulse-title"
        className="border-t border-line bg-card"
      >
        <div className="frame grid items-center gap-6 py-16 md:grid-cols-2 md:gap-12 lg:py-20">
          <h2 id="about-pulse-title" className="text-title text-balance">
            {t("aboutTitle")}
          </h2>
          <div>
            <p className="max-w-[56ch] text-lg text-pretty text-muted">
              {t("aboutP1")}
            </p>
            <a
              href={designedHref("/en/overview")}
              className="group mt-4 inline-block font-medium text-primary underline-offset-4 hover:underline"
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
