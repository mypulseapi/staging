import { Rocket, Layers, Timer, SplitSquareHorizontal } from "lucide-react";
import type { StoryContent } from "@/components/StoryPage";
import { byLocale } from "@/content/locale";
import type { UseCasePictureAlt } from "@/content/pages/seo-aeo";

/**
 * Time to market.
 *
 * The competitor's version of this page is an automation pitch: ingest any
 * format, enrich the gaps with AI, publish, and it quotes 5x faster launches
 * and a 25% organic traffic uplift against named customers. We have no
 * automation of that kind, no customers and no measured uplift, so none of
 * that argument is available and imitating its shape would be a lie in three
 * separate places.
 *
 * The honest version is better anyway, because it disagrees with the premise.
 * Enriching a range faster still means enriching all of it. The reason a launch
 * slips is that nobody knows which fields are load-bearing, so the choice is
 * between doing everything and doing nothing. Knowing the minimum decidable set
 * turns that into a launch this month with a backfill behind it.
 */
export const TIME_TO_MARKET: StoryContent = {
  meta: {
    title: "Faster time to market for new products",
    description:
      "What blocks a range is not knowing which fields are load-bearing. Get the minimum decidable set, measured before launch, from a partial supplier export.",
  },
  eyebrow: "Use case",
  title: "Launch the range before the data is finished.",
  lede:
    "A new range is not blocked by how much data you have. It is blocked by not knowing which fields a buyer actually chooses on, so the plan becomes enrich everything or ship blind. The audit gives you the minimum set that makes a range decidable, measured before launch, with no traffic needed.",

  visualHeading: "Everything, or the part that matters.",
  visualBody:
    "The full enrichment plan against the subset that makes the range shoppable on day one.",

  chainBlock: {
    eyebrow: "The cut line nobody draws",
    heading: "Enriching faster still means enriching everything.",
    body: "A launch does not need a complete schema. It needs to know which fields are load-bearing on day one.",
  },

  scenes: {
    situation: {
      kind: "grid",
      total: 200,
      lit: 20,
      label: "Fields the schema allows for this range",
      litLabel: "Load-bearing on launch day",
      restLabel: "Real work, but it can follow",
      tone: "good",
    },

    hero: {
      kind: "delta",
      eyebrow: "Eleven supplier formats, one launch date",
      question: "Which fields have to be right before this range goes live?",
      label: "Fields in scope before launch",
      before: { v: 200, label: "Everything the schema allows" },
      after: { v: 20, label: "Load-bearing on day one" },
      note: "The rest are not abandoned, they are sequenced. The difference between those two numbers is whether the date moves.",
      footer: "A cut line you can defend to whoever owns the launch.",
    },
    chain: {
      kind: "bars",
      rows: [
        { label: "Enrich everything", value: 200, tone: "hold", note: "the plan that misses the date" },
        { label: "Enrich the top quartile", value: 50, tone: "work", note: "arbitrary, and still mostly wrong fields" },
        { label: "Enrich what decides", value: 20, tone: "good", note: "ranked, with the products attached to each" },
      ],
      note: "All three are the same team and the same quarter. Only the last one is chosen rather than guessed.",
    },
  },

  situation: {
    heading: "The range is signed. The data arrives in eleven shapes. The date does not move.",
    body: [
      "Supplier data comes in as spreadsheets, PDFs and feeds, each with its own idea of what a field is called and which ones are mandatory. Somebody has to turn that into a catalogue, and the honest estimate for doing it properly is longer than the window.",
      "So the range launches in one of two bad states. Either it waits for a complete enrichment pass and misses the season it was bought for, or it goes live with names, prices and images, and no attribute a shopper can filter on. The second is more common because the date is real and the data quality is negotiable.",
      "A range that launches unfilterable is worst exactly when it matters most. The launch window is when interest is highest and when you have the least behavioural data to fall back on, so the catalogue has to carry the whole decision on its own.",
    ],
    pull:
      "Enriching faster still means enriching everything. The question nobody answers before a launch is which twenty of two hundred fields are actually load-bearing.",
  },

  steps: {
    heading: "How a launch gets shorter",
    intro: "Not by doing the same work faster. By doing a smaller piece of it first.",
    items: [
      { n: "01", meta: "Before launch", title: "Measure a sample of the range", body: "Send an export of the incoming products, however incomplete. The measurement works on partial data, which is the point: it is telling you what is missing, so it cannot require you to have already filled it in." },
      { n: "02", meta: "The answer", title: "Get the minimum decidable set", body: "The handful of attributes that carry most of the decision in that category, ranked, with how much each one moves the range from indistinguishable to choosable. That is your launch checklist, and it is usually far shorter than the schema." },
      { n: "03", meta: "After launch", title: "Backfill against a number", body: "Re-measure as the rest lands, so the backfill is prioritised by what is still costing you rather than by what is still empty. The range gets better in a visible order instead of asymptotically." },
    ],
  },

  gets: {
    heading: "What changes about the launch plan",
    items: [
      { icon: Rocket, title: "A launch checklist, not a schema", body: "The fields that make the range choosable, separated from the fields that complete the record. Both matter eventually; only one of them blocks a date." },
      { icon: Layers, title: "Where each fact already lives", body: "Extractable from supplier titles and descriptions, mappable from a feed you already receive, or genuinely absent. That split decides what is possible before the date and what is not." },
      { icon: Timer, title: "A number before you have traffic", body: "Decision readiness is computed from the catalogue, so a range can be assessed before a single visitor sees it. Waiting for behavioural data means finding out after the window closed." },
      { icon: SplitSquareHorizontal, title: "A defensible cut line", body: "\"We are launching with these nine fields and backfilling the rest\" is a position you can take to a buyer or a merchandising director, because the nine were chosen by measurement rather than by whichever columns the supplier happened to fill." },
    ],
  },

  limits: {
    heading: "What this does and does not shorten",
    will: [
      "Tell you the smallest set of attributes that makes a new range decidable, ranked, before it launches",
      "Separate what is recoverable from supplier text from what needs to be requested or acquired",
      "Give you a readiness number for the range that can be re-measured as the backfill lands",
      "Work on partial and messy incoming data, because that is the state it is designed to assess",
    ],
    wont: [
      "Ingest, normalise or transform your supplier feeds. We measure; the pipeline that loads your catalogue is yours or your PIM's",
      "Generate attribute values with a model. We tell you which facts are worth having and where they already live, and we do not invent the ones that are missing",
      "Quote a launch-time reduction. We have not measured one, and \"five times faster\" is the kind of figure that gets quoted without a baseline",
      "Replace the enrichment work. It reorders it so the part that blocks a date happens first",
    ],
  },

  faq: [
    { q: "How early can we run this on a new range?", a: "As soon as you have any export of the incoming products, even a partial one. The measurement is designed to assess incomplete data, so requiring it to be complete first would defeat the purpose. Most merchants run it on the supplier file before anything has been loaded." },
    { q: "Do you clean or transform our supplier data?", a: "No. We do not ingest feeds, normalise formats or write values into your catalogue. We read an export and hand back a ranked list of what is worth recording and where each fact currently lives. The loading and the transformation stay with your PIM or your team." },
    { q: "Can we really launch before the data is complete?", a: "You almost certainly already do. The question is whether the fields you launched with were the load-bearing ones, and today that is decided by which columns the supplier happened to fill. This makes it a decision instead: these nine fields before the date, the rest after." },
    { q: "How much faster will our launches be?", a: "We will not give you a number, because we have not measured one and a multiple without a baseline is meaningless. What we can tell you is which subset of the work actually determines whether a range is shoppable, which is the thing a time-to-market figure is a proxy for." },
    { q: "What if the supplier data is genuinely terrible?", a: "Then the audit says so early, with the specific fields nobody can supply, and that is worth knowing before the range is committed rather than during the backfill. A list of what to request from a supplier is more actionable than a general complaint about data quality." },
  ],

  cta: {
    title: "Send the supplier file before you load it.",
    body: "One export of an incoming range, and a ranked list of the fields that decide whether it launches shoppable or launches invisible.",
    label: "Request a Decision Audit",
    href: "/contact",
    note: "It runs on incomplete data. That is the state it is built to assess.",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const TIME_TO_MARKET_VI: StoryContent = {
  meta: {
    title: "Thời gian ra thị trường: lên hàng trước dữ liệu",
    description:
      "Thứ chặn một dòng hàng là không biết trường nào chịu lực. Nhận tập tối thiểu đủ để quyết định, đo trước khi lên hàng, từ một tệp xuất chưa đầy đủ.",
  },
  eyebrow: "Tình huống sử dụng",
  title: "Đưa dòng hàng ra thị trường trước khi dữ liệu xong xuôi.",
  lede:
    "Một dòng hàng mới không bị chặn bởi việc bạn có bao nhiêu dữ liệu. Nó bị chặn bởi việc không biết người mua thực sự chọn dựa trên trường nào, nên kế hoạch thành ra là làm giàu tất cả hoặc lên hàng trong mù mờ. Bản kiểm tra đưa bạn tập tối thiểu khiến một dòng hàng đủ rõ để quyết định, đo trước khi lên hàng, không cần lưu lượng.",

  visualHeading: "Tất cả, hay phần thực sự quan trọng.",
  visualBody:
    "Kế hoạch làm giàu đầy đủ đặt cạnh tập con khiến dòng hàng mua được ngay ngày đầu tiên.",

  chainBlock: {
    eyebrow: "Lằn ranh không ai dám vạch",
    heading: "Làm giàu dữ liệu nhanh hơn thì vẫn là làm giàu tất cả.",
    body: "Một đợt ra mắt không cần lược đồ đầy đủ. Nó cần biết trường nào là chịu lực trong ngày đầu tiên.",
  },

  scenes: {
    situation: {
      kind: "grid",
      total: 200,
      lit: 20,
      label: "Số trường lược đồ cho phép với dòng hàng này",
      litLabel: "Chịu lực trong ngày ra mắt",
      restLabel: "Vẫn là việc thật, nhưng làm sau được",
      tone: "good",
    },

    hero: {
      kind: "delta",
      eyebrow: "Mười một định dạng nhà cung cấp, một ngày ra mắt",
      question: "Những trường nào phải đúng trước khi dòng hàng này lên kệ?",
      label: "Số trường trong phạm vi trước ngày ra mắt",
      before: { v: 200, label: "Tất cả những gì lược đồ cho phép" },
      after: { v: 20, label: "Chịu lực trong ngày đầu" },
      note: "Phần còn lại không bị bỏ, chúng được xếp lịch. Chênh lệch giữa hai con số đó quyết định ngày ra mắt có phải dời hay không.",
      footer: "Một lằn ranh bạn bảo vệ được trước người chịu trách nhiệm ra mắt.",
    },
    chain: {
      kind: "bars",
      rows: [
        { label: "Làm giàu tất cả", value: 200, tone: "hold", note: "phương án trượt ngày" },
        { label: "Làm giàu nhóm đầu", value: 50, tone: "work", note: "tuỳ tiện, và phần lớn vẫn sai trường" },
        { label: "Làm giàu thứ quyết định", value: 20, tone: "good", note: "đã xếp hạng, kèm sản phẩm cho từng trường" },
      ],
      note: "Cả ba đều cùng một đội và cùng một quý. Chỉ phương án cuối là được chọn thay vì đoán.",
    },
  },

  situation: {
    heading: "Dòng hàng đã chốt. Dữ liệu về theo mười một định dạng. Ngày lên hàng thì không dời.",
    body: [
      "Dữ liệu nhà cung cấp về dưới dạng bảng tính, tệp PDF và nguồn dữ liệu, mỗi bên một quan niệm về việc một trường tên là gì và trường nào bắt buộc. Ai đó phải biến chừng ấy thành một danh mục, và ước lượng trung thực để làm cho tử tế thì dài hơn khoảng thời gian còn lại.",
      "Thế là dòng hàng lên trong một trong hai trạng thái tệ. Hoặc nó chờ một đợt làm giàu đầy đủ và lỡ mất mùa vụ nó được mua về để phục vụ, hoặc nó lên sàn với tên, giá và ảnh, không một thuộc tính nào người mua lọc được. Trường hợp thứ hai phổ biến hơn vì ngày lên hàng là thật còn chất lượng dữ liệu thì thương lượng được.",
      "Một dòng hàng lên sàn mà không lọc được thì tệ nhất đúng vào lúc nó quan trọng nhất. Giai đoạn ra mắt là lúc sự quan tâm cao nhất và cũng là lúc bạn có ít dữ liệu hành vi nhất để dựa vào, nên danh mục phải tự mình gánh toàn bộ quyết định.",
    ],
    pull:
      "Làm giàu nhanh hơn thì vẫn là làm giàu tất cả. Câu hỏi không ai trả lời trước một đợt ra mắt là: trong hai trăm trường, hai mươi trường nào mới thực sự chịu lực.",
  },

  steps: {
    heading: "Một đợt ra mắt ngắn lại bằng cách nào",
    intro: "Không phải bằng cách làm cùng khối lượng công việc nhanh hơn. Mà bằng cách làm một phần nhỏ hơn trước.",
    items: [
      { n: "01", meta: "Trước khi lên hàng", title: "Đo một mẫu của dòng hàng", body: "Gửi một tệp xuất các sản phẩm sắp về, dù còn thiếu tới đâu. Phép đo chạy được trên dữ liệu chưa đầy đủ, và đó chính là điểm mấu chốt: nó đang cho bạn biết cái gì còn thiếu, nên nó không thể đòi bạn phải điền xong trước." },
      { n: "02", meta: "Câu trả lời", title: "Nhận tập tối thiểu đủ để quyết định", body: "Một nhúm thuộc tính gánh phần lớn quyết định trong ngành hàng đó, đã xếp hạng, kèm mức mỗi thuộc tính kéo dòng hàng từ chỗ không phân biệt nổi sang chỗ chọn được. Đó là danh sách kiểm cho ngày ra mắt, và nó thường ngắn hơn hẳn lược đồ." },
      { n: "03", meta: "Sau khi lên hàng", title: "Bù dữ liệu theo một con số", body: "Đo lại khi phần còn lại về tới, để việc bù dữ liệu được ưu tiên theo thứ đang còn gây tốn kém thay vì theo thứ đang còn trống. Dòng hàng tốt lên theo một thứ tự nhìn thấy được thay vì tốt lên vô hạn định." },
    ],
  },

  gets: {
    heading: "Kế hoạch ra mắt thay đổi những gì",
    items: [
      { icon: Rocket, title: "Một danh sách kiểm, không phải một lược đồ", body: "Những trường khiến dòng hàng chọn được, tách khỏi những trường làm đầy hồ sơ. Rồi cả hai đều quan trọng; chỉ một trong hai chặn một mốc thời gian." },
      { icon: Layers, title: "Nơi từng dữ kiện đã nằm sẵn", body: "Trích xuất được từ tiêu đề và mô tả của nhà cung cấp, ánh xạ được từ nguồn dữ liệu bạn đã nhận, hay thực sự chưa có. Cách chia đó quyết định điều gì khả thi trước ngày ra mắt và điều gì không." },
      { icon: Timer, title: "Một con số khi bạn chưa có lưu lượng", body: "Mức sẵn sàng quyết định được tính từ danh mục, nên một dòng hàng đánh giá được trước khi có một khách nào nhìn thấy. Chờ dữ liệu hành vi nghĩa là biết được sau khi cửa sổ cơ hội đã đóng." },
      { icon: SplitSquareHorizontal, title: "Một lằn ranh bảo vệ được", body: "\"Chúng ta lên hàng với chín trường này và bù phần còn lại sau\" là một lập trường bạn mang được tới người mua hàng hay giám đốc trưng bày hàng hoá, bởi chín trường đó được chọn bằng phép đo chứ không phải bằng việc nhà cung cấp tình cờ điền cột nào." },
    ],
  },

  limits: {
    heading: "Việc này rút ngắn được gì và không rút ngắn được gì",
    will: [
      "Cho biết tập thuộc tính nhỏ nhất khiến một dòng hàng mới đủ rõ để quyết định, đã xếp hạng, trước khi lên hàng",
      "Tách phần lấy lại được từ văn bản nhà cung cấp khỏi phần phải đi hỏi hoặc đi thu thập",
      "Đưa bạn điểm đủ thông tin để mua của dòng hàng, đo lại được khi phần bù dữ liệu về tới",
      "Chạy được trên dữ liệu đầu vào còn thiếu và lộn xộn, vì đó đúng là trạng thái nó được thiết kế để đánh giá",
    ],
    wont: [
      "Nạp, chuẩn hoá hay biến đổi nguồn dữ liệu nhà cung cấp của bạn. Chúng tôi đo; đường ống nạp danh mục là của bạn hoặc của hệ PIM",
      "Sinh giá trị thuộc tính bằng mô hình. Chúng tôi cho biết dữ kiện nào đáng có và chúng đang nằm ở đâu, và không bịa ra những cái còn thiếu",
      "Nêu một mức rút ngắn thời gian ra mắt. Chúng tôi chưa đo được mức nào, và \"nhanh gấp năm lần\" là loại con số hay được nêu ra mà không có mốc nền",
      "Thay thế công việc làm giàu dữ liệu. Nó sắp xếp lại thứ tự để phần chặn mốc thời gian được làm trước",
    ],
  },

  faq: [
    { q: "Chúng tôi chạy được việc này sớm tới mức nào với một dòng hàng mới?", a: "Ngay khi bạn có bất kỳ tệp xuất nào của các sản phẩm sắp về, kể cả tệp còn thiếu. Phép đo được thiết kế để đánh giá dữ liệu chưa đầy đủ, nên đòi nó phải đầy đủ trước sẽ làm hỏng chính mục đích. Phần lớn nhà bán chạy nó trên tệp của nhà cung cấp trước khi nạp bất cứ thứ gì." },
    { q: "Các bạn có làm sạch hay biến đổi dữ liệu nhà cung cấp không?", a: "Không. Chúng tôi không nạp nguồn dữ liệu, không chuẩn hoá định dạng và không ghi giá trị vào danh mục của bạn. Chúng tôi đọc một tệp xuất và trả lại danh sách xếp hạng những gì đáng ghi cùng nơi từng dữ kiện đang nằm. Việc nạp và biến đổi vẫn thuộc về hệ PIM hoặc đội của bạn." },
    { q: "Chúng tôi thực sự lên hàng được trước khi dữ liệu hoàn chỉnh à?", a: "Gần như chắc chắn bạn vẫn đang làm vậy rồi. Câu hỏi là những trường bạn lên hàng cùng có phải là những trường chịu lực hay không, và hôm nay điều đó được quyết định bởi việc nhà cung cấp tình cờ điền cột nào. Việc này biến nó thành một quyết định: chín trường này trước ngày ra mắt, phần còn lại sau." },
    { q: "Các đợt ra mắt của chúng tôi sẽ nhanh hơn bao nhiêu?", a: "Chúng tôi sẽ không đưa một con số, vì chưa đo được và một bội số không có mốc nền thì vô nghĩa. Điều chúng tôi nói được là tập con nào của công việc thực sự quyết định một dòng hàng có mua được hay không, và đó mới là thứ mà một con số thời gian ra mắt đang đại diện cho." },
    { q: "Nếu dữ liệu nhà cung cấp thực sự tệ thì sao?", a: "Thì bản kiểm tra nói ra điều đó sớm, kèm những trường cụ thể không ai cung cấp nổi, và đó là thứ đáng biết trước khi dòng hàng được chốt chứ không phải trong lúc bù dữ liệu. Một danh sách những gì cần yêu cầu nhà cung cấp thì hành động được hơn hẳn một lời than chung chung về chất lượng dữ liệu." },
  ],

  cta: {
    title: "Gửi tệp của nhà cung cấp trước khi bạn nạp nó.",
    body: "Một tệp xuất của dòng hàng sắp về, và một danh sách xếp hạng những trường quyết định nó lên sàn ở trạng thái mua được hay ở trạng thái vô hình.",
    label: "Yêu cầu Decision Audit",
    href: "/contact",
    note: "Nó chạy trên dữ liệu chưa đầy đủ. Đó đúng là trạng thái nó được xây để đánh giá.",
  },
};

export const timeToMarket = (l: string) => byLocale({ en: TIME_TO_MARKET, vi: TIME_TO_MARKET_VI }, l);

/** Alt text for the page's pictures (the owner's generated set, 28 Oct 2026), in the page's order. */
const TIME_TO_MARKET_PICTURE_ALT: Record<"en" | "vi", UseCasePictureAlt> = {
  en: {
    hero: "Eleven supplier files, spreadsheets, PDFs and feeds, flowing through one funnel into a catalogue of products, then on to a calendar with the launch date flagged.",
    situation:
      "A launch timeline over nine weeks: enriching everything runs past the launch date, while enriching what decides finishes before it, with the rest filled in after launch.",
    steps: [
      "A partial supplier spreadsheet with two fields blank, under a magnifying glass.",
      "A handful of fields picked out of a grid of many, then ranked in a short list.",
      "A readiness gauge, with supplier files arriving in a loop as it is measured again.",
    ],
    gets: [
      "A short checklist of four ticked fields, picked out of a much larger catalogue schema.",
      "Three places a fact can come from, the supplier's text, a feed, or nowhere, each feeding one product's fields.",
      "A readiness gauge already reading, before any visitor has arrived.",
      "A list of fields with a cut line drawn under the first three, the rest below it.",
    ],
  },
  vi: {
    hero: "Mười một tệp nhà cung cấp, bảng tính, PDF và nguồn cấp, đi qua một phễu vào danh mục sản phẩm, rồi tới lịch có cắm cờ ngày ra mắt.",
    situation:
      "Dòng thời gian ra mắt trong chín tuần: làm giàu mọi thứ kéo dài quá ngày ra mắt, còn làm giàu những gì quyết định thì xong trước ngày đó, phần còn lại được bổ sung sau khi ra mắt.",
    steps: [
      "Một bảng tính nhà cung cấp còn dở với hai trường để trống, dưới một kính lúp.",
      "Một số ít trường được chọn ra từ lưới rất nhiều trường, rồi được xếp hạng thành danh sách ngắn.",
      "Đồng hồ đo mức sẵn sàng, với các tệp nhà cung cấp đến theo vòng lặp khi được đo lại.",
    ],
    gets: [
      "Danh sách kiểm tra ngắn gồm bốn trường đã tích, chọn ra từ một lược đồ danh mục lớn hơn nhiều.",
      "Ba nơi một thông tin có thể đến từ, văn bản của nhà cung cấp, một nguồn cấp, hoặc không đâu cả, mỗi nơi đi vào các trường của một sản phẩm.",
      "Đồng hồ đo mức sẵn sàng đã có số, trước khi có khách truy cập nào.",
      "Danh sách trường với một vạch cắt kẻ dưới ba trường đầu, phần còn lại nằm dưới vạch.",
    ],
  },
};

export const timeToMarketPictureAlt = (l: string) =>
  byLocale(
    { en: TIME_TO_MARKET_PICTURE_ALT.en, vi: TIME_TO_MARKET_PICTURE_ALT.vi },
    l,
  );
