import { byLocale } from "@/content/locale";
import { SlidersHorizontal, Gauge, ScrollText, Users } from "lucide-react";
import type { ChapterContent } from "@/components/designed/product/chapters";

/**
 * The console.
 *
 * This page was the one worth getting wrong. The competitor set ships a
 * Merchandising Studio with boost, bury, pin and a rule simulator, and the
 * obvious move is to describe the same thing. We cannot: `road-runner` has no
 * merchandiser override in it. The `boost` in `ranking.service.ts` is the
 * engine's own persona and price weighting, not a control anybody can reach.
 *
 * So the page describes the four things the console actually does today and
 * puts the overrides in `limits.wont` by name. That is the same treatment
 * `/why/limits` gives the missing uplift figure, and it is the reason anything
 * else on this site can be read at face value.
 */
export const MERCHANDISING_STUDIO: ChapterContent = {
  meta: {
    title: "Merchandising Studio: ecommerce merchandising tool",
    description:
      "Manage the catalogue the engine reads, set the holdback, pull the record behind any ranking. Overrides are not built yet, and this page says so.",
  },
  eyebrow: "Merchandising Studio",
  title: "The console, and an honest list of what it cannot do yet.",
  lede: "Merchandising Studio is the ecommerce merchandising tool where you manage the catalogue the engine reads, set how much traffic is held back, and pull the record behind any ranking decision. Overrides are not built yet, and this page says which ones and why rather than leaving you to find out in a pilot.",

  heroImage: {
    src: "product/merchandising-studio-hero-the-console.webp",
    width: 1536,
    height: 1024,
    alt: "The Merchandising Studio console on one laptop: products, categories and brands down the side, the holdback switched on, and decision records with their factors. A dashed note beside it reads that overrides are not built yet.",
  },

  visualHeading: "What the console holds today.",
  visualBody:
    "Catalogue and attributes, personas, the holdback percentage, and the decision record.",

  chainBlock: {
    eyebrow: "Why this page reads oddly",
    heading:
      "Most console pages describe the console somebody is planning to build.",
    body: "There is a cheap version of this page and an expensive one. The cheap one costs us a conversation.",
  },

  scenes: {
    situation: {
      kind: "facts",
      facts: [
        {
          value: "4",
          label: "Built and in the console",
          note: "catalogue, persona tags, holdback, decision record",
          tone: "good",
        },
        {
          value: "2",
          label: "Named here, not built",
          note: "position overrides and scheduled merchandising",
          tone: "warn",
        },
        {
          value: "5%",
          label: "Held back by default",
          note: "switching measurement off has to be deliberate",
          tone: "work",
        },
      ],
      note: "Counted from the codebase rather than the roadmap. The second figure is the one most console pages leave out.",
    },

    chain: {
      kind: "lanes",
      lanes: [
        {
          eyebrow: "Described, then discovered",
          title: "A feature list written from the roadmap.",
          body: "The gap surfaces three weeks into a pilot, with a team already committed and a merchandiser explaining to their manager why the thing in the demo is not in the product.",
          verdict: "Costs the buyer a quarter. Costs the vendor the account.",
          tone: "warn",
        },
        {
          eyebrow: "Listed before you ask",
          title: "A feature list written from the codebase.",
          body: "Overrides are not built. Scheduled merchandising is not built. Both are named here, with what exists today beside them, so the pilot starts from an accurate picture.",
          verdict: "Costs us a conversation. Costs you nothing.",
          tone: "good",
        },
      ],
    },
  },

  situation: {
    heading:
      "A control surface is the first thing a merchandiser asks for and the last thing most vendors are straight about.",
    body: [
      "What the console does hold is the part the engine depends on: the catalogue and its attributes, the personas products are tagged against, the share of traffic held back, and the record behind any individual decision. That is a real surface, it is just a smaller one than the name suggests.",
    ],
    pull: "If we described overrides we have not built, you would discover it in a pilot. Finding out here costs us a conversation and costs you nothing.",
  },

  steps: {
    heading: "What you can do in the console today",
    items: [
      {
        n: "01",
        meta: "Catalogue",
        title: "Manage what the engine reads",
        body: "Products, categories, brands and the attribute schema behind them. This is upstream of every ranking: an attribute the catalogue does not carry is one no surface can order on.",
      },
      {
        n: "02",
        meta: "Control",
        title: "Set the holdback",
        body: "The share of sessions that never see the engine, stable per session. It is an organisation setting, it defaults on, and it is what makes any later comparison possible.",
      },
      {
        n: "03",
        meta: "Audit",
        title: "Pull a decision record",
        body: "Any ranked response carries an id and the factors behind each score.",
      },
    ],
  },

  gets: {
    heading: "What the console gives you",
    items: [
      {
        icon: SlidersHorizontal,
        title: "Catalogue and attribute management",
        body: "The products, categories, brands and attribute schema the engine ranks against, in one place, with the taxonomy that the audit measured.",
      },
      {
        icon: Users,
        title: "Persona tagging",
        body: "Which products are associated with which personas, which is one of the ranking factors and the one a merchandiser has the most useful opinion about.",
      },
      {
        icon: Gauge,
        title: "Holdback control",
        body: "What share of traffic never sees the engine. On by default, because a runtime without a control arm produces numbers nobody should act on, ours included.",
      },
      {
        icon: ScrollText,
        title: "The decision record",
        body: "Per-request id, the factors, and what was shown. Enough to answer why a product ranked where it did without reconstructing it from logs.",
      },
    ],
  },

  limits: {
    heading: "What is built, and what is not",
    will: [
      "Keep the holdback on by default, so switching measurement off has to be a deliberate act",
      "Show latency as a live distribution rather than a single median, which hides the tail",
      "Change nothing on your storefront: this console configures and reads, it never publishes",
      "Work without engineering involvement, because nothing in here deploys anything",
    ],
    wont: [
      "Boost, bury or pin a product. Not built. There is no merchandiser override in the ranking path today, and the engine's internal boosts are not reachable as controls",
      "Simulate a rule change before it goes live. Not built, and it depends on overrides existing first",
      "Run an A/B test from the console. The holdback arm exists and is what a test would be built on, but the test tooling is not there",
      "Report attributable sales. That requires a live experiment we have not run, and a number without one would be invented",
    ],
  },

  faq: [
    {
      q: "Can a merchandiser pin or boost a product?",
      a: "Not today. There is no merchandiser override in the ranking path, and we are not going to describe one in the present tense because it is on a roadmap. The engine has internal boosts for persona and price fit, but those are how it scores rather than controls anybody can reach. If pinning is a requirement for you, this is the honest moment to say so.",
    },
    {
      q: "Then what is the point of the console today?",
      a: "It holds the things the engine depends on: the catalogue and attribute schema it ranks against, the persona tags, the holdback percentage, and the decision record. Those are upstream of every ranking. It is a smaller surface than the name suggests, which is why the name is followed by this list rather than a feature grid.",
    },
    {
      q: "Why is the holdback on by default?",
      a: "Because a runtime with no control arm produces numbers nobody should act on, and that includes anything we would report to you. Making it opt-in would mean most deployments could never be evaluated, which is the situation we built this company to argue against.",
    },
    {
      q: "When will overrides ship?",
      a: "We are not going to give you a date, for the same reason we will not give you an uplift figure: we would be guessing, and a guess in a sales conversation becomes a commitment. What we will do is tell you what exists when you ask, which is what this page is.",
    },
    {
      q: "Can we still control what shoppers see?",
      a: "Yes, upstream rather than at ranking time. Persona tags, the attribute schema and what is in the catalogue at all are all under your control and all feed the ranking. What you cannot do yet is reach into an individual result and move one product.",
    },
  ],

  cta: {
    title: "The catalogue work comes first anyway.",
    body: "The console is most useful once the shelf underneath it can support decisions. That starts with your store's address and no integration at all.",
    label: "Request a Decision Audit",
    href: "/contact",
    note: "If overrides are a hard requirement, tell us on the call and we will say where that leaves us.",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const MERCHANDISING_STUDIO_VI: ChapterContent = {
  meta: {
    title: "Merchandising Studio: bảng điều khiển",
    description:
      "Quản lý danh mục bộ máy đọc, đặt mức giữ lại, tra bản ghi sau mọi quyết định xếp hạng. Các quyền ghi đè chưa được xây và trang này nói rõ điều đó.",
  },
  eyebrow: "Merchandising Studio",
  title:
    "Bảng điều khiển, và một danh sách trung thực những gì nó chưa làm được.",
  lede: "Merchandising Studio là công cụ merchandising cho thương mại điện tử, nơi bạn quản lý danh mục mà bộ máy đọc, đặt mức lưu lượng được giữ lại, và tra ra bản ghi đằng sau bất kỳ quyết định xếp hạng nào. Các quyền ghi đè chưa được xây dựng, và trang này nói rõ là những quyền nào cùng lý do, thay vì để bạn tự phát hiện giữa một chương trình thử nghiệm.",

  heroImage: {
    src: "product/merchandising-studio-hero-the-console.webp",
    width: 1536,
    height: 1024,
    alt: "Bảng điều khiển Merchandising Studio trên một máy tính xách tay: sản phẩm, ngành hàng và thương hiệu ở cột bên, nhánh giữ lại đang bật, và các bản ghi quyết định kèm yếu tố. Một ghi chú viền đứt bên cạnh cho biết quyền ghi đè chưa được xây dựng.",
  },

  visualHeading: "Bảng điều khiển hiện có những gì.",
  visualBody:
    "Danh mục và thuộc tính, chân dung, tỷ lệ lưu lượng giữ lại, và bản ghi quyết định.",

  chainBlock: {
    eyebrow: "Vì sao trang này đọc hơi lạ",
    heading:
      "Phần lớn trang giới thiệu bảng điều khiển mô tả cái bảng điều khiển ai đó đang định xây.",
    body: "Có một phiên bản rẻ và một phiên bản đắt cho trang này. Bản rẻ khiến chúng tôi mất một cuộc trò chuyện.",
  },

  scenes: {
    situation: {
      kind: "facts",
      facts: [
        {
          value: "4",
          label: "Đã xây và có trong bảng điều khiển",
          note: "danh mục, thẻ chân dung, mức giữ lại, bản ghi quyết định",
          tone: "good",
        },
        {
          value: "2",
          label: "Nêu tên ở đây, chưa xây",
          note: "ghi đè vị trí và trưng bày theo lịch",
          tone: "warn",
        },
        {
          value: "5%",
          label: "Giữ lại theo mặc định",
          note: "tắt đo lường phải là hành động có chủ ý",
          tone: "work",
        },
      ],
      note: "Đếm từ mã nguồn chứ không phải từ lộ trình. Con số thứ hai là thứ phần lớn trang giới thiệu bảng điều khiển bỏ qua.",
    },

    chain: {
      kind: "lanes",
      lanes: [
        {
          eyebrow: "Mô tả trước, phát hiện sau",
          title: "Một danh sách tính năng viết ra từ lộ trình.",
          body: "Khoảng trống lộ ra ở tuần thứ ba của chương trình thử nghiệm, khi đội ngũ đã cam kết và người phụ trách trưng bày phải giải thích với quản lý vì sao thứ trong bản demo lại không có trong sản phẩm.",
          verdict: "Bên mua mất một quý. Bên bán mất khách hàng.",
          tone: "warn",
        },
        {
          eyebrow: "Liệt kê trước khi bạn hỏi",
          title: "Một danh sách tính năng viết ra từ mã nguồn.",
          body: "Ghi đè chưa xây. Trưng bày theo lịch chưa xây. Cả hai đều được nêu tên ở đây, kèm những gì đã có, để chương trình thử nghiệm bắt đầu từ một bức tranh đúng.",
          verdict: "Chúng tôi mất một cuộc trò chuyện. Bạn không mất gì.",
          tone: "good",
        },
      ],
    },
  },

  situation: {
    heading:
      "Bề mặt điều khiển là thứ đầu tiên người phụ trách trưng bày hàng hoá hỏi tới và là thứ cuối cùng phần lớn nhà cung cấp nói thẳng.",
    body: [
      "Thứ bảng điều khiển thực sự nắm giữ là phần mà bộ máy phụ thuộc vào: danh mục cùng các thuộc tính của nó, các chân dung mà sản phẩm được gắn thẻ theo, tỷ lệ lưu lượng được giữ lại, và bản ghi đằng sau từng quyết định riêng lẻ. Đó là một bề mặt có thật, chỉ là nhỏ hơn cái tên gợi ra.",
    ],
    pull: "Nếu chúng tôi mô tả những quyền ghi đè chưa xây, bạn sẽ phát hiện ra giữa một chương trình thử nghiệm. Biết được ở đây khiến chúng tôi mất một cuộc trò chuyện và khiến bạn không mất gì.",
  },

  steps: {
    heading: "Hôm nay bạn làm được gì trong bảng điều khiển",
    items: [
      {
        n: "01",
        meta: "Danh mục",
        title: "Quản lý thứ bộ máy đọc",
        body: "Sản phẩm, ngành hàng, thương hiệu và lược đồ thuộc tính đứng sau chúng. Đây là phần thượng nguồn của mọi thứ hạng: một thuộc tính danh mục không mang theo là thuộc tính không bề mặt nào sắp xếp theo được.",
      },
      {
        n: "02",
        meta: "Điều khiển",
        title: "Đặt mức giữ lại",
        body: "Tỷ lệ phiên truy cập không bao giờ thấy bộ máy, ổn định theo từng phiên. Đây là thiết lập ở cấp tổ chức, mặc định bật, và là thứ khiến mọi phép so sánh về sau trở nên khả thi.",
      },
      {
        n: "03",
        meta: "Truy vết",
        title: "Tra một bản ghi quyết định",
        body: "Mọi phản hồi đã xếp hạng đều mang một mã và các yếu tố đứng sau từng điểm số.",
      },
    ],
  },

  gets: {
    heading: "Bảng điều khiển mang lại gì cho bạn",
    items: [
      {
        icon: SlidersHorizontal,
        title: "Quản lý danh mục và thuộc tính",
        body: "Sản phẩm, ngành hàng, thương hiệu và lược đồ thuộc tính mà bộ máy xếp hạng dựa trên đó, ở cùng một nơi, với đúng hệ phân loại mà bản kiểm tra đã đo.",
      },
      {
        icon: Users,
        title: "Gắn thẻ chân dung",
        body: "Sản phẩm nào gắn với chân dung nào, vốn là một trong các yếu tố xếp hạng và là yếu tố mà người phụ trách trưng bày hàng hoá có ý kiến hữu ích nhất.",
      },
      {
        icon: Gauge,
        title: "Điều khiển mức giữ lại",
        body: "Bao nhiêu phần lưu lượng không bao giờ thấy bộ máy. Mặc định bật, vì một bộ máy thời gian thực không có nhánh đối chứng sẽ tạo ra những con số không ai nên hành động theo, kể cả con số của chúng tôi.",
      },
      {
        icon: ScrollText,
        title: "Bản ghi quyết định",
        body: "Mã theo từng yêu cầu, các yếu tố, và những gì đã hiển thị. Đủ để trả lời vì sao một sản phẩm xếp ở vị trí đó mà không phải dựng lại từ nhật ký hệ thống.",
      },
    ],
  },

  limits: {
    heading: "Những gì đã xây, và những gì chưa",
    will: [
      "Giữ mức giữ lại bật sẵn, nên tắt đo lường phải là một hành động có chủ ý",
      "Hiển thị độ trễ dưới dạng phân phối trực tiếp, thay vì một trung vị che mất phần đuôi",
      "Không đổi gì trên gian hàng của bạn: bảng điều khiển này cấu hình và đọc, không bao giờ xuất bản",
      "Dùng được mà không cần đội kỹ thuật, vì không có gì trong đây triển khai cái gì cả",
    ],
    wont: [
      "Đẩy lên, dìm xuống hay ghim một sản phẩm. Chưa xây. Hôm nay không có quyền ghi đè nào của người phụ trách trưng bày hàng hoá trong đường xếp hạng, và các mức đẩy nội bộ của bộ máy không phải là những điều khiển với tới được",
      "Mô phỏng một thay đổi quy tắc trước khi đưa lên chạy thật. Chưa xây, và nó phụ thuộc vào việc các quyền ghi đè phải tồn tại trước",
      "Chạy một thử nghiệm A/B từ bảng điều khiển. Nhánh giữ lại thì đã có và là thứ mà một thử nghiệm sẽ được xây dựng trên đó, nhưng công cụ thử nghiệm thì chưa",
      "Báo cáo doanh số quy được. Điều đó cần một thử nghiệm trực tiếp mà chúng tôi chưa chạy, và một con số không có thử nghiệm sẽ là con số bịa",
    ],
  },

  faq: [
    {
      q: "Người phụ trách trưng bày hàng hoá có ghim hay đẩy sản phẩm được không?",
      a: "Hôm nay thì không. Không có quyền ghi đè nào trong đường xếp hạng, và chúng tôi sẽ không mô tả nó ở thì hiện tại chỉ vì nó nằm trên lộ trình. Bộ máy có các mức đẩy nội bộ cho mức khớp chân dung và giá, nhưng đó là cách nó chấm điểm chứ không phải những điều khiển ai đó với tới được. Nếu việc ghim là yêu cầu bắt buộc với bạn, đây là thời điểm trung thực để nói ra.",
    },
    {
      q: "Vậy hôm nay bảng điều khiển có ý nghĩa gì?",
      a: "Nó nắm giữ những thứ bộ máy phụ thuộc vào: danh mục và lược đồ thuộc tính mà nó xếp hạng dựa trên đó, các thẻ chân dung, tỷ lệ giữ lại, và bản ghi quyết định. Đó đều là phần thượng nguồn của mọi thứ hạng. Đây là một bề mặt nhỏ hơn cái tên gợi ra, và đó là lý do sau cái tên là danh sách này thay vì một bảng tính năng.",
    },
    {
      q: "Vì sao mức giữ lại mặc định bật?",
      a: "Vì một bộ máy thời gian thực không có nhánh đối chứng sẽ tạo ra những con số không ai nên hành động theo, và điều đó gồm cả bất cứ thứ gì chúng tôi báo cáo cho bạn. Để nó ở chế độ tự bật sẽ khiến phần lớn triển khai không bao giờ đánh giá được, đó chính là tình trạng mà chúng tôi lập ra công ty này để phản đối.",
    },
    {
      q: "Khi nào các quyền ghi đè sẽ có?",
      a: "Chúng tôi sẽ không đưa bạn một ngày cụ thể, cùng lý do với việc không đưa con số tăng trưởng: chúng tôi sẽ phải đoán, và một lời đoán trong cuộc trò chuyện bán hàng sẽ thành một cam kết. Điều chúng tôi sẽ làm là nói cho bạn biết hiện có những gì khi bạn hỏi, và đó chính là trang này.",
    },
    {
      q: "Chúng tôi còn kiểm soát được thứ người mua nhìn thấy không?",
      a: "Có, ở phía thượng nguồn thay vì tại thời điểm xếp hạng. Thẻ chân dung, lược đồ thuộc tính và việc có gì trong danh mục đều nằm trong tầm kiểm soát của bạn và đều là đầu vào cho thứ hạng. Thứ bạn chưa làm được là thò tay vào một kết quả cụ thể và dịch chuyển một sản phẩm.",
    },
  ],

  cta: {
    title: "Việc trên danh mục dù sao cũng đến trước.",
    body: "Bảng điều khiển hữu ích nhất khi kệ hàng bên dưới nó đã đủ sức hỗ trợ quyết định. Việc đó bắt đầu bằng địa chỉ website của bạn và không cần tích hợp gì cả.",
    label: "Yêu cầu Decision Audit",
    href: "/contact",
    note: "Nếu quyền ghi đè là yêu cầu bắt buộc, hãy nói trong cuộc gọi và chúng tôi sẽ cho biết điều đó đặt chúng ta ở đâu.",
  },
};

export const merchandisingStudio = (l: string) =>
  byLocale({ en: MERCHANDISING_STUDIO, vi: MERCHANDISING_STUDIO_VI }, l);

/** The alt text of the owner's step and gain pictures, in the order of `steps.items` and `gets.items`. */
export const merchandisingStudioPictureAlt = (l: string) =>
  byLocale(
    {
      en: {
        steps: [
          "The catalogue in the console, products, categories and brands, beside the attribute schema the engine reads from them.",
          "The holdback switch, and visitors split by it, most to the ranked strip and a share to your own, greyed.",
          "A decision id looked up, and its record opened beside the results: the product and the six factors behind its place.",
        ],
        gains: [
          "The taxonomy tree, electronics down to laptops, beside the attribute schema: screen size, memory, storage, colour, weight and processor.",
          "Persona tags, traveller, student and creator, dragged onto products: a backpack, a laptop and a camera.",
          "The holdback panel, a share of shoppers set apart, switched on by default.",
          "A decision record: its id, the factors behind the first product, and the four products that were shown.",
        ],
      },
      vi: {
        steps: [
          "Danh mục trong bảng điều khiển, sản phẩm, ngành hàng và thương hiệu, cạnh lược đồ thuộc tính mà bộ máy đọc từ đó.",
          "Công tắc giữ lại, và khách được nó tách ra, phần lớn tới dải đã xếp hạng, một phần tới dải của chính bạn, tô xám.",
          "Một mã quyết định được tra, và bản ghi của nó mở ra cạnh kết quả: sản phẩm và sáu yếu tố đứng sau vị trí của nó.",
        ],
        gains: [
          "Cây phân loại, từ điện tử xuống máy tính xách tay, cạnh lược đồ thuộc tính: kích thước màn hình, bộ nhớ, dung lượng lưu trữ, màu, cân nặng và bộ xử lý.",
          "Các nhãn chân dung, người đi du lịch, sinh viên và người sáng tạo, được kéo vào sản phẩm: một ba lô, một máy tính xách tay và một máy ảnh.",
          "Bảng giữ lại, một phần người mua được tách riêng, bật sẵn theo mặc định.",
          "Một bản ghi quyết định: mã của nó, các yếu tố đứng sau sản phẩm đầu tiên, và bốn sản phẩm đã được hiển thị.",
        ],
      },
    },
    l,
  );
