"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";

/**
 * The category in the address bar, typed with suggestions (owner, 5 Nov 2026). A native <select> drew
 * the system's own list, fine on macOS and poor on Windows, so the list is the site's own: the same on
 * every system. Accents and case do not count, so "may giat" finds "Máy giặt". Arrows move, Enter picks,
 * Esc closes; leaving the field keeps an exact match and otherwise the category it had.
 */

/** One character at a time, so a match's position in the folded label is its position in the label. */
const foldChar = (ch: string) =>
  ch
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/đ/gi, "d")
    .toLowerCase() || ch;
const fold = (s: string) => [...s].map(foldChar).join("");

export function CategoryField({
  t,
  value,
  categories,
  locale,
  onChange,
}: {
  t: (k: string, vars?: Record<string, string | number>) => string;
  /** "" is "Detect for me". */
  value: string;
  categories: string[];
  locale: string;
  onChange: (c: string) => void;
}) {
  // null: not typing, so the field shows the chosen category and the list shows every one.
  const [query, setQuery] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const label = (c: string) => (c ? t(`cat_${c}`) : t("catAuto"));
  const sorted = [...categories].sort((a, b) =>
    label(a).localeCompare(label(b), locale),
  );
  const q = fold(query?.trim() ?? "");
  // A typed word: names that start with it first, then names that contain it.
  const options = q
    ? sorted
        .filter((c) => fold(label(c)).includes(q))
        .sort(
          (a, b) =>
            Number(!fold(label(a)).startsWith(q)) -
            Number(!fold(label(b)).startsWith(q)),
        )
    : ["", ...sorted];

  useEffect(() => {
    if (open)
      list.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const show = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };
  const pick = (c: string) => {
    onChange(c);
    setQuery(null);
    setOpen(false);
  };
  const leave = () => {
    const exact = q && sorted.find((c) => fold(label(c)) === q);
    if (exact) onChange(exact);
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
      if (options[active] !== undefined) pick(options[active]!);
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      setQuery(null);
      setOpen(false);
    }
  };

  /** The typed part in bold, so a long list shows why each name is there. */
  const named = (c: string) => {
    const text = label(c);
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
        value={query ?? (value ? label(value) : "")}
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
          className="absolute top-full left-0 z-30 mt-3 max-h-72 w-64 overflow-auto overscroll-contain rounded-2xl border border-line bg-card p-1.5 shadow-[var(--shadow-lg)]"
        >
          {options.length ? (
            options.map((c, i) => (
              <li
                key={c || "auto"}
                id={`test-category-${i}`}
                role="option"
                aria-selected={c === value}
                onMouseMove={() => i !== active && setActive(i)}
                onClick={() => pick(c)}
                className={`flex min-h-10 cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-[0.9375rem] ${i === active ? "bg-surface-1" : ""} ${c === value ? "font-medium text-primary" : "text-ink"}`}
              >
                <span className="min-w-0">{named(c)}</span>
                {c === value && (
                  <Check aria-hidden className="size-4 shrink-0" />
                )}
              </li>
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
