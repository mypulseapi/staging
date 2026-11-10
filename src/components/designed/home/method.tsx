/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import type { CSSProperties } from "react";
import { designedText } from "../t";

/**
 * Step 1's 24 product pages: which of the five facts (name, category, price, screen size, memory)
 * each page does not state, or -1 where it states all five. A fixed pattern, so the scene is the
 * same on every render.
 */
const PAGES = Array.from({ length: 24 }, (_, i) =>
  i % 4 === 3 ? -1 : [2, 4, 1, 3, 0, 3, 4, 2][(i * 5 + (i % 3)) % 8] % 5,
);
export function MethodSection() {
  const t = designedText("home.method");
  return (
    <section id="method" className="scroll-mt-16 border-b border-line" data-how>
            <div className="frame py-16 lg:py-24">
              <div
                className="bg-primary-wash grid gap-12 rounded-3xl border border-primary-line px-5 py-14 text-ink sm:px-10 lg:grid-cols-12 lg:gap-14 lg:px-14 lg:py-20"
              >
                <div className="min-w-0 lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <h2 className="reveal text-title text-balance text-ink">
                      {t('1')}
                    </h2>
                    <p
                      className="reveal mt-4 max-w-md text-lg text-pretty text-muted delay-100 lg:min-h-21"
                    >
                      {t('2')}
                    </p>
                    <ol
                      className="mt-29 hidden border-t border-line lg:block"
                      aria-label="How it works, step by step"
                    >
                      <li
                        className="group relative border-b border-line"
                        data-how-step
                        data-active
                      >
                        <a
                          href="#how-step-1"
                          className="block py-5 text-h3 text-muted transition-colors duration-200 ease-out-soft group-data-active:text-ink"
                          data-how-link
                          >{t('3')}</a
                        >
                        <div className="how-desc">
                          <div>
                            <div className="pb-6">
                              <p className="eyebrow-primary">{t('4')}</p>
                              <p className="mt-2 text-sm text-muted">
                                {t('5')}
                              </p>
                            </div>
                          </div>
                        </div>
                        <span
                          className="how-progress absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-calm-gradient"
                          aria-hidden="true"
                        ></span>
                      </li>
                      <li className="group relative border-b border-line" data-how-step>
                        <a
                          href="#how-step-2"
                          className="block py-5 text-h3 text-muted transition-colors duration-200 ease-out-soft group-data-active:text-ink"
                          data-how-link
                          >{t('6')}</a
                        >
                        <div className="how-desc">
                          <div>
                            <div className="pb-6">
                              <p className="eyebrow-primary">{t('7')}</p>
                              <p className="mt-2 text-sm text-muted">
                                {t('8')}
                              </p>
                            </div>
                          </div>
                        </div>
                        <span
                          className="how-progress absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-calm-gradient"
                          aria-hidden="true"
                        ></span>
                      </li>
                      <li className="group relative border-b border-line" data-how-step>
                        <a
                          href="#how-step-3"
                          className="block py-5 text-h3 text-muted transition-colors duration-200 ease-out-soft group-data-active:text-ink"
                          data-how-link
                          >{t('9')}</a
                        >
                        <div className="how-desc">
                          <div>
                            <div className="pb-6">
                              <p className="eyebrow-primary">{t('10')}</p>
                              <p className="mt-2 text-sm text-muted">
                                {t('11')}
                              </p>
                            </div>
                          </div>
                        </div>
                        <span
                          className="how-progress absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-calm-gradient"
                          aria-hidden="true"
                        ></span>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="min-w-0 space-y-6 lg:col-span-8">
                  <article
                    id="how-step-1"
                    className="how-card relative scroll-mt-24"
                    aria-labelledby="how-step-1-title"
                    data-how-card
                  >
                    <div className="how-pause">
                      {/*
                        A real button, not the sign it was: the hover pause behind it is invisible to
                        a thumb. The two labels ride on the element rather than living in the motion
                        script, so /vi gets Vietnamese here instead of the English the script would
                        otherwise hardcode.
                      */}
                      <button
                        type="button"
                        className="how-pause-icon"
                        data-how-pause
                        aria-pressed="false"
                        aria-label={t('pauseLabel')}
                        data-label-pause={t('pauseLabel')}
                        data-label-play={t('playLabel')}
                      >
                        <svg className="size-3.5" aria-hidden="true"
                          ><use href="#i-pause" data-how-pause-icon /></svg
                        >
                      </button>
                      <span
                        className="how-pause-label"
                        role="status"
                        data-how-status
                        data-label-paused={t('pausedLabel')}
                      ></span>
                    </div>
                    <div className="mb-4 lg:sr-only">
                      <p className="eyebrow-primary pr-28">{t('12')}</p>
                      <h3 id="how-step-1-title" className="mt-1 pr-28 text-h3">
                        {t('13')}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        {t('14')}
                      </p>
                    </div>
                    <div
                      className="how-glow flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface-1 p-3 sm:p-8 lg:min-h-136"
                    >
                      {/*
                        Step 1: the store's address goes in and Pulse reads its public product pages
                        (owner's pick B, 2026-11-10). It used to show a product export; the test now reads
                        the live store. Styles and beats: `.how-scan` in globals.css.
                      */}
                      <div
                        className="how-scene how-scan relative h-104 w-full max-w-3xl max-md:h-128"
                        data-scene
                        data-beats="0 700 1700 2600 5500"
                      >
                        <div className="scan-bar scan-box">
                          <span className="scan-url">
                            <svg className="size-3.5 shrink-0 text-muted" aria-hidden="true">
                              <use href="#i-globe" />
                            </svg>
                            <span className="scan-typed">{t("22")}</span>
                            <span className="scan-caret" aria-hidden="true"></span>
                          </span>
                          <span className="scan-btn">
                            {t("scan")}
                            <span className="scan-ring" aria-hidden="true"></span>
                            <svg className="scan-cur" aria-hidden="true">
                              <use href="#i-pointer" />
                            </svg>
                          </span>
                        </div>
                        {/* 24 product pages; each shows its five facts, amber where the page does not state one */}
                        <div className="scan-grid" aria-hidden="true">
                          {PAGES.map((missing, i) => (
                            <span key={i} className="scan-th" style={{ "--i": i } as CSSProperties}>
                              <span className="scan-im"></span>
                              <span className="scan-sk"></span>
                              <span className="scan-sk w-3/5"></span>
                              <span className="scan-dots">
                                {[0, 1, 2, 3, 4].map((d) => (
                                  <i key={d} className={d === missing ? "scan-gap" : undefined}></i>
                                ))}
                              </span>
                            </span>
                          ))}
                        </div>
                        <span className="scan-band" aria-hidden="true"></span>
                        <div className="scan-meta">
                          <span className="flex flex-wrap items-center gap-3.5">
                            <span>
                              <span className="scan-dot" aria-hidden="true"></span>
                              {t("stated")}
                            </span>
                            <span className="missing-flag">
                              <svg className="size-3" aria-hidden="true">
                                <use href="#i-triangle-alert" />
                              </svg>
                              {t("35")}
                            </span>
                          </span>
                          <span className="scan-pages tabular-nums">{t("24")}</span>
                        </div>
                        <div className="scan-pulse scan-box">
                          <div className="grid min-w-0 gap-0.5">
                            <p className="font-display text-lg font-semibold text-ink">{t("47")}</p>
                            <p className="scan-facts text-xs text-muted">
                              {t("26")} · {t("28")} · {t("29")} · {t("30")} · {t("31")}
                            </p>
                          </div>
                          <div className="scan-swap">
                            <div className="scan-reading">
                              <span
                                className="scan-count font-display text-2xl leading-none font-semibold text-ink"
                                aria-hidden="true"
                              ></span>
                              <p className="mt-0.5 text-sm text-muted">{t("48")}</p>
                            </div>
                            <div className="scan-done">
                              <span className="badge-success">
                                <svg className="size-3" aria-hidden="true">
                                  <use href="#i-check" />
                                </svg>
                                {t("49")}
                              </span>
                              <p className="mt-0.5 text-sm text-ink tabular-nums">{t("50")}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    id="how-step-2"
                    className="how-card relative scroll-mt-24"
                    aria-labelledby="how-step-2-title"
                    data-how-card
                  >
                    <div className="how-pause">
                      {/*
                        A real button, not the sign it was: the hover pause behind it is invisible to
                        a thumb. The two labels ride on the element rather than living in the motion
                        script, so /vi gets Vietnamese here instead of the English the script would
                        otherwise hardcode.
                      */}
                      <button
                        type="button"
                        className="how-pause-icon"
                        data-how-pause
                        aria-pressed="false"
                        aria-label={t('pauseLabel')}
                        data-label-pause={t('pauseLabel')}
                        data-label-play={t('playLabel')}
                      >
                        <svg className="size-3.5" aria-hidden="true"
                          ><use href="#i-pause" data-how-pause-icon /></svg
                        >
                      </button>
                      <span
                        className="how-pause-label"
                        role="status"
                        data-how-status
                        data-label-paused={t('pausedLabel')}
                      ></span>
                    </div>
                    <div className="mb-4 lg:sr-only">
                      <p className="eyebrow-primary pr-28">{t('51')}</p>
                      <h3 id="how-step-2-title" className="mt-1 pr-28 text-h3">
                        {t('52')}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        {t('53')}
                      </p>
                    </div>
                    <div
                      className="how-glow flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface-1 p-3 sm:p-8 lg:min-h-136"
                    >
                      <div
                        className="how-scene relative h-128 w-full max-w-3xl sm:h-112"
                        data-scene
                        data-beats="0 1100 2700 4000"
                      >
                        {/* 1 the product table from the export, big */}
                        <div
                          className="rounded-xl border border-line bg-card shadow-sm absolute inset-x-0 top-0 overflow-hidden p-3 transition-all duration-700 ease-out-soft scale-95 pre-4:scale-100 sm:p-5"
                        >
                          <p className="eyebrow">{t('54')}</p>
                          <table
                            className="mt-3 w-full table-fixed text-left tabular-nums text-xs sm:text-sm"
                          >
                            <thead className="text-xs text-muted">
                              <tr>
                                <th
                                  className="w-1/4 py-1.5 pr-2 font-medium max-sm:w-1/3 md:w-1/3"
                                >
                                  {t('55')}
                                </th>
                                <th className="py-1.5 pr-2 font-medium">
                                  <span className="block text-ink">{t('56')}</span
                                  ><span
                                    className="flex items-center gap-1 font-semibold text-gap-strong transition-opacity duration-500 pre-3:opacity-0"
                                    ><svg className="size-3" aria-hidden="true">
                                      <use href="#i-triangle-alert" /></svg
                                    >{t('57')}</span
                                  >
                                </th>
                                <th className="py-1.5 pr-2 font-medium">
                                  <span className="block text-ink">{t('58')}</span
                                  ><span
                                    className="flex items-center gap-1 font-semibold text-gap-strong transition-opacity duration-500 pre-3:opacity-0"
                                    ><svg className="size-3" aria-hidden="true">
                                      <use href="#i-triangle-alert" /></svg
                                    >{t('59')}</span
                                  >
                                </th>
                                <th
                                  className="py-1.5 pr-2 font-medium hidden sm:table-cell"
                                >
                                  <span className="block text-ink">{t('60')}</span
                                  ><span
                                    className="flex items-center gap-1 font-semibold text-gap-strong transition-opacity duration-500 pre-3:opacity-0"
                                    ><svg className="size-3" aria-hidden="true">
                                      <use href="#i-triangle-alert" /></svg
                                    >{t('61')}</span
                                  >
                                </th>
                                <th
                                  className="py-1.5 pr-2 font-medium hidden sm:table-cell"
                                >
                                  <span className="block text-ink">{t('62')}</span
                                  ><span
                                    className="flex items-center gap-1 font-semibold text-gap-strong transition-opacity duration-500 pre-3:opacity-0"
                                    ><svg className="size-3" aria-hidden="true">
                                      <use href="#i-triangle-alert" /></svg
                                    >{t('63')}</span
                                  >
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-line">
                              <tr>
                                <td
                                  className="truncate py-2 pr-2 text-ink max-sm:overflow-visible max-sm:whitespace-normal max-sm:wrap-anywhere"
                                >
                                  {t('64')}
                                </td>
                                <td className="py-2 pr-1 sm:pr-2">
                                  <span className="text-ink">{t('65')}</span>
                                </td>
                                <td className="py-2 pr-1 sm:pr-2">
                                  <span className="missing-flag"
                                    ><svg
                                      className="size-3 max-sm:hidden"
                                      aria-hidden="true"
                                    >
                                      <use href="#i-triangle-alert" /></svg
                                    >{t('66')}</span
                                  >
                                </td>
                                <td className="py-2 pr-1 sm:pr-2 hidden sm:table-cell">
                                  <span className="missing-flag"
                                    ><svg
                                      className="size-3 max-sm:hidden"
                                      aria-hidden="true"
                                    >
                                      <use href="#i-triangle-alert" /></svg
                                    >{t('67')}</span
                                  >
                                </td>
                                <td className="py-2 pr-1 sm:pr-2 hidden sm:table-cell">
                                  <span className="text-ink">{t('68')}</span>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="truncate py-2 pr-2 text-ink max-sm:overflow-visible max-sm:whitespace-normal max-sm:wrap-anywhere"
                                >
                                  {t('69')}
                                </td>
                                <td className="py-2 pr-1 sm:pr-2">
                                  <span className="missing-flag"
                                    ><svg
                                      className="size-3 max-sm:hidden"
                                      aria-hidden="true"
                                    >
                                      <use href="#i-triangle-alert" /></svg
                                    >{t('70')}</span
                                  >
                                </td>
                                <td className="py-2 pr-1 sm:pr-2">
                                  <span className="text-ink">{t('71')}</span>
                                </td>
                                <td className="py-2 pr-1 sm:pr-2 hidden sm:table-cell">
                                  <span className="missing-flag"
                                    ><svg
                                      className="size-3 max-sm:hidden"
                                      aria-hidden="true"
                                    >
                                      <use href="#i-triangle-alert" /></svg
                                    >{t('72')}</span
                                  >
                                </td>
                                <td className="py-2 pr-1 sm:pr-2 hidden sm:table-cell">
                                  <span className="missing-flag"
                                    ><svg
                                      className="size-3 max-sm:hidden"
                                      aria-hidden="true"
                                    >
                                      <use href="#i-triangle-alert" /></svg
                                    >{t('73')}</span
                                  >
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="truncate py-2 pr-2 text-ink max-sm:overflow-visible max-sm:whitespace-normal max-sm:wrap-anywhere"
                                >
                                  {t('74')}
                                </td>
                                <td className="py-2 pr-1 sm:pr-2">
                                  <span className="missing-flag"
                                    ><svg
                                      className="size-3 max-sm:hidden"
                                      aria-hidden="true"
                                    >
                                      <use href="#i-triangle-alert" /></svg
                                    >{t('75')}</span
                                  >
                                </td>
                                <td className="py-2 pr-1 sm:pr-2">
                                  <span className="text-ink">{t('76')}</span>
                                </td>
                                <td className="py-2 pr-1 sm:pr-2 hidden sm:table-cell">
                                  <span className="missing-flag"
                                    ><svg
                                      className="size-3 max-sm:hidden"
                                      aria-hidden="true"
                                    >
                                      <use href="#i-triangle-alert" /></svg
                                    >{t('77')}</span
                                  >
                                </td>
                                <td className="py-2 pr-1 sm:pr-2 hidden sm:table-cell">
                                  <span className="text-ink">{t('78')}</span>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="truncate py-2 pr-2 text-ink max-sm:overflow-visible max-sm:whitespace-normal max-sm:wrap-anywhere"
                                >
                                  {t('79')}
                                </td>
                                <td className="py-2 pr-1 sm:pr-2">
                                  <span className="text-ink">{t('80')}</span>
                                </td>
                                <td className="py-2 pr-1 sm:pr-2">
                                  <span className="missing-flag"
                                    ><svg
                                      className="size-3 max-sm:hidden"
                                      aria-hidden="true"
                                    >
                                      <use href="#i-triangle-alert" /></svg
                                    >{t('81')}</span
                                  >
                                </td>
                                <td className="py-2 pr-1 sm:pr-2 hidden sm:table-cell">
                                  <span className="missing-flag"
                                    ><svg
                                      className="size-3 max-sm:hidden"
                                      aria-hidden="true"
                                    >
                                      <use href="#i-triangle-alert" /></svg
                                    >{t('82')}</span
                                  >
                                </td>
                                <td className="py-2 pr-1 sm:pr-2 hidden sm:table-cell">
                                  <span className="missing-flag"
                                    ><svg
                                      className="size-3 max-sm:hidden"
                                      aria-hidden="true"
                                    >
                                      <use href="#i-triangle-alert" /></svg
                                    >{t('83')}</span
                                  >
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="truncate py-2 pr-2 text-ink max-sm:overflow-visible max-sm:whitespace-normal max-sm:wrap-anywhere"
                                >
                                  {t('84')}
                                </td>
                                <td className="py-2 pr-1 sm:pr-2">
                                  <span className="missing-flag"
                                    ><svg
                                      className="size-3 max-sm:hidden"
                                      aria-hidden="true"
                                    >
                                      <use href="#i-triangle-alert" /></svg
                                    >{t('85')}</span
                                  >
                                </td>
                                <td className="py-2 pr-1 sm:pr-2">
                                  <span className="text-ink">{t('86')}</span>
                                </td>
                                <td className="py-2 pr-1 sm:pr-2 hidden sm:table-cell">
                                  <span className="text-ink">M3</span>
                                </td>
                                <td className="py-2 pr-1 sm:pr-2 hidden sm:table-cell">
                                  <span className="text-ink">{t('87')}</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          {/* 2 the scan */}
                          <span
                            className="pointer-events-none absolute inset-x-0 top-full h-12 bg-linear-to-b from-transparent via-primary/25 to-transparent opacity-0 transition-all duration-1500 ease-in-out-cubic pre-2:top-0 at-2:opacity-100"
                            aria-hidden="true"
                          ></span>
                        </div>
                        {/* 3 the result, over the table */}
                        <div
                          className="rounded-xl border border-line bg-card shadow-sm absolute right-0 bottom-16 w-full p-4 transition-all duration-700 ease-out-soft pre-4:translate-y-6 pre-4:opacity-0 sm:w-96"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-semibold text-ink">
                              {t('88')}
                            </p>
                            <span className="badge-primary">{t('89')}</span>
                          </div>
                          <ol className="mt-3 space-y-1.5 tabular-nums text-sm">
                            <li
                              className="flex flex-wrap items-center gap-x-3 gap-y-0.5 rounded-lg border border-signal bg-signal-tint ring-1 ring-signal px-3 py-2 transition-all duration-500 delay-150 pre-4:translate-y-2 pre-4:opacity-0"
                            >
                              <span className="flex-1 font-semibold text-ink"
                                >{t('90')}</span
                              ><span className="w-full text-signal-text sm:w-auto"
                                >{t('91')}</span
                              >
                            </li>
                            <li
                              className="rounded-lg border border-line px-3 py-2 text-ink transition-all duration-500 delay-250 pre-4:translate-y-2 pre-4:opacity-0"
                            >
                              {t('92')}
                            </li>
                            <li
                              className="rounded-lg border border-line px-3 py-2 text-ink transition-all duration-500 delay-350 pre-4:translate-y-2 pre-4:opacity-0"
                            >
                              {t('93')}
                            </li>
                            <li
                              className="rounded-lg border border-line px-3 py-2 text-ink transition-all duration-500 delay-450 pre-4:translate-y-2 pre-4:opacity-0"
                            >
                              {t('94')}
                            </li>
                          </ol>
                        </div>
                        {/* 4 the 48-hour timeline */}
                        <div className="absolute inset-x-0 bottom-0">
                          <div className="flex justify-between text-xs text-ink">
                            <span>{t('95')}</span
                            ><span className="font-semibold text-ink"
                              >{t('96')}</span
                            >
                          </div>
                          <div className="mt-2 h-1.5 rounded-full bg-surface-1">
                            <div
                              className="h-full origin-left rounded-full bg-primary transition-transform duration-1000 ease-out-soft pre-2:scale-x-5 at-2:scale-x-40 at-3:scale-x-75"
                            ></div>
                          </div>
                          <div
                            className="mt-1 flex justify-between tabular-nums text-xs text-ink"
                            aria-hidden="true"
                          >
                            <span>0 h</span><span>24 h</span><span>48 h</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article
                    id="how-step-3"
                    className="how-card relative scroll-mt-24"
                    aria-labelledby="how-step-3-title"
                    data-how-card
                  >
                    <div className="how-pause">
                      {/*
                        A real button, not the sign it was: the hover pause behind it is invisible to
                        a thumb. The two labels ride on the element rather than living in the motion
                        script, so /vi gets Vietnamese here instead of the English the script would
                        otherwise hardcode.
                      */}
                      <button
                        type="button"
                        className="how-pause-icon"
                        data-how-pause
                        aria-pressed="false"
                        aria-label={t('pauseLabel')}
                        data-label-pause={t('pauseLabel')}
                        data-label-play={t('playLabel')}
                      >
                        <svg className="size-3.5" aria-hidden="true"
                          ><use href="#i-pause" data-how-pause-icon /></svg
                        >
                      </button>
                      <span
                        className="how-pause-label"
                        role="status"
                        data-how-status
                        data-label-paused={t('pausedLabel')}
                      ></span>
                    </div>
                    <div className="mb-4 lg:sr-only">
                      <p className="eyebrow-primary pr-28">{t('97')}</p>
                      <h3 id="how-step-3-title" className="mt-1 pr-28 text-h3">
                        {t('98')}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        {t('99')}
                      </p>
                    </div>
                    <div
                      className="how-glow flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface-1 p-3 sm:p-8 lg:min-h-136"
                    >
                      <div
                        className="how-scene relative flex w-full max-w-3xl flex-col gap-3 sm:block sm:h-104"
                        data-scene
                        data-beats="0 1200 2400 3900 5000 6300"
                      >
                        {/* 1–3 recover screen size from the product titles */}
                        <div
                          className="rounded-xl border border-line bg-card shadow-sm p-4 transition-all duration-700 ease-out-soft pre-4:translate-y-12 sm:absolute sm:inset-x-0 sm:top-0 sm:p-5"
                        >
                          <div
                            className="flex flex-wrap items-baseline justify-between gap-2"
                          >
                            <p className="eyebrow">{t('100')}</p>
                            <p
                              className="text-xs text-muted transition-opacity duration-500 pre-3:opacity-0"
                            >
                              {t('101')}
                            </p>
                          </div>
                          <ul className="mt-2 divide-y divide-line">
                            <li
                              className="flex items-center justify-between gap-4 py-3"
                            >
                              <span
                                className="min-w-0 text-base text-muted max-sm:text-sm sm:truncate"
                                ><span>{t('102')}</span
                                ><mark
                                  className="mx-1 inline-block rounded-md bg-primary px-1.5 py-0.5 font-bold text-on-primary transition-all duration-500 ease-out-soft pre-2:bg-card pre-2:font-semibold pre-2:text-muted sm:at-2:scale-125 at-2:shadow-sm sm:at-2:mx-4 sm:at-2:ring-4 at-2:ring-primary/60"
                                  >{t('103')}</mark
                                ><span>{t('104')}</span></span
                              ><span className="grid shrink-0"
                                ><span
                                  className="col-start-1 row-start-1 justify-self-end missing-flag opacity-0 transition-opacity duration-300 pre-3:opacity-100"
                                  ><svg className="size-3" aria-hidden="true">
                                    <use href="#i-triangle-alert" /></svg
                                  >{t('105')}</span
                                ><span
                                  className="col-start-1 row-start-1 justify-self-end rounded border border-primary px-1.5 tabular-nums text-sm font-semibold text-ink transition-all duration-700 ease-out-soft delay-0 pre-3:-translate-x-16 pre-3:opacity-0"
                                  >{t('106')}</span
                                ></span
                              >
                            </li>
                            <li
                              className="flex items-center justify-between gap-4 py-3"
                            >
                              <span
                                className="min-w-0 text-base text-muted max-sm:text-sm sm:truncate"
                                ><span>{t('107')}</span
                                ><mark
                                  className="mx-1 inline-block rounded-md bg-primary px-1.5 py-0.5 font-bold text-on-primary transition-all duration-500 ease-out-soft pre-2:bg-card pre-2:font-semibold pre-2:text-muted sm:at-2:scale-125 at-2:shadow-sm sm:at-2:mx-4 sm:at-2:ring-4 at-2:ring-primary/60"
                                  >{t('108')}</mark
                                ><span>{t('109')}</span></span
                              ><span className="grid shrink-0"
                                ><span
                                  className="col-start-1 row-start-1 justify-self-end missing-flag opacity-0 transition-opacity duration-300 pre-3:opacity-100"
                                  ><svg className="size-3" aria-hidden="true">
                                    <use href="#i-triangle-alert" /></svg
                                  >{t('110')}</span
                                ><span
                                  className="col-start-1 row-start-1 justify-self-end rounded border border-primary px-1.5 tabular-nums text-sm font-semibold text-ink transition-all duration-700 ease-out-soft delay-150 pre-3:-translate-x-16 pre-3:opacity-0"
                                  >{t('111')}</span
                                ></span
                              >
                            </li>
                            <li
                              className="flex items-center justify-between gap-4 py-3"
                            >
                              <span
                                className="min-w-0 text-base text-muted max-sm:text-sm sm:truncate"
                                ><span>{t('112')}</span
                                ><mark
                                  className="mx-1 inline-block rounded-md bg-primary px-1.5 py-0.5 font-bold text-on-primary transition-all duration-500 ease-out-soft pre-2:bg-card pre-2:font-semibold pre-2:text-muted sm:at-2:scale-125 at-2:shadow-sm sm:at-2:mx-4 sm:at-2:ring-4 at-2:ring-primary/60"
                                  >15.6</mark
                                ><span>{t('113')}</span></span
                              ><span className="grid shrink-0"
                                ><span
                                  className="col-start-1 row-start-1 justify-self-end missing-flag opacity-0 transition-opacity duration-300 pre-3:opacity-100"
                                  ><svg className="size-3" aria-hidden="true">
                                    <use href="#i-triangle-alert" /></svg
                                  >{t('114')}</span
                                ><span
                                  className="col-start-1 row-start-1 justify-self-end rounded border border-primary px-1.5 tabular-nums text-sm font-semibold text-ink transition-all duration-700 ease-out-soft delay-300 pre-3:-translate-x-16 pre-3:opacity-0"
                                  >{t('115')}</span
                                ></span
                              >
                            </li>
                          </ul>
                        </div>
                        {/* 4–5 shoppers can tell more products apart: 122 → 185 */}
                        <div
                          className="grid gap-3 sm:absolute sm:inset-x-0 sm:bottom-0 sm:grid-cols-2"
                        >
                          <div
                            className="rounded-xl border border-line bg-card shadow-sm p-4 transition-all duration-700 ease-out-soft pre-4:translate-y-6 pre-4:opacity-0"
                          >
                            <p className="eyebrow">{t('116')}</p>
                            <p className="mt-2 flex items-baseline gap-2 tabular-nums">
                              <span
                                className="grid font-display text-3xl font-semibold text-ink"
                                ><span
                                  className="col-start-1 row-start-1 opacity-0 transition-opacity duration-300 pre-5:opacity-100"
                                  >122</span
                                ><span
                                  className="col-start-1 row-start-1 transition-opacity duration-300 delay-300 pre-5:opacity-0"
                                  >185</span
                                ></span
                              ><span className="text-sm text-muted">/ 216</span
                              ><span
                                className="ml-auto rounded-full bg-success-bg px-2 py-0.5 text-xs font-semibold text-success transition-all duration-500 delay-700 pre-5:scale-90 pre-5:opacity-0"
                                >{t('117')}</span
                              >
                            </p>
                            <div className="mt-3 h-2 rounded-full bg-surface-1">
                              <div
                                className="h-full w-185/216 rounded-full bg-chart-main transition-all duration-1000 ease-out-soft pre-5:w-122/216"
                              ></div>
                            </div>
                          </div>
                          {/* 6 re-measured and verified */}
                          <div
                            className="rounded-xl border border-line bg-card shadow-sm p-4 transition-all duration-700 ease-out-soft pre-6:translate-y-6 pre-6:opacity-0"
                          >
                            <p className="eyebrow">{t('118')}</p>
                            <p className="mt-2 flex items-baseline gap-2 tabular-nums">
                              <span
                                className="font-display text-3xl font-semibold text-ink"
                                >216</span
                              ><span className="text-sm text-muted"
                                >{t('119')}</span
                              >
                            </p>
                            <div className="mt-3 h-2 rounded-full bg-surface-1">
                              <div
                                className="h-full w-full rounded-full bg-chart-main transition-all duration-1000 ease-out-soft delay-300 pre-6:w-136/216"
                              ></div>
                            </div>
                            <span
                              className="mt-3 badge-success transition-all duration-500 delay-1000 pre-6:scale-90 pre-6:opacity-0"
                              ><svg className="size-3" aria-hidden="true">
                                <use href="#i-check" /></svg
                              >{t('120')}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>
  );
}
