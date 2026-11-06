"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { CategoryGroup } from "@/lib/catalogue-test";

/**
 * The category in the address bar, typed with suggestions (owner, 5 Nov 2026). A native <select> drew
 * the system's own list, fine on macOS and poor on Windows, so the list is the site's own: the same on
 * every system. Accents and case do not count, so "may giat" finds "Máy giặt".
 *
 * With the service's taxonomy (41 groups, ~740 categories, develop #8) the list has two levels (the
 * designer's option B, owner's pick, 6 Nov 2026): the groups A–Z with their counts, then a group's
 * own "All of" and its categories, a draft checklist tagged "Draft". Typing searches every level.
 * Arrows move, Enter or → opens a group, ← or the back row returns, Esc closes; leaving the field
 * keeps an exact match and otherwise the category it had.
 */

/** One character at a time, so a match's position in the folded label is its position in the label. */
const foldChar = (ch: string) =>
  ch
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/đ/gi, "d")
    .toLowerCase() || ch;
const fold = (s: string) => [...s].map(foldChar).join("");

interface Choice {
  kind: "choice";
  value: string;
  text: string;
  group?: string;
  /** On a group's "All of" row: how many categories it covers. */
  count?: number;
  draft?: boolean;
}
/** A row in the list: a choice, a group to open, or the way back. */
type Row =
  | Choice
  | { kind: "group"; key: string; text: string; count: number }
  | { kind: "back" };

