import { useInView } from '../hooks/useInView';

export default function Preparation() {
  const [ref, inView] = useInView();

  return (
    <section id="preparation" className="py-20 px-6 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div
            className="inline-block text-white text-xs font-bold tracking-widest px-3 py-1 rounded uppercase mb-4"
            style={{ background: '#cc0000' }}
          >
            Mục II
          </div>
          <h2
            className="font-black text-gray-900"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}
          >
            CHUẨN BỊ LỰC LƯỢNG CÁCH MẠNG
          </h2>
          <div
            className="mx-auto mt-4 rounded-full"
            style={{ width: '64px', height: '3px', background: '#cc0000' }}
          />
        </div>

        {/* Key figure card */}
        <div
          className="rounded-2xl overflow-hidden mb-10 transition-all duration-700"
          style={{
            background: 'linear-gradient(135deg, #7f0000 0%, #cc0000 100%)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(32px)',
            transitionDelay: '200ms',
          }}
        >
          <div className="flex flex-col md:flex-row">
            {/* Photo */}
            <div className="md:w-56 flex-shrink-0">
              <img
                src="/Bac-ho-ve-nuoc.jpg"
                alt="Nguyễn Ái Quốc trở về nước 1941"
                className="w-full h-full object-cover"
                style={{
                  minHeight: '200px',
                  maxHeight: '260px',
                  filter: 'grayscale(100%) contrast(1.1) brightness(0.9)',
                }}
              />
            </div>
            {/* Content */}
            <div className="p-8 text-white flex-1">
              <div
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: '#fde68a' }}
              >
                28/1/1941
              </div>
              <h3 className="text-2xl font-black mb-4">Nguyễn Ái Quốc trở về nước</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Trực tiếp lãnh đạo cách mạng',
                  'Thành lập Mặt trận Việt Minh',
                  'Tập hợp mọi tầng lớp yêu nước',
                  'Xây dựng lực lượng cách mạng',
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="text-sm rounded-full px-3 py-1"
                    style={{ background: 'rgba(255,255,255,0.18)' }}
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Two forces */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Political force */}
          <div
            className="rounded-2xl p-6 transition-all duration-700"
            style={{
              border: '2px solid #fca5a5',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-32px)',
              transitionDelay: '400ms',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                style={{ background: '#cc0000' }}
              >
                <span style={{ color: '#f0b400' }}>★</span>
              </div>
              <h3 className="text-xl font-black text-gray-900">Lực lượng chính trị</h3>
            </div>
            <div className="rounded-xl p-4 mb-3" style={{ background: '#fff1f2' }}>
              <p className="flex gap-2 text-gray-700">
                <span style={{ color: '#cc0000', fontWeight: 700, flexShrink: 0 }}>▸</span>
                Các hội Cứu quốc phát triển rộng khắp
              </p>
            </div>

            {/* Photo — Hồ Chí Minh & nhóm Con Nai */}
            <div className="rounded-xl overflow-hidden" style={{ background: '#7f0000' }}>
              <img
                src="/Ho-Chi-Minh-va-thanh-vien-cua-nhom-con-nai.jpg"
                alt="Hồ Chí Minh cùng nhóm Con Nai (OSS) 1945"
                className="w-full object-cover"
                style={{
                  height: '160px',
                  filter: 'grayscale(100%) contrast(1.1) brightness(0.85)',
                }}
              />
              <div className="p-3 text-white">
                <div className="font-black text-sm mb-0.5" style={{ color: '#f0b400' }}>
                  1945
                </div>
                <p className="text-sm leading-relaxed">
                  Hồ Chí Minh cùng <strong>nhóm Con Nai (OSS)</strong>
                </p>
                <p className="text-xs mt-1" style={{ color: '#fca5a5' }}>
                  → Xây dựng liên minh chống phát xít Nhật
                </p>
              </div>
            </div>
          </div>

          {/* Armed force */}
          <div
            className="rounded-2xl overflow-hidden transition-all duration-700"
            style={{
              border: '2px solid #fca5a5',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(32px)',
              transitionDelay: '500ms',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-6 pb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: '#cc0000' }}
              >
                <span style={{ color: '#f0b400' }}>★</span>
              </div>
              <h3 className="text-xl font-black text-gray-900">Lực lượng vũ trang</h3>
            </div>

            <div className="px-6 pb-3">
              <div className="rounded-xl p-4 mb-3" style={{ background: '#fff1f2' }}>
                <p className="flex gap-2 text-gray-700 text-sm">
                  <span style={{ color: '#cc0000', fontWeight: 700, flexShrink: 0 }}>▸</span>
                  Từ khởi nghĩa Bắc Sơn, Nam Kỳ hình thành du kích
                </p>
              </div>
            </div>

            {/* Photo + date card */}
            <div className="rounded-xl overflow-hidden mx-6 mb-6" style={{ background: '#7f0000' }}>
              <img
                src="/vietnamtuyentruyengiaiphongquan.jpg"
                alt="Đội Việt Nam Tuyên truyền Giải phóng quân 22/12/1944"
                className="w-full object-cover"
                style={{
                  height: '150px',
                  filter: 'grayscale(100%) contrast(1.15) brightness(0.85)',
                }}
              />
              <div className="p-4 text-white">
                <div className="font-black text-sm mb-1" style={{ color: '#f0b400' }}>
                  22/12/1944
                </div>
                <p className="text-sm leading-relaxed">
                  Thành lập <strong>Đội Việt Nam Tuyên truyền Giải phóng quân</strong>
                </p>
                <p className="text-sm mt-1" style={{ color: '#fca5a5' }}>
                  → Tiền thân của Quân đội Nhân dân Việt Nam
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
