import {
  ArrowRight,
  FileSpreadsheet,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

/**
 * A store whose protection stops spider gets a way forward, not a dead end (NLR U14, dev 2026-11-05:
 * "guide them clearly"). Three routes the merchant controls; Pulse never disguises its user agent or
 * rotates addresses to pass a block. The catalogue API route is not built yet (U13), so it says so.
 */

type T = (k: string) => string;

// ponytail: the user agent's name is spider's `fetch.userAgent` token; change both together.
const AGENT = "PulseCatalogueTest";

export function BlockedGuide({
  t,
  contactHref,
}: {
  t: T;
  contactHref: string;
}) {
  return (
    <section
      aria-labelledby="blocked-guide-title"
      className="mt-6 rounded-xl border border-line bg-card p-6 max-md:p-4"
    >
      <h3 id="blocked-guide-title" className="text-h3 text-balance">
        {t("blockedTitle")}
      </h3>
      <p className="mt-2 text-sm text-pretty text-muted">{t("blockedLede")}</p>
      <ol className="mt-5 grid gap-4 md:grid-cols-3">
        <li className="rounded-lg border border-primary-line bg-primary-tint p-4">
          <p className="flex items-center gap-2 font-medium text-ink">
            <ShieldCheck aria-hidden className="size-4 text-primary" />
            {t("blocked1Title")}
          </p>
          <ol className="mt-2 grid list-decimal gap-1.5 pl-5 text-sm text-pretty text-ink">
            <li>{t("blocked1Step1")}</li>
            <li>
              {t("blocked1Step2")}{" "}
              <code className="rounded bg-card px-1 font-mono text-xs">
                {AGENT}
              </code>
            </li>
            <li>{t("blocked1Step3")}</li>
            <li>
              {t("blocked1Step4")}{" "}
              <code className="rounded bg-card px-1 font-mono text-xs">
                User-agent: {AGENT}
                <br />
                Allow: /
              </code>
            </li>
            <li>{t("blocked1Step5")}</li>
          </ol>
          <a
            href={contactHref}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {t("blocked1Ask")} <ArrowRight aria-hidden className="size-3.5" />
          </a>
        </li>
        <li className="rounded-lg border border-line p-4">
          <p className="flex items-center gap-2 font-medium text-ink">
            <FileSpreadsheet aria-hidden className="size-4 text-primary" />
            {t("blocked2Title")}
          </p>
          <p className="mt-2 text-sm text-pretty text-ink">
            {t("blocked2Body")}
          </p>
          <a
            href={contactHref}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {t("blocked2Cta")} <ArrowRight aria-hidden className="size-3.5" />
          </a>
        </li>
        <li className="rounded-lg border border-dashed border-line-control p-4">
          <p className="flex items-center gap-2 font-medium text-ink">
            <KeyRound aria-hidden className="size-4 text-muted" />
            {t("blocked3Title")}
          </p>
          <p className="mt-2 text-sm text-pretty text-muted">
            {t("blocked3Body")}
          </p>
        </li>
      </ol>
      <p className="mt-4 text-xs text-pretty text-muted">{t("blockedNever")}</p>
    </section>
  );
}
