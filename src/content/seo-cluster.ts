import { byLocale } from "./locale";

/**
 * "SEO doesn't stop at Google". The five systems a modern search presence is made of, and the parts
 * inside each.
 *
 * Five systems, thirty-one parts. The count is stated on the page, so `SEO_CLUSTER_PARTS` below is
 * computed from the data rather than typed, and a part added to one system cannot leave the
 * headline number wrong.
 *
 * The Vietnamese is a first pass written by an engineer, not a translator (see `locale.ts`).
 */

export interface ClusterSystem {
  id: "seo" | "aeo" | "geo" | "aio" | "sxo";
  /** The acronym, shown large. */
  name: string;
  /** What the system gets you, in three or four words. */
  goal: string;
  /** What to measure for this system. */
  track: string;
  /** Plain-words answer, used for the FAQ schema so an answer engine can lift it whole. */
  answer: string;
  parts: string[];
}

export interface SeoClusterCopy {
  meta: { title: string; description: string };
  title: string;
  lede: string;
  clusterName: string;
  /** "5 systems · 31 parts", assembled from the data by the page. */
  countLabel: (systems: number, parts: number) => string;
  trackLabel: string;
  partsLabel: string;
  navLabel: string;
  closing: { title: string; body: string };
  systems: ClusterSystem[];
}

const EN: SeoClusterCopy = {
  meta: {
    title: "SEO doesn't stop at Google: the five systems of modern search",
    description:
      "SEO, AEO, GEO, AIO and SXO: what each one gets you, the parts inside it, and the one number to track for each.",
  },
  title: "SEO doesn't stop at Google.",
  lede: "People now find a business through a search page, a spoken answer, a chat assistant, an AI summary and the page they land on. Each is its own system with its own parts and its own number to watch. Here are all five.",
  clusterName: "Modern SEO cluster",
  countLabel: (s, p) => `${s} systems · ${p} parts`,
  trackLabel: "Track",
  partsLabel: "What is in it",
  navLabel: "The five systems",
  closing: {
    title: "One page cannot do all five at once.",
    body: "Pick the system where you are weakest today, fix its parts in order, and watch its one number before moving on.",
  },
  systems: [
    {
      id: "seo",
      name: "SEO",
      goal: "Found on Google",
      track: "rankings and clicks",
      answer:
        "SEO, search engine optimisation, is how a business gets found on Google. It covers technical health, on-page basics, topic coverage, clear brand facts, backlinks and mentions, and local SEO. You track it by rankings and clicks.",
      parts: [
        "Technical health",
        "On-page basics",
        "Topic coverage",
        "Clear brand facts",
        "Backlinks and mentions",
        "Local SEO",
      ],
    },
    {
      id: "aeo",
      name: "AEO",
      goal: "The direct answer",
      track: "the questions you own",
      answer:
        "AEO, answer engine optimisation, is how a business becomes the direct answer to a question. It covers featured snippets, answer-first pages, questions by persona and stage, voice answers, FAQ sections and People Also Ask. You track it by the questions you own.",
      parts: [
        "Featured snippets",
        "Answer-first pages",
        "Questions by persona and stage",
        "Voice answers",
        "FAQ sections",
        "People Also Ask",
      ],
    },
    {
      id: "geo",
      name: "GEO",
      goal: "Recommended by AI",
      track: "times named, weekly",
      answer:
        "GEO, generative engine optimisation, is how a business gets named when an AI assistant recommends something. It covers AI citations, mentions on trusted sites, reviews, Reddit and YouTube, the same brand facts everywhere, and weekly answer tracking. You track it by how often you are named each week.",
      parts: [
        "AI citations",
        "Mentions on trusted sites",
        "Reviews",
        "Reddit and YouTube",
        "Same brand facts everywhere",
        "Weekly answer tracking",
      ],
    },
    {
      id: "aio",
      name: "AIO",
      goal: "Readable by AI",
      track: "visits from AI (GA4)",
      answer:
        "AIO, AI optimisation, is making a site readable by AI systems. It covers crawler access, text an AI can read, structured data, AI Overviews, Google AI Mode and AI search analytics. You track it by visits that come from AI, which you can see in GA4.",
      parts: [
        "Crawler access",
        "Text AI can read",
        "Structured data",
        "AI Overviews",
        "Google AI Mode",
        "AI search analytics",
      ],
    },
    {
      id: "sxo",
      name: "SXO",
      goal: "Chosen after the click",
      track: "leads or sales per page",
      answer:
        "SXO, search experience optimisation, is making sure the page a visitor lands on is the one they choose to act on. It covers intent match, fast mobile pages, conversion, scannable content, proof near the button, return visits, and pages that work for AI agents. You track it by leads or sales per page.",
      parts: [
        "Intent match",
        "Fast mobile pages",
        "Conversion",
        "Scannable content",
        "Proof near the button",
        "Return visits",
        "Works for AI agents (AX)",
      ],
    },
  ],
};

