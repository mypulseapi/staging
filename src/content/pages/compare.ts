import { byLocale } from "@/content/locale";
import { MousePointerClick, EyeOff, Scale, Wrench } from "lucide-react";
import type { StoryContent } from "@/components/StoryPage";

/**
 * For the buyer who already runs something and has to justify another line item.
 *
 * **The axis is the action space**, not engagement blindness. `POSITIONING.md` §2: decide, ask,
 * acquire, abstain, priced in one currency. The page argued the engagement blind spot on its own
 * until 2026-10-13, which is one of three structural gaps and the least sharp of them: it
 * describes a better report, and §1 is explicit that a report is what the old wording gave away.
 *
 * **Naming rule, §8.** The grid may appear with its columns and with rows describing *categories
 * of system*. Never a competitor's name, never a code name. A visitor learns nothing from
 * "ALTAIR" and it invites the question.
 *
 * **Claim rule, §4 and §7.** Three claims are evidenced, each on one shelf, and two competitor
 * abstention claims are unverified. So this page says "nobody we have checked", never "nobody",
 * and the FAQ says out loud that we will correct it if the check comes back the other way. §5:
 * never let a prospect find that first.
 */
export const COMPARE: StoryContent = {
  meta: {
    title: "Pulse vs PIM, search and enrichment tools",
    description:
      "Every system here can answer. The difference is what happens when the catalogue cannot support an answer, and whether anything prices the alternatives.",
  },
  eyebrow: "How we compare",
  title:
    "Everything in your stack can answer. None of it can tell you when not to.",
  lede: "Given a buying task and incomplete information, a system has four moves: decide now, ask the shopper, record the missing product fact, or say the shelf cannot be resolved. Most of the market has one of them, and nothing we have checked prices them against each other. Pulse prices all four in one unit.",

  visualHeading: "The two rankings invert, on one shelf.",
  visualBody:
    "Missing on the most products. Needed by the fewest shoppers. Enriching by completeness spends the budget on the attribute that changes the fewest decisions.",

  chainBlock: {
    eyebrow: "The difference, in one line",
    heading:
      "Ranking always returns an order, including when the order is noise.",
    body: "When nothing recorded separates the candidates, a ranked list still looks like a recommendation. The shopper cannot tell the difference, and neither can you.",
  },

  scenes: {
    situation: {
      kind: "asks",
      eyebrow: "The action space",
      rows: [
        {
          label: "Decide: rank and answer now",
          eg: "every system here",
          ok: true,
        },
        {
          label: "Ask: put a question to the shopper",
          eg: "guided selling",
          ok: true,
        },
        {
          label: "Acquire: record a missing fact, permanently",
          eg: "audit and enrichment tools",
          ok: true,
        },
        {
          label: "Abstain: say the catalogue cannot separate these",
          eg: "nobody we have checked",
          ok: false,
        },
        {
          label: "Price all four against each other, in one unit",
          eg: "nobody we have checked",
          ok: false,
        },
      ],
      okLabel: "Already in your stack",
      noLabel: "Not yet found",
      note: "Four moves and the arithmetic that chooses between them. The first three are capabilities somebody already sells you. The last two are the whole argument, and if you already have them you do not need us.",
    },

    hero: {
      kind: "lanes",
      lanes: [
        {
          eyebrow: "A system that can only answer",
          title: "It returns an order whatever the catalogue holds.",
          body: "With nothing recorded that separates the candidates, the order is arbitrary and is presented exactly like an order that was not. The failure is invisible to everyone, including the team that shipped it.",
          verdict: "Confident in the one case it should not be.",
          tone: "hold",
        },
        {
          eyebrow: "A system that can decline",
          title: "It measures whether an answer is supported first.",
          body: "When it is not, the next move is chosen on its price: ask the shopper, record the fact for every future shopper, or state plainly that this shelf cannot resolve the question yet.",
          verdict: "Narrow, checkable, and the whole difference.",
          tone: "good",
        },
      ],
    },

    chain: {
      kind: "facts",
      facts: [
        {
          value: "162",
          label: "Products missing a processor",
          note: "of 216 on our test shelf, so a completeness report ranks it first",
          tone: "warn",
        },
        {
          value: "2",
          label: "Shoppers it would have helped",
          note: "of 32 real buying requirements, only 2 mention a processor at all",
          tone: "hold",
        },
        {
          value: "17",
          label: "Requirements nothing can match",
          note: "of those 32, the catalogue cannot answer 17 however it is ranked",
          tone: "good",
        },
      ],
      note: "The first two are the same attribute under two measures, and they invert. Standard practice is not imprecise here, it is pointed the wrong way: enriching by completeness spends the budget on the attribute that changes the fewest decisions. The third is the number no report in this market produces.",
    },
  },

  situation: {
    heading:
      "Keep what you have. This is a move your stack cannot make, not a replacement for it.",
    body: [
      "Search, personalisation, guided selling, your PIM and your feed manager all answer well, and on the fields your shoppers already use they have data we do not. Nothing here asks you to move off any of them.",
      "Three gaps survive a full stack. First, ranking enrichment by engagement cannot see an attribute that was never recorded: a field that does not exist produces no clicks, so it sorts last permanently, and it is often the field worth adding. Second, a fixed audit rubric checks the same points on every catalogue, so it cannot say which gap matters for a specific buying task, cannot price acquiring it, and cannot tell you when it is wrong.",
      "Third, and this is the one to take to your technical reviewer: nothing says the question cannot be answered. On the shelf we measured, 17 of 32 realistic requirements could not be matched at all. A ranked list was returned for every one of them.",
    ],
    pull: "A system that can say “I cannot answer this” is the one worth trusting when it says “I can”.",
  },

  steps: {
    heading: "The four moves, and what each one costs",
    items: [
      {
        n: "01",
        meta: "Free",
        title: "Decide",
        body: "Rank with what is recorded and answer now. Costs nothing and is the option every other move has to beat, which is what stops the system recommending work for its own sake.",
      },
      {
        n: "02",
        meta: "Costs attention",
        title: "Ask",
        body: "Put one question to the shopper. It resolves this session and only this session, and some shoppers leave rather than answer. Priced accordingly.",
      },
      {
        n: "03",
        meta: "Costs labour",
        title: "Acquire",
        body: "Record the missing fact once, and it serves every future shopper in that category until it goes stale. Worth less than a question today and usually far more in total. That multiplication is the part nobody else computes.",
      },
      {
        n: "04",
        meta: "Costs a sale",
        title: "Abstain",
        body: "Say the shelf cannot separate these candidates. The honest cost is a lost sale, which is why it has to be priced rather than avoided, and why most systems never offer it.",
      },
    ],
  },

  gets: {
    heading: "What we add to a stack that already works",
    items: [
      {
        icon: EyeOff,
        title: "The answer nobody else returns",
        body: "A list of the buying requirements your catalogue cannot resolve at all. Not a low confidence score on a ranked list: a statement that the ranking would have been noise.",
      },
      {
        icon: Scale,
        title: "One unit for unlike things",
        body: "Bits of decision information per unit of cost, so a question to a shopper and a week of enrichment can be compared. Without a shared unit nothing chooses between them, and nothing does today.",
      },
      {
        icon: Wrench,
        title: "The cost of each fix, before you commit",
        body: "A rank with a price attached: what a script closes this week against what has to be acquired by hand, and how many future decisions each one serves.",
      },
      {
        icon: MousePointerClick,
        title: "An input to what you already run",
        body: "The output is a priority list and a set of unanswerable requirements. They go into your PIM, your backlog or your merchandising plan.",
      },
    ],
  },

  limits: {
    heading: "Where we are the wrong tool",
    will: [
      "Run on your public product pages, so nothing in your existing stack has to change to try it",
      "Stay comparable across categories, because the unit does not depend on the shelf it measured",
      "Say plainly when your existing tooling already covers the gap, and stop there",
      "Publish the method, so your team can check a ranking rather than take it on trust",
    ],
    wont: [
      "Govern, store or distribute your product information. That is a PIM and you should keep yours",
      "Manage feeds or syndication",
      "Beat engagement ranking on fields your shoppers already use. It is better at that and it should keep doing it",
      "Be worth running if your catalogue is already complete on the fields your category decides on",
    ],
  },

  faq: [
    {
      q: "What actually happens when you cannot answer?",
      a: "You get the requirement, the candidates it could not separate, and the specific attribute that would separate them, with what recording it would cost and how many future shoppers it would serve. “We cannot answer this” is a dead end. “We cannot answer this yet, record this one field and we can” is the product.",
    },
    {
      q: "Does nobody else abstain?",
      a: "Nobody we have verified. Two vendors make claims in that area that we have not been able to confirm from public material, and we are checking. If either turns out to genuinely abstain, this page gets corrected rather than quietly left alone.",
    },
    {
      q: "Can you show measured uplift?",
      a: "No, and you should weigh that. Several vendors in this market publish A/B results and we publish none, because we have not run the test. The numbers on this page come from one 216-product test shelf and 32 buying requirements, and we say so wherever they appear. That is a gap, not a virtue.",
    },
    {
      q: "There is a free catalogue audit available. Why pay for this?",
      a: "Theirs is free and checks a fixed list of points. Ours is measured against the buying decisions your shoppers are actually trying to make, which is why it disagrees with a completeness report and why it can tell you when your shelf cannot be resolved at all. If the checklist is enough for your catalogue, use it. We would rather you found that out cheaply.",
    },
    {
      q: "Do we have to replace our PIM?",
      a: "No, and you should not. A PIM governs, enriches and distributes product information. We answer a different question, which is what to fix first and what cannot be fixed by ranking at all, and the answer is an input to the PIM you already run.",
    },
    {
      q: "How do we know which situation we are in?",
      a: "Run the audit on one category. If the ranking matches what your current tooling already told you, and nothing comes back unanswerable, you have your answer and you have spent very little getting it.",
    },
  ],

  cta: {
    title: "Find out what your shelf cannot answer.",
    body: "Your store's address. If everything comes back answerable, that is a useful answer too.",
    label: "Request a Decision Audit",
    href: "/contact",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const COMPARE_VI: StoryContent = {
  meta: {
    title: "So sánh: bốn nước đi, không phải một",
    description:
      "Mọi hệ thống ở đây đều trả lời được. Khác biệt nằm ở chuyện gì xảy ra khi danh mục không đủ cơ sở cho câu trả lời, và liệu có gì định giá lựa chọn khác.",
  },
  eyebrow: "So sánh với chúng tôi",
  title:
    "Mọi thứ trong hệ thống của bạn đều trả lời được. Không cái nào nói được khi nào thì đừng.",
  lede: "Với một nhu cầu mua sắm cụ thể và thông tin chưa đầy đủ, một hệ thống có bốn nước đi: quyết ngay, hỏi người mua, ghi lại dữ liệu sản phẩm còn thiếu, hoặc nói rằng kệ hàng này chưa giải được. Phần lớn thị trường chỉ có một nước, và chưa thứ nào chúng tôi kiểm tra định giá được bốn nước đó so với nhau.",

  visualHeading: "Hai bảng xếp hạng đảo ngược nhau, trên một kệ hàng.",
  visualBody:
    "Thiếu ở nhiều sản phẩm nhất. Được ít người mua cần nhất. Làm giàu theo độ hoàn thiện là dồn ngân sách vào đúng thuộc tính thay đổi được ít quyết định nhất.",

  chainBlock: {
    eyebrow: "Khác biệt, gói trong một câu",
    heading: "Xếp hạng luôn trả về một thứ tự, kể cả khi thứ tự đó là nhiễu.",
    body: "Khi không có dữ liệu nào ghi lại phân biệt được các ứng viên, một danh sách đã xếp hạng vẫn trông y như một gợi ý. Người mua không phân biệt được, và bạn cũng vậy.",
  },

  scenes: {
    situation: {
      kind: "asks",
      eyebrow: "Không gian hành động",
      rows: [
        {
          label: "Quyết: xếp hạng và trả lời ngay",
          eg: "mọi hệ thống ở đây",
          ok: true,
        },
        {
          label: "Hỏi: đặt một câu hỏi cho người mua",
          eg: "công cụ bán hàng dẫn dắt",
          ok: true,
        },
        {
          label: "Thu thập: ghi lại dữ liệu còn thiếu, lâu dài",
          eg: "công cụ kiểm tra và làm giàu dữ liệu",
          ok: true,
        },
        {
          label: "Từ chối: nói rằng danh mục không phân biệt được chúng",
          eg: "chưa ai chúng tôi kiểm tra",
          ok: false,
        },
        {
          label: "Định giá cả bốn so với nhau, trên cùng một đơn vị",
          eg: "chưa ai chúng tôi kiểm tra",
          ok: false,
        },
      ],
      okLabel: "Đã có sẵn trong hệ thống",
      noLabel: "Chưa tìm thấy",
      note: "Bốn nước đi và phép tính chọn giữa chúng. Ba nước đầu là những năng lực đã có người bán cho bạn. Hai nước cuối là toàn bộ lập luận, và nếu bạn đã có chúng thì bạn không cần đến chúng tôi.",
    },

    hero: {
      kind: "lanes",
      lanes: [
        {
          eyebrow: "Một hệ thống chỉ biết trả lời",
          title: "Nó trả về một thứ tự dù danh mục có gì đi nữa.",
          body: "Khi không có gì được ghi lại để phân biệt các ứng viên, thứ tự đó là tuỳ tiện và được trình bày y hệt một thứ tự không tuỳ tiện. Lỗi này vô hình với tất cả mọi người, kể cả đội đã dựng ra nó.",
          verdict: "Tự tin đúng vào trường hợp đáng lẽ không nên.",
          tone: "hold",
        },
        {
          eyebrow: "Một hệ thống biết từ chối",
          title: "Nó đo xem câu trả lời có cơ sở hay không trước đã.",
          body: "Khi không có cơ sở, nước đi tiếp theo được chọn theo giá của nó: hỏi người mua, ghi lại dữ liệu cho mọi người mua về sau, hoặc nói thẳng rằng kệ hàng này chưa giải được câu hỏi đó.",
          verdict: "Hẹp, kiểm chứng được, và là toàn bộ khác biệt.",
          tone: "good",
        },
      ],
    },

    chain: {
      kind: "facts",
      facts: [
        {
          value: "162",
          label: "Sản phẩm thiếu thông tin vi xử lý",
          note: "trên 216 sản phẩm của kệ hàng đã đo, nên báo cáo hoàn thiện xếp nó hạng nhất",
          tone: "warn",
        },
        {
          value: "2",
          label: "Số người mua nó giúp được",
          note: "trên 32 nhu cầu mua sắm thật, chỉ 2 nhắc tới vi xử lý",
          tone: "hold",
        },
        {
          value: "17",
          label: "Nhu cầu không gì khớp nổi",
          note: "trong 32 nhu cầu đó, danh mục không trả lời được 17, xếp kiểu gì cũng vậy",
          tone: "good",
        },
      ],
      note: "Hai con số đầu là cùng một thuộc tính dưới hai thước đo, và chúng đảo ngược nhau. Cách làm tiêu chuẩn ở đây không phải thiếu chính xác, mà là chỉ sai hướng: làm giàu theo độ hoàn thiện là dồn ngân sách vào đúng thuộc tính thay đổi được ít quyết định nhất. Con số thứ ba là con số chưa báo cáo nào trong thị trường này đưa ra.",
    },
  },

  situation: {
    heading:
      "Cứ giữ những gì bạn có. Đây là nước đi hệ thống của bạn không đi được, không phải thứ thay thế nó.",
    body: [
      "Tìm kiếm, cá nhân hoá, bán hàng dẫn dắt, hệ PIM và công cụ quản lý nguồn dữ liệu đều trả lời tốt, và ở những trường người mua đã dùng thì chúng có dữ liệu mà chúng tôi không có. Không có gì ở đây đòi bạn rời bỏ cái nào cả.",
      "Có ba khoảng trống sống sót qua cả một bộ công cụ đầy đủ. Thứ nhất, xếp hạng việc làm giàu dữ liệu theo mức tương tác không thấy được một thuộc tính chưa từng được ghi: một trường không tồn tại thì không sinh ra lượt nhấp nào, nên nó xếp bét vĩnh viễn, và nó thường lại là trường đáng bổ sung. Thứ hai, một bộ tiêu chí kiểm tra cố định soi cùng những điểm đó trên mọi danh mục, nên nó không nói được khoảng trống nào quan trọng với một nhu cầu mua sắm cụ thể, không định giá được việc thu thập, và không nói được khi nào nó sai.",
      "Thứ ba, và đây là điều nên mang tới người duyệt kỹ thuật của bạn: không có gì nói rằng câu hỏi này không trả lời được. Trên kệ hàng chúng tôi đo, 17 trên 32 nhu cầu thực tế không khớp nổi. Cả 17 trường hợp đều nhận được một danh sách đã xếp hạng.",
    ],
    pull: "Một hệ thống dám nói “tôi không trả lời được” mới là hệ thống đáng tin khi nó nói “tôi trả lời được”.",
  },

  steps: {
    heading: "Bốn nước đi, và cái giá của từng nước",
    items: [
      {
        n: "01",
        meta: "Miễn phí",
        title: "Quyết",
        body: "Xếp hạng với những gì đã ghi và trả lời ngay. Không tốn gì, và là lựa chọn mà mọi nước đi khác phải vượt qua, chính điều đó ngăn hệ thống đề xuất việc chỉ để có việc.",
      },
      {
        n: "02",
        meta: "Tốn sự chú ý",
        title: "Hỏi",
        body: "Đặt một câu hỏi cho người mua. Nó giải quyết phiên này và chỉ phiên này, và một số người mua sẽ bỏ đi thay vì trả lời. Được định giá theo đúng như vậy.",
      },
      {
        n: "03",
        meta: "Tốn công",
        title: "Thu thập",
        body: "Ghi lại dữ liệu còn thiếu một lần, và nó phục vụ mọi người mua về sau trong ngành hàng đó cho tới khi lỗi thời. Hôm nay đáng giá ít hơn một câu hỏi, nhưng tính tổng thường đáng giá hơn nhiều. Phép nhân đó là phần chưa ai khác tính.",
      },
      {
        n: "04",
        meta: "Tốn một đơn hàng",
        title: "Từ chối",
        body: "Nói rằng kệ hàng không phân biệt được các ứng viên này. Cái giá thật là một đơn hàng mất đi, nên nó phải được định giá chứ không phải né tránh, và đó là lý do phần lớn hệ thống không bao giờ đưa ra nước này.",
      },
    ],
  },

  gets: {
    heading: "Chúng tôi thêm gì vào một bộ công cụ vốn đã chạy tốt",
    items: [
      {
        icon: EyeOff,
        title: "Câu trả lời không ai khác đưa ra",
        body: "Một danh sách những nhu cầu mua sắm mà danh mục của bạn hoàn toàn không giải được. Không phải một điểm tin cậy thấp trên danh sách đã xếp hạng: là một lời khẳng định rằng thứ hạng đó lẽ ra chỉ là nhiễu.",
      },
      {
        icon: Scale,
        title: "Một đơn vị cho những thứ khác loại",
        body: "Bit thông tin quyết định trên mỗi đơn vị chi phí, để một câu hỏi cho người mua và một tuần làm giàu dữ liệu so được với nhau. Không có đơn vị chung thì không gì chọn được giữa chúng, và hiện chưa có gì chọn cả.",
      },
      {
        icon: Wrench,
        title: "Chi phí của từng việc sửa, trước khi bạn cam kết",
        body: "Một thứ hạng có kèm giá: cái gì một đoạn script đóng được ngay tuần này so với cái gì phải thu thập thủ công, và mỗi việc phục vụ được bao nhiêu quyết định về sau.",
      },
      {
        icon: MousePointerClick,
        title: "Một đầu vào cho những gì bạn đang chạy",
        body: "Đầu ra là một danh sách ưu tiên và một tập các nhu cầu không trả lời được. Chúng đi vào hệ PIM, danh sách việc tồn đọng hay kế hoạch trưng bày hàng hoá của bạn.",
      },
    ],
  },

  limits: {
    heading: "Những chỗ chúng tôi là công cụ sai",
    will: [
      "Chạy trên các trang sản phẩm công khai của bạn, nên không có gì trong hệ thống sẵn có phải thay đổi để dùng thử",
      "Giữ tính so sánh giữa các ngành hàng, vì đơn vị đo không phụ thuộc vào kệ hàng đã đo",
      "Nói thẳng khi công cụ sẵn có của bạn đã lấp được khoảng trống đó, rồi dừng lại",
      "Công bố phương pháp, để đội của bạn kiểm tra được một bảng xếp hạng thay vì phải tin",
    ],
    wont: [
      "Quản trị, lưu trữ hay phân phối thông tin sản phẩm của bạn. Đó là việc của PIM và bạn nên giữ hệ của mình",
      "Quản lý nguồn dữ liệu hay việc đồng bộ ra các kênh",
      "Thắng cách xếp theo tương tác ở những trường người mua đã dùng. Cách đó tốt hơn ở đây và nên tiếp tục làm việc ấy",
      "Đáng chạy nếu danh mục của bạn đã đầy đủ ở những trường mà ngành hàng của bạn dựa vào để quyết định",
    ],
  },

  faq: [
    {
      q: "Khi không trả lời được thì thực tế chuyện gì xảy ra?",
      a: "Bạn nhận được nhu cầu đó, các ứng viên nó không phân biệt nổi, và đúng thuộc tính nào sẽ phân biệt được chúng, kèm chi phí ghi lại thuộc tính ấy và số người mua về sau nó sẽ phục vụ. “Chúng tôi không trả lời được” là ngõ cụt. “Chúng tôi chưa trả lời được, hãy ghi lại trường này rồi chúng tôi trả lời được” mới là sản phẩm.",
    },
    {
      q: "Có thật là không ai khác biết từ chối không?",
      a: "Chưa ai chúng tôi xác minh được. Hai nhà cung cấp có tuyên bố nằm trong vùng đó mà chúng tôi chưa xác nhận được từ tài liệu công khai, và chúng tôi đang kiểm tra. Nếu một trong hai thật sự biết từ chối, trang này sẽ được sửa lại chứ không lặng lẽ để nguyên.",
    },
    {
      q: "Các anh có số liệu đo được về mức cải thiện không?",
      a: "Không, và bạn nên cân nhắc điều đó. Vài nhà cung cấp trong thị trường này công bố kết quả A/B còn chúng tôi thì không, vì chúng tôi chưa chạy thử nghiệm đó. Các con số trên trang này đến từ một kệ hàng 216 sản phẩm và 32 nhu cầu mua sắm, và chúng tôi nói rõ điều đó ở mọi chỗ chúng xuất hiện. Đó là một khoảng thiếu, không phải một điểm hay.",
    },
    {
      q: "Ngoài kia có bản kiểm tra danh mục miễn phí. Vì sao phải trả tiền cho cái này?",
      a: "Bản đó miễn phí và soi một danh sách điểm cố định. Bản của chúng tôi đo theo đúng những quyết định mua sắm mà người mua của bạn đang cố thực hiện, nên nó bất đồng với một báo cáo hoàn thiện, và nên nó nói được khi nào kệ hàng của bạn hoàn toàn không giải được. Nếu danh sách kiểm tra là đủ cho danh mục của bạn, hãy dùng nó. Chúng tôi thà bạn biết điều đó với chi phí thấp.",
    },
    {
      q: "Chúng tôi có phải thay hệ PIM không?",
      a: "Không, và bạn cũng không nên. PIM quản trị, làm giàu và phân phối thông tin sản phẩm. Chúng tôi trả lời một câu hỏi khác, là nên sửa gì trước và cái gì xếp hạng kiểu nào cũng không sửa được, và câu trả lời đó là đầu vào cho hệ PIM bạn đang chạy.",
    },
    {
      q: "Làm sao biết chúng tôi đang ở tình huống nào?",
      a: "Chạy bản kiểm tra trên một ngành hàng. Nếu thứ hạng khớp với những gì công cụ hiện tại đã nói, và không có nhu cầu nào trả về là không giải được, bạn có câu trả lời và đã bỏ ra rất ít để có nó.",
    },
  ],

  cta: {
    title: "Xem thử kệ hàng của bạn không trả lời được những gì.",
    body: "Gửi địa chỉ website. Nếu danh mục đã trả lời được mọi câu hỏi trong phạm vi kiểm tra, đó cũng là kết quả hữu ích.",
    label: "Yêu cầu Decision Audit",
    href: "/contact",
  },
};

export const compare = (l: string) =>
  byLocale({ en: COMPARE, vi: COMPARE_VI }, l);
