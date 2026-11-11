import { byLocale } from "@/content/locale";

/**
 * Research: what we measured, product by product. The hub the Resources menu points at; the
 * photograph study it used to point at is one entry, at /research/photographs; /visual-evidence
 * redirects here.
 *
 * Every number is copied from rainbow's ODIN, checked 2026-10-26: SPIKE-VOI-DV.md §11.2 (audit),
 * THE-THIRD-IGNORANCE.md (photographs), TWO-IGNORANCES.md §3 (1.20 and 4.24 bits, recomputed),
 * NEMOTRON-PERSONAS-VIETNAM.md (parser), AGENTS-READ-PROSE.md §6 (nine listings),
 * INTERVENTION-INTELLIGENCE.md §11 (Promotion Audit: no figure on the site, by decision).
 * 2026-10-28: one row per product on the menu, adding Recommendations and Pages, Merchandising
 * Studio (its built and unbuilt lists are the product page's, `merchandising-studio.ts`) and
 * Opensource (`opensource.ts`: SDK and MCP server available, formats planned).
 * 2026-10-28: each finding names its card picture (`figure`, `research-pictures.tsx`, the owner's
 * generated set) and describes it (`alt`); change a number or an order here and check its picture too.
 * Synthetic data is called synthetic, no marketplace or competitor is named, and nothing here is a
 * lift, latency or returns claim (hires/07-WHAT-WE-DO-NOT-CLAIM.md).
 */
export type FigureKey =
  | "audit"
  | "photographs"
  | "bits"
  | "parser"
  | "strip-grid"
  | "prose"
  | "promotion"
  | "returns"
  | "rerun"
  | "studio"
  | "opensource";

export interface Finding {
  product: string;
  /** measured: a number exists. waiting: built, not yet run on a real merchant's data. */
  status: "measured" | "waiting";
  /** The owner's picture on its card (`research-pictures.tsx`). */
  figure: FigureKey;
  /** What that picture shows, for the alt text. */
  alt: string;
  title: string;
  body: string;
  data: string;
  limit: string;
  href: string;
  link: string;
}

export interface ResearchContent {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lede: string;
  labels: {
    measured: string;
    waiting: string;
    data: string;
    limit: string;
    all: string;
    dataAndLimit: string;
    search: string;
    /** `{shown}` and `{total}` are filled in by the index. */
    count: string;
    noMatch: string;
    showAll: string;
  };
  findingsHeading: string;
  findings: Finding[];
  method: { heading: string; items: { title: string; body: string }[] };
  faqHeading: string;
  faq: { q: string; a: string }[];
  cta: { title: string; body: string; label: string; href: string };
}

