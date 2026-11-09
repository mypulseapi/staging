import { Binary, FileSearch, Bot, ListChecks } from "lucide-react";
import type { StoryContent } from "@/components/StoryPage";
import { byLocale } from "@/content/locale";

/**
 * SEO and AEO as a use case rather than a sector.
 *
 * The competitor's version of this page sells content generation: AI-written
 * titles, meta descriptions, alt text and FAQ blocks. We do not do that and the
 * page must not imply we do. What we do is upstream of it, and it is the part
 * their page cannot claim: a generated description is still prose, and prose is
 * what an answer engine cannot filter on.
 *
 * So the argument here is the one Adobe's own numbers make. Product pages score
 * lowest of any page type on machine readability, 79% ship no full structured
 * data set, and you cannot mark up a fact you never recorded. Schema coverage
 * is capped by attribute coverage, which is the thing we measure.
 */
export const SEO_AEO: StoryContent = {
  meta: {
    title: "Product data for SEO and AEO: facts AI can cite",
    description:
      "Structured data is capped by what your catalogue records. The audit ranks the missing attributes capping what search and answer engines can do.",
  },
  eyebrow: "Use case",
  title: "You cannot mark up a fact you do not have.",
  lede: "Structured data is how a search engine and an answer engine read a product and what an AI answer can cite, and it is capped by what your catalogue actually records. The audit tells you which missing attributes are costing you the most visibility, ranked, before anybody writes a line of markup.",

  visualHeading: "Where schema coverage actually stops.",
  visualBody:
    "Marked up, recorded but not marked up, and never recorded at all. Only the last one needs new data.",

  chainBlock: {
    eyebrow: "Where the ceiling actually is",
    heading: "Markup work finishes in a fortnight and then stops.",
    body: "Not because the team ran out of time. Because there was nothing left to express.",
  },

  scenes: {
    situation: {
      kind: "facts",
      facts: [
        {
          value: "66%",
          label: "Machine readability, product pages",
          note: "the lowest of any page type measured",
          tone: "warn",
        },
        {
          value: "75%",
          label: "Homepages, for comparison",
          note: "the page with no distinguishing detail scores higher",
          tone: "hold",
        },
        {
          value: "74%",
          label: "Category pages",
          note: "also above the page that decides the purchase",
          tone: "hold",
        },
      ],
      note: "US retail, measured by Adobe. The page holding every fact that separates one product from another is the worst structured page on the site.",
      source: {
        label: "Adobe Analytics",
        href: "https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable",
      },
    },

    hero: {
      kind: "bars",
      rows: [
        {
          label: "Fields a shopper asks about",
          value: 24,
          tone: "work",
          note: "the questions this category gets",
        },
        {
          label: "Fields you record",
          value: 9,
          tone: "hold",
          note: "what the schema can hold today",
        },
        {
          label: "Fields you mark up",
          value: 9,
          tone: "warn",
          note: "capped by the row above it, not by effort",
        },
      ],
      note: "Schema coverage cannot exceed attribute coverage. A structured data project ends at the second bar no matter how it is resourced.",
    },
    chain: {
      kind: "asks",
      eyebrow: "An answer engine, asked about one of your products",
      rows: [
        { label: "What is it", eg: "title and category", ok: true },
        { label: "What does it cost", eg: "price, in the feed", ok: true },
        {
          label: "Is it right for me",
          eg: "the deciding attribute",
          ok: false,
        },
      ],
      okLabel: "Answerable",
      noLabel: "Not recorded",
      note: "of the three are answerable, so the agent describes the product and then cannot recommend it. Search tolerates that ambiguity; an agent applies the constraint and drops you.",
    },
  },

  situation: {
    heading: "Your schema is complete for the fields you happen to hold.",
    body: [
      "The usual SEO remedy for this is a markup task. Add Product schema, add offers, add aggregateRating, validate it, ship it. That work is correct and it finishes quickly, because it can only express fields you already have.",
      "Then the report comes back green and discovery has not moved, because the constraint was never the markup. Adobe scored US retail product pages at 66% machine readability, the lowest of any page type they measured, below homepages at 75% and category pages at 74%. The page carrying every fact that distinguishes one product from another is the worst structured page on the site.",
      "The reason is that most of the distinguishing detail was written as prose, because prose is what sells. A richer description makes the gap wider rather than narrower: more has been said, and none of the new part is in a form a machine can compare.",
    ],
    pull: "Schema coverage is capped by attribute coverage. Markup work finishes fast and then stops, because there is nothing left to express.",
  },

  steps: {
    heading: "How this changes the order of the work",
    intro: "Three steps, and the markup is the last one rather than the first.",
    items: [
      {
        n: "01",
        meta: "Measure",
        title: "Find the constraints buyers apply",
        body: "Which attributes a purchase in your category actually turns on, ranked by how much recording them would change what a buyer can decide. Not which recommended fields are empty: which absent fields are expensive.",
      },
      {
        n: "02",
        meta: "Recover",
        title: "Pull what is already in your text",
        body: "Most of it is in your own titles and descriptions. In a sample of 9 real laptop listings, every fact missing from the spec fields was in the title or description. That is extraction, and it is the cheap half.",
      },
      {
        n: "03",
        meta: "Express",
        title: "Then mark it up",
        body: "Once a fact is a value rather than a sentence, schema can carry it, a filter can use it and an agent can evaluate it. Same fact, three consumers, and none of them could reach it before.",
      },
    ],
  },

  gets: {
    heading: "Why this is one problem and not two",
    intro:
      "Search engines and answer engines fail on the same missing field, for different reasons.",
    items: [
      {
        icon: FileSearch,
        title: "Search tolerates ambiguity. Agents do not.",
        body: "An index can infer from text and rank you anyway. An agent applying a constraint cannot: a missing value is treated as not qualifying, because that is the safe behaviour for it. The same gap costs you a position in one and the whole comparison in the other.",
      },
      {
        icon: Bot,
        title: "The traffic has already shifted",
        body: "Adobe report AI-driven traffic to US retail sites up 393% year on year in Q1 2026, and converting 42% better than non-AI traffic, reversed from 38% worse a year earlier. Salesforce put AI agents behind more than 20% of holiday online retail sales.",
      },
      {
        icon: ListChecks,
        title: "Which fields, not how many",
        body: "Platform warnings tell you which recommended attributes are empty. They cannot tell you which of those empty attributes buyers in your category decide on, and those are different lists. Ours is ranked by the second.",
      },
      {
        icon: Binary,
        title: "One measurement, three surfaces",
        body: "The attribute that unblocks a filter on your own category page is usually the attribute that unblocks a shopping feed match and an agent comparison. You are not doing three projects.",
      },
    ],
  },

  limits: {
    heading: "What this will and will not do for visibility",
    will: [
      "Rank the missing attributes by how much recording them would improve what a buyer or an agent can decide",
      "Separate what is recoverable from your existing product text from what genuinely needs acquiring",
      "Give you a number you can re-measure after the repair, with no traffic and no waiting",
      "Apply to your own filters, your shopping feed and agent comparisons at once, because it is the same missing field",
    ],
    wont: [
      "Write your titles, meta descriptions, alt text or FAQ blocks. We do not generate content, and a generated sentence is still prose an agent cannot filter on",
      "Produce or validate your schema markup. We tell you which facts are worth having; expressing them is your stack's job",
      "Promise a ranking or a visibility figure. Placement is decided by engines nobody here controls; what this removes is the data reason for being left out",
      "Help where your catalogue already records everything your category decides on. If that is you, we will say so",
    ],
  },

  faq: [
    {
      q: "Is this an SEO tool?",
      a: "No, and calling it one would set the wrong expectation. It does not audit your titles, your links, your speed or your markup. It measures which product attributes your catalogue is missing and ranks them by what recording them would be worth, which is upstream of everything a technical SEO audit looks at and is not covered by one.",
    },
    {
      q: "What is AEO and how is it different from SEO?",
      a: "Answer engine optimisation is being usable by a system that answers on the buyer's behalf rather than returning links. The practical difference is tolerance: a search index reads text and can infer, so ambiguity costs you a position. An agent applies a constraint against a recorded value, so ambiguity costs you the entire comparison. The same missing attribute causes both, which is why they are one piece of work.",
    },
    {
      q: "Will you generate structured data for our pages?",
      a: "No. We tell you which facts are worth recording and where each one currently lives; your PIM, your platform or your team expresses them. We are deliberately not in the content generation business, because generating a sentence does not create a filterable value and would let us claim a fix we had not made.",
    },
    {
      q: "We already added Product schema. Is there more to do?",
      a: "Probably, and the audit is the cheapest way to find out. Adding schema expresses the fields you hold, so it completes quickly and then stops. Adobe found 79% of product pages still ship no full structured data set, and that only 5% state shipping terms and 4% state return terms in a machine-readable way. Those are facts most retailers have and have not expressed.",
    },
    {
      q: "How does this help with AI shopping agents specifically?",
      a: "An agent handed a set of constraints applies each one against recorded fields, and drops a product that cannot answer one rather than investigating it. So the work is the same as for your own filters: find which constraints buyers apply, check which your catalogue can answer, and structure the rest. The AI shopping agents page goes into what that looks like in practice.",
    },
  ],

  cta: {
    title: "Find out what your catalogue cannot express.",
    body: "Your store's address, and a ranked list of the attributes that are capping what a search engine and an answer engine can do with your products.",
    label: "Request a Decision Audit",
    href: "/contact",
    note: "No code, no tag, no change to your site. The markup work comes after, and it is yours.",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const SEO_AEO_VI: StoryContent = {
  meta: {
    title: "SEO và AEO: không thể đánh dấu dữ kiện bạn không có",
    description:
      "Dữ liệu có cấu trúc bị giới hạn bởi những gì danh mục ghi lại. Bản kiểm tra xếp hạng các thuộc tính đang giới hạn khả năng hiển thị của bạn.",
  },
  eyebrow: "Tình huống sử dụng",
  title: "Bạn không thể đánh dấu một dữ kiện bạn không có.",
  lede: "Dữ liệu có cấu trúc là cách một công cụ tìm kiếm và một answer engine đọc sản phẩm, và nó bị giới hạn bởi những gì danh mục của bạn thực sự ghi lại. Bản kiểm tra cho biết những thuộc tính còn thiếu nào đang khiến bạn mất nhiều khả năng hiển thị nhất, đã xếp hạng, trước khi ai đó viết một dòng đánh dấu nào.",

  visualHeading: "Độ phủ dữ liệu có cấu trúc thực sự dừng ở đâu.",
  visualBody:
    "Đã đánh dấu, đã ghi nhưng chưa đánh dấu, và chưa bao giờ được ghi. Chỉ nhóm cuối cùng mới cần dữ liệu mới.",

  chainBlock: {
    eyebrow: "Trần thực sự nằm ở đâu",
    heading: "Việc gắn dữ liệu có cấu trúc xong trong hai tuần rồi dừng.",
    body: "Không phải vì đội ngũ hết giờ. Mà vì không còn gì để diễn đạt nữa.",
  },

  scenes: {
    situation: {
      kind: "facts",
      facts: [
        {
          value: "66%",
          label: "Mức máy đọc được, trang sản phẩm",
          note: "thấp nhất trong mọi loại trang được đo",
          tone: "warn",
        },
        {
          value: "75%",
          label: "Trang chủ, để so sánh",
          note: "trang không có chi tiết phân biệt nào lại chấm cao hơn",
          tone: "hold",
        },
        {
          value: "74%",
          label: "Trang ngành hàng",
          note: "cũng cao hơn trang quyết định việc mua",
          tone: "hold",
        },
      ],
      note: "Bán lẻ Mỹ, do Adobe đo. Trang chứa mọi dữ kiện phân biệt sản phẩm này với sản phẩm kia lại là trang có cấu trúc tệ nhất website.",
      source: {
        label: "Adobe Analytics",
        href: "https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable",
      },
    },

    hero: {
      kind: "bars",
      rows: [
        {
          label: "Trường người mua hỏi tới",
          value: 24,
          tone: "work",
          note: "những câu hỏi ngành hàng này nhận được",
        },
        {
          label: "Trường bạn có ghi",
          value: 9,
          tone: "hold",
          note: "những gì lược đồ chứa được hôm nay",
        },
        {
          label: "Trường bạn gắn được",
          value: 9,
          tone: "warn",
          note: "bị chặn bởi dòng ngay trên, không phải bởi công sức",
        },
      ],
      note: "Độ phủ lược đồ không thể vượt độ phủ thuộc tính. Một dự án dữ liệu có cấu trúc dừng lại ở cột thứ hai, bất kể bỏ bao nhiêu người vào.",
    },
    chain: {
      kind: "asks",
      eyebrow: "Một cỗ máy trả lời, được hỏi về một sản phẩm của bạn",
      rows: [
        { label: "Đây là cái gì", eg: "tiêu đề và ngành hàng", ok: true },
        { label: "Giá bao nhiêu", eg: "giá, có trong nguồn dữ liệu", ok: true },
        {
          label: "Có hợp với tôi không",
          eg: "thuộc tính quyết định",
          ok: false,
        },
      ],
      okLabel: "Trả lời được",
      noLabel: "Chưa ghi",
      note: "trong ba câu trả lời được, nên tác tử mô tả sản phẩm rồi không gợi ý nổi. Tìm kiếm chấp nhận sự mơ hồ đó; một tác tử thì áp thẳng ràng buộc và loại bạn ra.",
    },
  },

  situation: {
    heading: "Lược đồ của bạn đầy đủ với những trường bạn tình cờ đang có.",
    body: [
      "Cách chữa SEO thường thấy cho việc này là một công việc đánh dấu. Thêm Product schema, thêm offers, thêm aggregateRating, kiểm tra hợp lệ, rồi đưa lên. Công việc đó đúng và hoàn tất nhanh, bởi nó chỉ có thể diễn đạt những trường bạn vốn đã có.",
      "Rồi báo cáo trả về màu xanh còn khả năng tìm thấy hàng thì không nhúc nhích, bởi nút thắt chưa bao giờ là phần đánh dấu. Adobe chấm trang sản phẩm bán lẻ Mỹ ở mức 66% về khả năng đọc bằng máy, thấp nhất trong mọi loại trang họ đo, dưới trang chủ 75% và trang ngành hàng 74%. Trang mang mọi dữ kiện phân biệt sản phẩm này với sản phẩm khác lại là trang có cấu trúc kém nhất website.",
      "Lý do là phần lớn các chi tiết phân biệt ấy được viết dưới dạng văn xuôi, bởi văn xuôi mới là thứ bán được hàng. Một bản mô tả phong phú hơn làm khoảng cách rộng ra chứ không hẹp lại: đã nói nhiều hơn, và không phần nào trong số mới đó ở dạng máy so sánh được.",
    ],
    pull: "Độ phủ lược đồ bị giới hạn bởi độ phủ thuộc tính. Công việc đánh dấu hoàn tất nhanh rồi dừng lại, vì không còn gì để diễn đạt nữa.",
  },

  steps: {
    heading: "Điều này thay đổi thứ tự công việc ra sao",
    intro: "Ba bước, và phần đánh dấu là bước cuối thay vì bước đầu.",
    items: [
      {
        n: "01",
        meta: "Đo",
        title: "Tìm những ràng buộc người mua áp dụng",
        body: "Thuộc tính nào thực sự quyết định một lần mua trong ngành hàng của bạn, xếp theo mức việc ghi chúng sẽ thay đổi điều người mua quyết định được. Không phải trường khuyến nghị nào đang trống: mà là trường vắng mặt nào đang tốn kém.",
      },
      {
        n: "02",
        meta: "Lấy lại",
        title: "Rút ra thứ đã nằm sẵn trong văn bản của bạn",
        body: "Phần lớn nằm trong chính tiêu đề và mô tả của bạn. Trên kệ hàng chúng tôi đo, 161 trên 216 giá trị còn thiếu lấy lại được từ văn bản nhà bán đã công bố. Đó là trích xuất, và là nửa rẻ tiền.",
      },
      {
        n: "03",
        meta: "Diễn đạt",
        title: "Rồi mới đánh dấu",
        body: "Khi một dữ kiện đã là một giá trị thay vì một câu văn, lược đồ mang được nó, bộ lọc dùng được nó và một tác tử đánh giá được nó. Cùng một dữ kiện, ba bên tiêu thụ, và trước đó không bên nào với tới được.",
      },
    ],
  },

  gets: {
    heading: "Vì sao đây là một bài toán chứ không phải hai",
    intro:
      "Công cụ tìm kiếm và answer engine cùng thất bại ở một trường còn thiếu, vì hai lý do khác nhau.",
    items: [
      {
        icon: FileSearch,
        title: "Tìm kiếm chấp nhận mơ hồ. Tác tử thì không.",
        body: "Một chỉ mục có thể suy ra từ văn bản và vẫn xếp hạng bạn. Một tác tử đang áp ràng buộc thì không thể: một giá trị thiếu bị coi là không đạt, vì đó là hành vi an toàn với nó. Cùng một khoảng trống làm bạn mất một vị trí ở bên này và mất cả phép so sánh ở bên kia.",
      },
      {
        icon: Bot,
        title: "Lưu lượng đã dịch chuyển rồi",
        body: "Adobe báo lưu lượng từ AI tới các website bán lẻ Mỹ tăng 393% theo năm trong quý 1/2026, và chuyển đổi tốt hơn 42% so với lưu lượng không từ AI, đảo chiều từ mức kém hơn 38% một năm trước. Salesforce cho rằng tác tử AI đứng sau hơn 20% doanh số bán lẻ trực tuyến mùa lễ.",
      },
      {
        icon: ListChecks,
        title: "Trường nào, chứ không phải bao nhiêu trường",
        body: "Cảnh báo của nền tảng cho biết thuộc tính khuyến nghị nào đang trống. Chúng không cho biết trong số đó, người mua trong ngành hàng của bạn quyết định dựa trên trường nào, và đó là hai danh sách khác nhau. Danh sách của chúng tôi xếp theo cái thứ hai.",
      },
      {
        icon: Binary,
        title: "Một phép đo, ba bề mặt",
        body: "Thuộc tính mở khoá một bộ lọc trên chính trang ngành hàng của bạn thường cũng là thuộc tính mở khoá một phép khớp nguồn dữ liệu mua sắm và một phép so sánh của tác tử. Bạn không phải làm ba dự án.",
      },
    ],
  },

  limits: {
    heading: "Việc này sẽ và sẽ không làm gì cho khả năng hiển thị",
    will: [
      "Xếp hạng các thuộc tính còn thiếu theo mức việc ghi chúng cải thiện điều một người mua hay một tác tử quyết định được",
      "Tách phần lấy lại được từ văn bản sản phẩm sẵn có khỏi phần thực sự phải đi thu thập",
      "Đưa bạn một con số đo lại được sau khi sửa, không cần lưu lượng và không phải chờ",
      "Áp dụng cùng lúc cho bộ lọc của bạn, nguồn dữ liệu mua sắm và phép so sánh của tác tử, vì đó là cùng một trường còn thiếu",
    ],
    wont: [
      "Viết tiêu đề, thẻ mô tả, văn bản thay thế ảnh hay khối câu hỏi thường gặp cho bạn. Chúng tôi không sinh nội dung, và một câu được sinh ra vẫn là văn xuôi mà tác tử không lọc theo được",
      "Tạo hay kiểm tra hợp lệ phần đánh dấu lược đồ của bạn. Chúng tôi cho biết dữ kiện nào đáng có; việc diễn đạt chúng là việc của hệ thống bạn",
      "Hứa hẹn một thứ hạng hay một con số hiển thị. Chúng tôi chưa chạy thử nghiệm nào trên lưu lượng của bạn, nên bất kỳ con số nào cũng sẽ là bịa",
      "Giúp ích ở nơi danh mục của bạn đã ghi đủ mọi thứ mà ngành hàng của bạn dựa vào để quyết định. Nếu đó là bạn, chúng tôi sẽ nói vậy",
    ],
  },

  faq: [
    {
      q: "Đây có phải một công cụ SEO không?",
      a: "Không, và gọi nó là vậy sẽ đặt sai kỳ vọng. Nó không rà soát tiêu đề, liên kết, tốc độ hay phần đánh dấu của bạn. Nó đo xem danh mục của bạn đang thiếu những thuộc tính sản phẩm nào và xếp hạng chúng theo giá trị của việc ghi lại, vốn nằm ở thượng nguồn của mọi thứ một đợt rà soát SEO kỹ thuật xem xét và không được bao gồm trong đó.",
    },
    {
      q: "AEO là gì và khác SEO thế nào?",
      a: "Answer engine optimisation là việc dùng được bởi một hệ thống trả lời thay cho người mua thay vì trả về các đường liên kết. Khác biệt thực tế nằm ở mức dung sai: một chỉ mục tìm kiếm đọc văn bản và có thể suy ra, nên sự mơ hồ khiến bạn mất một vị trí. Một tác tử áp ràng buộc lên một giá trị đã ghi, nên sự mơ hồ khiến bạn mất cả phép so sánh. Cùng một thuộc tính thiếu gây ra cả hai, và đó là lý do chúng là một phần việc.",
    },
    {
      q: "Các bạn có tạo dữ liệu có cấu trúc cho trang của chúng tôi không?",
      a: "Không. Chúng tôi cho biết dữ kiện nào đáng ghi và mỗi dữ kiện hiện đang nằm ở đâu; hệ PIM, nền tảng hoặc đội của bạn sẽ diễn đạt chúng. Chúng tôi cố ý không làm mảng sinh nội dung, bởi sinh ra một câu văn không tạo ra một giá trị lọc được và sẽ khiến chúng tôi nhận công cho một việc chưa sửa.",
    },
    {
      q: "Chúng tôi đã thêm Product schema rồi. Còn gì để làm nữa không?",
      a: "Nhiều khả năng là có, và bản kiểm tra là cách rẻ nhất để biết. Thêm lược đồ là diễn đạt những trường bạn đang có, nên nó hoàn tất nhanh rồi dừng. Adobe phát hiện 79% trang sản phẩm vẫn không có bộ dữ liệu có cấu trúc đầy đủ, và chỉ 5% nêu điều khoản vận chuyển cùng 4% nêu điều khoản đổi trả ở dạng máy đọc được. Đó là những dữ kiện phần lớn nhà bán lẻ đang có mà chưa diễn đạt ra.",
    },
    {
      q: "Việc này giúp gì cụ thể với tác tử mua sắm AI?",
      a: "Một tác tử được giao một tập ràng buộc sẽ áp từng cái lên các trường đã ghi, và loại bỏ sản phẩm không trả lời được một ràng buộc thay vì tìm hiểu thêm. Nên công việc giống hệt như với bộ lọc của chính bạn: tìm xem người mua áp những ràng buộc nào, kiểm tra danh mục trả lời được cái nào, rồi cấu trúc hoá phần còn lại. Trang Tác tử mua sắm AI đi sâu hơn vào việc đó trên thực tế.",
    },
  ],

  cta: {
    title: "Tìm ra điều danh mục của bạn không diễn đạt được.",
    body: "Địa chỉ cửa hàng của bạn, và một danh sách xếp hạng những thuộc tính đang giới hạn điều mà công cụ tìm kiếm và answer engine làm được với sản phẩm của bạn.",
    label: "Yêu cầu Decision Audit",
    href: "/contact",
    note: "Không mã nguồn, không thẻ theo dõi, không thay đổi gì trên website. Việc đánh dấu đến sau, và nó là của bạn.",
  },
};

export const seoAeo = (l: string) =>
  byLocale({ en: SEO_AEO, vi: SEO_AEO_VI }, l);

/**
 * Alt text for the page's pictures (the owner's generated set, 28 Oct 2026), in the order the page
 * shows them: the hero, the situation, the three steps and the four cards. Each says what the picture
 * shows, so the page reads the same without it.
 */
export interface UseCasePictureAlt {
  hero: string;
  situation: string;
  steps: string[];
  gets: string[];
}

const SEO_AEO_PICTURE_ALT: Record<"en" | "vi", UseCasePictureAlt> = {
  en: {
    hero: "A laptop's product page read by a search engine and an answer engine: the name and type are marked up, two lines are written as prose, and screen size is blank, where the answer engine stops.",
    situation:
      "A validation report with every check passed, crawl access, indexation, structured data, content quality and technical setup, beside an organic traffic chart that stays flat after the report passed.",
    steps: [
      "A ranked list of fields with screen size first, then memory and storage, under a magnifying glass.",
      "The phrase 15.6-inch display picked out of a laptop's description and recorded as a field, screen size 15.6\".",
      'One value, screen size 15.6", feeding three places at once: the schema, a filter and an assistant.',
    ],
    gets: [
      "Two laptop listings with memory blank: a search engine's robot still finds one, while an agent's filter drops the other.",
      "A traffic line rising steeply, with an assistant's chat bubble at its peak.",
      "A grid of empty field slots, with only screen size, processor and storage picked out.",
      "One robot feeding three surfaces: a filter set to 15.6\", a shopping feed and an assistant's answer.",
    ],
  },
  vi: {
    hero: "Trang sản phẩm laptop được công cụ tìm kiếm và cỗ máy trả lời cùng đọc: tên và loại đã được đánh dấu, hai dòng viết dạng văn xuôi, còn kích thước màn hình để trống, chỗ cỗ máy trả lời dừng lại.",
    situation:
      "Báo cáo kiểm tra đạt mọi mục, truy cập thu thập, lập chỉ mục, dữ liệu có cấu trúc, chất lượng nội dung và thiết lập kỹ thuật, bên cạnh biểu đồ lưu lượng tự nhiên vẫn đi ngang sau khi báo cáo đạt.",
    steps: [
      "Danh sách trường được xếp hạng, kích thước màn hình đứng đầu, rồi bộ nhớ và ổ lưu trữ, dưới một kính lúp.",
      'Cụm từ màn hình 15.6 inch được lấy ra từ mô tả laptop và ghi thành một trường, kích thước màn hình 15.6".',
      'Một giá trị, kích thước màn hình 15.6", cùng lúc dùng cho ba nơi: lược đồ, bộ lọc và trợ lý.',
    ],
    gets: [
      "Hai sản phẩm laptop để trống bộ nhớ: robot của công cụ tìm kiếm vẫn tìm thấy một chiếc, còn bộ lọc của tác tử loại chiếc kia.",
      "Đường lưu lượng tăng mạnh, với bong bóng chat của trợ lý ở đỉnh.",
      "Một lưới ô trường để trống, chỉ có kích thước màn hình, bộ xử lý và ổ lưu trữ được chọn ra.",
      'Một robot cấp dữ liệu cho ba nơi: bộ lọc đặt ở 15.6", nguồn cấp mua sắm và câu trả lời của trợ lý.',
    ],
  },
};

export const seoAeoPictureAlt = (l: string) =>
  byLocale({ en: SEO_AEO_PICTURE_ALT.en, vi: SEO_AEO_PICTURE_ALT.vi }, l);
