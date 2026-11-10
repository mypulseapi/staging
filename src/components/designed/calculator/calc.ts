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
  exposure: number; // share of orders on products with evidence gaps, percent: the only orders Pulse can move
  aov: number; // average order value
  margin: number; // gross margin, percent
  tools: Tool[]; // what the merchant already pays other providers, a month
}
export interface Tool {
  name: string;
  cost: number; // USD a month
}

// ponytail: an illustrative store, not a benchmark, and a fixed demo rate rather than a live one.
// Both are labelled as such on the page.
export const EXAMPLE: Inputs = {
  visits: 1_000_000,
  orders: 10_000,
  spend: 100_000,
  lift: 18,
  exposure: 40,
  aov: 200,
  margin: 20,
  // ponytail: two typical categories at third-party price estimates (CONVERSION-MODEL.md § 8), not vendors.
  tools: [
    { name: "", cost: 3_750 },
    { name: "", cost: 10_000 },
  ],
};
export const FX = 25_000; // VND per USD

export function calculate(i: Inputs) {
  const base = i.orders / i.visits;
  // The lift reaches only orders on products with gaps, so the store-wide lift is lift × exposure.
  const storeLift = (i.lift * i.exposure) / 100;
  const newCR = base * (1 + storeLift / 100);
  const extraOrders = (i.orders * storeLift) / 100;
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
  // The tools the merchant already pays for: the same cost over more orders.
  const toolsCost = i.tools.reduce((sum, x) => sum + x.cost, 0);
  const toolsBefore = i.orders ? toolsCost / i.orders : null;
  const toolsAfter = newOrders ? toolsCost / newOrders : null;
  const toolsShare = toolsCost ? (grossProfit / toolsCost) * 100 : null;
  return {
    storeLift,
    toolsCost,
    toolsBefore,
    toolsAfter,
    toolsShare,
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
