/**
 * Vietnamese for every string in the ten articles, keyed by the English.
 *
 * Kept apart from `blog.ts` so the English copy stays readable: interleaving two languages in one
 * 560-line file makes both harder to edit, and a dictionary can be handed to a reviewer on its own.
 * `blog.ts` walks each article and looks every string up here; a miss falls back to English, so an
 * article added without a translation reads in English rather than breaking.
 *
 * What is deliberately absent
 * ---------------------------
 * Attributions. "Baymard Institute, product list and filtering benchmark" is the name of a
 * published source: a reader following the citation needs the name as published, and a translated
 * one sends them looking for a document that does not exist. Source labels, link labels and
 * publication names therefore stay in English in both locales, which is the convention Vietnamese
 * research writing uses for foreign sources anyway.
 *
 * Figures keep their numerals. Vietnamese writes a decimal comma, which matters for prose like
 * "1,067 bit", and that is written into the translation rather than left to a formatter, because
 * these strings are copy rather than computed values.
 */
export const BLOG_VI: Record<string, string> = {
  /* Shared across articles: categories, read times and dates. */
  Research: "Nghiên cứu",
  Measurement: "Phép đo",
  Method: "Phương pháp",
  Positioning: "Định vị",
  Marketplaces: "Sàn thương mại",
  B2B: "B2B",
  Travel: "Du lịch",
  Advertising: "Quảng cáo",
  "AI search": "Tìm kiếm AI",
  /* ---- filters-that-do-not-exist ---------------------------------------- */
  "38% of ecommerce sites cannot filter on what they already show you":
    "38% website thương mại điện tử không cho lọc theo chính thứ họ đang hiển thị cho bạn",
  "Baymard tested 170+ leading retailers and found more than a third display product information they provide no filter for. The gap is not a UI problem. It is a catalogue problem wearing a UI costume.":
    "Baymard đã kiểm tra hơn 170 nhà bán lẻ hàng đầu và phát hiện hơn một phần ba hiển thị thông tin sản phẩm mà họ không cung cấp bộ lọc tương ứng. Khoảng trống này không phải vấn đề giao diện. Đó là vấn đề của danh mục, khoác lên mình bộ cánh giao diện.",
  "38% of sites cannot filter what they show":
    "38% website không lọc được thứ họ hiển thị",
  "Baymard tested 170+ leading retailers and found a third display product information they offer no filter for. A catalogue problem in a UI costume.":
    "Baymard kiểm tra hơn 170 nhà bán lẻ hàng đầu: một phần ba hiển thị thông tin sản phẩm mà không có bộ lọc tương ứng. Vấn đề danh mục, khoác áo giao diện.",
  "7 min read": "Đọc 7 phút",
  "18 September 2026": "Ngày 18 tháng 9 năm 2026",
  "There is a specific failure that every merchandiser has watched happen and almost nobody has a name for. A shopper lands on a category, sees a product attribute printed on the card, tries to filter by it, and finds the filter is not there. They were shown the fact and then denied the ability to use it.":
    "Có một kiểu thất bại rất cụ thể mà người phụ trách trưng bày hàng hoá nào cũng từng chứng kiến nhưng gần như không ai gọi tên. Một người mua vào một ngành hàng, nhìn thấy một thuộc tính sản phẩm in ngay trên thẻ sản phẩm, thử lọc theo thuộc tính đó, và phát hiện bộ lọc ấy không tồn tại. Họ được cho xem dữ kiện rồi bị tước đi khả năng sử dụng nó.",
  "of tested sites do not offer filters for all the list item information they display":
    "website được kiểm tra không cung cấp bộ lọc cho toàn bộ thông tin mà họ hiển thị trên thẻ sản phẩm",
  "Baymard Institute puts a number on it. In their product list and filtering research, 38% of sites fail to provide filters for information they already display on the list item, which they identify as a direct cause of abandonment. This is not a survey of small merchants: their 2025 benchmark covers 21,000+ manually reviewed parameters across 170+ leading ecommerce sites in the US and Europe, built on more than 200,000 hours of usability research.":
    "Baymard Institute đã lượng hoá điều này. Trong nghiên cứu về danh sách sản phẩm và bộ lọc của họ, 38% website không cung cấp bộ lọc cho thông tin mà họ vốn đã hiển thị trên thẻ sản phẩm, và họ xác định đây là nguyên nhân trực tiếp khiến người mua bỏ đi. Đây không phải khảo sát các nhà bán nhỏ: bộ tiêu chuẩn năm 2025 của họ bao phủ hơn 21.000 tham số được rà soát thủ công trên hơn 170 website thương mại điện tử hàng đầu tại Mỹ và châu Âu, dựa trên hơn 200.000 giờ nghiên cứu khả dụng.",
  "of tested sites offer no filter for information they already display":
    "website được kiểm tra không có bộ lọc cho thông tin họ vốn đã hiển thị",
  "offer filters for what they display": "có bộ lọc cho thứ họ hiển thị",
  "Sites that display an attribute and then cannot filter on it":
    "Những website hiển thị một thuộc tính rồi lại không lọc được theo nó",
  "Baymard identify this as a direct cause of abandonment. The benchmark covers 21,000+ manually reviewed parameters across 170+ leading US and European retailers.":
    "Baymard xác định đây là nguyên nhân trực tiếp khiến người mua bỏ đi. Bộ tiêu chuẩn bao phủ hơn 21.000 tham số được rà soát thủ công trên hơn 170 nhà bán lẻ hàng đầu tại Mỹ và châu Âu.",
  "Why this is a data problem, not a design one":
    "Vì sao đây là vấn đề dữ liệu, không phải vấn đề thiết kế",
  "The instinct is to treat it as a front-end oversight. Somebody forgot to add the filter. Occasionally that is true, and it is a good afternoon's work when it is.":
    "Phản xạ đầu tiên là coi đây là một thiếu sót ở lớp giao diện. Ai đó quên thêm bộ lọc. Thỉnh thoảng đúng là vậy thật, và khi đúng thì đó là công việc của một buổi chiều.",
  "More often the filter is missing because it could not be built. A filter needs a structured value on every product in the set, and what is printed on the card is frequently derived from a description rather than read from a field. The fact is visible because a template rendered a sentence. It is not filterable because there is nothing to compare.":
    "Thường xuyên hơn, bộ lọc vắng mặt vì nó không thể được dựng lên. Một bộ lọc cần một giá trị có cấu trúc trên mọi sản phẩm trong tập hàng, trong khi thứ in trên thẻ sản phẩm lại thường được rút ra từ phần mô tả chứ không phải đọc từ một trường dữ liệu. Dữ kiện đó nhìn thấy được vì một mẫu giao diện đã dựng ra một câu văn. Nó không lọc được vì chẳng có gì để đem ra so sánh.",
  "The attribute is on the page and not in the schema. A human reads it. A filter cannot.":
    "Thuộc tính nằm trên trang chứ không nằm trong lược đồ dữ liệu. Con người đọc được nó. Bộ lọc thì không.",
  "The measurement problem underneath": "Vấn đề đo lường nằm bên dưới",
  "Say you accept the diagnosis and decide to fix it. Which attribute do you structure first?":
    "Giả sử bạn chấp nhận chẩn đoán này và quyết định sửa. Vậy bạn sẽ cấu trúc hoá thuộc tính nào trước?",
  "The usual answer is to rank by how empty each field is, because that is the number a completeness report gives you. That ranking is close to arbitrary for this purpose. A field that is 90% empty and that nobody chooses on is worth less than a field that is 40% empty and decides every purchase in the category.":
    "Câu trả lời quen thuộc là xếp hạng theo mức độ trống của từng trường, vì đó chính là con số mà một báo cáo mức hoàn thiện đưa cho bạn. Với mục đích này, cách xếp hạng đó gần như tuỳ tiện. Một trường trống 90% mà không ai dựa vào để chọn thì đáng giá ít hơn một trường trống 40% nhưng quyết định mọi giao dịch trong ngành hàng.",
  "On a 216-product test shelf we built ourselves, ranking by absence and ranking by what shoppers said they needed disagreed completely. Processor was missing on 162 of 216 products, which put it third by absence. Only 2 of 32 stated buying requirements mentioned a processor at all, which put it last by demand. Storage and processor traded places, and fixing processor first would have been the most expensive way to change nothing.":
    "Trên một kệ thử nghiệm 216 sản phẩm do chúng tôi tự dựng, cách xếp theo sự vắng mặt và cách xếp theo điều người mua nói là họ cần đã hoàn toàn bất đồng. Vi xử lý thiếu ở 162 trên 216 sản phẩm, đưa nó lên hạng ba theo sự vắng mặt. Chỉ 2 trên 32 yêu cầu mua hàng được nêu ra có nhắc tới vi xử lý, đưa nó xuống hạng chót theo nhu cầu. Dung lượng và vi xử lý đổi chỗ cho nhau, và sửa vi xử lý trước sẽ là cách tốn kém nhất để chẳng thay đổi được gì.",
  "94 of 216": "94 trên 216",
  "products on that shelf still indistinguishable after every question the catalogue could answer":
    "sản phẩm trên kệ đó vẫn không phân biệt được, sau khi danh mục đã trả lời mọi câu hỏi nó có thể trả lời",
  "our own measurement, reproducible from the repository":
    "phép đo của chính chúng tôi, có thể tái lập từ kho mã nguồn",
  "What to do about it this quarter": "Quý này nên làm gì",
  "That last point is the one that changes project sizing. On our test shelf, storage was sitting in the product titles for 161 of 216 products, recoverable with a script. A quarter-long enrichment programme and a week of extraction look identical on a completeness dashboard and cost very different amounts.":
    "Điểm cuối cùng mới là điểm làm thay đổi quy mô dự án. Trên kệ thử nghiệm của chúng tôi, dung lượng nằm sẵn trong tiêu đề ở 161 trên 216 sản phẩm, và có thể lấy lại bằng một đoạn script. Một chương trình làm giàu dữ liệu kéo dài cả quý và một tuần trích xuất trông y hệt nhau trên bảng điều khiển mức hoàn thiện, nhưng chi phí thì khác nhau rất xa.",
  "Open your worst-performing category as a shopper, not as an admin, and try to narrow it the way a buyer would":
    "Hãy mở ngành hàng kém hiệu quả nhất của bạn với tư cách người mua chứ không phải quản trị viên, và thử thu hẹp nó theo cách một người mua sẽ làm",
  "List the attributes printed on the card that you cannot filter on. That list is usually shorter and more actionable than a completeness report":
    "Hãy liệt kê những thuộc tính in trên thẻ sản phẩm mà bạn không lọc được. Danh sách đó thường ngắn hơn và dễ hành động hơn một báo cáo mức hoàn thiện",
  "Rank that list by whether a purchase decision turns on it, not by how empty it is":
    "Hãy xếp hạng danh sách đó theo việc một quyết định mua có xoay quanh nó hay không, chứ không theo mức độ trống của nó",
  "Check how much of it is recoverable from your own product titles before you budget for acquisition":
    "Hãy kiểm tra xem bao nhiêu phần trong đó có thể lấy lại từ chính tiêu đề sản phẩm của bạn, trước khi lập ngân sách đi thu thập dữ liệu mới",

  /* ---- completeness-is-not-readiness ------------------------------------ */
  "Your PIM says 93% complete. Your shoppers still cannot choose.":
    "PIM của bạn báo hoàn thiện 93%. Người mua của bạn vẫn không chọn nổi.",
  "Completeness measures whether the fields you defined are filled. It cannot tell you whether you defined the right fields, and the difference is where discovery quietly fails.":
    "Mức hoàn thiện đo xem những trường bạn đã định nghĩa có được điền hay không. Nó không cho bạn biết bạn có định nghĩa đúng trường hay không, và chính khoảng cách đó là nơi khả năng khám phá sản phẩm lặng lẽ đổ vỡ.",
  "93% complete, and shoppers still cannot choose":
    "Hoàn thiện 93%, mà người mua vẫn không chọn nổi",
  "Completeness measures whether the fields you defined are filled. It cannot say whether you defined the right ones, and that gap is where discovery fails.":
    "Mức hoàn thiện đo xem các trường bạn định nghĩa có được điền hay không. Nó không nói được bạn có định nghĩa đúng trường hay không, và đó là chỗ đổ vỡ.",
  "Product data": "Dữ liệu sản phẩm",
  "6 min read": "Đọc 6 phút",
  "11 September 2026": "Ngày 11 tháng 9 năm 2026",
  "Completeness is the most reassuring metric in product data and one of the least informative. It answers a question about your schema: of the fields you decided to have, how many are populated? It cannot answer the question you actually care about, which is whether those were the fields worth having.":
    "Mức hoàn thiện là chỉ số yên lòng nhất trong dữ liệu sản phẩm, và cũng là một trong những chỉ số ít thông tin nhất. Nó trả lời một câu hỏi về lược đồ dữ liệu của bạn: trong số những trường bạn quyết định có, bao nhiêu trường đã được điền? Nó không trả lời được câu hỏi bạn thực sự quan tâm, là liệu đó có phải những trường đáng có hay không.",
  "A schema that never asked for screen size cannot report screen size as missing. The gap does not appear anywhere in the reporting, because from the schema's point of view there is no gap. That is how a catalogue reaches 93% complete and still fails the shopper who knows exactly what they want.":
    "Một lược đồ chưa bao giờ hỏi đến kích thước màn hình thì không thể báo rằng kích thước màn hình đang thiếu. Khoảng trống đó không xuất hiện ở bất kỳ đâu trong báo cáo, vì dưới góc nhìn của lược đồ, chẳng có khoảng trống nào cả. Đó là cách một danh mục đạt mức hoàn thiện 93% mà vẫn làm thất vọng đúng người mua đã biết rõ mình muốn gì.",
  "What shoppers say about it": "Người mua nói gì về chuyện này",
  "Akeneo's 2025 PX Pulse survey found the share of consumers frustrated by incomplete or unclear product descriptions rose to 34%, up from 28% the year before. That is a vendor's survey and worth reading as such, but the direction is consistent with the usability research: the problem is getting worse as catalogues get deeper.":
    "Khảo sát PX Pulse 2025 của Akeneo cho thấy tỷ lệ người tiêu dùng bực bội vì mô tả sản phẩm thiếu hoặc không rõ ràng đã tăng lên 34%, từ mức 28% của năm trước. Đó là khảo sát do một nhà cung cấp thực hiện và nên được đọc với đúng tư cách đó, nhưng chiều hướng của nó thống nhất với các nghiên cứu khả dụng: vấn đề đang xấu đi khi danh mục ngày càng sâu hơn.",
  "of consumers frustrated by incomplete or unclear product information, up from 28% a year earlier":
    "người tiêu dùng bực bội vì thông tin sản phẩm thiếu hoặc không rõ ràng, tăng từ mức 28% một năm trước đó",
  "Two ways of scoring the same test shelf":
    "Hai cách chấm điểm cùng một kệ thử nghiệm",
  "Products on the shelf": "Sản phẩm trên kệ",
  "Fields populated (93.1%)": "Trường đã điền (93,1%)",
  "Still indistinguishable": "Vẫn không phân biệt được",
  "Completeness counts the middle bar. A shopper experiences the bottom one.":
    "Mức hoàn thiện đếm cột ở giữa. Người mua thì trải nghiệm cột dưới cùng.",
  "Readiness asks a different question": "Mức sẵn sàng đặt một câu hỏi khác",
  "Instead of asking how full the fields are, ask this: after every question your catalogue can currently answer, how many products is a shopper still choosing between?":
    "Thay vì hỏi các trường đã đầy đến đâu, hãy hỏi thế này: sau khi danh mục của bạn đã trả lời hết mọi câu hỏi nó có thể trả lời, người mua vẫn còn phải chọn giữa bao nhiêu sản phẩm?",
  "That number has a property completeness does not. It gets worse when you add products without adding facts, which is what actually happens as a range grows. And it improves only when you record something a decision turns on, which is exactly the behaviour you want from a metric that is supposed to direct work.":
    "Con số đó có một đặc tính mà mức hoàn thiện không có. Nó xấu đi khi bạn thêm sản phẩm mà không thêm dữ kiện, và đó chính là điều thực sự xảy ra khi một dòng hàng mở rộng. Và nó chỉ cải thiện khi bạn ghi nhận một thứ mà quyết định mua xoay quanh nó, đúng như cách bạn muốn một chỉ số dùng để dẫn dắt công việc phải hành xử.",
  "On our test shelf, the catalogue scored 93.1% complete and still left 94 of its 216 products indistinguishable once every question it supported had been answered. Both numbers describe the same shelf. Only one of them describes the shopper's experience of it.":
    "Trên kệ thử nghiệm của chúng tôi, danh mục đạt mức hoàn thiện 93,1% mà vẫn để lại 94 trên 216 sản phẩm không phân biệt được, sau khi mọi câu hỏi nó hỗ trợ đều đã được trả lời. Cả hai con số đều mô tả cùng một kệ hàng. Chỉ một trong hai mô tả trải nghiệm của người mua trên kệ đó.",
  "Why this is not an argument against your PIM":
    "Vì sao đây không phải lập luận chống lại PIM của bạn",
  "A PIM governs, enriches and distributes product information, and it does that well. Completeness is the right metric for the job a PIM is doing: it tells you whether the process is running. It was never designed to tell you whether the schema is right, and holding it to that is unfair to a tool that is doing what it was built for.":
    "Một hệ PIM quản trị, làm giàu và phân phối thông tin sản phẩm, và nó làm tốt việc đó. Mức hoàn thiện là chỉ số đúng cho công việc mà một PIM đang làm: nó cho bạn biết quy trình có đang chạy hay không. Nó chưa bao giờ được thiết kế để nói cho bạn biết lược đồ dữ liệu có đúng hay không, và đòi hỏi điều đó là không công bằng với một công cụ đang làm đúng việc nó được tạo ra để làm.",
  "Completeness is a process metric. Readiness is an outcome metric. Reporting the first and managing to the second is the mismatch.":
    "Mức hoàn thiện là chỉ số quy trình. Mức sẵn sàng là chỉ số kết quả. Báo cáo cái thứ nhất mà quản trị theo cái thứ hai chính là chỗ lệch pha.",
  "The practical consequence is that the priority list has to come from somewhere else, and then go into the PIM as work. Not instead of it.":
    "Hệ quả thực tế là danh sách ưu tiên phải đến từ một nơi khác, rồi mới đi vào PIM dưới dạng công việc. Chứ không phải thay thế cho PIM.",

  /* ---- machine-readable-catalogue --------------------------------------- */
  "79% of product pages do not ship a full set of structured data":
    "79% trang sản phẩm không xuất bản đầy đủ dữ liệu có cấu trúc",
  "Adobe scored US retail product pages at 66% machine readability, the lowest of any page type. Product pages are exactly where the comparison detail an agent needs is supposed to live.":
    "Adobe chấm trang sản phẩm của ngành bán lẻ Mỹ ở mức 66% về khả năng đọc máy, thấp nhất trong mọi loại trang. Thế nhưng trang sản phẩm lại đúng là nơi đáng lẽ phải chứa những chi tiết so sánh mà một tác nhân AI cần.",
  "79% of pages do not ship full structured data":
    "79% trang sản phẩm chưa đủ dữ liệu có cấu trúc",
  "Adobe scored US retail product pages at 66% machine readability, the lowest of any page type, and that is where an agent looks for comparison detail.":
    "Adobe chấm trang sản phẩm bán lẻ Mỹ ở mức 66% khả năng đọc máy, thấp nhất trong mọi loại trang, mà đó lại là nơi tác nhân AI tìm chi tiết so sánh.",
  "Agentic commerce": "Thương mại bằng tác nhân AI",
  "8 min read": "Đọc 8 phút",
  "4 September 2026": "Ngày 4 tháng 9 năm 2026",
  "There is an uncomfortable asymmetry in how retail sites are built. The pages that carry the least decision detail are the best structured, and the page that carries all of it is the worst.":
    "Có một sự bất đối xứng khó chịu trong cách các website bán lẻ được dựng lên. Những trang chứa ít chi tiết quyết định nhất lại được cấu trúc tốt nhất, còn trang chứa toàn bộ chi tiết đó thì tệ nhất.",
  "average machine readability of US retail product pages, against 75% for homepages and 74% for category pages":
    "khả năng đọc máy trung bình của trang sản phẩm ngành bán lẻ Mỹ, so với 75% ở trang chủ và 74% ở trang ngành hàng",
  "Adobe's research across the US retail sector scored product pages lowest of any page type on machine readability. They also found that 79% of product pages do not ship a full set of structured data, and that the spread is enormous: the best-performing sites averaged 82.5% while the lowest averaged 54.2%.":
    "Nghiên cứu của Adobe trên toàn ngành bán lẻ Mỹ chấm trang sản phẩm thấp nhất trong mọi loại trang về khả năng đọc máy. Họ cũng phát hiện 79% trang sản phẩm không xuất bản đầy đủ dữ liệu có cấu trúc, và mức chênh lệch là rất lớn: nhóm website tốt nhất đạt trung bình 82,5% trong khi nhóm thấp nhất chỉ đạt trung bình 54,2%.",
  "Some of the specifics are stark. Only 5% of sites state shipping terms in a machine-readable way, and only 4% state return terms. Those are two of the facts a buyer most often decides on, and almost nobody publishes them in a form anything but a human can read.":
    "Một vài con số cụ thể khá phũ phàng. Chỉ 5% website nêu điều khoản vận chuyển theo cách máy đọc được, và chỉ 4% nêu điều khoản đổi trả. Đó là hai trong số những dữ kiện mà người mua thường dựa vào để quyết định nhất, vậy mà gần như không ai xuất bản chúng ở dạng mà thứ gì khác ngoài con người có thể đọc.",
  "Machine readability by page type, US retail":
    "Khả năng đọc máy theo loại trang, ngành bán lẻ Mỹ",
  Homepages: "Trang chủ",
  "Category pages": "Trang ngành hàng",
  "Product pages": "Trang sản phẩm",
  "The page carrying all the comparison detail scores lowest. Adobe also report a spread from 82.5% at the best sites to 54.2% at the worst.":
    "Trang chứa toàn bộ chi tiết so sánh lại đạt điểm thấp nhất. Adobe cũng báo cáo mức chênh lệch từ 82,5% ở nhóm website tốt nhất xuống 54,2% ở nhóm tệ nhất.",
  "Share of sites stating these terms in a machine-readable way":
    "Tỷ lệ website nêu những điều khoản này theo cách máy đọc được",
  "Shipping terms": "Điều khoản vận chuyển",
  "Return terms": "Điều khoản đổi trả",
  "Two of the facts buyers most often decide on, and almost nobody publishes them in a form anything but a human can read.":
    "Hai trong số những dữ kiện mà người mua thường dựa vào để quyết định nhất, vậy mà gần như không ai xuất bản chúng ở dạng mà thứ gì khác ngoài con người có thể đọc.",
  "Why the product page is the hard one":
    "Vì sao trang sản phẩm mới là trang khó",
  "A homepage has a handful of things on it and they are mostly navigational, so marking them up is tractable. A product page has to express everything that distinguishes one item from a near-identical one, and most of that distinguishing detail was written as prose because prose is what sells.":
    "Một trang chủ chỉ có vài thứ trên đó và phần lớn mang tính điều hướng, nên việc đánh dấu dữ liệu là khả thi. Một trang sản phẩm phải diễn đạt mọi thứ phân biệt món hàng này với một món gần như y hệt, và phần lớn những chi tiết phân biệt ấy được viết dưới dạng văn xuôi, vì văn xuôi mới là thứ bán được hàng.",
  "So the richer your product copy, the larger the gap between what you have said and what a structured consumer can use. A beautifully written description is an asset to a human reader and invisible to an agent applying a filter.":
    "Vậy nên nội dung sản phẩm của bạn càng phong phú thì khoảng cách giữa điều bạn đã nói và điều một bên tiêu thụ dữ liệu có cấu trúc dùng được càng lớn. Một mô tả viết hay là tài sản với người đọc, và vô hình với một tác nhân AI đang áp một bộ lọc.",
  "Structured data is downstream of recorded data":
    "Dữ liệu có cấu trúc nằm ở hạ nguồn của dữ liệu đã ghi nhận",
  "It is tempting to treat this as a markup task: add the schema, ship the JSON-LD, done. That works for the fields you hold. It does nothing for the fields you never recorded, and those are the ones that decide comparisons.":
    "Rất dễ xem đây là một việc đánh dấu dữ liệu: thêm lược đồ, xuất bản JSON-LD, xong. Cách đó hiệu quả với những trường bạn đang có. Nó không làm được gì cho những trường bạn chưa bao giờ ghi nhận, mà đó mới chính là những trường quyết định việc so sánh.",
  "You cannot mark up a fact you do not have. Schema coverage is capped by attribute coverage.":
    "Bạn không thể đánh dấu một dữ kiện mà bạn không có. Độ phủ lược đồ bị chặn trên bởi độ phủ thuộc tính.",
  "Which puts the work in an order: find out which attributes a decision in your category actually turns on, check which of those you record, recover what is recoverable from the text you already publish, and only then argue about markup. Doing markup first produces a well-structured statement of the things you happened to have.":
    "Điều đó xếp công việc theo một thứ tự: tìm ra những thuộc tính mà một quyết định trong ngành hàng của bạn thực sự xoay quanh, kiểm tra xem bạn ghi nhận được bao nhiêu trong số đó, lấy lại những gì có thể lấy từ phần văn bản bạn vốn đã xuất bản, và chỉ sau đó mới bàn tới việc đánh dấu. Làm đánh dấu trước sẽ tạo ra một bản khai có cấu trúc chỉn chu về những thứ bạn tình cờ đang có.",
  "What to check on your own catalogue":
    "Nên kiểm tra gì trên danh mục của chính bạn",
  "Take one category and list the constraints a buyer would filter on. Not the fields you have, the constraints they have":
    "Hãy lấy một ngành hàng và liệt kê những ràng buộc mà người mua sẽ lọc theo. Không phải những trường bạn đang có, mà là những ràng buộc họ đang có",
  "For each, check whether it exists as a value rather than as a sentence in the description":
    "Với từng ràng buộc, hãy kiểm tra xem nó tồn tại dưới dạng một giá trị hay chỉ là một câu trong phần mô tả",
  "For the ones that are sentences, that is extraction work and it is usually cheap":
    "Những ràng buộc đang nằm trong câu văn thì đó là việc trích xuất, và thường rẻ",
  "For the ones that are absent entirely, that is acquisition, and knowing which is which before you commit is most of the value":
    "Những ràng buộc hoàn toàn vắng mặt thì đó là việc đi thu thập, và biết được cái nào thuộc loại nào trước khi cam kết chính là phần lớn giá trị",

  /* ---- ai-traffic-converts-better-now ----------------------------------- */
  "AI-referred traffic went from converting 38% worse to 42% better in a year":
    "Trong một năm, lưu lượng đến từ AI chuyển từ chuyển đổi kém hơn 38% sang tốt hơn 42%",
  "Adobe's figures show the reversal clearly, and Salesforce put AI agents behind more than a fifth of holiday retail sales. Both numbers raise the same question about your catalogue.":
    "Số liệu của Adobe cho thấy sự đảo chiều này rất rõ, còn Salesforce cho rằng các tác nhân AI đứng sau hơn một phần năm doanh số bán lẻ mùa lễ. Cả hai con số đều đặt ra cùng một câu hỏi về danh mục của bạn.",
  "AI traffic went from 38% worse to 42% better":
    "Lưu lượng AI: từ kém hơn 38% sang tốt hơn 42%",
  "Adobe's figures show the reversal, and Salesforce put AI agents behind more than a fifth of holiday retail sales. Both raise one catalogue question.":
    "Số liệu của Adobe cho thấy sự đảo chiều, còn Salesforce cho rằng tác nhân AI đứng sau hơn một phần năm doanh số bán lẻ mùa lễ. Vì sao điều đó quan trọng.",
  "28 August 2026": "Ngày 28 tháng 8 năm 2026",
  "For most of 2025 the reasonable position on AI-referred retail traffic was that it was growing fast and converting badly, which is the signature of curiosity rather than intent. That is no longer the position.":
    "Trong phần lớn năm 2025, quan điểm hợp lý về lưu lượng bán lẻ đến từ AI là nó tăng nhanh nhưng chuyển đổi kém, vốn là dấu hiệu của sự tò mò chứ không phải ý định mua. Quan điểm đó nay không còn đúng nữa.",
  "year-on-year growth in AI-driven traffic to US retail sites in Q1 2026":
    "mức tăng trưởng so với cùng kỳ của lưu lượng do AI dẫn tới các website bán lẻ Mỹ trong quý 1 năm 2026",
  "Adobe reports AI-driven traffic to US retail sites up 393% year on year in the first quarter of 2026, following a 693% year-on-year increase over the 2025 holiday period. Growth at that rate would be interesting on its own. What changed is the quality.":
    "Adobe báo cáo lưu lượng do AI dẫn tới các website bán lẻ Mỹ tăng 393% so với cùng kỳ trong quý 1 năm 2026, nối tiếp mức tăng 693% so với cùng kỳ trong mùa lễ 2025. Tốc độ tăng trưởng như vậy tự nó đã đáng chú ý. Nhưng thứ thay đổi là chất lượng.",
  "In March 2025, AI-referred traffic converted 38% worse than non-AI traffic. In March 2026, it converted 42% better. Adobe also reports these visitors engaging 12% more, spending 48% longer on site, viewing 13% more pages, and generating 37% higher revenue per visit.":
    "Vào tháng 3 năm 2025, lưu lượng đến từ AI chuyển đổi kém hơn lưu lượng không đến từ AI 38%. Vào tháng 3 năm 2026, nó chuyển đổi tốt hơn 42%. Adobe cũng báo cáo rằng nhóm khách này tương tác nhiều hơn 12%, ở lại website lâu hơn 48%, xem nhiều hơn 13% số trang, và tạo ra doanh thu trên mỗi lượt ghé cao hơn 37%.",
  "Separately, Salesforce estimated that AI agents influenced more than 20% of global online retail sales during the 2025 holiday season.":
    "Ở một nghiên cứu khác, Salesforce ước tính các tác nhân AI đã tác động tới hơn 20% doanh số bán lẻ trực tuyến toàn cầu trong mùa lễ 2025.",
  "March 2025": "Tháng 3 năm 2025",
  "March 2026": "Tháng 3 năm 2026",
  "How AI-referred retail traffic performs against non-AI traffic":
    "Lưu lượng bán lẻ đến từ AI thể hiện ra sao so với lưu lượng không đến từ AI",
  "Conversion rate, relative to non-AI traffic":
    "Tỷ lệ chuyển đổi, so với lưu lượng không đến từ AI",
  "A reversal of 80 points in twelve months. Adobe also report engagement up 12%, time on site up 48%, pages per visit up 13% and revenue per visit up 37%.":
    "Một cú đảo chiều 80 điểm trong mười hai tháng. Adobe cũng báo cáo mức tương tác tăng 12%, thời gian trên website tăng 48%, số trang mỗi lượt ghé tăng 13% và doanh thu mỗi lượt ghé tăng 37%.",
  "year-on-year growth in AI-driven traffic to US retail sites, Q1 2026":
    "mức tăng trưởng so với cùng kỳ của lưu lượng do AI dẫn tới các website bán lẻ Mỹ, quý 1 năm 2026",
  "What that changes for product data":
    "Điều đó thay đổi gì với dữ liệu sản phẩm",
  "A visitor who arrives through an assistant has usually had a set of constraints applied on their behalf before they ever see your page. They are further down the decision than organic traffic, which is a plausible reason for the conversion reversal.":
    "Một người ghé thăm đến qua trợ lý AI thường đã được áp một bộ ràng buộc thay cho họ, từ trước khi họ nhìn thấy trang của bạn. Họ đã đi xa hơn trong quá trình quyết định so với lưu lượng tự nhiên, và đó là một lý do hợp lý cho cú đảo chiều về chuyển đổi.",
  "It also means the filtering happened somewhere you cannot see, against whatever attributes were available. If a constraint could not be evaluated against your product, your product was not in the set that got shown. There is no partial credit and no benefit of the doubt: an agent applying a filter treats a missing value as not qualifying, because that is the safe behaviour for it.":
    "Nó cũng có nghĩa là việc lọc đã diễn ra ở một nơi bạn không nhìn thấy, dựa trên bất kỳ thuộc tính nào sẵn có. Nếu một ràng buộc không thể được đánh giá trên sản phẩm của bạn, thì sản phẩm của bạn đã không nằm trong tập hàng được đem ra hiển thị. Không có điểm an ủi và không có sự nghi ngờ có lợi: một tác nhân AI khi áp bộ lọc sẽ coi giá trị còn thiếu là không đạt, vì đó là hành vi an toàn đối với nó.",
  "A shopper might read your description and infer the screen size. An agent asked to filter on it drops you and moves on.":
    "Một người mua có thể đọc mô tả của bạn và tự suy ra kích thước màn hình. Một tác nhân AI được yêu cầu lọc theo thuộc tính đó sẽ loại bạn ra và đi tiếp.",
  "The honest limit of this argument": "Giới hạn trung thực của lập luận này",
  "We cannot tell you what share of agent traffic you are currently losing to unrecorded attributes, and neither can anybody else, because the filtering is not observable from your side. Anyone quoting you a recovery figure for this is guessing.":
    "Chúng tôi không thể nói cho bạn biết bạn đang mất bao nhiêu phần lưu lượng tác nhân AI vì những thuộc tính chưa được ghi nhận, và cũng không ai khác nói được, vì việc lọc đó không quan sát được từ phía bạn. Bất kỳ ai đưa ra cho bạn một con số phục hồi cho chuyện này đều đang phỏng đoán.",
  "What is checkable is the input. You can establish which constraints buyers in your category apply, which of those your catalogue can answer, and how many of the gaps are recoverable from text you already publish. That is a measurement rather than a projection, and it is available without waiting for anything.":
    "Thứ kiểm chứng được là đầu vào. Bạn có thể xác định người mua trong ngành hàng của bạn áp những ràng buộc nào, danh mục của bạn trả lời được bao nhiêu trong số đó, và bao nhiêu khoảng trống có thể lấy lại từ phần văn bản bạn vốn đã xuất bản. Đó là một phép đo chứ không phải một dự phóng, và nó có sẵn mà không phải chờ đợi điều gì.",

  /* ---- feed-attributes-and-shopping-ads --------------------------------- */
  "Shopping ads are most of retail search spend, and your feed decides what they match":
    "Quảng cáo Shopping chiếm phần lớn chi tiêu tìm kiếm ngành bán lẻ, và nguồn cấp dữ liệu của bạn quyết định chúng khớp với gì",
  "76% of retail search ad spend goes to Shopping formats. Those formats match on feed attributes, which makes a missing field a bidding problem you cannot fix by bidding.":
    "76% ngân sách quảng cáo tìm kiếm ngành bán lẻ chảy vào các định dạng Shopping. Những định dạng đó khớp theo thuộc tính trong nguồn cấp dữ liệu, biến một trường còn thiếu thành một vấn đề đấu giá mà bạn không thể sửa bằng cách đấu giá.",
  "Your feed decides what Shopping ads match":
    "Nguồn cấp quyết định quảng cáo Shopping khớp gì",
  "76% of retail search ad spend goes to Shopping formats. They match on feed attributes, so a missing field is a bidding problem bidding cannot fix.":
    "76% chi tiêu quảng cáo tìm kiếm bán lẻ chảy vào định dạng Shopping. Chúng khớp theo thuộc tính nguồn cấp, nên trường còn thiếu là lỗi mà đấu giá không sửa.",
  "Paid media": "Quảng cáo trả phí",
  "21 August 2026": "Ngày 21 tháng 8 năm 2026",
  "Shopping formats now take the large majority of retail search spend: 76% of retail search ad budget, and 85% of clicks on retail ads, go to Shopping rather than to text ads. That concentration means the mechanism those formats use to decide what you match against is worth understanding precisely.":
    "Các định dạng Shopping hiện chiếm phần áp đảo trong chi tiêu tìm kiếm ngành bán lẻ: 76% ngân sách quảng cáo tìm kiếm bán lẻ, và 85% số lượt nhấp vào quảng cáo bán lẻ, chảy vào Shopping thay vì quảng cáo văn bản. Mức tập trung đó có nghĩa là cơ chế mà các định dạng này dùng để quyết định bạn khớp với gì rất đáng được hiểu cho chính xác.",
  "The mechanism is your product feed. Not your landing page, not your ad copy, not your bidding strategy. A query is matched against the attributes in the feed, and a field you never recorded is a set of queries you cannot be matched to.":
    "Cơ chế đó là nguồn cấp dữ liệu sản phẩm của bạn. Không phải trang đích, không phải nội dung quảng cáo, không phải chiến lược đấu giá. Một truy vấn được khớp với các thuộc tính trong nguồn cấp, và một trường bạn chưa bao giờ ghi nhận chính là cả một nhóm truy vấn mà bạn không thể được khớp tới.",
  "of retail search ad spend goes to Shopping formats, which match on feed attributes":
    "chi tiêu quảng cáo tìm kiếm ngành bán lẻ chảy vào các định dạng Shopping, vốn khớp theo thuộc tính nguồn cấp dữ liệu",
  "Where retail search money and clicks actually go":
    "Tiền và lượt nhấp trong tìm kiếm ngành bán lẻ thực sự chảy về đâu",
  "Retail search spend on Shopping": "Chi tiêu tìm kiếm bán lẻ cho Shopping",
  "Retail ad clicks from Shopping":
    "Lượt nhấp quảng cáo bán lẻ đến từ Shopping",
  "Both are matched on feed attributes rather than on ad copy or landing page.":
    "Cả hai đều được khớp theo thuộc tính nguồn cấp dữ liệu, chứ không theo nội dung quảng cáo hay trang đích.",
  "The expensive half is the one that looks fine":
    "Nửa tốn kém lại chính là nửa trông có vẻ ổn",
  "There are two outcomes when a high-intent query names an attribute your feed does not carry. The first is that you are not matched at all, which costs you the impression and is invisible. The second is that you get matched loosely against a broader query, and you pay for a click from somebody looking for something else.":
    "Có hai kết cục khi một truy vấn có ý định mua cao nêu đích danh một thuộc tính mà nguồn cấp của bạn không có. Thứ nhất là bạn hoàn toàn không được khớp, khiến bạn mất lượt hiển thị và điều đó vô hình. Thứ hai là bạn được khớp một cách lỏng lẻo với một truy vấn rộng hơn, và bạn trả tiền cho một lượt nhấp từ người đang tìm thứ khác.",
  "The second outcome is the problem, and campaign reporting cannot distinguish it from ordinary underperformance. It arrives as a click that did not convert. The natural response is to adjust bids and tighten negatives, neither of which touches the cause.":
    "Kết cục thứ hai mới là vấn đề, và báo cáo chiến dịch không phân biệt được nó với tình trạng kém hiệu quả thông thường. Nó hiện ra như một lượt nhấp không chuyển đổi. Phản ứng tự nhiên là chỉnh giá thầu và siết từ khoá phủ định, mà cả hai đều không chạm tới nguyên nhân.",
  "A missing feed attribute does not look like a data problem in your reporting. It looks like a click that did not convert.":
    "Một thuộc tính nguồn cấp còn thiếu không hiện ra như một vấn đề dữ liệu trong báo cáo của bạn. Nó hiện ra như một lượt nhấp không chuyển đổi.",
  "What the platforms say about identifiers":
    "Các nền tảng nói gì về mã định danh",
  "Google reports that retailers who added correct GTINs to their product data saw a 20% increase in clicks on average. Agency analyses of feed optimisation programmes report larger effects, including a roughly 70% ROAS improvement and 4.4% CTR growth in one published case, though those come from practitioners describing their own work and should be read with that in mind.":
    "Google cho biết những nhà bán lẻ bổ sung mã GTIN chính xác vào dữ liệu sản phẩm ghi nhận mức tăng trung bình 20% về lượt nhấp. Các phân tích của agency về chương trình tối ưu nguồn cấp báo cáo hiệu quả lớn hơn, trong đó có một trường hợp công bố mức cải thiện ROAS khoảng 70% và CTR tăng 4,4%, dù những con số đó đến từ chính những người làm nghề mô tả công việc của họ và nên được đọc với lưu ý đó.",
  "The point is not the specific numbers. It is that the lever sits upstream of everything a paid media team normally controls.":
    "Điểm mấu chốt không nằm ở những con số cụ thể. Nó nằm ở chỗ cần gạt này nằm ở thượng nguồn của mọi thứ mà một đội quảng cáo trả phí thường kiểm soát.",
  "Disapprovals first, then the quiet gaps":
    "Xử lý các mục bị từ chối trước, rồi mới tới những khoảng trống im lặng",
  "Feed disapprovals and limited-performance warnings should be cleared first, because they are binary and the platform tells you about them. What the platform cannot tell you is which of the attributes it permits to be empty are the ones buyers in your category actually decide on.":
    "Những mục bị từ chối trong nguồn cấp và các cảnh báo hiệu suất hạn chế nên được xử lý trước, vì chúng rạch ròi có hoặc không và nền tảng có báo cho bạn. Thứ nền tảng không thể nói cho bạn biết là trong số những thuộc tính mà nó cho phép để trống, thuộc tính nào mới là thứ người mua trong ngành hàng của bạn thực sự dựa vào để quyết định.",
  "A feed can be fully approved, carry no warnings, and still be unable to answer the queries worth winning. Ranking the optional fields by what they would be worth, rather than by whether they are flagged, is the part nobody's dashboard does.":
    "Một nguồn cấp dữ liệu có thể được duyệt hoàn toàn, không mang cảnh báo nào, mà vẫn không trả lời nổi những truy vấn đáng thắng. Xếp hạng các trường không bắt buộc theo giá trị chúng mang lại, thay vì theo việc chúng có bị gắn cờ hay không, là phần việc mà không bảng điều khiển nào làm.",

  /* ---- marketplace-coverage-hides-the-drop ------------------------------ */
  "Catalogue-wide coverage cannot tell you a seller just broke a category":
    "Độ phủ tính trên toàn danh mục không cho bạn biết một người bán vừa làm hỏng cả một ngành hàng",
  "Onboard four thousand listings into a million-listing marketplace and coverage barely moves. The category those listings landed in can become unshoppable and nothing in the reporting says so.":
    "Đưa bốn nghìn tin đăng vào một sàn có một triệu tin đăng thì độ phủ gần như không nhúc nhích. Ngành hàng mà số tin đăng đó rơi vào có thể trở nên không mua nổi, mà chẳng có gì trong báo cáo nói ra điều đó.",
  "Coverage cannot tell you a category broke":
    "Độ phủ không cho biết một ngành hàng đã hỏng",
  "Onboard four thousand listings into a million-listing marketplace and coverage barely moves. The category they landed in can go unshoppable in silence.":
    "Đưa bốn nghìn tin đăng vào một sàn một triệu tin thì độ phủ gần như không đổi. Ngành hàng chúng rơi vào vẫn có thể trở nên không mua nổi, trong im lặng.",
  "14 August 2026": "Ngày 14 tháng 8 năm 2026",
  "Averages hide distributions. That is a truism everywhere and it has a specific, expensive consequence on a marketplace.":
    "Số trung bình che giấu phân phối. Đó là điều hiển nhiên ở mọi nơi, và trên một sàn thương mại nó có một hệ quả rất cụ thể và rất tốn kém.",
  "Coverage reported across the whole catalogue takes a seller who fills every field and a seller who filled three, and returns a number in the middle. Onboard a large seller whose listings are thin and the whole-catalogue figure moves by a fraction of a percent, because four thousand listings against a million is noise. The category those listings landed in is now materially worse.":
    "Độ phủ báo cáo trên toàn danh mục lấy một người bán điền đủ mọi trường và một người bán chỉ điền ba trường, rồi trả về một con số nằm ở giữa. Đưa vào một người bán lớn có tin đăng sơ sài thì con số toàn danh mục chỉ dịch đi một phần nhỏ của một phần trăm, vì bốn nghìn tin đăng so với một triệu chỉ là nhiễu. Nhưng ngành hàng mà số tin đăng đó rơi vào thì nay đã tệ đi một cách đáng kể.",
  "Coverage averaged across a million listings cannot tell you that one seller just made a category unshoppable.":
    "Độ phủ lấy trung bình trên một triệu tin đăng không thể cho bạn biết rằng một người bán vừa khiến cả một ngành hàng không mua nổi.",
  "What a four-thousand-listing onboarding does to two different numbers":
    "Việc đưa vào bốn nghìn tin đăng tác động thế nào tới hai con số khác nhau",
  "illustrative, on a one-million-listing catalogue":
    "mang tính minh hoạ, trên một danh mục một triệu tin đăng",
  "Whole-catalogue coverage": "Độ phủ toàn danh mục",
  "That category's coverage": "Độ phủ của riêng ngành hàng đó",
  "Same event, two numbers. Only one of them is the one a buyer experiences, and it is not the one on the dashboard.":
    "Cùng một sự kiện, hai con số. Chỉ một trong hai là con số mà người mua thực sự trải nghiệm, và đó không phải con số trên bảng điều khiển.",
  "The buyer notices before the reporting does":
    "Người mua nhận ra trước cả báo cáo",
  "What the buyer experiences is a filter that stopped working. They narrow by material in a category that was fine last month, and now a third of the results have no material recorded. Either those listings vanish from the filtered set, which makes your inventory look thin, or the filter is quietly widened to keep them, which makes it look broken. Both teach the same lesson, which is that the filters on this marketplace are not to be trusted.":
    "Thứ người mua trải nghiệm là một bộ lọc ngừng hoạt động. Họ thu hẹp theo chất liệu trong một ngành hàng vốn vẫn ổn tháng trước, và giờ một phần ba kết quả không có chất liệu nào được ghi nhận. Hoặc những tin đăng đó biến mất khỏi tập đã lọc, khiến kho hàng của bạn trông mỏng đi, hoặc bộ lọc lặng lẽ được nới ra để giữ chúng lại, khiến nó trông như bị hỏng. Cả hai đều dạy cho người mua cùng một bài học, rằng bộ lọc trên sàn này không đáng tin.",
  "This matters more here than on a single-brand catalogue because you do not control who writes the data. A retailer with a coverage problem has a process problem it can fix internally. A marketplace has thousands of independent parties each making their own decision about how much effort to spend on a listing.":
    "Chuyện này ở đây hệ trọng hơn so với một danh mục một thương hiệu, vì bạn không kiểm soát được ai là người viết ra dữ liệu. Một nhà bán lẻ gặp vấn đề độ phủ là đang gặp vấn đề quy trình mà họ có thể tự sửa bên trong. Một sàn thương mại có hàng nghìn bên độc lập, mỗi bên tự quyết định sẽ bỏ ra bao nhiêu công sức cho một tin đăng.",
  "Measure where the buyer shops": "Hãy đo ở nơi người mua thực sự mua sắm",
  "The unit of measurement has to match the unit of the experience. A buyer does not shop your catalogue, they shop a category, so coverage has to be computed per category and attributed back to the sellers inside it.":
    "Đơn vị đo lường phải khớp với đơn vị trải nghiệm. Người mua không mua sắm trên cả danh mục của bạn, họ mua sắm trong một ngành hàng, nên độ phủ phải được tính theo từng ngành hàng và quy ngược về những người bán bên trong ngành hàng đó.",
  "What sellers actually respond to": "Điều người bán thực sự phản hồi",
  "Generic completeness nudges get ignored, and reasonably so: they treat every empty field as equally urgent, which is obviously untrue and the seller knows it. A request for three named fields, in one category, with a reason attached, is a different message and it gets acted on.":
    "Những lời nhắc chung chung về mức hoàn thiện sẽ bị bỏ qua, và cũng có lý: chúng coi mọi trường trống là cấp bách như nhau, điều hiển nhiên không đúng và người bán biết rõ điều đó. Một yêu cầu về ba trường được gọi tên cụ thể, trong một ngành hàng, kèm theo lý do, là một thông điệp khác hẳn và nó được thực hiện.",
  "Producing that message requires knowing which three, which is a ranking problem rather than a reporting one.":
    "Để tạo ra thông điệp đó thì phải biết là ba trường nào, và đó là bài toán xếp hạng chứ không phải bài toán báo cáo.",
  "Per category, not per catalogue, because that is the set a filter operates on":
    "Theo từng ngành hàng, không phải theo cả danh mục, vì đó mới là tập hàng mà một bộ lọc vận hành trên đó",
  "Attributed per seller, so an onboarding event is visible as a cause rather than as a mystery":
    "Quy về từng người bán, để một đợt đưa hàng mới vào hiện ra như một nguyên nhân chứ không phải một điều bí ẩn",
  "Weighted by whether a purchase in that category turns on the attribute, so effort goes to the three fields that matter rather than to every empty cell":
    "Có trọng số theo việc một giao dịch trong ngành hàng đó có xoay quanh thuộc tính này hay không, để công sức dồn vào ba trường thực sự quan trọng thay vì vào mọi ô trống",
  "Tracked over time, because the failure mode here is a step change on a Tuesday rather than a gradual decline":
    "Theo dõi theo thời gian, vì kiểu hỏng ở đây là một cú tụt đột ngột vào một ngày thứ Ba chứ không phải sự suy giảm từ từ",

  /* ---- specs-in-pdfs-are-missing-specs ---------------------------------- */
  "Your specifications are not missing. They are in a PDF, which is the same thing.":
    "Thông số kỹ thuật của bạn không hề thiếu. Chúng nằm trong một file PDF, mà như thế thì cũng vậy thôi.",
  "Industrial catalogues were built for buyers who know the part number. Everyone else is filtering on thread size and voltage, and those live in a supplier datasheet nobody mapped.":
    "Danh mục hàng công nghiệp được dựng cho những người mua đã biết mã linh kiện. Những người còn lại thì đang lọc theo cỡ ren và điện áp, mà hai thứ đó nằm trong bảng thông số của nhà cung cấp mà chẳng ai ánh xạ vào hệ thống.",
  "Specifications in a PDF are missing specifications":
    "Thông số trong PDF là thông số còn thiếu",
  "Industrial catalogues were built for buyers who know the part number. Everyone else filters on thread size and voltage, which sit in an unmapped datasheet.":
    "Danh mục hàng công nghiệp được dựng cho người mua đã biết mã linh kiện. Những người còn lại lọc theo cỡ ren và điện áp, nằm trong bảng thông số chưa ánh xạ.",
  "7 August 2026": "Ngày 7 tháng 8 năm 2026",
  "Distribution catalogues have a particular origin that still shapes them. They were digitised from printed price lists, and a printed price list is an ordering instrument: it assumes the reader has already decided and needs the code. Search by part number works beautifully because that is the job the structure was built for.":
    "Danh mục của ngành phân phối có một nguồn gốc riêng vẫn còn định hình chúng tới hôm nay. Chúng được số hoá từ các bảng giá in, và một bảng giá in là công cụ để đặt hàng: nó mặc định người đọc đã quyết định xong và chỉ cần mã hàng. Tìm theo mã linh kiện hoạt động rất tốt, vì đó đúng là việc mà cấu trúc này được dựng ra để làm.",
  "The buyer who has not decided is doing something else entirely. They have a specification to meet, and they are trying to find every part in your range that meets it.":
    "Người mua chưa quyết định thì đang làm một việc hoàn toàn khác. Họ có một yêu cầu kỹ thuật phải đáp ứng, và họ đang cố tìm mọi linh kiện trong dải hàng của bạn đáp ứng được yêu cầu đó.",
  "Eleven parts fit and the site can show you all eleven":
    "Mười một linh kiện phù hợp, và website có thể cho bạn xem đủ mười một",
  "An engineer needs a valve rated to a pressure, in a thread size. Your catalogue contains eleven that qualify. The website can list them, ordered by part number, and it cannot filter by either of the two properties that decide the purchase.":
    "Một kỹ sư cần một chiếc van chịu được một mức áp suất, với một cỡ ren nhất định. Danh mục của bạn có mười một chiếc đạt yêu cầu. Website có thể liệt kê chúng, sắp theo mã linh kiện, nhưng không thể lọc theo bất kỳ thuộc tính nào trong hai thuộc tính quyết định việc mua.",
  "So they call. The sales desk answers the same specification question repeatedly and files it under service, because the catalogue was never expected to answer it. That is a reasonable thing to believe about a catalogue built from a price list, and it is no longer true about what buyers expect.":
    "Thế là họ gọi điện. Bộ phận bán hàng trả lời đi trả lời lại cùng một câu hỏi kỹ thuật và xếp nó vào mục chăm sóc khách hàng, vì danh mục vốn chưa bao giờ được kỳ vọng sẽ trả lời câu hỏi đó. Với một danh mục dựng từ bảng giá in thì niềm tin ấy là hợp lý, nhưng nó không còn đúng với điều người mua kỳ vọng ngày nay.",
  "The spec is not missing. It is in a PDF, which is the same as missing to everyone except the person who already knows the part number.":
    "Thông số không hề thiếu. Nó nằm trong một file PDF, mà điều đó tương đương với việc thiếu đối với tất cả mọi người, trừ người đã biết sẵn mã linh kiện.",
  "Why this sector is the cheapest to fix":
    "Vì sao ngành này lại rẻ nhất để sửa",
  "The distinguishing fact about distribution is that the data almost always exists. It arrived with the range, in a supplier datasheet, as a table in a PDF. Nobody mapped it into a field because nobody needed it in a field while part-number search was sufficient.":
    "Điểm đặc trưng của ngành phân phối là dữ liệu gần như luôn luôn tồn tại. Nó đến cùng với dải hàng, trong một bảng thông số của nhà cung cấp, dưới dạng một bảng trong file PDF. Không ai ánh xạ nó vào một trường dữ liệu, vì không ai cần nó nằm trong một trường khi tìm theo mã linh kiện vẫn còn đủ dùng.",
  "That makes most of the work mapping rather than acquisition, and the two differ by an order of magnitude in cost. The question worth answering before budgeting is which of your gaps are which.":
    "Điều đó khiến phần lớn công việc là ánh xạ chứ không phải đi thu thập, và chi phí của hai việc này chênh nhau cả một bậc. Câu hỏi đáng trả lời trước khi lập ngân sách là trong các khoảng trống của bạn, cái nào thuộc loại nào.",
  "The argument that lands internally":
    "Lập luận có sức thuyết phục trong nội bộ",
  "Specification search is not a better version of part-number search. It serves a different customer: the one evaluating you against an alternative, and the one specifying a new build who has no incumbent relationship with you at all.":
    "Tìm kiếm theo thông số kỹ thuật không phải là phiên bản tốt hơn của tìm kiếm theo mã linh kiện. Nó phục vụ một nhóm khách khác: người đang cân nhắc bạn với một lựa chọn thay thế, và người đang lên cấu hình cho một công trình mới mà chưa từng có quan hệ sẵn có nào với bạn.",
  "Part-number search serves the customers you already have. Specification search is how you get the next ones, and it is also the most direct route to reducing the load on a sales desk that is currently acting as the catalogue's query interface.":
    "Tìm theo mã linh kiện phục vụ những khách hàng bạn đã có. Tìm theo thông số kỹ thuật là cách bạn có được những khách hàng tiếp theo, và cũng là con đường trực tiếp nhất để giảm tải cho bộ phận bán hàng, nơi hiện đang đóng vai giao diện truy vấn của danh mục.",
  "We will not put a number on that reduction, because we have not measured one on your traffic. The questions your desk repeats every week are a good place to point the measurement.":
    "Chúng tôi sẽ không đưa ra con số cho mức giảm tải đó, vì chúng tôi chưa đo trên lưu lượng của bạn. Những câu hỏi mà bộ phận của bạn lặp lại mỗi tuần là chỗ tốt để bắt đầu đo.",

  /* ---- amenities-written-as-prose --------------------------------------- */
  "Travel filters return everything, because almost nothing is tagged":
    "Bộ lọc du lịch trả về gần như mọi thứ, vì gần như chẳng có gì được gắn thẻ",
  "A traveller who needs step-free access and a cot is reading forty descriptions looking for two sentences. The facts are usually written down. They are just not fields.":
    "Một du khách cần lối vào không bậc thang và một chiếc cũi trẻ em đang phải đọc bốn mươi bản mô tả để tìm hai câu văn. Những dữ kiện đó thường đã được viết ra. Chỉ là chúng không phải trường dữ liệu.",
  "Travel filters return almost everything":
    "Bộ lọc du lịch trả về gần như mọi thứ",
  "A traveller needing step-free access and a cot reads forty descriptions looking for two sentences. The facts are written down. They are just not fields.":
    "Du khách cần lối vào không bậc thang và một chiếc cũi phải đọc bốn mươi bản mô tả để tìm hai câu. Dữ kiện đã được viết ra, chỉ là không phải trường dữ liệu.",
  "31 July 2026": "Ngày 31 tháng 7 năm 2026",
  "Travel inventory is described by people whose job is to make it sound appealing. That produces prose, and prose is the right medium for persuasion and the wrong one for comparison.":
    "Hàng tồn trong ngành du lịch được mô tả bởi những người có nhiệm vụ làm cho nó nghe thật hấp dẫn. Việc đó sinh ra văn xuôi, mà văn xuôi là phương tiện đúng để thuyết phục và là phương tiện sai để so sánh.",
  "The result is a results page where price and star rating are filterable because they are numbers that arrived structured, and everything a traveller actually needs to check is a paragraph.":
    "Kết quả là một trang kết quả nơi giá và hạng sao thì lọc được, vì chúng là những con số đến sẵn ở dạng có cấu trúc, còn mọi thứ du khách thực sự cần kiểm tra thì lại là một đoạn văn.",
  "Why the filters appear broken": "Vì sao các bộ lọc trông như bị hỏng",
  "A filter can only exclude inventory that has been tagged. Most systems, faced with untagged inventory, keep it in the results rather than dropping it, because dropping it would hide bookable stock. So a filter that almost nothing is tagged against excludes almost nothing.":
    "Một bộ lọc chỉ có thể loại trừ phần hàng đã được gắn thẻ. Phần lớn hệ thống, khi gặp hàng chưa gắn thẻ, sẽ giữ nó lại trong kết quả thay vì loại ra, vì loại ra đồng nghĩa với việc che đi lượng hàng còn đặt được. Thế nên một bộ lọc mà gần như không có gì được gắn thẻ theo nó thì gần như chẳng loại trừ được gì.",
  "From the traveller's side this is indistinguishable from a broken filter, and they stop using them. Which means the one mechanism you have for helping them narrow forty options is now something they have learned to ignore.":
    "Từ phía du khách, điều này không khác gì một bộ lọc bị hỏng, và họ ngừng dùng bộ lọc. Nghĩa là cơ chế duy nhất bạn có để giúp họ thu hẹp bốn mươi lựa chọn nay đã thành thứ họ học được cách phớt lờ.",
  "Accessibility and family requirements are the ones travellers cannot compromise on, and usually the ones nobody made filterable.":
    "Yêu cầu về khả năng tiếp cận và về gia đình là những yêu cầu du khách không thể thoả hiệp, và thường cũng là những yêu cầu không ai làm cho lọc được.",
  "What a traveller can filter on, against what they need to know":
    "Thứ du khách lọc được, đặt cạnh thứ họ cần biết",
  "illustrative of the shape of travel inventory":
    "mang tính minh hoạ cho hình dạng dữ liệu hàng tồn ngành du lịch",
  "Star rating": "Hạng sao",
  "Late check-in": "Nhận phòng muộn",
  "Cot available": "Có cũi trẻ em",
  "Step-free access": "Lối vào không bậc thang",
  "The attribute recorded almost everywhere is the one almost nobody decides on. The measured figures on this site are the test shelf's, on the method page.":
    "Thuộc tính được ghi nhận ở gần như mọi nơi lại là thuộc tính gần như không ai dựa vào để quyết định. Những con số đo được trên website này là của kệ thử nghiệm, nằm ở trang phương pháp.",
  "The cost lands after the booking":
    "Cái giá phải trả rơi xuống sau khi đã đặt phòng",
  "In retail, an unfilterable attribute costs you a sale you never see. In travel it frequently costs more than that, because the traveller books anyway and finds out on arrival.":
    "Trong bán lẻ, một thuộc tính không lọc được khiến bạn mất một đơn hàng mà bạn không bao giờ nhìn thấy. Trong du lịch, nó thường tốn kém hơn thế, vì du khách vẫn cứ đặt phòng rồi mới phát hiện ra khi tới nơi.",
  "Someone who needed step-free access and got three flights of stairs generates a complaint, a refund, and a review that outlives both. The attribute would have been cheaper than any one of those.":
    "Một người cần lối vào không bậc thang mà nhận được ba tầng cầu thang sẽ tạo ra một khiếu nại, một khoản hoàn tiền, và một bài đánh giá sống lâu hơn cả hai thứ kia. Ghi nhận thuộc tính đó hẳn đã rẻ hơn bất kỳ thứ nào trong số đó.",
  "Most of it is extraction, not acquisition":
    "Phần lớn công việc là trích xuất, không phải đi thu thập",
  'The encouraging part is that the facts are usually already written. "Lift to all floors" is in the description. "Cots available on request" is in the description. They are sentences rather than fields, which is exactly the case that is cheap to recover from text you already hold.':
    'Phần đáng mừng là những dữ kiện đó thường đã được viết ra sẵn. "Thang máy tới mọi tầng" nằm trong phần mô tả. "Có cũi trẻ em theo yêu cầu" nằm trong phần mô tả. Chúng là những câu văn chứ không phải trường dữ liệu, mà đó đúng là trường hợp rẻ nhất để lấy lại từ phần văn bản bạn vốn đã có.',
  "Whether a recovered fact is accurate enough to publish is a judgement only you can make, particularly for accessibility, where being wrong is worse than being silent. What a measurement can tell you is which absent facts are costing the most, so the verification effort goes somewhere useful.":
    "Một dữ kiện lấy lại được có đủ chính xác để xuất bản hay không là phán đoán chỉ bạn mới đưa ra được, nhất là với khả năng tiếp cận, nơi mà sai còn tệ hơn là im lặng. Thứ một phép đo có thể nói cho bạn biết là những dữ kiện còn vắng mặt nào đang gây tốn kém nhất, để công sức xác minh được dồn vào chỗ có ích.",
  "Take one property set and list the constraints travellers cannot compromise on: access, family, late arrival, parking":
    "Hãy lấy một nhóm cơ sở lưu trú và liệt kê những ràng buộc du khách không thể thoả hiệp: khả năng tiếp cận, nhu cầu gia đình, tới muộn, chỗ đỗ xe",
  "Check which of those exist as structured values rather than as sentences":
    "Hãy kiểm tra xem bao nhiêu trong số đó tồn tại dưới dạng giá trị có cấu trúc thay vì chỉ là câu văn",
  "For the sentences, that is extraction, and it is usually the largest and cheapest share":
    "Với những câu văn thì đó là việc trích xuất, và thường là phần lớn nhất và rẻ nhất",
  "Where a fact arrives from one supplier and not another, that is mapping, which is a different cost again":
    "Khi một dữ kiện đến từ nhà cung cấp này mà không đến từ nhà cung cấp kia thì đó là việc ánh xạ, lại là một loại chi phí khác nữa",

  /* ---- what-one-bit-buys ------------------------------------------------ */
  "What one bit of decision information actually buys you":
    "Một bit thông tin quyết định thực sự mua được gì cho bạn",
  "A bit is one halving of the shelf. That fixed meaning is the only reason two attributes as different as screen size and processor can be compared at all.":
    "Một bit là một lần chia đôi kệ hàng. Chính ý nghĩa cố định đó là lý do duy nhất khiến hai thuộc tính khác nhau như kích thước màn hình và vi xử lý có thể đem ra so sánh với nhau.",
  "What one bit of decision information buys":
    "Một bit thông tin quyết định mua được gì",
  "A bit is one halving of the shelf. That fixed meaning is why two attributes as unlike as screen size and processor can be compared against each other at all.":
    "Một bit là một lần chia đôi kệ hàng. Ý nghĩa cố định đó là lý do hai thuộc tính khác nhau như kích thước màn hình và vi xử lý so sánh được với nhau.",
  "24 July 2026": "Ngày 24 tháng 7 năm 2026",
  "Every ranking we publish is denominated in bits, which is an unusual unit for a product data discussion and worth explaining rather than asserting.":
    "Mọi bảng xếp hạng chúng tôi công bố đều tính bằng bit, một đơn vị khá lạ trong câu chuyện dữ liệu sản phẩm, nên đáng được giải thích chứ không phải chỉ nêu ra.",
  "The reason is that the question is genuinely about information. A shopper facing a shelf has a set of candidates and is trying to reduce it. Every fact they learn removes some of that uncertainty. Information theory has measured exactly that since 1948, and the unit it measures it in is the bit.":
    "Lý do là vì câu hỏi ở đây thực sự là câu hỏi về thông tin. Một người mua đứng trước kệ hàng có một tập ứng viên và đang cố thu hẹp nó lại. Mỗi dữ kiện họ biết thêm sẽ gỡ bỏ một phần của sự bất định đó. Lý thuyết thông tin đã đo đúng điều này từ năm 1948, và đơn vị nó dùng để đo chính là bit.",
  "1 bit": "1 bit",
  "means a shopper can rule out half the shelf":
    "nghĩa là người mua loại được một nửa kệ hàng",
  "the definition, not a scaled score":
    "là định nghĩa, không phải một điểm số quy đổi",
  "Why not a percentage complete": "Vì sao không dùng phần trăm hoàn thiện",
  "Completeness cannot compare unlike fields. Screen size at 60% and processor at 25% tells you which is emptier and nothing about which is worth filling. They are the same unit measuring different things.":
    "Mức hoàn thiện không so sánh được những trường khác loại nhau. Kích thước màn hình đạt 60% và vi xử lý đạt 25% chỉ cho bạn biết trường nào trống hơn, chứ không nói gì về trường nào đáng điền. Chúng là cùng một đơn vị dùng để đo những thứ khác nhau.",
  "Bits are comparable because the thing being measured is the same in both cases: how much does knowing this narrow the choice? An attribute recorded on every product with an identical value scores zero, correctly, because knowing it removes nothing. An attribute recorded on nothing scores zero today and can score very highly once populated, which is the distinction that matters for planning.":
    "Bit thì so sánh được, vì thứ được đem đo là như nhau trong cả hai trường hợp: biết điều này thì thu hẹp được lựa chọn bao nhiêu? Một thuộc tính được ghi nhận trên mọi sản phẩm với cùng một giá trị sẽ được 0 điểm, và như vậy là đúng, vì biết nó chẳng loại bỏ được gì. Một thuộc tính chưa được ghi nhận ở đâu cả thì hôm nay được 0 điểm và có thể đạt điểm rất cao khi được điền, và đó mới là sự phân biệt quan trọng cho việc lập kế hoạch.",
  "How many products a shopper is still choosing between, per bit learned":
    "Người mua còn phải chọn giữa bao nhiêu sản phẩm, theo từng bit biết thêm",
  "the definition of a bit, applied to a 216-product shelf":
    "định nghĩa của một bit, áp lên một kệ hàng 216 sản phẩm",
  "0 bits": "0 bit",
  "2 bits": "2 bit",
  "3 bits": "3 bit",
  "One bit halves the shelf. That fixed meaning is why screen size and processor can be compared at all.":
    "Một bit chia đôi kệ hàng. Chính ý nghĩa cố định đó là lý do kích thước màn hình và vi xử lý có thể đem ra so sánh với nhau.",
  "The second half is demand": "Nửa còn lại là nhu cầu",
  "Information alone is not enough. A field could partition the catalogue perfectly and still be worthless if no purchase decision turns on it. So each attribute is also scored against the stated requirements for the category, and a field nobody's decision depends on scores near zero however neatly it divides the shelf.":
    "Chỉ riêng thông tin thì chưa đủ. Một trường dữ liệu có thể chia tách danh mục một cách hoàn hảo mà vẫn vô giá trị, nếu không quyết định mua nào xoay quanh nó. Vậy nên mỗi thuộc tính còn được chấm theo những yêu cầu đã được nêu ra của ngành hàng, và một trường mà không quyết định của ai phụ thuộc vào thì sẽ gần như 0 điểm, dù nó chia kệ hàng gọn gàng đến đâu.",
  "This is where our ranking and a coverage ranking come apart. On our test shelf, processor was missing on 162 of 216 products, third by absence. Only 2 of 32 stated requirements mentioned a processor, which put it last by demand. Storage and processor swapped places, and that swap is the entire argument for measuring demand rather than absence.":
    "Đây chính là chỗ bảng xếp hạng của chúng tôi và bảng xếp hạng theo độ phủ tách khỏi nhau. Trên kệ thử nghiệm, vi xử lý thiếu ở 162 trên 216 sản phẩm, đứng hạng ba theo sự vắng mặt. Chỉ 2 trên 32 yêu cầu được nêu ra có nhắc tới vi xử lý, đưa nó xuống hạng chót theo nhu cầu. Dung lượng và vi xử lý đổi chỗ cho nhau, và chính cú đổi chỗ đó là toàn bộ lập luận cho việc đo nhu cầu thay vì đo sự vắng mặt.",
  "Fixing the emptiest field first would have been the most expensive way to change nothing.":
    "Sửa trường trống nhất trước sẽ là cách tốn kém nhất để chẳng thay đổi được gì.",
  "What we cannot stand behind": "Điều chúng tôi không thể bảo chứng",
  "Screen size came first in 12 of 12 runs across every seed, weighting and imputation scope we tested. Positions two through four moved between runs. We publish the whole ranking because it is informative and we say plainly that only the top of it is stable.":
    "Kích thước màn hình đứng đầu ở 12 trên 12 lần chạy, qua mọi hạt giống ngẫu nhiên, mọi cách đặt trọng số và mọi phạm vi điền khuyết mà chúng tôi thử. Các vị trí từ hai tới bốn thì thay đổi giữa các lần chạy. Chúng tôi vẫn công bố toàn bộ bảng xếp hạng vì nó có ích, và nói thẳng rằng chỉ phần đầu bảng là ổn định.",
  "There is also a real limitation in how we simulate a completed catalogue: we can only use values the shelf already records. Where an attribute's recorded values are unrepresentative of its true range, that simulation is wrong in a way we can name and cannot yet correct. It needs a value distribution from outside the catalogue being repaired.":
    "Còn một hạn chế thực sự nữa trong cách chúng tôi mô phỏng một danh mục đã hoàn chỉnh: chúng tôi chỉ dùng được những giá trị mà kệ hàng vốn đã ghi nhận. Khi các giá trị đã ghi nhận của một thuộc tính không đại diện cho dải giá trị thật của nó, phép mô phỏng đó sai theo một cách mà chúng tôi gọi tên được nhưng chưa sửa được. Nó cần một phân phối giá trị đến từ bên ngoài danh mục đang được sửa.",
  "The measurement and the fixture it ran against are both in our repository, and one command regenerates every figure above. That is the property we would most want from a vendor making claims about our data, so it is the one we built for.":
    "Phép đo và bộ dữ liệu mà nó chạy trên đó đều nằm trong kho mã nguồn của chúng tôi, và một câu lệnh duy nhất tái tạo lại mọi con số ở trên. Đó là tính chất mà chính chúng tôi mong muốn nhất ở một nhà cung cấp đưa ra tuyên bố về dữ liệu của mình, nên đó cũng là tính chất chúng tôi xây dựng hướng tới.",

  /* ---- why-there-is-no-uplift-number ------------------------------------ */
  "Why there is no conversion figure anywhere on this site":
    "Vì sao không có con số chuyển đổi nào trên khắp website này",
  "We have run no live experiment on merchant traffic, so we have no uplift number. Here is the experiment we would run instead, and why publishing the design is worth more than publishing a percentage.":
    "Chúng tôi chưa chạy thử nghiệm thực tế nào trên lưu lượng của nhà bán, nên chúng tôi không có con số cải thiện nào. Dưới đây là thử nghiệm mà chúng tôi sẽ chạy để thay thế, và vì sao công bố thiết kế của nó đáng giá hơn công bố một con số phần trăm.",
  "Why there is no conversion figure here":
    "Vì sao ở đây không có con số chuyển đổi nào",
  "We have run no live experiment on merchant traffic, so we publish no uplift number. Here is the experiment we would run, and why its design is worth more.":
    "Chúng tôi chưa chạy thử nghiệm thực tế nào trên lưu lượng của nhà bán, nên không công bố con số cải thiện nào. Đây là thử nghiệm chúng tôi sẽ chạy thay vào đó.",
  "How we work": "Cách chúng tôi làm việc",
  "17 July 2026": "Ngày 17 tháng 7 năm 2026",
  "Every vendor in this category leads with a percentage. Conversion up by some amount, revenue per session up by another. We do not have one, and this is the page that explains why rather than burying it.":
    "Mọi nhà cung cấp trong lĩnh vực này đều mở đầu bằng một con số phần trăm. Chuyển đổi tăng bằng này, doanh thu mỗi phiên tăng bằng kia. Chúng tôi không có con số nào như vậy, và đây là trang giải thích lý do thay vì giấu nó đi.",
  "The reason is simple and not very flattering: we have not run a live experiment on a merchant's traffic. Without one, any figure we printed would either be someone else's store or an invention. Both are worthless to you and one of them is a lie.":
    "Lý do thì đơn giản và không mấy hay ho: chúng tôi chưa chạy một thử nghiệm thực tế nào trên lưu lượng của một nhà bán. Khi chưa có nó, bất kỳ con số nào chúng tôi in ra cũng hoặc là của cửa hàng người khác, hoặc là bịa ra. Cả hai đều vô giá trị với bạn, và một trong hai là nói dối.",
  "Anyone quoting you an uplift before running a test on your traffic is quoting someone else's store.":
    "Bất kỳ ai nêu cho bạn một con số cải thiện trước khi chạy thử nghiệm trên lưu lượng của bạn đều đang nêu con số của cửa hàng người khác.",
  "What we would run instead": "Thứ chúng tôi sẽ chạy để thay thế",
  "The absence of a number is not the absence of a plan. This is the experiment, and we would agree it with you before it starts rather than after it finishes.":
    "Không có con số không đồng nghĩa với không có kế hoạch. Đây là thử nghiệm đó, và chúng tôi sẽ thống nhất nó với bạn trước khi bắt đầu chứ không phải sau khi kết thúc.",
  "The held-back arm is why the runtime ships with a holdback percentage on by default rather than as a setting somebody remembers to enable. A deployment without a control arm produces numbers nobody should act on, including any we would report to you.":
    "Nhánh giữ lại chính là lý do bộ thực thi được phát hành với tỷ lệ lưu lượng giữ lại bật sẵn, thay vì là một tuỳ chọn mà ai đó phải nhớ bật. Một lần triển khai không có nhánh đối chứng sẽ tạo ra những con số mà không ai nên hành động dựa vào, kể cả những con số chúng tôi báo lại cho bạn.",
  "What we can tell you today, and what needs a test on your traffic":
    "Điều chúng tôi nói được với bạn hôm nay, và điều cần một thử nghiệm trên lưu lượng của bạn",
  "our own scope, stated plainly": "phạm vi của chính chúng tôi, nói thẳng ra",
  "Which fields to fix first": "Nên sửa những trường nào trước",
  "Whether the repair worked": "Việc sửa có hiệu quả hay không",
  "Effect on revenue": "Tác động tới doanh thu",
  "The first two are properties of your catalogue and available immediately. The third is a property of your visitors and is not.":
    "Hai điều đầu là đặc tính của danh mục của bạn và có ngay lập tức. Điều thứ ba là đặc tính của những người ghé thăm bạn, và nó thì không.",
  "What we can measure without an experiment":
    "Điều chúng tôi đo được mà không cần thử nghiệm",
  "There is a whole class of claim that does not need traffic, because it is a property of your catalogue rather than of your visitors.":
    "Có hẳn một nhóm tuyên bố không cần tới lưu lượng truy cập, vì chúng là đặc tính của danh mục của bạn chứ không phải của những người ghé thăm bạn.",
  "Whether your shelf can support the decisions buyers are trying to make is measurable the minute you paste your store's address. Whether a repair improved it is measurable the week you finish. Neither of those is a revenue claim and we are careful not to let them sound like one, but both are checkable immediately and both are actionable.":
    "Kệ hàng của bạn có đỡ nổi những quyết định mà người mua đang cố đưa ra hay không là thứ đo được ngay khi bạn dán địa chỉ website. Một lần sửa có cải thiện được điều đó hay không là thứ đo được ngay trong tuần bạn làm xong. Cả hai đều không phải tuyên bố về doanh thu và chúng tôi cẩn thận để chúng không nghe như vậy, nhưng cả hai đều kiểm chứng được ngay và đều hành động được.",
  "The cost of publishing this": "Cái giá của việc công bố điều này",
  "It loses us conversations with buyers who need a vendor that already has the case studies, which is a legitimate thing to need and we would rather they find out now than in month four.":
    "Nó khiến chúng tôi mất đi những cuộc trao đổi với các bên mua cần một nhà cung cấp đã có sẵn hồ sơ khách hàng điển hình, vốn là một nhu cầu chính đáng, và chúng tôi thà để họ biết điều đó ngay bây giờ còn hơn tới tháng thứ tư.",
  "What it buys is that everything else on this site can be read at face value. The figures we do publish come from a catalogue we measured ourselves, they are labelled as ours, and the command that regenerates them is on the method page. That is a smaller claim than a conversion percentage and it has the advantage of being checkable.":
    "Đổi lại, mọi thứ khác trên website này đều có thể được đọc đúng như nó nói. Những con số chúng tôi có công bố đến từ một danh mục do chính chúng tôi đo, chúng được ghi rõ là của chúng tôi, và câu lệnh tái tạo lại chúng nằm ở trang phương pháp. Đó là một tuyên bố nhỏ hơn một con số phần trăm chuyển đổi, và nó có lợi thế là kiểm chứng được.",
  "Eligibility: sessions reaching a category page in the pilot category":
    "Điều kiện tham gia: những phiên truy cập tới được một trang ngành hàng trong ngành hàng thí điểm",
  "Randomisation unit: the session, stable for its lifetime":
    "Đơn vị ngẫu nhiên hoá: phiên truy cập, giữ nguyên trong suốt vòng đời của nó",
  "Arms: the engine on, against your existing order, held back":
    "Các nhánh: bật bộ máy, so với thứ tự hiện có của bạn, có giữ lại một phần lưu lượng",
  "Primary metric: agreed with you before the pilot starts, not selected afterwards from whatever moved":
    "Chỉ số chính: thống nhất với bạn trước khi thí điểm bắt đầu, không phải chọn ra sau đó từ bất cứ thứ gì có biến động",
  "Guardrails: p95 latency, error rate, fallback rate":
    "Ngưỡng bảo vệ: độ trễ p95, tỷ lệ lỗi, tỷ lệ dùng phương án dự phòng",
  "Stopping rule: fixed in advance": "Quy tắc dừng: ấn định từ trước",
  "Reported: as a comparison against the held-back arm, including when the result is inconclusive":
    "Báo cáo: dưới dạng so sánh với nhánh giữ lại, kể cả khi kết quả không kết luận được",

  /* Our own pages, which are not citations: a reader following these lands on a Vietnamese page,
     so the label should be Vietnamese too. External publication names stay as published. */
  "Pulse: the method, with the command that reproduces every figure":
    "Pulse: phương pháp, kèm câu lệnh tái tạo lại mọi con số",
  "Pulse: the method, and the command that reproduces it":
    "Pulse: phương pháp, và câu lệnh tái tạo lại nó",
  "Pulse: what we cannot claim yet":
    "Pulse: những điều chúng tôi chưa thể khẳng định",

  /* A description of a source rather than the name of one. */
  "industry reporting on Google Ads retail spend":
    "báo cáo ngành về chi tiêu quảng cáo bán lẻ trên Google Ads",

  /* Chart suffixes. The leading spaces are the chart's own spacing and must survive the
     translation, which is why these are written out rather than trimmed. */
  "  measurable now": "  đo được ngay",
  "  needs a live test": "  cần một thử nghiệm thực tế",
  " left": " còn lại",
  " pt drop": " điểm sụt giảm",
};
