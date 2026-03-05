import { useInView } from '../hooks/useInView';

const lessons = [
  {
    icon: '🚩',
    title: 'Giương cao ngọn cờ giải phóng dân tộc',
    desc: 'Đặt lợi ích dân tộc lên trên hết',
  },
  {
    icon: '🤝',
    title: 'Xây dựng khối đại đoàn kết toàn dân',
    desc: 'Mặt trận Việt Minh làm nòng cốt',
  },
  {
    icon: '⚔️',
    title: 'Kết hợp đấu tranh chính trị và vũ trang',
    desc: 'Chủ động chớp thời cơ',
  },
  {
    icon: '★',
    title: 'Xây dựng Đảng vững mạnh',
    desc: 'Gắn bó chặt chẽ với nhân dân',
  },
];

export default function Lessons() {
  const [ref, inView] = useInView();

  return (
    <section
      id="lessons"
      className="py-20 px-6 text-white"
      style={{ background: 'linear-gradient(160deg, #5c0000 0%, #7f0000 60%, #9b0000 100%)' }}
      ref={ref}
    >
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
            className="inline-block text-xs font-bold tracking-widest px-3 py-1 rounded uppercase mb-4"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fde68a' }}
          >
            Mục VI
          </div>
          <h2
            className="font-black"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            KINH NGHIỆM QUÝ BÁU
          </h2>
          <div
            className="mx-auto mt-4 rounded-full"
            style={{ width: '64px', height: '3px', background: '#f0b400' }}
          />
        </div>

        {/* Lessons grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {lessons.map((lesson, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 transition-all duration-700"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(4px)',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${i * 150 + 200}ms`,
              }}
            >
              <div className="flex gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(240,180,0,0.15)' }}
                >
                  {lesson.icon}
                </div>
                <div>
                  <div className="flex items-start gap-2 mb-2">
                    <span
                      className="font-black text-lg flex-shrink-0"
                      style={{ color: '#f0b400' }}
                    >
                      ✅
                    </span>
                    <h3 className="font-black leading-snug" style={{ fontSize: '0.95rem' }}>
                      {lesson.title}
                    </h3>
                  </div>
                  <p className="text-sm pl-7" style={{ color: 'rgba(255,220,180,0.85)' }}>
                    → {lesson.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer emblem */}
        <div
          className="text-center transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transitionDelay: '900ms',
          }}
        >
          <div
            className="text-6xl mb-4 select-none"
            style={{ color: '#f0b400', textShadow: '0 0 30px rgba(240,180,0,0.4)' }}
          >
            ★
          </div>
          <div
            className="w-32 mx-auto mb-4 rounded-full"
            style={{ height: '1px', background: 'rgba(240,180,0,0.4)' }}
          />
          <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Cách mạng Tháng Tám 1945 — Mốc son chói lọi trong lịch sử Việt Nam
          </p>
        </div>
      </div>
    </section>
  );
}
