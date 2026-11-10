/**
 * The pricing hero: the title, the billing switch and the plans as cards (owner, 2026-11-10).
 *
 * Growth is the one plan the page sells, so it is the only card with a colour, the wide one at the
 * top left, and the only filled button. Enterprise sells too, so it gets a full-width card of its
 * own rather than a band. On a phone the cards stack in price order (`lg:order-*` sets the desktop
 * arrangement), and the DOM keeps that order for screen readers.
 *
 * The amounts are rainbow's `ODIN/product/PRICING.md` §3.7, v0.4, printed by
 * `scripts/pricing-unit-margin.py`, which refuses any price below a 40% margin on cost to serve.
 * Change a price there first, then here, or the page and the invoice disagree. Yearly is ten
 * months' price for twelve (§3.7). The billing switch is two radio buttons and CSS, no script.
 */
import Link from "next/link";
import { renderLocale } from "@/i18n/render-locale";
import { HeroAurora } from "@/components/designed/hero-aurora";
import { designedHref, designedText } from "../t";

type Plan = {
  key: "free" | "starter" | "growth" | "scale" | "enterprise";
  /** USD a month; Enterprise's is "from". */
  usd: number;
  calls?: number;
  products?: number;
  /** Per 1,000 calls above the plan, USD. */
  over?: number;
  features: string[];
  order: string;
  span: string;
};

const PLANS: Plan[] = [
  {
    key: "free",
    usd: 0,
    features: ["fAudit1", "fSdk", "fMeas"],
    order: "lg:order-2",
    span: "lg:col-span-4",
  },
  {
    key: "starter",
    usd: 349,
    calls: 10_000,
    products: 1_000,
    over: 10,
    features: ["fAudit3", "fVerif", "fReturn"],
    order: "lg:order-3",
    span: "lg:col-span-6",
  },
  {
    key: "growth",
    usd: 990,
    calls: 100_000,
    products: 5_000,
    over: 5,
    features: ["fAuditAll", "fApi", "fEveryStarter"],
    order: "lg:order-1",
    span: "lg:col-span-8",
  },
  {
    key: "scale",
    usd: 2_390,
    calls: 2_500_000,
    products: 25_000,
    over: 2,
    features: ["fSearch", "fMerch", "fHold"],
    order: "lg:order-4",
    span: "lg:col-span-6",
  },
];

const ENTERPRISE = {
  usd: 6_990,
  calls: 10_000_000,
  products: 100_000,
  over: 1.5,
  features: ["fEveryScale", "fVolume", "fPilot", "fSupport"],
};

/** The pushed plan (owner, 2026-11-10). */
const PUSHED = "growth";

function money(n: number): string {
  const vi = renderLocale() === "vi";
  return (
    "$" +
    n.toLocaleString(vi ? "vi-VN" : "en-US", {
      minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    })
  );
}

function count(n: number): string {
  return n.toLocaleString(renderLocale() === "vi" ? "vi-VN" : "en-US");
}

function Check() {
  return (
    <svg className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true">
      <use href="#i-circle-check" />
    </svg>
  );
}

/** Monthly by default; the yearly figure shows once the switch's Yearly radio is checked. */
function Price({
  usd,
  size,
  from,
}: {
  usd: number;
  size: string;
  /** Enterprise's price is a starting point. */
  from?: boolean;
}) {
  const t = designedText("pricing.plans");
  const num = `font-display ${size} leading-none font-medium tracking-tight text-ink tabular-nums`;
  const pre = from && (
    <span className="mr-2 text-sm text-muted">{t("from")}</span>
  );
  return (
    <>
      <p className="whitespace-nowrap group-has-[#billing-yearly:checked]/billing:hidden">
        {pre}
        <span className={num}>{money(usd)}</span>
        <span className="ml-1 text-sm text-muted">{t("perMonth")}</span>
      </p>
      <p className="hidden whitespace-nowrap group-has-[#billing-yearly:checked]/billing:block">
        {pre}
        <span className={num}>{money(usd * 10)}</span>
        <span className="ml-1 text-sm text-muted">{t("perYear")}</span>
        {usd > 0 && (
          <span className="mt-2 block text-sm whitespace-normal text-muted">
            {t("instead")} <s>{money(usd * 12)}</s>
          </span>
        )}
      </p>
    </>
  );
}

