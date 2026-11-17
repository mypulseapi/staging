import { byLocale } from "@/content/locale";
import {
  Images,
  Split,
  CameraOff,
  ListChecks,
  FlaskConical,
} from "lucide-react";
import type { ChapterContent } from "@/components/designed/product/chapters";

/**
 * Visual Evidence, early access. Grounded in what rainbow ships (ODIN/research/VISION-MODEL.md § 6a):
 * the requirement library with a "can a photo show it" column, photo observations in the Decision
 * Audit (`visual` on `POST /catalog/audit`), and a benchmark on public data.
 *
 * **What this page may not say** (ODIN/hires/07-WHAT-WE-DO-NOT-CLAIM.md): any conversion, revenue or
 * return figure, or that it has run on a merchant. The one figure it shows is the benchmark's
 * abstention rate, labelled as public data, two models, not human-checked. No competitor named.
 */
export const VISUAL_EVIDENCE: ChapterContent = {
  meta: {
    title: "Visual Evidence: which product photo proves the fact",
    description:
      "Checks product photos against what buyers need to know: facts a photo shows that your data lacks, photos that contradict it, and the photo to add. Early access.",
  },
  eyebrow: "Visual Evidence · Early access",
  title: "Know which photos prove what buyers need.",
  lede: "Visual Evidence checks product photos against buying requirements, revealing what they prove, what contradicts your data, and what they can't show—so you know which photo to add before updating product fields.",

  // The hero picture (owner's generated set, 4 Nov 2026), on the CDN like the other product heroes.
  heroImage: {
    src: "product/visual-evidence-hero-photos-against-requirements.webp",
    width: 1400,
    height: 700,
    alt: "A laptop's photo gallery, one side photo under a magnifying glass, joined to a card of buying requirements: ports shown in the photo, colour contradicting the data, the port side needing a photo, and battery life, which no photo can show.",
  },

  situation: {
    heading: "A complete gallery can still leave the question open.",
    body: [
      "A laptop shot from every angle can still never show the port side. A sofa photographed perfectly can still leave a buyer unsure it fits through the door. A gallery checklist counts photos; it does not ask whether any photo answers the question the buyer is stuck on.",
      "And some facts no photo can carry, battery life or a weight. Asking an AI to read them off a picture is how a storefront ends up confidently wrong.",
    ],
    pull: "The right answer is sometimes: no photo can show this. Record it instead.",
  },

  steps: {
    heading: "How does Visual Evidence work?",
    intro:
      "The same product pages as the Decision Audit, with the photos they show. Nothing goes on your site.",
    items: [
      {
        n: "01",
        meta: "You",
        title: "Paste your store's address",
        body: "One category's product pages, with the photos you already publish. No customer data.",
      },
      {
        n: "02",
        meta: "Us",
        title: "We check each photo against the buying requirements",
        body: "For each requirement in the category, which facts it needs and whether a photo can show each one: ports yes, soldered memory no, battery life never. A vision model reads what each photo shows; our requirement engine, not the model, decides what it means.",
      },
      {
        n: "03",
        meta: "Both",
        title: "You get the photo and data repairs, ranked",
        body: "The facts a photo shows but your data lacks, the photos that contradict your data, and the photo to add for a fact that matters, alongside the Decision Audit's field repairs.",
      },
    ],
  },

  gets: {
    heading: "What you get",
    items: [
      {
        icon: Images,
        title: "Facts your photos show but your data lacks",
        body: "A port, a colour, a dimension diagram already in your gallery and missing from the field a filter or an AI assistant reads. Lift it into the data.",
      },
      {
        icon: Split,
        title: "Photos that contradict your data",
        body: "The spec says two HDMI ports and the photo shows one; the colour field says navy and the photo is green. A buyer who trusts the photo returns the product.",
      },
      {
        icon: CameraOff,
        title: "The photo to add, where it decides",
        body: "Add a photo of the port side for these laptops, because buyers choosing for two monitors depend on it. A photographer's job, not data entry.",
      },
      {
        icon: ListChecks,
        title: "What no photo can show",
        body: "Battery life, weight, memory that cannot be upgraded: marked as facts to record, never read off a picture.",
      },
      {
        icon: FlaskConical,
        title: "A model that says it cannot tell",
        body: "Every model is scored on our benchmark before it reads your photos, and a correct cannot tell scores higher than a lucky guess.",
      },
    ],
  },

  limits: {
    heading: "What Visual Evidence will and will not do",
    will: [
      "Say which photos show, contradict or cannot show each fact your buyers need",
      "Recommend the photo to add, ranked with your data repairs",
      "Say cannot tell when no photo can show a fact, rather than guess",
      "Show you the benchmark a model passed before it reads your photos",
    ],
    wont: [
      "Promise more sales or fewer returns. It has not run on a merchant's catalogue yet, so there is no measured result to quote",
      "Invent a fact from a photo. A value no photo can show is reported as missing, not estimated",
      "Generate or edit images. It tells you which photo matters; your team or studio takes it",
      "Replace the Decision Audit. It adds photos as evidence to the same measurement",
    ],
  },

  faq: [
    {
      q: "Is it available now?",
      a: "Early access. It is offered first inside a Decision Audit pilot, on one category. It is built and benchmarked on public product data, and has not yet run on a merchant's own catalogue.",
    },
    {
      q: "How do you know the model does not make things up?",
      a: "Each model is tested first on a benchmark of product questions, including ones no photo can answer. In our first run on public product data, two models answered cannot tell 98% of the time when no photo could show the fact. That is public data and two models, not your catalogue and not a promise.",
    },
    {
      q: "How is this different from checking a gallery against image requirements?",
      a: "A gallery check asks whether you have the required number and type of photos. Visual Evidence asks whether any photo proves what a buyer needs to establish, and whether it agrees with your data.",
    },
    {
      q: "Do you create the missing photos?",
      a: "No. We tell you which photo to add and why. Your team or your studio takes it, and the next audit confirms it shows what it should.",
    },
    {
      q: "What data do you need?",
      a: "Your store's address and one category. We read the photos your product pages already publish. No customer data and no access to your systems.",
    },
  ],

  cta: {
    title: "Start with one category and its photos.",
    body: "Ask for Visual Evidence with a Decision Audit pilot.",
    label: "Request early access",
    href: "/contact",
    note: "Early access, priced in the pilot.",
  },
};

