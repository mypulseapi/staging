import { byLocale } from "@/content/locale";
import { Layers, UserSearch, Shuffle, ShieldCheck } from "lucide-react";
import type { ChapterContent } from "@/components/designed/product/chapters";

/**
 * Recommendations. The engine behind it is `rankedCatalog()` in the SDK and
 * `catalog.service.ts` in road-runner, which is the same ranker search uses,
 * pointed at a slot instead of a result set. The page says that outright
 * rather than implying a second model, because there is not one.
 */
export const RECOMMENDATIONS: ChapterContent = {
  meta: {
    title: "Recommendations that work on a first visit",
    description:
      "Most engines need history before they are useful. This ranks against the visit happening now, so a first session is served as well as the hundredth.",
  },
  eyebrow: "Recommendations",
  title: "Recommendations that work on a first visit.",
  lede: "Most engines need history before they say anything useful, so a new visitor gets your bestsellers. This reads the visit that is happening and ranks against it, which means the first session is served as well as the hundredth.",

  heroImage: {
    src: "product/recommendations-hero-works-on-a-first-visit.webp",
    width: 1536,
    height: 1024,
    alt: "Recommendations on one laptop, for a first visit with no history. A panel beside the screen holds what this visit did, viewed trail shoes and filtered for waterproof, and the product page below it shows a strip, recommended for this visit, of trail shoes ordered by it.",
  },

  visualHeading: "The same ranker, pointed at a slot.",
  visualBody:
    "Not a second model. The factors that order a search result order a recommendation strip.",

  chainBlock: {
    eyebrow: "The cold start, stated plainly",
    heading:
      "Most engines are quietest on the visit that decides whether there is a second one.",
    body: "Two approaches to the same first-time visitor, and only one of them has anything to work with.",
  },

  scenes: {
    chain: {
      kind: "lanes",
      lanes: [
        {
          eyebrow: "History-based engines",
          title: "Need to know who somebody is before they help.",
          body: "Collaborative filtering learns from what people like you bought. On a first visit there is no you to be like, so the fallback is a bestseller strip, which is the same strip everybody sees.",
          verdict:
            "Silent exactly when the visitor is deciding whether to stay.",
          tone: "hold",
        },
        {
          eyebrow: "Session-based ranking",
          title: "Reads the visit that is actually happening.",
          body: "What was searched, filtered, opened and skipped in the last ninety seconds narrows what this person is deciding between, whether or not they have ever been here before.",
          verdict: "No identity required, and nothing to warm up.",
          tone: "good",
        },
      ],
    },
  },

  situation: {
    heading:
      "Your recommendation engine is quietest exactly when it matters most.",
    body: [
      "Collaborative filtering needs a history to filter against. On a visitor with no history it has nothing, so it falls back to what sold well last week, which is the same strip every anonymous visitor sees. That is most of your traffic on most storefronts.",
      "The information you need is already in front of you. Somebody who has opened three products under a price point and filtered twice has told you a great deal, and none of it required knowing who they are.",
    ],
    pull: "A recommendation engine that needs to know who somebody is cannot help on the visit where it would matter most.",
  },

  steps: {
    heading: "How a strip gets ordered",
    intro:
      "The same ranker as search, pointed at a slot rather than a result set.",
    items: [
      {
        n: "01",
        meta: "Signals",
        title: "The visit emits",
        body: "Views, searches, filters and cart actions in this session. Each one moves persona weight and attribute affinity. Nothing is stored against a person, because there is no person to store it against.",
      },
      {
        n: "02",
        meta: "Rank",
        title: "The catalogue is ordered",
        body: "The slot asks for n products and gets them ranked on relevance, persona fit, quality, price band and attribute affinity, the same factors search uses.",
      },
      {
        n: "03",
        meta: "Record",
        title: "Exposure is logged",
        body: "What was shown is recorded against the decision id, so the strip can be evaluated later rather than assumed to have worked.",
      },
    ],
  },

  gets: {
    heading: "What you get",
    items: [
      {
        icon: UserSearch,
        title: "Useful on visit one",
        body: "No history required, because the ranking reads the session rather than a profile.",
      },
      {
        icon: Layers,
        title: "Any slot on any surface",
        body: "Product detail, cart, category, home. A slot asks for products and gets them ordered; nothing about the placement is special-cased in the engine.",
      },
      {
        icon: Shuffle,
        title: "One ranker, not two",
        body: "The strip and the search results are ordered by the same factors. A merchandiser who understands one understands the other, and there is no second model to keep in sync.",
      },
      {
        icon: ShieldCheck,
        title: "Falls back to your own strip",
        body: "If the engine is slow or unreachable the surface renders whatever you had.",
      },
    ],
  },

  limits: {
    heading: "What recommendations will and will not do",
    will: [
      "Run with no cookie, no login and no cross-site identifier",
      "Hold a share of traffic back on every surface, so a strip is evaluated rather than assumed",
      "Start returning a useful order on the first page view, with no warm-up and no training window",
      "Switch off per surface, without touching anything else on your storefront",
    ],
    wont: [
      "Quote you an uplift. The held-back arm is what produces that number, and it has not run on your traffic yet",
      "Build a long-term profile of a shopper. It reads the session and forgets it, which is a design choice and also a limit",
      "Recommend on an attribute your catalogue never recorded",
      "Beat a well-tuned collaborative filter on a logged-in repeat customer with years of history. Different problem, and we will say so",
    ],
  },

  faq: [
    {
      q: "How is this different from collaborative filtering?",
      a: "Collaborative filtering answers what people like this person bought, which needs a history and an identity. This answers what this visit implies, which needs neither. On a returning logged-in customer with years of history, a good collaborative filter has information we do not. On an anonymous first visit, it has none and we still work.",
    },
    {
      q: "Does it need a cookie or a login?",
      a: "No. It infers from views, searches, filters and cart actions inside the current session. Nothing is written against a person, there is no cross-site identifier, and there is no profile to export or delete because none is kept.",
    },
    {
      q: "Where can strips be placed?",
      a: "Any slot on any surface: product detail, cart, category and home are the common ones. The engine is asked for n ranked products and does not know or care what the placement is called.",
    },
    {
      q: "Is this a different model from your search ranking?",
      a: "No, and that is deliberate. It is the same ranker with the same factors pointed at a slot instead of a result set. One thing to understand, one thing to audit, and no second model quietly drifting away from the first.",
    },
    {
      q: "What happens if it is unavailable?",
      a: "The slot renders the strip you had before it, and nothing else on the page changes. A recommendation surface that can fail visibly is worse than one that was never installed.",
    },
  ],

  cta: {
    title: "Make the shelf decidable, then recommend from it.",
    body: "A strip can only order products your catalogue can tell apart. The audit answers that before anything is turned on.",
    label: "Request a Decision Audit",
    href: "/contact",
    note: "Priced after a pilot, against what the held-back arm actually shows.",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const RECOMMENDATIONS_VI: ChapterContent = {
  meta: {
    title: "Gợi ý sản phẩm hoạt động ngay từ lần ghé đầu",
    description:
      "Phần lớn bộ máy cần lịch sử mới hữu ích. Cái này xếp hạng theo lần ghé đang diễn ra, nên phiên đầu tiên được phục vụ tốt ngang phiên thứ một trăm.",
  },
  eyebrow: "Gợi ý sản phẩm",
  title: "Gợi ý sản phẩm hoạt động ngay từ lần ghé đầu tiên.",
  lede: "Phần lớn bộ máy cần lịch sử trước khi nói được điều gì hữu ích, nên khách mới chỉ nhận được hàng bán chạy. Cái này đọc lần ghé đang diễn ra và xếp hạng theo đó, nghĩa là phiên đầu tiên được phục vụ tốt ngang phiên thứ một trăm.",

  heroImage: {
    src: "product/recommendations-hero-works-on-a-first-visit.webp",
    width: 1536,
    height: 1024,
    alt: "Gợi ý sản phẩm trên một máy tính xách tay, cho lần ghé đầu tiên không có lịch sử. Một bảng cạnh màn hình ghi những gì lần ghé này đã làm, xem giày chạy địa hình và lọc chống nước, còn trang sản phẩm bên dưới hiện một dải gợi ý cho lần ghé này, gồm giày chạy địa hình được sắp theo đó.",
  },

  visualHeading: "Cùng một bộ xếp hạng, chĩa vào một ô hiển thị.",
  visualBody:
    "Không phải mô hình thứ hai. Các yếu tố sắp xếp kết quả tìm kiếm cũng sắp xếp một dải gợi ý.",

  chainBlock: {
    eyebrow: "Khởi đầu nguội, nói thẳng",
    heading:
      "Phần lớn bộ máy im lặng nhất đúng vào lần ghé quyết định có lần thứ hai hay không.",
    body: "Hai cách tiếp cận cùng một khách lần đầu, và chỉ một trong hai có gì đó để làm việc.",
  },

  scenes: {
    chain: {
      kind: "lanes",
      lanes: [
        {
          eyebrow: "Bộ máy dựa trên lịch sử",
          title: "Phải biết ai đó là ai rồi mới giúp được.",
          body: "Lọc cộng tác học từ những gì người giống bạn đã mua. Ở lần ghé đầu thì không có cái bạn nào để mà giống, nên phương án dự phòng là dải hàng bán chạy, và đó là dải mà ai cũng thấy.",
          verdict: "Im lặng đúng lúc khách đang cân nhắc có ở lại hay không.",
          tone: "hold",
        },
        {
          eyebrow: "Xếp hạng dựa trên phiên",
          title: "Đọc đúng lần ghé đang diễn ra.",
          body: "Những gì được tìm, lọc, mở và bỏ qua trong chín mươi giây vừa rồi đã thu hẹp được thứ người này đang chọn giữa, bất kể họ từng tới đây hay chưa.",
          verdict: "Không cần danh tính, và không có gì phải làm nóng.",
          tone: "good",
        },
      ],
    },
  },

  situation: {
    heading:
      "Bộ máy gợi ý của bạn im lặng nhất đúng vào lúc nó quan trọng nhất.",
    body: [
      "Lọc cộng tác cần một lịch sử để mà lọc. Với khách chưa có lịch sử thì nó không có gì, nên nó lùi về thứ bán chạy tuần trước, và đó là cùng một dải sản phẩm mà mọi khách ẩn danh đều thấy. Trên phần lớn gian hàng, đó là phần lớn lưu lượng của bạn.",
      "Thông tin bạn cần vốn đã ở ngay trước mặt. Một người đã mở ba sản phẩm dưới một mức giá và lọc hai lần đã nói cho bạn biết rất nhiều, và không điều nào trong đó đòi hỏi phải biết họ là ai.",
    ],
    pull: "Một bộ máy gợi ý cần biết người ta là ai thì không giúp được gì ở đúng lần ghé mà nó quan trọng nhất.",
  },

  steps: {
    heading: "Một dải gợi ý được sắp xếp ra sao",
    intro:
      "Cùng bộ xếp hạng với tìm kiếm, chĩa vào một ô hiển thị thay vì một tập kết quả.",
    items: [
      {
        n: "01",
        meta: "Tín hiệu",
        title: "Lần ghé phát tín hiệu",
        body: "Lượt xem, lượt tìm, lượt lọc và thao tác giỏ hàng trong phiên này. Mỗi thứ làm dịch chuyển trọng số chân dung và độ tương hợp thuộc tính. Không gì được lưu gắn với một con người, vì không có con người nào để mà gắn vào.",
      },
      {
        n: "02",
        meta: "Xếp hạng",
        title: "Danh mục được sắp xếp",
        body: "Ô hiển thị hỏi xin n sản phẩm và nhận lại chúng đã xếp theo độ liên quan, mức khớp chân dung, chất lượng, khoảng giá và độ tương hợp thuộc tính, đúng các yếu tố mà tìm kiếm dùng.",
      },
      {
        n: "03",
        meta: "Ghi nhận",
        title: "Lượt hiển thị được ghi lại",
        body: "Những gì đã hiển thị được ghi kèm mã quyết định, nên dải gợi ý đánh giá được về sau thay vì mặc định là đã có tác dụng.",
      },
    ],
  },

  gets: {
    heading: "Bạn nhận được gì",
    items: [
      {
        icon: UserSearch,
        title: "Hữu ích ngay từ lần ghé đầu",
        body: "Không cần lịch sử, vì thứ hạng đọc phiên truy cập chứ không đọc hồ sơ.",
      },
      {
        icon: Layers,
        title: "Mọi ô hiển thị trên mọi bề mặt",
        body: "Trang chi tiết sản phẩm, giỏ hàng, ngành hàng, trang chủ. Một ô hỏi xin sản phẩm và nhận lại chúng đã sắp xếp; bộ máy không xử lý riêng cho vị trí đặt nào cả.",
      },
      {
        icon: Shuffle,
        title: "Một bộ xếp hạng, không phải hai",
        body: "Dải gợi ý và kết quả tìm kiếm được sắp bởi cùng các yếu tố. Người phụ trách trưng bày hàng hoá hiểu được cái này thì hiểu được cái kia, và không có mô hình thứ hai nào phải giữ cho đồng bộ.",
      },
      {
        icon: ShieldCheck,
        title: "Lùi về dải gợi ý của chính bạn",
        body: "Nếu bộ máy chậm hoặc không tới được, bề mặt đó hiển thị thứ bạn vốn có.",
      },
    ],
  },

  limits: {
    heading: "Gợi ý sản phẩm sẽ làm gì và không làm gì",
    will: [
      "Chạy mà không cần cookie, không đăng nhập và không định danh xuyên trang",
      "Giữ lại một phần lưu lượng trên mọi bề mặt, để một dải gợi ý được đánh giá thay vì mặc định là hiệu quả",
      "Bắt đầu trả về thứ tự hữu ích ngay lượt xem trang đầu tiên, không cần làm nóng, không cần thời gian huấn luyện",
      "Tắt được theo từng bề mặt, mà không động tới bất cứ thứ gì khác trên gian hàng",
    ],
    wont: [
      "Đưa bạn con số tăng trưởng. Chưa có thử nghiệm trực tiếp nào được chạy, nên bất kỳ con số nào cũng là bịa hoặc của người khác",
      "Dựng một hồ sơ dài hạn về người mua. Nó đọc phiên truy cập rồi quên đi, đó là một lựa chọn thiết kế và cũng là một giới hạn",
      "Gợi ý dựa trên một thuộc tính danh mục của bạn chưa bao giờ ghi",
      "Thắng một bộ lọc cộng tác được tinh chỉnh tốt trên khách quen đã đăng nhập với nhiều năm lịch sử. Đó là bài toán khác, và chúng tôi sẽ nói vậy",
    ],
  },

  faq: [
    {
      q: "Việc này khác gì lọc cộng tác?",
      a: "Lọc cộng tác trả lời câu hỏi những người giống người này đã mua gì, và điều đó cần một lịch sử cùng một danh tính. Cái này trả lời câu hỏi lần ghé này hàm ý điều gì, và không cần cả hai. Với khách quen đã đăng nhập có nhiều năm lịch sử, một bộ lọc cộng tác tốt có thông tin mà chúng tôi không có. Với một lần ghé ẩn danh đầu tiên, nó không có gì còn chúng tôi vẫn chạy được.",
    },
    {
      q: "Nó có cần cookie hay đăng nhập không?",
      a: "Không. Nó suy luận từ lượt xem, lượt tìm, lượt lọc và thao tác giỏ hàng bên trong phiên hiện tại. Không gì được ghi gắn với một con người, không có định danh xuyên trang, và không có hồ sơ nào để xuất ra hay xoá đi vì không hồ sơ nào được giữ lại.",
    },
    {
      q: "Dải gợi ý đặt được ở đâu?",
      a: "Mọi ô hiển thị trên mọi bề mặt: trang chi tiết sản phẩm, giỏ hàng, ngành hàng và trang chủ là những chỗ thường gặp. Bộ máy được hỏi xin n sản phẩm đã xếp hạng và không biết cũng không quan tâm vị trí đó tên là gì.",
    },
    {
      q: "Đây có phải mô hình khác với bộ xếp hạng tìm kiếm của các bạn không?",
      a: "Không, và điều đó là có chủ đích. Nó là cùng một bộ xếp hạng với cùng các yếu tố, chĩa vào một ô hiển thị thay vì một tập kết quả. Một thứ để hiểu, một thứ để rà soát, và không có mô hình thứ hai nào lặng lẽ trôi xa khỏi cái thứ nhất.",
    },
    {
      q: "Nếu nó không sẵn sàng thì sao?",
      a: "Ô đó hiển thị đúng dải gợi ý bạn vốn có, và không gì khác trên trang thay đổi. Một bề mặt gợi ý có thể hỏng lộ liễu thì còn tệ hơn một bề mặt chưa bao giờ được lắp.",
    },
  ],

  cta: {
    title: "Làm cho kệ hàng đủ rõ để quyết định, rồi gợi ý từ đó.",
    body: "Dải gợi ý chỉ sắp xếp được những sản phẩm mà danh mục có đủ thông tin để phân biệt. Gửi địa chỉ website để kiểm tra danh mục của bạn.",
    label: "Yêu cầu Decision Audit",
    href: "/contact",
    note: "Định giá sau chương trình thử nghiệm, dựa trên đúng những gì nhánh đối chứng cho thấy.",
  },
};

export const recommendations = (l: string) =>
  byLocale({ en: RECOMMENDATIONS, vi: RECOMMENDATIONS_VI }, l);

/** The alt text of the owner's step and gain pictures, in the order of `steps.items` and `gets.items`. */
export const recommendationsPictureAlt = (l: string) =>
  byLocale(
    {
      en: {
        steps: [
          "What the visit does, a view, a search, a filter and an add to cart, all flowing into the engine, with no profile stored.",
          "A slot asks for four products; the catalogue goes through the engine and comes out as a strip, recommended for this visit, each product with its factor bars.",
          "A strip of four products under its decision id, copied into a record of what was shown.",
        ],
        gains: [
          "A new visitor, and a strip of trail shoes in front of the grey bestsellers a history-based engine would have shown.",
          "Four surfaces, the home page, a category, a product page and the cart, each with its own recommended strip.",
          "A search result list and a product strip joined through one engine, fed by the same view, search, filter and cart signals.",
          "The engine unplugged, and the shop still showing its own strip, ticked.",
        ],
      },
      vi: {
        steps: [
          "Những gì lần ghé làm, một lượt xem, một lượt tìm, một lượt lọc và một lần thêm vào giỏ, cùng chảy vào bộ máy, không hồ sơ nào được lưu.",
          "Một ô hiển thị hỏi xin bốn sản phẩm; danh mục đi qua bộ máy và ra thành một dải gợi ý cho lần ghé này, mỗi sản phẩm kèm các thanh yếu tố.",
          "Một dải bốn sản phẩm dưới mã quyết định của nó, được chép vào bản ghi những gì đã hiển thị.",
        ],
        gains: [
          "Một khách mới, và một dải giày chạy địa hình đặt trước những món bán chạy màu xám mà bộ máy dựa trên lịch sử lẽ ra sẽ hiện.",
          "Bốn bề mặt, trang chủ, một ngành hàng, một trang sản phẩm và giỏ hàng, mỗi nơi một dải gợi ý riêng.",
          "Một danh sách kết quả tìm kiếm và một dải sản phẩm nối qua cùng một bộ máy, nhận cùng các tín hiệu xem, tìm, lọc và giỏ hàng.",
          "Bộ máy bị rút điện, và cửa hàng vẫn hiện dải gợi ý của chính nó, có dấu tích.",
        ],
      },
    },
    l,
  );
