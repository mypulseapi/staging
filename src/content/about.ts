import { byLocale, type Widen } from "./locale";
/**
 * About page.
 *
 * The competitor's about page is a leadership grid: 22 individual team pages,
 * headshots, titles. That works when you have 22 people and named customers. We
 * have neither, and a thin imitation of it would read as exactly what it is.
 *
 * So this page does the thing they cannot: it shows the working. What we set out
 * to test, what the test said, what it did not say, and what we are still unsure
 * about. For an early company talking to careful buyers, a visible method is a
 * stronger credential than a headshot wall.
 */
export const ABOUT_HERO = {
  eyebrow: "About",
  title:
    "We measure whether product data can answer the questions shoppers ask.",
  lede: "Pulse started from a narrow observation: a shopper cannot filter on a field your catalogue never recorded, so the most valuable gaps are invisible to every tool that learns from engagement. Everything we have built since is an attempt to measure that properly and to be honest about where the measurement stops.",
} as const;

export const BELIEFS = [
  {
    title: "Show the working, not just the answer",
    body: "Every number on this site can be reproduced from our own repository with one command. If we cannot show you how a figure was produced, we do not print it. That rule is the reason there is no conversion statistic anywhere on this site.",
  },
  {
    title: "A negative result is still a result",
    body: "Our own research log records a spike that failed its criteria, a second run that passed for the wrong reason, and a third that finally held. We kept all three. A company that only publishes what worked is telling you less than it appears to.",
  },
  {
    title: "Say what the measurement cannot do",
    body: "Our ranking is stable at the top and less stable below it, and we print that next to the ranking rather than in a footnote. Precision about your own limits is cheap to give and very hard to fake.",
  },
  {
    title: "Earn the integration, do not assume it",
    body: "The first thing we sell needs no code, no tag and no access to your systems. If the audit is not useful, you have lost a few minutes. Nothing about the runtime is worth discussing until that part has proved itself.",
  },
] as const;

export const STORY = {
  eyebrow: "Where this came from",
  title: "It started with a test shelf.",
  paragraphs: [
    "We built a test shelf of 216 products, 156 generated laptop listings and 60 real listings from a Vietnamese marketplace's laptop category, to answer what seemed like a simple question: if a shopper had to choose, could this catalogue help them? It could not. Forty-seven of the 216, all accessories and software from the real listings, recorded nothing anybody could filter on. No screen size, no memory, no storage, no processor.",
    "The interesting part was not that the data was missing. It was that the standard way of deciding what to fix would have got the order wrong. Rank the gaps by how much data is absent and processor comes third, because 162 products lack it. Rank them by what shoppers actually said they needed and processor comes last, because only 2 of 32 stated requirements mention one at all.",
    "That gap between absence and demand is the whole company. It is measurable, it is reproducible, and as far as we can tell nobody else is measuring it, because measuring it requires starting from the decision rather than from the clickstream.",
  ],
} as const;

export const HONEST_STATE = {
  eyebrow: "Where we actually are",
  title: "Early, and specific about it.",
  rows: [
    {
      label: "What is proven",
      value:
        "The measurement. The ranking is stable at the top across every seed, weighting and imputation scope we have tested.",
    },
    {
      label: "What is built",
      value:
        "The audit engine, and a runtime that ranks a catalogue live and explains every score it produces.",
    },
    {
      label: "What is not proven",
      value:
        "Any effect on revenue or conversion. We have run no live experiment, so we have no number and will not offer one.",
    },
    {
      label: "What we are unsure about",
      value:
        "How far the method generalises beyond the categories we have measured. We will know when more merchants have run it.",
    },
    {
      label: "Customers we can name",
      value:
        "None yet. When that changes we will say so here, with their permission.",
    },
  ],
} as const;

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const ABOUT_HERO_VI = {
  eyebrow: "Về chúng tôi",
  title:
    "Chúng tôi đo xem dữ liệu sản phẩm có trả lời được những câu người mua hỏi hay không.",
  lede: "Pulse khởi đi từ một quan sát hẹp: người mua không thể lọc theo một trường mà danh mục của bạn chưa bao giờ ghi, nên những khoảng trống giá trị nhất lại vô hình với mọi công cụ học từ dữ liệu tương tác. Tất cả những gì chúng tôi xây từ đó tới nay là một nỗ lực đo điều ấy cho tử tế, và trung thực về chỗ phép đo dừng lại.",
} as const;