function Pill({ children, pushed }: { children: string; pushed?: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${
        pushed
          ? "border-primary-line bg-primary-tint text-primary"
          : "border-line bg-surface-1 text-ink"
      }`}
    >
      {children}
    </span>
  );
}

function Features({ plan }: { plan: Plan }) {
  const t = designedText("pricing.plans");
  return (
    <ul className="space-y-3 text-data text-ink">
      {plan.calls !== undefined && (
        <li className="flex gap-2.5">
          <Check />
          <span>
            <strong className="font-semibold">{count(plan.calls)}</strong>{" "}
            {t("calls")}
          </span>
        </li>
      )}
      {plan.products !== undefined && (
        <li className="flex gap-2.5">
          <Check />
          <span>
            <strong className="font-semibold">{count(plan.products)}</strong>{" "}
            {t("products")}
          </span>
        </li>
      )}
      {plan.features.map((k) => (
        <li key={k} className="flex gap-2.5">
          <Check />
          <span>{t(k)}</span>
        </li>
      ))}
    </ul>
  );
}

function Over({ over }: { over?: number }) {
  const t = designedText("pricing.plans");
  return (
    <p className="border-t border-line pt-4 text-sm text-pretty text-muted">
      {over === undefined
        ? t("overFree")
        : t("over").replace("{c}", money(over))}
    </p>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const t = designedText("pricing.plans");
  const pushed = plan.key === PUSHED;
  const cta =
    plan.key === "free" ? (
      <Link
        href={designedHref("/en/test-my-catalogue")}
        className="btn-secondary shrink-0"
      >
        {t("ctaFree")}
      </Link>
    ) : (
      <Link
        href={designedHref("/en/contact")}
        className={`${pushed ? "btn-primary" : "btn-secondary"} shrink-0`}
      >
        {t("ctaTalk")}
      </Link>
    );
  return (
    <li
      className={`relative isolate flex min-w-0 flex-col overflow-hidden rounded-3xl p-6 shadow-sm lg:p-7 ${plan.order} ${plan.span} ${
        pushed
          ? "border-[1.5px] border-primary bg-primary-wash"
          : "border border-line bg-card"
      }`}
    >
      {pushed && (
        // A faint ruled texture in the corner, fading out before any text.
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-2/3 bg-[repeating-linear-gradient(90deg,color-mix(in_oklab,var(--color-primary)_12%,transparent)_0_1px,transparent_1px_14px)] [mask-image:linear-gradient(to_bottom_left,black,transparent_60%)]"
        />
      )}
      <div className="flex items-start justify-between gap-4">
        <h3>
          <Pill pushed={pushed}>{t(`${plan.key}Name`)}</Pill>
          {pushed && <span className="sr-only"> ({t("recommended")})</span>}
        </h3>
        {cta}
      </div>
      {pushed ? (
        <div className="mt-6 grid flex-1 gap-6 lg:grid-cols-[4fr_6fr] lg:gap-10">
          <div>
            <Price usd={plan.usd} size="text-[clamp(48px,4.4vw,64px)]" />
            <p className="mt-3 text-data text-pretty text-muted">
              {t(`${plan.key}For`)}
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <Features plan={plan} />
            <div className="mt-auto">
              <Over over={plan.over} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-6">
            <Price usd={plan.usd} size="text-[clamp(44px,4vw,56px)]" />
            <p className="mt-3 text-data text-pretty text-muted">
              {t(`${plan.key}For`)}
            </p>
          </div>
          <div className="mt-6 mb-6">
            <Features plan={plan} />
          </div>
          <div className="mt-auto">
            <Over over={plan.over} />
          </div>
        </>
      )}
    </li>
  );
}

function EnterpriseCard() {
  const t = designedText("pricing.plans");
  const e = ENTERPRISE;
  return (
    <li className="grid min-w-0 gap-8 rounded-3xl border border-line bg-card p-6 shadow-sm lg:order-5 lg:col-span-12 lg:grid-cols-[5fr_6fr] lg:gap-14 lg:p-10">
      <div className="flex min-w-0 flex-col">
        <h3>
          <Pill>{t("enterpriseName")}</Pill>
        </h3>
        <div className="mt-6">
          <Price usd={e.usd} size="text-[clamp(48px,4.4vw,64px)]" from />
        </div>
        <p className="mt-3 text-data text-muted">{t("enterpriseFor")}</p>
        <p className="mt-8 text-h3 font-semibold text-balance text-ink">
          {t("entPitchTitle")}
        </p>
        <p className="mt-2 max-w-md text-data text-pretty text-muted">
          {t("entPitch")}
        </p>
        <Link
          href={designedHref("/en/contact")}
          className="btn-secondary mt-6 w-full justify-center sm:w-auto sm:self-start"
        >
          {t("ctaTalk")}
        </Link>
      </div>
      <div className="flex min-w-0 flex-col gap-6 border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-14">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            [e.calls, "calls"],
            [e.products, "products"],
          ].map(([n, k]) => (
            <div
              key={k}
              className="rounded-2xl border border-line bg-surface-1 p-5"
            >
              <p className="font-display text-[clamp(28px,3vw,36px)] leading-none font-semibold tracking-tight text-ink tabular-nums">
                {count(n as number)}
              </p>
              <p className="mt-2 text-sm text-muted">{t(k as string)}</p>
            </div>
          ))}
        </div>
        <ul className="space-y-3 text-data text-ink">
          {e.features.map((k) => (
            <li key={k} className="flex gap-2.5">
              <Check />
              <span>{t(k)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <Over over={e.over} />
        </div>
      </div>
    </li>
  );
}

export function PricingHero() {
  const s1 = designedText("pricing.section1");
  const t = designedText("pricing.plans");
  const seg =
    "cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-muted transition-colors has-checked:bg-card has-checked:text-ink has-checked:shadow-sm has-focus-visible:outline-2 has-focus-visible:outline-primary";
  return (
    <section
      id="plans"
      className="relative isolate hero-bg scroll-mt-24 border-b border-line"
    >
      <HeroAurora />
      <div className="group/billing frame pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="reveal mx-auto text-hero text-balance">
            {s1("heroTitle2")}
          </h1>
          <p className="reveal mx-auto mt-4 max-w-2xl text-body leading-relaxed text-pretty text-muted delay-100">
            {t("heroLede")}
          </p>
        </div>
        <fieldset className="reveal mt-8 flex flex-wrap items-center justify-center gap-3 delay-100">
          <legend className="sr-only">
            {t("monthly")} / {t("yearly")}
          </legend>
          <div className="inline-flex rounded-xl border border-line bg-surface-1 p-1">
            <label className={seg}>
              <input
                type="radio"
                name="billing"
                value="monthly"
                defaultChecked
                className="sr-only"
              />
              {t("monthly")}
            </label>
            <label className={seg}>
              <input
                id="billing-yearly"
                type="radio"
                name="billing"
                value="yearly"
                className="sr-only"
              />
              {t("yearly")}
            </label>
          </div>
          <span className="rounded-full border border-primary-line bg-primary-tint px-3 py-1 text-sm font-semibold text-primary">
            {t("save")}
          </span>
        </fieldset>
        <ul className="reveal mx-auto mt-10 grid max-w-[1200px] grid-cols-1 gap-4 delay-200 lg:grid-cols-12">
          {PLANS.map((p) => (
            <PlanCard key={p.key} plan={p} />
          ))}
          <EnterpriseCard />
        </ul>
      </div>
    </section>
  );
}
