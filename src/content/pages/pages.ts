import { byLocale } from "@/content/locale";
import {
  LayoutGrid,
  Megaphone,
  Blocks,
  SplitSquareHorizontal,
} from "lucide-react";
import type { ChapterContent } from "@/components/designed/product/chapters";

/**
 * Landing and category pages. Same ranker again, applied to the grid rather
 * than to a slot or a result set. The honest framing is that a page is the
 * easiest surface to personalise and the one where a wrong order costs most,
 * because it is usually the first thing paid traffic sees.
 */
export const PAGES: ChapterContent = {
  meta: {
    title: "Personalised category pages and landing pages",
    description:
      "A campaign sends a thousand people to one page and all see the same grid. This orders it against what each visit implies, with a held-back control arm.",
  },
  eyebrow: "Pages",
  title: "Category and landing pages ordered for whoever arrived.",
  lede: "A campaign sends a thousand people to one page and every one of them sees the same grid. Personalised category pages order that grid against what each visit implies, from the first page view, with a share of traffic held back so you can tell whether it helped.",

  heroImage: {
    src: "product/pages-hero-ordered-for-whoever-arrived.webp",
    width: 1600,
    height: 711,
    alt: "Pages: one product grid, two visits. A visitor from a newsletter and a visitor from a search ad land on the same page, and each sees the grid ordered for how they arrived.",
  },

  visualHeading: "One page, two arms.",
  visualBody:
    "The same grid ordered by the engine and by your own rule, side by side, per session.",

  chainBlock: {
    eyebrow: "What the click already told you",
    heading: "The campaign knew what they wanted. The landing page forgot.",
    body: "Everything needed to order that grid arrived with the request, before anyone clicked anything.",
  },

  scenes: {
    situation: {
      kind: "asks",
      eyebrow: "What the campaign knew about this click",
      rows: [
        { label: "The keyword they searched", eg: "in the request", ok: true },
        { label: "The creative they clicked", eg: "in the request", ok: true },
        {
          label: "Used to order the grid",
          eg: "discarded on arrival",
          ok: false,
        },
      ],
      okLabel: "Known",
      noLabel: "Thrown away",
      note: "of what arrived with the click reaches the grid. The rest is read by your ad platform and then dropped at the door.",
    },

    chain: {
      kind: "delta",
      label: "Products above the fold that match what the ad promised",
      before: { v: 2, label: "Default grid order" },
      after: { v: 9, label: "Ordered for the arrival" },
      note: "Illustrative of the shape rather than a measurement of your page. The grid, the layout and the template do not change; only the sequence does.",
      footer: "Same page, same template, same twelve slots.",
    },
  },

  situation: {
    heading: "You pay for the click, then show everyone the same page.",
    body: [
      "The visit itself carries more than the rule does, and it carries it immediately. Which campaign, which device, what they touched in the first fifteen seconds. None of that needs an identity and all of it is available before the second page view.",
    ],
    pull: "The grid you paid to put someone in front of is usually ordered by a rule written before you knew they existed.",
  },

  steps: {
    heading: "How a page gets ordered",
    items: [
      {
        n: "01",
        meta: "Arrival",
        title: "The visit starts with context",
        body: "Referrer, device and the campaign that sent them are available on the first request, before anybody has clicked anything.",
      },
      {
        n: "02",
        meta: "Live",
        title: "It re-ranks as they move",
        body: "Every view, filter and search inside the visit updates the ordering of what has not been seen yet.",
      },
      {
        n: "03",
        meta: "Measured",
        title: "A share sees your rule",
        body: "The held-back arm renders the page your existing way, stable per session, so the two orderings can be compared on your own traffic rather than in principle.",
      },
    ],
  },

  gets: {
    heading: "What you get",
    items: [
      {
        icon: LayoutGrid,
        title: "Any grid, any page",
        body: "Category listings, landing pages, collection pages, the home grid. The engine is asked to order a set of products and does not need to know what the page is for.",
      },
      {
        icon: Megaphone,
        title: "Campaign context from the first request",
        body: "The referrer and campaign that delivered the visit are signals like any other, so paid traffic is not starting from nothing the way a profile-based system makes it.",
      },
      {
        icon: Blocks,
        title: "Your layout, untouched",
        body: "It orders products. It does not template your page, own your components or ask you to move to a new page builder, because ordering is the part that was wrong.",
      },
      {
        icon: SplitSquareHorizontal,
        title: "A control arm on every page",
        body: "A share of sessions always sees your existing order. That is how any claim about this page, including ours, gets to be checked rather than believed.",
      },
    ],
  },

  limits: {
    heading: "What pages will and will not do",
    will: [
      "Order the grid on any page against what the visit implies, from the first request",
      "Re-rank what has not been seen yet as the visit continues",
      "Leave a portion of every campaign on the original grid order, so the comparison survives the campaign",
      "Leave your layout, templates and page tooling exactly where they are",
    ],
    wont: [
      "Give you a conversion number. A pilot on your own campaigns produces one; this page cannot, and will not borrow one",
      "Build or host your pages. It orders the products on them; the page is yours",
      "Order on attributes your catalogue does not record",
      "Do much for a page whose products are indistinguishable from one another. That is a catalogue problem and the audit is what finds it",
    ],
  },

  faq: [
    {
      q: "Do we have to rebuild our pages?",
      a: "No. It changes the order of the products in a grid and nothing else. Your templates, components and page tooling stay where they are, and if you switch it off the grid renders in your original order because that order is the fallback.",
    },
    {
      q: "What does it know about a visitor who just arrived?",
      a: "The referrer, the campaign that delivered them and their device, all available on the first request. That is materially more than a profile-based system has on an anonymous arrival, which is nothing, and it needs no cookie or consent to read.",
    },
    {
      q: "Does it work on paid landing pages?",
      a: "That is the case it is most useful for, because you have already paid for the click and the page is otherwise ordered by a rule written before the campaign existed. It is also the case where a held-back arm matters most, since you can put a number on what the ordering did.",
    },
    {
      q: "How is this different from your recommendations?",
      a: "Only in where it points. Recommendations order a slot, pages order a grid, and search orders a result set. One ranker, one set of factors, three surfaces, which is why understanding one of these pages means you understand the other two.",
    },
    {
      q: "Can we still pin products?",
      a: "Not yet, and we would rather say so than imply otherwise. Merchandiser overrides are described on the Merchandising Studio page along with what is and is not built today.",
    },
  ],

  cta: {
    title: "Fix the shelf, then order the page.",
    body: "A grid can only be ordered on facts the catalogue records. Your store's address tells you which ones yours is missing.",
    label: "Request a Decision Audit",
    href: "/contact",
    note: "No price is quoted before a pilot, because there is nothing yet to price it against.",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const PAGES_VI: ChapterContent = {
  meta: {
    title: "Trang danh mục: lưới hàng sắp cho đúng người vừa tới",
    description:
      "Một chiến dịch đưa nghìn người tới cùng một trang và tất cả thấy chung một lưới. Cái này sắp theo điều từng lần ghé hàm ý, kèm nhánh đối chứng.",
  },
  eyebrow: "Trang danh mục",
  title: "Trang ngành hàng và trang đích được sắp xếp cho đúng người vừa tới.",
  lede: "Một chiến dịch đưa một nghìn người tới cùng một trang và tất cả đều thấy chung một lưới sản phẩm. Cái này sắp xếp lưới đó theo những gì từng lần ghé hàm ý, ngay từ lượt xem trang đầu tiên, với một phần lưu lượng được giữ lại để bạn biết nó có giúp ích hay không.",

  heroImage: {
    src: "product/pages-hero-ordered-for-whoever-arrived.webp",
    width: 1600,
    height: 711,
    alt: "Pages: một lưới sản phẩm, hai lần ghé. Một khách tới từ bản tin và một khách tới từ quảng cáo tìm kiếm vào cùng một trang, và mỗi người thấy lưới được sắp theo cách họ đến.",
  },

  visualHeading: "Một trang, hai nhánh.",
  visualBody:
    "Cùng một lưới sản phẩm, sắp bởi bộ máy và sắp bởi quy tắc của bạn, đặt cạnh nhau, theo từng phiên.",

  chainBlock: {
    eyebrow: "Cú nhấp đã nói gì rồi",
    heading: "Chiến dịch biết họ muốn gì. Trang đích thì quên mất.",
    body: "Mọi thứ cần để sắp lại lưới sản phẩm đó đều đã đến cùng yêu cầu, trước khi ai nhấp thêm cái gì.",
  },

  scenes: {
    situation: {
      kind: "asks",
      eyebrow: "Chiến dịch đã biết gì về cú nhấp này",
      rows: [
        { label: "Từ khoá họ đã tìm", eg: "có trong yêu cầu", ok: true },
        { label: "Mẫu quảng cáo họ đã nhấp", eg: "có trong yêu cầu", ok: true },
        { label: "Được dùng để sắp lưới", eg: "bị bỏ ngay khi vào", ok: false },
      ],
      okLabel: "Đã biết",
      noLabel: "Bị vứt đi",
      note: "trong những gì đi kèm cú nhấp thực sự tới được lưới sản phẩm. Phần còn lại được nền tảng quảng cáo đọc rồi bỏ lại ngoài cửa.",
    },

    chain: {
      kind: "delta",
      label: "Sản phẩm hiện ngay màn hình đầu khớp với lời hứa của quảng cáo",
      before: { v: 2, label: "Thứ tự lưới mặc định" },
      after: { v: 9, label: "Sắp theo người vừa tới" },
      note: "Minh hoạ cho hình dạng vấn đề chứ không phải phép đo trên trang của bạn. Lưới, bố cục và mẫu giao diện đều không đổi; chỉ thứ tự đổi.",
      footer: "Cùng một trang, cùng mẫu giao diện, cùng mười hai ô.",
    },
  },

  situation: {
    heading:
      "Bạn trả tiền cho lượt nhấp, rồi cho mọi người xem cùng một trang.",
    body: [
      "Bản thân lần ghé mang nhiều thông tin hơn quy tắc đó, và mang ngay lập tức. Chiến dịch nào, thiết bị nào, họ chạm vào gì trong mười lăm giây đầu. Không điều nào cần tới danh tính và tất cả đều có sẵn trước lượt xem trang thứ hai.",
    ],
    pull: "Cái lưới sản phẩm mà bạn trả tiền để đặt ai đó trước nó thường được sắp bởi một quy tắc viết từ trước khi bạn biết người đó tồn tại.",
  },

  steps: {
    heading: "Một trang được sắp xếp ra sao",
    items: [
      {
        n: "01",
        meta: "Lúc tới",
        title: "Lần ghé bắt đầu đã có bối cảnh",
        body: "Nguồn giới thiệu, thiết bị và chiến dịch đưa họ tới đều có sẵn ngay ở yêu cầu đầu tiên, trước khi ai kịp nhấp vào gì.",
      },
      {
        n: "02",
        meta: "Trực tiếp",
        title: "Nó xếp lại khi họ di chuyển",
        body: "Mọi lượt xem, lượt lọc và lượt tìm trong lần ghé đều cập nhật thứ tự của những gì chưa được nhìn thấy.",
      },
      {
        n: "03",
        meta: "Đo được",
        title: "Một phần thấy quy tắc của bạn",
        body: "Nhánh được giữ lại hiển thị trang theo cách sẵn có của bạn, ổn định theo phiên, nên hai cách sắp xếp so sánh được trên chính lưu lượng của bạn chứ không phải trên lý thuyết.",
      },
    ],
  },

  gets: {
    heading: "Bạn nhận được gì",
    items: [
      {
        icon: LayoutGrid,
        title: "Mọi lưới, mọi trang",
        body: "Trang liệt kê ngành hàng, trang đích, trang bộ sưu tập, lưới trang chủ. Bộ máy được yêu cầu sắp xếp một tập sản phẩm và không cần biết trang đó dùng để làm gì.",
      },
      {
        icon: Megaphone,
        title: "Bối cảnh chiến dịch ngay từ yêu cầu đầu tiên",
        body: "Nguồn giới thiệu và chiến dịch đưa lần ghé tới là tín hiệu như mọi tín hiệu khác, nên lưu lượng trả phí không phải xuất phát từ con số không như cách một hệ dựa trên hồ sơ bắt nó phải vậy.",
      },
      {
        icon: Blocks,
        title: "Bố cục của bạn, không bị đụng tới",
        body: "Nó sắp xếp sản phẩm. Nó không dựng khuôn trang, không sở hữu component của bạn và không đòi bạn chuyển sang một trình dựng trang mới, bởi khâu sắp xếp mới là khâu sai.",
      },
      {
        icon: SplitSquareHorizontal,
        title: "Một nhánh đối chứng trên mọi trang",
        body: "Một phần phiên truy cập luôn thấy thứ tự sẵn có của bạn. Đó là cách để mọi khẳng định về trang này, kể cả của chúng tôi, được kiểm chứng thay vì được tin theo.",
      },
    ],
  },

  limits: {
    heading: "Trang danh mục sẽ làm gì và không làm gì",
    will: [
      "Sắp xếp lưới sản phẩm trên mọi trang theo những gì lần ghé hàm ý, ngay từ yêu cầu đầu tiên",
      "Xếp lại những gì chưa được nhìn thấy khi lần ghé tiếp diễn",
      "Để một phần của mỗi chiến dịch chạy trên thứ tự lưới gốc, để phép so sánh còn lại sau khi chiến dịch kết thúc",
      "Để nguyên bố cục, khuôn trang và công cụ dựng trang của bạn ở đúng chỗ",
    ],
    wont: [
      "Đưa bạn một con số chuyển đổi. Chưa có thử nghiệm trực tiếp nào được chạy, nên bất kỳ con số nào cũng là cửa hàng của người khác",
      "Dựng hay lưu trữ trang cho bạn. Nó sắp xếp sản phẩm trên trang; trang là của bạn",
      "Sắp xếp theo những thuộc tính danh mục của bạn không ghi",
      "Giúp được nhiều cho một trang mà các sản phẩm không phân biệt nổi với nhau. Đó là vấn đề của danh mục và bản kiểm tra là thứ tìm ra nó",
    ],
  },

  faq: [
    {
      q: "Chúng tôi có phải dựng lại các trang không?",
      a: "Không. Nó đổi thứ tự các sản phẩm trong một lưới và không đổi gì khác. Khuôn trang, component và công cụ dựng trang của bạn vẫn ở nguyên chỗ, và nếu bạn tắt đi thì lưới hiển thị theo thứ tự gốc của bạn, bởi thứ tự đó là phương án dự phòng.",
    },
    {
      q: "Nó biết gì về một khách vừa mới tới?",
      a: "Nguồn giới thiệu, chiến dịch đã đưa họ tới và thiết bị của họ, tất cả đều có ở yêu cầu đầu tiên. Chừng đó nhiều hơn hẳn những gì một hệ dựa trên hồ sơ có được với một lượt tới ẩn danh, vốn là không có gì, và nó không cần cookie hay sự đồng ý nào để đọc.",
    },
    {
      q: "Nó có chạy trên trang đích trả phí không?",
      a: "Đó là trường hợp nó hữu ích nhất, vì bạn đã trả tiền cho lượt nhấp và trang đó vốn đang được sắp bởi một quy tắc viết từ trước khi chiến dịch tồn tại. Đó cũng là trường hợp mà nhánh được giữ lại quan trọng nhất, bởi bạn có thể gán một con số cho việc sắp xếp ấy đã làm được gì.",
    },
    {
      q: "Việc này khác gì phần gợi ý sản phẩm của các bạn?",
      a: "Chỉ khác ở chỗ nó chĩa vào đâu. Gợi ý sản phẩm sắp một ô hiển thị, trang danh mục sắp một lưới, và tìm kiếm sắp một tập kết quả. Một bộ xếp hạng, một bộ yếu tố, ba bề mặt, đó là lý do hiểu một trong ba trang này nghĩa là bạn đã hiểu hai trang còn lại.",
    },
    {
      q: "Chúng tôi còn ghim được sản phẩm không?",
      a: "Chưa, và chúng tôi thà nói vậy còn hơn ám chỉ ngược lại. Các quyền ghi đè của người phụ trách trưng bày hàng hoá được mô tả ở trang Merchandising Studio, kèm những gì đã và chưa được xây dựng tới hôm nay.",
    },
  ],

  cta: {
    title: "Sửa kệ hàng trước, rồi mới sắp xếp trang.",
    body: "Một lưới sản phẩm chỉ sắp xếp được theo những dữ kiện mà danh mục có ghi. Địa chỉ cửa hàng của bạn cho biết danh mục của bạn đang thiếu những dữ kiện nào.",
    label: "Yêu cầu Decision Audit",
    href: "/contact",
    note: "Không báo giá trước khi thử nghiệm, vì chưa có gì để định giá dựa vào.",
  },
};

export const pages = (l: string) => byLocale({ en: PAGES, vi: PAGES_VI }, l);

/** The alt text of the owner's pictures: the output section's, then the steps and gains in the order of `steps.items` and `gets.items`. */
export const pagesPictureAlt = (l: string) =>
  byLocale(
    {
      en: {
        output:
          "The same category page twice, side by side, with the same header, banner and footer: one window in your rule’s order, one ranked, the same eight hiking shoes in a different order in each, and each shopper kept in the same arm all session.",
        steps: [
          "The context a visit brings before any click, the referrer, the device and the campaign, joined to a shopper landing on a page.",
          "A filter chosen in the sidebar, and the grid reordering what has not been seen yet to match it.",
          "A crowd split two ways: a share is shown the page in your rule's order, the rest the ranked order.",
        ],
        gains: [
          "Four kinds of page, a category listing, a landing page, a collection page and the home grid, each with a product grid.",
          "A campaign ad for outdoor shoes leading to a first visit with no history, and a strip of shoes recommended for it.",
          "The same page twice, its header, banner and footer unchanged, and only the products in the grid reordered.",
          "Four different pages, each with a control marker, a share of visits seeing your existing order.",
        ],
      },
      vi: {
        output:
          "Cùng một trang ngành hàng hiện hai lần, đặt cạnh nhau, giữ nguyên đầu trang, băng quảng cáo và chân trang: một cửa sổ theo thứ tự quy tắc của bạn, một cửa sổ đã xếp hạng, cùng tám đôi giày leo núi nhưng mỗi bên một thứ tự, và mỗi người mua ở nguyên một nhánh suốt phiên.",
        steps: [
          "Bối cảnh mà một lần ghé mang theo trước mọi cú nhấp, nguồn giới thiệu, thiết bị và chiến dịch, nối tới một người mua vừa vào trang.",
          "Một bộ lọc được chọn ở thanh bên, và lưới sắp xếp lại những gì chưa được xem cho khớp với nó.",
          "Một đám đông tách hai: một phần thấy trang theo thứ tự quy tắc của bạn, phần còn lại thấy thứ tự đã xếp hạng.",
        ],
        gains: [
          "Bốn loại trang, trang ngành hàng, trang đích, trang bộ sưu tập và lưới trang chủ, mỗi trang một lưới sản phẩm.",
          "Một quảng cáo chiến dịch cho giày dã ngoại dẫn tới lần ghé đầu tiên không có lịch sử, và một dải giày được gợi ý cho lần ghé đó.",
          "Cùng một trang hai lần, đầu trang, băng quảng cáo và chân trang giữ nguyên, chỉ các sản phẩm trong lưới được sắp lại.",
          "Bốn trang khác nhau, mỗi trang một dấu đối chứng, một phần lần ghé thấy thứ tự sẵn có của bạn.",
        ],
      },
    },
    l,
  );
