import { useInView } from '../hooks/useInView';

const items = [
  { icon: '🏴', text: 'Là cuộc cách mạng giải phóng dân tộc' },
  { icon: '🌟', text: 'Mang tính chất dân chủ mới' },
  { icon: '🎯', text: 'Hoàn thành nhiệm vụ độc lập dân tộc' },
  { icon: '⚖️', text: 'Từng bước giải quyết quyền lợi cho nhân dân lao động' },
  { icon: '🤝', text: 'Xây dựng chính quyền của toàn dân' },
];

export default function Characteristics() {
  const [ref, inView] = useInView();

  return (
    <section
      id="characteristics"
      className="py-20 px-6"
      style={{ background: '#fff5f5' }}
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
            className="inline-block text-white text-xs font-bold tracking-widest px-3 py-1 rounded uppercase mb-4"
            style={{ background: '#cc0000' }}
          >
            Mục IV
          </div>
          <h2
            className="font-black text-gray-900"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}
          >
            TÍNH CHẤT CÁCH MẠNG THÁNG TÁM
          </h2>
          <div
            className="mx-auto mt-4 rounded-full"
            style={{ width: '64px', height: '3px', background: '#cc0000' }}
          />
        </div>

        {/* Items grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 transition-all duration-700"
              style={{
                boxShadow: '0 2px 12px rgba(204,0,0,0.06)',
                border: '1px solid #fecaca',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transitionDelay: `${i * 100 + 200}ms`,
              }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <div
                className="w-8 h-0.5 mb-3 rounded-full"
                style={{ background: '#cc0000' }}
              />
              <p className="font-semibold text-gray-800 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
