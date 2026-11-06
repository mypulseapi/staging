# Pulse — thepulseapi.com

The public website for **Pulse**, at [thepulseapi.com](https://thepulseapi.com).

## About Pulse

Pulse measures whether a merchant's product data is ready to support the buying decisions their
shoppers are trying to make.

Most tools in this space rank what a shopper sees. Pulse asks the question underneath that one:
can the catalogue answer what the shopper came to find out at all? A shopper leaves without buying
for one of two reasons — either they could not find the product, or the catalogue could not tell
two products apart. The second is larger and almost nobody measures it.

You send one category export and get back the attributes worth recording, ranked by how many
shoppers need them rather than by how empty the column is. The same measurement then runs again on
the repaired export, so a fix can be proved without waiting for traffic. Nothing has to go on the
merchant's site for any of that, and no traffic history is needed.

Two figures from our own measurements, each with the dataset it came from:

- On a **216-product laptop shelf**, 94 products remain indistinguishable after every question a
  shopper could answer, because the attributes that would separate them are recorded nowhere.
- Across a **2,176-product catalogue**, 52.6% of recorded attribute values duplicate what the
  product photograph already shows.

**We publish no conversion or revenue uplift figure.** We have run no live revenue experiment, so
we quote none, and any percentage attributed to us did not come from us. The reasoning is on the
site, at [/why/limits](https://thepulseapi.com/en/why/limits).

Pulse is built by **Resolve Labs**, a small team working on one question: which product
information is worth paying to fix.

|                    |                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------- |
| Website            | [thepulseapi.com](https://thepulseapi.com)                                         |
| Developer handbook | [developer.thepulseapi.com](https://developer.thepulseapi.com)                     |
| Dashboard          | [app.thepulseapi.com](https://app.thepulseapi.com)                                 |
| SDK                | [`@thepulseapi/sdk`](https://www.npmjs.com/package/@thepulseapi/sdk), MIT licensed |
| LinkedIn           | [thepulseapi](https://www.linkedin.com/company/thepulseapi/)                       |

The site is published in **English and Vietnamese**. A bare URL resolves to Vietnamese, because
Vietnam is the market being sold into; `/en` is the English tree.

## This repository

Next.js 16 (App Router) with Tailwind CSS v4 and next-intl, built as a **static export** and
served by GitHub Pages.

```bash
pnpm install
pnpm dev          # http://localhost:3003
pnpm build        # checks, then a static export to ./out
pnpm type-check
pnpm lint
```

`pnpm build` runs five content guards before `next build`: the page catalogue against the
filesystem, placeholder copy, intent ranking, the requirement parser and the semantic fallback. A
page added without a catalogue entry fails the build rather than silently shipping unattributed.

`/mvp` (2026-11-06) is the investor walkthrough: the whole journey, from a store's address through the
AI Shelf Test, the 2×2, a verdict with its evidence, the repair plan and the holdback, on a sample store
with labelled, illustrative figures. It is noindex and out of the sitemap, and is sent by link.

### Configuration

Every origin the site points at is read from the environment; none is hardcoded. See
[`.env.example`](./.env.example) for the full list with the reasoning, and `src/lib/site.ts` for
how it is read.

**A production build with a missing origin fails, naming the variable.** That is deliberate: a
default that is a real production host keeps working when the variable is unset, so the variable
never gets set and some deploy quietly ships the wrong domain. The only defaults in the code are
localhost, for `pnpm dev`.

In CI the values come from repository variables (Settings → Secrets and variables → Actions →
Variables). None of them is a secret; all of them are visible in the shipped HTML.

### Sign-in

Merchants sign in and create accounts in the dashboard, not here: **Sign in** opens
`NEXT_PUBLIC_APP_URL` + `NEXT_PUBLIC_APP_SIGNIN_PATH` (`/sign-in`), and a sign-up link
`NEXT_PUBLIC_APP_SIGNUP_PATH` (`/sign-in?mode=create`). The site's old `/signin`, `/signup`,
`/forgot-password`, `/reset-password` and `/verify-email` forward there, keeping the query, so old
links and emails still work. The requirement and design live in rainbow:
`ODIN/design/01-auth/02-merchant-sign-in/task.md`.

### SEO and AEO

`node scripts/check-seo.mjs` enforces the engineering standard against the **exported HTML** rather
than the source, because every rule in it is about what a crawler receives: a canonical assembled
correctly in TypeScript and dropped by a layout is still a missing canonical. It runs in CI and
covers title and description length and uniqueness, canonicals, the single JSON-LD graph per page,
breadcrumbs, heading flow, indexing policy and the crawl files.

Structured data is built in `src/lib/schema.ts` and emitted once per page by `<PageSchema>`. The
layout deliberately emits none: nodes in separate `ld+json` blocks cannot reference each other by
`@id`, so a layout-level graph plus a page-level graph loses the relationships answer engines use
to resolve who published what.

### Deployment

**feature branch → `develop` → `main`.** Work lands on `develop` first. Merging `develop` into
`main` is the release: that is what builds and publishes to GitHub Pages. A push to `develop`
deploys nothing, which is the point.

Both branches are protected. Deletion and force-push are blocked and a pull request is required
with review threads resolved. `develop` requires `Lint` and `Type check`; `main` requires those
plus `Build site` and `Source branch`, which refuses any pull request into `main` that does not
come from `develop`. There are no bypass actors, so this applies to admins too.

The custom domain comes from the `PAGES_CUSTOM_DOMAIN` variable and is written to `out/CNAME` at
build time rather than committed, so moving the site between hostnames is a settings change.

### What is not here

GitHub Pages serves files and runs no server, so the four form-handling routes and the i18n
middleware this app used to have are gone. [`legacy/README.md`](./legacy/README.md) records what
each did and what replaced it, because each answers a question that will be asked again.

## Licence

The contents of this repository are © Resolve Labs. The published SDK is MIT licensed and lives in
its own package.
