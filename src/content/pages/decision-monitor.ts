import { byLocale } from "@/content/locale";
import { Bell, TrendingDown, CalendarClock, Layers } from "lucide-react";
import type { StoryContent } from "@/components/StoryPage";

/** For the person who fixed it once and does not want to fix it again. */
export const DECISION_MONITOR: StoryContent = {
  meta: {
    title: "Product data quality monitoring: Decision Monitor",
    description:
      "Catalogues decay as unrecorded products arrive. Monitor re-measures on your cadence and tells you when a shelf slips, naming the attribute and the cause.",
  },
  eyebrow: "Decision Monitor",
  title: "Know the week a shelf stopped being decidable",
  lede: "Catalogues decay, and product data quality decays with them. New products arrive unrecorded, supplier feeds change shape, and a shelf that was ready last quarter quietly stops being ready. Monitor re-measures as your catalogue changes and tells you when one slips, naming the cause.",

  chainBlock: {
    eyebrow: "Why it gets expensive",
    heading:
      "A missing attribute costs four different things depending on when you catch it.",
    body: "The missing attribute itself does not change between week one and month six. What changes is how many products are missing it, and how senior the person who has to approve the repair has become. One product with a blank field is a correction someone makes without asking. Six hundred products with the same blank field is a budget request.",
  },

  situation: {
    heading: "The repair holds until the next few hundred SKUs arrive.",
    body: [
      "Nobody decides to let a category decay. It happens because a supplier changes their export format, or a buyer onboards a new range in a hurry, or the person who understood the taxonomy left. Each of those adds products that skip the fields your shoppers rely on.",
      "By the time anyone notices, the shelf has been quietly worse for a quarter and you are back where you started, except now the enrichment work has already been done once and asking for it again is a harder conversation.",
    ],
    pull: "One shelf fell from 71 to 62 because 340 new SKUs arrived with the deciding field blank. That is the sentence you want, in the week it happens, not at the quarterly review.",
  },

  steps: {
    heading: "How does monitoring work?",
    items: [
      {
        n: "01",
        meta: "Once",
        title: "Set the cadence",
        body: "Weekly or monthly. It rescans the same pages the audit read, so there is nothing new to build and no integration to maintain.",
      },
      {
        n: "02",
        meta: "Ongoing",
        title: "We re-measure",
        body: "The same method on every run, so the numbers are comparable over time rather than a series of unrelated snapshots.",
      },
      {
        n: "03",
        meta: "When it matters",
        title: "You get told, with the reason",
        body: "Not a dashboard you have to remember to open. An alert naming the shelf, the attribute and what caused the drop.",
      },
    ],
  },

  gets: {
    heading: "What monitoring gives you",
    items: [
      {
        icon: Bell,
        title: "An alert that names the cause",
        body: "Which category slipped, which attribute did it, and how many new products arrived without it. Enough to act on without opening anything.",
      },
      {
        icon: TrendingDown,
        title: "A trend per category",
        body: "Readiness over time per shelf, so you can see the slow drift as well as the sudden drop, and argue for the fix before it is urgent.",
      },
      {
        icon: CalendarClock,
        title: "A cadence you choose",
        body: "Some catalogues change daily and some change twice a year. You set how often, and you can change it.",
      },
      {
        icon: Layers,
        title: "Nothing new to maintain",
        body: "It reads the pages you already publish. No tag, no integration, no library to keep up to date as your platform changes.",
      },
    ],
  },

  faq: [
    {
      q: "How often should we run it?",
      a: "Match it to how often your catalogue actually changes. A marketplace onboarding sellers weekly wants weekly. A specialist retailer with two seasonal ranges wants monthly or even quarterly. Running it more often than your catalogue changes just produces identical numbers.",
    },
    {
      q: "Does Pulse need access to my database, servers, or website backend?",
      a: "No. It rescans the same public pages the audit read, on a schedule, and nothing on your site or in your stack changes.",
    },
    {
      q: "Can we monitor categories we have not audited?",
      a: "They need an audit first to set the baseline. After that, monitoring keeps measuring against it.",
    },
    {
      q: "Will we have technical support during the monitoring process?",
      a: "Yes. Monitoring is a running engagement rather than a delivered file, so you keep the same contact through it: someone who knows your taxonomy, reads the alerts with you and helps decide which ones are worth acting on.",
    },
    {
      q: "What customer systems and browser data can Pulse access, and what reaches Pulse beyond what we provide at integration?",
      a: "Nothing beyond what you provide. Pulse only accesses the data explicitly supplied through the integration, plus anonymous browser signals where the optional runtime is installed. It does not reach into internal systems and it does not collect personally identifiable information.",
    },
  ],

  cta: {
    title: "Fix it once, then keep it fixed.",
    body: "Monitoring starts after an audit, so the first step is the same one: send us one category.",
    label: "Talk to us about monitoring",
    href: "/contact",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const DECISION_MONITOR_VI: StoryContent = {
  meta: {
    title: "Giám sát chất lượng dữ liệu sản phẩm",
    description:
      "Danh mục xuống cấp khi sản phẩm mới về mà không được ghi. Monitor đo lại theo nhịp bạn đặt và báo khi một kệ tụt, kèm thuộc tính và nguyên nhân.",
  },
  eyebrow: "Decision Monitor",
  title: "Biết chính xác tuần nào một kệ hàng thôi quyết định được",
  lede: "Danh mục nào rồi cũng xuống cấp, và chất lượng dữ liệu sản phẩm cũng vậy. Sản phẩm mới về mà không được ghi thuộc tính, nguồn dữ liệu nhà cung cấp đổi cấu trúc, và một kệ hàng quý trước còn sẵn sàng thì lặng lẽ thôi sẵn sàng. Monitor đo lại khi danh mục của bạn thay đổi và báo cho bạn biết khi một kệ tụt, kèm nguyên nhân.",

  chainBlock: {
    eyebrow: "Vì sao nó thành đắt",
    heading:
      "Một thuộc tính bị thiếu tốn bốn mức chi phí khác nhau, tuỳ bạn phát hiện khi nào.",
    body: "Từ tuần một đến tháng sáu, bản thân thuộc tính bị thiếu không thay đổi gì. Thứ thay đổi là bao nhiêu sản phẩm đang thiếu nó, và người phải duyệt khoản sửa đã lên tới cấp nào. Một sản phẩm có ô trống là việc ai đó tự sửa, không cần hỏi. Sáu trăm sản phẩm cùng một ô trống là một đề xuất ngân sách.",
  },

  situation: {
    heading: "Bản sửa còn giữ được cho tới khi vài trăm SKU tiếp theo đổ về.",
    body: [
      "Không ai chủ động để một ngành hàng xuống cấp. Nó xảy ra vì một nhà cung cấp đổi định dạng xuất dữ liệu, hoặc một người mua hàng vội vã đưa một dòng sản phẩm mới lên sàn, hoặc người hiểu hệ phân loại đã nghỉ việc. Mỗi việc đó thêm vào những sản phẩm bỏ qua đúng các trường mà người mua của bạn dựa vào.",
      "Đến lúc ai đó để ý, kệ hàng đã âm thầm tệ đi suốt một quý và bạn quay lại vạch xuất phát, chỉ khác là công việc làm giàu dữ liệu đã làm một lần rồi, nên xin làm lại là một cuộc trò chuyện khó hơn nhiều.",
    ],
    pull: "Một kệ hàng tụt từ 71 xuống 62 vì 340 SKU mới về mà trường quyết định bị bỏ trống. Đó là câu bạn muốn nghe, ngay trong tuần nó xảy ra, chứ không phải ở buổi tổng kết quý.",
  },

  steps: {
    heading: "Việc giám sát hoạt động ra sao?",
    items: [
      {
        n: "01",
        meta: "Một lần",
        title: "Đặt nhịp chạy",
        body: "Hàng tuần hoặc hàng tháng. Nó quét lại đúng các trang mà bản kiểm tra đã đọc, nên không có gì mới phải xây và không có tích hợp nào phải bảo trì.",
      },
      {
        n: "02",
        meta: "Liên tục",
        title: "Chúng tôi đo lại",
        body: "Cùng phương pháp ở mọi lần chạy, nên các con số so sánh được theo thời gian thay vì là một chuỗi ảnh chụp rời rạc.",
      },
      {
        n: "03",
        meta: "Khi cần",
        title: "Bạn được báo, kèm lý do",
        body: "Không phải một bảng điều khiển bạn phải nhớ mở ra. Là một cảnh báo nêu tên kệ hàng, thuộc tính và nguyên nhân gây tụt.",
      },
    ],
  },

  gets: {
    heading: "Giám sát mang lại gì cho bạn",
    items: [
      {
        icon: Bell,
        title: "Một cảnh báo nêu rõ nguyên nhân",
        body: "Ngành hàng nào tụt, thuộc tính nào gây ra, và bao nhiêu sản phẩm mới về mà thiếu nó. Đủ để hành động mà không cần mở gì cả.",
      },
      {
        icon: TrendingDown,
        title: "Xu hướng theo từng ngành hàng",
        body: "Mức sẵn sàng theo thời gian cho từng kệ, để bạn thấy cả đà trôi chậm lẫn cú rơi đột ngột, và đề xuất sửa trước khi nó thành việc gấp.",
      },
      {
        icon: CalendarClock,
        title: "Nhịp chạy do bạn chọn",
        body: "Có danh mục đổi hằng ngày, có danh mục đổi hai lần một năm. Bạn đặt tần suất, và bạn đổi được.",
      },
      {
        icon: Layers,
        title: "Không có gì mới phải bảo trì",
        body: "Nó đọc các trang bạn vốn đã đăng. Không thẻ theo dõi, không tích hợp, không thư viện nào phải cập nhật theo nền tảng của bạn.",
      },
    ],
  },

  faq: [
    {
      q: "Chúng tôi nên chạy bao lâu một lần?",
      a: "Khớp với tần suất danh mục của bạn thực sự thay đổi. Một sàn thương mại kết nạp người bán hằng tuần thì nên chạy hằng tuần. Một nhà bán lẻ chuyên biệt với hai dòng hàng theo mùa thì hằng tháng, thậm chí hằng quý. Chạy dày hơn tốc độ danh mục thay đổi chỉ cho ra những con số giống hệt nhau.",
    },
    {
      q: "Pulse có cần quyền truy cập cơ sở dữ liệu, máy chủ hay hệ thống nền của website không?",
      a: "Không. Nó quét lại đúng các trang công khai mà bản kiểm tra đã đọc, theo lịch, và không có gì trên website hay trong hệ thống của bạn phải thay đổi.",
    },
    {
      q: "Chúng tôi giám sát được ngành hàng chưa kiểm tra không?",
      a: "Cần kiểm tra trước để đặt mốc nền. Sau đó việc giám sát cứ đo đối chiếu với mốc ấy.",
    },
    {
      q: "Trong quá trình giám sát chúng tôi có được hỗ trợ kỹ thuật không?",
      a: "Có. Giám sát là một phần việc chạy liên tục chứ không phải một tệp giao xong là hết, nên bạn giữ nguyên một đầu mối xuyên suốt: người nắm hệ phân loại của bạn, đọc cảnh báo cùng bạn và giúp quyết định cảnh báo nào đáng xử lý.",
    },
    {
      q: "Pulse truy cập được những hệ thống và dữ liệu trình duyệt nào, và có gì tới Pulse ngoài những thứ chúng tôi cung cấp khi tích hợp không?",
      a: "Không có gì ngoài những thứ bạn cung cấp. Pulse chỉ truy cập dữ liệu được cấp rõ ràng qua tích hợp, cộng với tín hiệu trình duyệt ẩn danh ở nơi có cài bộ máy thời gian thực tuỳ chọn. Nó không với vào hệ thống nội bộ của bạn và không thu thập thông tin định danh cá nhân.",
    },
  ],

  cta: {
    title: "Sửa một lần, rồi giữ cho nó luôn ổn.",
    body: "Giám sát bắt đầu sau một bản kiểm tra, nên bước đầu tiên vẫn vậy: gửi cho chúng tôi một ngành hàng.",
    label: "Trao đổi về việc giám sát",
    href: "/contact",
  },
};

export const decisionMonitor = (l: string) =>
  byLocale({ en: DECISION_MONITOR, vi: DECISION_MONITOR_VI }, l);
