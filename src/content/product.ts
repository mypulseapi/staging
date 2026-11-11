import { byLocale } from "./locale";
/**
 * Product page copy.
 *
 * Structured as four products in the order a merchant buys them, which is the
 * pattern the competitor set uses and it is a good one: a buyer can locate
 * themselves without reading a feature matrix. Where we diverge is that ours is
 * a staircase with an exit at every step, and we say so, because the honest
 * version of "you can stop after step one" is a better sales argument than
 * pretending the whole suite is table stakes.
 */
export const PRODUCT_HERO = {
  eyebrow: "Product",
  title: "Measure the catalogue. Fix what matters. Only then decide live.",
  lede:
    "Four products, and they are a staircase rather than a suite. Each one is useful on its own, each one has an exit, and the last one is the only one that touches your storefront at all.",
} as const;

export interface Pillar {
  step: string;
  name: string;
  headline: string;
  body: string;
  bullets: readonly string[];
  needs: string;
  optional?: boolean;
}

export const PILLARS: readonly Pillar[] = [
  {
    step: "01",
    name: "Decision Audit",
    headline: "What should we record first?",
    body:
      "You paste your store's address. We read your product pages, work out which missing facts would do the most to help your shoppers tell your products apart, rank them, and hand you the list with the affected products attached. The ranking is measured in bits of decision information, not guessed from click data.",
    bullets: [
      "Attributes ranked by what recording them everywhere would be worth",
      "The exact products missing each one",
      "Where each fact lives: in your text already, in a supplier feed, or nowhere",
      "How much we recovered from your titles and descriptions before you lift a finger",
      "A decision-readiness number you can re-measure later",
    ],
    needs: "Your store's address. No code, no tag, no system access.",
  },
  {
    step: "02",
    name: "Decision Verification",
    headline: "Did the repair actually work?",
    body:
      "Once your team has populated the top attribute, we run the same measurement again and show you what moved: coverage per attribute, how much of the gap closed, and where your readiness number landed. This needs no traffic and no waiting, because it is a property of your catalogue rather than of your visitors.",
    bullets: [
      "The same measurement, on the repaired catalogue",
      "Before and after, attribute by attribute",
      "Confirmation the week you finish, not the quarter after",
      "Evidence for whoever signed off the work",
    ],
    needs: "The repaired pages, read again.",
  },
  {
    step: "03",
    name: "Decision Monitor",
    headline: "When did this shelf get worse?",
    body:
      "Catalogues decay. New products arrive unrecorded, supplier feeds change shape, and a category that was ready last quarter quietly stops being ready. Monitor re-runs the measurement as your catalogue changes and tells you when a shelf slips, naming the cause rather than just the number.",
    bullets: [
      "Re-measured on a schedule you set",
      "An alert that names the shelf, the attribute and the cause",
      "Trend per category, so you can see decay before a buyer does",
      "Nothing to install: it rescans the same pages",
    ],
    needs: "A rescan of your pages, on a schedule.",
  },
  {
    step: "04",
    name: "Decision API",
    headline: "What should we show this visitor?",
    body:
      "The runtime reads the live session, what someone browses, searches and filters, and ranks your catalogue against what it can infer. It asks a question only when the answer would change what it shows. It runs alongside your existing store and search, and it replaces neither.",
    bullets: [
      "Ranks your catalogue against what the session implies",
      "A per-factor breakdown on every product, so nothing is a black box",
      "A held-back share of traffic that never sees it, always",
      "Falls back to your own order if anything is slow or unavailable",
      "No cookie, no login, no identity required",
    ],
    needs: "One script tag, and a pilot before any money changes hands.",
    optional: true,
  },
];

export const PRODUCT_CLOSE = {
  title: "You can stop after step one.",
  body:
    "Most vendors would not put that on a product page. It is true here: the audit hands you a ranked, finite list of work you can do yourself, and if your team closes the top gap the audit has already paid for itself. Steps two and three make that repeatable. Step four is the only one that needs anything on your site, and it comes last for a reason.",
} as const;

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const PRODUCT_HERO_VI = {
  eyebrow: "Sản phẩm",
  title: "Đo danh mục. Sửa thứ quan trọng. Rồi mới quyết định theo thời gian thực.",
  lede:
    "Bốn sản phẩm, và chúng là một cầu thang chứ không phải một bộ trọn gói. Mỗi bậc tự nó đã hữu ích, mỗi bậc đều có lối ra, và bậc cuối là bậc duy nhất chạm tới gian hàng của bạn.",
} as const;

