// Hàm helper để tạo đoạn văn bản cho Lexical có hỗ trợ truyền vào dạng mảng
const createLexicalText = (text: string | string[]) => {
  // Nếu input đã là array thì dùng luôn, nếu là string thì bọc vào array 1 phần tử
  const lines = Array.isArray(text) ? text : [text]

  return {
    root: {
      type: 'root',
      children: lines.map((line) => ({
        type: 'paragraph',
        children: [{ type: 'text', version: 1, text: line }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

export const defaultHomeLayout = [
  {
    blockType: 'banner',
    anchorId: 'nhal-banner-section',
    href: '', // Image bắt buộc upload
  },
  {
    blockType: 'hero',
    anchorId: 'nhal-hero-section',
    heroStats: {
      count: '1000+',
      label: 'Người từng tham dự',
      avatars: [],
    },
    heading: createLexicalText(['Hành trình An Lạc', 'Chữa Lành Tâm Lý']),
    subHeading: createLexicalText([
      'Chương trình hỗ trợ tinh thần',
      'HOÀN TOÀN MIỄN PHÍ',
      'dựa trên các tiếp cận khoa học tâm lý',
    ]),
    primaryCta: { label: 'Đăng ký Ngay!', href: '#' },
    heroStory: { videoUrl: '' },
    sponsors: [],
  },
  {
    blockType: 'about',
    anchorId: 'nhal-about-section',
    simpleBadge: 'Chào bạn!',
    content: {
      heading: createLexicalText([
        'Đừng để bản thân bị',
        'mắc kẹt bởi chính những',
        'suy nghĩ trong đầu mình',
      ]),
      description1:
        'Nhiều người đang trải qua những cảm xúc đan xen, suy nghĩ mâu thuẫn lặp lại mỗi ngày, khiến tâm trí luôn căng thẳng, nặng nề và không thể thoát ra. Họ chọn im lặng và dần thu mình lại trong một vòng lặp mệt mỏi.',
      description2:
        'Bạn không hề đơn độc. Rất nhiều người - nhiều hơn bạn nghĩ - cũng đang mang trong lòng những nỗi niềm chưa gọi thành tên và chờ một nơi đủ an toàn để được hiện diện đúng với mình.',
    },
  },
  {
    blockType: 'benefit',
    anchorId: 'nhal-benefit-section',
    heading: createLexicalText(['Giá trị khi', 'tham gia chương trình']),
    benefitWrappers: [
      {
        benefitCard1: {
          title: 'Bắt đầu hành trình chữa lành dựa trên khoa học tâm lý',
          description: 'Tiếp cận các liệu pháp tiên tiến.',
        },
        benefitCard2: {
          title: 'Không gian chữa lành an toàn, lắng nghe và tôn trọng',
          description: 'Giúp bạn giải tỏa áp lực và giảm bớt nỗi cô đơn.',
        },
      },
      {
        benefitCard1: {
          title: 'Cân bằng cảm xúc - phục hồi nội lực',
          description:
            'Học cách điều hòa cảm xúc thông qua các hoạt động thể lý - thiền tập - vận động sáng tạo - journaling.',
        },
        benefitCard2: {
          title: 'Phát triển kỹ năng nhận thức và kết nối lành mạnh',
          description: 'Khám phá điểm mạnh - điểm yếu của bản thân, nuôi dưỡng sự tự tin.',
        },
      },
      {
        benefitCard1: {
          title: 'Kỹ thuật tự chăm sóc bản thân thực tiễn',
          description:
            'Dễ dàng áp dụng vào cuộc sống hàng ngày để duy trì sự cân bằng và an lạc lâu dài (Self-Care).',
        },
        benefitCard2: {
          title: 'Xây dựng mạng lưới đồng hành',
          description: 'Cơ hội kết nối với một cộng đồng an toàn, nơi bạn không đơn độc.',
        },
      },
    ],
  },
  {
    blockType: 'service',
    anchorId: 'nhal-service-section',
    heading: createLexicalText(['Ngày Hội An Lạc', 'dành cho ai?']),
    serviceCards: [
      {
        cardDescription: 'Chương trình dành cho bạn đang trong độ tuổi từ 18 đến 38.',
        isActive: true,
      },
      {
        cardDescription: 'Từng trải qua các biến cố cá nhân.',
        isActive: false,
      },
      {
        cardDescription: 'Mất phương hướng trong học tập, công việc hoặc khẳng định bản thân.',
        isActive: false,
      },
      {
        cardDescription:
          'Mâu thuẫn, tổn thương trong các mối quan hệ (tình cảm, hôn nhân, gia đình).',
        isActive: false,
      },
      {
        cardDescription: 'Căng thẳng kéo dài do môi trường học tập - làm việc - sinh sống.',
        isActive: false,
      },
      {
        cardDescription:
          'Có biểu hiện lo âu, cô đơn, trầm buồn hoặc cảm giác trống rỗng khó lý giải.',
        isActive: false,
      },
    ],
  },
  {
    blockType: 'methodology',
    anchorId: 'nhal-methodology-section',
    heading: createLexicalText(['Phương pháp', 'Khoa học chuyên sâu']),
    description: createLexicalText([
      'Nhiều người đang trải qua những cảm xúc đan xen, suy nghĩ mâu thuẫn lặp lại mỗi ngày, khiến tâm trí luôn căng thẳng, nặng nề và không thể thoát ra. Họ chọn im lặng và dần thu mình lại trong một vòng lặp mệt mỏi.',
      'Đồng cảm Diễn tiến Tâm lý (Psyche Resonance)',
      'Tạo không gian an toàn để chia sẻ, lắng nghe, nhận diện và điều chỉnh quan niệm sai lầm. ',
      'Trải nghiệm Hoạt động Thể lý (Somatic Experience)',
      'Chuỗi các bài tập thực hành giúp tăng cường nhận thức và kiểm soát cơ thể - cảm xúc, bao gồm kỹ thuật quán tưởng, thư giãn và thiền Body Scan.',
      'Chương trình được khởi xướng và thiết kế bởi TS. Lê Nguyên Phương, Tiến sĩ Lãnh Đạo Giáo dục Chuyên ngành Tâm lý Giáo dục với hơn 30 năm kinh nghiệm tại Hoa Kỳ và Việt Nam.',
      'Đội ngũ tình nguyện viên đã được tập huấn chuyên sâu, phần lớn là học trò của Thầy, trong đó có nhiều người hoạt động chuyên môn trong lĩnh vực tâm lý, giáo dục.',
    ]),
  },
  {
    blockType: 'archive',
    anchorId: 'nhal-archive-section',
    heading: createLexicalText(['Thông tin chi tiết', 'Ngày Hội An Lạc Kỳ VI']),
    description: createLexicalText([
      'Thời gian',
      '📅 8h00 - 17h00, Thứ Bảy, ngày 10/10/2026.',
      'Địa điểm',
      '📍 Parc Mall, 547-549 Tạ Quang Bửu, Quận 8, TP. Hồ Chí Minh.',
      'Số lượng',
      '👥 100 thầy cô và cán bộ giáo dục (Số lượng giới hạn).',
      'Quy trình đăng ký',
      '📝 Vui lòng đăng ký tại link.',
      'LIÊN HỆ',
      'Hotline: 097.581.3754 (Ms. Hương) hoặc 098.412.2786 (Ms. Hường) hoặc 098.412.2786 (Ms. Thu Thủy)',
      'Email: info.ngayhoianlac@gmail.com',
    ]),
    importantDescription: createLexicalText([
      'LƯU Ý QUAN TRỌNG',
      'PHÍ ĐẶT CHỖ:',
      'Chúng tôi yêu cầu khoản phí đặt chỗ 300.000 VNĐ để tăng tính cam kết trong việc tham dự. Phí này sẽ được hoàn trả 100% vào cuối ngày sự kiện.',
      'Quy trình xác nhận:',
      'Tình nguyện viên sẽ chủ động liên hệ qua điện thoại (trong vòng 2 tuần trước chương trình) để xác nhận nhu cầu thực sự, lắng nghe sơ bộ, và kết nối ban đầu để bạn cảm thấy an tâm.',
    ]),
    primaryCta: { label: 'Đăng ký Ngay!', href: '#' },
  },
  {
    blockType: 'testimonial',
    anchorId: 'nhal-testimonial-section',
    heading: createLexicalText(['Những khoảnh khắc', 'đáng trân trọng']),
    testimonials: [
      {
        quote:
          'Trước khi em đến đây em luôn nghĩ nghĩ mình là 1 người năng lượng, nhưng mà sao trong cơ thể em luôn tồn tại một nguồn năng lượng tiêu cực. Và hôm nay em được quay về bản thân, em được buông bỏ, buông xuôi những điều tiêu cực đó và em cám ơn tất cả mọi người rất nhiều!',
        author:
          'Lời chia sẻ của TD, một sinh viên năm 4 ĐH DT từng tham gia Ngày Hội An Lạc Kỳ III được tổ chức vào ngày 28/7/2024 tại TP. Đà Nẵng)',
      },
      {
        quote:
          'Các anh chị tình nguyện viên đã cho em rất nhiều góc nhìn, những góc nhìn mà trước giờ em chưa từng nghĩ tới. Em mới nhận ra là có những định kiến trong đầu mình - về bản thân - đã khiến mình không thể sống đúng với mình. Giờ thì em đã thấy rõ hơn một phần của chính mình.',
        author:
          'Lời chia sẻ của N.K.T, một sinh viên từng tham gia Ngày Hội An Lạc Kỳ I được tổ chức vào ngày 28/7/2024 tại TP. Hồ Chí Minh)',
      },
      {
        quote:
          'Các anh chị tình nguyện viên đã cho em rất nhiều góc nhìn... Em mới nhận ra là có những định kiến trong đầu mình - về bản thân - đã khiến mình không thể sống đúng với mình.',
        author: 'Trích dẫn T. đã tham gia Ngày Hội An Lạc và chia sẻ',
      },
    ],
  },
  {
    blockType: 'gallery',
    anchorId: 'nhal-gallery-section',
  },
  {
    blockType: 'sponsor',
    anchorId: 'nhal-sponsors-section',
    sponsors: [
      {
        heading: createLexicalText('Nhà tài trợ MH Paper'),
        description: createLexicalText([
          'Trong dòng chảy vội vã của cuộc sống,',
          '"Ngày hội An Lạc" được tổ chức như một khoảng lặng dịu dàng - nơi mỗi người được trở về với chính mình, được hít thở trọn vẹn và cảm nhận bình an trong từng khoảnh khắc. Đây không chỉ là hành trình chữa lành tâm hồn, mà còn là cầu nối để lan tỏa giá trị nhân văn và tinh thần sống hài hòa với thiên nhiên.',
          'Đồng hành cùng chương trình là Công ty Cổ phần Giấy MH (MH Paper) - doanh nghiệp tiên phong trong lĩnh vực giấy và bao bì xanh tại Việt Nam. Với triết lý "Modern & Harmony - Hiện đại và Hài hòa", MH Paper không chỉ tạo ra sản phẩm chất lượng, thân thiện môi trường mà còn chung tay vì một cộng đồng cân bằng và hạnh phúc.',
          'Thông qua "Ngày hội An Lạc", MH Paper mong muốn gửi gắm thông điệp: sự an lạc thật sự đến từ những điều giản dị - từ hơi thở, từ tấm lòng, và từ những lựa chọn bền vững mỗi ngày.',
          'Hãy cùng MH Paper tham dự "Ngày hội An Lạc" - để chữa lành từ tâm, sống xanh cùng thiên nhiên, và viết tiếp hành trình lan tỏa yêu thương. 🌸',
        ]),
      },
    ],
  },
  {
    blockType: 'footer',
    anchorId: 'nhal-footer-section',
    description: createLexicalText([
      'Ngày Hội An Lạc - Healing Day được khởi xướng và tổ chức bởi TS Lê Nguyên Phương và cộng đồng học viên. Đây là chuỗi sự kiện hỗ trợ tâm lý miễn phí dành cho những người đang gặp các khó khăn về sức khỏe tinh thần.',
    ]),
    socialLinks: [
      {
        name: 'Facebook',
        link: 'https://www.facebook.com/NgayHoiAnLac',
      },
    ],
  },
  {
    blockType: 'nav-flyout',
    navItems: [
      { label: 'Giá trị', targetAnchor: 'nhal-benefit-section' },
      { label: 'Thông tin', targetAnchor: 'nhal-archive-section' },
      { label: 'Đối tượng', targetAnchor: 'nhal-service-section' },
      { label: 'Đăng ký', targetAnchor: 'nhal-hero-section' },
    ],
  },
]
