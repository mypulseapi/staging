"use client";

import {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useEffectEvent,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Plus,
  RotateCcw,
} from "lucide-react";
import { calculate, EXAMPLE, FX, type Inputs } from "./calc";

/**
 * The calculator as five steps (the approved design, `pulse/design/rainbow-calculator.html`, owner,
 * 6 Nov 2026): the store today, a lift to try, what it is worth, the month in one figure, and what
 * to do next. Text arrives as props from the server component, because `designedText` reads the
 * locale from the static export's render store, which a client cannot.
 *
 * It opens on an example store (owner, 2026-11-04: the gain has to be visible before anyone types),
 * labelled as one, with a reset. The lift is the visitor's assumption: Pulse has measured none.
 * Steps ahead are never buttons; a step becomes clickable once the visitor has continued past it.
 *
 * Motion is the design's: numbers count inside a box sized by an invisible copy of the widest text
 * they will show, so nothing reflows while they count; cells fill; steps crossfade; step 3 and 4
 * reveal in stages. All of it is interruptible and none of it runs under reduced motion.
 */

/** A Test My Catalogue result: step 5 shows the store's own gaps instead of the illustration. */
export interface TestedGaps {
  toFix: number;
  tested: number;
  /** The findings list on the result page, scrolled to by step 5's primary action. */
  findingsId: string | null;
}
export const TestedGapsContext = createContext<TestedGaps | null>(null);

// ponytail: the illustrative audit of the design, shown wherever no test has been run.
const ILLUSTRATIVE = { toFix: 33, tested: 50 };
const MAX_CELLS = 50; // a tested set larger than this is drawn as a share of 50 cells

type Labels = Record<string, string>;
type Currency = "USD" | "VND";
type Field = "visits" | "orders" | "spend" | "aov" | "margin";
const FIELDS: Field[] = ["visits", "orders", "spend", "aov", "margin"];
const STEP_ONE = new Set<Field>(["visits", "orders", "spend"]);
const MAXV = 1e12;
const RULES: Record<
  Field,
  { int?: true; money?: true; min: number; max: number }
> = {
  visits: { int: true, min: 1, max: MAXV },
  orders: { int: true, min: 0, max: MAXV },
  spend: { money: true, min: 0, max: MAXV },
  aov: { money: true, min: 0, max: MAXV },
  margin: { min: 0, max: 100 },
};
const ERRORS: Record<Field, string> = {
  visits: "errVisits",
  orders: "errOrders",
  spend: "errSpend",
  aov: "errAov",
  margin: "errMargin",
};
const PLAN = ["plan1", "plan2", "plan3", "plan4"];

/*
 * One accent per step, as text (`a`, AA on card and page in both themes) and as a fill (`f`, 3:1 beside the
 * empty track). Site tokens where one fits: Pulse Blue, success green, ink for the design's navy, warning
 * amber. Sky as text, teal and the amber fill are not tokens, so they are light-dark() pairs, measured in
 * Python (blue 5.6, sky 5.2, green 5.3, amber 6.3 on light card; every dark pair above 7.5).
 */
const TONES = {
  "--c-sky": "light-dark(#0b72b3, #7db8f2)",
  "--c-teal": "light-dark(#0b8a86, #4fc4bd)",
  "--c-amber": "light-dark(#c26f00, #ffb020)",
} as CSSProperties;
const STEP_TONE = [
  { a: "var(--color-primary)", f: "var(--color-primary)" },
  { a: "var(--c-sky)", f: "var(--color-sky)" },
  { a: "var(--color-success)", f: "var(--color-success)" },
  { a: "var(--color-ink)", f: "var(--color-ink)" },
  { a: "var(--color-warning)", f: "var(--c-amber)" },
];
const tone = (i: number) =>
  ({ "--a": STEP_TONE[i].a, "--af": STEP_TONE[i].f }) as CSSProperties;

const SETTLE = "cubic-bezier(.22,1,.36,1)";
const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
/** A message with React nodes in its placeholders, e.g. a counting number inside a sentence. */
const parts = (s: string, nodes: Record<string, ReactNode>) =>
  s.split(/(\{\w+\})/).map((p, i) => {
    const k = /^\{(\w+)\}$/.exec(p)?.[1];
    return <Fragment key={i}>{k && k in nodes ? nodes[k] : p}</Fragment>;
  });

/**
 * Display formatting. Rounding is display only; the maths in calc.ts uses exact values. Grouping
 * follows the currency, not the page's language: USD 1,000,000.5, VND 1.000.000,5.
 */
function formats(currency: Currency) {
  const vnd = currency === "VND";
  const loc = vnd ? "vi-VN" : "en-US";
  const dec = vnd ? "," : ".";
  const num = (n: number, d = 0) =>
    new Intl.NumberFormat(loc, { maximumFractionDigits: d }).format(n);
  const fixed = (n: number, d: number) =>
    new Intl.NumberFormat(loc, {
      minimumFractionDigits: d,
      maximumFractionDigits: d,
    }).format(n);
  // Percentage numbers: at most 2 decimals, trailing zeros dropped.
  const pts = (n: number) => (n > 0 && n < 0.005 ? `<0${dec}01` : num(n, 2));
  const pct = (n: number) => `${pts(n)}%`;
  // Whole currency units; `cac` shows cents in USD, `math` up to two decimals in USD.
  const money = (n: number, mode?: "cac" | "math") =>
    new Intl.NumberFormat(loc, {
      style: "currency",
      currency,
      minimumFractionDigits: !vnd && mode === "cac" ? 2 : 0,
      maximumFractionDigits: !vnd && mode ? 2 : 0,
    }).format(vnd ? n * FX : n);
  // While a percentage counts it keeps its final value's decimals, so it is never wider than the end.
  const decOf = (s: string) =>
    new RegExp(`\\${dec}(\\d+)%?$`).exec(s)?.[1].length ?? 0;
  return {
    vnd,
    loc,
    dec,
    group: vnd ? "." : ",",
    num,
    pts,
    pct,
    money,
    midPct: (x: number, fin: string) => `${fixed(x, decOf(fin))}%`,
    midPts: (x: number, fin: string) => fixed(x, decOf(fin)),
  };
}
type Formats = ReturnType<typeof formats>;

/* ---------- grouped number inputs ---------- */
/**
 * Reads "1000000", "1,000,000", "1.000.000", "1.000.000,5", "1,000,000.5"... A separator repeated, or
 * the one that is not the current decimal mark when it appears once ("1,000" in USD, "1.000" in VND),
 * is grouping; the last of two kinds is the decimal mark.
 */