export const PILLARS_VI: readonly Pillar[] = [
  {
    step: "01",
    name: "Decision Audit",
    headline: "Chúng ta nên ghi lại gì trước?",
    body:
      "Bạn dán địa chỉ website. Chúng tôi đọc các trang sản phẩm, tìm ra những thông tin còn thiếu nào sẽ giúp người mua phân biệt sản phẩm của bạn nhiều nhất, xếp hạng chúng, và trả bạn danh sách kèm các sản phẩm bị ảnh hưởng. Thứ hạng được đo bằng bit thông tin quyết định, không phải đoán từ dữ liệu nhấp chuột.",
    bullets: [
      "Các thuộc tính xếp theo giá trị của việc ghi chúng ở khắp nơi",
      "Chính xác những sản phẩm còn thiếu từng thuộc tính",
      "Nơi mỗi dữ kiện đang nằm: đã có trong văn bản của bạn, trong nguồn nhà cung cấp, hay chưa ở đâu cả",
      "Chúng tôi đã lấy lại được bao nhiêu từ tiêu đề và mô tả của bạn, trước khi bạn động tay",
      "Một chỉ số sẵn sàng quyết định mà bạn đo lại được về sau",
    ],
    needs: "Địa chỉ website của bạn. Không mã nguồn, không thẻ theo dõi, không quyền truy cập hệ thống.",
  },
  {
    step: "02",
    name: "Decision Verification",
    headline: "Việc sửa có thực sự hiệu quả không?",
    body:
      "Khi đội của bạn đã điền xong thuộc tính đứng đầu bảng, chúng tôi chạy lại đúng phép đo đó và cho bạn thấy điều gì đã dịch chuyển: độ phủ theo từng thuộc tính, bao nhiêu phần khoảng trống đã đóng lại, và chỉ số sẵn sàng của bạn giờ ở đâu. Việc này không cần lưu lượng và không phải chờ, vì đây là thuộc tính của danh mục chứ không phải của khách truy cập.",
    bullets: [
      "Cùng một phép đo, trên danh mục đã sửa",
      "Trước và sau, theo từng thuộc tính",
      "Xác nhận ngay trong tuần bạn hoàn tất, không phải quý sau",
      "Bằng chứng cho người đã duyệt công việc đó",
    ],
    needs: "Danh mục đã sửa, xuất lại một lần nữa.",
  },
  {
    step: "03",
    name: "Decision Monitor",
    headline: "Kệ hàng này tệ đi từ lúc nào?",
    body:
      "Danh mục nào rồi cũng xuống cấp. Sản phẩm mới về mà không được ghi thuộc tính, nguồn dữ liệu nhà cung cấp đổi cấu trúc, và một ngành hàng quý trước còn sẵn sàng thì lặng lẽ thôi sẵn sàng. Monitor chạy lại phép đo khi danh mục của bạn thay đổi và báo khi một kệ tụt, nêu rõ nguyên nhân chứ không chỉ đưa con số.",
    bullets: [
      "Đo lại theo lịch bạn đặt",
      "Một cảnh báo nêu tên kệ hàng, thuộc tính và nguyên nhân",
      "Xu hướng theo từng ngành hàng, để bạn thấy sự xuống cấp trước người mua",
      "Không phải cài gì: nó quét lại đúng các trang đó",
    ],
    needs: "Quét lại các trang của bạn, theo lịch.",
  },
  {
    step: "04",
    name: "Decision API",
    headline: "Chúng ta nên hiển thị gì cho khách này?",
    body:
      "Bộ máy thời gian thực đọc phiên truy cập đang diễn ra, những gì một người duyệt, tìm và lọc, rồi xếp hạng danh mục theo những gì nó suy luận được. Nó chỉ đặt câu hỏi khi câu trả lời sẽ làm thay đổi thứ nó hiển thị. Nó chạy song song với gian hàng và công cụ tìm kiếm sẵn có, và không thay thế cái nào.",
    bullets: [
      "Xếp hạng danh mục theo những gì phiên truy cập hàm ý",
      "Diễn giải theo từng yếu tố trên mọi sản phẩm, nên không có gì là hộp đen",
      "Luôn có một phần lưu lượng được giữ lại và không bao giờ thấy nó",
      "Lùi về thứ tự của bạn nếu có gì đó chậm hoặc không sẵn sàng",
      "Không cookie, không đăng nhập, không cần danh tính",
    ],
    needs: "Một thẻ script, và một chương trình thử nghiệm trước khi có bất kỳ khoản tiền nào.",
    optional: true,
  },
];

export const PRODUCT_CLOSE_VI = {
  title: "Bạn có thể dừng lại sau bậc một.",
  body:
    "Phần lớn nhà cung cấp sẽ không viết câu đó lên trang sản phẩm. Ở đây nó là sự thật: bản kiểm tra trao bạn một danh sách công việc hữu hạn, đã xếp hạng, mà bạn tự làm được, và nếu đội của bạn đóng được khoảng trống đầu bảng thì bản kiểm tra đã tự trả phí cho nó rồi. Bậc hai và bậc ba khiến việc đó lặp lại được. Bậc bốn là bậc duy nhất cần tới thứ gì đó trên website của bạn, và nó đứng cuối là có lý do.",
} as const;

export const productHero = (l: string) => byLocale({ en: PRODUCT_HERO, vi: PRODUCT_HERO_VI }, l);
export const pillars = (l: string) => byLocale({ en: PILLARS, vi: PILLARS_VI }, l);
export const productClose = (l: string) => byLocale({ en: PRODUCT_CLOSE, vi: PRODUCT_CLOSE_VI }, l);
