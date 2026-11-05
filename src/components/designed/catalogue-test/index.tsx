/**
 * Test My Catalogue: the homepage since 2026-11-04 (owner: "just this design", Pingdom's speed
 * test, the face of thepulseapi.com), and still at `/test-my-catalogue` for links already sent.
 *
 * Pingdom's structure in Pulse's brand: a band with the heading and one row (address, category,
 * the button), one line under it for those who would rather have us run it, the result on white
 * below, a short "why" with the legends, and the site's closing band (owner's pick B, 5 Nov 2026:
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
import { StatsCounter } from "./stats-counter";

const RESULTS = [
  ["supported", "border-success-line bg-success-bg text-success"],
  ["partial", "border-warning-line bg-warning-bg text-warning"],
  ["buried", "border-gap bg-gap-fill text-gap-strong"],
  ["insufficient", "border-critical-line bg-critical-bg text-critical"],
] as const;
const FACTS = ["visible", "buried", "missing", "conflicting"] as const;

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

      <section className="border-t border-line">
        <div className="frame grid grid-cols-1 gap-10 py-16 lg:grid-cols-2 lg:py-20">
          <div className="max-w-xl">
            <h2 className="text-title text-balance">{t("infoTitle")}</h2>
            <p className="mt-4 text-pretty text-muted">{t("infoP1")}</p>
            <p className="mt-3 text-pretty text-muted">{t("infoP2")}</p>
            <p className="mt-3 text-pretty text-muted">{t("infoP3")}</p>
            <h3 className="mt-10 text-lg font-semibold text-ink">
              {t("aboutTitle")}
            </h3>
            <p className="mt-2 text-pretty text-muted">{t("aboutP1")}</p>
            <a
              href={designedHref("/en/overview")}
              className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {t("overview")}
            </a>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-line bg-card p-6">
              <h3 className="font-semibold text-ink">
                {t("legendResultsTitle")}
              </h3>
              <dl className="mt-3 space-y-2.5 text-sm">
                {RESULTS.map(([key, tone]) => (
                  <div
                    key={key}
                    className="grid grid-cols-[7.5rem_1fr] items-start gap-3"
                  >
                    <dt>
                      <span className={`badge ${tone}`}>
                        {t(`result_${key}`)}
                      </span>
                    </dt>
                    <dd className="text-pretty text-muted">
                      {t(`legend_${key}`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-xl border border-line bg-card p-6">
              <h3 className="font-semibold text-ink">
                {t("legendFactsTitle")}
              </h3>
              <dl className="mt-3 space-y-2.5 text-sm">
                {FACTS.map((key) => (
                  <div
                    key={key}
                    className="grid grid-cols-[7.5rem_1fr] items-start gap-3"
                  >
                    <dt className="font-medium text-ink">
                      {t(`fact_state_${key}`)}
                    </dt>
                    <dd className="text-pretty text-muted">
                      {t(`legend_fact_${key}`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

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
