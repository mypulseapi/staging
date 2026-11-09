/**
 * Locale plumbing for the typed content modules.
 *
 * The redesign put copy in typed modules rather than in messages/*.json, which
 * kept the structure checkable but left the vi locale rendering English. Rather
 * than flatten everything into JSON and lose the types, each module exports one
 * object per locale and a getter.
 *
 * `useLocale()` from next-intl works in both server and client components in the
 * app router, so a component reads its own locale without threading params
 * through every layer.
 *
 * **The Vietnamese here is a first pass written by an engineer, not a
 * translator.** It is accurate and it is idiomatic enough to ship internally; it
 * has not been reviewed by a native speaker. Anything customer-facing should be
 * before launch. Marked here rather than in a ticket nobody reads.
 */
import { FALLBACK_LOCALE, isLocale } from "@/i18n/locales";

export type Locale = string;

export const asLocale = (l: string): Locale =>
  isLocale(l) ? l : FALLBACK_LOCALE;

/**
 * Pick a variant by locale, falling back to English.
 *
 * Every content module used to end in `(l) => l === "vi" ? X_VI : X`, which
 * meant adding a third language was 31 edits and any one of them missed would
 * silently serve English forever with no type error to catch it. This takes a
 * keyed map instead, so a new locale is a new key and an untranslated module
 * degrades to English rather than throwing.
 */
export function byLocale<T>(variants: Record<string, T>, locale: string): T {
  return variants[locale] ?? variants[FALLBACK_LOCALE];
}

/**
 * Widen a literal `as const` shape to its underlying types.
 *
 * The content modules are declared `as const`, which is what makes them safe to
 * index. It also means a naive `pick<T>` infers T from the English object and
 * then demands the Vietnamese string be character-for-character identical to the
 * English one. Widening first means the two variants are checked against the
 * same *shape* while their values are free to differ, which is the entire point.
 */
export type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { readonly [K in keyof T]: Widen<T[K]> }
          : T;

/** Pick the right variant for the active locale, falling back to English. */
export function pick<T>(
  byLocale: { en: T; vi: Widen<T> },
  locale: string,
): Widen<T> {
  return (
    (asLocale(locale) === "vi" ? byLocale.vi : (byLocale.en as Widen<T>)) ??
    (byLocale.en as Widen<T>)
  );
}

/**
 * Chrome strings that live in components rather than in a content module.
 *
 * Section labels, chart captions and axis titles. They are here rather than in
 * `messages/*.json` so a component that already reads a typed content module
 * does not have to hold a translator hook as well, and so the two halves of a
 * caption cannot end up in different files.
 */
