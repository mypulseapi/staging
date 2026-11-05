import { useSyncExternalStore } from "react";
import { apiUrl } from "@/lib/site";

/**
 * Test My Catalogue through the gateway (spider, `/public/catalogue-tests*`). The gateway answers
 * `{ success, data }`, so everything is read from `data` (PEACOCK.md, "Anything peacock reads from
 * the gateway is inside `data`").
 */

export type RequirementResult =
  | "supported"
  | "partial"
  | "buried"
  | "insufficient";

export interface LiveEvent {
  type:
    | "status"
    | "discovered"
    | "inspecting"
    | "inspected"
    | "skipped"
    | "done"
    | "failed"
    | "blocked";
  at: number;
  status?: string;
  url?: string;
  title?: string;
  i?: number;
  of?: number;
  reason?: string;
  category?: string;
  discovered?: number;
  urls?: string[];
  schema?: boolean;
  facts?: {
    visible: number;
    buried: number;
    missing: number;
    conflicting: number;
  };
  reqs?: Record<string, RequirementResult>;
}

export interface FactEvidence {
  fact: string;
  state: string;
  value?: string;
  found?: string;
}

export interface Finding {
  kind: string;
  title: string;
  detail: string;
  affected: number;
  of: number;
  product: string;
  repair?: string;
  requirements?: string[];
  examples: {
    product: string;
    url: string;
    title: string;
    facts: FactEvidence[];
    result?: string;
  }[];
}

export interface Teaser {
  testedAt: string;
  products: number;
  discovered: number;
  tiles: {
    productsTested: number;
    requirementsTested: number;
    productsToFix: number;
    questionsAnswerable: number;
    questions: number;
  };
  requirements: {
    id: string;
    label: string;
    result: RequirementResult;
    counts: Record<RequirementResult, number>;
  }[];
  requests: { id: string; ask: string; canRecommend: number; of: number }[];
  byProduct: {
    product: string;
    fixes: number | null;
    products: number | null;
  }[];
  open: Finding | null;
  masked: { kind: string; product: string; affected: number; of: number }[];
  cannotSee: {
    filtersRead: boolean;
    unreadable: number;
    photosChecked: number;
  };
  stoppedAfter?: number;
}

export interface TestState {
  id: string;
  domain: string;
  status: string;
  category: string | null;
  progress: { done: number; of: number; skipped: number };
  ahead?: number;
  reason?: string;
  events: LiveEvent[];
  cursor: number;
  nextPollMs: number | null;
  teaser: Teaser | null;
}

export interface CategoryGroup {
  key: string;
  en: string;
  vi: string;
  categories: string[];
}

export interface TestConfig {
  enabled: boolean;
  maxUrls: number;
  categories: string[];
  /** The canonical taxonomy's top-level categories and the testable keys under each. */
  groups?: CategoryGroup[];
  /** A label per category key, in both languages. */
  labels?: Record<string, { en: string; vi: string }>;
  /** Keys whose checklist is still a draft: every result from one says so. */
  draft?: string[];
}

export class TestError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly details?: Record<string, string>,
  ) {
    super(message);
  }
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(apiUrl(`/public/catalogue-tests${path}`), init);
  } catch {
    throw new TestError("unavailable", 0);
  }
  const body = (await res.json().catch(() => ({}))) as {
    data?: T;
    error?: { message?: string; details?: Record<string, string> } | string;
    message?: string;
  };
  if (!res.ok) {
    const e = typeof body.error === "object" ? body.error : undefined;
    throw new TestError(
      e?.message ?? body.message ?? String(body.error ?? "error"),
      res.status,
      e?.details,
    );
  }
  return (body.data ?? body) as T;
}

export const testConfig = () => call<TestConfig>("/config");

export const testStats = () =>
  call<{
    storesTested: number;
    productsChecked: number;
    requirementsTested: number;
    gapsFound: number;
  }>("/stats");

export const startTest = (
  urls: string[],
  recaptchaToken: string,
  category?: string,
) =>
  call<{ id: string; status: string; reused: boolean }>("", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      urls,
      recaptchaToken,
      ...(category && { category }),
    }),
  });

export const pollTest = (id: string, after: number) =>
  call<TestState>(`/${encodeURIComponent(id)}?after=${after}`);

/** A store's domain as spider compares it: lower case, one leading `www.` dropped. */
export function domainOf(input: string): string | null {
  try {
    const u = new URL(
      /^https?:\/\//i.test(input.trim())
        ? input.trim()
        : `https://${input.trim()}`,
    );
    return (
      u.hostname
        .toLowerCase()
        .replace(/\.$/, "")
        .replace(/^www\./, "") || null
    );
  } catch {
    return null;
  }
}

/** The page's query string, read without an effect: empty during the static render. */
export function useSearch(): URLSearchParams {
  const search = useSyncExternalStore(
    () => () => {},
    () => window.location.search,
    () => "",
  );
  return new URLSearchParams(search);
}
