/**
 * Converted from `footer.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { asset } from "@/lib/cdn";
import { SOCIAL } from "@/lib/social";
import { COMPANY_NAME } from "@/lib/site";
import { designedHref, designedText } from "../t";
import Image from "next/image";

import Link from "next/link";

/** Three link columns of five rows each, so they line up row for row; the header's grouping. */
const COLUMNS: Array<{ heading: string; links: Array<[string, string]> }> = [
  {
    heading: "measureHeading",
    links: [
      ["/en/product/decision-audit", "2"],
      ["/en/product/decision-verification", "3"],
      ["/en/product/return-verification", "returnName"],
      ["/en/product/visual-evidence", "visualName"],
      ["/en/product/promotion-audit", "promotionName"],
      ["/en/product/decision-monitor", "4"],
    ],
  },
  {
    heading: "liveHeading",
    links: [
      ["/en/product/decision-api", "apiName"],
      ["/en/product/search", "searchName"],
      ["/en/product/recommendations", "recsName"],
      ["/en/product/pages", "pagesName"],
      ["/en/product/merchandising-studio", "studioName"],
    ],
  },
  {
    heading: "6",
    links: [
      ["/en/about", "7"],
      ["/en/opensource", "opensourceLink"],
      ["/en/pricing", "5"],
      ["/en/contact", "8"],
      ["/en/careers", "9"],
    ],
  },
];

const SOCIALS = [
  { name: "LinkedIn", href: SOCIAL.linkedin, icon: "i-linkedin" },
  { name: "Facebook", href: SOCIAL.facebook, icon: "i-facebook" },
  { name: "GitHub", href: SOCIAL.github, icon: "i-github" },
].filter((s): s is { name: string; href: string; icon: string } =>
  Boolean(s.href),
);

export function DesignedFooter() {
  const t = designedText("shell.designed-footer");
  return (
    <footer className="border-t border-line bg-card">
      <div className="frame py-12 sm:py-20 lg:py-24">
        {/* From `sm` the four columns sit centred in their cells (owner, 28 Oct 2026). The page-link
            columns start at the top; the company column stays centred against them (owner, 5 Nov
            2026). On a phone they keep the left-aligned compact layout. */}
        <div className="grid gap-8 sm:grid-cols-2 sm:items-start sm:gap-14 sm:text-center lg:grid-cols-4 lg:gap-10">
          <div className="sm:self-center">
            <Link
              href={designedHref("/en")}
              aria-label="Pulse home"
              className="hit-area inline-flex"
            >
              <Image
                src={asset("brand/logo-v2.webp")}
                alt="Pulse"
                width={84}
                height={28}
                loading="lazy"
                className="h-7 w-auto theme-dark:hidden"
              />
              <Image
                src={asset("brand/logo-white-v2.webp")}
                alt="Pulse"
                width={84}
                height={28}
                loading="lazy"
                className="hidden h-7 w-auto theme-dark:inline"
                aria-hidden="true"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-pretty text-muted sm:mx-auto">
              {t("tagline")}
            </p>
            {/* Contact sits under the logo (2026-10-26): the brand column carries who we are and
                how to reach us, so the three link columns can line up row for row. */}
            {/* On a phone, the email and the social icons share one row (owner's version 2, 27 Oct
                2026); from `sm` they stack as before. */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 sm:mt-6 sm:block">
              <div className="flex gap-3 sm:justify-center">
                {SOCIALS.map((s) => (
                  <a
                    key={s.icon}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Pulse on ${s.name} (opens in a new tab)`}
                    className="grid size-11 place-items-center rounded-lg border border-line text-muted transition-colors duration-200 ease-out-soft hover:border-primary hover:text-primary"
                  >
                    <svg className="size-5" aria-hidden="true">
                      <use href={`#${s.icon}`} />
                    </svg>
                  </a>
                ))}
              </div>
              <a
                href="mailto:getintouch@thepulseapi.com"
                className="inline-flex min-h-11 items-center text-sm wrap-anywhere text-muted transition-colors duration-200 ease-out-soft hover:text-ink max-sm:order-first sm:mt-3"
              >
                {t("11")}
              </a>
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h2 className="text-nav font-semibold">{t(col.heading)}</h2>
              <ul className="mt-2 grid grid-cols-2 gap-x-4 text-sm text-muted sm:mt-6 sm:block sm:space-y-5">
                {col.links.map(([href, key]) => (
                  <li key={href}>
                    <Link
                      href={designedHref(href)}
                      className="inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-ink sm:-my-2.5"
                    >
                      {t(key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="frame flex flex-col gap-3 py-4 text-data text-ink sm:flex-row sm:items-center sm:justify-between">
          {/* Phones (owner, 4 Nov 2026): the copyright under the links, small capitals, both centred, and the links
              at 10px so all four sit on one line, which at 375px only 10px allows. */}
          <p className="max-sm:order-last max-sm:text-center max-sm:text-[10px] max-sm:uppercase">
            {t("12")
              .replace("{year}", String(new Date().getFullYear()))
              .replace("{company}", COMPANY_NAME)}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 max-sm:justify-between max-sm:gap-x-2 max-sm:text-[10px] sm:gap-x-7 sm:gap-y-5">
            <li>
              <Link
                href={designedHref("/en/privacy")}
                className="-my-2.5 inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-primary"
              >
                {t("13")}
              </Link>
            </li>
            <li>
              <Link
                href={designedHref("/en/terms")}
                className="-my-2.5 inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-primary"
              >
                {t("14")}
              </Link>
            </li>
            <li>
              <Link
                href={designedHref("/en/cookies")}
                className="-my-2.5 inline-flex min-h-11 items-center transition-colors duration-200 ease-out-soft hover:text-primary"
              >
                {t("15")}
              </Link>
            </li>
            <li>
              <Link
                href={designedHref("/en/gdpr")}
                className="-my-2.5 inline-flex min-h-11 min-w-11 items-center sm:justify-center transition-colors duration-200 ease-out-soft hover:text-primary"
              >
                {t("16")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
