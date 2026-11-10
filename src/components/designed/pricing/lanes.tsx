/**
 * Three ways to use Pulse, under the pricing hero (2026-10-26).
 *
 * The page used to describe only the catalogue journey. Pulse now sells to developers and AI agents
 * too, so the three lanes come first, each with its price model as decided in ODIN
 * (business/COMMERCIAL.md, MERCHANT-PROPOSAL.md): open-source tools free; the audit free and the
 * work after it from Starter; live decisions from Growth. The amounts are the plans section
 * (`plans.tsx`, PRICING.md §3.7 v0.4, USD).
 */
import Link from "next/link";
import { designedHref, designedText } from "../t";

const LANES = [
  { key: "lane1", icon: "i-github", items: 3, href: "/en/opensource" },
  { key: "lane2", icon: "i-clipboard-check", items: 5, href: "#catalogue" },
  { key: "lane3", icon: "i-terminal", items: 4, href: "#what-counts" },
] as const;

export function Lanes() {
  const t = designedText("pricing.section1");
  return (
    <section className="border-b border-line">
      <div className="frame mx-auto max-w-[1100px] py-16 lg:py-20">
        <div className="text-center">
          <h2 className="reveal text-title text-balance text-ink">
            {t("lanesTitle")}
          </h2>
          <p className="reveal mt-2 text-body text-pretty text-muted delay-100">
            {t("lanesLede")}
          </p>
        </div>
        <ul className="reveal mt-8 grid grid-cols-1 gap-5 text-left delay-100 lg:grid-cols-3">
          {LANES.map((lane) => (
            <li
              key={lane.key}
              className="flex flex-col rounded-2xl border border-line bg-card p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="nav-icon-tile size-10">
                  <svg className="size-5" aria-hidden="true">
                    <use href={`#${lane.icon}`} />
                  </svg>
                </span>
                <h3 className="min-w-0 flex-1 text-lg font-semibold text-balance text-ink">
                  {t(`${lane.key}Name`)}
                </h3>
                <span className="shrink-0 self-start rounded-full border border-line bg-surface-1 px-2.5 py-0.5 text-xs font-semibold text-ink">
                  {t(`${lane.key}Tag`)}
                </span>
              </div>
              <p className="mt-3 text-data text-pretty text-muted">
                {t(`${lane.key}Body`)}
              </p>
              <ul className="mt-4 space-y-2 text-data text-ink">
                {Array.from({ length: lane.items }, (_, i) => (
                  <li key={i} className="flex gap-2">
                    <svg
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    >
                      <use href="#i-circle-check" />
                    </svg>
                    <span>{t(`${lane.key}Item${i + 1}`)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <div className="border-t border-line pt-4">
                  <p className="font-display text-h3 font-semibold text-ink">
                    {t(`${lane.key}Price`)}
                  </p>
                  <p className="text-sm text-muted">
                    {t(`${lane.key}PriceNote`)}
                  </p>
                  <Link
                    href={
                      lane.href.startsWith("#")
                        ? lane.href
                        : designedHref(lane.href)
                    }
                    className="btn-secondary mt-4 w-full justify-center"
                  >
                    {t(`${lane.key}Cta`)}
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
