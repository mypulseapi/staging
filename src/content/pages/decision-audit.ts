import { byLocale } from "@/content/locale";
import type { StoryContent } from "@/components/StoryPage";

/**
 * Written from the merchant's side of the table, not ours.
 *
 * The buyer for this is usually a head of merchandising or ecommerce who has
 * already been quoted for a catalogue enrichment project, could not justify it,
 * and has a completeness dashboard that says everything is fine while discovery
 * plainly is not. Every section answers something they have already had to argue
 * about internally.
 */
export const DECISION_AUDIT: StoryContent = {
  meta: {
    title: "Product data audit: missing attributes to fix first",
    description:
      "Paste your store's address. In minutes, a ranked list of the facts worth recording, the products missing each, and where each fact already lives.",
  },
  eyebrow: "Decision Audit",
  title: "Fix the product data shoppers decide on",
  lede: "Identify, prioritise and verify the product-information fixes that matter most to buying decisions.",

  chainBlock: {
    eyebrow: "Why nobody else can tell you this",
    heading: "One session, and the two ways of finding out where it broke.",
    body: "A shopper leaves without buying. Working out why is the whole business, and there are only two ways to do it.",
  },

  visualHeading: "The list you actually receive.",
  visualBody:
    "Ranked by bits of decision information, with the affected products attached to each row.",

  steps: {
    heading: "How does the audit work?",
    intro:
      "Three things happen, and only the first one needs anything from you.",
    items: [
      {
        n: "01",
        meta: "You, once",
        title: "Paste your store's address",
        body: "Pick the shelf where you most suspect shoppers struggle. We read its public product pages: name, description, category, price and the facts each page states.",
      },
      {
        n: "02",
        meta: "Us, minutes",
        title: "We measure it",
        body: "We work out how much each attribute contributes to telling your products apart today, and how much it would contribute if it were recorded everywhere. The difference is what that field is worth, measured in bits rather than guessed from clicks.",
      },
      {
        n: "03",
        meta: "30 minutes",
        title: "We walk you through it",
        body: "You get the ranked list and the working files, then half an hour with whoever owns merchandising to go through what it found and what it would take to act on it.",
      },
    ],
  },

  faq: [
    {
      q: "What exactly do I need to send you?",
      a: "Your store's address and the category to test. Nothing else. No customer records, no order history, no access to your systems, and no code on your site. We read only the public product pages any shopper or AI agent can see.",
    },
    {
      q: "Do I need a technical coordinator to use the product?",
      a: "No. Anyone can paste the address, and whoever owns merchandising reads the result. No engineering time, because nothing is being installed.",
    },
    {
      q: "How long does it take to receive the result?",
      a: "Minutes. We read a sample of your product pages in the category, judge each against what shoppers need to decide, and show the result as it comes in.",
    },
  ],

  cta: {
    title: "Pick the shelf you most suspect, and send it.",
    body: "One category, free, and an answer in two days that is useful whether or not you ever work with us again.",
    label: "Request a Decision Audit",
    href: "/contact",
    note: "No obligation at any step, and no integration at any point.",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const DECISION_AUDIT_VI: StoryContent = {
  meta: {
    title: "Kiểm tra dữ liệu sản phẩm: thuộc tính thiếu cần sửa",
    description:
      "Dán địa chỉ website của bạn. Trong vài phút, nhận danh sách xếp hạng các thông tin đáng ghi, những sản phẩm còn thiếu, và nơi từng dữ kiện đang nằm.",
  },
  eyebrow: "Decision Audit",
  title: "Sửa đúng dữ liệu sản phẩm mà người mua dựa vào để quyết định",
  lede: "Xác định, ưu tiên và kiểm chứng những chỗ cần sửa trong thông tin sản phẩm có ảnh hưởng lớn nhất tới quyết định mua.",

  chainBlock: {
    eyebrow: "Vì sao không ai khác nói được điều này",
    heading: "Một phiên truy cập, và hai cách để biết nó đứt ở đâu.",
    body: "Một người mua rời đi mà không mua gì. Tìm ra lý do chính là toàn bộ công việc kinh doanh này, và chỉ có hai cách để làm.",
  },

  visualHeading: "Danh sách bạn thực sự nhận được.",
  visualBody:
    "Xếp theo số bit thông tin quyết định, kèm danh sách sản phẩm bị ảnh hưởng ở từng dòng.",

  steps: {
    heading: "Bản kiểm tra hoạt động ra sao?",
    intro: "Có ba việc diễn ra, và chỉ việc đầu tiên cần đến bạn.",
    items: [
      {
        n: "01",
        meta: "Bạn, một lần",
        title: "Dán địa chỉ website",
        body: "Hãy chọn nhóm hàng bạn nghi ngờ người mua gặp khó nhất. Chúng tôi đọc các trang sản phẩm công khai: tên, mô tả, ngành hàng, giá và những thông tin mỗi trang nêu ra.",
      },
      {
        n: "02",
        meta: "Chúng tôi, vài phút",
        title: "Chúng tôi đo",
        body: "Chúng tôi tính xem mỗi thuộc tính hiện đóng góp bao nhiêu vào việc phân biệt các sản phẩm của bạn, và sẽ đóng góp bao nhiêu nếu được ghi ở mọi sản phẩm. Chênh lệch đó là giá trị của trường ấy, đo bằng bit chứ không đoán từ lượt nhấp.",
      },
      {
        n: "03",
        meta: "30 phút",
        title: "Chúng tôi đi qua cùng bạn",
        body: "Bạn nhận danh sách xếp hạng và các tệp làm việc, rồi nửa giờ với người phụ trách trưng bày hàng hoá để rà lại kết quả và những gì cần làm để hành động theo nó.",
      },
    ],
  },

  faq: [
    {
      q: "Chính xác thì tôi cần gửi gì cho các bạn?",
      a: "Địa chỉ website và ngành hàng cần kiểm tra. Không cần gì thêm. Không hồ sơ khách hàng, không lịch sử đơn hàng, không quyền truy cập hệ thống, và không đoạn mã nào trên website của bạn. Chúng tôi chỉ đọc các trang sản phẩm công khai mà bất kỳ người mua hay AI agent nào cũng thấy được.",
    },
    {
      q: "Chúng tôi có cần một đầu mối kỹ thuật để dùng sản phẩm không?",
      a: "Không. Ai cũng có thể dán địa chỉ, và người phụ trách trưng bày hàng hoá đọc kết quả. Không tốn thời gian của đội kỹ thuật, vì không có gì được cài đặt cả.",
    },
    {
      q: "Bao lâu thì chúng tôi nhận được kết quả?",
      a: "Vài phút. Chúng tôi đọc một mẫu các trang sản phẩm trong ngành hàng, đánh giá từng trang theo những gì người mua cần để quyết định, và hiển thị kết quả ngay khi có.",
    },
  ],

  cta: {
    title: "Chọn nhóm hàng bạn nghi ngờ nhất, và gửi nó đi.",
    body: "Một ngành hàng, miễn phí, và một câu trả lời sau hai ngày vẫn hữu ích dù bạn có làm việc tiếp với chúng tôi hay không.",
    label: "Yêu cầu Decision Audit",
    href: "/contact",
    note: "Không ràng buộc ở bất kỳ bước nào, và không tích hợp ở bất kỳ thời điểm nào.",
  },
};

export const decisionAudit = (l: string) =>
  byLocale({ en: DECISION_AUDIT, vi: DECISION_AUDIT_VI }, l);