const UI = {
  en: {
    whatHappens: "What happens",
    // StoryPage chrome. These were literals inside the component, so all
    // thirteen story pages showed them in English on /vi.
    /** Announcement bar. Was hardcoded English in Navbar, so it showed in /vi. */
    announce: "The Decision Audit is open for one category per merchant.",
    announceCta: "Request yours",
    whereYouAre: "Where you are",
    whatItLooksLike: "What it looks like",
    theOutput: "The output, on a real shelf.",
    whatYouGet: "What you get",
    beforeYouCommit: "Before you commit",
    whatThisDoes: "What this does",
    whatItDoesNot: "What it does not do",
    questions: "Questions",
    theOnesThatDecide: "The ones that decide it.",
    willDo: "What we will do",
    wontDo: "What we will not do",

    // Attribute names. The same four across every visual, so they are declared
    // once rather than retyped per figure and left to drift out of sync.
    screenSize: "Screen size",
    memory: "Memory",
    storage: "Storage",
    processor: "Processor",

    // AuditVisual
    rankedList: "Your ranked repair list",
    hours48: "Minutes",
    productsMissing: (n: number) => `${n} products missing it`,
    rankedByBits:
      "Ranked by bits of decision information, not by how much is absent.",

    // VerificationVisual
    coverageBeforeAfter: "Coverage, before and after",
    verified: "Verified",
    unchanged: "unchanged",
    pctTo: (a: number, b: number) => `${a}% to ${b}%`,
    readiness: "Readiness",

    // MonitorVisual
    shelfAlert: "Shelf alert",
    laptops: "Laptops",
    readinessFell: "Readiness fell 71 to 62",
    newSkus: "340 new SKUs arrived without processor data on 14 March.",
    readiness12w: "Readiness, 12 weeks",
    readinessAlt: "Readiness holding near 71 then dropping to 62.",

    // ApiVisual
    whyFirst: "Why this product ranked first",
    live: "Live",
    baseRelevance: "Base relevance",
    personaFit: "Persona fit",
    priceBand: "Price band",
    brandAffinity: "Brand affinity",
    explainRanked:
      "Every ranked product carries this. Nothing is a black box to your merchandiser.",

    // MethodVisual
    whatOneBit: "What one bit buys a shopper",
    products216: "216 products",
    bits: "bits",
    left: "left",
    oneBitHalves:
      "One bit halves the shelf. That is the unit, and it is why two attributes can be compared.",

    // CompareVisual
    whereDiffer: "Where the two rankings differ",
    byEngagement: "By engagement",
    byDecision: "By decision value",
    explainInvert:
      "Missing on the most products. Needed by the fewest shoppers.",

    // TwoPlans, use-case figures (designed/use-cases/charts.tsx)
    twoPlans: "Two plans for the same range",
    beforeLaunch: "Before launch",
    fullEnrichment: "Enrich the whole schema",
    minimumSet: "The minimum decidable set",
    nFields: (n: number) => `${n} fields`,
    twoPlansNote:
      "Both end in the same place. Only one of them ends before the date.",

    // SchemaBands, use-case figures (designed/use-cases/charts.tsx)
    schemaCeiling: "Where schema coverage stops",
    markedUp: "Marked up today",
    heldNotExpressed: "Held, but written as prose",
    neverRecorded: "Never recorded at all",
    schemaNote:
      "Only the red band needs new data. The blue band is a markup task on facts you already own.",

    // SectorVisual
    coverageVsDecision: "Coverage against what decides a purchase",
    theGap: "The gap",
    attribute: "Attribute",
    recorded: "Recorded",
    decidesIt: "Decides it",
    yes: "Yes",
    no: "No",

    // Surface visuals
    resultsFor: "Results for",
    queryLaptop: "\u201claptop for design work\u201d",
    engineArm: "Engine",
    controlArm: "Held back",
    heldBackNote:
      "A share of sessions always sees your own order. That is the comparison.",
    slotPdp: "Product detail slot",
    firstVisit: "First visit",
    noHistoryNote:
      "No history, no cookie, no login. Ranked from this visit alone.",
    consoleTitle: "What the console holds",
    built: "Built",
    notBuilt: "Not built",
    cCatalogue: "Catalogue and attributes",
    cPersonas: "Persona tags",
    cHoldback: "Holdback percentage",
    cRecord: "Decision record",
    cPin: "Boost, bury, pin",
    cSimulate: "Rule simulator",
    consoleNote: "The second list is why you can trust the first.",

    // LimitsVisual
    stability: "Ranking stability across 12 runs",
    topOnly: "Top only",
    nthOf12: (n: string, k: number) => `${n} in ${k} of 12`,
    firstOnly:
      "Only the first position is stable. We publish the rest and say so.",
    ord: ["1st", "2nd", "3rd", "4th"],
  },
  vi: {
    whatHappens: "Diễn biến",
    announce: "Decision Audit đang mở cho mỗi nhà bán một ngành hàng.",
    announceCta: "Đăng ký ngay",
    whereYouAre: "Bạn đang ở đâu",
    whatItLooksLike: "Trông nó ra sao",
    theOutput: "Kết quả, trên một kệ hàng thật.",
    whatYouGet: "Bạn nhận được gì",
    beforeYouCommit: "Trước khi bạn cam kết",
    whatThisDoes: "Việc này làm được gì",
    whatItDoesNot: "Việc này không làm gì",
    questions: "Câu hỏi",
    theOnesThatDecide: "Những câu quyết định.",
    willDo: "Những gì chúng tôi sẽ làm",
    wontDo: "Những gì chúng tôi sẽ không làm",

    screenSize: "Kích thước màn hình",
    memory: "RAM",
    storage: "Dung lượng",
    processor: "Vi xử lý",

    rankedList: "Danh sách sửa đã xếp hạng của bạn",
    hours48: "Vài phút",
    productsMissing: (n: number) => `${n} sản phẩm còn thiếu`,
    rankedByBits:
      "Xếp theo bit thông tin quyết định, không theo mức độ vắng mặt.",

    coverageBeforeAfter: "Độ phủ, trước và sau",
    verified: "Đã xác minh",
    unchanged: "không đổi",
    pctTo: (a: number, b: number) => `${a}% lên ${b}%`,
    readiness: "Mức sẵn sàng",

    shelfAlert: "Cảnh báo kệ hàng",
    laptops: "Laptop",
    readinessFell: "Mức sẵn sàng tụt từ 71 xuống 62",
    newSkus: "340 SKU mới về mà không có dữ liệu vi xử lý, ngày 14 tháng 3.",
    readiness12w: "Mức sẵn sàng, 12 tuần",
    readinessAlt: "Mức sẵn sàng giữ quanh 71 rồi tụt xuống 62.",

    whyFirst: "Vì sao sản phẩm này xếp đầu",
    live: "Trực tiếp",
    baseRelevance: "Độ liên quan nền",
    personaFit: "Khớp chân dung",
    priceBand: "Khoảng giá",
    brandAffinity: "Tương hợp thương hiệu",
    explainRanked:
      "Mọi sản phẩm được xếp hạng đều kèm phần này. Không có gì là hộp đen với người phụ trách trưng bày hàng hoá của bạn.",

    whatOneBit: "Một bit mua được gì cho người mua",
    products216: "216 sản phẩm",
    bits: "bit",
    left: "còn lại",
    oneBitHalves:
      "Một bit chia đôi kệ hàng. Đó là đơn vị đo, và là lý do hai thuộc tính so sánh được với nhau.",

    whereDiffer: "Hai bảng xếp hạng khác nhau ở đâu",
    byEngagement: "Theo mức tương tác",
    byDecision: "Theo giá trị quyết định",
    explainInvert: "Thiếu ở nhiều sản phẩm nhất. Được ít người mua cần nhất.",

    twoPlans: "Hai kế hoạch cho cùng một dòng hàng",
    beforeLaunch: "Trước khi lên hàng",
    fullEnrichment: "Làm giàu toàn bộ lược đồ",
    minimumSet: "Tập tối thiểu đủ để quyết định",
    nFields: (n: number) => `${n} trường`,
    twoPlansNote:
      "Cả hai đều về cùng một đích. Chỉ một trong hai về kịp trước ngày ra mắt.",

    schemaCeiling: "Độ phủ lược đồ dừng ở đâu",
    markedUp: "Đã đánh dấu hôm nay",
    heldNotExpressed: "Đang có, nhưng viết dưới dạng văn xuôi",
    neverRecorded: "Chưa bao giờ được ghi",
    schemaNote:
      "Chỉ dải màu đỏ cần dữ liệu mới. Dải màu xanh là việc đánh dấu trên những dữ kiện bạn vốn đã có.",

    coverageVsDecision: "Độ phủ so với thứ quyết định việc mua",
    theGap: "Khoảng trống",
    attribute: "Thuộc tính",
    recorded: "Đã ghi",
    decidesIt: "Quyết định",
    yes: "Có",
    no: "Không",

    resultsFor: "Kết quả cho",
    queryLaptop: "\u201claptop cho công việc thiết kế\u201d",
    engineArm: "Bộ máy",
    controlArm: "Giữ lại",
    heldBackNote:
      "Một phần phiên truy cập luôn thấy thứ tự của chính bạn. Đó chính là phép so sánh.",
    slotPdp: "Ô hiển thị trang sản phẩm",
    firstVisit: "Lần ghé đầu tiên",
    noHistoryNote:
      "Không lịch sử, không cookie, không đăng nhập. Xếp hạng chỉ từ lần ghé này.",
    consoleTitle: "Bảng điều khiển có những gì",
    built: "Đã xây",
    notBuilt: "Chưa xây",
    cCatalogue: "Danh mục và thuộc tính",
    cPersonas: "Thẻ chân dung",
    cHoldback: "Tỷ lệ lưu lượng giữ lại",
    cRecord: "Bản ghi quyết định",
    cPin: "Đẩy lên, dìm xuống, ghim",
    cSimulate: "Trình mô phỏng quy tắc",
    consoleNote: "Danh sách thứ hai là lý do bạn tin được danh sách thứ nhất.",

    stability: "Độ ổn định của thứ hạng qua 12 lần chạy",
    topOnly: "Chỉ đầu bảng",
    nthOf12: (n: string, k: number) => `${n} ở ${k} trên 12 lần`,
    firstOnly:
      "Chỉ vị trí đầu tiên là ổn định. Chúng tôi vẫn công bố phần còn lại và nói rõ điều đó.",
    ord: ["hạng 1", "hạng 2", "hạng 3", "hạng 4"],
  },
} as const;

