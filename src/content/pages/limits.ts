import { byLocale } from "@/content/locale";
import { FlaskConical, AlertTriangle, Layers, UserX, Image as ImageIcon } from "lucide-react";
import type { StoryContent } from "@/components/StoryPage";

/**
 * The page a competitor with twelve case studies cannot publish.
 *
 * It exists because a careful buyer will find these limits anyway, in a pilot or
 * in a procurement review, and finding them there costs far more than reading
 * them here. Everything on it is taken from our own research log, including the
 * run that failed.
 */
export const LIMITS: StoryContent = {
  meta: {
    title: "Limits: what our product data audit cannot claim",
    description:
      "No uplift figure, a ranking stable only at the top, and no customers to name. The limits of the measurement, written down so you can weigh them before a pilot.",
  },
  eyebrow: "What we cannot claim yet",
  title: "The four things we would rather you heard from us.",
  lede: "We are early. These are the limits of the measurement and the gaps in our evidence, written down so you can weigh them before a pilot rather than discover them during one.",

  visualHeading: "How stable the ranking really is.",
  visualBody:
    "Twelve runs across every seed and weighting we tested. Only the first position held.",

  chainBlock: {
    eyebrow: "What we will not do",
    heading: "The number we could put here, and why it is blank.",
    body: "Every vendor in this category leads with an uplift figure. Here is the arithmetic behind ours being absent.",
  },

  scenes: {
    situation: {
      kind: "facts",
      facts: [
        {
          value: "12/12",
          label: "Runs agreeing on the top repair",
          note: "across every seed and weighting we tested",
          tone: "good",
        },
        {
          value: "0",
          label: "Live tests on merchant traffic",
          note: "so there is no conversion figure, here or anywhere",
          tone: "warn",
        },
        {
          value: "0",
          label: "Customers we can name",
          note: "when that changes we will say so, with permission",
          tone: "hold",
        },
      ],
      note: "The first number is why the measurement is worth buying. The second and third are why this page exists.",
    },

    hero: {
      kind: "asks",
      eyebrow: "Four questions a buyer should ask us",
      rows: [
        {
          label: "Can you rank what to fix first",
          eg: "measured, on your own catalogue",
          ok: true,
        },
        { label: "Can you prove the repair landed", eg: "recomputed, no traffic needed", ok: true },
        {
          label: "Can you quote a conversion lift",
          eg: "needs a live test on your traffic",
          ok: false,
        },
        { label: "Can you name a customer", eg: "not yet, and we will not invent one", ok: false },
      ],
      okLabel: "Yes",
      noLabel: "Not yet",
      note: "of the four are a no. They are on this page rather than in a procurement call because you would find out either way.",
    },
    chain: {
      kind: "grid",
      total: 216,
      lit: 94,
      label: "The shelf we measured, before the repair",
      litLabel: "Still indistinguishable to a shopper",
      restLabel: "Separable on recorded fields",
      tone: "warn",
    },
  },

  situation: {
    heading: "Most vendors put this conversation off until procurement forces it.",
    body: [
      "You will find these things eventually. A technical reviewer will ask how stable the ranking is, procurement will ask for the customer reference, and somebody will ask what happened when the method did not work. Those answers exist whether or not we publish them.",
      "Discovering them at that stage is expensive for both of us: it stalls a deal that was going well and it makes everything else we said look like it was chosen carefully. Publishing them costs us some early conversations with people who need a safer vendor, which is the correct outcome for both parties.",
      "So this is the whole list, taken from our own research log rather than rewritten for the website. It includes the run that failed and the reason it failed.",
    ],
    pull: "Anyone quoting you a conversion number before running a test on your traffic is quoting someone else's store.",
  },

  steps: {
    heading: "What we have and have not established",
    items: [
      {
        n: "01",
        meta: "Established",
        title: "The measurement holds at the top",
        body: "Screen size came first in 12 of 12 runs across every seed, weighting and imputation scope we tested. The top of the ranking is the part we stand behind.",
      },
      {
        n: "02",
        meta: "Not established",
        title: "Positions two to four",
        body: "They moved between runs. We publish the full ranking because it is informative, and we say plainly that only the first position is stable.",
      },
      {
        n: "03",
        meta: "Not attempted",
        title: "Any effect on revenue",
        body: "We have run no live experiment on merchant traffic. There is no number, and we will not produce one from a model.",
      },
    ],
  },

  gets: {
    heading: "The four limits, in full",
    items: [
      {
        icon: FlaskConical,
        title: "We have no uplift figure",
        body: "No live test has been run on merchant traffic, so we have no conversion or revenue result. What we will do is show you the experiment design, with a held-back control group and a stopping rule fixed in advance, and report the outcome including when it is inconclusive.",
      },
      {
        icon: AlertTriangle,
        title: "Only the top of the ranking is stable",
        body: "Across 12 runs the first position never moved. Positions two to four did. If your plan depends on the exact order of the second and third repair, that ordering is not something we can currently justify.",
      },
      {
        icon: Layers,
        title: "An unrepresentative attribute scores badly",
        body: "Our simulation of a complete catalogue can only use values the shelf already records. Where an attribute's recorded values are unrepresentative of its true range, the simulation is wrong in a way we can name but cannot yet correct. It needs a value distribution drawn from outside the catalogue being repaired.",
      },
      {
        icon: UserX,
        title: "We have no customers to name",
        body: "Not yet. When that changes we will say so with their permission, and not before. Every number on this site comes from catalogues we measured ourselves, and each one says which.",
      },
      {
        icon: ImageIcon,
        title: "We cannot yet read a fact that only exists in a photograph",
        body: "The audit recovers missing values from text you already own: titles, descriptions, supplier specifications. A fact that appears only in the product image, a dietary claim on a pack or a material visible in a photo, is one we can tell you is missing and cannot currently recover for you. Extracting structured attributes from product imagery is research we are doing, not a feature we ship, and this page will say so until that changes.",
      },
    ],
  },

  limits: {
    heading: "What that means for a decision",
    will: [
      "Make the audit a low-risk way to test the method on your own data",
      "Give you the experiment design for revenue, so you can run it yourself if you prefer",
      "Tell you when a result is inconclusive rather than rounding it into a claim",
      "Keep this page updated as the gaps close, including the ones that close badly",
    ],
    wont: [
      "Give you a reference customer, because we do not have one yet",
      "Defend positions two to four of the ranking as stable, because they are not",
      "Score an attribute reliably where its recorded values misrepresent its real range",
      "Convert decision information into money. That conversion needs a test on your traffic",
    ],
  },

  faq: [
    {
      q: "Why publish this at all?",
      a: "Because you would find it anyway, in a pilot or a procurement review, and finding it there costs both of us more. It also means everything else we say can be taken at face value, which is worth more to us than the conversations this page costs.",
    },
    {
      q: "Is it safe to buy from a company with no customers?",
      a: "For the audit, the risk is a few minutes and nothing else, because it is free, and you keep the finding whether or not you work with us again. For the runtime it is a fair reason to insist on a pilot with a control group, which is how we would want to sell it anyway.",
    },
    {
      q: "What would change your mind about the method?",
      a: "A category where the top-ranked repair is populated and readiness does not move. That is the falsifiable version of our claim, it is cheap to test, and verification exists partly so it can be tested.",
    },
    {
      q: "Has the method ever failed?",
      a: "Yes. Our first spike failed its own pre-registered criteria, the second passed for the wrong reason, and the third held after a correction. All three are in the repository. A company that only publishes what worked is telling you less than it appears to.",
    },
  ],

  cta: {
    title: "Read the limits, then test them on your own shelf.",
    body: "Your store's address is the cheapest way to find out whether any of this holds for your catalogue.",
    label: "Request a Decision Audit",
    href: "/contact",
    note: "If the audit finds nothing useful, we will tell you that on the call.",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const LIMITS_VI: StoryContent = {
  meta: {
    title: "Những gì chúng tôi chưa thể khẳng định",
    description:
      "Không con số tăng trưởng, thứ hạng chỉ ổn định ở đầu bảng, và chưa có khách hàng để nêu tên. Các giới hạn được viết ra để bạn cân nhắc trước.",
  },
  eyebrow: "Những gì chúng tôi chưa thể khẳng định",
  title: "Bốn điều chúng tôi muốn bạn nghe từ chính chúng tôi.",
  lede: "Chúng tôi còn sớm. Đây là các giới hạn của phép đo và những khoảng trống trong bằng chứng của chúng tôi, viết ra để bạn cân nhắc trước một chương trình thử nghiệm thay vì phát hiện ra giữa chừng.",

  visualHeading: "Thứ hạng thực sự ổn định tới đâu.",
  visualBody:
    "Mười hai lần chạy qua mọi seed và mọi cách đặt trọng số chúng tôi thử. Chỉ vị trí đầu tiên là giữ nguyên.",

  chainBlock: {
    eyebrow: "Điều chúng tôi sẽ không làm",
    heading: "Con số lẽ ra đặt ở đây, và vì sao nó để trống.",
    body: "Mọi nhà cung cấp trong ngành này đều mở đầu bằng một con số tăng trưởng. Đây là phép tính đằng sau việc con số của chúng tôi vắng mặt.",
  },

  scenes: {
    situation: {
      kind: "facts",
      facts: [
        {
          value: "12/12",
          label: "Lần chạy thống nhất về hạng mục sửa đầu bảng",
          note: "trên mọi seed và cách trọng số chúng tôi đã thử",
          tone: "good",
        },
        {
          value: "0",
          label: "Thử nghiệm thật trên lưu lượng của nhà bán",
          note: "nên không có con số chuyển đổi, ở đây hay bất cứ đâu",
          tone: "warn",
        },
        {
          value: "0",
          label: "Khách hàng chúng tôi nêu được tên",
          note: "khi điều đó thay đổi, chúng tôi sẽ nói, kèm sự cho phép",
          tone: "hold",
        },
      ],
      note: "Con số đầu là lý do phép đo này đáng mua. Con số thứ hai và thứ ba là lý do trang này tồn tại.",
    },

    hero: {
      kind: "asks",
      eyebrow: "Bốn câu người mua nên hỏi chúng tôi",
      rows: [
        {
          label: "Xếp hạng được nên sửa gì trước không",
          eg: "đo thật, trên chính danh mục của bạn",
          ok: true,
        },
        {
          label: "Chứng minh được việc sửa có kết quả không",
          eg: "đo lại, không cần lưu lượng",
          ok: true,
        },
        {
          label: "Nêu được mức tăng chuyển đổi không",
          eg: "cần một thử nghiệm thật trên lưu lượng của bạn",
          ok: false,
        },
        {
          label: "Nêu được tên khách hàng không",
          eg: "chưa, và chúng tôi sẽ không bịa ra",
          ok: false,
        },
      ],
      okLabel: "Được",
      noLabel: "Chưa",
      note: "trong bốn câu là không. Chúng nằm trên trang này thay vì trong một buổi thẩm định, vì đằng nào bạn cũng sẽ biết.",
    },
    chain: {
      kind: "grid",
      total: 216,
      lit: 94,
      label: "Kệ hàng chúng tôi đã đo, trước khi sửa",
      litLabel: "Người mua vẫn không phân biệt nổi",
      restLabel: "Tách được bằng trường đã ghi",
      tone: "warn",
    },
  },

  situation: {
    heading:
      "Phần lớn nhà cung cấp hoãn cuộc trò chuyện này cho tới khi khâu mua sắm buộc phải nói.",
    body: [
      "Rồi bạn cũng sẽ tìm ra những điều này. Một người rà soát kỹ thuật sẽ hỏi thứ hạng ổn định tới đâu, bộ phận mua sắm sẽ hỏi khách hàng tham chiếu, và ai đó sẽ hỏi chuyện gì xảy ra khi phương pháp không chạy. Những câu trả lời đó tồn tại dù chúng tôi có công bố hay không.",
      "Phát hiện ra chúng ở giai đoạn ấy thì tốn kém cho cả hai phía: nó làm đình trệ một thương vụ đang tiến triển tốt và khiến mọi điều khác chúng tôi nói trông như đã được chọn lọc kỹ. Công bố chúng khiến chúng tôi mất vài cuộc trò chuyện sớm với những người cần một nhà cung cấp an toàn hơn, và đó là kết cục đúng cho cả đôi bên.",
      "Nên đây là toàn bộ danh sách, lấy từ chính nhật ký nghiên cứu của chúng tôi chứ không phải viết lại cho website. Nó gồm cả lần chạy thất bại và lý do nó thất bại.",
    ],
    pull: "Bất kỳ ai đưa bạn một con số chuyển đổi trước khi chạy thử nghiệm trên lưu lượng của bạn đều đang trích dẫn cửa hàng của người khác.",
  },

  steps: {
    heading: "Những gì chúng tôi đã và chưa xác lập được",
    items: [
      {
        n: "01",
        meta: "Đã xác lập",
        title: "Phép đo vững ở đầu bảng",
        body: "Kích thước màn hình về nhất ở 12 trên 12 lần chạy, qua mọi seed, mọi cách đặt trọng số và mọi phạm vi ước lượng chúng tôi thử. Phần đầu bảng xếp hạng là phần chúng tôi bảo vệ được.",
      },
      {
        n: "02",
        meta: "Chưa xác lập",
        title: "Các vị trí từ hai đến bốn",
        body: "Chúng xê dịch giữa các lần chạy. Chúng tôi vẫn công bố toàn bộ thứ hạng vì nó có ích, và nói thẳng rằng chỉ vị trí đầu tiên là ổn định.",
      },
      {
        n: "03",
        meta: "Chưa thử",
        title: "Bất kỳ tác động nào lên doanh thu",
        body: "Chúng tôi chưa chạy thử nghiệm trực tiếp nào trên lưu lượng của nhà bán. Không có con số nào, và chúng tôi sẽ không dựng ra một con số từ mô hình.",
      },
    ],
  },

  gets: {
    heading: "Bốn giới hạn, đầy đủ",
    items: [
      {
        icon: FlaskConical,
        title: "Chúng tôi không có con số tăng trưởng",
        body: "Chưa có thử nghiệm trực tiếp nào chạy trên lưu lượng của nhà bán, nên chúng tôi không có kết quả về chuyển đổi hay doanh thu. Điều chúng tôi sẽ làm là cho bạn xem thiết kế thử nghiệm, với nhóm đối chứng được giữ lại và quy tắc dừng cố định từ trước, rồi báo cáo kết quả kể cả khi nó không kết luận được.",
      },
      {
        icon: AlertTriangle,
        title: "Chỉ phần đầu bảng xếp hạng là ổn định",
        body: "Qua 12 lần chạy, vị trí đầu tiên không hề đổi. Các vị trí từ hai đến bốn thì có. Nếu kế hoạch của bạn phụ thuộc vào thứ tự chính xác của hạng mục sửa thứ hai và thứ ba, chúng tôi hiện chưa biện minh được cho thứ tự đó.",
      },
      {
        icon: Layers,
        title: "Một thuộc tính không đại diện sẽ bị chấm sai",
        body: "Phần mô phỏng một danh mục hoàn chỉnh chỉ dùng được những giá trị mà kệ hàng đã ghi. Ở nơi các giá trị đã ghi của một thuộc tính không đại diện cho dải giá trị thật của nó, phần mô phỏng sai theo một cách mà chúng tôi gọi tên được nhưng chưa sửa được. Nó cần một phân phối giá trị lấy từ bên ngoài danh mục đang được sửa.",
      },
      {
        icon: UserX,
        title: "Chúng tôi chưa có khách hàng nào để nêu tên",
        body: "Chưa. Khi điều đó thay đổi, chúng tôi sẽ nói, với sự cho phép của họ, và không sớm hơn. Mọi con số trên trang này đến từ những danh mục chính chúng tôi đã đo, và mỗi con số đều ghi rõ là danh mục nào.",
      },
      {
        icon: ImageIcon,
        title: "Chúng tôi chưa đọc được dữ kiện chỉ nằm trong ảnh",
        body: "Bản kiểm tra lấy lại giá trị còn thiếu từ văn bản bạn vốn đã có: tiêu đề, mô tả, thông số nhà cung cấp. Một dữ kiện chỉ xuất hiện trong ảnh sản phẩm, như công bố dinh dưỡng in trên bao bì hay chất liệu nhìn thấy trong ảnh, là thứ chúng tôi chỉ ra được là đang thiếu nhưng hiện chưa lấy lại giúp bạn được. Trích xuất thuộc tính có cấu trúc từ ảnh sản phẩm là nghiên cứu chúng tôi đang làm, không phải tính năng đang bán, và trang này sẽ nói đúng như vậy cho tới khi điều đó thay đổi.",
      },
    ],
  },

  limits: {
    heading: "Điều đó có nghĩa gì với một quyết định",
    will: [
      "Khiến bản kiểm tra thành cách rủi ro thấp để thử phương pháp trên dữ liệu của chính bạn",
      "Đưa bạn thiết kế thử nghiệm về doanh thu, để bạn tự chạy nếu muốn",
      "Nói rõ khi một kết quả không kết luận được, thay vì làm tròn nó thành một khẳng định",
      "Cập nhật trang này khi các khoảng trống khép lại, kể cả những khoảng trống khép lại theo hướng xấu",
    ],
    wont: [
      "Cho bạn một khách hàng tham chiếu, vì chúng tôi chưa có",
      "Bảo vệ các vị trí từ hai đến bốn của bảng xếp hạng là ổn định, vì chúng không ổn định",
      "Chấm điểm đáng tin cho một thuộc tính mà các giá trị đã ghi xuyên tạc dải giá trị thật của nó",
      "Quy đổi thông tin quyết định thành tiền. Phép quy đổi đó cần một thử nghiệm trên lưu lượng của bạn",
    ],
  },

  faq: [
    {
      q: "Vì sao lại công bố những điều này?",
      a: "Vì rồi bạn cũng tìm ra, trong một chương trình thử nghiệm hay một đợt rà soát mua sắm, và phát hiện ở đó thì tốn kém hơn cho cả hai. Nó cũng có nghĩa là mọi điều khác chúng tôi nói đều có thể tin ở mặt chữ, và điều ấy đáng giá với chúng tôi hơn những cuộc trò chuyện mà trang này làm mất.",
    },
    {
      q: "Mua hàng của một công ty chưa có khách hàng nào thì có an toàn không?",
      a: "Với bản kiểm tra, rủi ro chỉ là vài phút, vì bản kiểm tra miễn phí, còn kết quả tìm được thì bạn giữ, dù có làm việc tiếp với chúng tôi hay không. Với bộ máy thời gian thực, đó là lý do chính đáng để bạn đòi một chương trình thử nghiệm có nhóm đối chứng, vốn cũng là cách chúng tôi muốn bán nó.",
    },
    {
      q: "Điều gì sẽ khiến các bạn đổi ý về phương pháp này?",
      a: "Một ngành hàng mà hạng mục sửa đứng đầu đã được điền xong mà mức sẵn sàng không nhúc nhích. Đó là phiên bản bác bỏ được của khẳng định mà chúng tôi đưa ra, nó rẻ để kiểm chứng, và việc xác minh tồn tại một phần chính là để kiểm chứng điều đó.",
    },
    {
      q: "Phương pháp này đã bao giờ thất bại chưa?",
      a: "Rồi. Lần thử nghiệm đầu tiên của chúng tôi trượt chính các tiêu chí đã đăng ký trước, lần thứ hai đạt nhưng vì lý do sai, và lần thứ ba trụ được sau một hiệu chỉnh. Cả ba đều nằm trong kho mã. Một công ty chỉ công bố những gì thành công đang nói với bạn ít hơn vẻ bề ngoài của nó.",
    },
  ],

  cta: {
    title: "Đọc các giới hạn, rồi kiểm chứng chúng trên chính kệ hàng của bạn.",
    body: "Địa chỉ cửa hàng của bạn là cách rẻ nhất để biết liệu có điều nào ở đây đúng với danh mục của bạn hay không.",
    label: "Yêu cầu Decision Audit",
    href: "/contact",
    note: "Nếu bản kiểm tra không tìm ra điều gì hữu ích, chúng tôi sẽ nói vậy ngay trong cuộc gọi.",
  },
};

export const limits = (l: string) => byLocale({ en: LIMITS, vi: LIMITS_VI }, l);
