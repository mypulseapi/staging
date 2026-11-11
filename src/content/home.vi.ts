/**
 * Vietnamese homepage copy.
 *
 * First pass, written by an engineer rather than a translator: accurate and
 * idiomatic enough to ship internally, not reviewed by a native speaker. The
 * measured figures are identical to the English because they are measurements,
 * not marketing, and they do not get localised.
 */
export const HERO_VI = {
  eyebrow: "Trí tuệ dữ liệu sản phẩm",
  title: "Khám phá ý định của người mua và lỗ hổng danh mục",
  lede: "Pulse xếp hạng dữ liệu sản phẩm mà danh mục của bạn còn thiếu theo số người mua cần đến nó, chứ không theo mức độ trống của một trường dữ liệu.",
  primary: { label: "Yêu cầu Decision Audit", href: "/contact" },
  secondary: { label: "Xem cách hoạt động", href: "/product" },
  reassure:
    "Chỉ dữ liệu sản phẩm. Không hồ sơ khách hàng, không tích hợp, không ràng buộc.",
  pillars: [
    {
      name: "Kiểm tra",
      body: "Xếp hạng việc cần làm trước, đo theo quyết định mua thật.",
    },
    {
      name: "Xác minh",
      body: "Đo lại sau khi sửa và thấy chính xác điều gì đã thay đổi.",
    },
    {
      name: "Giám sát",
      body: "Phát hiện một nhóm hàng tụt trước khi người mua nhận ra.",
    },
  ],
} as const;

export const PROBLEM_VI = {
  eyebrow: "Điểm mù",
  title:
    "Cứ năm sản phẩm thì có một sản phẩm không ghi gì để người mua lọc được.",
  body: "Không kích cỡ, không dung lượng, không chất liệu, không form dáng. Dù ngành hàng của bạn quyết định bằng gì, dữ kiện thường vẫn nằm đâu đó. Chỉ là không nằm ở nơi bộ lọc với tới được.",
  example: {
    title: "Dell XPS 15 512GB 32GB RAM, Platinum Silver",
    caption:
      "Một ví dụ: dung lượng và RAM nằm trong một trường văn bản, thay vì trường mà bộ lọc đọc được. Ngành hàng của bạn có phiên bản riêng của dòng này.",
  },
  outcome:
    "Nên một người mua biết rõ mình muốn gì vẫn không tới được sản phẩm đó. Và bạn không bao giờ biết họ rời đi vì bạn không có hàng phù hợp, hay vì họ không tìm ra thứ bạn đang có.",
} as const;

export const STEPS_VI = {
  eyebrow: "Cách hoạt động",
  title: "Quy trình diễn ra thế nào?",
  items: [
    {
      n: "01",
      title: "Dán địa chỉ website",
      body: "Chúng tôi đọc các trang sản phẩm công khai của bạn: tên, mô tả, ngành hàng, giá và những thông tin mỗi trang nêu ra. Không mã nguồn, không thẻ theo dõi, không quyền truy cập hệ thống.",
      meta: "Bạn làm một lần",
    },
    {
      n: "02",
      title: "Nhận bản Decision Audit",
      body: "Trong vài phút: danh sách xếp hạng những gì cần ghi trước, các sản phẩm thiếu từng thông tin, nơi mỗi dữ kiện còn thiếu đang nằm, và chỉ số sẵn sàng quyết định của bạn.",
      meta: "Vài phút",
    },
    {
      n: "03",
      title: "Sửa, rồi xác minh",
      body: "Có thể bạn không cần đến chúng tôi cho phần sửa. Khi xong, chúng tôi đo lại trên danh mục đã sửa và cho thấy chính xác điều gì đã thay đổi. Không cần lưu lượng, không cần chờ.",
      meta: "Đội của bạn, hoặc của chúng tôi",
    },
  ],
} as const;