export function CategoryField({
  t,
  value,
  categories,
  groups,
  labels,
  draft,
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
  /** Keys whose checklist is still a first draft. */
  draft: string[];
  locale: string;
  onChange: (c: string) => void;
}) {
  // null: not typing, so the field shows the chosen category and the list shows its level.
  const [query, setQuery] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  // The group opened, or null for the list of groups.
  const [level, setLevel] = useState<string | null>(null);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLTextAreaElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  // How far left the panel moves so it stays on a narrow screen (16px from the edge).
  const [shift, setShift] = useState(0);

  const lang = locale === "vi" ? "vi" : "en";
  const label = (c: string) => labels[c]?.[lang] ?? t(`cat_${c}`);
  const byText = (a: { text: string }, b: { text: string }) =>
    a.text.localeCompare(b.text, locale);
  const drafts = new Set(draft);
  const sortedGroups = [...groups].sort((a, b) =>
    a[lang].localeCompare(b[lang], locale),
  );
  // A group's rows: "All of" first, then its categories A–Z.
  const inGroup = (g: CategoryGroup): Choice[] => [
    {
      kind: "choice",
      value: g.key,
      text: t("catAll", { group: g[lang] }),
      group: g[lang],
      count: g.categories.length,
    },
    ...g.categories
      .map(
        (c): Choice => ({
          kind: "choice",
          value: c,
          text: label(c),
          group: g[lang],
          draft: drafts.has(c),
        }),
      )
      .sort(byText),
  ];
  // Every choice, for search and for the field's text.
  const choices: Choice[] = groups.length
    ? sortedGroups.flatMap(inGroup)
    : categories
        .map(
          (c): Choice => ({
            kind: "choice",
            value: c,
            text: label(c),
            draft: drafts.has(c),
          }),
        )
        .sort(byText);
  const auto: Choice = { kind: "choice", value: "", text: t("catAuto") };
  const shown = (v: string) =>
    v ? (choices.find((o) => o.value === v)?.text ?? label(v)) : "";
  const groupOf = (v: string) =>
    sortedGroups.find((g) => g.key === v || g.categories.includes(v));
  const groupRows: Row[] = sortedGroups.map((g) => ({
    kind: "group",
    key: g.key,
    text: g[lang],
    count: g.categories.length,
  }));
  const levelRows = (key: string | null): Row[] => {
    const g = sortedGroups.find((x) => x.key === key);
    if (g) return [{ kind: "back" }, ...inGroup(g)];
    return groups.length ? [auto, ...groupRows] : [auto, ...choices];
  };

  const q = fold(query?.trim() ?? "");
  // A typed word: names that start with it first, then names (or their group) that contain it.
  const rows: Row[] = q
    ? choices
        .filter(
          (o) => fold(o.text).includes(q) || fold(o.group ?? "").includes(q),
        )
        .sort(
          (a, b) =>
            Number(!fold(a.text).startsWith(q)) -
            Number(!fold(b.text).startsWith(q)),
        )
    : levelRows(level);

  // The field grows to its text, so a long category shows in full.
  const fieldText = query ?? shown(value);
  useLayoutEffect(() => {
    const el = input.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [fieldText]);
  useEffect(() => {
    if (list.current) list.current.scrollTop = 0;
  }, [level]);
  useEffect(() => {
    if (open)
      document
        .getElementById(`test-category-${active}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [open, active, level]);

  const indexIn = (list: Row[], hit: (r: Row) => boolean) =>
    Math.max(0, list.findIndex(hit));
  /** Opens on the chosen category's group, its row active. */
  const show = () => {
    const g = value ? (groupOf(value)?.key ?? null) : null;
    setLevel(g);
    setActive(
      indexIn(levelRows(g), (r) => r.kind === "choice" && r.value === value),
    );
    const left = box.current?.getBoundingClientRect().left ?? 0;
    setShift(
      Math.min(
        0,
        window.innerWidth - 16 - left - Math.min(320, window.innerWidth - 32),
      ),
    );
    setOpen(true);
  };
  /** Into a group, on its "All of"; back out, on the group just left. */
  const drill = (key: string | null) => {
    setActive(
      key
        ? 1
        : indexIn(
            levelRows(null),
            (r) => r.kind === "group" && r.key === level,
          ),
    );
    setLevel(key);
  };
  const pick = (v: string) => {
    onChange(v);
    setQuery(null);
    setOpen(false);
  };
  const act = (r: Row | undefined) => {
    if (!r) return;
    if (r.kind === "choice") pick(r.value);
    else if (r.kind === "group") drill(r.key);
    else drill(null);
  };
  const leave = () => {
    const exact = q && choices.find((o) => fold(o.text) === q);
    if (exact) onChange(exact.value);
    else if (query !== null && !q) onChange("");
    setQuery(null);
    setOpen(false);
  };

  const key = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return show();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => Math.min(rows.length - 1, Math.max(0, i + step)));
    } else if (e.key === "Enter") {
      // Picks rather than sending the form; with the list closed, Enter starts the test.
      e.preventDefault();
      if (open) act(rows[active]);
      else e.currentTarget.form?.requestSubmit();
    } else if (
      open &&
      !q &&
      e.key === "ArrowRight" &&
      rows[active]?.kind === "group"
    ) {
      e.preventDefault();
      act(rows[active]);
    } else if (open && !q && e.key === "ArrowLeft" && level) {
      e.preventDefault();
      drill(null);
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
  const rowClass = (i: number) =>
    `flex min-h-10 w-full scroll-mt-12 cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-[0.9375rem] ${i === active ? "bg-surface-1" : ""}`;

  return (
    <div ref={box} className="relative flex items-center">
      {/* A long category wraps onto the next line rather than being cut (owner, 6 Nov 2026). */}
      <textarea
        ref={input}
        id="test-category"
        rows={1}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls="test-category-list"
        aria-activedescendant={
          open && rows.length ? `test-category-${active}` : undefined
        }
        autoComplete="off"
        spellCheck={false}
        className="w-[10.5rem] min-w-0 resize-none overflow-hidden bg-transparent py-2.5 pl-1 text-[0.9375rem] leading-6 text-ink outline-none placeholder:text-ink focus:placeholder:text-muted max-md:w-[9.5rem]"
        value={fieldText}
        placeholder={t("catAuto")}
        onChange={(e) => {
          setQuery(e.target.value.replace(/\n/g, " "));
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
          style={{ left: shift }}
          role="listbox"
          aria-label={t("category")}
          // Keeps focus in the field while a row is clicked.
          onMouseDown={(e) => e.preventDefault()}
          className="absolute top-full left-0 z-30 mt-3 max-h-[26rem] w-80 overflow-auto overscroll-contain rounded-2xl border border-line bg-card p-1.5 shadow-[var(--shadow-lg)] max-md:w-[min(20rem,calc(100vw-2rem))]"
        >
          {rows.length ? (
            rows.map((r, i) => {
              const common = {
                id: `test-category-${i}`,
                onMouseMove: () => i !== active && setActive(i),
                onClick: () => act(r),
              };
              if (r.kind === "back")
                return (
                  <li
                    key="back"
                    role="option"
                    aria-selected={false}
                    {...common}
                    className={`${rowClass(i)} sticky -top-1.5 z-10 mb-1 rounded-b-none border-b border-line font-semibold text-ink ${i === active ? "" : "bg-card"}`}
                  >
                    <ChevronLeft aria-hidden className="size-4 text-muted" />
                    {t("catBack")}
                  </li>
                );
              if (r.kind === "group")
                return (
                  <li
                    key={`g/${r.key}`}
                    role="option"
                    aria-selected={false}
                    {...common}
                    className={`${rowClass(i)} text-ink`}
                  >
                    <span className="min-w-0 flex-1">{r.text}</span>
                    <span className="text-[0.8125rem] text-muted">
                      {r.count}
                    </span>
                    <ChevronRight aria-hidden className="size-4 text-muted" />
                  </li>
                );
              const on = r.value === value;
              return (
                <li
                  key={`${r.group ?? ""}/${r.value || "auto"}`}
                  role="option"
                  aria-selected={on}
                  {...common}
                  className={`${rowClass(i)} ${on ? "text-primary" : "text-ink"} ${on || r.count !== undefined || !r.value ? "font-medium" : ""}`}
                >
                  <span className="min-w-0 flex-1">
                    {named(r.text)}
                    {/* While typing, each match's group on a second line. */}
                    {q && r.group && (
                      <span className="block text-xs leading-snug font-normal text-muted">
                        {r.group}
                      </span>
                    )}
                  </span>
                  {r.draft && (
                    <span className="shrink-0 rounded-full border border-dashed border-line-control px-1.5 text-[0.6875rem] font-normal whitespace-nowrap text-muted">
                      {t("draftBadge")}
                    </span>
                  )}
                  {r.count !== undefined && (
                    <span className="text-[0.8125rem] font-normal text-muted">
                      {r.count}
                    </span>
                  )}
                  {on && <Check aria-hidden className="size-4 shrink-0" />}
                </li>
              );
            })
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
