"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowRight, Clock, Globe, Tag } from "lucide-react";
import { Turnstile } from "@/components/Turnstile";
import { HeroAurora } from "@/components/designed/hero-aurora";
import { AddressBar } from "./address-bar";
import { Result } from "./result";
import { RunPipeline } from "./run-pipeline";
import {
  domainOf,
  pollTest,
  useSearch,
  startTest,
  testConfig,
  TestError,
  type LiveEvent,
  type RequirementResult,
  type TestState,
} from "@/lib/catalogue-test";

/**
 * Test My Catalogue (rainbow `ODIN/specs/nlr/requirements/store-url-audit/store-url-audit.md`).
 * The merchant enters pages from one store; spider reads them in a queue and this shows it live,
 * then the result the way Pingdom shows a speed test (owner, 2026-11-04): number tiles, what each
 * Pulse product would fix as counts, one finding open as proof, the rest masked to their counts,
 * the calculator on the merchant's own numbers, and the ask.
 *
 * Text arrives as props: `designedText` reads the static export's render store, which a client
 * cannot. `{name}` in a label is filled here.
 */
export type Labels = Record<string, string>;

function fill(s: string, vars: Record<string, string | number>) {
  return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

interface Row {
  url: string;
  title?: string;
  state: "queued" | "inspecting" | "done" | "skipped";
  reason?: string;
  facts?: LiveEvent["facts"];
}

export function CatalogueTest({
  labels,
  locale,
  calculator,
  header,
  ask,
}: {
  labels: Labels;
  locale: string;
  calculator: ReactNode;
  header: ReactNode;
  /** One line under the bar: ask us to run it instead. Shown with the form, not during a run. */
  ask: ReactNode;
}) {
  const t = useCallback(
    (k: string, vars: Record<string, string | number> = {}) =>
      fill(labels[k] ?? k, vars),
    [labels],
  );
  const num = useCallback(
    (n: number) =>
      new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US").format(n),
    [locale],
  );

  const [enabled, setEnabled] = useState<boolean | null>(null);
  // The config could not be fetched: not the same as the test being switched off. Saying "opens
  // soon" for a failed request told visitors it was closed when it was broken.
  const [unavailable, setUnavailable] = useState(false);
  // What spider can test today, from its config; laptops and monitors until it answers.
  const [categories, setCategories] = useState<string[]>(["laptop", "monitor"]);
  // A shared result opens straight on it; ?url= prefills the form (the homepage box links here).
  const search = useSearch();
  const [pages, setPages] = useState<string[]>([]);
  const [pagesOk, setPagesOk] = useState(false);
  const [category, setCategory] = useState<string>("");
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [chosen, setId] = useState<string | null | undefined>(undefined);
  const id = chosen === undefined ? search.get("id") : chosen;
  // Bumped on every submit, so polling restarts even when the API hands back the id already shown:
  // a reused test has the same id, and without this the page sat on "Waiting in line" (BUG-104).
  const [run, setRun] = useState(0);
  const [state, setState] = useState<TestState | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [reqs, setReqs] = useState<
    Record<string, Record<RequirementResult, number>>
  >({});
  const [now, setNow] = useState<string | null>(null);
  // From the live events: spider says "evaluating" only as an event, never as the stored status, so
  // the page keeps it here (step 4 of the pipeline); the products found on the store; when it started.
  const [evaluating, setEvaluating] = useState(false);
  const [found, setFound] = useState<number | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const started = useRef<number | null>(null);
  const cursor = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    testConfig()
      .then((c) => {
        setEnabled(c.enabled);
        if (c.categories?.length) setCategories(c.categories);
      })
      .catch(() => setUnavailable(true));
  }, []);

  const apply = useCallback((e: LiveEvent) => {
    if (e.type === "status" && e.status === "evaluating") setEvaluating(true);
    if (e.type === "discovered" && e.discovered !== undefined)
      setFound(e.discovered);
    if (e.type === "discovered" && e.urls)
      setRows(e.urls.map((url) => ({ url, state: "queued" })));
    if (e.type === "inspecting" && e.url) {
      setNow(e.url);
      setRows((r) =>
        r.map((x) => (x.url === e.url ? { ...x, state: "inspecting" } : x)),
      );
    }
    if (e.type === "inspected" && e.url) {
      setRows((r) =>
        r.map((x) =>
          x.url === e.url
            ? { ...x, state: "done", title: e.title, facts: e.facts }
            : x,
        ),
      );
      if (e.reqs)
        setReqs((prev) => {
          const next = { ...prev };
          for (const [rid, res] of Object.entries(e.reqs!)) {
            const c = {
              ...(next[rid] ?? {
                supported: 0,
                partial: 0,
                buried: 0,
                insufficient: 0,
              }),
            };
            c[res]++;
            next[rid] = c;
          }
          return next;
        });
    }
    if (e.type === "skipped" && e.url)
      setRows((r) =>
        r.map((x) =>
          x.url === e.url ? { ...x, state: "skipped", reason: e.reason } : x,
        ),
      );
  }, []);

  // Poll while running; play each batch across the interval so the ticker moves rather than jumps.
  useEffect(() => {
    if (!id) return;
    let stop = false;
    let handle: number | undefined;
    const tick = async () => {
      try {
        const s = await pollTest(id, cursor.current);
        if (stop) return;
        cursor.current = s.cursor;
        setState(s);
        if (started.current === null && s.events.length) {
          started.current = s.events[0].at;
          setStartedAt(started.current);
        }
        if (started.current !== null) setElapsed(Date.now() - started.current);
        const gap =
          s.nextPollMs && !reducedMotion()
            ? s.nextPollMs / Math.max(1, s.events.length)
            : 0;
        s.events.forEach((e, i) => {
          if (gap)
            timers.current.push(window.setTimeout(() => apply(e), i * gap));
          else apply(e);
        });
        if (s.nextPollMs) handle = window.setTimeout(tick, s.nextPollMs);
      } catch (e) {
        if (!stop)
          setError(
            e instanceof TestError && e.status === 404
              ? t("notFound")
              : t("error"),
          );
      }
    };
    tick();
    return () => {
      stop = true;
      if (handle) clearTimeout(handle);
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [id, run, apply, t]);

  const domain = domainOf(pages[0] ?? "");

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError(null);
    const list = pages;
    if (!list.length || !pagesOk || !token) return;
    setBusy(true);
    try {
      const r = await startTest(list, token, category || undefined);
      cursor.current = 0;
      setRows([]);
      setReqs({});
      setEvaluating(false);
      setFound(null);
      setStartedAt(null);
      setElapsed(null);
      started.current = null;
      setState(null);
      setId(r.id);
      setRun((n) => n + 1);
      window.history.replaceState(null, "", `?id=${r.id}`);
    } catch (e) {
      const err = e as TestError;
      setError(
        err.details
          ? Object.values(err.details)[0]!
          : err.status === 429
            ? t("tooMany")
            : err.status === 503
              ? t("closed")
              : t("error"),
      );
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setId(null);
    setState(null);
    setRows([]);
    setReqs({});
    setEvaluating(false);
    setFound(null);
    setStartedAt(null);
    setElapsed(null);
    started.current = null;
    cursor.current = 0;
    window.history.replaceState(null, "", window.location.pathname);
  };

  const status = state?.status ?? (id ? "queued" : null);
  const teaser = state?.teaser ?? null;
  const running =
    Boolean(id) && !teaser && status !== "failed" && status !== "blocked";
  const done = rows.filter(
    (r) => r.state === "done" || r.state === "skipped",
  ).length;

  return (
    <div className="flex flex-1 flex-col">
      {/* Pingdom's layout (owner, 2026-11-04): a band with the heading and one row, address,
          category and the button, which stays put while the result builds underneath. The hero
          background (`hero-bg` and the aurora), like every other hero's (owner, 5 Nov 2026); `isolate` also keeps the bar's
          glow behind the bar. It clips sideways only, so the category list can hang below it over the next section (`z-10`). Pricing's hero padding, `pt-12 pb-16 lg:pt-16 lg:pb-20`, as the other heroes (owner, 5 Nov 2026). Until a test starts the page stretches the hero to fill the first
          screen with About Pulse under it, About at its own height and the hero's content centred in the room left
          over; the title and the bar keep their fixed gap (owner, 5 Nov 2026). */}
      <section
        className={`relative isolate z-10 hero-bg overflow-x-clip border-b border-line ${id ? "" : "flex flex-1 flex-col"}`}
      >
        <HeroAurora />
        {/* A row around `frame` so it grows to its usual width (it is content-box with auto margins, and a
            flex column would shrink it to its content), and stretches to the hero's height. */}
        <div className={id ? undefined : "flex flex-1"}>
          <div
            className={`frame pt-12 pb-16 lg:pt-16 lg:pb-20 ${id ? "" : "flex flex-1 flex-col justify-center"}`}
          >
            {running ? (
              <div className="mx-auto max-w-xl text-center" aria-live="polite">
                <h2 className="text-title text-balance">{t("runningTitle")}</h2>
                <Gauge />
                <p className="mt-2 text-muted">
                  {status === "queued" && state?.ahead
                    ? t("queuedAhead", { n: state.ahead })
                    : rows.length
                      ? t("runningProgress", { n: done, of: rows.length })
                      : t(`status_${status}`)}
                </p>
              </div>
            ) : (
              header
            )}
            <form
              hidden={running}
              onSubmit={submit}
              className="mx-auto mt-12 w-full max-w-5xl lg:mt-16"
              noValidate
            >
              {(enabled === false || unavailable) && (
                <p className="mb-4 text-center text-sm text-pretty text-muted">
                  {t(unavailable ? "unavailable" : "closed")}
                </p>
              )}
              <fieldset
                disabled={enabled !== true || busy}
                className="space-y-3"
              >
                <AddressBar
                  t={t}
                  initial={search.get("url") ?? ""}
                  category={category}
                  categories={categories}
                  locale={locale}
                  onCategory={setCategory}
                  onPages={(list, ok) => {
                    setPages(list);
                    setPagesOk(ok);
                  }}
                  leaving={busy}
                >
                  <button
                    type="submit"
                    className="btn-primary group min-h-12 rounded-full px-5.5 aria-busy:cursor-progress aria-busy:opacity-100"
                    disabled={!pagesOk || !token}
                    aria-busy={busy || undefined}
                  >
                    {busy ? t("starting") : t("submit")}
                    <ArrowRight
                      className="size-4 transition-transform duration-200 ease-out-soft group-enabled:group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </button>
                </AddressBar>
                {/* Three facts, each with its own icon rather than a tick on each (owner's pick C3, 5 Nov 2026), with
                  more room above them (owner, 5 Nov 2026). */}
                <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 pt-3 text-sm text-muted lg:pt-5">
                  {(
                    [
                      [Tag, "factFree"],
                      [Globe, "factPublic"],
                      [Clock, "factTime"],
                    ] as const
                  ).map(([Icon, k]) => (
                    <li key={k} className="inline-flex items-center gap-1.5">
                      <Icon
                        className="size-[15px] text-primary/85"
                        aria-hidden
                      />
                      {t(k)}
                    </li>
                  ))}
                </ul>
                {enabled && <Turnstile onToken={setToken} />}
                {error && !id && (
                  <p className="text-sm text-ink" role="alert">
                    {error}
                  </p>
                )}
              </fieldset>
            </form>
            {!running && ask}
          </div>
        </div>
      </section>

      {/* A plain block around `frame`: the root is a flex column, which would size `frame` (content-box,
          auto margins) to its widest line instead of the page's width. */}
      <div className="empty:hidden">
        <div className="frame py-12 lg:py-16 empty:hidden">
          {/* The run as a pipeline of stations (owner, 5 Nov 2026; the designer's progress mockup). */}
          {id && !teaser && (
            <>
              <RunPipeline
                t={t}
                num={num}
                status={
                  evaluating && status === "inspecting"
                    ? "evaluating"
                    : (status ?? "queued")
                }
                domain={state?.domain ?? domain ?? ""}
                ahead={state?.ahead}
                found={found}
                sampled={rows.length}
                read={done}
                now={now}
                pages={rows}
                reqs={reqs}
                startedAt={startedAt}
                elapsed={elapsed}
                onReset={reset}
              />
              {state?.reason === "no_category" && (
                <p className="mt-4 text-sm text-ink">
                  {t("reason_no_category")}
                </p>
              )}
              {error && (
                <p className="mt-4 text-sm text-ink" role="alert">
                  {error}
                </p>
              )}
            </>
          )}

          {teaser && state && (
            <Result
              teaser={teaser}
              state={state}
              t={t}
              num={num}
              id={id!}
              locale={locale}
              calculator={calculator}
              onReset={reset}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/** A gauge whose needle sweeps while the test runs, like Pingdom's (owner, 2026-11-04). Still under reduced motion. */
function Gauge() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="mx-auto mt-6 size-28 text-primary"
      aria-hidden="true"
    >
      <circle
        cx="60"
        cy="60"
        r="48"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth="12"
      />
      <path
        d="M60 12a48 48 0 0 1 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <g className="origin-center animate-spin [animation-duration:2.4s] motion-reduce:animate-none">
        <line
          x1="60"
          y1="60"
          x2="60"
          y2="26"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </g>
      <circle cx="60" cy="60" r="9" fill="currentColor" />
    </svg>
  );
}
