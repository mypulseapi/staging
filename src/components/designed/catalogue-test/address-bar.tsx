"use client";

import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { domainOf } from "@/lib/catalogue-test";

/**
 * Test My Catalogue's address bar, "Flow" (owner's pick from mockups, 5 Nov 2026): one rounded bar with
 * the store's address, the category and the button, its border the Signal gradient flowing round
 * (`flow-bar` in globals.css).
 *
 * One address stays plain text. More pages go into the same field, pasted (one or many, split on spaces,
 * commas or new lines) or typed (Space or a comma starts the next; with tags, Enter adds), and from two
 * pages on each is a tag (`page-tag`) with an x. The live form's rules hold: up to 20 pages, all on the
 * first page's store, and the same page only once. A key hint tells a typist what Space or Enter does,
 * after a pause so it does not flicker on half an address.
 */

const MAX = 20;
const SEP = /[\s,;]+/;

const bare = (v: string) => v.trim().replace(/^https?:\/\//i, "");

/** A full address: a host with a top-level domain, not a word half typed. */
export const isAddress = (v: string) =>
  /\.[a-z][a-z0-9-]+$/i.test(domainOf(v) ?? "");

/** The same page: https://, www., a trailing slash, a #section and the case of the host do not count. */
export function pageKey(v: string) {
  try {
    const u = new URL(`https://${bare(v)}`);
    return `${u.hostname.replace(/^www\./, "")}${u.pathname.replace(/\/+$/, "")}${u.search}`;
  } catch {
    return bare(v);
  }
}

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface Ghost {
  ch: string;
  style: CSSProperties;
}

export function AddressBar({
  t,
  initial,
  category,
  categories,
  locale,
  onCategory,
  onPages,
  leaving,
  children,
}: {
  t: (k: string, vars?: Record<string, string | number>) => string;
  /** `?url=` from a link; it arrives after the static render, so it is read until someone types. */
  initial: string;
  category: string;
  /** What the service can test today (its config), sorted here by name in the page's language. */
  categories: string[];
  locale: string;
  onCategory: (c: string) => void;
  /** The pages to test, and whether they can be sent as they are. */
  onPages: (pages: string[], ok: boolean) => void;
  /** The test is starting: the pages leave the bar. */
  leaving: boolean;
  /** The submit button, at the end of the bar. */
  children: ReactNode;
}) {
  const [typed, setTyped] = useState<string | null>(null);
  const text = typed ?? initial;
  const [tags, setTags] = useState<string[]>([]);
  const [delays, setDelays] = useState<Record<string, number>>({});
  const [out, setOut] = useState<string[]>([]);
  const [repeat, setRepeat] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [paused, setPaused] = useState(true);
  const [focused, setFocused] = useState(false);
  const [example, setExample] = useState(0);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const input = useRef<HTMLInputElement>(null);
  // The latest tags and text, for a removal that finishes after its shrink.
  const latest = useRef({ tags, text });
  useEffect(() => {
    latest.current = { tags, text };
  });
  const timers = useRef<Record<string, number>>({});

  const examples = t("urlExamples").split("|");
  const domain = domainOf(tags[0] ?? text);
  const typedPage = isAddress(text) ? bare(text) : "";
  const isRepeat =
    !!typedPage && tags.some((p) => pageKey(p) === pageKey(typedPage));
  const pages = [...tags, ...(typedPage && !isRepeat ? [typedPage] : [])];
  const mixed = !!domain && pages.some((p) => domainOf(p) !== domain);
  // Text in the field that is not an address would be dropped, so the button waits for it.
  const junk = !!text.trim() && !typedPage;
  const ok = !!domain && pages.length > 0 && !mixed && !junk;

  useEffect(() => onPages(pages, ok), [pages.join(" "), ok]); // eslint-disable-line react-hooks/exhaustive-deps

  // Examples slide up through the empty field, one after another.
  useEffect(() => {
    if (text || tags.length || reduced()) return;
    const id = window.setInterval(() => {
      setPhase("out");
      window.setTimeout(() => {
        setExample((i) => i + 1);
        setPhase("in");
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setPhase("idle")),
        );
      }, 300);
    }, 2600);
    return () => window.clearInterval(id);
  }, [text, tags.length]);

  const later = (key: string, fn: () => void, ms: number) => {
    window.clearTimeout(timers.current[key]);
    timers.current[key] = window.setTimeout(fn, ms);
  };
  const say = (s: string) => {
    setNote(s);
    later("note", () => setNote(""), 2600);
  };

  /** Add pages as tags: repeats are named, not added, and a lone page left over goes back to text. */
  const commit = (list: string[], textAfter: string) => {
    const seen = new Map(tags.map((p) => [pageKey(p), p]));
    const add: string[] = [];
    const repeats: string[] = [];
    for (const p of list.map(bare).filter(isAddress)) {
      const k = pageKey(p);
      if (seen.has(k)) repeats.push(seen.get(k)!);
      else {
        seen.set(k, p);
        add.push(p);
      }
    }
    add.splice(MAX - tags.length);
    const next = [...tags, ...add];
    setDelays((d) => ({
      ...d,
      ...Object.fromEntries(add.map((p, i) => [pageKey(p), i * 45])),
    }));
    if (repeats.length) {
      setRepeat(repeats.map(pageKey));
      later("repeat", () => setRepeat([]), 700);
      say(
        repeats.length === 1
          ? t("repeatOne", { url: repeats[0]! })
          : t("repeatMany", { n: repeats.length }),
      );
      if (next.length === 1 && !textAfter) {
        setTags([]);
        setTyped(next[0]!);
        return;
      }
    }
    setTags(next);
    setTyped(textAfter);
  };

  const change = (value: string) => {
    const v = value.replace(/^\s*https?:\/\//i, "");
    setPaused(false);
    later("pause", () => setPaused(true), 600);
    const parts = v.split(SEP);
    if (parts.length < 2) return setTyped(v);
    const last = parts.pop()!;
    const left = parts.filter((p) => p && !isAddress(p));
    commit(parts.filter(isAddress), [...left, last].filter(Boolean).join(" "));
  };

  const paste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").split(SEP).filter(Boolean);
    e.preventDefault();
    const before = text.trim();
    // One address into an empty field stays plain text, like typing it.
    if (!before && !tags.length && pasted.length === 1)
      return setTyped(bare(pasted[0]!));
    commit([...(before ? [before] : []), ...pasted], "");
  };

  const key = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "," || (e.key === "Enter" && tags.length)) && text.trim()) {
      e.preventDefault();
      if (typedPage) commit([typedPage], "");
    } else if (e.key === "Backspace" && !text && tags.length) {
      e.preventDefault();
      setTyped(tags.at(-1)!);
      setTags(tags.slice(0, -1));
    }
  };

  const remove = (page: string) => {
    const k = pageKey(page);
    const done = () => {
      setOut((o) => o.filter((x) => x !== k));
      const next = latest.current.tags.filter((p) => pageKey(p) !== k);
      // One page left: back to plain text.
      if (next.length === 1 && !latest.current.text) {
        setTags([]);
        setTyped(next[0]!);
      } else setTags(next);
      input.current?.focus();
    };
    if (reduced()) return done();
    setOut((o) => [...o, k]);
    later(`out-${k}`, done, 170);
  };

  // The pages leave the bar as the test starts: tags shrink away, typed letters scatter. Each letter's
  // drift comes from its position, so the scatter is worked out in render, the same every time.
  const ghost: Ghost[] =
    leaving && !reduced()
      ? [...text].map((ch, i) => ({
          ch,
          style: {
            "--dx": `${((i * 37) % 17) - 8}px`,
            "--r": `${((i * 53) % 25) - 12}deg`,
            "--delay": `${(i * 29) % 120}ms`,
          } as CSSProperties,
        }))
      : [];

  const hint = isRepeat
    ? t("already")
    : tags.length && typedPage && domainOf(typedPage) !== domain
      ? t("otherStore")
      : null;
  const showHint = !!typedPage && paused && focused && tags.length < MAX;

  return (
    <div>
      <label
        htmlFor="test-url"
        className="mb-2 ml-5 block text-sm font-medium text-ink"
      >
        {t("urlLabel")}
      </label>
      <div className="flow-bar flex flex-wrap items-center gap-1.5 rounded-[2rem] p-2 pl-5 max-md:rounded-3xl md:flex-nowrap md:py-[7px] md:pr-[7px]">
        {/* The address area: tags, then the field, wrapping onto more lines as pages are added. */}
        <div
          className="flex min-w-0 flex-1 basis-full cursor-text flex-wrap items-center gap-1.5 self-stretch py-1 md:basis-0"
          onClick={(e) =>
            e.target === e.currentTarget && input.current?.focus()
          }
        >
          {tags.map((p, i) => {
            const k = pageKey(p);
            return (
              <span
                key={k}
                className="page-tag"
                data-state={
                  leaving
                    ? "out"
                    : out.includes(k)
                      ? "out"
                      : repeat.includes(k)
                        ? "repeat"
                        : undefined
                }
                data-mixed={domainOf(p) !== domain || undefined}
                style={
                  {
                    "--tag-delay": `${leaving ? i * 40 : (delays[k] ?? 0)}ms`,
                  } as CSSProperties
                }
              >
                <span
                  title={p}
                  className={`truncate font-mono md:max-w-72 ${domainOf(p) !== domain ? "text-critical" : ""}`}
                >
                  {p}
                </span>
                <button
                  type="button"
                  onClick={() => remove(p)}
                  aria-label={t("removePage", { url: p })}
                  className="grid size-7 place-items-center rounded-full text-muted transition-colors duration-200 ease-out-soft hover:bg-primary/15 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
                >
                  <X className="size-3.5" aria-hidden />
                </button>
              </span>
            );
          })}
          {!tags.length && (
            <span
              aria-hidden
              className={`font-mono text-base transition-colors duration-200 ease-out-soft ${focused ? "text-primary" : "text-muted"}`}
            >
              https://
            </span>
          )}
          <div className="relative flex min-h-10 min-w-30 flex-[1_1_11rem] self-stretch">
            <input
              ref={input}
              id="test-url"
              className={`min-w-0 flex-1 bg-transparent font-mono! text-base outline-none placeholder:text-muted ${ghost.length ? "text-transparent" : "text-ink"}`}
              inputMode="url"
              autoComplete="url"
              value={text}
              placeholder={
                tags.length && tags.length < MAX ? `${domain}/...` : undefined
              }
              readOnly={tags.length >= MAX}
              onChange={(e) => change(e.target.value)}
              onPaste={paste}
              onKeyDown={key}
              onFocus={() => {
                setFocused(true);
                setPaused(true);
              }}
              onBlur={() => setFocused(false)}
            />
            {!text && !tags.length && (
              <span
                aria-hidden
                className={`pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 truncate font-mono text-base text-muted transition-[opacity,translate] duration-300 ease-out-soft ${phase === "out" ? "-translate-y-[calc(50%+10px)] opacity-0" : phase === "in" ? "translate-y-[calc(-50%+10px)] opacity-0 transition-none" : ""}`}
              >
                {examples[example % examples.length]}
              </span>
            )}
            {ghost.length > 0 && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center font-mono text-base whitespace-pre"
              >
                {ghost.map((g, i) => (
                  <span key={i} className="vanish-char" style={g.style}>
                    {g.ch}
                  </span>
                ))}
              </span>
            )}
            {/* The key hint, for people who type rather than paste; not on phones, where it would not fit. */}
            {showHint && (
              <span
                aria-hidden
                className={`pointer-events-none absolute top-1/2 right-1 hidden -translate-y-1/2 items-center gap-1.5 bg-card pl-2 text-[0.8125rem] whitespace-nowrap md:flex ${hint ? "text-critical" : "text-muted"}`}
              >
                {hint ?? (
                  <>
                    <kbd className="rounded-[5px] border border-b-2 border-line bg-surface-0 px-1.5 font-mono text-[0.6875rem] font-medium text-ink">
                      {tags.length ? "Enter" : "Space"}
                    </kbd>
                    {tags.length ? t("keyEnter") : t("keySpace")}
                  </>
                )}
              </span>
            )}
          </div>
        </div>
        <span
          aria-hidden
          className="mx-0.5 my-2.5 hidden w-px self-stretch bg-line md:block"
        />
        <div className="flex items-center gap-0.5 pl-1 md:pl-2">
          <label
            htmlFor="test-category"
            className="cursor-pointer text-[0.8125rem] text-muted"
          >
            {t("category")}
          </label>
          {/* No ring and no blue label (owner, 5 Nov 2026): the bar's light shows focus is in the bar. */}
          <select
            id="test-category"
            className="min-h-11 cursor-pointer rounded-full bg-transparent pr-2 pl-1 text-[0.9375rem] text-ink outline-none"
            value={category}
            onChange={(e) => onCategory(e.target.value)}
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
        </div>
        <div className="ml-auto md:ml-0">{children}</div>
      </div>
      <p
        aria-live="polite"
        className="mt-2.5 ml-5 min-h-[1.375rem] text-sm text-muted"
      >
        {note ? (
          note
        ) : !domain || !pages.length ? null : mixed ? (
          <span className="text-critical">{t("sameDomain", { domain })}</span>
        ) : (
          <>
            <Check />
            {/* One address: spider finds the store's product pages and reads a sample; several:
                exactly those pages (spider `discover`). The store sits wherever the sentence puts it. */}
            {(pages.length > 1
              ? t("readMany", { n: pages.length })
              : t("readOne")
            )
              .split("{domain}")
              .map((part, i) => (
                <span key={i}>
                  {i > 0 && (
                    <b className="font-mono font-medium text-ink">{domain}</b>
                  )}
                  {part}
                </span>
              ))}
            {pages.length >= MAX && ` · ${t("maxPages")}`}
          </>
        )}
      </p>
    </div>
  );
}

function Check() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="mr-1.5 inline size-4 -translate-y-px fill-none stroke-success stroke-[2.4]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
