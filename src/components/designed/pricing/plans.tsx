/**
 * Compare plans: every plan's allowance and product, one row each (owner, 2026-11-10, option A).
 *
 * The amounts are rainbow's `ODIN/product/PRICING.md` §3.2 and §3.7, v0.4, the same as the cards in
 * `hero.tsx`. Change a price there first, then here, or the page and the invoice disagree.
 *
 * The head sticks under the site header while the rows scroll. On a phone the table shows one plan
 * at a time, picked with radio tabs and CSS; Starter first, as the first paid plan.
 */
import { renderLocale } from "@/i18n/render-locale";
import { designedText } from "../t";

const KEYS = ["free", "starter", "growth", "scale", "enterprise"] as const;
const USD = [0, 349, 990, 2_390, 6_990];

/**
 * On a phone only the checked plan's column shows. Literal class strings, one per plan, so
 * Tailwind finds them in the source.
 */
const SHOW: Record<(typeof KEYS)[number], string> = {
  free: "max-md:hidden max-md:group-has-[#cmp-free:checked]/cmp:table-cell",
  starter:
    "max-md:hidden max-md:group-has-[#cmp-starter:checked]/cmp:table-cell",
  growth: "max-md:hidden max-md:group-has-[#cmp-growth:checked]/cmp:table-cell",
  scale: "max-md:hidden max-md:group-has-[#cmp-scale:checked]/cmp:table-cell",
  enterprise:
    "max-md:hidden max-md:group-has-[#cmp-enterprise:checked]/cmp:table-cell",
};

/** A row's cells: counts, prices, words from the catalogue, or a tick from one plan onwards. */
type Cells =
  | { count: (number | null)[] }
  | { money: (number | null)[] }
  | { words: string[] }
  | { from: number }
  | { only: number };

const GROUPS: [string, [string, string | null, Cells][]][] = [
  [
    "gUsage",
    [
      [
        "rCalls",
        null,
        { count: [null, 10_000, 100_000, 2_500_000, 10_000_000] },
      ],
      ["rCallsOver", null, { money: [null, 10, 5, 2, 1.5] }],
      ["rVe", "rVeSub", { count: [null, 1_000, 5_000, 25_000, 100_000] }],
      ["rVeOver", null, { money: [null, 20, 20, 20, 20] }],
    ],
  ],
  [
    "gAudit",
    [
      ["rCats", "rCatsSub", { words: ["1", "upTo3", "all", "all", "all"] }],
      ["rVerif", null, { from: 1 }],
      ["rMon", null, { from: 1 }],
      ["rRet", null, { from: 1 }],
    ],
  ],
  [
    "gLive",
    [
      ["rApi", null, { from: 2 }],
      ["rPromo", null, { from: 2 }],
      ["rSearch", null, { from: 3 }],
      ["rRecs", null, { from: 3 }],
      ["rPages", null, { from: 3 }],
      ["rMerch", null, { from: 3 }],
    ],
  ],
  ["gProof", [["rHold", null, { from: 3 }]]],
  [
    "gOpen",
    [
      ["rSdk", null, { from: 0 }],
      ["rMeas", null, { words: Array(5).fill("rMeasValue") }],
    ],
  ],
  [
    "gContract",
    [
      ["rVol", null, { only: 4 }],
      ["rPilot", null, { only: 4 }],
      ["rSupport", null, { only: 4 }],
    ],
  ],
];

