"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Turnstile } from "@/components/Turnstile";
import { Result } from "./result";
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

const RESULTS: RequirementResult[] = [
  "supported",
  "partial",
  "buried",
  "insufficient",
];
const BAR: Record<RequirementResult, string> = {
  supported: "bg-primary",
  partial: "bg-primary/50",
  buried: "bg-muted/50",
  insufficient: "bg-muted/25",
};

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
  ctaBar,
}: {
  labels: Labels;
  locale: string;
  calculator: ReactNode;
  header: ReactNode;
  ctaBar: ReactNode;
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
  // What spider can test today, from its config; laptops and monitors until it answers.
  const [categories, setCategories] = useState<string[]>(["laptop", "monitor"]);
  // A shared result opens straight on it; ?url= prefills the form (the homepage box links here).
  const search = useSearch();
  const [typed, setUrls] = useState<string[] | null>(null);
  const urls = typed ?? [search.get("url") ?? ""];
  const [category, setCategory] = useState<string>("");
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [chosen, setId] = useState<string | null | undefined>(undefined);
  const id = chosen === undefined ? search.get("id") : chosen;
  const [state, setState] = useState<TestState | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [reqs, setReqs] = useState<
    Record<string, Record<RequirementResult, number>>
  >({});
  const [now, setNow] = useState<string | null>(null);
  const cursor = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    testConfig()
      .then((c) => {
        setEnabled(c.enabled);
        if (c.categories?.length) setCategories(c.categories);
      })
      .catch(() => setEnabled(false));
  }, []);

  const apply = useCallback((e: LiveEvent) => {
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
  }, [id, apply, t]);

  const domain = domainOf(urls[0] ?? "");
  const mixed = urls.find((u) => u.trim() && domainOf(u) !== domain);

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError(null);
    const list = urls.map((u) => u.trim()).filter(Boolean);
    if (!list.length || mixed || !token) return;
    setBusy(true);
    try {
      const r = await startTest(list, token, category || undefined);
      cursor.current = 0;
      setRows([]);
      setReqs({});
      setState(null);
      setId(r.id);
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
    <div>
      {/* Pingdom's layout (owner, 2026-11-04): a band with the heading and one row, address,
          category and the button, which stays put while the result builds underneath. */}
      <div className="border-b border-line bg-surface-1">
        <div className="frame py-14 lg:py-20">
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
            className="mx-auto mt-8 max-w-5xl"
            noValidate
          >
            {enabled === false && (
              <p className="mb-4 text-center text-sm text-pretty text-muted">
                {t("closed")}
              </p>
            )}
            <fieldset disabled={enabled !== true || busy} className="space-y-3">
              <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-[minmax(0,1fr)_13rem_auto]">
                <label className="block">
                  <span className="text-sm font-medium text-ink">
                    {t("urlLabel")}
                  </span>
                  <input
                    id="test-url"
                    className="field mt-1.5 font-mono"
                    inputMode="url"
                    autoComplete="url"
                    placeholder={t("urlPlaceholder")}
                    value={urls[0]}
                    onChange={(e) =>
                      setUrls(
                        urls.map((x, j) => (j === 0 ? e.target.value : x)),
                      )
                    }
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-ink">
                    {t("category")}
                  </span>
                  <select
                    id="test-category"
                    className="field mt-1.5"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">{t("catAuto")}</option>
                    {[...categories]
                      .sort((a, b) =>
                        t(`cat_${a}`).localeCompare(t(`cat_${b}`), locale),
                      )
                      .map((c) => (
                        <option key={c} value={c}>
                          {t(`cat_${c}`)}
                        </option>
                      ))}
                  </select>
                </label>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={!domain || !!mixed || !token}
                >
                  {busy ? t("starting") : t("submit")}
                </button>
              </div>
              {urls.slice(1).map((u, k) => (
                <input
                  key={k}
                  aria-label={t("urlMore")}
                  className="field font-mono"
                  inputMode="url"
                  placeholder={domain ? `${domain}/...` : t("urlPlaceholder")}
                  value={u}
                  onChange={(e) =>
                    setUrls(
                      urls.map((x, j) => (j === k + 1 ? e.target.value : x)),
                    )
                  }
                />
              ))}
              {mixed && domain && (
                <p className="text-sm text-ink" role="alert">
                  {t("sameDomain", { domain })}
                </p>
              )}
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <span className="text-sm text-muted">{t("note")}</span>
                {urls.length < 20 && domain && (
                  <button
                    type="button"
                    onClick={() => setUrls([...urls, ""])}
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {t("addUrl")}
                  </button>
                )}
              </div>
              {enabled && <Turnstile onToken={setToken} />}
              {error && !id && (
                <p className="text-sm text-ink" role="alert">
                  {error}
                </p>
              )}
            </fieldset>
          </form>
          {ctaBar}
        </div>
      </div>

      <div className="frame py-12 lg:py-16 empty:hidden">
        {id && !teaser && (
          <section
            aria-live="polite"
            className="rounded-3xl border border-line bg-card p-6 shadow-sm sm:p-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold text-ink">
                {state?.domain ?? domain}
              </h2>
              <p className="text-sm text-muted">
                {status === "queued" && state?.ahead
                  ? t("queuedAhead", { n: state.ahead })
                  : status === "blocked"
                    ? t("status_stopped")
                    : t(`status_${status}`)}
              </p>
            </div>
            {rows.length > 0 && (
              <>
                <div
                  className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-1"
                  role="progressbar"
                  aria-valuenow={done}
                  aria-valuemax={rows.length}
                >
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-700 motion-reduce:transition-none"
                    style={{ width: `${(done / rows.length) * 100}%` }}
                  />
                </div>
                {now && (
                  <p className="mt-3 truncate font-mono text-xs text-muted">
                    {t("reading")} {now}
                  </p>
                )}
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <ol className="max-h-80 space-y-1 overflow-y-auto pr-2 text-sm">
                    {rows.map((r) => (
                      <li
                        key={r.url}
                        className="flex items-center gap-2 border-t border-line py-1.5 first:border-t-0"
                      >
                        <span
                          aria-hidden="true"
                          className={`size-2 shrink-0 rounded-full ${r.state === "inspecting" ? "animate-pulse bg-primary motion-reduce:animate-none" : r.state === "done" ? "bg-primary" : r.state === "skipped" ? "bg-muted/40" : "bg-line"}`}
                        />
                        <span className="min-w-0 flex-1 truncate text-ink">
                          {r.title || new URL(r.url).pathname}
                        </span>
                        {r.facts && (
                          <span className="flex shrink-0 gap-1 font-mono text-xs">
                            <span
                              title={t("factVisible")}
                              className="rounded bg-primary/10 px-1.5 text-primary"
                            >
                              {r.facts.visible}
                            </span>
                            <span
                              title={t("factBuried")}
                              className="rounded bg-surface-1 px-1.5 text-muted"
                            >
                              {r.facts.buried}
                            </span>
                            <span
                              title={t("factMissing")}
                              className="rounded bg-surface-1 px-1.5 text-ink"
                            >
                              {r.facts.missing}
                            </span>
                            {r.facts.conflicting > 0 && (
                              <span
                                title={t("factConflicting")}
                                className="rounded bg-surface-1 px-1.5 text-ink"
                              >
                                !{r.facts.conflicting}
                              </span>
                            )}
                          </span>
                        )}
                        {r.state === "skipped" && (
                          <span className="shrink-0 text-xs text-muted">
                            {t(`skip_${r.reason}`)}
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                      {t("soFar")}
                    </p>
                    <ul className="mt-2 space-y-2.5">
                      {Object.entries(reqs).map(([rid, c]) => {
                        const total =
                          RESULTS.reduce((n, r) => n + c[r], 0) || 1;
                        return (
                          <li key={rid}>
                            <div className="flex justify-between text-sm">
                              <span className="text-ink">
                                {t(`req_${rid}`)}
                              </span>
                              <span className="font-mono text-xs text-muted">
                                {c.supported}/{total}
                              </span>
                            </div>
                            <div className="mt-1 flex h-2 overflow-hidden rounded-full bg-surface-1">
                              {RESULTS.map((r) => (
                                <div
                                  key={r}
                                  className={`${BAR[r]} transition-[width] duration-700 motion-reduce:transition-none`}
                                  style={{ width: `${(c[r] / total) * 100}%` }}
                                />
                              ))}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="mt-3 text-xs text-pretty text-muted">
                      {t("legend")}
                    </p>
                  </div>
                </div>
              </>
            )}
            {(status === "failed" || (status === "blocked" && !teaser)) && (
              <div className="mt-4">
                <p className="text-sm text-ink">
                  {state?.reason === "no_category"
                    ? t("reason_no_category")
                    : (state?.reason ?? t(`status_${status}`))}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  {t("testAnother")}
                </button>
              </div>
            )}
            {error && (
              <p className="mt-4 text-sm text-ink" role="alert">
                {error}
              </p>
            )}
          </section>
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