export const PROVENANCE_VI = {
  eyebrow: "Không phải khoảng trống nào cũng tốn như nhau",
  title: "Mỗi dữ kiện còn thiếu thực ra đang nằm ở đâu?",
  body: "Có khoảng trống bạn đóng được bằng một đoạn script trong tuần này. Có khoảng trống buộc bạn phải đi mua dữ liệu chưa từng có. Biết trước cái nào là cái nào chính là phần lớn giá trị.",
  items: [
    {
      label: "Trích xuất được",
      body: "Đã nằm sẵn trong tiêu đề và mô tả của bạn. Tự động, rẻ, và chúng tôi cho bạn thấy đã lấy lại được bao nhiêu.",
      stat: "Dung lượng: lấy lại được 161 trên 216",
      tone: "good",
    },
    {
      label: "Ánh xạ được",
      body: "Nằm trong nguồn dữ liệu nhà cung cấp bạn đã nhận, chỉ là chưa ánh xạ. Một lần tích hợp.",
      stat: "Một việc viết script, không phải một dự án",
      tone: "mid",
    },
    {
      label: "Phải đi thu thập",
      body: "Thực sự chưa được ghi ở đâu cả. Tốn kém thật, và đáng biết trước khi cam kết.",
      stat: "Vi xử lý: chỉ 54 trên 216 lấy lại được",
      tone: "hard",
    },
  ],
} as const;

export const HONESTY_VI = {
  eyebrow: "Điều chúng tôi sẽ không nói với bạn",
  title: "Vì sao chúng tôi không đưa ra con số tăng trưởng?",
  will: [
    "Xếp hạng dữ liệu còn thiếu đang kìm hãm danh mục, kèm danh sách sản phẩm",
    "Thử nghiệm đối chứng với một nhóm giữ lại trên chính lưu lượng của bạn",
    "Nói thẳng khi kết quả tiêu cực hoặc không kết luận được",
  ],
  wont: [
    "Nêu con số tăng trưởng trước khi đo được trên lưu lượng của bạn",
    "Đòi bạn thay công cụ tìm kiếm, gian hàng hay nền tảng",
    "Dùng dữ liệu của nhà bán này để cải thiện kết quả cho nhà bán khác",
  ],
  footnote:
    "Bất kỳ ai đưa bạn một con số chuyển đổi trước khi chạy thử nghiệm đều đang trích dẫn cửa hàng của người khác.",
} as const;

export const PRIVACY_VI = {
  eyebrow: "Dữ liệu của bạn",
  title: "Dữ liệu của bạn được xử lý thế nào?",
  points: [
    {
      title: "Chỉ dữ liệu sản phẩm",
      body: "Không hồ sơ khách hàng, không lịch sử đơn hàng, không dữ liệu cá nhân nào được dùng để chạy bản kiểm tra.",
    },
    {
      title: "Không cookie, không đăng nhập",
      body: "Bộ máy thời gian thực suy luận từ những gì diễn ra trong phiên hiện tại. Nó không cần danh tính để hoạt động.",
    },
    {
      title: "Cô lập theo từng khách hàng",
      body: "Chúng tôi không gộp chung danh mục, và dữ liệu của một nhà bán không bao giờ cải thiện kết quả cho nhà bán khác.",
    },
    {
      title: "Xoá theo yêu cầu",
      body: "Bao gồm mọi thứ bạn đã gửi cho chúng tôi, vào bất kỳ lúc nào, khi bạn yêu cầu.",
    },
  ],
} as const;

export const FINAL_CTA_VI = {
  title: "Gửi cho chúng tôi một ngành hàng. Xem kết quả trả về.",
  body: "Chọn nhóm hàng bạn nghi ngờ người mua gặp khó nhất. Bạn nhận được danh sách xếp hạng, các sản phẩm bị ảnh hưởng, và nửa giờ với người phụ trách trưng bày hàng hoá.",
  primary: { label: "Yêu cầu Decision Audit", href: "/contact" },
  secondary: { label: "Đọc phương pháp trước", href: "/research" },
  reassure:
    "Không ràng buộc ở bất kỳ bước nào. Và nếu danh mục của bạn vốn đã ổn, chúng tôi cũng sẽ nói vậy.",
} as const;