export const BELIEFS_VI = [
  {
    title: "Trình bày cách làm, không chỉ đưa đáp án",
    body: "Mọi con số trên trang này đều tái lập được từ chính kho mã của chúng tôi bằng một câu lệnh. Nếu không trình bày được một con số ra đời thế nào, chúng tôi không in nó. Chính quy tắc đó là lý do trên trang này không có bất kỳ thống kê chuyển đổi nào.",
  },
  {
    title: "Một kết quả phủ định vẫn là một kết quả",
    body: "Nhật ký nghiên cứu của chính chúng tôi ghi lại một lần thử nghiệm trượt tiêu chí, một lần thứ hai đạt nhưng vì lý do sai, và một lần thứ ba cuối cùng trụ được. Chúng tôi giữ cả ba. Một công ty chỉ công bố những gì thành công đang nói với bạn ít hơn vẻ bề ngoài của nó.",
  },
  {
    title: "Nói rõ phép đo không làm được gì",
    body: "Thứ hạng của chúng tôi ổn định ở đầu bảng và kém ổn định hơn ở phía dưới, và chúng tôi in điều đó ngay cạnh bảng xếp hạng chứ không nhét vào chú thích chân trang. Nói chính xác về giới hạn của chính mình thì rẻ, và rất khó giả vờ.",
  },
  {
    title: "Giành lấy việc tích hợp, đừng mặc định nó",
    body: "Thứ đầu tiên chúng tôi bán không cần mã nguồn, không cần thẻ theo dõi và không cần quyền truy cập hệ thống của bạn. Nếu bản kiểm tra không hữu ích, bạn chỉ mất vài phút. Không có gì về bộ máy thời gian thực đáng bàn tới cho tới khi phần kia đã tự chứng minh được mình.",
  },
] as const;

export const STORY_VI = {
  eyebrow: "Chuyện này bắt đầu từ đâu",
  title: "Nó bắt đầu từ một kệ thử nghiệm.",
  paragraphs: [
    "Chúng tôi dựng một kệ thử nghiệm 216 sản phẩm, gồm 156 mẫu laptop tạo sẵn và 60 sản phẩm thật trong ngành hàng laptop của một sàn Việt Nam, để trả lời một câu tưởng như đơn giản: nếu một người mua phải chọn, danh mục này có giúp được họ không? Nó không giúp được. Bốn mươi bảy trong số 216 sản phẩm, tất cả là phụ kiện và phần mềm trong nhóm sản phẩm thật, không ghi lại thứ gì mà ai đó có thể lọc. Không kích thước màn hình, không RAM, không dung lượng, không vi xử lý.",
    "Phần thú vị không nằm ở chỗ dữ liệu bị thiếu. Nó nằm ở chỗ cách thông thường để quyết định sửa gì trước sẽ cho ra thứ tự sai. Xếp các khoảng trống theo lượng dữ liệu vắng mặt thì vi xử lý đứng thứ ba, vì 162 sản phẩm thiếu nó. Xếp theo điều người mua thực sự nói là họ cần thì vi xử lý đứng cuối, vì chỉ 2 trong 32 yêu cầu được nêu có nhắc tới nó.",
    "Khoảng cách giữa sự vắng mặt và nhu cầu chính là toàn bộ công ty này. Nó đo được, nó tái lập được, và theo những gì chúng tôi biết thì chưa ai khác đang đo nó, bởi đo được nó đòi hỏi phải xuất phát từ quyết định thay vì từ dòng dữ liệu nhấp chuột.",
  ],
} as const;

