import { byLocale } from "./locale";
import {
  ShoppingCart,
  ShoppingBasket,
  Cpu,
  Sofa,
  Sparkles,
  Boxes,
  type LucideIcon,
} from "lucide-react";

/**
 * Sector pages, rewritten against what this product actually is.
 *
 * The previous set was ten sectors inherited from the "personalization for
 * everything" positioning: social networking, blogs, streaming, news media and
 * edtech alongside the commerce ones. None of those five has a product
 * catalogue, and a Decision Audit measures product data. The copy showed it,
 * promising feed personalization, lookalike audiences, vouchers and native
 * Shopify and Magento SDKs, none of which we build.
 *
 * So the set is six, and every one of them is somewhere a catalogue exists and
 * a buyer makes a comparison against recorded attributes. The retired slugs
 * redirect to /industries rather than 404, since they were in the sitemap.
 *
 * Each sector carries its own `attributes`, which drive the page's figure. They
 * are illustrative of the shape of that sector's catalogue, and the page says
 * so: the only measured numbers on this site come from the laptop shelf, and
 * they live on /why/method where they can be reproduced.
 */
export interface SectorAttribute {
  /** The attribute name a buyer in this sector filters on. */
  label: string;
  /** Share of the shelf that records it, as an illustration of the shape. */
  coverage: number;
  /**
   * A mark for the attribute, as a CDN path under `icons/`.
   *
   * Optional, because not every sector has one drawn yet and a row without a mark should read as
   * a row, not as a gap. Drawn as black line art on transparent, so the page uses it as a mask
   * and fills it with `currentColor`: as an `<img>` it would stay black and disappear against
   * the dark theme.
   */
  icon?: string;
  /** Whether a decision in this sector commonly turns on it. */
  decisive: boolean;
}

/** A published, attributed figure. Never ours unless the source says so. */
export interface SectorFact {
  value: number;
  unit?: string;
  label: string;
  source: string;
}

export interface Sector {
  /**
   * The SERP title, compressed from `name` and `tagline`.
   *
   * `${name}: ${tagline}` runs to 128 characters in Vietnamese, and the tagline is an editorial
   * line rather than a title fragment: trimming it mid-clause reads worse than writing the short
   * form once. The page still shows the full tagline.
   */
  metaTitle?: string;
  slug: string;
  icon: LucideIcon;
  name: string;
  tagline: string;
  /** Card blurb on /industries. */
  summary: string;
  heroTitle: string;
  heroHighlight: string;
  heroLede: string;
  /** What a buyer in this sector is trying to decide. */
  decision: string;
  problems: string[];
  /** Where this sector's data usually already lives. */
  provenance: string;
  attributes: SectorAttribute[];
  /**
   * Hero illustration. Optional: a sector without one falls back to the
   * text-only hero rather than shipping a placeholder.
   *
   * `src` is a path under `public/`, so the CSP's `img-src 'self'` covers it.
   * Anything added here must also be uploaded to R2 (`pnpm deploy:r2`) or it
   * 404s wherever NEXT_PUBLIC_CDN_URL is set. See CLAUDE.md.
   */
  image?: { src: string; alt: string };
  /** Market context. Third-party research, cited, so the page carries weight. */
  facts: SectorFact[];
  metric: string;
}

