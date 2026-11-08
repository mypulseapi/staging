/**
 * The conversion model behind the calculator: rainbow `ODIN/business/CONVERSION-MODEL.md` § 1, the
 * same formulas for every industry. Pure, so the page and its check share one definition.
 *
 * The lift is the merchant's own assumption, never ours: Pulse has measured no uplift, and the
 * only number we quote is the one a holdback measures on the merchant's traffic.
 *
 * Money is in USD here, always: VND is a display of the same store at `FX`. Every result is exact;
 * rounding happens only where a number is shown.
 */
export interface Inputs {
  visits: number; // website and app, a month
  orders: number; // completed, a month
  spend: number | null; // marketing and acquisition, a month; optional
  lift: number; // relative conversion lift the merchant assumes, percent
  aov: number; // average order value
  margin: number; // gross margin, percent
}

// ponytail: an illustrative store, not a benchmark, and a fixed demo rate rather than a live one.
// Both are labelled as such on the page.
export const EXAMPLE: Inputs = {
  visits: 1_000_000,
  orders: 10_000,
  spend: 100_000,
  lift: 18,
  aov: 200,
  margin: 20,
};
export const FX = 25_000; // VND per USD

export function calculate(i: Inputs) {
  const base = i.orders / i.visits;
  const newCR = base * (1 + i.lift / 100);
  const extraOrders = (i.orders * i.lift) / 100;
  const extraRevenue = extraOrders * i.aov;
  const grossProfit = (extraRevenue * i.margin) / 100;
  const newOrders = i.orders + extraOrders;
  // Spend per order, a proxy for acquisition cost: the same spend over more orders.
  const cacBefore = i.spend !== null && i.orders ? i.spend / i.orders : null;
  const cacAfter = i.spend !== null && newOrders ? i.spend / newOrders : null;
  const saving =
    cacBefore !== null && cacAfter !== null ? cacBefore - cacAfter : null;
  const savingPct =
    saving !== null && cacBefore ? (saving / cacBefore) * 100 : null;
  // What one tenth of a percentage point of conversion is worth, a month.
  const ordersPer = i.visits * 0.001;
  const revPer = ordersPer * i.aov;
  const gpPer = (revPer * i.margin) / 100;
  // The lift in points; `tieGP` is the same gross profit, reached through `gpPer`.
  const points = (newCR - base) * 100;
  const tieGP = (points / 0.1) * gpPer;
  return {
    base,
    newCR,
    extraOrders,
    extraRevenue,
    grossProfit,
    newOrders,
    cacBefore,
    cacAfter,
    saving,
    savingPct,
    ordersPer,
    revPer,
    gpPer,
    points,
    tieGP,
  };
}