export const HONEST_STATE_VI = {
  eyebrow: "Chúng tôi thực sự đang ở đâu",
  title: "Còn sớm, và nói rõ là sớm ở chỗ nào.",
  rows: [
    {
      label: "Điều đã được chứng minh",
      value:
        "Phép đo. Thứ hạng ổn định ở đầu bảng qua mọi seed, mọi cách đặt trọng số và mọi phạm vi ước lượng chúng tôi đã thử.",
    },
    {
      label: "Điều đã xây xong",
      value:
        "Bộ máy kiểm tra, và một bộ máy thời gian thực xếp hạng danh mục trực tiếp cùng lời giải thích cho mọi điểm số nó tạo ra.",
    },
    {
      label: "Điều chưa được chứng minh",
      value:
        "Bất kỳ tác động nào lên doanh thu hay tỷ lệ chuyển đổi. Chúng tôi chưa chạy thử nghiệm trực tiếp nào, nên không có con số nào và sẽ không đưa ra.",
    },
    {
      label: "Điều chúng tôi còn chưa chắc",
      value:
        "Phương pháp khái quát được xa tới đâu ra ngoài những ngành hàng chúng tôi đã đo. Chúng tôi sẽ biết khi có thêm nhà bán chạy nó.",
    },
    {
      label: "Khách hàng có thể nêu tên",
      value:
        "Chưa có. Khi điều đó thay đổi, chúng tôi sẽ nói ở đây, với sự cho phép của họ.",
    },
  ],
} as const;

/** Alt text for the two photographs on this page. Localised, like the copy. */

/**
 * The three expanding sections the 2026-10 review asked for: management team,
 * company, location, collapsed under the title so nobody meets six biographies
 * at once.
 *
 * `members` holds PLACEHOLDERS, at the dev's request, so the section can be seen
 * working. They are named "A. Placeholder" and so on deliberately: a plausible
 * invented name can collide with a real person, and these cannot be mistaken for
 * a real roster by anyone, including by us in three weeks.
 *
 * No `linkedin` values. A guessed profile URL resolves to a real stranger's
 * page, which is a different and worse problem than a missing link, so the
 * button renders only where a real URL is supplied.
 *
 * REPLACE BEFORE LAUNCH: real names, roles and LinkedIn URLs. `scripts/check-placeholders.mjs`
 * fails the build if these reach a production build.
 */
export const ABOUT_SECTIONS = {
  eyebrow: "About us",
  title: "Who is behind this.",
  team: {
    label: "Management team",
    blurb: "The founder and the technical team, with what each of them owns.",
    members: [
      { name: "A. Placeholder", role: "Founder" },
      { name: "B. Placeholder", role: "Engineering lead" },
      { name: "C. Placeholder", role: "Head of merchandising research" },
    ] as ReadonlyArray<{ name: string; role: string; linkedin?: string }>,
  },
  company: {
    label: "Company",
    blurb: "What we work on, and the question the product came from.",
    rows: [
      { label: "Founded", value: "March 2026." },
      {
        label: "Our field",
        value:
          "Product data measurement for commerce, using information theory rather than engagement analytics.",
      },
      {
        label: "What we make",
        value:
          "The Decision Audit, which ranks the product attributes most worth recording, plus the verification and monitoring that follow it.",
      },
      {
        label: "Where it came from",
        value:
          "A test shelf of 216 products, where ranking the gaps by how much data was absent produced almost the opposite order to ranking them by what shoppers said they needed. That gap is the company.",
      },
    ],
  },
  location: {
    label: "Location",
    blurb: "Where we are, and the merchants we work with.",
    rows: [
      { label: "Headquarters", value: "Singapore." },
      {
        label: "Engineering",
        value: "A branch in Vietnam, in Ho Chi Minh City, on GMT+7.",
      },
      {
        label: "Who we work with",
        value:
          "Merchants in Vietnam and across Southeast Asia, starting with one category each.",
      },
    ],
  },
} as const;

