import { useInView } from '../hooks/useInView';

const cards = [
  {
    icon: '⚡',
    title: 'Thời Cơ Lịch Sử',
    items: [
      'Giữa tháng 8/1945: Nhật đầu hàng Đồng minh',
      'Chính quyền tay sai tan rã',
    ],
  },
  {
    icon: '🏛️',
    title: 'Quyết Định Khởi Nghĩa',
    items: [
      'Hội nghị toàn quốc của Đảng',
      'Đại hội Quốc dân Tân Trào',
      'Thành lập Ủy ban Dân tộc Giải phóng',
      'Hồ Chí Minh làm Chủ tịch',
    ],
  },
  {
    icon: '📅',
    title: 'Diễn Biến',
    isTimeline: true,
    events: [
      { date: '14–28/8/1945', desc: 'Giành chính quyền trên cả nước', accent: '#cc0000' },
      {
        date: '2/9/1945 — Ba Đình',
        desc: 'Hồ Chí Minh đọc Tuyên ngôn Độc lập',
        sub: '→ Khai sinh nước Việt Nam Dân chủ Cộng hòa',
        accent: '#f0b400',
      },
    ],
  },
];

export default function Revolution() {
  const [ref, inView] = useInView();

  return (
    <section
      id="revolution"
      className="py-20 px-6 text-white"
      style={{ background: '#0a0a0a' }}
      ref={ref}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-10 transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div
            className="inline-block text-white text-xs font-bold tracking-widest px-3 py-1 rounded uppercase mb-4"
            style={{ background: '#cc0000' }}
          >
            Mục III
          </div>
          <h2
            className="font-black"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}
          >
            TỔNG KHỞI NGHĨA THÁNG TÁM 1945
          </h2>
          <div
            className="mx-auto mt-4 rounded-full"
            style={{ width: '64px', height: '3px', background: '#cc0000' }}
          />
        </div>

        {/* Featured image — August Revolution crowds */}
        <div
          className="rounded-2xl overflow-hidden mb-10 relative transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transitionDelay: '150ms',
          }}
        >
          <img
            src="/cach-mang-thang-8.jpg"
            alt="Cách mạng Tháng Tám 1945 — Hàng vạn quần chúng xuống đường"
            className="w-full object-cover"
            style={{
              maxHeight: '300px',
              filter: 'grayscale(70%) contrast(1.1)',
            }}
          />
          <div
            className="absolute inset-0 flex items-end p-6"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
            }}
          >
            <p className="text-white text-sm italic" style={{ color: 'rgba(255,255,255,0.85)' }}>
              📸 Hàng vạn quần chúng nhân dân xuống đường trong Cách mạng Tháng Tám 1945
            </p>
          </div>
        </div>

        {/* Three info cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 transition-all duration-700"
              style={{
                background: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.06)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(32px)',
                transitionDelay: `${i * 150 + 350}ms`,
              }}
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3
                className="font-black uppercase mb-4"
                style={{ color: '#f0b400', fontSize: '0.9rem', letterSpacing: '0.08em' }}
              >
                {card.title}
              </h3>

              {card.isTimeline ? (
                <div className="space-y-4">
                  {card.events.map((ev, j) => (
                    <div
                      key={j}
                      className="pl-4"
                      style={{ borderLeft: `2px solid ${ev.accent}` }}
                    >
                      <div className="font-black text-sm mb-1" style={{ color: ev.accent }}>
                        {ev.date}
                      </div>
                      <p className="text-sm" style={{ color: '#d1d5db' }}>{ev.desc}</p>
                      {ev.sub && (
                        <p className="text-xs mt-1 font-semibold" style={{ color: '#f0b400' }}>
                          {ev.sub}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-2">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm" style={{ color: '#d1d5db' }}>
                      <span style={{ color: '#cc0000', flexShrink: 0 }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Climax banner — photo background */}
        <div
          className="rounded-2xl overflow-hidden relative transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.95)',
            transitionDelay: '700ms',
          }}
        >
          <img
            src="/bac%20ho%20doc%20tuyen%20ngon.jpg"
            alt="Hồ Chí Minh đọc Tuyên ngôn Độc lập 2/9/1945"
            className="w-full object-cover"
            style={{
              maxHeight: '300px',
              filter: 'grayscale(60%) contrast(1.1) brightness(0.7)',
            }}
          />
          <div
            className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-6 text-center"
            style={{
              background:
                'linear-gradient(to top, rgba(100,0,0,0.95) 0%, rgba(80,0,0,0.6) 50%, transparent 100%)',
            }}
          >
            <div className="text-4xl mb-2" style={{ color: '#f0b400' }}>★</div>
            <h3
              className="font-black mb-2 text-white"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
            >
              2 tháng 9 năm 1945
            </h3>
            <p style={{ color: '#fca5a5', fontSize: '1.05rem' }}>
              Nước Việt Nam Dân chủ Cộng hòa ra đời
            </p>
            <p className="italic text-sm mt-1" style={{ color: '#fde68a' }}>
              Quảng trường Ba Đình, Hà Nội
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