const VI: SeoClusterCopy = {
  meta: {
    title: "SEO không dừng lại ở Google: năm hệ thống của tìm kiếm hiện đại",
    description:
      "SEO, AEO, GEO, AIO và SXO: mỗi hệ thống mang lại điều gì, gồm những phần nào và nên theo dõi chỉ số nào.",
  },
  title: "SEO không dừng lại ở Google.",
  lede: "Ngày nay người ta tìm thấy một doanh nghiệp qua trang kết quả tìm kiếm, câu trả lời bằng giọng nói, trợ lý trò chuyện, bản tóm tắt của AI và chính trang họ truy cập. Mỗi nơi là một hệ thống riêng, có các phần riêng và một chỉ số riêng cần theo dõi. Dưới đây là cả năm hệ thống.",
  clusterName: "Cụm SEO hiện đại",
  countLabel: (s, p) => `${s} hệ thống · ${p} phần`,
  trackLabel: "Theo dõi",
  partsLabel: "Gồm những gì",
  navLabel: "Năm hệ thống",
  closing: {
    title: "Một trang không thể làm cả năm việc cùng lúc.",
    body: "Hãy chọn hệ thống bạn đang yếu nhất, sửa lần lượt các phần của nó và theo dõi chỉ số của nó trước khi chuyển sang hệ thống khác.",
  },
  systems: [
    {
      ...EN.systems[0],
      goal: "Được tìm thấy trên Google",
      track: "thứ hạng và lượt nhấp",
      answer:
        "SEO, tối ưu hóa công cụ tìm kiếm, là cách một doanh nghiệp được tìm thấy trên Google. Gồm sức khỏe kỹ thuật, nền tảng trên trang, độ phủ chủ đề, thông tin thương hiệu rõ ràng, liên kết ngược và lượt nhắc đến, và SEO địa phương. Theo dõi bằng thứ hạng và lượt nhấp.",
      parts: [
        "Sức khỏe kỹ thuật",
        "Nền tảng trên trang",
        "Độ phủ chủ đề",
        "Thông tin thương hiệu rõ ràng",
        "Liên kết ngược và lượt nhắc đến",
        "SEO địa phương",
      ],
    },
    {
      ...EN.systems[1],
      goal: "Câu trả lời trực tiếp",
      track: "các câu hỏi bạn sở hữu",
      answer:
        "AEO, tối ưu hóa cho công cụ trả lời, là cách một doanh nghiệp trở thành câu trả lời trực tiếp cho một câu hỏi. Gồm đoạn trích nổi bật, trang trả lời trước, câu hỏi theo chân dung và giai đoạn, câu trả lời bằng giọng nói, mục câu hỏi thường gặp và People Also Ask. Theo dõi bằng các câu hỏi bạn sở hữu.",
      parts: [
        "Đoạn trích nổi bật",
        "Trang trả lời trước",
        "Câu hỏi theo chân dung và giai đoạn",
        "Câu trả lời bằng giọng nói",
        "Mục câu hỏi thường gặp",
        "People Also Ask",
      ],
    },
    {
      ...EN.systems[2],
      goal: "Được AI giới thiệu",
      track: "số lần được nêu tên, mỗi tuần",
      answer:
        "GEO, tối ưu hóa cho công cụ tạo sinh, là cách một doanh nghiệp được nêu tên khi trợ lý AI đưa ra gợi ý. Gồm trích dẫn của AI, lượt nhắc đến trên các trang đáng tin, đánh giá, Reddit và YouTube, cùng một bộ thông tin thương hiệu ở mọi nơi, và theo dõi câu trả lời hằng tuần. Theo dõi bằng số lần bạn được nêu tên mỗi tuần.",
      parts: [
        "Trích dẫn của AI",
        "Lượt nhắc đến trên các trang đáng tin",
        "Đánh giá",
        "Reddit và YouTube",
        "Cùng một thông tin thương hiệu ở mọi nơi",
        "Theo dõi câu trả lời hằng tuần",
      ],
    },
    {
      ...EN.systems[3],
      goal: "AI đọc được",
      track: "lượt truy cập từ AI (GA4)",
      answer:
        "AIO, tối ưu hóa cho AI, là làm cho trang web mà các hệ thống AI đọc được. Gồm quyền truy cập của trình thu thập, văn bản AI đọc được, dữ liệu có cấu trúc, AI Overviews, Google AI Mode và phân tích tìm kiếm AI. Theo dõi bằng lượt truy cập đến từ AI, xem được trong GA4.",
      parts: [
        "Quyền truy cập của trình thu thập",
        "Văn bản AI đọc được",
        "Dữ liệu có cấu trúc",
        "AI Overviews",
        "Google AI Mode",
        "Phân tích tìm kiếm AI",
      ],
    },
    {
      ...EN.systems[4],
      goal: "Được chọn sau cú nhấp",
      track: "khách tiềm năng hoặc doanh số trên mỗi trang",
      answer:
        "SXO, tối ưu hóa trải nghiệm tìm kiếm, là bảo đảm trang khách truy cập là trang họ chọn để hành động. Gồm khớp ý định, trang di động nhanh, chuyển đổi, nội dung dễ lướt, bằng chứng gần nút bấm, lượt quay lại và trang hoạt động tốt với tác nhân AI. Theo dõi bằng khách tiềm năng hoặc doanh số trên mỗi trang.",
      parts: [
        "Khớp ý định",
        "Trang di động nhanh",
        "Chuyển đổi",
        "Nội dung dễ lướt",
        "Bằng chứng gần nút bấm",
        "Lượt quay lại",
        "Hoạt động tốt với tác nhân AI (AX)",
      ],
    },
  ],
};

export const seoCluster = (locale: string): SeoClusterCopy =>
  byLocale({ en: EN, vi: VI }, locale);

/** Computed from the data so the headline count can never disagree with the lists under it. */
export const SEO_CLUSTER_PARTS = EN.systems.reduce(
  (n, s) => n + s.parts.length,
  0,
);
export const SEO_CLUSTER_SYSTEMS = EN.systems.length;