const EN: Sector[] = [
  {
    slug: "ecommerce",
    icon: ShoppingCart,
    name: "Ecommerce and retail",
    tagline:
      "Deep shelves, and two products that differ on a field nobody recorded",
    metaTitle: "Ecommerce product data: attributes buyers choose on",
    summary:
      "A category with hundreds of near-identical products, where the fact that separates them was never a column.",
    heroTitle: "Your shelf has ninety products and",
    heroHighlight: "no way to choose between them",
    heroLede:
      "Retail catalogues grow by adding products, not by adding columns. Eventually a category holds enough near-identical items that a shopper cannot narrow it, and the field that would have narrowed it is the one nobody was asked to fill in.",
    image: {
      src: "industries/ecommerce.webp",
      alt: "A long grocery aisle of densely stocked shelves, where most of the packs look alike from a step back.",
    },
    decision: "Which of these ninety is the one for me?",
    problems: [
      "A category page where filtering removes almost nothing, because the useful filters do not exist",
      "Completeness reporting that is green while discovery plainly is not working",
      "Attribute schemas set years ago, before the range grew into them",
      "Enrichment quoted as a whole-catalogue project because nobody can say which fields come first",
    ],
    provenance:
      "Most of it is already in your product titles and descriptions. In a sample of 9 real laptop listings, every fact missing from the spec fields was in the title or description.",
    attributes: [
      { label: "Screen size", coverage: 63, decisive: true },
      {
        label: "Memory",
        coverage: 72,
        icon: "icons/product-attribute-memory-ram.webp",
        decisive: true,
      },
      {
        label: "Storage",
        coverage: 74,
        icon: "icons/product-attribute-storage.webp",
        decisive: true,
      },
      {
        label: "Processor",
        coverage: 25,
        icon: "icons/product-attribute-processor.webp",
        decisive: false,
      },
    ],
    facts: [
      {
        value: 6.88,
        unit: "T",
        label:
          "global retail ecommerce sales forecast for 2026, 21.1% of all retail",
        source: "industry forecast, 2026",
      },
      {
        value: 38,
        unit: "%",
        label:
          "of tested retailers offer no filter for information they already display",
        source: "Baymard Institute",
      },
      {
        value: 34,
        unit: "%",
        label:
          "of consumers frustrated by incomplete product information, up from 28%",
        source: "Akeneo PX Pulse 2025",
      },
    ],
    metric: "Ranked repair list in minutes",
  },
  {
    slug: "fmcg",
    icon: ShoppingBasket,
    name: "FMCG and consumer goods",
    tagline:
      "Hundreds of near-identical packs, separated by a fact on the label",
    metaTitle: "FMCG product data: the label facts that decide",
    summary:
      "Shelves where the pack looks the same and the decision turns on a claim, a size or an ingredient nobody put in a field.",
    heroTitle: "The pack looks the same. The",
    heroHighlight: "decision is on the label",
    heroLede:
      "Fast-moving goods are bought on small, specific facts: pack size, dietary claim, concentration, whether it suits a child. Those facts are printed on the packaging and photographed, which means a shopper can read them and your filters cannot.",
    decision: "Which of these is right for my household?",
    problems: [
      "Decisive facts that exist only inside the pack photograph",
      "Pack size and unit price recorded inconsistently across a range",
      "Dietary and allergen claims written into the description instead of a field",
      "Ranges that grow by variant, where every variant looks identical in a grid",
    ],
    provenance:
      "Usually the label and the supplier specification. Much of it is already written in your own descriptions and marketing copy, which is the cheapest place an audit finds it.",
    attributes: [
      { label: "Pack size", coverage: 58, decisive: true },
      { label: "Dietary claim", coverage: 31, decisive: true },
      { label: "Concentration", coverage: 22, decisive: true },
      { label: "Brand", coverage: 97, decisive: false },
    ],
    facts: [
      {
        value: 38,
        unit: "%",
        label:
          "of tested retailers offer no filter for information they already display",
        source: "Baymard Institute",
      },
      {
        value: 34,
        unit: "%",
        label:
          "of consumers frustrated by incomplete product information, up from 28%",
        source: "Akeneo PX Pulse 2025",
      },
      {
        value: 79,
        unit: "%",
        label: "of product pages ship no full set of structured data",
        source: "Adobe Analytics",
      },
    ],
    metric: "Ranked repair list in minutes",
  },
  {
    slug: "technology",
    icon: Cpu,
    name: "Technology and electronics",
    tagline:
      "The category we measured, and the one where specifications decide everything",
    metaTitle: "Electronics product data: specifications that decide",
    summary:
      "Deep specification-led shelves where two devices differ on one number, and that number is missing.",
    heroTitle: "Two devices, one number apart, and",
    heroHighlight: "the number is missing",
    heroLede:
      "Electronics is the clearest version of this problem and the category we measured first. Buyers narrow on screen size, memory, storage and processor, and a catalogue that records three of those four cannot separate a shelf that needs all four.",
    decision: "Which of these specifications actually fits what I need?",
    problems: [
      "Specifications in the title string rather than in a filterable field",
      "Generational naming that hides a real difference behind a model code",
      "Ranges where a single attribute separates most of the shelf and is recorded worst",
      "Comparison tables that cannot be built because the underlying fields are empty",
    ],
    provenance:
      "Mostly your own titles and descriptions. In a sample of 9 real laptop listings, every fact missing from the spec fields was in the title or description, with no new data purchased.",
    attributes: [
      { label: "Screen size", coverage: 63, decisive: true },
      {
        label: "Memory",
        coverage: 72,
        icon: "icons/product-attribute-memory-ram.webp",
        decisive: true,
      },
      {
        label: "Storage",
        coverage: 74,
        icon: "icons/product-attribute-storage.webp",
        decisive: true,
      },
      {
        label: "Processor",
        coverage: 25,
        icon: "icons/product-attribute-processor.webp",
        decisive: false,
      },
    ],
    facts: [
      {
        value: 38,
        unit: "%",
        label:
          "of tested retailers offer no filter for information they already display",
        source: "Baymard Institute",
      },
      {
        value: 79,
        unit: "%",
        label: "of product pages ship no full set of structured data",
        source: "Adobe Analytics",
      },
    ],
    metric: "The category behind our published method",
  },
  {
    slug: "furniture",
    icon: Sofa,
    name: "Furniture and homewares",
    tagline: "Bought on dimensions and materials, listed on photographs",
    metaTitle: "Furniture product data: dimensions buyers need",
    summary:
      "A category where the decision is whether it fits and what it is made of, and both are often absent.",
    heroTitle: "It looks right. Whether it",
    heroHighlight: "fits is a different question",
    heroLede:
      "Furniture sells on an image and is returned on a measurement. Depth, material, weight capacity and assembly are what decide the purchase and what drives the return, and they are the fields most often left to a paragraph of description.",
    decision: "Will it fit, and is it made of what I think it is?",
    problems: [
      "Dimensions written into descriptions rather than recorded as numbers",
      "Material and finish described in marketing language that cannot be filtered",
      "Returns driven by a fact the listing could have carried",
      "Ranges where assembled and packed dimensions are used interchangeably",
    ],
    provenance:
      "Usually the supplier specification sheet, plus your own descriptions. Dimensions in particular are rarely missing from the business, only from the field.",
    attributes: [
      { label: "Assembled depth", coverage: 44, decisive: true },
      { label: "Primary material", coverage: 52, decisive: true },
      { label: "Weight capacity", coverage: 18, decisive: true },
      { label: "Colour", coverage: 95, decisive: false },
    ],
    facts: [
      {
        value: 38,
        unit: "%",
        label:
          "of tested retailers offer no filter for information they already display",
        source: "Baymard Institute",
      },
      {
        value: 34,
        unit: "%",
        label:
          "of consumers frustrated by incomplete product information, up from 28%",
        source: "Akeneo PX Pulse 2025",
      },
    ],
    metric: "Ranked repair list in minutes",
  },
  {
    slug: "cosmetics",
    icon: Sparkles,
    name: "Cosmetics and personal care",
    tagline:
      "Chosen on skin type, ingredients and concerns that were never fields",
    metaTitle: "Cosmetics product data: skin type and suitability",
    summary:
      "A category bought on suitability, where the attributes that decide suitability live in the description.",
    heroTitle: "Suitability decides the sale, and",
    heroHighlight: "suitability is not a field",
    heroLede:
      "Personal care is bought against a specific need: a skin type, a concern, an ingredient to seek out or avoid. Those are exactly the attributes most catalogues hold as prose, which is why a shopper who knows precisely what they want still cannot narrow the shelf.",
    decision: "Is this suitable for my skin and what I am trying to fix?",
    problems: [
      "Skin type and concern held as marketing prose rather than structured values",
      "Ingredient information present but unsearchable, which matters for allergies",
      "Shade and finish ranges recorded inconsistently across brands",
      "Repeat purchases lost because the catalogue cannot answer a suitability question",
    ],
    provenance:
      "Ingredient lists and supplier data you already hold for compliance. The audit usually finds this is a structuring job rather than an acquisition one.",
    attributes: [
      {
        label: "Skin type",
        coverage: 29,
        icon: "icons/product-attribute-skin-type.webp",
        decisive: true,
      },
      {
        label: "Key ingredient",
        coverage: 41,
        icon: "icons/product-attribute-key-ingredients.webp",
        decisive: true,
      },
      {
        label: "Concern addressed",
        coverage: 24,
        icon: "icons/product-attribute-concern-addressed.webp",
        decisive: true,
      },
      {
        label: "Volume",
        coverage: 88,
        icon: "icons/product-attribute-volume.webp",
        decisive: false,
      },
    ],
    facts: [
      {
        value: 34,
        unit: "%",
        label:
          "of consumers frustrated by incomplete product information, up from 28%",
        source: "Akeneo PX Pulse 2025",
      },
      {
        value: 79,
        unit: "%",
        label: "of product pages ship no full set of structured data",
        source: "Adobe Analytics",
      },
    ],
    metric: "Ranked repair list in minutes",
  },
  {
    slug: "distribution",
    icon: Boxes,
    name: "B2B and industrial",
    tagline:
      "Specification-driven buying against catalogues built for order codes",
    metaTitle: "B2B product data: specs buyers search for",
    summary:
      "Your buyers choose on specification, and the catalogue was built to be ordered from rather than searched.",
    heroTitle: "Your buyers choose on spec. Your catalogue",
    heroHighlight: "was built for order codes",
    heroLede:
      "Industrial and trade catalogues were designed for someone who already knows the part number. The buyer who does not is filtering on thread size, voltage or tolerance, and those live in a PDF datasheet rather than in a field.",
    image: {
      src: "industries/distribution.webp",
      alt: "A warehouse worker beside a hand truck and stacked cartons, holding up two spec sheets with the key details ticked off.",
    },
    decision: "Which part meets the specification I have to hit?",
    problems: [
      "Specifications trapped in supplier PDFs and never mapped into the catalogue",
      "Search that works for a part number and fails for a requirement",
      "Hundreds of variants distinguished only by a suffix in the product code",
      "Sales time spent answering specification questions the catalogue should answer",
    ],
    provenance:
      "Usually a mapping job. The specification is in a supplier datasheet or a feed you already receive, and the audit separates the fields you can map this week from the ones that need real acquisition.",
    attributes: [
      { label: "Voltage rating", coverage: 34, decisive: true },
      { label: "Thread size", coverage: 47, decisive: true },
      { label: "Tolerance class", coverage: 19, decisive: true },
      { label: "Pack quantity", coverage: 91, decisive: false },
    ],
    facts: [
      {
        value: 36,
        unit: "T",
        label:
          "estimated global B2B ecommerce market in 2026, five to six times B2C",
        source: "industry estimate, 14.5% CAGR",
      },
      {
        value: 66,
        unit: "%",
        label:
          "average machine readability of US retail product pages, lowest of any page type",
        source: "Adobe Analytics",
      },
      {
        value: 79,
        unit: "%",
        label: "of product pages ship no full set of structured data",
        source: "Adobe Analytics",
      },
    ],
    metric: "Which specs to map first",
  },
];