export const DISAGREEMENT_VI = {
  eyebrow: "Ngân sách đi về đâu",
  title: "Trường trống nhiều nhất thường là trường sai để sửa.",
  body: "Cả hai kế hoạch đều tốn một quý. Chỉ một trong hai thay đổi được điều người mua chọn được.",
  wrongLabel: "Sửa trường trống nhiều nhất",
  rightLabel: "Sửa trường quyết định",
  effortLabel: "Số sản phẩm phải động vào",
  gainLabel: "Số người mua được giúp",
  wrong: { effort: 162, gain: 6 },
  right: { effort: 80, gain: 94 },
  caveat:
    "Từ kệ hàng chúng tôi đo. Kích thước màn hình đứng đầu ở cả 12 lần chạy; các vị trí từ hai đến bốn có xê dịch, và chúng tôi thà nói vậy.",
} as const;

export const EXAMPLES_VI = {
  eyebrow: "Chuyện này trông như thế nào",
  title: "Hai kệ hàng, cùng một dữ kiện bị thiếu.",
  items: [
    {
      sector: "Hàng tiêu dùng",
      shopper: "Một người mẹ đang chọn bột giặt cho làn da của em bé.",
      missing:
        "Việc một gói có không hương liệu hay không được in trên bao bì và chụp lại, chứ không được ghi thành một trường dữ liệu.",
      cost: "Bộ lọc họ cần không tồn tại, nên một kệ bốn mươi gói vẫn cứ là một kệ bốn mươi gói.",
    },
    {
      sector: "Thương mại điện tử và điện tử",
      shopper:
        "Một nhà thiết kế đang mua laptop và cần màn hình đủ lớn để làm việc.",
      missing:
        "Kích thước màn hình nằm trong 136 trên 216 tiêu đề sản phẩm, và không nằm trong thuộc tính của ai cả.",
      cost: "Trên kệ thử nghiệm, 94 trên 216 sản phẩm không thể phân biệt được, sau khi mọi câu hỏi mà danh mục hỗ trợ đều đã được trả lời.",
    },
  ],
  note: "Ví dụ thứ hai là một kệ hàng chúng tôi đã đo. Ví dụ thứ nhất là đúng lỗi đó, ở một ngành hàng chưa ai đo.",
} as const;

export const REASONS_VI = {
  eyebrow: "Vì sao chọn Pulse",
  title: "Năm lý do đáng dành ra nửa giờ.",
  usp: [
    {
      label: "Tuỳ chỉnh",
      body: "Chấm theo tiêu chí mua của chính ngành hàng bạn, không theo một quy tắc hoàn thiện chung chung.",
    },
    {
      label: "Vài phút",
      body: "Gửi địa chỉ website, nhận lại danh sách sửa đã xếp hạng sau vài phút.",
    },
    {
      label: "Thời gian thực",
      body: "Bộ máy tuỳ chọn xếp hạng ngay trên phiên truy cập trước mặt bạn, kèm nhánh đối chứng được giữ lại.",
    },
  ],
  items: [
    "Bạn biết trường dữ liệu nào đang khiến bạn mất nhiều nhất, thay vì làm giàu dữ liệu theo thứ tự nào đó nghe có vẻ hợp lý.",
    "Nó chạy trên một tệp bảng tính. Không mã nguồn, không thẻ theo dõi trên website, không tích hợp, không tốn thời gian của đội kỹ thuật.",
    "Không có dữ liệu khách hàng nào tham gia vào bất kỳ bước nào, nên không phải chờ duyệt về quyền riêng tư trước khi bắt đầu.",
    "Phần lớn những gì còn thiếu hoá ra lấy lại được từ văn bản bạn vốn đã có, nên việc sửa rẻ hơn vẻ ngoài của nó.",
    "Bạn đo lại được sau khi sửa và cho thấy điều gì đã thay đổi, và đó là phần giúp đợt việc tiếp theo được duyệt ngân sách.",
  ],
} as const;
