import {
  Filter,
  Gauge,
  Bot,
  TrendingUp,
  Megaphone,
  Store,
  Boxes,
  Plane,
  Binary,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { byLocale } from "./locale";
import { BLOG_VI } from "./blog.vi";

/**
 * The notes.
 *
 * What was here before was five posts of invented statistics: "31% average lift
 * in first-time visitor conversion", "45% increase in average order value",
 * "2x improvement in product discovery". None of those was measured, by us or
 * by anybody, and they sat on the same site as /why/limits, which says in as
 * many words that we have no uplift figure. That is the contradiction a careful
 * buyer finds, and once they find it nothing else on the site survives it.
 *
 * So every number in these ten pieces is somebody else's published research,
 * attributed inline and linked in `sources`. Where a figure comes from a vendor
 * rather than from independent research, the sentence says so, because a vendor
 * reporting on the thing it sells is a different class of evidence.
 *
 * The only first-party figures are the laptop shelf: 216 products, 32 stated
 * requirements, 94 unresolved, 161 of 216 recoverable from titles. Those are
 * reproducible from the repository with the command on /why/method, and they
 * are always labelled as ours.
 *
 * Translated, headline and body together. The earlier note here said these were English only on
 * the grounds that a Vietnamese headline over an English body is worse than leaving it alone,
 * which was true of a half translation and is no longer the situation: `blog.vi.ts` carries every
 * string in these ten pieces, and `articles()` returns them for the active locale.
 *
 * Attributions are deliberately NOT translated. "Baymard Institute, 2019" is the name of a
 * published source, and a reader checking the citation needs the name that was published.
 */
/**
 * Charts are blocks, not decoration bolted on afterwards.
 *
 * Every one carries its own source, because a chart without an attribution is
 * the same problem the old posts had. The form is chosen per job: bar for
 * magnitude across categories, dumbbell for a before and after on one measure,
 * waffle for a share of a whole, trend for change over time, figure for a
 * single number that is not a chart at all.
 */
export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "quote"; text: string }
  | { t: "stat"; value: string; label: string; source: string }
  | {
      t: "bar";
      title: string;
      source: string;
      note?: string;
      suffix?: string;
      max?: number;
      data: {
        label: string;
        value: number;
        tone?: "good" | "work" | "warn" | "base";
        suffix?: string;
      }[];
    }
  | {
      t: "dumbbell";
      title: string;
      source: string;
      note?: string;
      suffix?: string;
      beforeLabel?: string;
      afterLabel?: string;
      rows: { label: string; before: number; after: number }[];
    }
  | {
      t: "waffle";
      title: string;
      source: string;
      note?: string;
      percent: number;
      label: string;
      rest: string;
      tone?: "good" | "work" | "warn" | "base";
    }
  | {
      t: "trend";
      title: string;
      source: string;
      note?: string;
      suffix?: string;
      valueLabel?: string;
      points: { x: string; y: number }[];
    }
  | {
      t: "figure";
      value: number;
      unit?: string;
      label: string;
      source: string;
      tone?: "good" | "work" | "warn" | "base";
    };

export interface Article {
  slug: string;
  /** Which generative hero mark this article gets. See `ArticleArt`. */
  art: "grid" | "rise" | "split" | "scan" | "stack" | "seal";
  title: string;
  excerpt: string;
  /**
   * Short forms for the SERP, where the headline and the excerpt are too long.
   *
   * A good headline and a good title tag are different jobs: the headline has the whole page
   * underneath it, the title tag has 60 characters and competes in a list. Rather than shorten
   * the headline, which is what a reader sees, these carry the compressed version and the page
   * keeps its own. `metaTitle` must leave room for the " | Pulse" template, so 52 characters.
   */
  metaTitle?: string;
  metaDescription?: string;
  category: string;
  icon: LucideIcon;
  readTime: string;
  date: string;
  /** ISO, for <time> and for Article schema. */
  iso: string;
  blocks: Block[];
  sources: { label: string; href: string }[];
  /** Sector slug this supports, where there is one. Drives the related link. */
  sector?: string;
}