/** Chrome strings for the active locale. */
export const ui = (locale: string) => byLocale(UI, locale);

/**
 * The hero animation's own strings.
 *
 * Kept apart from `UI` because there are a lot of them and they belong to one
 * component; keeping them in the same object would make both harder to read.
 * The product names, SKUs and figures are data rather than copy and are not
 * localised: they are what the measured catalogue actually contains.
 */
const STORY_UI = {
  en: {
    // Attribute names, keyed to match COLS[].labelKey in the hero table.
    screenSize: "Screen size",
    memory: "Memory",
    processor: "Processor",
    storage: "Storage",
    productsMissingIt: (n: number) => `${n} products missing it`,
    requirementsNeedIt: (n: number) => `${n} of 32 requirements need it`,
    nMissing: (n: number) => `${n} missing`,
    rankedByAbsence: "Ranked by absence",
    rankedByDemand: "Ranked by demand",
    requirementsMention: (n: number) => `${n} of 32 requirements mention it`,

    // Step rail
    stepProblem: "The problem",
    stepAudit: "The audit",
    stepPriority: "The priority",
    stepRepair: "The repair",
    stepPayoff: "The payoff",
    stepRevenue: "The revenue",
    noteProblem: "94 of 216 products a shopper still cannot tell apart",
    noteAudit: "Every attribute scored against real buying decisions",
    notePriority: "Screen size first. Worth 1.067 bits, missing on 80",
    noteRepair: "Recovered from your own titles and supplier specs",
    notePayoff: "Three times as many products a shopper can separate",

    // Catalogue screen
    myCatalogue: "My Catalogue",
    laptops: "Laptops",
    productsCount: "/ 216 products",
    scoringAttributes: "Scoring attributes",
    readinessRecomputed: "Readiness recomputed",
    productsUpdated: "80 products updated",
    rankedByValue: "Ranked by decision value",
    gapsFound: "347 gaps found",
    scoringAgainst: "Scoring 216 products against 32 buying requirements",
    fourAttributes: "4 attributes",
    fieldsBlank: "347 fields are blank across this shelf.",
    cannotFilter:
      "A shopper cannot filter on any of them, and neither can your search.",
    colName: "Name",
    colSku: "SKU",
    noData: "No data",
    missing: "Missing",
    scoring: "Scoring",
    footProblem: "Every blank cell is a question your catalogue cannot answer.",
    footAudit: "Reading titles, descriptions and supplier specs.",
    footPriorityA: "Record",
    footPriorityB: "screen size",
    footPriorityC:
      "on the 80 laptops missing it. It buys more than any other single change.",
    footRepair:
      "Recovered from your own titles and supplier specs. No new data to go and buy.",
    footPayoff:
      "Shoppers can now narrow to a shortlist they can actually choose from.",
    readinessLabel: "readiness",

    // Priority
    twoWays: "Two ways to rank the same four gaps",
    theyDisagree: "They disagree",
    completenessReport: "A completeness report",
    ranksByAbsent: "ranks by what is absent",
    pulse: "Pulse",
    ranksByNeed: "ranks by what shoppers need",
    firstToLast: "1st → last",
    processorA: "Processor",
    processorB:
      "is missing on 162 products, so a completeness report puts it first. Only 2 of 32 requirements mention one, so it finishes last.",
    processorC:
      "Fixing it first would have been the most expensive way to change nothing.",

    // Repair
    recoveringScreen: "Recovering screen size",
    noNewData: "No new data purchased",
    alreadyInText: "values were already in text you own.",
    otherNeedA: "The other",
    otherNeedB:
      "genuinely need acquiring. We tell you which, so you can cost it before you commit.",

    // Payoff
    whatShoppersCan: "What your shoppers can now do",
    verifiedOnCatalogue: "Verified on your catalogue",
    canTellApart: "A shopper can tell these apart",
    stillIndistinguishable: "Still indistinguishable",
    afterRepair: "After the repair",
    catalogueToday: "Your catalogue today",
    screenRecorded: "Screen size recorded",
    before: "Before",
    after: "After",
    oneAttributeA: "One attribute moved",
    oneAttributeB: "63 more products",
    oneAttributeC: "out of the pile nobody could choose between.",
    unitAlt: (after: number, total: number, before: number) =>
      `${after} of ${total} products can be told apart after the repair, up from ${before}.`,
  },
  vi: {
    screenSize: "Kích thước màn hình",
    memory: "RAM",
    processor: "Vi xử lý",
    storage: "Dung lượng",
    productsMissingIt: (n: number) => `${n} sản phẩm còn thiếu`,
    requirementsNeedIt: (n: number) => `${n} trên 32 yêu cầu cần tới nó`,
    nMissing: (n: number) => `thiếu ${n}`,
    rankedByAbsence: "Xếp theo sự vắng mặt",
    rankedByDemand: "Xếp theo nhu cầu",
    requirementsMention: (n: number) => `${n} trên 32 yêu cầu có nhắc tới nó`,

    stepProblem: "Vấn đề",
    stepAudit: "Bản kiểm tra",
    stepPriority: "Thứ tự ưu tiên",
    stepRepair: "Việc sửa",
    stepPayoff: "Kết quả",
    stepRevenue: "Doanh thu",
    noteProblem: "94 trên 216 sản phẩm mà người mua vẫn không phân biệt nổi",
    noteAudit: "Mọi thuộc tính đều được chấm theo quyết định mua thật",
    notePriority:
      "Kích thước màn hình trước. Đáng 1,067 bit, thiếu ở 80 sản phẩm",
    noteRepair: "Lấy lại từ chính tiêu đề của bạn và thông số nhà cung cấp",
    notePayoff: "Gấp ba lần số sản phẩm mà người mua phân biệt được",

    myCatalogue: "Danh mục của tôi",
    laptops: "Laptop",
    productsCount: "/ 216 sản phẩm",
    scoringAttributes: "Đang chấm thuộc tính",
    readinessRecomputed: "Đã tính lại mức sẵn sàng",
    productsUpdated: "Đã cập nhật 80 sản phẩm",
    rankedByValue: "Xếp theo giá trị quyết định",
    gapsFound: "Tìm thấy 347 khoảng trống",
    scoringAgainst: "Đang chấm 216 sản phẩm theo 32 yêu cầu mua hàng",
    fourAttributes: "4 thuộc tính",
    fieldsBlank: "347 trường đang bỏ trống trên kệ hàng này.",
    cannotFilter:
      "Người mua không lọc được theo bất kỳ trường nào, và công cụ tìm kiếm của bạn cũng vậy.",
    colName: "Tên",
    colSku: "SKU",
    noData: "Không có dữ liệu",
    missing: "Thiếu",
    scoring: "Đang chấm",
    footProblem:
      "Mỗi ô trống là một câu hỏi danh mục của bạn không trả lời được.",
    footAudit: "Đang đọc tiêu đề, mô tả và thông số nhà cung cấp.",
    footPriorityA: "Hãy ghi",
    footPriorityB: "kích thước màn hình",
    footPriorityC:
      "cho 80 chiếc laptop còn thiếu. Nó đem lại nhiều hơn bất kỳ thay đổi đơn lẻ nào khác.",
    footRepair:
      "Lấy lại từ chính tiêu đề của bạn và thông số nhà cung cấp. Không phải đi mua dữ liệu mới.",
    footPayoff:
      "Giờ người mua thu hẹp được về một danh sách ngắn mà họ thực sự chọn được.",
    readinessLabel: "mức sẵn sàng",

    twoWays: "Hai cách xếp hạng cùng bốn khoảng trống",
    theyDisagree: "Chúng bất đồng",
    completenessReport: "Báo cáo mức hoàn thiện",
    ranksByAbsent: "xếp theo thứ đang vắng mặt",
    pulse: "Pulse",
    ranksByNeed: "xếp theo thứ người mua cần",
    firstToLast: "hạng 1 → hạng chót",
    processorA: "Vi xử lý",
    processorB:
      "thiếu ở 162 sản phẩm, nên một báo cáo mức hoàn thiện xếp nó đầu bảng. Chỉ 2 trong 32 yêu cầu có nhắc tới nó, nên nó về chót.",
    processorC:
      "Sửa nó trước sẽ là cách tốn kém nhất để chẳng thay đổi được gì.",

    recoveringScreen: "Đang lấy lại kích thước màn hình",
    noNewData: "Không mua dữ liệu mới nào",
    alreadyInText: "giá trị vốn đã nằm trong văn bản bạn đang có.",
    otherNeedA: "Còn lại",
    otherNeedB:
      "giá trị thì thực sự phải đi thu thập. Chúng tôi chỉ rõ là những giá trị nào, để bạn tính được chi phí trước khi cam kết.",

    whatShoppersCan: "Giờ người mua của bạn làm được gì",
    verifiedOnCatalogue: "Đã xác minh trên danh mục của bạn",
    canTellApart: "Người mua phân biệt được những sản phẩm này",
    stillIndistinguishable: "Vẫn không phân biệt được",
    afterRepair: "Sau khi sửa",
    catalogueToday: "Danh mục của bạn hôm nay",
    screenRecorded: "Kích thước màn hình đã ghi",
    before: "Trước",
    after: "Sau",
    oneAttributeA: "Một thuộc tính đã kéo",
    oneAttributeB: "thêm 63 sản phẩm",
    oneAttributeC: "ra khỏi đống mà không ai chọn nổi.",
    unitAlt: (after: number, total: number, before: number) =>
      `${after} trên ${total} sản phẩm phân biệt được sau khi sửa, tăng từ ${before}.`,
  },
} as const;

/** Hero animation strings for the active locale. */
export const storyUi = (locale: string) => byLocale(STORY_UI, locale);