const VI: Sector[] = [
  {
    slug: "ecommerce",
    icon: ShoppingCart,
    name: "Thương mại điện tử và bán lẻ",
    tagline:
      "Danh mục sâu, và hai sản phẩm khác nhau ở một trường không ai ghi lại",
    metaTitle: "Thương mại điện tử: thuộc tính người mua cần",
    summary:
      "Một ngành hàng với hàng trăm sản phẩm gần như giống hệt nhau, nơi dữ kiện phân biệt chúng chưa bao giờ là một cột dữ liệu.",
    heroTitle: "Kệ hàng của bạn có chín mươi sản phẩm và",
    heroHighlight: "không có cách nào để chọn giữa chúng",
    heroLede:
      "Danh mục bán lẻ lớn lên bằng cách thêm sản phẩm, không phải bằng cách thêm cột. Rồi tới lúc một ngành hàng chứa đủ nhiều sản phẩm gần giống nhau đến mức người mua không thu hẹp nổi, và cái trường lẽ ra giúp thu hẹp lại là trường không ai được yêu cầu điền.",
    image: {
      src: "industries/ecommerce.webp",
      alt: "Một lối đi siêu thị dài với các kệ xếp kín hàng, nơi phần lớn bao bì trông giống hệt nhau khi lùi lại một bước.",
    },
    decision: "Trong chín mươi sản phẩm này, cái nào dành cho tôi?",
    problems: [
      "Một trang ngành hàng mà việc lọc gần như không loại bỏ được gì, vì các bộ lọc hữu ích không tồn tại",
      "Báo cáo mức hoàn thiện màu xanh trong khi khả năng tìm thấy hàng rõ ràng đang hỏng",
      "Lược đồ thuộc tính đặt ra từ nhiều năm trước, khi dải sản phẩm chưa lớn như bây giờ",
      "Việc làm giàu dữ liệu bị báo giá như một dự án toàn danh mục vì không ai nói được nên làm trường nào trước",
    ],
    provenance:
      "Phần lớn đã nằm sẵn trong tiêu đề và mô tả sản phẩm của bạn. Trong 9 tin đăng laptop thật chúng tôi lấy mẫu, mọi dữ kiện thiếu ở phần thông số đều có trong tiêu đề hoặc mô tả.",
    attributes: [
      { label: "Kích thước màn hình", coverage: 63, decisive: true },
      {
        label: "RAM",
        coverage: 72,
        icon: "icons/product-attribute-memory-ram.webp",
        decisive: true,
      },
      {
        label: "Dung lượng",
        coverage: 74,
        icon: "icons/product-attribute-storage.webp",
        decisive: true,
      },
      {
        label: "Vi xử lý",
        coverage: 25,
        icon: "icons/product-attribute-processor.webp",
        decisive: false,
      },
    ],
    facts: [
      {
        value: 6.88,
        unit: "T",
        label:
          "doanh số thương mại điện tử bán lẻ toàn cầu dự báo cho 2026, chiếm 21,1% toàn bộ bán lẻ",
        source: "dự báo ngành, 2026",
      },
      {
        value: 38,
        unit: "%",
        label:
          "các website được kiểm tra không có bộ lọc cho thông tin họ vốn đã hiển thị",
        source: "Baymard Institute",
      },
      {
        value: 34,
        unit: "%",
        label:
          "người tiêu dùng khó chịu vì thông tin sản phẩm thiếu, tăng từ 28%",
        source: "Akeneo PX Pulse 2025",
      },
    ],
    metric: "Danh sách sửa đã xếp hạng trong vài phút",
  },
  {
    slug: "fmcg",
    icon: ShoppingBasket,
    name: "Hàng tiêu dùng nhanh",
    tagline:
      "Hàng trăm bao bì gần như giống hệt, phân biệt bằng một dòng chữ trên nhãn",
    metaTitle: "Hàng tiêu dùng nhanh: một dòng trên nhãn",
    summary:
      "Những kệ hàng mà bao bì trông như nhau, còn quyết định lại nằm ở một công bố, một dung tích hay một thành phần chưa ai đưa vào trường dữ liệu.",
    heroTitle: "Bao bì trông giống nhau. Quyết định",
    heroHighlight: "nằm trên nhãn",
    heroLede:
      "Hàng tiêu dùng nhanh được mua dựa trên những dữ kiện nhỏ và rất cụ thể: quy cách đóng gói, công bố dinh dưỡng, nồng độ, có hợp với trẻ nhỏ hay không. Những dữ kiện ấy in trên bao bì và được chụp lại, nghĩa là người mua đọc được còn bộ lọc của bạn thì không.",
    decision: "Món nào mới đúng cho gia đình tôi?",
    problems: [
      "Dữ kiện quyết định chỉ tồn tại bên trong ảnh chụp bao bì",
      "Quy cách đóng gói và đơn giá ghi không nhất quán trong cùng một dòng hàng",
      "Công bố dinh dưỡng và dị ứng viết trong phần mô tả thay vì thành một trường",
      "Dòng hàng mở rộng theo biến thể, mà mọi biến thể trông y hệt nhau trên lưới sản phẩm",
    ],
    provenance:
      "Thường nằm ở nhãn và thông số nhà cung cấp. Phần lớn đã được viết sẵn trong chính phần mô tả và nội dung tiếp thị của bạn, và đó là nơi rẻ nhất mà bản kiểm tra tìm thấy chúng.",
    attributes: [
      { label: "Quy cách đóng gói", coverage: 58, decisive: true },
      { label: "Công bố dinh dưỡng", coverage: 31, decisive: true },
      { label: "Nồng độ", coverage: 22, decisive: true },
      { label: "Thương hiệu", coverage: 97, decisive: false },
    ],
    facts: [
      {
        value: 38,
        unit: "%",
        label:
          "nhà bán lẻ được kiểm tra không có bộ lọc cho thông tin họ vốn đã hiển thị",
        source: "Baymard Institute",
      },
      {
        value: 34,
        unit: "%",
        label:
          "người mua thấy khó chịu vì thông tin sản phẩm thiếu, tăng từ 28%",
        source: "Akeneo PX Pulse 2025",
      },
      {
        value: 79,
        unit: "%",
        label: "trang sản phẩm không có bộ dữ liệu có cấu trúc đầy đủ",
        source: "Adobe Analytics",
      },
    ],
    metric: "Danh sách sửa đã xếp hạng trong vài phút",
  },
  {
    slug: "technology",
    icon: Cpu,
    name: "Công nghệ và điện tử",
    tagline: "Ngành hàng chúng tôi đã đo, và là nơi thông số quyết định tất cả",
    metaTitle: "Công nghệ và điện tử: thông số quyết định",
    summary:
      "Những kệ hàng sâu, dẫn dắt bởi thông số, nơi hai thiết bị chỉ khác nhau một con số và con số đó lại đang thiếu.",
    heroTitle: "Hai thiết bị cách nhau một con số, và",
    heroHighlight: "con số đó đang thiếu",
    heroLede:
      "Điện tử là phiên bản rõ ràng nhất của vấn đề này và là ngành hàng chúng tôi đo đầu tiên. Người mua thu hẹp theo kích thước màn hình, RAM, dung lượng và vi xử lý, và một danh mục chỉ ghi ba trong bốn thứ đó không thể tách nổi một kệ hàng cần cả bốn.",
    decision: "Cấu hình nào mới thực sự hợp với nhu cầu của tôi?",
    problems: [
      "Thông số nằm trong chuỗi tiêu đề thay vì trong một trường lọc được",
      "Cách đặt tên theo thế hệ che mất khác biệt thật sau một mã sản phẩm",
      "Dòng hàng mà một thuộc tính tách được phần lớn kệ hàng lại là thuộc tính ghi tệ nhất",
      "Không dựng nổi bảng so sánh vì các trường bên dưới đang trống",
    ],
    provenance:
      "Chủ yếu nằm trong chính tiêu đề và mô tả của bạn. Trong 9 tin đăng laptop thật chúng tôi lấy mẫu, mọi dữ kiện thiếu ở phần thông số đều có trong tiêu đề hoặc mô tả, không phải mua thêm dữ liệu nào.",
    attributes: [
      { label: "Kích thước màn hình", coverage: 63, decisive: true },
      {
        label: "RAM",
        coverage: 72,
        icon: "icons/product-attribute-memory-ram.webp",
        decisive: true,
      },
      {
        label: "Dung lượng",
        coverage: 74,
        icon: "icons/product-attribute-storage.webp",
        decisive: true,
      },
      {
        label: "Vi xử lý",
        coverage: 25,
        icon: "icons/product-attribute-processor.webp",
        decisive: false,
      },
    ],
    facts: [
      {
        value: 38,
        unit: "%",
        label:
          "nhà bán lẻ được kiểm tra không có bộ lọc cho thông tin họ vốn đã hiển thị",
        source: "Baymard Institute",
      },
      {
        value: 79,
        unit: "%",
        label: "trang sản phẩm không có bộ dữ liệu có cấu trúc đầy đủ",
        source: "Adobe Analytics",
      },
    ],
    metric: "Ngành hàng đứng sau phương pháp đã công bố của chúng tôi",
  },
  {
    slug: "furniture",
    icon: Sofa,
    name: "Nội thất và gia dụng",
    tagline: "Mua theo kích thước và chất liệu, nhưng đăng bán bằng hình ảnh",
    metaTitle: "Nội thất: mua theo kích thước, bán bằng ảnh",
    summary:
      "Ngành hàng mà quyết định nằm ở chuyện có vừa không và làm bằng gì, trong khi cả hai thường đều vắng mặt.",
    heroTitle: "Trông thì ưng. Còn có",
    heroHighlight: "vừa hay không lại là chuyện khác",
    heroLede:
      "Nội thất bán được nhờ một tấm ảnh và bị trả lại vì một con số đo. Độ sâu, chất liệu, tải trọng và cách lắp ráp mới là thứ quyết định việc mua và cũng là thứ gây ra trả hàng, nhưng chúng lại hay bị bỏ lại trong một đoạn mô tả.",
    decision: "Nó có vừa không, và có đúng chất liệu tôi nghĩ không?",
    problems: [
      "Kích thước viết trong mô tả thay vì được ghi thành số",
      "Chất liệu và hoàn thiện mô tả bằng ngôn ngữ tiếp thị, không lọc được",
      "Trả hàng vì một dữ kiện mà trang sản phẩm lẽ ra đã có thể nêu",
      "Dòng hàng dùng lẫn lộn kích thước sau lắp ráp và kích thước đóng gói",
    ],
    provenance:
      "Thường nằm ở bảng thông số của nhà cung cấp, cộng với phần mô tả của chính bạn. Riêng kích thước thì hiếm khi thiếu trong doanh nghiệp, chỉ thiếu trong trường dữ liệu.",
    attributes: [
      { label: "Độ sâu sau lắp ráp", coverage: 44, decisive: true },
      { label: "Chất liệu chính", coverage: 52, decisive: true },
      { label: "Tải trọng", coverage: 18, decisive: true },
      { label: "Màu sắc", coverage: 95, decisive: false },
    ],
    facts: [
      {
        value: 38,
        unit: "%",
        label:
          "nhà bán lẻ được kiểm tra không có bộ lọc cho thông tin họ vốn đã hiển thị",
        source: "Baymard Institute",
      },
      {
        value: 34,
        unit: "%",
        label:
          "người mua thấy khó chịu vì thông tin sản phẩm thiếu, tăng từ 28%",
        source: "Akeneo PX Pulse 2025",
      },
    ],
    metric: "Danh sách sửa đã xếp hạng trong vài phút",
  },
  {
    slug: "cosmetics",
    icon: Sparkles,
    name: "Mỹ phẩm và chăm sóc cá nhân",
    tagline:
      "Chọn theo loại da, thành phần và vấn đề cần xử lý, những thứ chưa bao giờ là trường dữ liệu",
    metaTitle: "Mỹ phẩm: loại da và thành phần thành trường",
    summary:
      "Ngành hàng mua theo mức độ phù hợp, trong khi các thuộc tính quyết định sự phù hợp lại nằm trong phần mô tả.",
    heroTitle: "Sự phù hợp quyết định đơn hàng, mà",
    heroHighlight: "sự phù hợp lại không phải một trường",
    heroLede:
      "Chăm sóc cá nhân được mua theo một nhu cầu rất cụ thể: một loại da, một vấn đề cần xử lý, một thành phần cần tìm hoặc cần tránh. Đó đúng là những thuộc tính mà phần lớn danh mục để ở dạng văn xuôi, nên một người biết chính xác mình muốn gì vẫn không thu hẹp nổi kệ hàng.",
    decision:
      "Sản phẩm này có hợp với da tôi và vấn đề tôi đang muốn xử lý không?",
    problems: [
      "Loại da và vấn đề cần xử lý để ở dạng văn xuôi tiếp thị thay vì giá trị có cấu trúc",
      "Thông tin thành phần có mà không tìm kiếm được, điều rất quan trọng với người dị ứng",
      "Tông màu và độ hoàn thiện ghi không nhất quán giữa các thương hiệu",
      "Mất đơn mua lại vì danh mục không trả lời nổi một câu hỏi về độ phù hợp",
    ],
    provenance:
      "Danh sách thành phần và dữ liệu nhà cung cấp bạn vốn đã giữ để tuân thủ quy định. Bản kiểm tra thường cho thấy đây là việc cấu trúc lại dữ liệu chứ không phải đi thu thập mới.",
    attributes: [
      {
        label: "Loại da",
        coverage: 29,
        icon: "icons/product-attribute-skin-type.webp",
        decisive: true,
      },
      {
        label: "Thành phần chính",
        coverage: 41,
        icon: "icons/product-attribute-key-ingredients.webp",
        decisive: true,
      },
      {
        label: "Vấn đề xử lý",
        coverage: 24,
        icon: "icons/product-attribute-concern-addressed.webp",
        decisive: true,
      },
      {
        label: "Dung tích",
        coverage: 88,
        icon: "icons/product-attribute-volume.webp",
        decisive: false,
      },
    ],
    facts: [
      {
        value: 34,
        unit: "%",
        label:
          "người mua thấy khó chịu vì thông tin sản phẩm thiếu, tăng từ 28%",
        source: "Akeneo PX Pulse 2025",
      },
      {
        value: 79,
        unit: "%",
        label: "trang sản phẩm không có bộ dữ liệu có cấu trúc đầy đủ",
        source: "Adobe Analytics",
      },
    ],
    metric: "Danh sách sửa đã xếp hạng trong vài phút",
  },
  {
    slug: "distribution",
    icon: Boxes,
    name: "B2B và công nghiệp",
    tagline:
      "Mua theo thông số kỹ thuật, trên danh mục dựng ra để đặt theo mã hàng",
    metaTitle: "B2B và công nghiệp: danh mục dựng cho mã hàng",
    summary:
      "Người mua của bạn chọn theo thông số, còn danh mục thì được dựng để đặt hàng chứ không phải để tìm kiếm.",
    heroTitle: "Người mua chọn theo thông số. Danh mục của bạn",
    heroHighlight: "được dựng cho mã đặt hàng",
    heroLede:
      "Danh mục công nghiệp và hàng kỹ thuật được thiết kế cho người đã biết sẵn mã linh kiện. Người chưa biết thì đang lọc theo cỡ ren, điện áp hay dung sai, và những thứ đó nằm trong một tệp PDF thông số chứ không nằm trong một trường dữ liệu.",
    image: {
      src: "industries/distribution.webp",
      alt: "Một nhân viên kho đứng cạnh xe đẩy và chồng thùng hàng, giơ hai tờ thông số với các mục quan trọng đã được tích.",
    },
    decision: "Linh kiện nào đáp ứng đúng thông số tôi phải đạt?",
    problems: [
      "Thông số kỹ thuật kẹt trong tệp PDF của nhà cung cấp và chưa bao giờ được ánh xạ vào danh mục",
      "Tìm kiếm chạy tốt với mã linh kiện và hỏng với một yêu cầu kỹ thuật",
      "Hàng trăm biến thể chỉ phân biệt nhau bằng một hậu tố trong mã sản phẩm",
      "Thời gian của đội bán hàng dành để trả lời những câu hỏi thông số mà danh mục lẽ ra phải trả lời",
    ],
    provenance:
      "Thường là một công việc ánh xạ. Thông số nằm trong tài liệu nhà cung cấp hoặc một nguồn dữ liệu bạn đã nhận, và bản kiểm tra tách những trường bạn ánh xạ được ngay tuần này khỏi những trường thực sự phải đi thu thập.",
    attributes: [
      { label: "Điện áp định mức", coverage: 34, decisive: true },
      { label: "Cỡ ren", coverage: 47, decisive: true },
      { label: "Cấp dung sai", coverage: 19, decisive: true },
      { label: "Số lượng mỗi thùng", coverage: 91, decisive: false },
    ],
    facts: [
      {
        value: 36,
        unit: "T",
        label:
          "quy mô thương mại điện tử B2B toàn cầu ước tính năm 2026, gấp năm tới sáu lần B2C",
        source: "ước tính ngành, CAGR 14,5%",
      },
      {
        value: 66,
        unit: "%",
        label:
          "mức đọc được bằng máy trung bình của trang sản phẩm bán lẻ Mỹ, thấp nhất trong mọi loại trang",
        source: "Adobe Analytics",
      },
      {
        value: 79,
        unit: "%",
        label: "trang sản phẩm không có bộ dữ liệu có cấu trúc đầy đủ",
        source: "Adobe Analytics",
      },
    ],
    metric: "Nên ánh xạ thông số nào trước",
  },
];