export const ARTICLES: Article[] = [
  {
    slug: "filters-that-do-not-exist",
    art: "grid",
    title: "38% of ecommerce sites cannot filter on what they already show you",
    excerpt:
      "Baymard tested 170+ leading retailers and found more than a third display product information they provide no filter for. The gap is not a UI problem. It is a catalogue problem wearing a UI costume.",
    metaTitle: "38% of sites cannot filter what they show",
    metaDescription:
      "Baymard tested 170+ leading retailers and found a third display product information they offer no filter for. A catalogue problem in a UI costume.",
    category: "Research",
    icon: Filter,
    readTime: "7 min read",
    date: "18 September 2026",
    iso: "2026-09-18",
    sector: "ecommerce",
    blocks: [
      {
        t: "p",
        text: "There is a specific failure that every merchandiser has watched happen and almost nobody has a name for. A shopper lands on a category, sees a product attribute printed on the card, tries to filter by it, and finds the filter is not there. They were shown the fact and then denied the ability to use it.",
      },
      {
        t: "stat",
        value: "38%",
        label:
          "of tested sites do not offer filters for all the list item information they display",
        source: "Baymard Institute",
      },
      {
        t: "p",
        text: "Baymard Institute puts a number on it. In their product list and filtering research, 38% of sites fail to provide filters for information they already display on the list item, which they identify as a direct cause of abandonment. This is not a survey of small merchants: their 2025 benchmark covers 21,000+ manually reviewed parameters across 170+ leading ecommerce sites in the US and Europe, built on more than 200,000 hours of usability research.",
      },
      {
        t: "waffle",
        percent: 38,
        tone: "warn",
        label:
          "of tested sites offer no filter for information they already display",
        rest: "offer filters for what they display",
        title: "Sites that display an attribute and then cannot filter on it",
        source: "Baymard Institute, product list and filtering benchmark",
        note: "Baymard identify this as a direct cause of abandonment. The benchmark covers 21,000+ manually reviewed parameters across 170+ leading US and European retailers.",
      },
      { t: "h", text: "Why this is a data problem, not a design one" },
      {
        t: "p",
        text: "The instinct is to treat it as a front-end oversight. Somebody forgot to add the filter. Occasionally that is true, and it is a good afternoon's work when it is.",
      },
      {
        t: "p",
        text: "More often the filter is missing because it could not be built. A filter needs a structured value on every product in the set, and what is printed on the card is frequently derived from a description rather than read from a field. The fact is visible because a template rendered a sentence. It is not filterable because there is nothing to compare.",
      },
      {
        t: "quote",
        text: "The attribute is on the page and not in the schema. A human reads it. A filter cannot.",
      },
      { t: "h", text: "The measurement problem underneath" },
      {
        t: "p",
        text: "Say you accept the diagnosis and decide to fix it. Which attribute do you structure first?",
      },
      {
        t: "p",
        text: "The usual answer is to rank by how empty each field is, because that is the number a completeness report gives you. That ranking is close to arbitrary for this purpose. A field that is 90% empty and that nobody chooses on is worth less than a field that is 40% empty and decides every purchase in the category.",
      },
      {
        t: "p",
        text: "On a 216-product test shelf we built ourselves, ranking by absence and ranking by what shoppers said they needed disagreed completely. Processor was missing on 162 of 216 products, which put it third by absence. Only 2 of 32 stated buying requirements mentioned a processor at all, which put it last by demand. Storage and processor traded places, and fixing processor first would have been the most expensive way to change nothing.",
      },
      {
        t: "stat",
        value: "94 of 216",
        label:
          "products on that shelf still indistinguishable after every question the catalogue could answer",
        source: "our own measurement, reproducible from the repository",
      },
      { t: "h", text: "What to do about it this quarter" },
      {
        t: "ul",
        items: [
          "Open your worst-performing category as a shopper, not as an admin, and try to narrow it the way a buyer would",
          "List the attributes printed on the card that you cannot filter on. That list is usually shorter and more actionable than a completeness report",
          "Rank that list by whether a purchase decision turns on it, not by how empty it is",
          "Check how much of it is recoverable from your own product titles before you budget for acquisition",
        ],
      },
      {
        t: "p",
        text: "That last point is the one that changes project sizing. On our test shelf, storage was sitting in the product titles for 161 of 216 products, recoverable with a script. A quarter-long enrichment programme and a week of extraction look identical on a completeness dashboard and cost very different amounts.",
      },
    ],
    sources: [
      {
        label:
          "Baymard Institute: Have Filters for All Displayed List Item Info (38% Don't)",
        href: "https://baymard.com/blog/have-filters-for-list-item-info",
      },
      {
        label: "Baymard Institute: E-Commerce Product Lists & Filtering UX",
        href: "https://baymard.com/research/ecommerce-product-lists",
      },
    ],
  },
  {
    slug: "completeness-is-not-readiness",
    art: "stack",
    title: "Your PIM says 93% complete. Your shoppers still cannot choose.",
    excerpt:
      "Completeness measures whether the fields you defined are filled. It cannot tell you whether you defined the right fields, and the difference is where discovery quietly fails.",
    metaTitle: "93% complete, and shoppers still cannot choose",
    metaDescription:
      "Completeness measures whether the fields you defined are filled. It cannot say whether you defined the right ones, and that gap is where discovery fails.",
    category: "Product data",
    icon: Gauge,
    readTime: "6 min read",
    date: "11 September 2026",
    iso: "2026-09-11",
    sector: "ecommerce",
    blocks: [
      {
        t: "p",
        text: "Completeness is the most reassuring metric in product data and one of the least informative. It answers a question about your schema: of the fields you decided to have, how many are populated? It cannot answer the question you actually care about, which is whether those were the fields worth having.",
      },
      {
        t: "p",
        text: "A schema that never asked for screen size cannot report screen size as missing. The gap does not appear anywhere in the reporting, because from the schema's point of view there is no gap. That is how a catalogue reaches 93% complete and still fails the shopper who knows exactly what they want.",
      },
      { t: "h", text: "What shoppers say about it" },
      {
        t: "p",
        text: "Akeneo's 2025 PX Pulse survey found the share of consumers frustrated by incomplete or unclear product descriptions rose to 34%, up from 28% the year before. That is a vendor's survey and worth reading as such, but the direction is consistent with the usability research: the problem is getting worse as catalogues get deeper.",
      },
      {
        t: "stat",
        value: "34%",
        label:
          "of consumers frustrated by incomplete or unclear product information, up from 28% a year earlier",
        source: "Akeneo PX Pulse 2025",
      },
      {
        t: "bar",
        suffix: "",
        title: "Two ways of scoring the same test shelf",
        source: "our own measurement, reproducible from the repository",
        max: 216,
        data: [
          {
            label: "Products on the shelf",
            value: 216,
            tone: "base",
            suffix: "",
          },
          {
            label: "Fields populated (93.1%)",
            value: 201,
            tone: "good",
            suffix: "",
          },
          {
            label: "Still indistinguishable",
            value: 94,
            tone: "warn",
            suffix: "",
          },
        ],
        note: "Completeness counts the middle bar. A shopper experiences the bottom one.",
      },
      { t: "h", text: "Readiness asks a different question" },
      {
        t: "p",
        text: "Instead of asking how full the fields are, ask this: after every question your catalogue can currently answer, how many products is a shopper still choosing between?",
      },
      {
        t: "p",
        text: "That number has a property completeness does not. It gets worse when you add products without adding facts, which is what actually happens as a range grows. And it improves only when you record something a decision turns on, which is exactly the behaviour you want from a metric that is supposed to direct work.",
      },
      {
        t: "p",
        text: "On our test shelf, the catalogue scored 93.1% complete and still left 94 of its 216 products indistinguishable once every question it supported had been answered. Both numbers describe the same shelf. Only one of them describes the shopper's experience of it.",
      },
      { t: "h", text: "Why this is not an argument against your PIM" },
      {
        t: "p",
        text: "A PIM governs, enriches and distributes product information, and it does that well. Completeness is the right metric for the job a PIM is doing: it tells you whether the process is running. It was never designed to tell you whether the schema is right, and holding it to that is unfair to a tool that is doing what it was built for.",
      },
      {
        t: "quote",
        text: "Completeness is a process metric. Readiness is an outcome metric. Reporting the first and managing to the second is the mismatch.",
      },
      {
        t: "p",
        text: "The practical consequence is that the priority list has to come from somewhere else, and then go into the PIM as work. Not instead of it.",
      },
    ],
    sources: [
      {
        label:
          "Akeneo: Shoppers Value Transparency and Detailed Product Information (PX Pulse 2025)",
        href: "https://www.akeneo.com/press-release/shoppers-value-transparency-and-detailed-product-information-this-holiday-season/",
      },
      {
        label: "Baymard Institute: Product List UX best practices",
        href: "https://baymard.com/blog/current-state-product-list-and-filtering",
      },
    ],
  },
  {
    slug: "machine-readable-catalogue",
    art: "scan",
    title: "79% of product pages do not ship a full set of structured data",
    excerpt:
      "Adobe scored US retail product pages at 66% machine readability, the lowest of any page type. Product pages are exactly where the comparison detail an agent needs is supposed to live.",
    metaTitle: "79% of pages do not ship full structured data",
    metaDescription:
      "Adobe scored US retail product pages at 66% machine readability, the lowest of any page type, and that is where an agent looks for comparison detail.",
    category: "Agentic commerce",
    icon: Bot,
    readTime: "8 min read",
    date: "4 September 2026",
    iso: "2026-09-04",
    sector: "ai-tools",
    blocks: [
      {
        t: "p",
        text: "There is an uncomfortable asymmetry in how retail sites are built. The pages that carry the least decision detail are the best structured, and the page that carries all of it is the worst.",
      },
      {
        t: "stat",
        value: "66%",
        label:
          "average machine readability of US retail product pages, against 75% for homepages and 74% for category pages",
        source: "Adobe Analytics",
      },
      {
        t: "p",
        text: "Adobe's research across the US retail sector scored product pages lowest of any page type on machine readability. They also found that 79% of product pages do not ship a full set of structured data, and that the spread is enormous: the best-performing sites averaged 82.5% while the lowest averaged 54.2%.",
      },
      {
        t: "p",
        text: "Some of the specifics are stark. Only 5% of sites state shipping terms in a machine-readable way, and only 4% state return terms. Those are two of the facts a buyer most often decides on, and almost nobody publishes them in a form anything but a human can read.",
      },
      {
        t: "bar",
        title: "Machine readability by page type, US retail",
        source: "Adobe Analytics",
        max: 100,
        data: [
          { label: "Homepages", value: 75, tone: "base" },
          { label: "Category pages", value: 74, tone: "base" },
          { label: "Product pages", value: 66, tone: "warn" },
        ],
        note: "The page carrying all the comparison detail scores lowest. Adobe also report a spread from 82.5% at the best sites to 54.2% at the worst.",
      },
      {
        t: "bar",
        title: "Share of sites stating these terms in a machine-readable way",
        source: "Adobe Analytics",
        max: 100,
        data: [
          { label: "Shipping terms", value: 5, tone: "warn" },
          { label: "Return terms", value: 4, tone: "warn" },
        ],
        note: "Two of the facts buyers most often decide on, and almost nobody publishes them in a form anything but a human can read.",
      },
      { t: "h", text: "Why the product page is the hard one" },
      {
        t: "p",
        text: "A homepage has a handful of things on it and they are mostly navigational, so marking them up is tractable. A product page has to express everything that distinguishes one item from a near-identical one, and most of that distinguishing detail was written as prose because prose is what sells.",
      },
      {
        t: "p",
        text: "So the richer your product copy, the larger the gap between what you have said and what a structured consumer can use. A beautifully written description is an asset to a human reader and invisible to an agent applying a filter.",
      },
      { t: "h", text: "Structured data is downstream of recorded data" },
      {
        t: "p",
        text: "It is tempting to treat this as a markup task: add the schema, ship the JSON-LD, done. That works for the fields you hold. It does nothing for the fields you never recorded, and those are the ones that decide comparisons.",
      },
      {
        t: "quote",
        text: "You cannot mark up a fact you do not have. Schema coverage is capped by attribute coverage.",
      },
      {
        t: "p",
        text: "Which puts the work in an order: find out which attributes a decision in your category actually turns on, check which of those you record, recover what is recoverable from the text you already publish, and only then argue about markup. Doing markup first produces a well-structured statement of the things you happened to have.",
      },
      { t: "h", text: "What to check on your own catalogue" },
      {
        t: "ul",
        items: [
          "Take one category and list the constraints a buyer would filter on. Not the fields you have, the constraints they have",
          "For each, check whether it exists as a value rather than as a sentence in the description",
          "For the ones that are sentences, that is extraction work and it is usually cheap",
          "For the ones that are absent entirely, that is acquisition, and knowing which is which before you commit is most of the value",
        ],
      },
    ],
    sources: [
      {
        label:
          "Adobe: AI traffic grows but retail sites lag in AI search visibility",
        href: "https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable",
      },
      {
        label:
          "Adobe Blog: Generative AI-powered shopping rises with traffic to retail sites",
        href: "https://business.adobe.com/blog/generative-ai-powered-shopping-rises-with-traffic-to-retail-sites",
      },
    ],
  },
  {
    slug: "ai-traffic-converts-better-now",
    art: "rise",
    title:
      "AI-referred traffic went from converting 38% worse to 42% better in a year",
    excerpt:
      "Adobe's figures show the reversal clearly, and Salesforce put AI agents behind more than a fifth of holiday retail sales. Both numbers raise the same question about your catalogue.",
    metaTitle: "AI traffic went from 38% worse to 42% better",
    metaDescription:
      "Adobe's figures show the reversal, and Salesforce put AI agents behind more than a fifth of holiday retail sales. Both raise one catalogue question.",
    category: "Agentic commerce",
    icon: TrendingUp,
    readTime: "7 min read",
    date: "28 August 2026",
    iso: "2026-08-28",
    sector: "ai-tools",
    blocks: [
      {
        t: "p",
        text: "For most of 2025 the reasonable position on AI-referred retail traffic was that it was growing fast and converting badly, which is the signature of curiosity rather than intent. That is no longer the position.",
      },
      {
        t: "stat",
        value: "+393%",
        label:
          "year-on-year growth in AI-driven traffic to US retail sites in Q1 2026",
        source: "Adobe Analytics",
      },
      {
        t: "p",
        text: "Adobe reports AI-driven traffic to US retail sites up 393% year on year in the first quarter of 2026, following a 693% year-on-year increase over the 2025 holiday period. Growth at that rate would be interesting on its own. What changed is the quality.",
      },
      {
        t: "p",
        text: "In March 2025, AI-referred traffic converted 38% worse than non-AI traffic. In March 2026, it converted 42% better. Adobe also reports these visitors engaging 12% more, spending 48% longer on site, viewing 13% more pages, and generating 37% higher revenue per visit.",
      },
      {
        t: "p",
        text: "Separately, Salesforce estimated that AI agents influenced more than 20% of global online retail sales during the 2025 holiday season.",
      },
      {
        t: "dumbbell",
        suffix: "%",
        beforeLabel: "March 2025",
        afterLabel: "March 2026",
        title: "How AI-referred retail traffic performs against non-AI traffic",
        source: "Adobe Analytics",
        rows: [
          {
            label: "Conversion rate, relative to non-AI traffic",
            before: -38,
            after: 42,
          },
        ],
        note: "A reversal of 80 points in twelve months. Adobe also report engagement up 12%, time on site up 48%, pages per visit up 13% and revenue per visit up 37%.",
      },
      {
        t: "figure",
        value: 393,
        unit: "%",
        tone: "work",
        label:
          "year-on-year growth in AI-driven traffic to US retail sites, Q1 2026",
        source: "Adobe Analytics",
      },
      { t: "h", text: "What that changes for product data" },
      {
        t: "p",
        text: "A visitor who arrives through an assistant has usually had a set of constraints applied on their behalf before they ever see your page. They are further down the decision than organic traffic, which is a plausible reason for the conversion reversal.",
      },
      {
        t: "p",
        text: "It also means the filtering happened somewhere you cannot see, against whatever attributes were available. If a constraint could not be evaluated against your product, your product was not in the set that got shown. There is no partial credit and no benefit of the doubt: an agent applying a filter treats a missing value as not qualifying, because that is the safe behaviour for it.",
      },
      {
        t: "quote",
        text: "A shopper might read your description and infer the screen size. An agent asked to filter on it drops you and moves on.",
      },
      { t: "h", text: "The honest limit of this argument" },
      {
        t: "p",
        text: "We cannot tell you what share of agent traffic you are currently losing to unrecorded attributes, and neither can anybody else, because the filtering is not observable from your side. Anyone quoting you a recovery figure for this is guessing.",
      },
      {
        t: "p",
        text: "What is checkable is the input. You can establish which constraints buyers in your category apply, which of those your catalogue can answer, and how many of the gaps are recoverable from text you already publish. That is a measurement rather than a projection, and it is available without waiting for anything.",
      },
    ],
    sources: [
      {
        label:
          "Adobe: AI-driven traffic surges across industries, retail sees biggest gains",
        href: "https://business.adobe.com/blog/ai-driven-traffic-surges-across-industries",
      },
      {
        label: "TechCrunch: AI traffic to US retailers rose 393% in Q1",
        href: "https://techcrunch.com/2026/04/16/ai-traffic-to-us-retailers-rose-393-in-q1-and-its-boosting-their-revenue-too/",
      },
      {
        label:
          "Digital Commerce 360: Adobe says AI-referred traffic to retail sites doubles in a year",
        href: "https://www.digitalcommerce360.com/2026/06/17/adobe-ai-referred-traffic-to-retail-sites-doubles-in-a-year/",
      },
    ],
  },
  {
    slug: "feed-attributes-and-shopping-ads",
    art: "split",
    title:
      "Shopping ads are most of retail search spend, and your feed decides what they match",
    excerpt:
      "76% of retail search ad spend goes to Shopping formats. Those formats match on feed attributes, which makes a missing field a bidding problem you cannot fix by bidding.",
    metaTitle: "Your feed decides what Shopping ads match",
    metaDescription:
      "76% of retail search ad spend goes to Shopping formats. They match on feed attributes, so a missing field is a bidding problem bidding cannot fix.",
    category: "Paid media",
    icon: Megaphone,
    readTime: "7 min read",
    date: "21 August 2026",
    iso: "2026-08-21",
    sector: "advertising",
    blocks: [
      {
        t: "p",
        text: "Shopping formats now take the large majority of retail search spend: 76% of retail search ad budget, and 85% of clicks on retail ads, go to Shopping rather than to text ads. That concentration means the mechanism those formats use to decide what you match against is worth understanding precisely.",
      },
      {
        t: "p",
        text: "The mechanism is your product feed. Not your landing page, not your ad copy, not your bidding strategy. A query is matched against the attributes in the feed, and a field you never recorded is a set of queries you cannot be matched to.",
      },
      {
        t: "stat",
        value: "76%",
        label:
          "of retail search ad spend goes to Shopping formats, which match on feed attributes",
        source: "industry reporting on Google Ads retail spend",
      },
      {
        t: "bar",
        title: "Where retail search money and clicks actually go",
        source: "industry reporting on Google Ads retail spend",
        max: 100,
        data: [
          { label: "Retail search spend on Shopping", value: 76, tone: "work" },
          { label: "Retail ad clicks from Shopping", value: 85, tone: "work" },
        ],
        note: "Both are matched on feed attributes rather than on ad copy or landing page.",
      },
      { t: "h", text: "The expensive half is the one that looks fine" },
      {
        t: "p",
        text: "There are two outcomes when a high-intent query names an attribute your feed does not carry. The first is that you are not matched at all, which costs you the impression and is invisible. The second is that you get matched loosely against a broader query, and you pay for a click from somebody looking for something else.",
      },
      {
        t: "p",
        text: "The second outcome is the problem, and campaign reporting cannot distinguish it from ordinary underperformance. It arrives as a click that did not convert. The natural response is to adjust bids and tighten negatives, neither of which touches the cause.",
      },
      {
        t: "quote",
        text: "A missing feed attribute does not look like a data problem in your reporting. It looks like a click that did not convert.",
      },
      { t: "h", text: "What the platforms say about identifiers" },
      {
        t: "p",
        text: "Google reports that retailers who added correct GTINs to their product data saw a 20% increase in clicks on average. Agency analyses of feed optimisation programmes report larger effects, including a roughly 70% ROAS improvement and 4.4% CTR growth in one published case, though those come from practitioners describing their own work and should be read with that in mind.",
      },
      {
        t: "p",
        text: "The point is not the specific numbers. It is that the lever sits upstream of everything a paid media team normally controls.",
      },
      { t: "h", text: "Disapprovals first, then the quiet gaps" },
      {
        t: "p",
        text: "Feed disapprovals and limited-performance warnings should be cleared first, because they are binary and the platform tells you about them. What the platform cannot tell you is which of the attributes it permits to be empty are the ones buyers in your category actually decide on.",
      },
      {
        t: "p",
        text: "A feed can be fully approved, carry no warnings, and still be unable to answer the queries worth winning. Ranking the optional fields by what they would be worth, rather than by whether they are flagged, is the part nobody's dashboard does.",
      },
    ],
    sources: [
      {
        label:
          "Google Merchant Center Help: Tips to optimize your product data",
        href: "https://support.google.com/merchants/answer/7380908?hl=en",
      },
      {
        label:
          "Verde Media: Google Shopping feed quality and its impact on ad performance",
        href: "https://verdemedia.com/blog/google-product-feed-quality",
      },
      {
        label: "Out-Bloom: Navigating Google Shopping Ads in 2025",
        href: "https://www.out-bloom.com/paid-search/navigating-google-shopping-ads-in-2025/",
      },
    ],
  },
  {
    slug: "marketplace-coverage-hides-the-drop",
    art: "grid",
    title:
      "Catalogue-wide coverage cannot tell you a seller just broke a category",
    excerpt:
      "Onboard four thousand listings into a million-listing marketplace and coverage barely moves. The category those listings landed in can become unshoppable and nothing in the reporting says so.",
    metaTitle: "Coverage cannot tell you a category broke",
    metaDescription:
      "Onboard four thousand listings into a million-listing marketplace and coverage barely moves. The category they landed in can go unshoppable in silence.",
    category: "Marketplaces",
    icon: Store,
    readTime: "6 min read",
    date: "14 August 2026",
    iso: "2026-08-14",
    sector: "marketplaces",
    blocks: [
      {
        t: "p",
        text: "Averages hide distributions. That is a truism everywhere and it has a specific, expensive consequence on a marketplace.",
      },
      {
        t: "p",
        text: "Coverage reported across the whole catalogue takes a seller who fills every field and a seller who filled three, and returns a number in the middle. Onboard a large seller whose listings are thin and the whole-catalogue figure moves by a fraction of a percent, because four thousand listings against a million is noise. The category those listings landed in is now materially worse.",
      },
      {
        t: "quote",
        text: "Coverage averaged across a million listings cannot tell you that one seller just made a category unshoppable.",
      },
      {
        t: "bar",
        suffix: "",
        title:
          "What a four-thousand-listing onboarding does to two different numbers",
        source: "illustrative, on a one-million-listing catalogue",
        max: 100,
        data: [
          {
            label: "Whole-catalogue coverage",
            value: 1,
            tone: "base",
            suffix: " pt drop",
          },
          {
            label: "That category's coverage",
            value: 31,
            tone: "warn",
            suffix: " pt drop",
          },
        ],
        note: "Same event, two numbers. Only one of them is the one a buyer experiences, and it is not the one on the dashboard.",
      },
      { t: "h", text: "The buyer notices before the reporting does" },
      {
        t: "p",
        text: "What the buyer experiences is a filter that stopped working. They narrow by material in a category that was fine last month, and now a third of the results have no material recorded. Either those listings vanish from the filtered set, which makes your inventory look thin, or the filter is quietly widened to keep them, which makes it look broken. Both teach the same lesson, which is that the filters on this marketplace are not to be trusted.",
      },
      {
        t: "p",
        text: "This matters more here than on a single-brand catalogue because you do not control who writes the data. A retailer with a coverage problem has a process problem it can fix internally. A marketplace has thousands of independent parties each making their own decision about how much effort to spend on a listing.",
      },
      { t: "h", text: "Measure where the buyer shops" },
      {
        t: "p",
        text: "The unit of measurement has to match the unit of the experience. A buyer does not shop your catalogue, they shop a category, so coverage has to be computed per category and attributed back to the sellers inside it.",
      },
      {
        t: "ul",
        items: [
          "Per category, not per catalogue, because that is the set a filter operates on",
          "Attributed per seller, so an onboarding event is visible as a cause rather than as a mystery",
          "Weighted by whether a purchase in that category turns on the attribute, so effort goes to the three fields that matter rather than to every empty cell",
          "Tracked over time, because the failure mode here is a step change on a Tuesday rather than a gradual decline",
        ],
      },
      { t: "h", text: "What sellers actually respond to" },
      {
        t: "p",
        text: "Generic completeness nudges get ignored, and reasonably so: they treat every empty field as equally urgent, which is obviously untrue and the seller knows it. A request for three named fields, in one category, with a reason attached, is a different message and it gets acted on.",
      },
      {
        t: "p",
        text: "Producing that message requires knowing which three, which is a ranking problem rather than a reporting one.",
      },
    ],
    sources: [
      {
        label:
          "Baymard Institute: E-Commerce Product Lists & Filtering UX research",
        href: "https://baymard.com/research/ecommerce-product-lists",
      },
      {
        label: "Akeneo PX Pulse 2025 on product information and consumer trust",
        href: "https://www.akeneo.com/press-release/shoppers-value-transparency-and-detailed-product-information-this-holiday-season/",
      },
    ],
  },
  {
    slug: "specs-in-pdfs-are-missing-specs",
    art: "scan",
    title:
      "Your specifications are not missing. They are in a PDF, which is the same thing.",
    excerpt:
      "Industrial catalogues were built for buyers who know the part number. Everyone else is filtering on thread size and voltage, and those live in a supplier datasheet nobody mapped.",
    metaTitle: "Specifications in a PDF are missing specifications",
    metaDescription:
      "Industrial catalogues were built for buyers who know the part number. Everyone else filters on thread size and voltage, which sit in an unmapped datasheet.",
    category: "B2B",
    icon: Boxes,
    readTime: "6 min read",
    date: "7 August 2026",
    iso: "2026-08-07",
    sector: "distribution",
    blocks: [
      {
        t: "p",
        text: "Distribution catalogues have a particular origin that still shapes them. They were digitised from printed price lists, and a printed price list is an ordering instrument: it assumes the reader has already decided and needs the code. Search by part number works beautifully because that is the job the structure was built for.",
      },
      {
        t: "p",
        text: "The buyer who has not decided is doing something else entirely. They have a specification to meet, and they are trying to find every part in your range that meets it.",
      },
      { t: "h", text: "Eleven parts fit and the site can show you all eleven" },
      {
        t: "p",
        text: "An engineer needs a valve rated to a pressure, in a thread size. Your catalogue contains eleven that qualify. The website can list them, ordered by part number, and it cannot filter by either of the two properties that decide the purchase.",
      },
      {
        t: "p",
        text: "So they call. The sales desk answers the same specification question repeatedly and files it under service, because the catalogue was never expected to answer it. That is a reasonable thing to believe about a catalogue built from a price list, and it is no longer true about what buyers expect.",
      },
      {
        t: "quote",
        text: "The spec is not missing. It is in a PDF, which is the same as missing to everyone except the person who already knows the part number.",
      },
      { t: "h", text: "Why this sector is the cheapest to fix" },
      {
        t: "p",
        text: "The distinguishing fact about distribution is that the data almost always exists. It arrived with the range, in a supplier datasheet, as a table in a PDF. Nobody mapped it into a field because nobody needed it in a field while part-number search was sufficient.",
      },
      {
        t: "p",
        text: "That makes most of the work mapping rather than acquisition, and the two differ by an order of magnitude in cost. The question worth answering before budgeting is which of your gaps are which.",
      },
      { t: "h", text: "The argument that lands internally" },
      {
        t: "p",
        text: "Specification search is not a better version of part-number search. It serves a different customer: the one evaluating you against an alternative, and the one specifying a new build who has no incumbent relationship with you at all.",
      },
      {
        t: "p",
        text: "Part-number search serves the customers you already have. Specification search is how you get the next ones, and it is also the most direct route to reducing the load on a sales desk that is currently acting as the catalogue's query interface.",
      },
      {
        t: "p",
        text: "We will not put a number on that reduction, because we have not measured one on your traffic. The questions your desk repeats every week are a good place to point the measurement.",
      },
    ],
    sources: [
      {
        label:
          "Catsy: Why unstructured product data makes your B2B catalog invisible to AI shopping agents",
        href: "https://catsy.com/blog/why-unstructured-product-data-makes-your-b2b-catalog-invisible-to-ai-shopping-agents/",
      },
      {
        label: "Baymard Institute: E-Commerce Search Usability research",
        href: "https://baymard.com/research/ecommerce-search",
      },
    ],
  },
  {
    slug: "amenities-written-as-prose",
    art: "grid",
    title: "Travel filters return everything, because almost nothing is tagged",
    excerpt:
      "A traveller who needs step-free access and a cot is reading forty descriptions looking for two sentences. The facts are usually written down. They are just not fields.",
    metaTitle: "Travel filters return almost everything",
    metaDescription:
      "A traveller needing step-free access and a cot reads forty descriptions looking for two sentences. The facts are written down. They are just not fields.",
    category: "Travel",
    icon: Plane,
    readTime: "6 min read",
    date: "31 July 2026",
    iso: "2026-07-31",
    sector: "travel",
    blocks: [
      {
        t: "p",
        text: "Travel inventory is described by people whose job is to make it sound appealing. That produces prose, and prose is the right medium for persuasion and the wrong one for comparison.",
      },
      {
        t: "p",
        text: "The result is a results page where price and star rating are filterable because they are numbers that arrived structured, and everything a traveller actually needs to check is a paragraph.",
      },
      { t: "h", text: "Why the filters appear broken" },
      {
        t: "p",
        text: "A filter can only exclude inventory that has been tagged. Most systems, faced with untagged inventory, keep it in the results rather than dropping it, because dropping it would hide bookable stock. So a filter that almost nothing is tagged against excludes almost nothing.",
      },
      {
        t: "p",
        text: "From the traveller's side this is indistinguishable from a broken filter, and they stop using them. Which means the one mechanism you have for helping them narrow forty options is now something they have learned to ignore.",
      },
      {
        t: "quote",
        text: "Accessibility and family requirements are the ones travellers cannot compromise on, and usually the ones nobody made filterable.",
      },
      {
        t: "bar",
        title: "What a traveller can filter on, against what they need to know",
        source: "illustrative of the shape of travel inventory",
        max: 100,
        data: [
          { label: "Star rating", value: 94, tone: "good" },
          { label: "Late check-in", value: 44, tone: "warn" },
          { label: "Cot available", value: 31, tone: "warn" },
          { label: "Step-free access", value: 22, tone: "warn" },
        ],
        note: "The attribute recorded almost everywhere is the one almost nobody decides on. The measured figures on this site are the test shelf's, on the method page.",
      },
      { t: "h", text: "The cost lands after the booking" },
      {
        t: "p",
        text: "In retail, an unfilterable attribute costs you a sale you never see. In travel it frequently costs more than that, because the traveller books anyway and finds out on arrival.",
      },
      {
        t: "p",
        text: "Someone who needed step-free access and got three flights of stairs generates a complaint, a refund, and a review that outlives both. The attribute would have been cheaper than any one of those.",
      },
      { t: "h", text: "Most of it is extraction, not acquisition" },
      {
        t: "p",
        text: 'The encouraging part is that the facts are usually already written. "Lift to all floors" is in the description. "Cots available on request" is in the description. They are sentences rather than fields, which is exactly the case that is cheap to recover from text you already hold.',
      },
      {
        t: "ul",
        items: [
          "Take one property set and list the constraints travellers cannot compromise on: access, family, late arrival, parking",
          "Check which of those exist as structured values rather than as sentences",
          "For the sentences, that is extraction, and it is usually the largest and cheapest share",
          "Where a fact arrives from one supplier and not another, that is mapping, which is a different cost again",
        ],
      },
      {
        t: "p",
        text: "Whether a recovered fact is accurate enough to publish is a judgement only you can make, particularly for accessibility, where being wrong is worse than being silent. What a measurement can tell you is which absent facts are costing the most, so the verification effort goes somewhere useful.",
      },
    ],
    sources: [
      {
        label:
          "Baymard Institute: What is an ecommerce filter, and UI best practices",
        href: "https://baymard.com/blog/ecommerce-filter-ui",
      },
      {
        label:
          "Baymard Institute: Have filters for all displayed list item info",
        href: "https://baymard.com/blog/have-filters-for-list-item-info",
      },
    ],
  },
  {
    slug: "what-one-bit-buys",
    art: "stack",
    title: "What one bit of decision information actually buys you",
    excerpt:
      "A bit is one halving of the shelf. That fixed meaning is the only reason two attributes as different as screen size and processor can be compared at all.",
    metaTitle: "What one bit of decision information buys",
    metaDescription:
      "A bit is one halving of the shelf. That fixed meaning is why two attributes as unlike as screen size and processor can be compared against each other at all.",
    category: "Method",
    icon: Binary,
    readTime: "8 min read",
    date: "24 July 2026",
    iso: "2026-07-24",
    blocks: [
      {
        t: "p",
        text: "Every ranking we publish is denominated in bits, which is an unusual unit for a product data discussion and worth explaining rather than asserting.",
      },
      {
        t: "p",
        text: "The reason is that the question is genuinely about information. A shopper facing a shelf has a set of candidates and is trying to reduce it. Every fact they learn removes some of that uncertainty. Information theory has measured exactly that since 1948, and the unit it measures it in is the bit.",
      },
      {
        t: "stat",
        value: "1 bit",
        label: "means a shopper can rule out half the shelf",
        source: "the definition, not a scaled score",
      },
      { t: "h", text: "Why not a percentage complete" },
      {
        t: "p",
        text: "Completeness cannot compare unlike fields. Screen size at 60% and processor at 25% tells you which is emptier and nothing about which is worth filling. They are the same unit measuring different things.",
      },
      {
        t: "p",
        text: "Bits are comparable because the thing being measured is the same in both cases: how much does knowing this narrow the choice? An attribute recorded on every product with an identical value scores zero, correctly, because knowing it removes nothing. An attribute recorded on nothing scores zero today and can score very highly once populated, which is the distinction that matters for planning.",
      },
      {
        t: "bar",
        suffix: "",
        title:
          "How many products a shopper is still choosing between, per bit learned",
        source: "the definition of a bit, applied to a 216-product shelf",
        max: 216,
        data: [
          { label: "0 bits", value: 216, tone: "base", suffix: " left" },
          { label: "1 bit", value: 108, tone: "work", suffix: " left" },
          { label: "2 bits", value: 54, tone: "work", suffix: " left" },
          { label: "3 bits", value: 27, tone: "good", suffix: " left" },
        ],
        note: "One bit halves the shelf. That fixed meaning is why screen size and processor can be compared at all.",
      },
      { t: "h", text: "The second half is demand" },
      {
        t: "p",
        text: "Information alone is not enough. A field could partition the catalogue perfectly and still be worthless if no purchase decision turns on it. So each attribute is also scored against the stated requirements for the category, and a field nobody's decision depends on scores near zero however neatly it divides the shelf.",
      },
      {
        t: "p",
        text: "This is where our ranking and a coverage ranking come apart. On our test shelf, processor was missing on 162 of 216 products, third by absence. Only 2 of 32 stated requirements mentioned a processor, which put it last by demand. Storage and processor swapped places, and that swap is the entire argument for measuring demand rather than absence.",
      },
      {
        t: "quote",
        text: "Fixing the emptiest field first would have been the most expensive way to change nothing.",
      },
      { t: "h", text: "What we cannot stand behind" },
      {
        t: "p",
        text: "Screen size came first in 12 of 12 runs across every seed, weighting and imputation scope we tested. Positions two through four moved between runs. We publish the whole ranking because it is informative and we say plainly that only the top of it is stable.",
      },
      {
        t: "p",
        text: "There is also a real limitation in how we simulate a completed catalogue: we can only use values the shelf already records. Where an attribute's recorded values are unrepresentative of its true range, that simulation is wrong in a way we can name and cannot yet correct. It needs a value distribution from outside the catalogue being repaired.",
      },
      {
        t: "p",
        text: "The measurement and the fixture it ran against are both in our repository, and one command regenerates every figure above. That is the property we would most want from a vendor making claims about our data, so it is the one we built for.",
      },
    ],
    sources: [
      {
        label:
          "Pulse: the method, with the command that reproduces every figure",
        href: "/why/method",
      },
      { label: "Pulse: what we cannot claim yet", href: "/why/limits" },
    ],
  },
  {
    slug: "why-there-is-no-uplift-number",
    art: "seal",
    title: "Why there is no conversion figure anywhere on this site",
    excerpt:
      "We have run no live experiment on merchant traffic, so we have no uplift number. Here is the experiment we would run instead, and why publishing the design is worth more than publishing a percentage.",
    metaTitle: "Why there is no conversion figure here",
    metaDescription:
      "We have run no live experiment on merchant traffic, so we publish no uplift number. Here is the experiment we would run, and why its design is worth more.",
    category: "How we work",
    icon: ShieldAlert,
    readTime: "6 min read",
    date: "17 July 2026",
    iso: "2026-07-17",
    blocks: [
      {
        t: "p",
        text: "Every vendor in this category leads with a percentage. Conversion up by some amount, revenue per session up by another. We do not have one, and this is the page that explains why rather than burying it.",
      },
      {
        t: "p",
        text: "The reason is simple and not very flattering: we have not run a live experiment on a merchant's traffic. Without one, any figure we printed would either be someone else's store or an invention. Both are worthless to you and one of them is a lie.",
      },
      {
        t: "quote",
        text: "Anyone quoting you an uplift before running a test on your traffic is quoting someone else's store.",
      },
      { t: "h", text: "What we would run instead" },
      {
        t: "p",
        text: "The absence of a number is not the absence of a plan. This is the experiment, and we would agree it with you before it starts rather than after it finishes.",
      },
      {
        t: "ul",
        items: [
          "Eligibility: sessions reaching a category page in the pilot category",
          "Randomisation unit: the session, stable for its lifetime",
          "Arms: the engine on, against your existing order, held back",
          "Primary metric: agreed with you before the pilot starts, not selected afterwards from whatever moved",
          "Guardrails: p95 latency, error rate, fallback rate",
          "Stopping rule: fixed in advance",
          "Reported: as a comparison against the held-back arm, including when the result is inconclusive",
        ],
      },
      {
        t: "p",
        text: "The held-back arm is why the runtime ships with a holdback percentage on by default rather than as a setting somebody remembers to enable. A deployment without a control arm produces numbers nobody should act on, including any we would report to you.",
      },
      {
        t: "bar",
        suffix: "",
        title:
          "What we can tell you today, and what needs a test on your traffic",
        source: "our own scope, stated plainly",
        max: 3,
        data: [
          {
            label: "Which fields to fix first",
            value: 3,
            tone: "good",
            suffix: "  measurable now",
          },
          {
            label: "Whether the repair worked",
            value: 3,
            tone: "good",
            suffix: "  measurable now",
          },
          {
            label: "Effect on revenue",
            value: 1,
            tone: "warn",
            suffix: "  needs a live test",
          },
        ],
        note: "The first two are properties of your catalogue and available immediately. The third is a property of your visitors and is not.",
      },
      { t: "h", text: "What we can measure without an experiment" },
      {
        t: "p",
        text: "There is a whole class of claim that does not need traffic, because it is a property of your catalogue rather than of your visitors.",
      },
      {
        t: "p",
        text: "Whether your shelf can support the decisions buyers are trying to make is measurable the minute you paste your store's address. Whether a repair improved it is measurable the week you finish. Neither of those is a revenue claim and we are careful not to let them sound like one, but both are checkable immediately and both are actionable.",
      },
      { t: "h", text: "The cost of publishing this" },
      {
        t: "p",
        text: "It loses us conversations with buyers who need a vendor that already has the case studies, which is a legitimate thing to need and we would rather they find out now than in month four.",
      },
      {
        t: "p",
        text: "What it buys is that everything else on this site can be read at face value. The figures we do publish come from a catalogue we measured ourselves, they are labelled as ours, and the command that regenerates them is on the method page. That is a smaller claim than a conversion percentage and it has the advantage of being checkable.",
      },
    ],
    sources: [
      { label: "Pulse: what we cannot claim yet", href: "/why/limits" },
      {
        label: "Pulse: the method, and the command that reproduces it",
        href: "/why/method",
      },
    ],
  },
];

