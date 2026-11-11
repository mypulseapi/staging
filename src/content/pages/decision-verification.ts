import { byLocale } from "@/content/locale";
import type { StoryContent } from "@/components/StoryPage";

/** For the person who did the work and now has to prove it landed. */
export const DECISION_VERIFICATION: StoryContent = {
  meta: {
    title: "Decision Verification: verify product data fixes",
    description:
      "Rescan the repaired pages and we recompute the same measurement, so you can show exactly what moved. No traffic, no waiting, no test to design.",
  },
  eyebrow: "Decision Verification",
  title: "Verify every fix against what shoppers need",
  lede: "You populated the top attribute. To verify the fixes, send the repaired catalogue back and we recompute the same measurement, so you can show exactly what moved. No traffic, no waiting, no test to design.",

  visualHeading: "Before and after, attribute by attribute.",
  visualBody:
    "The same measurement on the repaired catalogue, so the two runs are directly comparable.",

  situation: {
    heading:
      "The work is done. Now somebody is going to ask whether it was worth it.",
    body: [
      "Enrichment projects have a reporting problem. The work is real, it takes a quarter, and at the end the only evidence is that some fields are fuller than they were. Nobody can tell whether the right fields got filled, and the person who approved the budget is entitled to ask.",
      "The usual answer is to wait for traffic and hope conversion moved. That takes months, it is confounded by everything else you shipped, and a bad number still will not tell you whether the enrichment was wrong or the weather was.",
    ],
    pull: "You should not have to wait a quarter for traffic to tell you whether you filled in the right fields.",
  },

  steps: {
    heading: "How is the repair verified?",
    items: [
      {
        n: "01",
        meta: "You",
        title: "Rescan the category",
        body: "The same shelf, with whatever your team managed to populate. It does not need to be finished; partial repairs measure fine and often tell you where to stop.",
      },
      {
        n: "02",
        meta: "Us",
        title: "We run the same measurement",
        body: "Identical method, identical attributes, so the two runs are comparable. Nothing is re-tuned between them, which is the only way a before and after means anything.",
      },
      {
        n: "03",
        meta: "Both",
        title: "You get the difference",
        body: "Coverage per attribute, how much of the gap closed, and where your readiness number landed. Written so it can be forwarded to whoever signed the budget.",
      },
    ],
  },

  beforeAfter: {
    heading: "What verification gives you",
    intro: "The same enrichment project, reported two ways.",
    before: {
      label: "Before verification",
      items: [
        "The only evidence the work happened is that some fields are fuller than they were",
        "Nobody can say whether the fields that got filled were the ones that mattered",
        "The person who approved the budget has no answer, and is entitled to ask for one",
        "The usual fallback is to wait a quarter for traffic, which confounds the result with everything else you shipped",
      ],
    },
    after: {
      label: "After verification",
      items: [
        "Before and after on every attribute you touched, not one blended score",
        "Your readiness number, moved: on the shelf we measured, products a shopper could not separate went from 94 to 31",
        "The remaining gaps ranked again, so the next round of work is already ordered",
        "A document that stands on its own, written for whoever approved the spend",
        "An answer the same week, because this is computed from your catalogue rather than accumulated from traffic",
      ],
    },
  },

  faq: [
    {
      q: "How soon after the repair can we verify?",
      a: "Immediately. The measurement reads your catalogue, not your traffic, so there is nothing to wait for. Merchants usually verify the week the population work finishes, while the team still remembers what they did.",
    },
    {
      q: "Does a partial repair still measure?",
      a: "Yes, and it is often the more useful run. Populating 60% of a field and measuring tells you whether the remaining 40% is worth the effort, which is a question nobody can answer from a completeness percentage.",
    },
    {
      q: "Can we verify a category you did not audit?",
      a: "Not meaningfully. Verification is a comparison against a baseline, so the category needs an audit first to establish what it was.",
    },
    {
      q: "Can Pulse be customized for different product categories?",
      a: "Yes. Pulse adapts the product attributes, the buying criteria and the recommendations it produces to your specific product category, so a laptop shelf and a skincare shelf are not scored against the same questions.",
    },
  ],

  cta: {
    title: "Finished the repair? Send it back.",
    body: "Same category, same measurement, and a document you can hand to whoever asked whether it was worth doing.",
    label: "Talk to us about verification",
    href: "/contact",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const DECISION_VERIFICATION_VI: StoryContent = {
  meta: {
    title: "Decision Verification: xác minh dữ liệu đã sửa",
    description:
      "Quét lại các trang đã sửa và chúng tôi chạy lại đúng phép đo đó, để bạn chỉ rõ chính xác điều gì đã dịch chuyển. Không cần lưu lượng, không phải chờ đợi.",
  },
  eyebrow: "Decision Verification",
  title: "Kiểm chứng mọi thay đổi theo đúng thứ người mua cần",
  lede: "Bạn đã điền xong thuộc tính đứng đầu bảng. Để xác minh dữ liệu đã sửa, gửi lại danh mục đã sửa và chúng tôi chạy lại đúng phép đo đó, để bạn chỉ ra chính xác điều gì đã dịch chuyển. Không cần lưu lượng, không phải chờ, không phải thiết kế thử nghiệm nào.",

  visualHeading: "Trước và sau, theo từng thuộc tính.",
  visualBody:
    "Cùng một phép đo trên danh mục đã sửa, nên hai lần chạy so sánh trực tiếp được với nhau.",

  situation: {
    heading: "Việc đã xong. Giờ sẽ có người hỏi nó có đáng hay không.",
    body: [
      "Các dự án làm giàu dữ liệu có một vấn đề về báo cáo. Công việc là thật, nó ngốn một quý, và đến cuối bằng chứng duy nhất là vài trường đầy hơn trước. Không ai nói được liệu đúng những trường cần thiết đã được điền hay chưa, và người duyệt ngân sách hoàn toàn có quyền hỏi.",
      "Câu trả lời thường thấy là chờ dữ liệu lưu lượng và hy vọng tỷ lệ chuyển đổi nhúc nhích. Việc đó mất hàng tháng, bị nhiễu bởi mọi thứ khác bạn đã thay đổi, và nếu con số đi sai hướng thì bạn vẫn không biết là do việc làm giàu sai hay do thời tiết.",
    ],
    pull: "Bạn không nên phải chờ một quý để lưu lượng cho biết mình đã điền đúng trường hay chưa.",
  },

  steps: {
    heading: "Việc sửa được xác minh thế nào?",
    items: [
      {
        n: "01",
        meta: "Bạn",
        title: "Quét lại ngành hàng",
        body: "Cùng kệ hàng đó, với những gì đội của bạn điền được. Không cần hoàn tất; sửa một phần vẫn đo tốt và thường cho biết nên dừng ở đâu.",
      },
      {
        n: "02",
        meta: "Chúng tôi",
        title: "Chúng tôi chạy lại đúng phép đo",
        body: "Cùng phương pháp, cùng bộ thuộc tính, nên hai lần chạy so sánh được. Không có gì được chỉnh lại ở giữa, và đó là cách duy nhất để một phép so sánh trước-sau có ý nghĩa.",
      },
      {
        n: "03",
        meta: "Cả hai",
        title: "Bạn nhận phần chênh lệch",
        body: "Độ phủ theo từng thuộc tính, bao nhiêu phần khoảng trống đã đóng lại, và điểm đủ thông tin để mua của bạn giờ ở đâu. Viết sao cho chuyển tiếp được cho người đã duyệt ngân sách.",
      },
    ],
  },

  beforeAfter: {
    heading: "Xác minh mang lại cho bạn điều gì",
    intro: "Cùng một dự án làm giàu dữ liệu, báo cáo theo hai cách.",
    before: {
      label: "Trước khi xác minh",
      items: [
        "Bằng chứng duy nhất cho thấy công việc đã diễn ra là một số trường đầy hơn trước",
        "Không ai nói được những trường đã điền có đúng là những trường quan trọng hay không",
        "Người duyệt ngân sách không có câu trả lời, và họ có quyền hỏi",
        "Cách xoay xở thường thấy là chờ một quý để xem lưu lượng, và kết quả bị trộn lẫn với mọi thứ khác bạn đã triển khai",
      ],
    },
    after: {
      label: "Sau khi xác minh",
      items: [
        "Trước và sau trên từng thuộc tính bạn đã động vào, không phải một điểm số gộp",
        "Điểm đủ thông tin để mua của bạn đã dịch chuyển: trên kệ hàng chúng tôi đo, số sản phẩm người mua không phân biệt được giảm từ 94 xuống 31",
        "Những khoảng trống còn lại được xếp hạng lại, nên đợt việc tiếp theo đã có sẵn thứ tự",
        "Một tài liệu đứng độc lập được, viết cho người đã duyệt khoản chi",
        "Câu trả lời ngay trong tuần, vì nó được tính từ danh mục của bạn chứ không phải tích luỹ từ lưu lượng",
      ],
    },
  },

  faq: [
    {
      q: "Sau khi sửa thì bao lâu chúng tôi xác minh được?",
      a: "Ngay lập tức. Phép đo đọc danh mục của bạn chứ không đọc lưu lượng, nên không có gì phải chờ. Các nhà bán thường xác minh ngay trong tuần hoàn tất việc điền dữ liệu, khi cả đội còn nhớ mình đã làm gì.",
    },
    {
      q: "Sửa một phần thì có đo được không?",
      a: "Có, và đó thường là lần chạy hữu ích hơn. Điền 60% một trường rồi đo sẽ cho biết 40% còn lại có đáng công hay không, một câu hỏi mà không tỷ lệ hoàn thiện nào trả lời được.",
    },
    {
      q: "Chúng tôi xác minh được ngành hàng các bạn chưa kiểm tra không?",
      a: "Không có ý nghĩa gì. Xác minh là so sánh với một mốc nền, nên ngành hàng đó cần được kiểm tra trước để xác lập nó vốn ở đâu.",
    },
    {
      q: "Pulse có tuỳ chỉnh được theo từng ngành hàng không?",
      a: "Có. Pulse điều chỉnh thuộc tính sản phẩm, tiêu chí mua và các gợi ý nó đưa ra theo đúng ngành hàng của bạn, nên kệ laptop và kệ mỹ phẩm không bị chấm trên cùng một bộ câu hỏi.",
    },
  ],

  cta: {
    title: "Sửa xong rồi? Gửi lại cho chúng tôi.",
    body: "Cùng ngành hàng, cùng phép đo, và một tài liệu bạn đưa được cho người đã hỏi việc này có đáng làm hay không.",
    label: "Trao đổi về việc xác minh",
    href: "/contact",
  },
};

export const decisionVerification = (l: string) =>
  byLocale({ en: DECISION_VERIFICATION, vi: DECISION_VERIFICATION_VI }, l);