/** Vietnamese. See `content/locale.ts` for the provenance caveat. */
export const VISUAL_EVIDENCE_VI: ChapterContent = {
  meta: {
    title: "Visual Evidence: ảnh nào chứng minh thông tin",
    description:
      "Kiểm tra ảnh sản phẩm theo những gì người mua cần biết: thông tin ảnh cho thấy nhưng dữ liệu thiếu, ảnh mâu thuẫn với dữ liệu, và ảnh cần thêm. Truy cập sớm.",
  },
  eyebrow: "Visual Evidence · Truy cập sớm",
  title: "Biết ảnh nào chứng minh điều người mua cần biết.",
  lede: "Visual Evidence đối chiếu ảnh sản phẩm với yêu cầu mua hàng, xác định thông tin được chứng minh, mâu thuẫn hoặc không thể hiện qua ảnh, đồng thời gợi ý ảnh cần bổ sung và dữ liệu cần cập nhật theo thứ tự ưu tiên.",

  // The hero picture (owner's generated set, 4 Nov 2026), on the CDN like the other product heroes.
  heroImage: {
    src: "product/visual-evidence-hero-photos-against-requirements.webp",
    width: 1400,
    height: 700,
    alt: "Bộ ảnh của một chiếc laptop, một ảnh cạnh bên dưới kính lúp, nối với thẻ yêu cầu mua hàng: cổng kết nối có trong ảnh, màu mâu thuẫn với dữ liệu, mặt cổng cần thêm ảnh, và thời lượng pin, điều không ảnh nào cho thấy.",
  },

  situation: {
    heading: "Một bộ ảnh đầy đủ vẫn có thể để câu hỏi bỏ ngỏ.",
    body: [
      "Một máy tính xách tay chụp đủ mọi góc vẫn có thể không bao giờ cho thấy mặt cổng kết nối. Một bộ sofa chụp hoàn hảo vẫn khiến người mua không chắc có lọt qua cửa không. Danh sách kiểm tra bộ ảnh chỉ đếm số ảnh, không hỏi ảnh nào trả lời câu hỏi người mua đang vướng.",
      "Và có những thông tin không ảnh nào thể hiện được, như thời lượng pin hay cân nặng. Bắt AI đọc chúng từ ảnh là cách một cửa hàng tự tin nói sai.",
    ],
    pull: "Đôi khi câu trả lời đúng là: không ảnh nào cho thấy điều này. Hãy ghi nó vào dữ liệu.",
  },

  steps: {
    heading: "Visual Evidence hoạt động thế nào?",
    intro:
      "Cùng các trang sản phẩm như Decision Audit, kèm ảnh trên trang. Không cần gắn gì lên website.",
    items: [
      {
        n: "01",
        meta: "Bạn",
        title: "Dán địa chỉ website",
        body: "Các trang sản phẩm của một ngành hàng, kèm ảnh bạn đang đăng. Không cần dữ liệu khách hàng.",
      },
      {
        n: "02",
        meta: "Chúng tôi",
        title: "Kiểm tra từng ảnh theo yêu cầu mua hàng",
        body: "Với mỗi yêu cầu trong ngành hàng, cần những thông tin nào và ảnh có thể cho thấy từng thông tin không: cổng kết nối có, RAM hàn chết không, thời lượng pin không bao giờ. Mô hình thị giác đọc ảnh cho thấy gì; bộ máy yêu cầu của chúng tôi, không phải mô hình, quyết định ý nghĩa.",
      },
      {
        n: "03",
        meta: "Cả hai",
        title: "Bạn nhận các việc sửa ảnh và dữ liệu, đã xếp hạng",
        body: "Thông tin ảnh cho thấy nhưng dữ liệu thiếu, ảnh mâu thuẫn với dữ liệu, và ảnh cần thêm cho thông tin quan trọng, cùng với các việc sửa trường của Decision Audit.",
      },
    ],
  },

  gets: {
    heading: "Bạn nhận được gì",
    items: [
      {
        icon: Images,
        title: "Thông tin ảnh cho thấy nhưng dữ liệu thiếu",
        body: "Một cổng kết nối, một màu, một sơ đồ kích thước đã có trong bộ ảnh nhưng thiếu ở trường mà bộ lọc hay trợ lý AI đọc. Hãy đưa nó vào dữ liệu.",
      },
      {
        icon: Split,
        title: "Ảnh mâu thuẫn với dữ liệu",
        body: "Thông số ghi hai cổng HDMI mà ảnh chỉ có một; trường màu ghi xanh navy mà ảnh là xanh lá. Người mua tin ảnh sẽ trả hàng.",
      },
      {
        icon: CameraOff,
        title: "Ảnh cần thêm, ở nơi quyết định",
        body: "Thêm ảnh mặt cổng kết nối cho những máy này, vì người mua cần xuất ra hai màn hình dựa vào nó. Việc của thợ chụp ảnh, không phải nhập liệu.",
      },
      {
        icon: ListChecks,
        title: "Điều không ảnh nào cho thấy",
        body: "Thời lượng pin, cân nặng, RAM không nâng cấp được: được đánh dấu là thông tin cần ghi, không bao giờ đọc từ ảnh.",
      },
      {
        icon: FlaskConical,
        title: "Mô hình biết nói không xác định được",
        body: "Mỗi mô hình được chấm trên bộ kiểm thử của chúng tôi trước khi đọc ảnh của bạn, và một câu không xác định được đúng chỗ được điểm cao hơn một lần đoán trúng.",
      },
    ],
  },

  limits: {
    heading: "Visual Evidence sẽ làm và sẽ không làm gì",
    will: [
      "Cho biết ảnh nào cho thấy, mâu thuẫn hay không thể cho thấy từng thông tin người mua cần",
      "Đề xuất ảnh cần thêm, xếp hạng cùng các việc sửa dữ liệu",
      "Nói không xác định được khi không ảnh nào cho thấy, thay vì đoán",
      "Cho bạn xem bộ kiểm thử mà mô hình đã vượt qua trước khi đọc ảnh của bạn",
    ],
    wont: [
      "Hứa tăng doanh số hay giảm hàng trả. Nó chưa chạy trên danh mục của người bán nào, nên chưa có kết quả đo được để nêu",
      "Bịa thông tin từ ảnh. Giá trị không ảnh nào cho thấy được báo là thiếu, không ước đoán",
      "Tạo hay chỉnh sửa ảnh. Nó cho biết ảnh nào quan trọng; đội của bạn hoặc studio sẽ chụp",
      "Thay thế Decision Audit. Nó thêm ảnh làm bằng chứng cho cùng một phép đo",
    ],
  },

  faq: [
    {
      q: "Đã dùng được chưa?",
      a: "Truy cập sớm. Được cung cấp trước trong một đợt thí điểm Decision Audit, trên một ngành hàng. Sản phẩm đã được xây dựng và kiểm thử trên dữ liệu sản phẩm công khai, chưa chạy trên danh mục riêng của người bán.",
    },
    {
      q: "Làm sao biết mô hình không bịa?",
      a: "Mỗi mô hình được kiểm tra trước trên một bộ câu hỏi về sản phẩm, gồm cả những câu không ảnh nào trả lời được. Trong lần chạy đầu trên dữ liệu công khai, hai mô hình trả lời không xác định được 98% số lần khi không ảnh nào cho thấy thông tin. Đó là dữ liệu công khai và hai mô hình, không phải danh mục của bạn và không phải lời hứa.",
    },
    {
      q: "Khác gì so với kiểm tra bộ ảnh theo yêu cầu hình ảnh?",
      a: "Kiểm tra bộ ảnh hỏi bạn có đủ số lượng và loại ảnh yêu cầu không. Visual Evidence hỏi có ảnh nào chứng minh điều người mua cần biết không, và ảnh có khớp với dữ liệu không.",
    },
    {
      q: "Các bạn có tạo ảnh còn thiếu không?",
      a: "Không. Chúng tôi cho biết nên thêm ảnh nào và vì sao. Đội của bạn hoặc studio sẽ chụp, và lần kiểm tra sau xác nhận ảnh cho thấy đúng điều cần.",
    },
    {
      q: "Các bạn cần dữ liệu gì?",
      a: "Địa chỉ website và một ngành hàng. Chúng tôi đọc ảnh đang đăng trên các trang sản phẩm, không cần dữ liệu khách hàng hay quyền truy cập hệ thống.",
    },
  ],

  cta: {
    title: "Bắt đầu với một ngành hàng và ảnh của nó.",
    body: "Yêu cầu Visual Evidence cùng một đợt thí điểm Decision Audit.",
    label: "Yêu cầu truy cập sớm",
    href: "/contact",
    note: "Truy cập sớm, định giá trong đợt thí điểm.",
  },
};