function parseParts(raw: string, group: string) {
  const s = raw.replace(/[\s  '’]/g, "").replace(/[₫$]|vnd|usd/gi, "");
  if (!/^[\d.,]+$/.test(s) || !/\d/.test(s)) return null;
  const dot = s.lastIndexOf(".");
  const com = s.lastIndexOf(",");
  let dec = -1;
  if (dot >= 0 && com >= 0) dec = Math.max(dot, com);
  else if (dot >= 0 || com >= 0) {
    const k = dot >= 0 ? "." : ",";
    if (s.split(k).length === 2 && k !== group) dec = s.indexOf(k);
  }
  let int = dec >= 0 ? s.slice(0, dec) : s;
  const frac = dec >= 0 ? s.slice(dec + 1).replace(/[.,]/g, "") : null;
  int = int.replace(/[.,]/g, "").replace(/^0+(?=\d)/, "") || "0";
  return { int, frac };
}
const digits = (s: string) => (s.match(/\d/g) ?? []).length;
function caretFromRight(disp: string, n: number) {
  if (!n) return disp.length;
  for (let i = disp.length - 1, c = 0; i >= 0; i--)
    if (/\d/.test(disp[i]) && ++c === n) return i;
  return 0;
}
/** A field's value as its input shows it, in the display currency. */
function shown(f: Field, s: Inputs, F: Formats) {
  const v = s[f];
  if (v === null) return "";
  const x = RULES[f].money && F.vnd ? v * FX : v;
  return new Intl.NumberFormat(F.loc, { maximumFractionDigits: 6 }).format(
    Number(x.toFixed(6)),
  );
}

/* ---------- motion: one interruptible tween per number; it always ends on the exact value ---------- */
interface Enter {
  from: number;
  delay?: number;
  dur?: number;
}
/**
 * Moves what `paint` draws towards `v`: from where it is when `v` changes (420ms), or from
 * `enter.from` each time `play` changes (a step being entered). `sig` repaints without motion when the
 * same value is shown differently, such as a currency switch. `done` marks a repaint without motion;
 * `from` the start of a tween.
 */
function useTween(
  v: number | null,
  sig: string,
  play: number,
  enter: Enter | undefined,
  paint: (x: number | null, done: boolean, from?: number) => void,
) {
  const tw = useRef({ cur: null as number | null, play: 0, raf: 0, to: 0 });
  const run = useEffectEvent(() => {
    const t = tw.current;
    const replay = enter !== undefined && play !== t.play;
    t.play = play;
    const from = replay ? enter.from : t.cur;
    if (v === null || from === null || from === v || reduced()) {
      t.cur = v;
      paint(v, true);
      return;
    }
    const dur = (replay && enter.dur) || 420;
    t.cur = from;
    paint(from, false, from);
    const go = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        t.cur = p < 1 ? from + (v - from) * (1 - (1 - p) ** 3) : v;
        paint(t.cur, false);
        if (p < 1) t.raf = requestAnimationFrame(tick);
      };
      t.raf = requestAnimationFrame(tick);
    };
    if (replay && enter.delay) t.to = window.setTimeout(go, enter.delay);
    else go();
  });
  useLayoutEffect(() => {
    const t = tw.current;
    run();
    return () => {
      cancelAnimationFrame(t.raf);
      clearTimeout(t.to);
    };
  }, [v, sig, play]);
}

/**
 * A counting number. The visible text and an invisible copy of the widest text it will show share one
 * grid cell, so the box never changes size while it counts. A `[data-fit]` ancestor gets the ghost
 * length as `--len`, which the big figures use to shrink rather than overflow a narrow column.
 */
function Count({
  v,
  f,
  mid,
  none = "–",
  play = 0,
  enter,
  align = "start",
}: {
  v: number | null;
  f: (x: number) => string;
  mid?: (x: number, fin: string) => string;
  none?: string;
  play?: number;
  enter?: Enter;
  align?: "start" | "end" | "center";
}) {
  const box = useRef<HTMLSpanElement>(null);
  const text = v === null ? none : f(v);
  const show = (x: number) => (mid ? mid(x, text) : f(x));
  useTween(v, text, play, enter, (x, done, from) => {
    const el = box.current;
    if (!el) return;
    // The text nodes React rendered, so a later render and this tween write to the same nodes.
    const [vis, ghost] = [el.firstChild?.firstChild, el.lastChild?.firstChild];
    if (vis) vis.nodeValue = x === null || done || x === v ? text : show(x);
    let g = text;
    if (from !== undefined && v !== null)
      for (const p of [0, 0.25, 0.5, 0.75]) {
        const c = show(from + (v - from) * (1 - (1 - p) ** 3));
        if (c.length > g.length) g = c;
      }
    // The ghost stays at its widest until the next change: shrinking it when the count lands would
    // move whatever sits beside the number, which is the jump it exists to prevent.
    if (ghost && (done || from !== undefined)) ghost.nodeValue = g;
    const host = el.closest<HTMLElement>("[data-fit]");
    if (host)
      host.style.setProperty(
        "--len",
        String(
          [...host.querySelectorAll("[data-g]")].reduce(
            (a, e) => a + (e.textContent?.length ?? 0),
            0,
          ) + Number(host.dataset.fit || 0),
        ),
      );
  });
  return (
    <span
      ref={box}
      className="inline-grid max-w-full align-baseline"
      style={{ justifyItems: align }}
    >
      <span className="col-start-1 row-start-1 min-w-0">{text}</span>
      <span
        data-g
        aria-hidden="true"
        className="invisible col-start-1 row-start-1 h-0 overflow-hidden select-none"
      >
        {text}
      </span>
    </span>
  );
}

/** A row of cells filled up to `v` (fractions fill part of a cell). */
function Cells({
  n,
  v,
  play,
  enter,
  label,
  cell,
}: {
  n: number;
  v: number;
  play: number;
  enter?: Enter;
  label: string;
  cell: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  useTween(v, String(n), play, enter, (x) =>
    box.current
      ?.querySelectorAll<HTMLElement>("[data-c]")
      .forEach(
        (el, i) =>
          (el.style.transform = `scaleX(${clamp((x ?? 0) - i, 0, 1)})`),
      ),
  );
  return (
    <div
      ref={box}
      role="img"
      aria-label={label}
      className="grid max-w-[420px] grid-cols-10 gap-1.5"
    >
      {Array.from({ length: n }, (_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={`overflow-hidden rounded-[4px] bg-line ${cell}`}
        >
          <span
            data-c
            className="block h-full origin-left bg-(--af)"
            style={{ transform: `scaleX(${clamp(v - i, 0, 1)})` }}
          />
        </div>
      ))}
    </div>
  );
}

/** A bar that grows from its start edge to `v / max`. */
function Grow({
  v,
  max,
  play,
  enter,
  className,
  style,
}: {
  v: number;
  max: number;
  play: number;
  enter?: Enter;
  className: string;
  style?: CSSProperties;
}) {
  const el = useRef<HTMLElement>(null);
  useTween(v, String(max), play, enter, (x) => {
    if (el.current)
      el.current.style.transform = `scaleX(${clamp((x ?? 0) / max, 0, 1)})`;
  });
  return (
    <i
      ref={el}
      className={`block origin-left ${className}`}
      style={{ ...style, transform: `scaleX(${clamp(v / max, 0, 1)})` }}
    />
  );
}

/** Fades a sentence in again when the number it states changes as the visitor types. */
function usePulse<E extends HTMLElement>(key: number) {
  const el = useRef<E>(null);
  const last = useRef(key);
  useEffect(() => {
    if (last.current !== key && !reduced())
      el.current?.animate([{ opacity: 0.55 }, { opacity: 1 }], {
        duration: 340,
        easing: SETTLE,
      });
    last.current = key;
  }, [key]);
  return el;
}

/** Staged reveals, declared on the element: `data-in="kind delay duration"`. */
const KEYFRAMES: Record<string, Keyframe[]> = {
  up: [
    { opacity: 0, transform: "translateY(12px)" },
    { opacity: 1, transform: "none" },
  ],
  up8: [
    { opacity: 0, transform: "translateY(8px)" },
    { opacity: 1, transform: "none" },
  ],
  pop: [
    { opacity: 0, transform: "translateY(14px) scale(.98)" },
    { opacity: 1, transform: "none" },
  ],
  grow: [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }],
  fade: [{ opacity: 0 }, { opacity: 1 }],
};