export const sectors = (l: string): Sector[] => byLocale({ en: EN, vi: VI }, l);
export const sector = (l: string, slug: string) =>
  sectors(l).find((s) => s.slug === slug);

/** Slugs the old ten-sector set had. They were in the sitemap, so they redirect. */
export const RETIRED_SECTOR_SLUGS = [
  "social-networking",
  "blogs",
  "streaming",
  "news-media",
  "edtech",
  "marketing",
  // Retired 2026-10-06 with the move to a product-category taxonomy. Their
  // copy and cited figures are in git history; marketplaces and travel were
  // also rated a poor fit by hires/08-QUALIFIED-MERCHANT.md, and feeds and
  // agents are better homed as use cases than as sectors.
  "marketplaces",
  "advertising",
  "travel",
  "ai-tools",
];

export const sectorSlugs = EN.map((s) => s.slug);

/* ---------------------------------------------------------------------------
 * A story and a question set per sector.
 *
 * Six pages off one template with only the noun swapped is one page as far as
 * a search engine is concerned, and useless to a reader who works in that
 * sector. Each of these is a specific situation with a specific resolution,
 * and each FAQ answers questions only somebody in that sector would type.
 *
 * The scenarios are written as "what this looks like", not as customers. We
 * have none, `/why/limits` says so, and a named case study here would
 * contradict it. The only measured figures on this site are the laptop shelf's
 * and they live on /why/method with the command that reproduces them.
 * ------------------------------------------------------------------------- */