export const visualEvidence = (locale: string) =>
  byLocale({ en: VISUAL_EVIDENCE, vi: VISUAL_EVIDENCE_VI }, locale);

/** The situation, step and gain pictures' alt text, in the order `product-pictures.tsx` lists them. */
export const visualEvidencePictureAlt = (l: string) =>
  byLocale(
    {
      en: {
        situation:
          "A complete gallery of laptop photos marked gallery complete, beside a shopper with a question: the port side is still a question mark, and battery life is marked as something no photo can show.",
        steps: [
          "A spreadsheet of products, categories and image links sliding into an upload tray, with a badge saying no customer data.",
          "A laptop's side photo under a scanning frame, passed to the requirement engine, which marks ports as shown in a photo, soldered memory as no photo, and battery life as never.",
          "A ranked list of repairs: first add a photo of the port side, then record the ports, then reconcile the colour, linked to the photos and the data they change.",
        ],
        gains: [
          "The ports in a laptop's side photo lifted into the data, where the ports row is now checked while soldered memory and battery life stay empty.",
          "A data card saying colour navy and two HDMI ports, contradicted by a photo of a green laptop with one HDMI port, beside a returned parcel.",
          "A laptop gallery with an empty slot for a photo of the port side, linked to a desk where the laptop drives two monitors.",
          "Battery life, weight and upgradeable memory, each marked as something no photo can show, all leading to one place: record it.",
          "An AI chip saying cannot tell, beside a benchmark scorecard where cannot tell scores higher than a lucky guess.",
        ],
      },
      vi: {
        situation:
          "Bộ ảnh laptop đầy đủ được đánh dấu là hoàn chỉnh, bên cạnh một người mua đang thắc mắc: mặt cổng vẫn là dấu hỏi, còn thời lượng pin được đánh dấu là điều không ảnh nào cho thấy.",
        steps: [
          "Một bảng tính gồm sản phẩm, ngành hàng và đường dẫn ảnh đi vào khay tải lên, kèm nhãn không có dữ liệu khách hàng.",
          "Ảnh cạnh bên của laptop trong khung quét, chuyển tới bộ máy yêu cầu, nơi cổng kết nối được đánh dấu là có trong ảnh, bộ nhớ hàn chết là không có ảnh, và thời lượng pin là không bao giờ.",
          "Danh sách việc sửa đã xếp hạng: trước tiên thêm ảnh mặt cổng, rồi ghi cổng kết nối vào dữ liệu, rồi đối chiếu màu, nối với ảnh và dữ liệu mà chúng thay đổi.",
        ],
        gains: [
          "Cổng kết nối trong ảnh cạnh bên của laptop được đưa vào dữ liệu: dòng cổng kết nối đã được đánh dấu, còn bộ nhớ hàn chết và thời lượng pin vẫn để trống.",
          "Thẻ dữ liệu ghi màu xanh navy và hai cổng HDMI, mâu thuẫn với ảnh một chiếc laptop màu xanh lá có một cổng HDMI, bên cạnh một kiện hàng bị trả.",
          "Bộ ảnh laptop có một ô trống cho ảnh mặt cổng, nối với một bàn làm việc nơi laptop nối với hai màn hình.",
          "Thời lượng pin, trọng lượng và bộ nhớ nâng cấp được, mỗi thứ được đánh dấu là điều không ảnh nào cho thấy, cùng dẫn về một chỗ: ghi vào dữ liệu.",
          "Một con chip AI nói không xác định được, bên cạnh bảng điểm kiểm thử nơi không xác định được đạt điểm cao hơn một lần đoán may.",
        ],
      },
    },
    l,
  );
