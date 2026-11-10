/**
 * Converted from `header.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import type { ReactNode } from "react";
import { asset } from "@/lib/cdn";
import { renderLocale } from "@/i18n/render-locale";
import { DesignedLocaleMenu } from "./designed-locale-switch";
import { DesignedThemeSwitch } from "./designed-theme-switch";
import { designedHref, designedText } from "../t";
import Image from "next/image";

import Link from "next/link";
import { SIGNIN_URL } from "@/lib/constants";

/**
 * The storefront products, added 2026-10-25: Pulse personalises, tracks the visit and ranks
 * search, and the menu listed only the catalogue tools. Third in the panel because the Decision
 * Audit is what is sold first; these act on a live storefront once there is a reason to.
 */
const STOREFRONT = [
  { href: "/en/product/decision-api", key: "api", icon: "i-terminal" },
  { href: "/en/product/search", key: "search", icon: "i-user-search" },
  { href: "/en/product/recommendations", key: "recs", icon: "i-sparkles" },
  { href: "/en/product/pages", key: "pages", icon: "i-file-text" },
  {
    href: "/en/product/merchandising-studio",
    key: "studio",
    icon: "i-chart-pie",
  },
];

// The Solutions panel (2026-10-26, was "Templates"): agents first, because a decision call AI agents
// use in any industry is the proposition now (ODIN/strategy/OPEN-SOURCE.md §0).
const AGENTS = [
  { href: "/en/agents/shopping-assistants", key: "agentShop", icon: "i-cart" },
  { href: "/en/agents/procurement", key: "agentProc", icon: "i-factory" },
  { href: "/en/agents/travel", key: "agentTravel", icon: "i-globe" },
  { href: "/en/agents/coding-agents", key: "agentCode", icon: "i-terminal" },
];
const INDUSTRIES = [
  { href: "/en/industries/ecommerce", name: "15", blurb: "16", icon: "i-cart" },
  { href: "/en/industries/fmcg", name: "17", blurb: "18", icon: "i-basket" },
  { href: "/en/industries/furniture", name: "20", blurb: "21", icon: "i-sofa" },
  {
    href: "/en/industries/cosmetics",
    name: "22",
    blurb: "23",
    icon: "i-sparkles",
  },
  { href: "/en/industries/technology", name: "25", blurb: "26", icon: "i-cpu" },
  {
    href: "/en/industries/distribution",
    name: "27",
    blurb: "28",
    icon: "i-factory",
  },
];
const GOALS = [
  {
    href: "/en/use-cases/promotions-that-pay",
    key: "goalPromo",
    icon: "i-chart-pie",
  },
  {
    href: "/en/use-cases/fixable-returns",
    key: "goalReturns",
    icon: "i-undo",
  },
  { href: "/en/use-cases/seo-aeo", key: "goalAeo", icon: "i-user-search" },
  {
    href: "/en/use-cases/time-to-market",
    key: "goalLaunch",
    icon: "i-trending-up",
  },
];

