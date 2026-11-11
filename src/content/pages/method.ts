import { byLocale } from "@/content/locale";
import { Ruler, Binary, Target, Repeat } from "lucide-react";
import type { StoryContent } from "@/components/StoryPage";

/** For the technical person the buyer forwards this to. */
export const METHOD: StoryContent = {
  meta: {
    title: "Our method for scoring missing product attributes",
    description:
      "Every ranking here comes from one measurement, reproducible from our repository with a single command. What it does, what a bit means, and where it stops.",
  },
  eyebrow: "The method",
  title: "How a missing field gets a number.",
  lede: "Every ranking on this site comes from one measurement for scoring missing product attributes, and it is reproducible from our repository with a single command. This is what it does, what the unit means, and where it stops being reliable.",

  visualHeading: "What one bit actually buys.",
  visualBody:
    "A bit is one halving of the shelf. That fixed meaning is why two attributes can be compared at all.",

  chainBlock: {
    eyebrow: "The same number, after the repair",
    heading: "A bit is only useful if it moves when the catalogue changes.",
    body: "One attribute populated on the shelf we measured, and the same method run twice.",
  },

  scenes: {
    situation: {
      kind: "bars",
      rows: [
        {
          label: "Screen size",
          value: 1.067,
          tone: "good",
          note: "missing on 80 of 216",
        },
        { label: "Memory", value: 1.012, tone: "work", note: "missing on 60" },
        {
          label: "Processor",
          value: 0.747,
          tone: "work",
          note: "missing on 162, and still third",
        },
        { label: "Storage", value: 0.688, tone: "hold", note: "missing on 55" },
      ],
      note: "Bits of decision information, from the shelf we measured. Processor is absent from three quarters of the shelf and still ranks third, which is the part of the method worth explaining.",
    },

    hero: {
      kind: "grid",
      total: 216,
      lit: 94,
      label: "Products on the shelf we measured",
      litLabel: "A shopper cannot tell these apart",
      restLabel: "Separable once every supported question is answered",
      tone: "warn",
    },
    chain: {
      kind: "delta",
      label: "Products still sharing every recorded answer",
      before: { v: 94, label: "Before" },
      after: { v: 31, label: "After one attribute" },
      note: "Identical method on both runs, nothing re-tuned between them. That is the only condition under which a before and an after mean anything.",
      footer:
        "Re-measurable, which is what makes it a measurement rather than a score.",
    },
  },

  situation: {
    heading:
      "Somebody on your side is going to ask how the number is produced.",
    body: [
      "They should. A vendor telling you which fields matter is making a claim about your shoppers, and claims like that are usually built from a proprietary score nobody outside the company can inspect.",
      "Ours is not. The measurement is information theory applied to a shelf of products and a set of stated buying requirements, and both halves are checkable. If the method is wrong you can tell us why, which is a property we would rather have than mystique.",
      "What follows is the whole of it. There is no second, better model behind this page.",
    ],
    pull: "If we cannot show you how a figure was produced, we do not print it. That rule is why there is no conversion statistic anywhere on this site.",
  },

  steps: {
    heading: "What the measurement actually does",
    items: [
      {
        n: "01",
        meta: "Coverage",
        title: "Score the shelf as it is",
        body: "For each attribute, compute how much knowing it reduces uncertainty about which product a shopper means. A field recorded on nothing removes none. A field everyone shares the same value for also removes none, which is why completeness is a poor proxy.",
      },
      {
        n: "02",
        meta: "Potential",
        title: "Score the shelf repaired",
        body: "Simulate the same attribute recorded everywhere and score again. The difference between the two is what that field is worth to you today, expressed in bits.",
      },
      {
        n: "03",
        meta: "Demand",
        title: "Weight it by what shoppers ask",
        body: "An attribute only matters where a real decision depends on it. Each one is scored against the stated requirements for that category, so a field no decision rests on scores near zero however empty it is.",
      },
    ],
  },

  gets: {
    heading: "Why the unit is bits",
    intro:
      "Because the question is genuinely about information, and bits are what information is measured in.",
    items: [
      {
        icon: Binary,
        title: "A bit is one halving of the field",
        body: "One bit of decision information means a shopper can rule out half the shelf. It is not a score we invented and scaled to look impressive; it has a fixed meaning you can check.",
      },
      {
        icon: Ruler,
        title: "It makes attributes comparable",
        body: "Screen size and processor are not comparable as percentages complete. They are comparable as how much each one narrows a choice, which is the thing you are actually trading off.",
      },
      {
        icon: Target,
        title: "It separates absence from demand",
        body: "Two attributes can be equally missing and differ enormously in what recording them would buy. Bits capture that; a completeness report cannot.",
      },
      {
        icon: Repeat,
        title: "It is re-measurable",
        body: "The same computation on a repaired catalogue gives a directly comparable number, which is what makes verification possible without traffic.",
      },
    ],
  },

  limits: {
    heading: "What the method rests on",
    will: [
      "Rank attributes by how much recording them would improve a shopper's ability to choose",
      "Produce a figure that is comparable across attributes and across runs",
      "Run on product data alone, with no traffic and no customer records",
      "Be reproduced from our repository, on the fixture it was measured against",
    ],
    wont: [
      "Model an individual shopper. It measures the catalogue's capacity to support decisions, not anyone's behaviour",
      "Survive an attribute whose recorded values are unrepresentative of its real range, which we document rather than paper over",
      "Rank positions two to four reliably. Only the top of the ranking is stable across seeds and weightings",
      "Tell you anything about revenue",
    ],
  },

  faq: [
    {
      q: "How do you know what shoppers need?",
      a: "From stated requirements for the category rather than from clicks. The shelf we published was scored against 32 of them. Clicks cannot tell you about a need your catalogue never let anyone express, which is the whole gap we exist to measure.",
    },
    {
      q: "Can we reproduce your numbers?",
      a: "Yes, and the command is on this page. The measurement and the fixture it ran against are both in our repository, so every figure on this site can be regenerated rather than taken on trust.",
    },
    {
      q: "Is this machine learning?",
      a: "No. It is information theory over your catalogue and a set of stated requirements. There is no trained model, no embedding and nothing that needs retraining, which is also why it produces the same answer twice.",
    },
    {
      q: "What is a decision-readiness number?",
      a: "After every question your catalogue can currently answer, how many products is a shopper still choosing between? On our test shelf it was 94 of 216 against a useful shortlist of about five. It is the figure that moves when you repair the catalogue.",
    },
  ],

  cta: {
    title: "Run it against your own shelf.",
    body: "The method is only interesting if it says something about your catalogue. Your store's address is enough to find out.",
    label: "Request a Decision Audit",
    href: "/contact",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const METHOD_VI: StoryContent = {
  meta: {
    title: "Phương pháp: gán số cho một trường còn thiếu",
    description:
      "Mọi thứ hạng ở đây đều đến từ một phép đo duy nhất, tái lập được từ kho mã bằng một câu lệnh. Nó làm gì, một bit nghĩa là gì, và nó dừng lại ở chỗ nào.",
  },
  eyebrow: "Phương pháp",
  title: "Một trường còn thiếu được gán con số như thế nào.",
  lede: "Mọi thứ hạng trên trang này đều đến từ một phép đo duy nhất, và nó tái lập được từ kho mã của chúng tôi bằng một câu lệnh. Đây là những gì nó làm, đơn vị đo có nghĩa gì, và nó ngừng đáng tin ở đâu.",

  visualHeading: "Một bit thực sự mua được gì.",
  visualBody:
    "Một bit là một lần chia đôi kệ hàng. Chính ý nghĩa cố định đó khiến hai thuộc tính có thể đem ra so sánh với nhau.",

  chainBlock: {
    eyebrow: "Cùng con số đó, sau khi sửa",
    heading: "Một bit chỉ hữu ích nếu nó dịch chuyển khi danh mục thay đổi.",
    body: "Một thuộc tính được điền trên kệ hàng chúng tôi đã đo, và cùng một phương pháp chạy hai lần.",
  },

  scenes: {
    situation: {
      kind: "bars",
      rows: [
        {
          label: "Kích thước màn hình",
          value: 1.067,
          tone: "good",
          note: "thiếu ở 80 trên 216",
        },
        { label: "Bộ nhớ", value: 1.012, tone: "work", note: "thiếu ở 60" },
        {
          label: "Bộ xử lý",
          value: 0.747,
          tone: "work",
          note: "thiếu ở 162, mà vẫn đứng thứ ba",
        },
        {
          label: "Dung lượng lưu trữ",
          value: 0.688,
          tone: "hold",
          note: "thiếu ở 55",
        },
      ],
      note: "Đơn vị bit thông tin quyết định, từ kệ hàng chúng tôi đã đo. Bộ xử lý vắng mặt ở ba phần tư kệ mà vẫn xếp thứ ba, và đó chính là phần đáng giải thích của phương pháp.",
    },

    hero: {
      kind: "grid",
      total: 216,
      lit: 94,
      label: "Sản phẩm trên kệ hàng chúng tôi đã đo",
      litLabel: "Người mua không phân biệt nổi những sản phẩm này",
      restLabel: "Tách được khi mọi câu hỏi hỗ trợ đã có lời đáp",
      tone: "warn",
    },
    chain: {
      kind: "delta",
      label: "Sản phẩm vẫn trùng nhau ở mọi trường đã ghi",
      before: { v: 94, label: "Trước" },
      after: { v: 31, label: "Sau một thuộc tính" },
      note: "Cùng một phương pháp ở cả hai lần chạy, không tinh chỉnh lại gì ở giữa. Đó là điều kiện duy nhất khiến so sánh trước và sau có ý nghĩa.",
      footer:
        "Đo lại được, và đó là điều khiến nó là một phép đo chứ không phải một điểm số.",
    },
  },

  situation: {
    heading: "Sẽ có người bên phía bạn hỏi con số này được tạo ra thế nào.",
    body: [
      "Họ nên hỏi. Một nhà cung cấp nói cho bạn biết trường nào quan trọng là đang đưa ra một khẳng định về người mua của bạn, và những khẳng định kiểu đó thường được dựng từ một điểm số độc quyền mà không ai bên ngoài công ty kiểm chứng được.",
      "Của chúng tôi thì không. Phép đo là lý thuyết thông tin áp dụng lên một kệ sản phẩm và một tập yêu cầu mua hàng đã được nêu ra, và cả hai nửa đều kiểm chứng được. Nếu phương pháp sai, bạn có thể chỉ ra vì sao, và đó là thứ chúng tôi muốn có hơn là vẻ bí ẩn.",
      "Phần dưới đây là toàn bộ nó. Không có mô hình thứ hai nào tốt hơn ẩn sau trang này.",
    ],
    pull: "Nếu không trình bày được một con số ra đời thế nào, chúng tôi không in nó. Chính quy tắc đó là lý do trên trang này không có bất kỳ thống kê chuyển đổi nào.",
  },

  steps: {
    heading: "Phép đo thực sự làm gì",
    items: [
      {
        n: "01",
        meta: "Độ phủ",
        title: "Chấm điểm kệ hàng như nó đang có",
        body: "Với từng thuộc tính, tính xem việc biết nó làm giảm bao nhiêu độ bất định về việc người mua đang muốn sản phẩm nào. Một trường không được ghi ở đâu cả thì không giảm được gì. Một trường mà mọi sản phẩm đều cùng một giá trị cũng không giảm được gì, và đó là lý do mức hoàn thiện là một thước đo kém.",
      },
      {
        n: "02",
        meta: "Tiềm năng",
        title: "Chấm điểm kệ hàng sau khi sửa",
        body: "Mô phỏng thuộc tính đó được ghi ở mọi sản phẩm rồi chấm lại. Chênh lệch giữa hai lần chính là giá trị của trường đó với bạn ngày hôm nay, tính bằng bit.",
      },
      {
        n: "03",
        meta: "Nhu cầu",
        title: "Nhân trọng số theo điều người mua hỏi",
        body: "Một thuộc tính chỉ có ý nghĩa ở nơi có một quyết định thật phụ thuộc vào nó. Mỗi thuộc tính được chấm đối chiếu với các yêu cầu đã nêu cho ngành hàng đó, nên một trường không quyết định nào dựa vào sẽ có điểm gần bằng không, dù nó trống đến đâu.",
      },
    ],
  },

  gets: {
    heading: "Vì sao đơn vị là bit",
    intro:
      "Vì câu hỏi ở đây thực sự là về thông tin, và bit là đơn vị đo thông tin.",
    items: [
      {
        icon: Binary,
        title: "Một bit là một lần chia đôi phạm vi",
        body: "Một bit thông tin quyết định nghĩa là người mua loại bỏ được nửa kệ hàng. Nó không phải một điểm số chúng tôi bịa ra rồi phóng đại cho oai; nó có ý nghĩa cố định mà bạn kiểm chứng được.",
      },
      {
        icon: Ruler,
        title: "Nó khiến các thuộc tính so sánh được",
        body: "Kích thước màn hình và vi xử lý không so sánh được với nhau dưới dạng phần trăm hoàn thiện. Chúng so sánh được dưới dạng mỗi cái thu hẹp lựa chọn bao nhiêu, và đó mới là thứ bạn thực sự đang cân nhắc đánh đổi.",
      },
      {
        icon: Target,
        title: "Nó tách sự vắng mặt khỏi nhu cầu",
        body: "Hai thuộc tính có thể thiếu như nhau mà giá trị của việc ghi lại chúng chênh nhau rất xa. Bit nắm bắt được điều đó; một báo cáo mức hoàn thiện thì không.",
      },
      {
        icon: Repeat,
        title: "Nó đo lại được",
        body: "Cùng phép tính đó trên một danh mục đã sửa cho ra một con số so sánh trực tiếp được, và đó là thứ khiến việc xác minh khả thi mà không cần lưu lượng.",
      },
    ],
  },

  limits: {
    heading: "Phương pháp này dựa trên điều gì",
    will: [
      "Xếp hạng các thuộc tính theo mức cải thiện khả năng chọn lựa của người mua nếu được ghi lại",
      "Cho ra một con số so sánh được giữa các thuộc tính và giữa các lần chạy",
      "Chạy chỉ trên dữ liệu sản phẩm, không cần lưu lượng và không cần hồ sơ khách hàng",
      "Tái lập được từ kho mã của chúng tôi, trên đúng bộ dữ liệu nó đã đo",
    ],
    wont: [
      "Mô hình hoá một người mua cụ thể. Nó đo năng lực hỗ trợ quyết định của danh mục, không đo hành vi của ai cả",
      "Trụ vững trước một thuộc tính mà các giá trị đã ghi không đại diện cho dải giá trị thật của nó, điều chúng tôi ghi rõ thay vì che đi",
      "Xếp hạng đáng tin các vị trí từ hai đến bốn. Chỉ phần đầu bảng là ổn định qua mọi seed và mọi cách đặt trọng số",
      "Nói cho bạn bất cứ điều gì về doanh thu",
    ],
  },

  faq: [
    {
      q: "Làm sao các bạn biết người mua cần gì?",
      a: "Từ các yêu cầu đã nêu cho ngành hàng, chứ không phải từ lượt nhấp. Kệ hàng chúng tôi công bố được chấm đối chiếu với 32 yêu cầu như vậy. Lượt nhấp không thể cho bạn biết về một nhu cầu mà danh mục của bạn chưa bao giờ cho ai cơ hội thể hiện, và chính khoảng trống đó là lý do chúng tôi tồn tại.",
    },
    {
      q: "Chúng tôi có tái lập được các con số của các bạn không?",
      a: "Có, và câu lệnh nằm ngay trên trang này. Cả phép đo lẫn bộ dữ liệu nó chạy trên đó đều nằm trong kho mã của chúng tôi, nên mọi con số trên trang web này đều tạo lại được thay vì phải tin suông.",
    },
    {
      q: "Đây có phải học máy không?",
      a: "Không. Đây là lý thuyết thông tin áp lên danh mục của bạn và một tập yêu cầu đã nêu. Không có mô hình được huấn luyện, không có embedding và không có gì cần huấn luyện lại, đó cũng là lý do nó cho cùng một đáp án ở hai lần chạy.",
    },
    {
      q: "Điểm đủ thông tin để mua là gì?",
      a: "Sau mọi câu hỏi mà danh mục của bạn hiện trả lời được, người mua vẫn còn phải chọn giữa bao nhiêu sản phẩm? Trên kệ thử nghiệm của chúng tôi, con số là 94 trên 216, so với một danh sách rút gọn hữu ích khoảng năm sản phẩm. Đây chính là con số dịch chuyển khi bạn sửa danh mục.",
    },
  ],

  cta: {
    title: "Chạy thử trên chính kệ hàng của bạn.",
    body: "Phương pháp chỉ thú vị khi nó nói được điều gì đó về danh mục của bạn. Địa chỉ website của bạn là đủ để biết.",
    label: "Yêu cầu Decision Audit",
    href: "/contact",
  },
};

export const method = (l: string) => byLocale({ en: METHOD, vi: METHOD_VI }, l);
