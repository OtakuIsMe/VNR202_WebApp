import { useInView } from '../hooks/useInView';

const national = [
  'Lật đổ ách thống trị thực dân Pháp',
  'Xóa bỏ chế độ phong kiến',
  'Nhân dân trở thành người làm chủ',
  'Mở ra kỷ nguyên độc lập dân tộc gắn với chủ nghĩa xã hội',
];

const international = [
  'Cổ vũ mạnh mẽ phong trào giải phóng dân tộc',
  'Tác động sâu rộng tới các nước thuộc địa',
];

export default function Significance() {
  const [ref, inView] = useInView();

  return (
    <section id="significance" className="py-20 px-6 bg-white" ref={ref}>
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
            Mục V
          </div>
          <h2
            className="font-black text-gray-900"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            Ý NGHĨA LỊCH SỬ
          </h2>
          <div
            className="mx-auto mt-4 rounded-full"
            style={{ width: '64px', height: '3px', background: '#cc0000' }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* National significance */}
          <div
            className="rounded-2xl p-7 text-white transition-all duration-700"
            style={{
              background: 'linear-gradient(135deg, #7f0000, #cc0000)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-32px)',
              transitionDelay: '200ms',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">🇻🇳</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#fde68a' }}>
                  Đối với
                </p>
                <h3 className="text-xl font-black">Dân tộc Việt Nam</h3>
              </div>
            </div>
            <ul className="space-y-3">
              {national.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm" style={{ lineHeight: 1.6 }}>
                  <span
                    className="font-black flex-shrink-0 mt-0.5"
                    style={{ color: '#f0b400' }}
                  >
                    ✓
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.9)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* International significance */}
          <div
            className="rounded-2xl p-7 text-white transition-all duration-700"
            style={{
              background: '#111827',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(32px)',
              transitionDelay: '350ms',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">🌏</div>
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: '#f0b400' }}
                >
                  Đối với
                </p>
                <h3 className="text-xl font-black">Phong trào quốc tế</h3>
              </div>
            </div>
            <ul className="space-y-3">
              {international.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm" style={{ lineHeight: 1.6 }}>
                  <span
                    className="font-black flex-shrink-0 mt-0.5"
                    style={{ color: '#f0b400' }}
                  >
                    ✓
                  </span>
                  <span style={{ color: '#d1d5db' }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* Extra context box */}
            <div
              className="mt-6 rounded-xl p-4 text-sm"
              style={{ background: 'rgba(240,180,0,0.1)', border: '1px solid rgba(240,180,0,0.3)' }}
            >
              <p style={{ color: '#fde68a', fontStyle: 'italic', lineHeight: 1.6 }}>
                "Cách mạng Tháng Tám mở đầu kỷ nguyên sụp đổ của chủ nghĩa thực dân ở châu Á."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
