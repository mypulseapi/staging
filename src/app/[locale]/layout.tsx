import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { THEME_SCRIPT } from "@/lib/theme-script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { clientMessages } from "@/i18n/client-namespaces";
import { prepareLocale, setRenderLocale } from "@/i18n/render-locale";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AssistantPanel } from "@/components/assistant/assistant-panel";
import { NavigationProgress } from "@/components/NavigationProgress";
import { PulseAnalytics } from "@/components/PulseAnalytics";
import { IntentPanel } from "@/components/IntentPanel";
import { IconSprite } from "@/components/designed/icon-sprite";
import {
  DesignedFooter,
  DesignedHeader,
  DesignedSkipLink,
} from "@/components/designed/shell";
import { DesignedMotion } from "@/components/designed/motion";

// The typeface, for body and headings alike. Inter above is only the fallback in
// the stack: globals.css sets `--font-sans: var(--font-jakarta)` and every
// font-family rule lists jakarta first.
// Monospace for code/terminal panels.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.www),
  title: {
    // Descriptive first, brand last, matching every other page rather than
    // inverting the pattern on the one page that gets the most traffic.
    default: "Commerce decision intelligence for product data | Pulse",
    template: "%s | Pulse",
  },
  // The entity definition from the SEO/AEO audit (2026-10-26), the same sentence the home page carries.
  description:
    "Pulse measures whether your catalogue holds the evidence shoppers and AI agents need to decide, ranks the data gaps worth fixing, and verifies the repair.",
  keywords: [
    "commerce decision intelligence",
    "product data quality",
    "product data audit",
    "product catalogue audit",
    "missing product attributes",
    "product data enrichment",
    "decision readiness",
    "decision evidence",
    "AI-ready product data",
    "product data for AI shopping agents",
    "decision audit",
  ],
  authors: [{ name: "Pulse" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.www,
    siteName: "Pulse",
    title: "Pulse | Decide what to show, and when to ask",
    description:
      "Is your product data ready to support the decisions shoppers are trying to make? Measured on your own catalogue in 48 hours.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulse | Decide what to show, and when to ask",
    description:
      "Is your product data ready to support the decisions shoppers are trying to make? Measured on your own catalogue in 48 hours.",
  },
  // Staging sets NEXT_PUBLIC_NOINDEX=true: every page says noindex, beside robots.txt's disallow.
  robots:
    process.env.NEXT_PUBLIC_NOINDEX === "true"
      ? { index: false, follow: false }
      : { index: true, follow: true },
};

/**
 * Built from the declared origins rather than written out, so adding a service to `SITE` cannot
 * leave it blocked by a policy nobody remembered to edit.
 */
// Cloudflare Turnstile: the script and the challenge iframe on every form (src/components/Turnstile.tsx).
const TURNSTILE = "https://challenges.cloudflare.com";