const EN: ResearchContent = {
  meta: {
    title: "Product data research: what we measured",
    description:
      "The measurement behind each Pulse product: what we ran, on what data, the result and its limit, and which products have not yet met a real merchant's data.",
  },
  eyebrow: "Research",
  title: "What we measured, and what it does not prove yet.",
  lede: "Every Pulse product rests on a measurement. Here is each one: what we ran, on what data, the result, and the limit you would want to know before buying. Where a product has not met a real merchant's data yet, we say that too.",
  labels: {
    measured: "Measured",
    waiting: "Waiting on a first merchant",
    data: "Data",
    limit: "Limit",
    all: "All",
    dataAndLimit: "Data and limit",
    search: "Search findings",
    count: "{shown} of {total} findings",
    noMatch: "No finding matches that search.",
    showAll: "Show all",
  },
  findingsHeading: "Findings, product by product",
  findings: [
    {
      product: "Decision Audit",
      status: "measured",
      figure: "audit",
      alt: "Two ranked lists of laptop attributes side by side: by how empty each field is, processor sits at the top; by what shoppers need, screen size leads and processor falls to the bottom.",
      title: "How empty a field is and how much shoppers need it disagree.",
      body: "Ranking attributes by the buying requirements shoppers state gave a different order from ranking by how empty each field is. Processor was missing on 162 products, so coverage puts it near the top; only 2 of 32 stated requirements mention a processor, so demand puts it last. Screen size came first under both.",
      data: "A 216-product laptop shelf, 156 of them synthetic, and 32 written buying requirements. Criteria fixed before the run.",
      limit:
        "Only the top position is stable; positions two to four move with the method. One shelf.",
      href: "/product/decision-audit",
      link: "About the Decision Audit",
    },
    {
      product: "Catalogue and photographs",
      status: "measured",
      figure: "photographs",
      alt: "A laptop photograph beside two lists: colour, keyboard and ports, which the photograph shows, and battery life, memory and weight, which only the record says.",
      title: "Half of what a catalogue records, the photograph already shows.",
      body: "Across our 2,176-product demonstration catalogue, 52.6% of recorded attribute values repeat what the product photograph shows. On the nine facets a laptop buyer weighs, the catalogue and the photograph overlap on none.",
      data: "2,176 products, one image each, counted attribute by attribute.",
      limit:
        "It measures the overlap, not lost sales. Whether a photograph shows a fact is our judgement.",
      href: "/research/photographs",
      link: "Read the full study",
    },
    {
      product: "Search, Recommendations and Pages",
      status: "measured",
      figure: "bits",
      alt: "A wall of laptops narrowed by the shopper's need to a smaller group, then by the product facts to a handful.",
      title: "Knowing the products is worth more than knowing the shopper.",
      body: "On the laptop shelf, learning what a shopper needs narrowed 216 products to about 94, which is 1.20 bits. Knowing the products' facts narrowed those 94 to 5, which is 4.24 bits. That is why the catalogue products come first, and why live ranking needs the facts to rank on.",
      data: "The same 216-product shelf, scored in bits of decision information.",
      limit:
        "One shelf, partly synthetic. It compares two kinds of missing information; it is not a ranking result.",
      href: "/product/search",
      link: "About Search",
    },
    {
      product: "Search",
      status: "measured",
      figure: "parser",
      alt: "Search boxes in Vietnamese, Thai, Bahasa Indonesia and English: before the fix most attributes are crossed out, after it every one is ticked.",
      title: "Our query parser misread most Thai searches. Now it does not.",
      body: "A test set of shopping searches found the parser misreading 29% of Vietnamese, 94% of Thai, 78% of Bahasa Indonesia and 34% of English searches outside Vietnam. After the fix it misreads none of the four, with held-out cases kept back to check.",
      data: "Searches phrased with help from a public set of synthetic Vietnamese personas, used for variety of wording only. English priced in six Southeast Asian currencies.",
      limit:
        "Synthetic searches, not real search logs. It shows the parser reads the words, not that results improved.",
      href: "/product/search",
      link: "About Search",
    },
    {
      product: "Recommendations and Pages",
      status: "waiting",
      figure: "strip-grid",
      alt: "One ranker in the middle ordering a product strip above and a category grid below, its result waiting on a first merchant.",
      title: "The same ranker as Search, pointed at a strip and a grid.",
      body: "Recommendations ranks a product strip and Pages ranks a category or landing grid, both from the visit that is happening, so a first visit needs no history. Neither is a second model: it is the Search ranker, and it carries the finding above, that it is only as good as the product facts it ranks on.",
      data: "Our demonstration storefront. No merchant's live traffic yet.",
      limit:
        "A share of traffic is held back so a merchant can tell whether ranking helped. No holdback has run on live traffic, so there is no figure.",
      href: "/product/recommendations",
      link: "About Recommendations",
    },
    {
      product: "Decision API for AI agents",
      status: "measured",
      figure: "prose",
      alt: "A laptop listing whose empty fields are filled from its title and description, read by an agent.",
      title:
        "A fact missing from a listing's fields is usually still on the page.",
      body: "On nine laptop listings from a large Vietnamese marketplace, 17 of 36 facet readings were missing from the structured fields, and all 17 were in the title or the description. An agent that reads can find them. The hard part is reading correctly: two values for one fact, units, and saying it cannot tell when the page is silent. That is what the Decision API answers, for a shopper's laptop or a supplier's part, called directly or by an agent through our MCP server.",
      data: "Nine public listings, fetched once.",
      limit:
        "We pre-registered 60 listings and reached 9, so there is no verdict. We stopped rather than get around the site's access limits.",
      href: "/product/decision-api",
      link: "About the Decision API",
    },
    {
      product: "Promotion Audit",
      status: "waiting",
      figure: "promotion",
      alt: "A synthetic seller's shop, with a voucher, a price cut and free shipping weighed against doing nothing, and no real seller yet.",
      title: "Built, and tested only on a synthetic seller.",
      body: "The Promotion Audit judges vouchers, price cuts and free shipping on orders that stayed bought, after returns and failed deliveries, against doing nothing. An offer that wins only within noise is marked as one to test, not one to run.",
      data: "A synthetic seller built from published fee, delivery and payment figures, with assumptions where no source exists.",
      limit:
        "No real seller yet, so no figure is published. A real result needs the seller's own order history.",
      href: "/product/promotion-audit",
      link: "About the Promotion Audit",
    },
    {
      product: "Return Verification",
      status: "waiting",
      figure: "returns",
      alt: "A list of returns waiting to be joined to the facts of the listing they came from.",
      title: "Ready to read a merchant's returns. It has not read one yet.",
      body: "Return Verification reads order lines and return reasons against the catalogue, to show which missing facts go with returns and whether a repair moved them. The method and the free /outcomes endpoint are built and tested on fixtures.",
      data: "Test fixtures only.",
      limit:
        "We do not claim Pulse reduces returns. It measures your own history.",
      href: "/product/return-verification",
      link: "About Return Verification",
    },
    {
      product: "Decision Verification and Monitor",
      status: "waiting",
      figure: "rerun",
      alt: "The same shelf measured three times: once after a repair, then again on a schedule.",
      title: "The audit's measurement, run again.",
      body: "Verification re-runs the audit after a repair and reports what moved. Monitor re-runs it on a schedule and says when a shelf slips. Both use the audit's measurement, so they carry its limits.",
      data: "No real repaired catalogue yet.",
      limit: "Neither has run on a merchant's repaired catalogue.",
      href: "/product/decision-verification",
      link: "About Decision Verification",
    },
    {
      product: "Merchandising Studio",
      status: "waiting",
      figure: "studio",
      alt: "The Merchandising Studio: catalogue, persona tags, holdback and decision record ticked as built; position overrides and scheduled merchandising marked not built.",
      title: "Four things built, two named as not built.",
      body: "The console holds the catalogue the engine reads, persona tags, the share of traffic held back, 5% by default, and the record behind any ranking decision. Position overrides and scheduled merchandising are not built, and the product page says so.",
      data: "Counted from the codebase, not the roadmap.",
      limit:
        "The record explains a ranking; it does not show the ranking helped. That needs the holdback on a merchant's live traffic.",
      href: "/product/merchandising-studio",
      link: "About the Merchandising Studio",
    },
    {
      product: "Opensource",
      status: "waiting",
      figure: "opensource",
      alt: "An open box holding the SDK, the MCP server and the examples, MIT licensed, with formats and category packs marked planned, beside an agent reading a listing.",
      title: "Open code, so anyone can check how a decision is reached.",
      body: "Open Pulse publishes the browser SDK, the MCP server AI agents call and runnable examples, MIT licensed. The requirement and evidence formats, the repair vocabulary and category packs are planned. Detection is open; deciding which gap matters most stays the paid product.",
      data: "The examples run on sample data: a shopper's laptop request, suppliers and hotels, and a promotion check.",
      limit:
        "No benchmark has been published for the open code yet. The examples show the calls work, not how often an answer is right.",
      href: "/opensource",
      link: "About Opensource",
    },
  ],
  method: {
    heading: "How we run research",
    items: [
      {
        title: "Criteria first",
        body: "What would count as success or failure is written down and committed before any data is fetched, so a result cannot be chosen after it is seen.",
      },
      {
        title: "Failures stay up",
        body: "A run that fails its own test is kept and published with the reason. So is a run stopped short, like the nine listings above.",
      },
      {
        title: "Data is labelled",
        body: "Synthetic data is called synthetic, and no number becomes a claim about results until it has run on a merchant's own data.",
      },
    ],
  },
  faqHeading: "Questions about the research",
  faq: [
    {
      q: "Has Pulse been proven on a real merchant?",
      a: "Not yet. The measurements here run on our own laptop shelf, our demonstration catalogue, synthetic data or a small public sample. A first merchant's own data is the next milestone, and results will be published here.",
    },
    {
      q: "Why publish results that are unfavourable?",
      a: "Because a buyer will find the limits eventually, and it is better they hear them from us. The photograph study exists because a result contradicted our own product.",
    },
    {
      q: "Do you have an uplift figure?",
      a: "No. An uplift figure needs a holdback on a merchant's live traffic, and none has run. We will not quote one before it has.",
    },
    {
      q: "Can I see the method behind a number?",
      a: "Yes. Ask us for the write-up behind any finding on this page. Each one has its pre-registered criteria, its data and its caveats.",
    },
  ],
  cta: {
    title: "Run the measurement on your own catalogue.",
    body: "The Decision Audit is free. Paste your store's address and get back which missing facts cost the most buying decisions, with the limits stated.",
    label: "Request a Decision Audit",
    href: "/contact",
  },
};