export function Calculator({
  labels: t,
  locale,
  heading = false,
}: {
  labels: Labels;
  locale: string;
  /** The calculator's own title, for /pricing and /contact; the test result has a heading above it. */
  heading?: boolean;
}) {
  const gaps = useContext(TestedGapsContext);
  const initial: Currency = locale === "vi" ? "VND" : "USD";
  const [currency, setCurrency] = useState<Currency>(initial);
  const [s, setS] = useState<Inputs>(EXAMPLE);
  const [bad, setBad] = useState<Field[]>([]);
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0); // steps below this one have been passed
  const [leaving, setLeaving] = useState<number | null>(null);
  const [plays, setPlays] = useState([0, 0, 0, 0, 0]); // bumped each time a step is entered
  const [spendOpen, setSpendOpen] = useState(true);
  const [planOpen, setPlanOpen] = useState(false);
  const [checks, setChecks] = useState([false, false, false, false]);
  const [gen, setGen] = useState(0); // a reset remounts the panels: inputs, disclosures, numbers
  const [live, setLive] = useState("");

  const uid = useId();
  const root = useRef<HTMLDivElement>(null);
  const inputs = useRef<Partial<Record<Field, HTMLInputElement | null>>>({});
  const prevs = useRef<Partial<Record<Field, string>>>({});
  const panels = useRef<(HTMLElement | null)[]>([]);
  const titles = useRef<(HTMLHeadingElement | null)[]>([]);
  const planRef = useRef<HTMLDivElement>(null);
  const focusTitle = useRef(false);
  const card = useRef<HTMLDivElement>(null);

  const F = formats(currency);
  const c = calculate(s);
  const H = heading ? "h3" : "h4";
  const hasSpend = s.spend !== null;
  const b100 = c.base * 100;
  const caption = usePulse<HTMLParagraphElement>(Math.round(b100 * 100));
  const liftCaption = usePulse<HTMLParagraphElement>(Math.round(c.extraOrders));
  const real = gaps !== null;
  const audit = gaps ?? ILLUSTRATIVE;
  const cellCount = Math.min(audit.tested, MAX_CELLS);
  const scaled = audit.tested > MAX_CELLS;
  const auditFill = scaled
    ? (audit.toFix / audit.tested) * MAX_CELLS
    : audit.toFix;

  const enterStep = (n: number) =>
    setPlays((p) => p.map((x, i) => (i === n ? x + 1 : x)));

  /* ---------- steps: the new panel takes its place at once, the old one leaves the flow and fades ---------- */
  const go = (n: number, { focus = true, instant = false } = {}) => {
    n = clamp(n, 0, 4);
    if (n === step) return;
    setLeaving(instant || reduced() ? null : step);
    setStep(n);
    enterStep(n);
    focusTitle.current = focus;
  };
  useLayoutEffect(() => {
    if (leaving === null) return;
    const old = panels.current[leaving];
    const now = panels.current[step];
    [old, now].forEach((el) => el?.getAnimations().forEach((a) => a.cancel()));
    now?.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 200,
      delay: 60,
      easing: "ease-out",
      fill: "backwards",
    });
    const out = old?.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 100,
      easing: "ease-out",
      fill: "forwards",
    });
    if (out) out.onfinish = () => setLeaving(null);
    return () => out?.cancel();
  }, [leaving, step]);
  const played = plays[step];
  useLayoutEffect(() => {
    if (focusTitle.current) {
      titles.current[step]?.focus({ preventScroll: true });
      // On a phone Next sits below a long panel: bring the new step's top back under the header.
      const top = card.current?.getBoundingClientRect().top ?? 0;
      if (top < 80)
        window.scrollBy({
          top: top - 88,
          behavior: reduced() ? "instant" : "smooth",
        });
    }
    focusTitle.current = false;
    if (!played || reduced()) return;
    panels.current[step]
      ?.querySelectorAll<HTMLElement>("[data-in]")
      .forEach((el) => {
        const [kind, delay, duration] = (el.dataset.in ?? "").split(" ");
        el.getAnimations().forEach((a) => a.cancel());
        el.animate(KEYFRAMES[kind], {
          delay: Number(delay),
          duration: Number(duration),
          easing: SETTLE,
          fill: "backwards",
        });
      });
  }, [step, played]);

  // Step 1's entrance plays when the calculator first scrolls into view, never over numbers already seen.
  useEffect(() => {
    const el = root.current;
    if (!el || reduced()) return;
    let first = true;
    const io = new IntersectionObserver(
      ([e]) => {
        if (first && e.isIntersecting) io.disconnect();
        else if (!first && e.isIntersecting) {
          io.disconnect();
          setPlays((p) => p.map((x, i) => (i === 0 ? x + 1 : x)));
        }
        first = false;
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const liveText = fill(t.live, {
    from: F.pct(b100),
    to: F.pct(c.newCR * 100),
    profit: F.money(Math.round(c.grossProfit)),
  });
  useEffect(() => {
    const id = window.setTimeout(() => setLive(liveText), 350);
    return () => clearTimeout(id);
  }, [liveText]);

  /* ---------- inputs ---------- */
  const validate = () => {
    const out: Partial<Inputs> = {};
    const wrong: Field[] = [];
    for (const f of FIELDS) {
      const raw = inputs.current[f]?.value ?? "";
      if (f === "spend" && raw.trim() === "") {
        out.spend = null;
        continue;
      }
      const p = parseParts(raw, F.group);
      const v = p ? Number(p.int + (p.frac ? `.${p.frac}` : "")) : NaN;
      const r = RULES[f];
      const max = r.money && F.vnd ? r.max * FX : r.max;
      if (
        !Number.isFinite(v) ||
        v < r.min ||
        v > max ||
        (r.int && !Number.isInteger(v))
      )
        wrong.push(f);
      else out[f] = r.money && F.vnd ? v / FX : v;
    }
    setBad(wrong);
    if (!wrong.length) setS((prev) => ({ ...prev, ...out }));
  };
  const onField = (f: Field, e: FormEvent<HTMLInputElement>) => {
    const el = e.currentTarget;
    const type = (e.nativeEvent as InputEvent).inputType;
    const prev = prevs.current[f] ?? "";
    let raw = el.value;
    let caret = el.selectionStart ?? raw.length;
    // A grouping mark was deleted: remove the digit beside it instead, so Backspace always makes progress.
    if (
      (type === "deleteContentBackward" || type === "deleteContentForward") &&
      raw.length < prev.length &&
      digits(raw) === digits(prev)
    ) {
      const dir = type === "deleteContentBackward" ? -1 : 1;
      let k = dir < 0 ? caret - 1 : caret;
      while (k >= 0 && k < raw.length && !/\d/.test(raw[k])) k += dir;
      if (k >= 0 && k < raw.length) {
        raw = raw.slice(0, k) + raw.slice(k + 1);
        caret = k;
      }
    }
    const p = parseParts(raw, F.group);
    if (p && (!RULES[f].int || !p.frac)) {
      const after = digits(raw.slice(caret));
      const disp =
        p.int.replace(/\B(?=(\d{3})+(?!\d))/g, F.group) +
        (!RULES[f].int && p.frac !== null ? F.dec + p.frac : "");
      el.value = disp;
      if (document.activeElement === el) {
        const at = caretFromRight(disp, after);
        el.setSelectionRange(at, at);
      }
    } else el.value = raw;
    prevs.current[f] = el.value;
    validate();
  };
  const field = (f: Field, unit?: boolean) => (
    <input
      key={`${f}-${currency}`}
      id={`${uid}-${f}`}
      ref={(el) => {
        inputs.current[f] = el;
        if (el) prevs.current[f] = el.value;
      }}
      type="text"
      inputMode={RULES[f].int ? "numeric" : "decimal"}
      autoComplete="off"
      spellCheck={false}
      defaultValue={shown(f, s, F)}
      aria-invalid={bad.includes(f) || undefined}
      aria-describedby={`${uid}-${f}-help ${uid}-${STEP_ONE.has(f) ? "e1" : "e3"}`}
      placeholder={f === "spend" ? t.optional : undefined}
      onInput={(e) => onField(f, e)}
      className={`h-14 w-full min-w-0 rounded-xl border-[1.5px] border-line-control bg-card px-3.5 text-[22px] font-semibold text-ink tabular-nums transition-[border-color,box-shadow] duration-150 outline-none placeholder:font-medium placeholder:text-muted hover:border-muted focus:border-(--af) focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--af)_16%,transparent)] aria-invalid:border-critical motion-reduce:transition-none ${unit ? "pr-16" : ""}`}
    />
  );
  const switchTo = (to: Currency) => {
    if (to === currency) return;
    if (bad.length) {
      // A number that does not parse cannot be converted: take the visitor to it instead.
      go(STEP_ONE.has(bad[0]) ? 0 : 2, { focus: false, instant: true });
      inputs.current[bad[0]]?.focus();
      return;
    }
    setCurrency(to);
  };
  const reset = () => {
    setS(EXAMPLE);
    setCurrency(initial);
    setBad([]);
    setSpendOpen(true);
    setPlanOpen(false);
    setChecks([false, false, false, false]);
    setReached(0);
    setLeaving(null);
    setStep(0);
    setGen((g) => g + 1);
    enterStep(0);
  };
  const next = () => {
    if (bad.length) return;
    setReached((r) => Math.max(r, step + 1));
    go(step === 4 ? 0 : step + 1);
  };

  /* ---------- the checklist ---------- */
  const cac = (v: number | null) =>
    v === null ? t.undefined : F.money(v, "cac");
  const planText = [
    fill(t.planBaseline, {
      visits: F.num(s.visits),
      orders: F.num(s.orders),
      rate: F.pct(b100),
    }),
    fill(t.planHypothesis, {
      lift: s.lift,
      newRate: F.pct(c.newCR * 100),
      extra: F.num(Math.round(c.extraOrders)),
      revenue: F.money(Math.round(c.extraRevenue)),
      profit: F.money(Math.round(c.grossProfit)),
      margin: F.num(s.margin, 2),
    }),
    hasSpend &&
      fill(t.planSpend, {
        before: cac(c.cacBefore),
        after: cac(c.cacAfter),
        saving: cac(c.saving),
        pct: c.savingPct === null ? "0" : F.num(c.savingPct, 2),
      }),
    fill(t.planPer, {
      orders: F.num(Math.round(c.ordersPer)),
      revenue: F.money(Math.round(c.revPer)),
      per: F.money(Math.round(c.gpPer)),
      points: F.pts(c.points),
      tie: F.money(Math.round(c.tieGP)),
    }),
    t.planAssume,
  ]
    .filter(Boolean)
    .join(" ");
  const fxLine = fill(t.fx, { rate: F.num(FX) });
  const fxNote = fill(t.fxNote, { currency, fx: fxLine });
  const download = () => {
    const text = [
      t.fileTitle,
      "",
      planText,
      "",
      ...PLAN.map((k, i) => `${checks[i] ? "[x]" : "[ ]"} ${t[k]}`),
      "",
      fill(real ? t.realFile : t.gapsFile, {
        n: audit.toFix,
        of: audit.tested,
      }),
      fxNote,
      "",
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = t.fileName;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const togglePlan = () => {
    setPlanOpen((o) => !o);
    if (!planOpen && !reduced())
      requestAnimationFrame(() =>
        planRef.current?.animate(
          [
            { opacity: 0, transform: "translateY(10px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 300, easing: SETTLE },
        ),
      );
  };
  const toFindings = () => {
    const el = gaps?.findingsId
      ? document.getElementById(gaps.findingsId)
      : null;
    if (!el) return;
    el.scrollIntoView({
      behavior: reduced() ? "auto" : "smooth",
      block: "start",
    });
    const h = el.querySelector<HTMLElement>("h2, h3");
    h?.setAttribute("tabindex", "-1");
    h?.focus({ preventScroll: true });
  };

  /* ---------- shared pieces ---------- */
  const NAMES = [1, 2, 3, 4, 5].map((n) => t[`name${n}`]);
  const status = (i: number) =>
    i === step ? "current" : i < reached ? "done" : "locked";
  const title = (i: number, text: string) => (
    <H
      id={`${uid}-t${i}`}
      ref={(el) => {
        titles.current[i] = el;
      }}
      tabIndex={-1}
      className="font-[family-name:var(--font-title)] text-[clamp(1.5rem,1.25rem+0.9vw,2rem)] leading-[1.18] font-semibold tracking-[-0.02em] text-balance text-ink [font-stretch:108%] focus:outline-none"
    >
      {text}
    </H>
  );
  const desc = (text: string) => (
    <p className="mt-3 mb-7 max-w-[40ch] text-pretty text-muted">{text}</p>
  );
  const help = (f: Field, text: string) => (
    <span id={`${uid}-${f}-help`} className="sr-only">
      {text}
    </span>
  );
  const label = (f: Field, text: ReactNode) => (
    <label
      htmlFor={`${uid}-${f}`}
      className="mb-2 block text-sm font-semibold text-ink"
    >
      {text}
    </label>
  );
  const details = (summary: string, body: ReactNode) => (
    <details className="group mt-6 border-t border-line pt-1.5">
      <summary className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg text-sm font-semibold text-muted transition-colors hover:text-ink group-open:text-ink motion-reduce:transition-none">
        <ChevronRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-open:rotate-90 motion-reduce:transition-none"
        />
        {summary}
      </summary>
      <div className="space-y-1 text-sm text-muted tabular-nums">{body}</div>
    </details>
  );
  const errors = (which: "e1" | "e3") => {
    const list = bad
      .filter((f) => STEP_ONE.has(f) === (which === "e1"))
      .map((f) => t[ERRORS[f]]);
    return (
      <p
        id={`${uid}-${which}`}
        role="alert"
        className="mt-3.5 text-sm text-critical"
        hidden={!list.length}
      >
        {list.join(" ")}
      </p>
    );
  };
  const panel = (i: number, body: ReactNode, one = false) => (
    <section
      key={i}
      ref={(el) => {
        panels.current[i] = el;
      }}
      aria-labelledby={`${uid}-t${i}`}
      hidden={i !== step && i !== leaving}
      className={`grid grid-cols-1 lg:min-h-[480px] ${one ? "" : "lg:grid-cols-2"} ${
        i === leaving ? "pointer-events-none absolute inset-x-0 top-0" : ""
      }`}
      style={tone(i)}
    >
      {body}
    </section>
  );
  const content = "min-w-0 px-5 py-7 sm:px-7 sm:py-8 lg:px-11 lg:py-10";
  const visual =
    "@container flex min-w-0 flex-col justify-center border-t border-line bg-surface-0 px-5 py-7 sm:px-7 sm:py-8 lg:border-t-0 lg:border-l lg:px-11 lg:py-10";
  const takeaway =
    "grid min-h-[2.32em] content-end text-[clamp(1.875rem,1.4rem+1.6vw,2.625rem)] leading-[1.16] font-bold tracking-[-0.03em] text-balance tabular-nums [overflow-wrap:anywhere]";
  const flowRow =
    "grid grid-cols-[16px_minmax(0,1fr)] items-center gap-x-3 sm:grid-cols-[20px_minmax(0,1fr)] sm:gap-x-4";
  const dot = (color: string) => (
    <span
      aria-hidden="true"
      className="block size-4 rounded-full border-4 bg-card sm:size-5 sm:border-[5px]"
      style={{ borderColor: color }}
    />
  );
  const connector = (
    from: string,
    to: string,
    chip: string,
    delays: [number, number],
  ) => (
    <div className={`${flowRow} h-[54px]`} aria-hidden="true">
      <i
        data-in={`grow ${delays[0]} 360`}
        className="mx-auto block h-full w-[3px] origin-top rounded-sm"
        style={{ background: `linear-gradient(${from}, ${to})` }}
      />
      <span
        data-in={`up ${delays[1]} 320`}
        className="max-w-full justify-self-start rounded-full border border-line bg-card px-3 py-0.5 text-sm text-muted tabular-nums [overflow-wrap:anywhere]"
      >
        {chip}
      </span>
    </div>
  );
  const flowFigure = {
    fontSize: "min(28px, calc((100cqw - 130px) / (var(--len, 8) * .6)))",
  };
  const p = plays;

  return (
    <div ref={root} className="text-left" style={TONES}>
      {/* The design's page header, brought inside: currency and reset sit above the workbench. */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        {heading && <h2 className="text-title text-balance">{t.title}</h2>}
        <div className="ml-auto flex items-center gap-2">
          <div
            role="group"
            aria-label={t.currency}
            className="relative flex rounded-[10px] border border-line bg-surface-1 p-[3px]"
          >
            <span
              aria-hidden="true"
              className={`absolute inset-y-[3px] left-[3px] w-[58px] rounded-[7px] bg-card shadow-sm transition-transform duration-300 ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none ${
                currency === "VND" ? "translate-x-full" : ""
              }`}
            />
            {(["USD", "VND"] as const).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={currency === k}
                onClick={() => switchTo(k)}
                className={`relative z-10 min-h-9 w-[58px] rounded-[7px] text-sm font-semibold transition-colors motion-reduce:transition-none ${
                  currency === k ? "text-primary" : "text-muted hover:text-ink"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
          <button type="button" onClick={reset} className="btn-ghost">
            <RotateCcw aria-hidden className="size-4" />
            {t.reset}
          </button>
        </div>
      </div>

      <div
        ref={card}
        className="overflow-hidden rounded-[20px] border border-line bg-card shadow-[0_1px_2px_rgb(11_27_58/0.04),0_18px_40px_-22px_rgb(11_27_58/0.16)]"
      >
        {/* Stepper: numbered circles on one thin line. Steps ahead are never buttons. */}
        <div className="border-b border-line px-4 pt-[18px] pb-4 sm:px-11 sm:pt-[22px] sm:pb-5">
          <nav aria-label={t.stepsNav}>
            <ol className="flex">
              {NAMES.map((name, i) => {
                const st = status(i);
                const lit = i > 0 && status(i - 1) === "done";
                return (
                  <li
                    key={i}
                    className="group/st relative min-w-0 flex-1 text-center sm:px-2"
                    style={tone(i)}
                  >
                    {i > 0 && (
                      <span
                        aria-hidden="true"
                        className="absolute top-[17px] right-[calc(50%+24px)] left-[calc(-50%+24px)] h-0.5 rounded-sm transition-colors duration-300 motion-reduce:transition-none sm:right-[calc(50%+28px)] sm:left-[calc(-50%+28px)]"
                        style={{
                          background: lit
                            ? STEP_TONE[i - 1].f
                            : "var(--color-line)",
                        }}
                      />
                    )}
                    <div aria-hidden="true">
                      <span
                        className={`mx-auto grid size-9 place-items-center rounded-full text-[15px] font-bold tabular-nums transition-[background-color,color,box-shadow] duration-300 motion-reduce:transition-none sm:mb-2.5 ${
                          st === "current"
                            ? "bg-(--a) text-card shadow-[0_0_0_5px_color-mix(in_srgb,var(--a)_16%,transparent)]"
                            : st === "done"
                              ? "bg-[color-mix(in_srgb,var(--a)_15%,var(--color-card))] text-(--a)"
                              : "bg-surface-1 text-muted"
                        }`}
                      >
                        {st === "done" ? (
                          <Check className="size-[18px]" strokeWidth={2.7} />
                        ) : (
                          i + 1
                        )}
                      </span>
                      <span
                        className={`block text-[15px] leading-tight font-bold max-sm:sr-only ${
                          st === "locked" ? "text-muted" : "text-ink"
                        } ${st === "done" ? "underline-offset-[3px] group-hover/st:underline" : ""}`}
                      >
                        {name}
                      </span>
                      <span className="mt-0.5 block text-[13.5px] leading-[1.35] text-muted max-sm:sr-only">
                        {t[`desc${i + 1}`]}
                      </span>
                    </div>
                    {st === "done" ? (
                      <button
                        type="button"
                        onClick={() => go(i)}
                        aria-label={fill(t.stepGoBack, { n: i + 1, name })}
                        className="absolute inset-0 rounded-xl focus-visible:outline-(--a)"
                      />
                    ) : (
                      <span
                        className="sr-only"
                        aria-current={st === "current" ? "step" : undefined}
                      >
                        {fill(st === "current" ? t.stepCurrent : t.stepLocked, {
                          n: i + 1,
                          name,
                        })}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
          <div aria-hidden="true" className="mt-3 text-center sm:hidden">
            <strong className="block leading-tight text-ink">
              {NAMES[step]}
            </strong>
            <span className="block text-[13.5px] text-muted">
              {t[`desc${step + 1}`]}
            </span>
          </div>
        </div>

        <div key={gen} className="relative overflow-hidden">
          {/* Step 1: visits and orders paired with their live conversion; spend underneath, optional. */}
          {panel(
            0,
            <>
              <div className={`${content} flex flex-col justify-center`}>
                {title(0, t.s1Title)}
                {desc(t.s1Desc)}
                {help("visits", t.visitsHelp)}
                {help("orders", t.ordersHelp)}
                {help("spend", t.spendHelp)}
                <div className="rounded-[18px] border border-line bg-surface-0 px-5 pt-5 pb-[18px]">
                  <div className="grid grid-cols-1 gap-3.5 min-[481px]:grid-cols-2">
                    <div className="min-w-0">
                      {label("visits", t.visits)}
                      {field("visits")}
                    </div>
                    <div className="min-w-0">
                      {label("orders", t.orders)}
                      {field("orders")}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="h-0.5 flex-1 rounded-sm bg-line" />
                    <span className="flex-none rounded-full border border-[color-mix(in_srgb,var(--a)_30%,var(--color-card))] bg-card px-3.5 py-1 text-[15px] font-semibold text-(--a) tabular-nums">
                      <span aria-hidden="true">= </span>
                      {parts(t.pill, {
                        rate: <Count v={b100} f={F.pct} mid={F.midPct} />,
                      })}
                    </span>
                    <span className="h-0.5 flex-1 rounded-sm bg-line" />
                  </div>
                </div>
                <div className="mt-4 min-h-[104px]">
                  <button
                    type="button"
                    hidden={spendOpen}
                    onClick={() => {
                      setSpendOpen(true);
                      requestAnimationFrame(() =>
                        inputs.current.spend?.focus(),
                      );
                    }}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl border-[1.5px] border-dashed border-line-control pr-4 pl-3 text-[15px] font-semibold text-(--a) transition-colors hover:bg-primary-tint motion-reduce:transition-none"
                  >
                    <Plus aria-hidden className="size-5" />
                    {t.addSpend}
                  </button>
                  <div hidden={!spendOpen}>
                    <div className="flex items-baseline justify-between gap-2.5">
                      {label(
                        "spend",
                        <>
                          {t.spend}
                          <span className="ml-1.5 text-[13px] font-medium text-muted">
                            {t.optional}
                          </span>
                        </>,
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          const el = inputs.current.spend;
                          if (el) el.value = "";
                          prevs.current.spend = "";
                          setSpendOpen(false);
                          validate();
                        }}
                        className="min-h-8 px-1 text-[13.5px] text-muted underline underline-offset-[3px] hover:text-ink"
                      >
                        {t.remove}
                      </button>
                    </div>
                    <div className="relative">
                      {field("spend", true)}
                      <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-sm font-semibold text-muted">
                        {currency}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-3.5 text-[13.5px] text-muted">
                  {t.exampleNote}
                </p>
                {errors("e1")}
              </div>
              <div className={visual}>
                <p ref={caption} className={takeaway}>
                  <span className="block min-w-0">
                    {parts(F.pts(b100) === "1" ? t.per100One : t.per100, {
                      n: (
                        <span className="text-(--a)">
                          <Count
                            v={b100}
                            f={F.pts}
                            mid={F.midPts}
                            play={p[0]}
                            enter={{ from: 0, dur: 700 }}
                          />
                        </span>
                      ),
                    })}
                  </span>
                </p>
                <div className="mt-6">
                  <Cells
                    n={100}
                    v={Math.min(100, b100)}
                    play={p[0]}
                    enter={{ from: 0, dur: 1000 }}
                    label={fill(t.cellsAria, { n: F.pts(b100) })}
                    cell="aspect-[2/1]"
                  />
                </div>
                <p className="mt-3.5 flex items-center gap-2.5 text-[13.5px] text-muted">
                  <span
                    aria-hidden="true"
                    className="size-3 flex-none rounded-[3px] bg-(--af)"
                  />
                  {t.cellsLegend}
                </p>
                <p className="mt-5 text-muted">
                  {t.rate}{" "}
                  <strong className="text-[22px] tracking-[-0.02em] text-(--a) tabular-nums">
                    <Count v={b100} f={F.pct} mid={F.midPct} />
                  </strong>
                </p>
                {hasSpend && (
                  <p className="mt-2 text-muted">
                    {t.spendPerOrder}{" "}
                    <strong className="text-[22px] tracking-[-0.02em] text-(--a) tabular-nums">
                      <Count v={c.cacBefore} f={cac} none={t.undefined} />
                    </strong>
                    <span className="ml-1.5 inline-block rounded-full border border-line px-2 align-[2px] text-xs font-semibold whitespace-nowrap text-muted">
                      {t.cacProxy}
                    </span>
                  </p>
                )}
                {details(
                  t.howCalc,
                  <>
                    <p>
                      {fill(t.baseFormula, {
                        orders: F.num(s.orders),
                        visits: F.num(s.visits),
                        rate: F.pct(b100),
                      })}
                    </p>
                    {hasSpend && (
                      <>
                        <p>
                          {c.cacBefore === null
                            ? t.spoZero
                            : fill(t.spoFormula, {
                                spend: F.money(s.spend ?? 0, "math"),
                                orders: F.num(s.orders),
                                cac: cac(c.cacBefore),
                              })}
                        </p>
                        <p className="pt-1 text-[13.5px]">{t.spoHelp}</p>
                      </>
                    )}
                    <p className="pt-1 text-[13.5px]">{t.cellsHelp}</p>
                  </>,
                )}
              </div>
            </>,
          )}

          {/* Step 2: the lift is the visitor's, relative, never percentage points. */}
          {panel(
            1,
            <>
              <div className={content}>
                {title(1, t.s2Title)}
                {desc(t.s2Desc)}
                <div className="flex items-baseline justify-between gap-5">
                  <label
                    htmlFor={`${uid}-lift`}
                    className="text-sm font-semibold text-ink"
                  >
                    {t.liftLabel}
                  </label>
                  <output
                    htmlFor={`${uid}-lift`}
                    className="text-4xl font-bold tracking-[-0.035em] text-(--a) tabular-nums"
                  >
                    +{s.lift}%
                  </output>
                </div>
                <input
                  id={`${uid}-lift`}
                  type="range"
                  min={0}
                  max={30}
                  step={1}
                  value={s.lift}
                  aria-valuetext={fill(t.liftValue, { n: s.lift })}
                  aria-describedby={`${uid}-lift-help`}
                  onChange={(e) => setS({ ...s, lift: Number(e.target.value) })}
                  className="range-control mt-2.5"
                  // The site's slider, in this step's colour.
                  style={
                    {
                      "--color-primary": "var(--af)",
                      "--range-fill": `${(s.lift / 30) * 100}%`,
                    } as CSSProperties
                  }
                />
                <div
                  aria-hidden="true"
                  className="mt-0.5 flex justify-between px-1 text-[13px] text-muted tabular-nums"
                >
                  <span>0%</span>
                  <span>10%</span>
                  <span>20%</span>
                  <span>30%</span>
                </div>
                <div
                  id={`${uid}-lift-help`}
                  className="mt-7 rounded-[14px] border border-line bg-card px-5 py-[18px]"
                >
                  <p className="text-xl font-semibold tracking-[-0.015em] tabular-nums [overflow-wrap:anywhere] max-sm:min-h-[3.1em]">
                    {parts(t.liftEq, {
                      base: <span className="text-primary">{F.pct(b100)}</span>,
                      mult: F.num(1 + s.lift / 100, 2),
                      new: (
                        <span className="text-(--a)">
                          {F.pct(c.newCR * 100)}
                        </span>
                      ),
                    })}
                  </p>
                  <p className="mt-1.5 text-[13.5px] text-muted">
                    {t.liftNote}
                  </p>
                </div>
              </div>
              <div className={visual}>
                <p ref={liftCaption} className={`${takeaway} text-(--a)`}>
                  <span className="block min-w-0">
                    {parts(
                      Math.round(c.extraOrders) === 1 ? t.extraOne : t.extra,
                      {
                        n: (
                          <Count
                            v={c.extraOrders}
                            f={(x) => `+${F.num(Math.round(x))}`}
                            play={p[1]}
                            enter={{ from: 0, dur: 700 }}
                          />
                        ),
                      },
                    )}
                  </span>
                </p>
                <table className="mt-6 w-full border-collapse font-sans [&_td]:font-sans">
                  <caption className="sr-only">{t.cmpCaption}</caption>
                  <thead>
                    <tr className="text-left text-sm font-semibold">
                      <th scope="col" className="pb-3">
                        <span className="sr-only">{t.measure}</span>
                      </th>
                      <th scope="col" className="pb-3 text-primary">
                        {t.before}
                      </th>
                      <th scope="col" className="pb-3 text-(--a)">
                        {t.withLift}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_td]:border-t [&_td]:border-line [&_td]:font-bold [&_td]:tracking-[-0.03em] [&_td]:tabular-nums [&_td]:[overflow-wrap:anywhere] [&_th]:border-t [&_th]:border-line">
                    <tr>
                      <th
                        scope="row"
                        className="w-[30%] py-4 pr-2.5 text-left text-sm font-medium text-muted sm:w-[34%]"
                      >
                        {t.rowRate}
                      </th>
                      <td className="text-[28px] leading-[1.15] text-primary sm:text-[34px]">
                        <Count v={b100} f={F.pct} mid={F.midPct} />
                      </td>
                      <td className="text-[28px] leading-[1.15] text-(--a) sm:text-[34px]">
                        <Count
                          v={c.newCR * 100}
                          f={F.pct}
                          mid={F.midPct}
                          play={p[1]}
                          enter={{ from: b100, dur: 700 }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        className="py-4 pr-2.5 text-left text-sm font-medium text-muted"
                      >
                        {t.rowOrders}
                      </th>
                      <td className="text-[22px] leading-[1.15] text-primary sm:text-[28px]">
                        <Count v={s.orders} f={(x) => F.num(Math.round(x))} />
                      </td>
                      <td className="text-[22px] leading-[1.15] text-(--a) sm:text-[28px]">
                        <Count
                          v={c.newOrders}
                          f={(x) => F.num(Math.round(x))}
                          play={p[1]}
                          enter={{ from: s.orders, dur: 700 }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-6">
                  <div
                    role="img"
                    aria-label={fill(t.barAria, {
                      before: F.num(s.orders),
                      after: F.num(Math.round(c.newOrders)),
                    })}
                    className="relative h-[30px] overflow-hidden rounded-[9px] bg-line"
                  >
                    <i className="absolute inset-y-0 left-0 w-[76.923%] bg-primary" />
                    <span className="absolute inset-y-0 left-[76.923%] w-[23.077%]">
                      <Grow
                        v={s.lift}
                        max={30}
                        play={p[1]}
                        enter={{ from: 0, dur: 800, delay: 80 }}
                        className="h-full bg-(--af)"
                      />
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-5 text-[13.5px] text-muted">
                    <span className="inline-flex items-center gap-2">
                      <i
                        aria-hidden="true"
                        className="size-3 rounded-[3px] bg-primary"
                      />
                      {t.before}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <i
                        aria-hidden="true"
                        className="size-3 rounded-[3px] bg-(--af)"
                      />
                      {t.withLift}
                    </span>
                  </div>
                </div>
                {c.newCR > 1 && (
                  <p className="mt-5 rounded-[10px] bg-warning-bg px-3.5 py-3 text-sm text-warning">
                    {t.over100}
                  </p>
                )}
                {details(
                  t.howCalc,
                  <>
                    <p>
                      {fill(t.liftFormula, {
                        base: F.pct(b100),
                        lift: s.lift,
                        new: F.pct(c.newCR * 100),
                      })}
                    </p>
                    <p className="pt-1 text-[13.5px]">
                      {fill(t.pointsDelta, {
                        n: F.pts((c.newCR - c.base) * 100),
                      })}
                    </p>
                  </>,
                )}
              </div>
            </>,
          )}

          {/* Step 3: what the extra orders are worth, as a flow from orders to gross profit. */}
          {panel(
            2,
            <>
              <div className={content}>
                {title(2, t.s3Title)}
                {desc(t.s3Desc)}
                <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
                  <div className="min-w-0">
                    {label("aov", t.aov)}
                    <div className="relative">
                      {field("aov", true)}
                      <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-sm font-semibold text-muted">
                        {currency}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0">
                    {label("margin", t.margin)}
                    <div className="relative">
                      {field("margin", true)}
                      <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-sm font-semibold text-muted">
                        %
                      </span>
                    </div>
                  </div>
                </div>
                {help("aov", t.aovHelp)}
                {help("margin", t.marginHelp)}
                {errors("e3")}
              </div>
              <div className={visual}>
                <p className="mb-[22px] text-xl font-bold tracking-[-0.02em] text-ink">
                  {t.impact}
                </p>
                <div>
                  <div className={flowRow} data-in="up 150 420">
                    {dot("var(--color-sky)")}
                    <div className="flex min-h-[37px] min-w-0 items-baseline justify-between gap-4">
                      <span className="mr-auto font-semibold text-ink">
                        {t.flowOrders}
                      </span>
                      <strong
                        data-fit="0"
                        className="font-bold leading-[1.3] tracking-[-0.03em] whitespace-nowrap text-ink tabular-nums"
                        style={flowFigure}
                      >
                        <Count
                          v={c.extraOrders}
                          f={(x) => `+${F.num(Math.round(x))}`}
                          play={p[2]}
                          enter={{ from: 0, dur: 600, delay: 260 }}
                          align="end"
                        />
                      </strong>
                    </div>
                  </div>
                  {connector(
                    "var(--color-sky)",
                    "var(--c-teal)",
                    fill(t.chipAov, { aov: F.money(s.aov, "math") }),
                    [400, 520],
                  )}
                  <div className={flowRow} data-in="up 700 420">
                    {dot("var(--c-teal)")}
                    <div className="flex min-h-[37px] min-w-0 items-baseline justify-between gap-4">
                      <span className="mr-auto font-semibold text-ink">
                        {t.flowRevenue}
                      </span>
                      <strong
                        data-fit="0"
                        className="font-bold leading-[1.3] tracking-[-0.03em] whitespace-nowrap text-ink tabular-nums"
                        style={flowFigure}
                      >
                        <Count
                          v={c.extraRevenue}
                          f={(x) => `+${F.money(Math.round(x))}`}
                          play={p[2]}
                          enter={{ from: 0, dur: 700, delay: 780 }}
                          align="end"
                        />
                      </strong>
                    </div>
                  </div>
                  {connector(
                    "var(--c-teal)",
                    "var(--color-success)",
                    fill(t.chipMargin, { margin: F.num(s.margin, 2) }),
                    [960, 1080],
                  )}
                  <div
                    className={`${flowRow} items-start!`}
                    data-in="pop 1260 520"
                  >
                    <span className="mt-6">{dot("var(--color-success)")}</span>
                    <div className="rounded-2xl border-[1.5px] border-success-line bg-card px-4 pt-4 pb-[18px] shadow-[0_10px_26px_-16px_color-mix(in_srgb,var(--color-success)_45%,transparent)] sm:px-[22px] sm:pt-[18px] sm:pb-5">
                      <span className="font-semibold text-success">
                        {t.flowProfit}
                      </span>
                      <strong
                        data-fit="0"
                        className="mt-0.5 mb-3.5 flex h-[calc(clamp(40px,4.6vw,56px)*1.08)] items-center leading-[1.08] font-bold tracking-[-0.04em] whitespace-nowrap text-success tabular-nums"
                        style={{
                          fontSize:
                            "min(clamp(40px, 4.6vw, 56px), calc((100cqw - 92px) / (var(--len, 8) * .6)))",
                        }}
                      >
                        <Count
                          v={c.grossProfit}
                          f={(x) => `+${F.money(Math.round(x))}`}
                          play={p[2]}
                          enter={{ from: 0, dur: 900, delay: 1390 }}
                        />
                      </strong>
                      <div
                        aria-hidden="true"
                        className="h-2.5 overflow-hidden rounded-full bg-success-bg"
                      >
                        <Grow
                          v={s.margin}
                          max={100}
                          play={p[2]}
                          enter={{ from: 0, dur: 900, delay: 1390 }}
                          className="h-full rounded-full bg-success"
                        />
                      </div>
                      <p className="mt-2 text-[13.5px] text-muted tabular-nums">
                        {fill(t.marginCap, { margin: F.num(s.margin, 2) })}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-[22px] border-l-[3px] border-success-line pl-3 text-sm text-muted">
                  {t.gpCaveat}
                </p>
                {details(
                  t.showMath,
                  <>
                    <p>
                      {fill(t.mathOrders, {
                        orders: F.num(s.orders),
                        lift: s.lift,
                      })}
                    </p>
                    <p>
                      {fill(t.mathRevenue, {
                        extra: F.num(c.extraOrders, 2),
                        aov: F.money(s.aov, "math"),
                      })}
                    </p>
                    <p>
                      {fill(t.mathProfit, {
                        revenue: F.money(c.extraRevenue, "math"),
                        margin: F.num(s.margin, 2),
                      })}
                    </p>
                    <p className="pt-1 text-[13.5px]">{t.mathNote}</p>
                  </>,
                )}
              </div>
            </>,
          )}

          {/* Step 4: the month in one figure, and what it means per order and per tenth of a point. */}
          {panel(
            3,
            <div className="@container mx-auto w-full max-w-[700px] px-5 pt-[30px] pb-7 text-center sm:px-6 sm:pt-11 sm:pb-10">
              <div className="mb-[22px]">{title(3, t.s4Title)}</div>
              <strong
                data-fit="0"
                className="flex h-[calc(clamp(60px,10vw,96px)*1.06)] items-center justify-center leading-none font-bold tracking-[-0.045em] whitespace-nowrap text-success tabular-nums"
                style={{
                  fontSize:
                    "min(clamp(60px, 10vw, 96px), calc(100cqw / (var(--len, 8) * .6)))",
                }}
              >
                <Count
                  v={c.grossProfit}
                  f={(x) => `+${F.money(Math.round(x))}`}
                  play={p[3]}
                  enter={{ from: 0, dur: 1100, delay: 150 }}
                  align="center"
                />
              </strong>
              <p className="mt-2.5 text-lg font-bold tracking-[-0.01em] text-ink sm:text-xl">
                {t.heroLabel}
              </p>
              <p className="mt-1 min-h-[1.55em] text-muted">
                {fill(
                  [8, 11, 18].includes(s.lift) ? t.heroLiftAn : t.heroLift,
                  { lift: s.lift },
                )}
              </p>
              <div className="mt-[30px] text-left [--w:100cqw] sm:[--w:60cqw]">
                <div
                  data-in="up8 900 420"
                  data-fit="2"
                  className="flex flex-col items-start gap-2.5 border-t border-line py-5 sm:min-h-[92px] sm:flex-row sm:items-center sm:justify-between sm:gap-5"
                >
                  <div className="min-w-0">
                    <span className="block text-[17px] font-bold text-ink">
                      {t.costTitle}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {hasSpend ? t.costSub : t.costNoSpend}
                    </span>
                  </div>
                  {hasSpend && (
                    <div
                      className="flex h-8 max-w-full flex-none items-center font-bold tracking-[-0.02em] whitespace-nowrap text-ink tabular-nums sm:max-w-[60%] sm:justify-end"
                      style={{
                        fontSize:
                          "min(24px, calc((var(--w) - 8px) / (var(--len, 12) * .62)))",
                      }}
                    >
                      <span className="font-semibold text-muted">
                        <Count v={c.cacBefore} f={cac} none={t.undefined} />
                      </span>
                      <span className="mx-1.5 text-[.8em] font-medium text-muted">
                        <span aria-hidden="true">→</span>
                        <span className="sr-only"> {t.to} </span>
                      </span>
                      <Count
                        v={c.cacAfter}
                        f={cac}
                        none={t.undefined}
                        play={p[3]}
                        enter={
                          c.cacBefore === null
                            ? undefined
                            : { from: c.cacBefore, dur: 700, delay: 1000 }
                        }
                      />
                    </div>
                  )}
                </div>
                <div
                  data-in="up8 1060 420"
                  data-fit="10"
                  className="flex flex-col items-start gap-2.5 border-t border-line py-5 sm:min-h-[92px] sm:flex-row sm:items-center sm:justify-between sm:gap-5"
                >
                  <div className="min-w-0">
                    <span className="block text-[17px] font-bold text-ink">
                      {t.gpTitle}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {t.gpSub}
                    </span>
                  </div>
                  <div
                    className="flex h-8 max-w-full flex-none items-center font-bold tracking-[-0.02em] whitespace-nowrap text-success tabular-nums sm:max-w-[60%] sm:justify-end"
                    style={{
                      fontSize:
                        "min(24px, calc((var(--w) - 8px) / (var(--len, 12) * .62)))",
                    }}
                  >
                    <Count
                      v={c.gpPer}
                      f={(x) => `+${F.money(Math.round(x))}`}
                      play={p[3]}
                      enter={{ from: 0, dur: 800, delay: 1100 }}
                    />
                    <span className="ml-[.35em] text-[.8em] font-semibold">
                      {t.perMonth}
                    </span>
                  </div>
                </div>
              </div>
              <p
                data-in="fade 1300 400"
                className="mt-1.5 border-t border-line pt-5 text-sm text-muted"
              >
                {t.hint}
              </p>
            </div>,
            true,
          )}

          {/* Step 5: where a lift would come from. The illustration, or the store's own test. */}
          {panel(
            4,
            <>
              <div className={content}>
                {title(4, t.s5Title)}
                {desc(real ? t.s5DescReal : t.s5Desc)}
                <div className="flex flex-wrap gap-3">
                  {real && gaps.findingsId && (
                    <button
                      type="button"
                      onClick={toFindings}
                      className="group btn-primary min-h-12 px-5 text-base"
                    >
                      {t.seeProducts}
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                      />
                    </button>
                  )}
                  <button
                    type="button"
                    aria-expanded={planOpen}
                    aria-controls={`${uid}-plan`}
                    onClick={togglePlan}
                    className={`group min-h-12 px-5 text-base ${real && gaps.findingsId ? "btn-secondary" : "btn-primary"}`}
                  >
                    {t.plan}
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                    />
                  </button>
                </div>
                <div
                  ref={planRef}
                  id={`${uid}-plan`}
                  hidden={!planOpen}
                  className="mt-[26px] border-t border-line pt-[22px]"
                >
                  <p className="text-lg font-bold tracking-[-0.02em] text-ink">
                    {t.planTitle}
                  </p>
                  <p className="mt-1.5 mb-2.5 text-[13.5px] text-pretty text-muted tabular-nums">
                    {planText}
                  </p>
                  {PLAN.map((k, i) => (
                    <label
                      key={k}
                      className="flex cursor-pointer items-start gap-3 py-2.5 text-[15px] text-ink"
                    >
                      <input
                        type="checkbox"
                        checked={checks[i]}
                        onChange={(e) =>
                          setChecks(
                            checks.map((x, j) =>
                              j === i ? e.target.checked : x,
                            ),
                          )
                        }
                        className="mt-0.5 size-5 flex-none cursor-pointer accent-primary"
                      />
                      {t[k]}
                    </label>
                  ))}
                  <button
                    type="button"
                    onClick={download}
                    className="btn-secondary mt-3.5"
                  >
                    {t.download}
                  </button>
                </div>
              </div>
              <div className={visual}>
                <p className="text-[clamp(3.5rem,6vw,4.75rem)] leading-none font-bold tracking-[-0.05em] text-(--a) tabular-nums max-sm:text-[60px]">
                  <Count
                    v={audit.toFix}
                    f={(x) => F.num(Math.round(x))}
                    play={p[4]}
                    enter={{ from: 0, dur: 1100, delay: 200 }}
                  />{" "}
                  <span className="text-[clamp(1.5rem,2.4vw,1.875rem)] font-medium tracking-[-0.02em] text-muted">
                    {fill(t.gapsOf, { of: F.num(audit.tested) })}
                  </span>
                </p>
                <p className="mt-2.5 mb-[26px] text-[17px] text-ink">
                  {t.gapsSub}
                </p>
                <Cells
                  n={cellCount}
                  v={auditFill}
                  play={p[4]}
                  enter={{ from: 0, dur: 1100, delay: 200 }}
                  label={fill(
                    real
                      ? scaled
                        ? t.realAriaScaled
                        : t.realAria
                      : t.gapsAria,
                    {
                      n: F.num(audit.toFix),
                      of: F.num(audit.tested),
                    },
                  )}
                  cell="aspect-[1.45/1]"
                />
                <p className="mt-[22px] border-l-[3px] border-(--af) pl-3 text-sm text-muted">
                  {real
                    ? fill(t.realCaveat, { of: F.num(audit.tested) })
                    : t.gapsCaveat}
                  <br />
                  {t.gapsNoLift}
                </p>
              </div>
            </>,
          )}
        </div>

        <div className="flex items-center justify-between gap-3.5 border-t border-line bg-card px-4 py-3.5 sm:px-7 sm:py-4">
          <button
            type="button"
            onClick={() => go(step - 1)}
            disabled={step === 0}
            className={`btn-secondary min-h-12 px-3.5 text-base sm:px-5 ${step === 0 ? "invisible" : ""}`}
          >
            <ArrowLeft aria-hidden className="size-4" />
            {t.back}
          </button>
          <div className="flex items-center gap-[18px]">
            <small className="text-[13.5px] text-muted tabular-nums max-sm:hidden">
              {fill(t.stepOf, { n: step + 1, of: 5 })}
            </small>
            <button
              type="button"
              onClick={next}
              disabled={bad.length > 0}
              className="group btn-primary min-h-12 px-4 text-base whitespace-nowrap sm:px-5"
            >
              {t[`next${step + 1}`]}
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-1.5 px-1 text-[13.5px] text-muted sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <p>{t.footNote}</p>
          {F.vnd && <p className="mt-1">{fill(t.fxShown, { fx: fxLine })}</p>}
        </div>
        <details className="group max-w-[44ch]">
          <summary className="flex min-h-8 cursor-pointer items-center gap-1.5 hover:text-ink sm:justify-end">
            <ChevronRight
              aria-hidden
              className="size-3.5 transition-transform duration-200 group-open:rotate-90 motion-reduce:transition-none"
            />
            {t.about}
          </summary>
          <div className="space-y-2 pt-2">
            <p>{t.about1}</p>
            <p>{t.about2}</p>
            <p>{fxNote}</p>
          </div>
        </details>
      </div>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {live}
      </div>
    </div>
  );
}