const CSP = [
  "default-src 'self'",
  /*
   * `'unsafe-eval'` in development only.
   *
   * Next's dev runtime compiles with eval, so without it HMR dies and the console fills with
   * "eval() is not supported in this environment". It is never emitted in a production build --
   * the old header-based CSP made the same exception for the same reason, and it was lost in the
   * move to a meta tag.
   */
  `script-src 'self' 'unsafe-inline' ${TURNSTILE}${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
  // Turnstile renders its challenge in an iframe; without this the forms post an empty token.
  `frame-src ${TURNSTILE}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://images.unsplash.com ${SITE.cdn}`,
  "font-src 'self' data:",
  // Deduped: auth and api are usually the same host, and a repeated origin in a CSP is noise
  // that makes a real one harder to spot when something is blocked.
  `connect-src 'self' ${[...new Set([SITE.api, SITE.auth, SITE.cdn])].join(" ")}`,
  "base-uri 'self'",
  // The forms post to the gateway now, so it has to be allowed as a form target.
  `form-action 'self' ${SITE.api}`,
  "object-src 'none'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate that the incoming locale is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering
  prepareLocale(locale);
  // And the same for every Server Component below, which cannot use next-intl's copy of this:
  // it resolves from a request, and a static export has none. See i18n/render-locale.ts.
  setRenderLocale(locale);

  // Get messages for the locale.
  //
  // The locale is passed explicitly rather than left to `setRequestLocale` above. Without it
  // next-intl resolves `requestLocale` from `headers()`, and a static export has no request:
  // every page then fails to prerender with `dynamic = "error"`, naming headers() and not this.
  const messages = await getMessages({ locale });
  /*
   * Only what the browser needs. The full catalogue is 81KB and it was serialised into every
   * page, so the home page shipped the terms, the GDPR copy and the pricing tiers. A Server
   * Component is already HTML by the time the browser sees it, so only client components can
   * need a message at runtime: see src/i18n/client-namespaces.ts.
   */
  const clientSide = clientMessages(messages as Record<string, unknown>);

  /*
   * `data-scroll-behavior="smooth"` lets Next switch off the stylesheet's `scroll-behavior: smooth`
   * while it scrolls a new page into place. Next 16 stopped doing that by default. Without it, its
   * `scrollTop = 0` animated instead of jumping, its "is the page visible yet" check ran mid-scroll
   * and failed, and it fell back to `scrollIntoView()`, which put the page top under the sticky
   * header: every page opened from a scrolled position landed 69px down, hero title clipped.
   */
  return (
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/*
            The Content-Security-Policy, as a meta tag rather than a response header.
            GitHub Pages serves files and sets no custom headers, so the only CSP this site can
            carry is one inside the document. See next.config.ts for the full accounting; in
            short, `frame-ancestors` and `Permissions-Policy` are header-only by specification and
            do not survive the move, so this site is now framable where it was DENY.
            What it still covers is the one that matters most, script-src.

            `'unsafe-inline'` stays in script-src, measured rather than lazy: App Router streaming
            emits around twenty inline `__next_f.push(...)` bootstrap scripts per page, different
            on every page, so no set of hashes can cover them. A strict policy blocks the payload
            and the page dies with React #412. It stays in style-src because this codebase styles
            with the React `style` prop in hundreds of places, and every one of those is an inline
            style attribute.

            The origins are interpolated from SITE so this policy cannot drift from what the app
            actually talks to -- the failure mode of a hand-maintained list is a blocked fetch in
            production and a green build. */}
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        {/* Shared with src/lib/theme-script.ts: why it is inline, and why that is survivable. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {/*
            Fetch the motion script in parallel with hydration, not after it.

            `DesignedMotion` loads it with `afterInteractive`, so the browser does not even ask
            for the file until React has hydrated. On a warm cache that is invisible; on a first
            visit it is the reported bug, that the animations, the revenue calculator and the
            hero only run after a refresh. A refresh is exactly the case where the file is
            already cached and therefore runs at once.

            A preload does not change when the script executes, only when it arrives, so the
            ordering `DesignedMotion` depends on is untouched. By the time `afterInteractive`
            runs it, the bytes are already here. */}
        <link
          rel="preload"
          as="script"
          href="/designed-motion.js"
          fetchPriority="low"
        />
        {/* No JSON-LD here, deliberately. The standard requires exactly one ld+json block per
            document holding a single @graph, because nodes in separate blocks cannot reference
            each other by @id. A layout cannot know the page's own nodes, so the whole graph is
            built per page through <PageSchema />. See src/lib/schema.ts. */}
      </head>
      <body className="antialiased min-h-screen">
        {/*
            `locale` is passed explicitly. Without it next-intl resolves the locale on the server
            through `getLocale()`, which reads the request config and ends at `headers()`. A
            static export has no request, so every page in the site failed to prerender -- and the
            error names headers() rather than this line, which is why it reads as 139 unrelated
            failures instead of one. */}
        {/* 43 symbols, defined once. Every designed page references them by `<use href="#i-...">`,
            so this has to be in the document before any of them render. */}
        <IconSprite />
        <NextIntlClientProvider locale={locale} messages={clientSide}>
          <ThemeProvider>
            <Suspense fallback={null}>
              <NavigationProgress />
            </Suspense>
            <DesignedSkipLink />
            <DesignedHeader />
            <main id="main">{children}</main>
            {/* B4: ordered by what this visit has not answered. Renders nothing when nothing is. */}
            <Suspense fallback={null}></Suspense>
            <DesignedFooter />
            {/* Ask Pulse, on every page and in both languages. This replaces the designer's
                static chat shell from chat.html, which had the panel but nothing behind it. */}
            <AssistantPanel lang={locale === "vi" ? "vi" : "en"} />
            {/* The motion the designer's markup declares through data attributes. Without it every
                `.reveal` stays at opacity 0, which is 363 elements across the converted pages. */}
            <DesignedMotion />
            {/* B6: shows the inference and lets the visitor correct it. */}
            <Suspense fallback={null}>
              <IntentPanel />
            </Suspense>
            {/* B1: the site emits. Renders nothing when unconfigured. */}
            <Suspense fallback={null}>
              <PulseAnalytics />
            </Suspense>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