const VI: ResearchContent = {
  meta: {
    title: "Nghiên cứu: chúng tôi đã đo gì, từng sản phẩm",
    description:
      "Phép đo đứng sau mỗi sản phẩm Pulse: chạy gì, trên dữ liệu nào, kết quả và giới hạn, và sản phẩm nào chưa chạy trên dữ liệu của người bán thật.",
  },
  eyebrow: "Nghiên cứu",
  title: "Chúng tôi đã đo gì, và điều đó chưa chứng minh được gì.",
  lede: "Mỗi sản phẩm Pulse dựa trên một phép đo. Dưới đây là từng phép đo: chúng tôi chạy gì, trên dữ liệu nào, kết quả ra sao, và giới hạn bạn nên biết trước khi mua. Sản phẩm nào chưa chạy trên dữ liệu của người bán thật, chúng tôi cũng nói rõ.",
  labels: {
    measured: "Đã đo",
    waiting: "Chờ người bán đầu tiên",
    data: "Dữ liệu",
    limit: "Giới hạn",
    all: "Tất cả",
    dataAndLimit: "Dữ liệu và giới hạn",
    search: "Tìm trong kết quả",
    count: "{shown} trên {total} kết quả",
    noMatch: "Không có kết quả nào khớp với tìm kiếm.",
    showAll: "Hiện tất cả",
  },
  findingsHeading: "Kết quả, từng sản phẩm",
  findings: [
    {
      product: "Decision Audit",
      status: "measured",
      figure: "audit",
      alt: "Hai danh sách thuộc tính laptop đặt cạnh nhau: xếp theo mức độ trống của trường, bộ xử lý đứng đầu; xếp theo nhu cầu của người mua, kích thước màn hình dẫn đầu và bộ xử lý xuống cuối.",
      title:
        "Mức độ trống của một trường và mức người mua cần nó không trùng nhau.",
      body: "Xếp hạng thuộc tính theo yêu cầu mua mà người mua nêu ra cho thứ tự khác với xếp theo mức độ trống của từng trường. Bộ xử lý thiếu trên 162 sản phẩm, nên theo độ phủ nó gần đầu; chỉ 2 trong 32 yêu cầu nhắc tới bộ xử lý, nên theo nhu cầu nó đứng cuối. Kích thước màn hình đứng đầu theo cả hai cách.",
      data: "Một kệ 216 laptop, trong đó 156 là dữ liệu tổng hợp, và 32 yêu cầu mua viết sẵn. Tiêu chí cố định trước khi chạy.",
      limit:
        "Chỉ vị trí đầu là ổn định; vị trí hai đến bốn thay đổi theo phương pháp. Một kệ hàng.",
      href: "/product/decision-audit",
      link: "Về Decision Audit",
    },
    {
      product: "Danh mục và ảnh sản phẩm",
      status: "measured",
      figure: "photographs",
      alt: "Ảnh một chiếc laptop bên cạnh hai danh sách: màu sắc, bàn phím và cổng kết nối, những gì ảnh cho thấy; thời lượng pin, bộ nhớ và trọng lượng, những gì chỉ hồ sơ sản phẩm ghi.",
      title: "Một nửa những gì danh mục ghi lại, ảnh sản phẩm đã cho thấy.",
      body: "Trên danh mục trình diễn 2.176 sản phẩm của chúng tôi, 52,6% giá trị thuộc tính được ghi lặp lại điều ảnh sản phẩm đã cho thấy. Với chín yếu tố người mua laptop cân nhắc, danh mục và ảnh không trùng nhau ở yếu tố nào.",
      data: "2.176 sản phẩm, mỗi sản phẩm một ảnh, đếm từng thuộc tính.",
      limit:
        "Nó đo phần trùng lặp, không đo doanh số bị mất. Việc ảnh có cho thấy một thông tin hay không là đánh giá của chúng tôi.",
      href: "/research/photographs",
      link: "Đọc toàn bộ nghiên cứu",
    },
    {
      product: "Search, Recommendations và Pages",
      status: "measured",
      figure: "bits",
      alt: "Một bức tường laptop được thu hẹp theo nhu cầu của người mua thành một nhóm nhỏ hơn, rồi theo thông tin sản phẩm còn vài chiếc.",
      title: "Hiểu sản phẩm đáng giá hơn hiểu người mua.",
      body: "Trên kệ laptop, biết người mua cần gì thu hẹp 216 sản phẩm còn khoảng 94, tức 1,20 bit. Biết thông tin của sản phẩm thu hẹp 94 còn 5, tức 4,24 bit. Vì vậy các sản phẩm cho danh mục đi trước, và xếp hạng trực tiếp cần có thông tin để xếp.",
      data: "Cùng kệ 216 sản phẩm, tính bằng bit thông tin quyết định.",
      limit:
        "Một kệ hàng, một phần là dữ liệu tổng hợp. Nó so sánh hai loại thông tin còn thiếu; không phải kết quả xếp hạng.",
      href: "/product/search",
      link: "Về Search",
    },
    {
      product: "Search",
      status: "measured",
      figure: "parser",
      alt: "Ô tìm kiếm bằng tiếng Việt, tiếng Thái, tiếng Bahasa Indonesia và tiếng Anh: trước khi sửa, hầu hết thuộc tính bị gạch bỏ; sau khi sửa, tất cả đều được đánh dấu.",
      title:
        "Bộ phân tích truy vấn từng đọc sai hầu hết tìm kiếm tiếng Thái. Giờ thì không.",
      body: "Một bộ tìm kiếm thử nghiệm cho thấy bộ phân tích đọc sai 29% tìm kiếm tiếng Việt, 94% tiếng Thái, 78% tiếng Bahasa Indonesia và 34% tiếng Anh ngoài Việt Nam. Sau khi sửa, nó không đọc sai tìm kiếm nào ở cả bốn ngôn ngữ, với các trường hợp giữ riêng để kiểm tra.",
      data: "Các tìm kiếm được diễn đạt với sự hỗ trợ của một bộ nhân vật tiếng Việt tổng hợp công khai, chỉ để đa dạng cách nói. Tiếng Anh dùng giá theo sáu loại tiền Đông Nam Á.",
      limit:
        "Tìm kiếm tổng hợp, không phải nhật ký tìm kiếm thật. Nó cho thấy bộ phân tích đọc đúng câu chữ, không phải kết quả đã tốt hơn.",
      href: "/product/search",
      link: "Về Search",
    },
    {
      product: "Recommendations và Pages",
      status: "waiting",
      figure: "strip-grid",
      alt: "Một bộ xếp hạng ở giữa sắp xếp dải sản phẩm phía trên và lưới danh mục phía dưới, kết quả còn chờ người bán đầu tiên.",
      title:
        "Cùng bộ xếp hạng với Search, chĩa vào một dải gợi ý và một lưới hàng.",
      body: "Recommendations xếp hạng một dải sản phẩm, Pages xếp hạng lưới của trang ngành hàng hoặc trang đích, cả hai theo lần ghé đang diễn ra, nên lần ghé đầu không cần lịch sử. Không cái nào là mô hình thứ hai: đó là bộ xếp hạng của Search, và nó mang theo kết quả ở trên, rằng nó chỉ tốt bằng thông tin sản phẩm nó dùng để xếp.",
      data: "Cửa hàng trình diễn của chúng tôi. Chưa có lưu lượng thật của người bán.",
      limit:
        "Một phần lưu lượng được giữ lại để người bán biết xếp hạng có giúp ích không. Chưa có nhóm đối chứng nào chạy trên lưu lượng thật, nên chưa có con số.",
      href: "/product/recommendations",
      link: "Về Recommendations",
    },
    {
      product: "Decision API cho AI agent",
      status: "measured",
      figure: "prose",
      alt: "Một tin đăng laptop có các trường trống được điền từ tiêu đề và mô tả, do một agent đọc.",
      title:
        "Thông tin thiếu trong các trường của trang sản phẩm thường vẫn có trên trang.",
      body: "Trên chín trang laptop của một sàn thương mại điện tử lớn ở Việt Nam, 17 trong 36 lượt đọc thông tin không có trong các trường cấu trúc, và cả 17 đều nằm trong tiêu đề hoặc mô tả. Agent biết đọc có thể tìm ra. Phần khó là đọc đúng: hai giá trị cho một thông tin, đơn vị, và nói không xác định được khi trang không nói gì. Đó là điều Decision API trả lời, cho laptop của người mua hay linh kiện của nhà cung cấp, gọi trực tiếp hoặc qua máy chủ MCP của chúng tôi khi là agent.",
      data: "Chín trang công khai, lấy một lần.",
      limit:
        "Chúng tôi đăng ký trước 60 trang và chỉ đạt 9, nên chưa có kết luận. Chúng tôi dừng lại thay vì vượt qua giới hạn truy cập của trang.",
      href: "/product/decision-api",
      link: "Về Decision API",
    },
    {
      product: "Promotion Audit",
      status: "waiting",
      figure: "promotion",
      alt: "Cửa hàng của một người bán tổng hợp, với voucher, giảm giá và miễn phí vận chuyển được cân với việc không làm gì, và chưa có người bán thật.",
      title: "Đã xây dựng, và mới chỉ thử trên một người bán tổng hợp.",
      body: "Promotion Audit đánh giá voucher, giảm giá và miễn phí vận chuyển theo những đơn được giữ lại, sau khi trừ hàng trả và giao thất bại, so với việc không làm gì. Ưu đãi chỉ thắng trong phạm vi nhiễu được đánh dấu là cần thử nghiệm, không phải nên chạy.",
      data: "Một người bán tổng hợp dựng từ các số liệu công bố về phí, giao hàng và thanh toán, kèm giả định ở chỗ không có nguồn.",
      limit:
        "Chưa có người bán thật, nên chưa công bố con số nào. Kết quả thật cần lịch sử đơn hàng của chính người bán.",
      href: "/product/promotion-audit",
      link: "Về Promotion Audit",
    },
    {
      product: "Return Verification",
      status: "waiting",
      figure: "returns",
      alt: "Một danh sách hàng trả lại đang chờ được nối với thông tin của tin đăng mà chúng đến từ.",
      title: "Sẵn sàng đọc hàng trả của người bán. Chưa đọc lần nào.",
      body: "Return Verification đối chiếu dòng đơn hàng và lý do trả hàng với danh mục, để cho thấy thông tin còn thiếu nào đi cùng hàng bị trả và bản sửa có làm chúng thay đổi không. Phương pháp và endpoint /outcomes miễn phí đã được xây dựng và kiểm thử trên dữ liệu mẫu.",
      data: "Chỉ dữ liệu kiểm thử.",
      limit:
        "Chúng tôi không nói Pulse giảm hàng trả. Nó đo lịch sử của chính bạn.",
      href: "/product/return-verification",
      link: "Về Return Verification",
    },
    {
      product: "Decision Verification và Monitor",
      status: "waiting",
      figure: "rerun",
      alt: "Cùng một kệ hàng được đo ba lần: một lần sau khi sửa, rồi lại theo lịch.",
      title: "Phép đo của bản kiểm tra, chạy lại.",
      body: "Verification chạy lại bản kiểm tra sau khi sửa và báo những gì đã thay đổi. Monitor chạy lại theo lịch và báo khi một kệ hàng sa sút. Cả hai dùng phép đo của bản kiểm tra, nên mang theo giới hạn của nó.",
      data: "Chưa có danh mục thật đã sửa.",
      limit: "Chưa cái nào chạy trên danh mục đã sửa của người bán.",
      href: "/product/decision-verification",
      link: "Về Decision Verification",
    },
    {
      product: "Merchandising Studio",
      status: "waiting",
      figure: "studio",
      alt: "Merchandising Studio: danh mục, thẻ persona, phần lưu lượng giữ lại và hồ sơ quyết định được đánh dấu là đã xây; ghi đè vị trí và lên lịch merchandising được đánh dấu là chưa xây.",
      title: "Bốn phần đã xây, hai phần được nêu rõ là chưa có.",
      body: "Bảng điều khiển chứa danh mục mà bộ máy đọc, nhãn persona, phần lưu lượng được giữ lại, mặc định 5%, và bản ghi đằng sau mỗi quyết định xếp hạng. Ghim vị trí và lịch trưng bày chưa được xây, và trang sản phẩm nói rõ điều đó.",
      data: "Đếm từ mã nguồn, không phải từ lộ trình.",
      limit:
        "Bản ghi giải thích một lần xếp hạng; nó không cho thấy xếp hạng đã giúp ích. Điều đó cần nhóm đối chứng trên lưu lượng thật của người bán.",
      href: "/product/merchandising-studio",
      link: "Về Merchandising Studio",
    },
    {
      product: "Mã nguồn mở",
      status: "waiting",
      figure: "opensource",
      alt: "Một chiếc hộp mở chứa SDK, MCP server và các ví dụ, giấy phép MIT, cùng các định dạng và gói danh mục được đánh dấu là dự kiến, bên cạnh một agent đang đọc tin đăng.",
      title:
        "Mã nguồn mở, để ai cũng kiểm tra được một quyết định được đưa ra thế nào.",
      body: "Open Pulse công bố SDK cho trình duyệt, máy chủ MCP mà tác tử AI gọi tới và các ví dụ chạy được, theo giấy phép MIT. Định dạng yêu cầu và bằng chứng, bộ từ vựng sửa lỗi và các gói ngành hàng đang được lên kế hoạch. Phần phát hiện là mở; quyết định khoảng trống nào quan trọng nhất vẫn là sản phẩm trả phí.",
      data: "Các ví dụ chạy trên dữ liệu mẫu: yêu cầu laptop của người mua, nhà cung cấp và khách sạn, và một lần kiểm tra khuyến mãi.",
      limit:
        "Chưa công bố phép đo chuẩn nào cho phần mã mở. Các ví dụ cho thấy lời gọi hoạt động, không cho thấy câu trả lời đúng thường xuyên đến đâu.",
      href: "/opensource",
      link: "Về mã nguồn mở",
    },
  ],
  method: {
    heading: "Chúng tôi nghiên cứu như thế nào",
    items: [
      {
        title: "Tiêu chí trước",
        body: "Điều gì được tính là thành công hay thất bại được viết ra và lưu lại trước khi lấy dữ liệu, để không ai chọn kết quả sau khi đã thấy nó.",
      },
      {
        title: "Thất bại vẫn được công bố",
        body: "Một lần chạy không đạt tiêu chí của chính nó vẫn được giữ và công bố kèm lý do. Lần chạy dừng giữa chừng cũng vậy, như chín trang ở trên.",
      },
      {
        title: "Dữ liệu được ghi rõ",
        body: "Dữ liệu tổng hợp được gọi là tổng hợp, và không con số nào trở thành tuyên bố về kết quả cho tới khi chạy trên dữ liệu của chính người bán.",
      },
    ],
  },
  faqHeading: "Câu hỏi về nghiên cứu",
  faq: [
    {
      q: "Pulse đã được chứng minh trên người bán thật chưa?",
      a: "Chưa. Các phép đo ở đây chạy trên kệ laptop của chúng tôi, danh mục trình diễn, dữ liệu tổng hợp hoặc một mẫu công khai nhỏ. Dữ liệu của người bán đầu tiên là cột mốc tiếp theo, và kết quả sẽ được công bố tại đây.",
    },
    {
      q: "Tại sao công bố cả kết quả bất lợi?",
      a: "Vì sớm muộn người mua cũng thấy các giới hạn, và tốt hơn là họ nghe từ chúng tôi. Nghiên cứu về ảnh sản phẩm ra đời vì một kết quả mâu thuẫn với chính sản phẩm của chúng tôi.",
    },
    {
      q: "Pulse có con số tăng trưởng không?",
      a: "Không. Con số tăng trưởng cần một nhóm đối chứng trên lưu lượng thật của người bán, và chưa có lần nào chạy. Chúng tôi sẽ không nêu con số trước khi có.",
    },
    {
      q: "Tôi có thể xem phương pháp đằng sau một con số không?",
      a: "Có. Hãy hỏi chúng tôi bản mô tả đằng sau bất kỳ kết quả nào trên trang này. Mỗi kết quả có tiêu chí đăng ký trước, dữ liệu và các lưu ý.",
    },
  ],
  cta: {
    title: "Chạy phép đo trên danh mục của chính bạn.",
    body: "Decision Audit miễn phí. Dán địa chỉ website và nhận lại những thông tin còn thiếu làm mất nhiều quyết định mua nhất, kèm các giới hạn.",
    label: "Yêu cầu Decision Audit",
    href: "/contact",
  },
};

export const research = (l: string) => byLocale({ en: EN, vi: VI }, l);