/**
 * The Vietnamese articles, built by translating every string in the English ones.
 *
 * A deep walk rather than a second copy of 560 lines: the two could not then disagree about
 * structure, adding an article is one edit, and a string with no translation yet falls back to
 * English instead of rendering `undefined`. `KEEP` lists the fields that are identifiers, data or
 * citations rather than copy, so they pass through untouched in both languages.
 */
const KEEP = new Set([
  "slug", // route
  "art", // which hero mark
  "t", // block type
  "tone",
  "icon",
  "iso", // machine date
  "sector", // sector slug
  "href", // link target
]);

const translate = <T>(node: T): T => {
  if (typeof node === "string") return (BLOG_VI[node] ?? node) as T;
  if (Array.isArray(node)) return node.map(translate) as T;
  if (node && typeof node === "object") {
    return Object.fromEntries(
      Object.entries(node).map(([key, value]) => [
        key,
        KEEP.has(key) ? value : translate(value),
      ]),
    ) as T;
  }
  return node;
};

const ARTICLES_VI: Article[] = ARTICLES.map(translate);

/** Every article, in the active locale, in publication order. */
export const articles = (locale: string): Article[] =>
  byLocale({ en: ARTICLES, vi: ARTICLES_VI }, locale);

/** One article by slug, in the active locale. */
export const articleBySlug = (slug: string, locale = "en") =>
  articles(locale).find((a) => a.slug === slug);

export const articleSlugs = ARTICLES.map((a) => a.slug);