export function DesignedHeader() {
  const t = designedText("shell.designed-header");
  return (
    <header
      className="sticky top-0 z-50 border-b border-line bg-card font-display"
      data-nav
    >
      <div className="frame flex h-17 items-center justify-between gap-4 lg:gap-2 xl:gap-4">
        <Link
          href={designedHref("/en")}
          aria-label="Pulse home"
          className="hit-area shrink-0"
        >
          <Image
            src={asset("brand/logo-v2.webp")}
            alt="Pulse"
            width={84}
            height={28}
            className="h-7 w-auto theme-dark:hidden"
            priority
          />
          <Image
            src={asset("brand/logo-white-v2.webp")}
            alt="Pulse"
            width={84}
            height={28}
            className="hidden h-7 w-auto theme-dark:inline"
            aria-hidden="true"
          />
        </Link>

        {/*
              Desktop from `xl`, not `lg`.
              
              The row does not fit at 1024: measured 1068px in English and 1171px in Vietnamese,
              so every page scrolled sideways between 1024 and 1171, which is most tablets in
              landscape and every small laptop. Five nav items, two switches, a link and a CTA
              need the room, and Vietnamese needs 147px more of it than English.
              
              Tightening gaps was the first instinct and it cannot work: clawing back 147px means
              dropping items, and a nav that differs by language is worse than a compact menu for
              one breakpoint band. Below `xl` the mobile sheet carries the same links, which is
              what it is for. Vietnamese keeps the sheet to 88rem, where its row fits
              (`:lang(vi) [data-nav]` in globals.css).
            */}
        <nav
          aria-label="Main"
          className="relative hidden self-stretch xl:flex xl:items-center"
          data-mega-nav
        >
          <ul className="flex items-center gap-0.5">
            {/* About us is deliberately not a top-level item. It lives once, under
                     Resources > Company. Two entry points to /about read as two destinations. */}
            <li className="relative">
              <details className="group" data-dropdown data-mega>
                <summary className="nav-link cursor-pointer group-open:bg-surface-1 group-open:text-ink">
                  {t("1")}
                  <svg
                    className="size-3.5 transition-transform duration-150 ease-out-soft group-open:rotate-180"
                    aria-hidden="true"
                  >
                    <use href="#i-chevron-down" />
                  </svg>
                </summary>
                <div
                  data-panel
                  className="absolute top-full left-0 mt-2 animate-dropdown overflow-hidden rounded-2xl bg-card shadow-nav motion-reduce:animate-none"
                >
                  {/* A fixed width, three columns' worth like Templates (2026-10-26). Its columns grow to fill
                      (`flex-1`), so without one it took whatever width the viewport had when the script
                      measured it: 608px on first open or after Resources, 912px after Templates. */}
                  <div
                    data-nav-content
                    className="nav-content flex w-228 flex-col"
                  >
                    {/* The catalogue tools side by side; the storefront, which comes later, as a row of three under them (owner, 2026-11-10). */}
                    <div className="flex w-full justify-center">
                      <div className="nav-column min-w-76 flex-1 p-3">
                        <p className="px-3 pt-1 pb-2 text-xs font-medium text-muted">
                          {t("2")}
                        </p>
                        <ul className="space-y-1">
                          <li>
                            <Link
                              href={designedHref("/en/product/decision-audit")}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                            >
                              <span className="nav-icon-tile">
                                <svg className="size-4" aria-hidden="true">
                                  <use href="#i-clipboard-check" />
                                </svg>
                              </span>
                              <span className="min-w-0">
                                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                                  {t("3")}
                                </span>
                                <span className="mt-1 block text-sm text-pretty text-muted">
                                  {t("4")}
                                </span>
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={designedHref(
                                "/en/product/decision-verification",
                              )}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                            >
                              <span className="nav-icon-tile">
                                <svg className="size-4" aria-hidden="true">
                                  <use href="#i-compare" />
                                </svg>
                              </span>
                              <span className="min-w-0">
                                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                                  {t("5")}
                                </span>
                                <span className="mt-1 block text-sm text-pretty text-muted">
                                  {t("6")}
                                </span>
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="nav-column min-w-76 flex-1 p-3">
                        <p className="px-3 pt-1 pb-2 text-xs font-medium text-muted">
                          {t("7")}
                        </p>
                        <ul className="space-y-1">
                          <li>
                            <Link
                              href={designedHref(
                                "/en/product/decision-monitor",
                              )}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                            >
                              <span className="nav-icon-tile">
                                <svg className="size-4" aria-hidden="true">
                                  <use href="#i-bell-ring" />
                                </svg>
                              </span>
                              <span className="min-w-0">
                                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                                  {t("8")}
                                  <span className="rounded bg-primary-tint px-1.5 py-0.5 text-label font-semibold text-primary uppercase">
                                    {t("9")}
                                  </span>
                                </span>
                                <span className="mt-1 block text-sm text-pretty text-muted">
                                  {t("10")}
                                </span>
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={designedHref(
                                "/en/product/return-verification",
                              )}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                            >
                              <span className="nav-icon-tile">
                                <svg className="size-4" aria-hidden="true">
                                  <use href="#i-undo" />
                                </svg>
                              </span>
                              <span className="min-w-0">
                                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                                  {t("returnName")}
                                </span>
                                <span className="mt-1 block text-sm text-pretty text-muted">
                                  {t("returnBlurb")}
                                </span>
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={designedHref("/en/product/visual-evidence")}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                            >
                              <span className="nav-icon-tile">
                                <svg className="size-4" aria-hidden="true">
                                  <use href="#i-image" />
                                </svg>
                              </span>
                              <span className="min-w-0">
                                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                                  {t("visualName")}
                                </span>
                                <span className="mt-1 block text-sm text-pretty text-muted">
                                  {t("visualBlurb")}
                                </span>
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={designedHref("/en/product/promotion-audit")}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                            >
                              <span className="nav-icon-tile">
                                <svg className="size-4" aria-hidden="true">
                                  <use href="#i-chart-pie" />
                                </svg>
                              </span>
                              <span className="min-w-0">
                                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                                  {t("promotionName")}
                                </span>
                                <span className="mt-1 block text-sm text-pretty text-muted">
                                  {t("promotionBlurb")}
                                </span>
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="relative py-3 before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-line/60 before:content-['']">
                      {/* No side padding here: each cell carries the columns' p-3, so the grid lines up with them. */}
                      <p className="mx-3 px-3 pt-1 pb-2 text-xs font-medium text-muted">
                        {t("storefront")}
                      </p>
                      <ul className="grid grid-cols-3 gap-y-1">
                        {STOREFRONT.map((p) => (
                          <li key={p.href} className="px-3">
                            <Link
                              href={designedHref(p.href)}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                            >
                              <span className="nav-icon-tile">
                                <svg className="size-4" aria-hidden="true">
                                  <use href={`#${p.icon}`} />
                                </svg>
                              </span>
                              <span className="min-w-0">
                                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                                  {t(`${p.key}Name`)}
                                </span>
                                <span className="mt-1 block text-sm text-pretty text-muted">
                                  {t(`${p.key}Blurb`)}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </details>
            </li>

            <li className="relative">
              <details className="group" data-dropdown data-mega>
                <summary className="nav-link cursor-pointer group-open:bg-surface-1 group-open:text-ink">
                  {t("13")}
                  <svg
                    className="size-3.5 transition-transform duration-150 ease-out-soft group-open:rotate-180"
                    aria-hidden="true"
                  >
                    <use href="#i-chevron-down" />
                  </svg>
                </summary>
                <div
                  data-panel
                  className="absolute top-full left-0 mt-2 animate-dropdown overflow-hidden rounded-2xl bg-card shadow-nav motion-reduce:animate-none"
                >
                  <div data-nav-content className="nav-content flex">
                    <div className="nav-column w-76 p-3">
                      <p className="px-3 pt-1 pb-2 text-xs font-medium text-muted">
                        {t("agentsHeading")}
                      </p>
                      <ul className="space-y-1">
                        {AGENTS.map((p) => (
                          <li key={p.href}>
                            <Link
                              href={designedHref(p.href)}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                            >
                              <span className="nav-icon-tile">
                                <svg className="size-4" aria-hidden="true">
                                  <use href={`#${p.icon}`} />
                                </svg>
                              </span>
                              <span className="min-w-0">
                                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                                  {t(`${p.key}Name`)}
                                  <span className="rounded bg-primary-tint px-1.5 py-0.5 text-label font-semibold text-primary uppercase">
                                    {t("newTag")}
                                  </span>
                                </span>
                                <span className="mt-1 block text-sm text-pretty text-muted">
                                  {t(`${p.key}Blurb`)}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="nav-column w-76 p-3">
                      <p className="px-3 pt-1 pb-2 text-xs font-medium text-muted">
                        {t("industriesHeading")}
                      </p>
                      <ul className="space-y-1">
                        {INDUSTRIES.map((p) => (
                          <li key={p.href}>
                            <Link
                              href={designedHref(p.href)}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                            >
                              <span className="nav-icon-tile">
                                <svg className="size-4" aria-hidden="true">
                                  <use href={`#${p.icon}`} />
                                </svg>
                              </span>
                              <span className="min-w-0">
                                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                                  {t(p.name)}
                                </span>
                                <span className="mt-1 block text-sm text-pretty text-muted">
                                  {t(p.blurb)}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="nav-column w-76 p-3">
                      <p className="px-3 pt-1 pb-2 text-xs font-medium text-muted">
                        {t("goalsHeading")}
                      </p>
                      <ul className="space-y-1">
                        {GOALS.map((p) => (
                          <li key={p.href}>
                            <Link
                              href={designedHref(p.href)}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                            >
                              <span className="nav-icon-tile">
                                <svg className="size-4" aria-hidden="true">
                                  <use href={`#${p.icon}`} />
                                </svg>
                              </span>
                              <span className="min-w-0">
                                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                                  {t(`${p.key}Name`)}
                                </span>
                                <span className="mt-1 block text-sm text-pretty text-muted">
                                  {t(`${p.key}Blurb`)}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </details>
            </li>

            <li className="relative">
              <details className="group" data-dropdown data-mega>
                <summary className="nav-link cursor-pointer group-open:bg-surface-1 group-open:text-ink">
                  {t("29")}
                  <svg
                    className="size-3.5 transition-transform duration-150 ease-out-soft group-open:rotate-180"
                    aria-hidden="true"
                  >
                    <use href="#i-chevron-down" />
                  </svg>
                </summary>
                <div
                  data-panel
                  className="absolute top-full left-0 mt-2 animate-dropdown overflow-hidden rounded-2xl bg-card shadow-nav motion-reduce:animate-none"
                >
                  {/*
                        Two columns of two, and no section headings.

                        It used to be Learn and Company side by side, three items against one.
                        Once Documentation was promoted to the top bar, Learn held nothing but
                        Research, and a heading over a single link is a label doing no work. The
                        four links are one group, so they stay unnamed; since 2026-10-26 they are
                        laid out as two columns, matching the Product menu, rather than one list.
                      */}
                  <div data-nav-content className="nav-content flex">
                    <div className="nav-column w-76 p-3">
                      <ul className="space-y-1">
                        <li>
                          <Link
                            href={designedHref("/en/research")}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                          >
                            <span className="nav-icon-tile">
                              <svg className="size-4" aria-hidden="true">
                                <use href="#i-flask" />
                              </svg>
                            </span>
                            <span className="min-w-0">
                              <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                                {t("33")}
                              </span>
                              <span className="mt-1 block text-sm text-pretty text-muted">
                                {t("34")}
                              </span>
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={designedHref("/en/about")}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                          >
                            <span className="nav-icon-tile">
                              <svg className="size-4" aria-hidden="true">
                                <use href="#i-user-round" />
                              </svg>
                            </span>
                            <span className="min-w-0">
                              <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                                {t("36")}
                              </span>
                              <span className="mt-1 block text-sm text-pretty text-muted">
                                {t("37")}
                              </span>
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="nav-column w-76 p-3">
                      <ul className="space-y-1">
                        <li>
                          <Link
                            href={designedHref("/en/contact")}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                          >
                            <span className="nav-icon-tile">
                              <svg className="size-4" aria-hidden="true">
                                <use href="#i-message-circle" />
                              </svg>
                            </span>
                            <span className="min-w-0">
                              <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                                {t("38")}
                              </span>
                              <span className="mt-1 block text-sm text-pretty text-muted">
                                {t("39")}
                              </span>
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={designedHref("/en/careers")}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ease-out-soft hover:bg-surface-1"
                          >
                            <span className="nav-icon-tile">
                              <svg className="size-4" aria-hidden="true">
                                <use href="#i-briefcase" />
                              </svg>
                            </span>
                            <span className="min-w-0">
                              <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                                {t("40")}
                              </span>
                              <span className="mt-1 block text-sm text-pretty text-muted">
                                {t("41")}
                              </span>
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </details>
            </li>

            {/* Promoted out of the Resources panel: the docs are a destination of their own,
                     not something to go hunting for behind a menu. It stays an <a> rather than a
                     <Link>, because it leaves this site for the handbook. */}
            <li>
              <a
                href="https://developer.thepulseapi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                {t("31")}
              </a>
            </li>
            <li>
              <Link href={designedHref("/en/pricing")} className="nav-link">
                {t("42")}
              </Link>
            </li>
            <li>
              {/* The selling point, so it stands apart: the GitHub mark and the primary colour. */}
              <Link
                href={designedHref("/en/opensource")}
                className="nav-link gap-1.5 font-semibold text-primary! hover:bg-primary-tint!"
              >
                <svg className="size-4" aria-hidden="true">
                  <use href="#i-github" />
                </svg>
                {t("opensource")}
              </Link>
            </li>
          </ul>
          <div className="nav-viewport" data-nav-viewport>
            <div className="nav-viewport-stack" data-nav-stack></div>
          </div>
        </nav>

        {/* Desktop actions */}
        <div
          className="hidden items-center gap-2 self-stretch xl:flex"
          data-nav-actions
        >
          <DesignedThemeSwitch label={t("themeDark")} />
          <DesignedLocaleMenu heading={t("44")} current={renderLocale()} />
          {/* Sign-in is the dashboard's own page, another origin: a plain link. */}
          <a href={SIGNIN_URL} className="nav-link">
            {t("46")}
          </a>
          <Link
            href={designedHref("/en/contact")}
            className="group btn-primary gap-1.5 rounded-control text-nav whitespace-nowrap"
          >
            {t("47")}
            <svg
              className="size-3.5 transition-transform duration-150 ease-out-soft group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <use href="#i-arrow-right" />
            </svg>
          </Link>
        </div>

        {/* Phones: the language dropdown beside the menu button, outside the menu. */}
        <div className="ml-auto flex self-stretch xl:hidden">
          <DesignedLocaleMenu heading={t("44")} current={renderLocale()} />
        </div>

        {/* Mobile menu */}
        <details className="group xl:hidden" data-mobile-menu>
          <summary
            className="hit-area flex size-9 cursor-pointer items-center justify-center rounded-control text-ink"
            aria-label="Open menu"
          >
            <svg className="size-5 group-open:hidden" aria-hidden="true">
              <use href="#i-menu" />
            </svg>
            <svg className="hidden size-5 group-open:block" aria-hidden="true">
              <use href="#i-x" />
            </svg>
          </summary>
          <div className="fixed inset-x-0 top-17 bottom-0 flex animate-dropdown flex-col border-t border-line bg-card motion-reduce:animate-none">
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-1 pb-6 md:px-8">
              {/* About us moved down into Resources, so the mobile menu lists it in the same
                     one place the desktop one does. */}
              <MenuGroup title={t("48")} count={5} open>
                <ul>
                  <li>
                    <Link
                      href={designedHref("/en/product/decision-audit")}
                      className="flex min-h-12 items-center gap-3.5 rounded-control py-1 font-medium text-ink"
                    >
                      <span className="nav-icon-tile size-9">
                        <svg className="size-4" aria-hidden="true">
                          <use href="#i-clipboard-check" />
                        </svg>
                      </span>
                      {t("49")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={designedHref("/en/product/decision-verification")}
                      className="flex min-h-12 items-center gap-3.5 rounded-control py-1 font-medium text-ink"
                    >
                      <span className="nav-icon-tile size-9">
                        <svg className="size-4" aria-hidden="true">
                          <use href="#i-compare" />
                        </svg>
                      </span>
                      {t("50")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={designedHref("/en/product/decision-monitor")}
                      className="flex min-h-12 items-center gap-3.5 rounded-control py-1 font-medium text-ink"
                    >
                      <span className="nav-icon-tile size-9">
                        <svg className="size-4" aria-hidden="true">
                          <use href="#i-bell-ring" />
                        </svg>
                      </span>
                      {t("51")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={designedHref("/en/product/return-verification")}
                      className="flex min-h-12 items-center gap-3.5 rounded-control py-1 font-medium text-ink"
                    >
                      <span className="nav-icon-tile size-9">
                        <svg className="size-4" aria-hidden="true">
                          <use href="#i-undo" />
                        </svg>
                      </span>
                      {t("returnName")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={designedHref("/en/product/visual-evidence")}
                      className="flex min-h-12 items-center gap-3.5 rounded-control py-1 font-medium text-ink"
                    >
                      <span className="nav-icon-tile size-9">
                        <svg className="size-4" aria-hidden="true">
                          <use href="#i-image" />
                        </svg>
                      </span>
                      {t("visualName")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={designedHref("/en/product/promotion-audit")}
                      className="flex min-h-12 items-center gap-3.5 rounded-control py-1 font-medium text-ink"
                    >
                      <span className="nav-icon-tile size-9">
                        <svg className="size-4" aria-hidden="true">
                          <use href="#i-chart-pie" />
                        </svg>
                      </span>
                      {t("promotionName")}
                    </Link>
                  </li>
                </ul>
              </MenuGroup>

              <MenuGroup title={t("storefront")} count={STOREFRONT.length}>
                <ul>
                  {STOREFRONT.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={designedHref(p.href)}
                        className="flex min-h-12 items-center gap-3.5 rounded-control py-1 font-medium text-ink"
                      >
                        <span className="nav-icon-tile size-9">
                          <svg className="size-4" aria-hidden="true">
                            <use href={`#${p.icon}`} />
                          </svg>
                        </span>
                        {t(`${p.key}Name`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </MenuGroup>

              <MenuGroup title={t("agentsHeading")} count={AGENTS.length}>
                <ul>
                  {AGENTS.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={designedHref(p.href)}
                        className="flex min-h-12 items-center gap-3.5 rounded-control py-1 font-medium text-ink"
                      >
                        <span className="nav-icon-tile size-9">
                          <svg className="size-4" aria-hidden="true">
                            <use href={`#${p.icon}`} />
                          </svg>
                        </span>
                        {t(`${p.key}Name`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </MenuGroup>

              <MenuGroup title={t("industriesHeading")} count={6}>
                <ul>
                  <li>
                    <Link
                      href={designedHref("/en/industries/ecommerce")}
                      className="flex min-h-12 items-center gap-3.5 rounded-control py-1 font-medium text-ink"
                    >
                      <span className="nav-icon-tile size-9">
                        <svg className="size-4" aria-hidden="true">
                          <use href="#i-cart" />
                        </svg>
                      </span>
                      {t("53")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={designedHref("/en/industries/fmcg")}
                      className="flex min-h-12 items-center gap-3.5 rounded-control py-1 font-medium text-ink"
                    >
                      <span className="nav-icon-tile size-9">
                        <svg className="size-4" aria-hidden="true">
                          <use href="#i-basket" />
                        </svg>
                      </span>
                      {t("54")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={designedHref("/en/industries/technology")}
                      className="flex min-h-12 items-center gap-3.5 rounded-control py-1 font-medium text-ink"
                    >
                      <span className="nav-icon-tile size-9">
                        <svg className="size-4" aria-hidden="true">
                          <use href="#i-cpu" />
                        </svg>
                      </span>
                      {t("55")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={designedHref("/en/industries/furniture")}
                      className="flex min-h-12 items-center gap-3.5 rounded-control py-1 font-medium text-ink"
                    >
                      <span className="nav-icon-tile size-9">
                        <svg className="size-4" aria-hidden="true">
                          <use href="#i-sofa" />
                        </svg>
                      </span>
                      {t("56")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={designedHref("/en/industries/cosmetics")}
                      className="flex min-h-12 items-center gap-3.5 rounded-control py-1 font-medium text-ink"
                    >
                      <span className="nav-icon-tile size-9">
                        <svg className="size-4" aria-hidden="true">
                          <use href="#i-sparkles" />
                        </svg>
                      </span>
                      {t("57")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={designedHref("/en/industries/distribution")}
                      className="flex min-h-12 items-center gap-3.5 rounded-control py-1 font-medium text-ink"
                    >
                      <span className="nav-icon-tile size-9">
                        <svg className="size-4" aria-hidden="true">
                          <use href="#i-factory" />
                        </svg>
                      </span>
                      {t("58")}
                    </Link>
                  </li>
                </ul>
              </MenuGroup>

              <MenuGroup title={t("goalsHeading")} count={GOALS.length}>
                <ul>
                  {GOALS.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={designedHref(p.href)}
                        className="flex min-h-12 items-center gap-3.5 rounded-control py-1 font-medium text-ink"
                      >
                        <span className="nav-icon-tile size-9">
                          <svg className="size-4" aria-hidden="true">
                            <use href={`#${p.icon}`} />
                          </svg>
                        </span>
                        {t(`${p.key}Name`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </MenuGroup>

              <MenuGroup title={t("59")} count={2}>
                <ul>
                  <li>
                    <Link
                      href={designedHref("/en/research")}
                      className="flex min-h-12 items-center gap-3.5 rounded-control py-1 font-medium text-ink"
                    >
                      <span className="nav-icon-tile size-9">
                        <svg className="size-4" aria-hidden="true">
                          <use href="#i-flask" />
                        </svg>
                      </span>
                      {t("61")}
                    </Link>
                  </li>
                  {/* The desktop panel is one unlabelled list now, which is what this has
                       always been. */}
                  <li>
                    <Link
                      href={designedHref("/en/about")}
                      className="flex min-h-12 items-center gap-3.5 rounded-control py-1 font-medium text-ink"
                    >
                      <span className="nav-icon-tile size-9">
                        <svg className="size-4" aria-hidden="true">
                          <use href="#i-user-round" />
                        </svg>
                      </span>
                      {t("62")}
                    </Link>
                  </li>
                </ul>
              </MenuGroup>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href="https://developer.thepulseapi.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full border border-line px-4 font-medium text-ink"
                >
                  {t("60")}
                </a>
                <Link
                  href={designedHref("/en/pricing")}
                  className="inline-flex min-h-11 items-center rounded-full border border-line px-4 font-medium text-ink"
                >
                  {t("63")}
                </Link>
                <Link
                  href={designedHref("/en/opensource")}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-primary-line px-4 font-semibold text-primary"
                >
                  <svg className="size-4" aria-hidden="true">
                    <use href="#i-github" />
                  </svg>
                  {t("opensource")}
                </Link>
              </div>
            </div>

            {/* Pinned under the list, always in view (owner's version 1, 27 Oct 2026): sign-in, the
                call to action, and the theme and language controls, which live in the desktop
                actions and so had to be here for a phone to have them at all. */}
            <div className="grid gap-3 border-t border-line bg-card px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-8">
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
                <a
                  href={SIGNIN_URL}
                  className="btn-secondary rounded-control text-nav"
                >
                  {t("64")}
                </a>
                <Link
                  href={designedHref("/en/contact")}
                  className="btn-primary rounded-control text-nav"
                >
                  {t("65")}
                  <svg className="size-3.5" aria-hidden="true">
                    <use href="#i-message-circle" />
                  </svg>
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <DesignedThemeSwitch label={t("themeDark")} />
              </div>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}

/**
 * One group of the mobile menu, folded (owner's version 1, 27 Oct 2026): its name as a heading, how
 * many pages it holds, and a chevron. The six share a `name`, so the browser keeps one open at a
 * time and the list stays about a screen long, with no script. Named `group/menu` so its open
 * state never reads as the menu's own `group`.
 */
function MenuGroup({
  title,
  count,
  open = false,
  children,
}: {
  title: string;
  count: number;
  open?: boolean;
  children: ReactNode;
}) {
  return (
    <details
      name="mobile-menu-group"
      open={open}
      className="group/menu border-b border-line"
    >
      <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
        <span className="flex-1 text-[1.0625rem] font-semibold text-ink">
          {title}
        </span>
        <span className="rounded-full bg-surface-1 px-2 font-mono text-xs text-muted tabular-nums">
          {count}
        </span>
        <svg
          className="size-4 text-muted transition-transform duration-200 ease-out-soft group-open/menu:rotate-180 group-open/menu:text-primary"
          aria-hidden="true"
        >
          <use href="#i-chevron-down" />
        </svg>
      </summary>
      <div className="pb-3">{children}</div>
    </details>
  );
}