export const ABOUT_ART = {
  heroAlt: "Four people around a table with laptops open, mid-discussion.",
  shelfAlt:
    "A workspace with a monitor showing product charts, a shelf of binders and a desk lamp.",
} as const;

export const ABOUT_SECTIONS_VI = {
  eyebrow: "Về chúng tôi",
  title: "Những người đứng sau việc này.",
  team: {
    label: "Đội ngũ quản lý",
    blurb: "Nhà sáng lập và đội kỹ thuật, kèm phần việc mỗi người phụ trách.",
    members: [
      { name: "A. Placeholder", role: "Nhà sáng lập" },
      { name: "B. Placeholder", role: "Trưởng nhóm kỹ thuật" },
      {
        name: "C. Placeholder",
        role: "Phụ trách nghiên cứu trưng bày hàng hoá",
      },
    ] as ReadonlyArray<{ name: string; role: string; linkedin?: string }>,
  },
  company: {
    label: "Công ty",
    blurb: "Chúng tôi làm gì, và câu hỏi đã sinh ra sản phẩm này.",
    rows: [
      { label: "Thành lập", value: "Tháng 3 năm 2026." },
      {
        label: "Lĩnh vực",
        value:
          "Đo lường dữ liệu sản phẩm cho thương mại, dựa trên lý thuyết thông tin thay vì phân tích tương tác.",
      },
      {
        label: "Chúng tôi làm gì",
        value:
          "Decision Audit, xếp hạng những thuộc tính sản phẩm đáng ghi nhận nhất, cùng phần xác minh và giám sát đi sau nó.",
      },
      {
        label: "Bắt đầu từ đâu",
        value:
          "Một kệ thử nghiệm 216 sản phẩm, nơi xếp hạng khoảng trống theo lượng dữ liệu còn thiếu cho ra thứ tự gần như ngược với xếp theo điều người mua nói họ cần. Khoảng cách đó chính là công ty này.",
      },
    ],
  },
  location: {
    label: "Địa điểm",
    blurb: "Chúng tôi ở đâu, và làm việc với những nhà bán nào.",
    rows: [
      { label: "Trụ sở chính", value: "Singapore." },
      {
        label: "Kỹ thuật",
        value:
          "Một chi nhánh tại Việt Nam, ở Thành phố Hồ Chí Minh, múi giờ GMT+7.",
      },
      {
        label: "Chúng tôi làm việc với ai",
        value:
          "Các nhà bán tại Việt Nam và khắp Đông Nam Á, bắt đầu từ mỗi bên một ngành hàng.",
      },
    ],
  },
} as const;

export const ABOUT_ART_VI: Widen<typeof ABOUT_ART> = {
  heroAlt: "Bốn người quanh một chiếc bàn với laptop mở, đang trao đổi.",
  shelfAlt:
    "Một góc làm việc với màn hình hiển thị biểu đồ sản phẩm, kệ tài liệu và đèn bàn.",
};

export const aboutArt = (l: string) =>
  byLocale<Widen<typeof ABOUT_ART>>({ en: ABOUT_ART, vi: ABOUT_ART_VI }, l);

export const aboutHero = (l: string) =>
  byLocale({ en: ABOUT_HERO, vi: ABOUT_HERO_VI }, l);
export const beliefs = (l: string) =>
  byLocale({ en: BELIEFS, vi: BELIEFS_VI }, l);
export const story = (l: string) => byLocale({ en: STORY, vi: STORY_VI }, l);
export const honestState = (l: string) =>
  byLocale({ en: HONEST_STATE, vi: HONEST_STATE_VI }, l);
export const aboutSections = (l: string) =>
  byLocale({ en: ABOUT_SECTIONS, vi: ABOUT_SECTIONS_VI }, l);