export function PlansSection() {
  const t = designedText("pricing.plans");
  const vi = renderLocale() === "vi";
  const num = (n: number, cents = false) =>
    n.toLocaleString(vi ? "vi-VN" : "en-US", {
      minimumFractionDigits: cents && !Number.isInteger(n) ? 2 : 0,
    });
  const dash = (
    <span className="text-muted">
      <span aria-hidden="true">—</span>
      <span className="sr-only">{t("notIncluded")}</span>
    </span>
  );
  const tick = (
    <svg className="size-5 text-primary" role="img" aria-label={t("included")}>
      <use href="#i-check" />
    </svg>
  );
  const cell = (c: Cells, i: number) => {
    if ("count" in c) return c.count[i] === null ? dash : num(c.count[i]!);
    if ("money" in c)
      return c.money[i] === null ? dash : `$${num(c.money[i]!, true)}`;
    if ("words" in c)
      return /^\d+$/.test(c.words[i]) ? c.words[i] : t(c.words[i]);
    if ("from" in c) return i >= c.from ? tick : dash;
    return i === c.only ? tick : dash;
  };
  const col = "px-3 text-left align-middle md:w-[14.4%]";
  // A collapsed border does not stick with its cell, so the head's rule is an inset shadow.
  const head =
    "sticky top-17 z-10 bg-surface-0 shadow-[inset_0_-1px_0_var(--color-line-control)] max-md:top-[7.5rem]";
  return (
    <section
      id="compare"
      className="group/cmp scroll-mt-24 border-b border-line"
    >
      <div className="frame py-16 lg:py-20">
        <h2 className="reveal text-center text-title text-balance">
          {t("title")}
        </h2>

        {/* Phone: one plan at a time. */}
        <fieldset className="sticky top-17 z-10 -mx-4 mt-8 bg-surface-0 px-4 py-2 md:hidden">
          <legend className="sr-only">{t("showPlan")}</legend>
          <div className="grid grid-cols-5 gap-1 rounded-xl border border-line bg-surface-1 p-1">
            {KEYS.map((k) => (
              <label
                key={k}
                className="cursor-pointer rounded-lg px-1 py-2 text-center text-xs font-semibold text-muted has-checked:bg-card has-checked:text-ink has-checked:shadow-sm has-focus-visible:outline-2 has-focus-visible:outline-primary"
              >
                <input
                  id={`cmp-${k}`}
                  type="radio"
                  name="cmp-plan"
                  defaultChecked={k === "starter"}
                  className="sr-only"
                />
                {t(`${k}Name`)}
              </label>
            ))}
          </div>
        </fieldset>

        <table className="reveal mx-auto mt-6 w-full max-w-[1120px] border-collapse text-data delay-100 md:mt-10">
          <thead>
            <tr>
              <td className={head} />
              {KEYS.map((k, i) => (
                <th
                  key={k}
                  scope="col"
                  className={`${head} py-3 font-sans font-normal ${col} ${SHOW[k]}`}
                >
                  <span className="block text-body font-semibold text-ink">
                    {t(`${k}Name`)}
                  </span>
                  <span className="mt-1 block text-muted">
                    {k === "enterprise" && (
                      <span className="mr-1 text-sm">
                        {t("from").toLowerCase()}
                      </span>
                    )}
                    <span className="font-display text-h3 font-semibold text-ink tabular-nums">
                      ${num(USD[i])}
                    </span>
                  </span>
                  <span className="block text-sm text-muted">
                    {t("perMonth")}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          {GROUPS.map(([group, rows]) => (
            <tbody key={group}>
              <tr>
                <th
                  scope="colgroup"
                  colSpan={6}
                  className="border-b border-line pt-8 pb-3 text-left text-body font-semibold text-ink"
                >
                  {t(group)}
                </th>
              </tr>
              {rows.map(([label, sub, cells]) => (
                <tr key={label} className="border-b border-line">
                  <th
                    scope="row"
                    className="py-3.5 pr-4 text-left font-normal text-ink md:w-[28%]"
                  >
                    {t(label)}
                    {sub && (
                      <span className="block text-sm text-muted">{t(sub)}</span>
                    )}
                  </th>
                  {KEYS.map((k, i) => (
                    <td
                      key={k}
                      className={`py-3.5 font-mono text-sm text-ink tabular-nums ${col} ${SHOW[k]}`}
                    >
                      {cell(cells, i)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>

        <div className="reveal mx-auto mt-8 max-w-2xl space-y-2 text-center text-sm text-pretty text-muted">
          <p>{t("extra3").replace(" | ", ": ")}</p>
          <p>{t("note")}</p>
        </div>
      </div>
    </section>
  );
}
