"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import type { CategoryGroup } from "@/lib/catalogue-test";

/**
 * The category in the address bar, typed with suggestions (owner, 5 Nov 2026). A native <select> drew
 * the system's own list, fine on macOS and poor on Windows, so the list is the site's own: the same on
 * every system. Accents and case do not count, so "may giat" finds "Máy giặt". Arrows move, Enter picks,
 * Esc closes; leaving the field keeps an exact match and otherwise the category it had. With the
 * service's taxonomy the list is grouped by top-level category, each with "All of" first (develop #8).
 */

/** One character at a time, so a match's position in the folded label is its position in the label. */
const foldChar = (ch: string) =>
  ch
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/đ/gi, "d")
    .toLowerCase() || ch;
const fold = (s: string) => [...s].map(foldChar).join("");

interface Option {
  value: string;
  text: string;
  /** The top-level category it sits under, when the service sends the taxonomy. */
  group?: string;
}

export function CategoryField({
  t,
  value,
  categories,
  groups,
  labels,
  locale,
  onChange,
}: {
  t: (k: string, vars?: Record<string, string | number>) => string;
  /** "" is "Detect for me". */
  value: string;
  categories: string[];
  /** The taxonomy's top-level categories; a group's own key tests the whole group. */
  groups: CategoryGroup[];
  /** Labels from the service, both languages; a key without one falls back to the messages. */
  labels: Record<string, { en: string; vi: string }>;
  locale: string;
  onChange: (c: string) => void;
}) {
  // null: not typing, so the field shows the chosen category and the list shows every one.
  const [query, setQuery] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const lang = locale === "vi" ? "vi" : "en";
  const label = (c: string) => labels[c]?.[lang] ?? t(`cat_${c}`);
  const byName = (a: string, b: string) => a.localeCompare(b, locale);
  // Every choice in list order: the taxonomy's groups, each with "All of" first, else the flat list.
  const all: Option[] = groups.length
    ? [...groups]
        .sort((a, b) => byName(a[lang], b[lang]))
        .flatMap((g) => [
          {
            value: g.key,
            text: t("catAll", { group: g[lang] }),
            group: g[lang],
          },
          ...g.categories
            .map((c) => ({ value: c, text: label(c), group: g[lang] }))
            .sort((a, b) => byName(a.text, b.text)),
        ])
    : categories
        .map((c) => ({ value: c, text: label(c) }))
        .sort((a, b) => byName(a.text, b.text));
  const auto: Option = { value: "", text: t("catAuto") };
  const shown = (v: string) =>
    v ? (all.find((o) => o.value === v)?.text ?? label(v)) : "";
  const q = fold(query?.trim() ?? "");
  // A typed word: names that start with it first, then names (or their group) that contain it.
  const options = q
    ? all
        .filter(
          (o) => fold(o.text).includes(q) || fold(o.group ?? "").includes(q),
        )
        .sort(
          (a, b) =>
            Number(!fold(a.text).startsWith(q)) -
            Number(!fold(b.text).startsWith(q)),
        )
    : [auto, ...all];

  useEffect(() => {
    if (open)
      document
        .getElementById(`test-category-${active}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const show = () => {
    setActive(
      Math.max(
        0,
        options.findIndex((o) => o.value === value),
      ),
    );
    setOpen(true);
  };
  const pick = (c: string) => {
    onChange(c);
    setQuery(null);
    setOpen(false);
  };
  const leave = () => {
    const exact = q && all.find((o) => fold(o.text) === q);
    if (exact) onChange(exact.value);
    else if (query !== null && !q) onChange("");
    setQuery(null);
    setOpen(false);
  };

  const key = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return show();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => Math.min(options.length - 1, Math.max(0, i + step)));
    } else if (e.key === "Enter" && open) {
      // Picks rather than sending the form; with the list closed, Enter starts the test.
      e.preventDefault();
      if (options[active]) pick(options[active]!.value);
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      setQuery(null);
      setOpen(false);
    }
  };

  /** The typed part in bold, so a long list shows why each name is there. */
  const named = (text: string) => {
    const at = q ? fold(text).indexOf(q) : -1;
    if (at < 0) return text;
    return (
      <>
        {text.slice(0, at)}
        <b className="font-semibold">{text.slice(at, at + q.length)}</b>
        {text.slice(at + q.length)}
      </>
    );
  };

  return (
    <div className="relative flex items-center">
      <input
        ref={input}
        id="test-category"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls="test-category-list"
        aria-activedescendant={
          open && options.length ? `test-category-${active}` : undefined
        }
        autoComplete="off"
        spellCheck={false}
        className="min-h-11 w-[10.5rem] min-w-0 bg-transparent pl-1 text-[0.9375rem] text-ink outline-none placeholder:text-ink focus:placeholder:text-muted max-md:w-[9.5rem]"
        value={query ?? shown(value)}
        placeholder={t("catAuto")}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={(e) => {
          e.currentTarget.select();
          show();
        }}
        onClick={() => !open && show()}
        onBlur={leave}
        onKeyDown={key}
      />
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          input.current?.focus();
          if (open) setOpen(false);
          else show();
        }}
        className="grid size-8 place-items-center rounded-full text-muted transition-colors duration-200 ease-out-soft hover:text-ink"
      >
        <ChevronDown
          className={`size-4 transition-transform duration-200 ease-out-soft ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          ref={list}
          id="test-category-list"
          role="listbox"
          aria-label={t("category")}
          // Keeps focus in the field while a name is clicked.
          onMouseDown={(e) => e.preventDefault()}
          className="absolute top-full left-0 z-30 mt-3 max-h-80 w-72 max-md:w-64 overflow-auto overscroll-contain rounded-2xl border border-line bg-card p-1.5 shadow-[var(--shadow-lg)]"
        >
          {options.length ? (
            options.map((o, i) => (
              <Fragment key={`${o.group ?? ""}/${o.value || "auto"}`}>
                {/* Each group's name once over its list; while typing, beside each match instead. */}
                {!q && o.group && o.group !== options[i - 1]?.group && (
                  <li
                    role="presentation"
                    className="px-3 pt-3 pb-1 text-xs font-semibold text-muted"
                  >
                    {o.group}
                  </li>
                )}
                <li
                  id={`test-category-${i}`}
                  role="option"
                  aria-selected={o.value === value}
                  onMouseMove={() => i !== active && setActive(i)}
                  onClick={() => pick(o.value)}
                  className={`flex min-h-10 cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-[0.9375rem] ${i === active ? "bg-surface-1" : ""} ${o.value === value ? "font-medium text-primary" : "text-ink"}`}
                >
                  <span className="min-w-0">
                    {named(o.text)}
                    {q && o.group && (
                      <span className="ml-1.5 text-xs text-muted">
                        {o.group}
                      </span>
                    )}
                  </span>
                  {o.value === value && (
                    <Check aria-hidden className="size-4 shrink-0" />
                  )}
                </li>
              </Fragment>
            ))
          ) : (
            <li role="presentation" className="px-3 py-2.5 text-sm text-muted">
              {t("catNone", { q: query?.trim() ?? "" })}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
