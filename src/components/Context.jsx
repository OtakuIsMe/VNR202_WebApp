import { useInView } from '../hooks/useInView';

const events = [
  {
    date: '9/1939',
    title: 'Chiến tranh thế giới thứ hai bùng nổ',
    image: '/chien-tranh-the-gioi-thu-2.webp',
    imageAlt: 'Chiến tranh thế giới thứ hai 1939',
    items: [
      'Thực dân Pháp thi hành chính sách thời chiến khắc nghiệt',
      'Đặt Đảng Cộng sản Đông Dương ngoài vòng pháp luật',
      'Giải tán tổ chức quần chúng',
      'Tăng cường bóc lột nhân dân phục vụ chiến tranh',
    ],
  },
  {
    date: '9/1940',
    title: 'Nhật vào Đông Dương',
    image: '/nhat-vao-dong-duong.jpg',
    imageAlt: 'Quân Nhật vào Đông Dương 1940',
    items: [
      'Pháp đầu hàng Nhật',
      'Nhân dân chịu cảnh "một cổ hai tròng" (Pháp – Nhật)',
      'Mâu thuẫn dân tộc trở nên gay gắt',
    ],
  },
];

export default function Context() {
  const [ref, inView] = useInView();

  return (
    <section id="context" className="py-20 px-6" style={{ background: '#111827' }} ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <h2
            className="font-black text-white"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            BỐI CẢNH LỊCH SỬ
          </h2>
          <p className="text-lg mt-2" style={{ color: '#9ca3af' }}>
            (1939–1945)
          </p>
          <div
            className="mx-auto mt-4 rounded-full"
            style={{ width: '64px', height: '3px', background: '#cc0000' }}
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line desktop */}
          <div
            className="absolute top-0 bottom-0 hidden md:block"
            style={{
              left: '50%',
              width: '2px',
              transform: 'translateX(-50%)',
              background: 'rgba(204,0,0,0.3)',
            }}
          />
          {/* Left line mobile */}
          <div
            className="absolute top-0 bottom-0 md:hidden"
            style={{ left: '20px', width: '2px', background: 'rgba(204,0,0,0.3)' }}
          />

          {events.map((event, i) => (
            <div
              key={i}
              className="relative mb-14 transition-all duration-700"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(32px)',
                transitionDelay: `${i * 250 + 200}ms`,
              }}
            >
              <div className="md:grid md:grid-cols-2 md:gap-8 items-start">
                {/* Left: date + title + image (desktop) */}
                <div className="mb-4 md:mb-0 md:text-right md:pr-10 pl-12 md:pl-0">
                  <div
                    className="inline-block text-white font-black text-base px-4 py-2 rounded-full mb-3"
                    style={{ background: '#cc0000' }}
                  >
                    {event.date}
                  </div>
                  <h3
                    className="font-bold text-white mb-4"
                    style={{ fontSize: '1.1rem', lineHeight: 1.4 }}
                  >
                    {event.title}
                  </h3>
                  {/* Image on the left column (desktop) */}
                  <div className="hidden md:block rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                    <img
                      src={event.image}
                      alt={event.imageAlt}
                      className="w-full object-cover"
                      style={{
                        height: '160px',
                        filter: 'grayscale(100%) contrast(1.15) brightness(0.85)',
                      }}
                    />
                    <div
                      className="text-xs px-3 py-1.5 font-medium"
                      style={{ background: 'rgba(255,255,255,0.05)', color: '#9ca3af' }}
                    >
                      {event.imageAlt}
                    </div>
                  </div>
                </div>

                {/* Center dot — desktop */}
                <div
                  className="absolute hidden md:block"
                  style={{
                    left: '50%',
                    top: '14px',
                    width: '18px',
                    height: '18px',
                    transform: 'translateX(-50%)',
                    borderRadius: '50%',
                    background: '#cc0000',
                    border: '4px solid #111827',
                    zIndex: 10,
                  }}
                />

                {/* Left dot — mobile */}
                <div
                  className="absolute md:hidden"
                  style={{
                    left: '13px',
                    top: '14px',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: '#cc0000',
                    border: '3px solid #111827',
                  }}
                />

                {/* Right: image (mobile) + bullet points */}
                <div className="pl-12 md:pl-10">
                  {/* Image on mobile only */}
                  <div className="md:hidden rounded-xl overflow-hidden mb-4" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                    <img
                      src={event.image}
                      alt={event.imageAlt}
                      className="w-full object-cover"
                      style={{
                        height: '140px',
                        filter: 'grayscale(100%) contrast(1.15) brightness(0.85)',
                      }}
                    />
                  </div>
                  <ul className="space-y-2">
                    {event.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex gap-2"
                        style={{ color: '#d1d5db', fontSize: '0.9rem' }}
                      >
                        <span style={{ color: '#cc0000', flexShrink: 0, marginTop: '2px' }}>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Strategic shift callout */}
        <div
          className="mt-4 rounded-2xl p-8 text-center transition-all duration-700"
          style={{
            background: '#f0b400',
            opacity: inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.95)',
            transitionDelay: '700ms',
          }}
        >
          <div className="text-3xl mb-3">🎯</div>
          <h3
            className="font-black uppercase mb-2"
            style={{ color: '#1a1a1a', fontSize: '1.2rem', letterSpacing: '0.05em' }}
          >
            Chuyển hướng chiến lược
          </h3>
          <p style={{ color: '#1a1a1a', fontSize: '1rem', fontWeight: 600 }}>
            Đảng xác định:{' '}
            <span style={{ textDecoration: 'underline' }}>
              Nhiệm vụ giải phóng dân tộc phải đặt lên hàng đầu.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
