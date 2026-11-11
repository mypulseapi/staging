import { byLocale } from "@/content/locale";
import {
  Search,
  SlidersHorizontal,
  Eye,
  SplitSquareHorizontal,
} from "lucide-react";
import type { ChapterContent } from "@/components/designed/product/chapters";

/**
 * Search, as a surface the Decision API serves rather than as a product of its
 * own. Grounded in what `apps/api/road-runner/src/search` actually contains:
 * `search.service.ts`, `ranking.service.ts` with its named factors,
 * `query-intent.ts`, and `holdback.service.ts`. Nothing here describes a
 * capability that is not in that directory with a spec beside it.
 */
export const SEARCH: ChapterContent = {
  meta: {
    title: "Ecommerce search ranked on shopper intent",
    description:
      "Runs beside your existing search rather than replacing it, scores every result on factors you can read, and always holds a share of traffic back.",
  },
  eyebrow: "Search",
  title: "Search that ranks on what the shopper is deciding.",
  lede: "This is ecommerce search ranked on shopper intent. It runs beside the search you already have rather than replacing it, scores every result on factors you can read, and always holds a share of traffic back so you can see what it is actually doing.",

  heroImage: {
    src: "product/search-hero-ranks-on-what-the-shopper-is-deciding.webp",
    width: 1600,
    height: 703,
    alt: "Search on one laptop. Each result for “lightweight laptop for travel” carries the factors that ranked it, relevance, persona fit and price band, and two panels sit beside the screen: the held-back share, served your original order, and the factors the ranking used.",
  },

  visualHeading: "Why this result came first.",
  visualBody:
    "Base relevance, persona, affinity and price band, per result, with the held-back arm beside it.",

  chainBlock: {
    eyebrow: "Matching is not ranking",
    heading: "Your search engine already found the right 200 results.",
    body: "The problem is the order they came back in, and that is a different problem with a different fix.",
  },

  scenes: {
    situation: {
      kind: "asks",
      eyebrow: "One query, scored factor by factor",
      rows: [
        {
          label: "Matches the words",
          eg: "your search engine, already fine",
          ok: true,
        },
        {
          label: "Fits the implied budget",
          eg: "from what this session browsed",
          ok: true,
        },
        {
          label: "Separates the near-identical",
          eg: "needs the deciding attribute",
          ok: false,
        },
        {
          label: "Explains its own position",
          eg: "a reason per result",
          ok: true,
        },
      ],
      okLabel: "Scored",
      noLabel: "No field",
      note: "of these needs a field the catalogue does not record yet. The ranking says so rather than guessing.",
    },
    chain: {
      /*
       * A funnel, not bars. These three numbers are subsets of each other, and
       * on a shared axis 10 and 6 render at 5% and 3% of the width: two slivers
       * a reader cannot compare and cannot tell apart from a different measure.
       * One cell per result makes "6 of 200" countable instead.
       */
      kind: "funnel",
      total: 200,
      lead: {
        before: "One shopper opens the first screen and reads",
        after: "of them.",
      },
      // The six ARE the good outcome, so they read as one. Drawn in warn they
      // were six red crosses standing for the products that work.
      alike: "look the same in the order they arrive",
      reached: "reached a shopper",
      bands: [
        {
          label: "returned",
          value: 200,
          tone: "work",
          note: "your existing engine, doing its job. This part already works.",
        },
        {
          label: "a shopper reads",
          value: 10,
          tone: "work",
          note: "the first screen, and rarely past it",
        },
        {
          label: "they can tell apart",
          value: 6,
          tone: "good",
          note: "separable on the fields the catalogue records",
        },
      ],
      note: "Illustrative of the shape, not a measurement of your shelf. Swapping search engines changes the first band and leaves the last one alone.",
    },
  },

  situation: {
    heading:
      "Keyword search is not the reason your shoppers cannot find things.",
    body: [
      "The weak part is what happens after the match. A query returns ninety products that all genuinely match it, and the ordering has to decide which of the ninety this particular person should see first. Sorted by relevance they are near identical. Sorted by popularity you show everyone the same thing.",
    ],
    pull: "Ranking a set of results well is a different problem from matching them, and it is the one nobody solves by swapping search engines.",
  },

  steps: {
    heading: "How the ranking works",
    intro:
      "Several factors, computed per request, and every one of them readable.",
    items: [
      {
        n: "01",
        meta: "Match",
        title: "Relevance, as now",
        body: "Query intent is parsed and matched against the catalogue. This part is not the clever bit and we do not claim it is; it is the baseline every result starts from.",
      },
      {
        n: "02",
        meta: "Session",
        title: "Weighted by the visit",
        body: "What this person has browsed, searched and filtered in this visit moves persona, affinity and price-band fit. No cookie and no login, so it works on a first visit.",
      },
      {
        n: "03",
        meta: "Always",
        title: "A share never sees it",
        body: "A held-back arm, stable for the session, ranks the same query your original way. That is what makes any number anyone reports about this measurable rather than asserted.",
      },
    ],
  },

  gets: {
    heading: "What you get",
    items: [
      {
        icon: Search,
        title: "Intent parsed from the query",
        body: "A query is read for what it constrains, not only for the words in it, so a search that names an attribute your catalogue records is used as a constraint rather than as a bag of tokens.",
      },
      {
        icon: SlidersHorizontal,
        title: "The factors, named",
        body: "Relevance, persona fit, quality, price band, attribute affinity and audience fit. Each contributes a visible amount to the score, and they are the same factors in the console and in the API response. A factor with no data behind it is left out, not scored as zero.",
      },
      {
        icon: Eye,
        title: "A decision record per request",
        body: "Every ranked response carries an id and the factors behind it. When somebody asks why a product was third, the answer is retrievable rather than reconstructed.",
      },
      {
        icon: SplitSquareHorizontal,
        title: "A control arm by default",
        body: "Not a setting you turn on when you want to measure. Some of your searchers are permanently served your existing ranking, and the two are reported side by side.",
      },
    ],
  },

  limits: {
    heading: "What search will and will not do",
    will: [
      "Rank results against what the current visit implies, and show the factors behind every score",
      "Run alongside your existing search rather than replacing it",
      "Serve some searchers your existing ranking permanently, so there is always something to compare against",
      "Return your existing result order rather than an empty page if the time budget is missed",
    ],
    wont: [
      "Come with a conversion figure. Nothing has been measured on your traffic yet, and a result from another merchant's shelf is not evidence about yours",
      "Rank on an attribute your catalogue does not record. Nothing can; that is what the audit is for",
      "Replace your search infrastructure, your storefront or your platform",
      "Work from customer records. It reads the session, not a profile",
    ],
  },

  faq: [
    {
      q: "Do we have to replace our search engine?",
      a: "No. It ranks the result set your search returns rather than producing that set from scratch, so your existing index, your synonyms and your infrastructure stay where they are. If you switch it off, your own order is what renders, because that order is the fallback path.",
    },
    {
      q: "How fast is it?",
      a: "No model call and no database read on the hot path, because the work is a rank over a set your own engine already retrieved. The console shows the whole distribution, since a median tells you nothing about the slowest search in fifty.",
    },
    {
      q: "Why can you rank without a cookie?",
      a: "Because it infers from what is happening in the current visit rather than from who the person is. Browsing, searching and filtering in this session are enough to move the ranking, which is also why it works on a first visit when a profile-based system has nothing to go on.",
    },
    {
      q: "How do we know it is doing anything?",
      a: "The held-back arm. A share of your traffic always sees your original ordering, stable per session, so the two arms can be compared on your own traffic rather than against a number we quote you.",
    },
    {
      q: "What if our catalogue has gaps?",
      a: "Then ranking helps less than fixing them would, and we will say so. No ordering can use an attribute nobody recorded. That is why the Decision Audit is first in our product order and this is not.",
    },
  ],

  cta: {
    title: "Start with the catalogue, then rank it.",
    body: "Search is worth turning on once your shelf can answer the questions people ask of it. Your store's address settles that.",
    label: "Request a Decision Audit",
    href: "/contact",
    note: "Nothing is priced until a pilot has run on your own searches.",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const SEARCH_VI: ChapterContent = {
  meta: {
    title: "Tìm kiếm: xếp hạng theo điều người mua cân nhắc",
    description:
      "Chạy song song với công cụ tìm kiếm sẵn có thay vì thay thế nó, chấm mọi kết quả theo các yếu tố đọc được, và luôn giữ lại một phần lưu lượng đối chứng.",
  },
  eyebrow: "Tìm kiếm",
  title: "Tìm kiếm xếp hạng theo điều người mua đang cân nhắc.",
  lede: "Nó chạy song song với công cụ tìm kiếm bạn đang có thay vì thay thế, chấm điểm mọi kết quả theo các yếu tố bạn đọc được, và luôn giữ lại một phần lưu lượng để bạn thấy nó thực sự đang làm gì.",

  heroImage: {
    src: "product/search-hero-ranks-on-what-the-shopper-is-deciding.webp",
    width: 1600,
    height: 703,
    alt: "Tìm kiếm trên một máy tính xách tay. Mỗi kết quả cho “lightweight laptop for travel” mang theo các yếu tố đã xếp hạng nó, độ liên quan, mức khớp chân dung và khoảng giá, và hai bảng nằm cạnh màn hình: phần được giữ lại, nhận thứ tự gốc của bạn, và các yếu tố mà thứ hạng đã dùng.",
  },

  visualHeading: "Vì sao kết quả này đứng đầu.",
  visualBody:
    "Độ liên quan nền, chân dung, độ tương hợp và khoảng giá, theo từng kết quả, kèm nhánh đối chứng bên cạnh.",

  chainBlock: {
    eyebrow: "Khớp không phải là xếp hạng",
    heading: "Công cụ tìm kiếm của bạn đã tìm đúng 200 kết quả rồi.",
    body: "Vấn đề nằm ở thứ tự chúng trả về, và đó là một bài toán khác với một cách sửa khác.",
  },

  scenes: {
    situation: {
      kind: "asks",
      eyebrow: "Một truy vấn, chấm theo từng yếu tố",
      rows: [
        { label: "Khớp từ khoá", eg: "công cụ của bạn, vốn đã ổn", ok: true },
        {
          label: "Hợp mức giá hàm ý",
          eg: "từ những gì phiên này đã xem",
          ok: true,
        },
        {
          label: "Tách được thứ gần như giống nhau",
          eg: "cần thuộc tính quyết định",
          ok: false,
        },
        {
          label: "Tự giải thích vị trí của nó",
          eg: "một lý do cho mỗi kết quả",
          ok: true,
        },
      ],
      okLabel: "Chấm được",
      noLabel: "Thiếu trường",
      note: "trong số này cần một trường mà danh mục chưa ghi. Bảng xếp hạng nói thẳng điều đó thay vì đoán.",
    },
    chain: {
      kind: "funnel",
      total: 200,
      lead: {
        before: "Một người mua mở màn hình đầu tiên và đọc",
        after: "trong số đó.",
      },
      alike: "trông giống hệt nhau theo thứ tự chúng về",
      reached: "tới được người mua",
      bands: [
        {
          label: "kết quả trả về",
          value: 200,
          tone: "work",
          note: "công cụ sẵn có của bạn, làm đúng việc của nó. Phần này vốn đã chạy tốt.",
        },
        {
          label: "người mua đọc",
          value: 10,
          tone: "work",
          note: "màn hình đầu tiên, và hiếm khi hơn",
        },
        {
          label: "họ phân biệt được",
          value: 6,
          tone: "good",
          note: "tách được bằng những trường danh mục có ghi",
        },
      ],
      note: "Minh hoạ cho hình dạng vấn đề, không phải phép đo trên kệ hàng của bạn. Đổi công cụ tìm kiếm sẽ đổi dải đầu tiên và không động gì tới dải cuối.",
    },
  },

  situation: {
    heading:
      "Tìm kiếm theo từ khoá không phải lý do người mua của bạn không tìm thấy hàng.",
    body: [
      "Điểm yếu nằm ở việc xảy ra sau khi khớp. Một truy vấn trả về chín mươi sản phẩm đều khớp đúng, và thứ tự phải quyết định trong chín mươi sản phẩm đó thì người này nên thấy cái nào trước. Sắp theo độ liên quan thì chúng gần như giống hệt nhau. Sắp theo mức phổ biến thì bạn cho mọi người thấy cùng một thứ.",
    ],
    pull: "Xếp hạng tốt một tập kết quả là bài toán khác với việc tìm ra tập kết quả đó, và nó là bài toán không ai giải được bằng cách đổi công cụ tìm kiếm.",
  },

  steps: {
    heading: "Thứ hạng được tính ra sao",
    intro: "Nhiều yếu tố, tính theo từng yêu cầu, và yếu tố nào cũng đọc được.",
    items: [
      {
        n: "01",
        meta: "Khớp",
        title: "Độ liên quan, như hiện tại",
        body: "Ý định truy vấn được phân tích và đối chiếu với danh mục. Đây không phải phần thông minh và chúng tôi không nhận là vậy; nó là mốc nền mà mọi kết quả xuất phát từ đó.",
      },
      {
        n: "02",
        meta: "Phiên",
        title: "Nhân trọng số theo lần ghé",
        body: "Những gì người này đã duyệt, tìm và lọc trong lần ghé này làm dịch chuyển chân dung, độ tương hợp và mức khớp khoảng giá. Không cookie và không đăng nhập, nên nó chạy được ngay từ lần ghé đầu tiên.",
      },
      {
        n: "03",
        meta: "Luôn luôn",
        title: "Một phần không bao giờ thấy nó",
        body: "Một nhánh được giữ lại, ổn định theo phiên, xếp cùng truy vấn đó theo cách gốc của bạn. Đó là thứ khiến mọi con số ai đó báo cáo về việc này trở nên đo được thay vì chỉ được khẳng định suông.",
      },
    ],
  },

  gets: {
    heading: "Bạn nhận được gì",
    items: [
      {
        icon: Search,
        title: "Ý định được đọc ra từ truy vấn",
        body: "Một truy vấn được đọc theo những gì nó ràng buộc, không chỉ theo các từ trong đó, nên một lượt tìm có nêu thuộc tính mà danh mục bạn có ghi sẽ được dùng như một ràng buộc thay vì một túi từ khoá.",
      },
      {
        icon: SlidersHorizontal,
        title: "Các yếu tố, có tên rõ ràng",
        body: "Độ liên quan, mức khớp chân dung, chất lượng, khoảng giá, độ tương hợp thuộc tính và mức khớp nhóm khách hàng. Mỗi yếu tố đóng góp một lượng nhìn thấy được vào điểm số, và chúng là cùng các yếu tố trong bảng điều khiển lẫn trong phản hồi API. Yếu tố nào không có dữ liệu thì được bỏ ra, không bị tính là 0.",
      },
      {
        icon: Eye,
        title: "Một bản ghi quyết định cho mỗi yêu cầu",
        body: "Mọi phản hồi đã xếp hạng đều mang một mã và các yếu tố đứng sau nó. Khi ai đó hỏi vì sao một sản phẩm đứng thứ ba, câu trả lời là thứ tra ra được chứ không phải dựng lại.",
      },
      {
        icon: SplitSquareHorizontal,
        title: "Nhánh đối chứng mặc định",
        body: "Không phải một thiết lập bạn bật lên khi muốn đo. Một phần người tìm kiếm luôn được phục vụ bằng thứ hạng sẵn có của bạn, và hai bên được báo cáo cạnh nhau.",
      },
    ],
  },

  limits: {
    heading: "Tìm kiếm sẽ làm gì và không làm gì",
    will: [
      "Xếp hạng kết quả theo những gì lần ghé hiện tại hàm ý, và cho thấy các yếu tố đứng sau mọi điểm số",
      "Chạy song song với công cụ tìm kiếm sẵn có thay vì thay thế nó",
      "Phục vụ một phần người tìm kiếm bằng thứ hạng sẵn có, vĩnh viễn, nên luôn có cái để đối chiếu",
      "Trả về đúng tập kết quả theo thứ tự cũ thay vì một trang trống, nếu lỡ hạn thời gian",
    ],
    wont: [
      "Đi kèm một con số chuyển đổi. Chúng tôi chưa chạy thử nghiệm trực tiếp nào, nên bất kỳ tỷ lệ nào cũng sẽ là cửa hàng của người khác",
      "Xếp hạng theo một thuộc tính danh mục của bạn không ghi. Không gì làm được điều đó; đó chính là việc của bản kiểm tra",
      "Thay thế hạ tầng tìm kiếm, gian hàng hay nền tảng của bạn",
      "Hoạt động dựa trên hồ sơ khách hàng. Nó đọc phiên truy cập, không đọc hồ sơ",
    ],
  },

  faq: [
    {
      q: "Chúng tôi có phải thay công cụ tìm kiếm không?",
      a: "Không. Nó xếp hạng tập kết quả mà công cụ tìm kiếm của bạn trả về, chứ không tự tạo ra tập kết quả đó, nên chỉ mục, từ đồng nghĩa và hạ tầng hiện tại của bạn vẫn giữ nguyên. Nếu bạn tắt đi, thứ hiển thị là thứ tự của chính bạn, bởi thứ tự đó là phương án dự phòng.",
    },
    {
      q: "Nó nhanh tới đâu?",
      a: "Không gọi mô hình và không đọc cơ sở dữ liệu trên đường nóng, vì công việc chỉ là xếp hạng một tập kết quả mà công cụ của bạn đã lấy về. Bảng điều khiển hiển thị toàn bộ phân phối, vì một số trung vị không nói gì về lượt tìm chậm nhất trong năm mươi lượt.",
    },
    {
      q: "Vì sao các bạn xếp hạng được mà không cần cookie?",
      a: "Vì nó suy luận từ những gì đang diễn ra trong lần ghé hiện tại chứ không từ việc người đó là ai. Việc duyệt, tìm và lọc trong phiên này là đủ để làm dịch chuyển thứ hạng, đó cũng là lý do nó chạy được ở lần ghé đầu tiên, khi một hệ thống dựa trên hồ sơ chưa có gì để bám vào.",
    },
    {
      q: "Làm sao chúng tôi biết nó có tác dụng gì không?",
      a: "Nhờ nhánh được giữ lại. Một phần lưu lượng của bạn luôn thấy thứ tự gốc, ổn định theo từng phiên, nên hai nhánh so sánh được trên chính lưu lượng của bạn thay vì đối chiếu với một con số chúng tôi nêu ra.",
    },
    {
      q: "Nếu danh mục của chúng tôi có khoảng trống thì sao?",
      a: "Thì việc xếp hạng giúp ít hơn so với việc sửa các khoảng trống đó, và chúng tôi sẽ nói vậy. Không thứ tự nào dùng được một thuộc tính chưa ai ghi. Đó là lý do Decision Audit đứng đầu trong thứ tự sản phẩm của chúng tôi còn trang này thì không.",
    },
  ],

  cta: {
    title: "Bắt đầu từ danh mục, rồi mới xếp hạng nó.",
    body: "Công cụ tìm kiếm hữu ích khi nhóm hàng có đủ thông tin trả lời câu hỏi của người mua. Gửi địa chỉ website để kiểm tra điều đó.",
    label: "Yêu cầu Decision Audit",
    href: "/contact",
    note: "Không có giá nào được chốt trước khi một chương trình thử nghiệm chạy trên chính lượt tìm kiếm của bạn.",
  },
};

export const search = (l: string) => byLocale({ en: SEARCH, vi: SEARCH_VI }, l);

/** The alt text of the owner's step and gain pictures, in the order of `steps.items` and `gets.items`. */
export const searchPictureAlt = (l: string) =>
  byLocale(
    {
      en: {
        steps: [
          "The query “lightweight laptop for travel” read as three things, laptop, lightweight and travel, each matched against the same field on every result.",
          "What this visit viewed, searched and filtered moves three sliders, persona, affinity and price band, and the results reorder from one to three.",
          "One query and a crowd of shoppers: most go to the ranked results, and a smaller share is sent to a held-back list in the original order.",
        ],
        gains: [
          "The query “15-inch laptop under 1.5 kg” split into a screen size of 15 inches and a weight under 1.5 kg, each set as a filter.",
          "The first result with its score as one bar in six colours, one per factor: relevance, persona fit, quality, price band, attribute affinity and audience fit.",
          "The first result linked to its decision record, an id and the six factors behind its place, each with its own bar.",
          "Shoppers split in two, one side shown your ranking and the other the ranked results, side by side.",
        ],
      },
      vi: {
        steps: [
          "Truy vấn “lightweight laptop for travel” được đọc thành ba ý, máy tính xách tay, nhẹ và du lịch, mỗi ý được đối chiếu với cùng trường đó trên mọi kết quả.",
          "Những gì lần ghé này đã xem, tìm và lọc làm dịch ba thanh trượt, chân dung, độ tương hợp và khoảng giá, và các kết quả xếp lại từ một đến ba.",
          "Một truy vấn và một đám đông người mua: phần lớn đi tới kết quả đã xếp hạng, còn một phần nhỏ hơn được đưa tới danh sách giữ lại theo thứ tự gốc.",
        ],
        gains: [
          "Truy vấn “15-inch laptop under 1.5 kg” được tách thành kích thước màn hình 15 inch và cân nặng dưới 1,5 kg, mỗi thứ thành một bộ lọc.",
          "Kết quả đầu tiên với điểm số là một thanh sáu màu, mỗi màu một yếu tố: độ liên quan, mức khớp chân dung, chất lượng, khoảng giá, độ tương hợp thuộc tính và mức khớp nhóm khách hàng.",
          "Kết quả đầu tiên nối với bản ghi quyết định của nó, một mã và sáu yếu tố đứng sau vị trí của nó, mỗi yếu tố một thanh.",
          "Người mua tách làm hai, một bên thấy thứ hạng của bạn và bên kia thấy kết quả đã xếp hạng, đặt cạnh nhau.",
        ],
      },
    },
    l,
  );
