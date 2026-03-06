import { useInView } from '../hooks/useInView';

const PREP_STAGES = [
  {
    period: '1930–1931',
    label: 'Cao trào Xô Viết Nghệ Tĩnh',
    desc: 'Thử nghiệm đầu tiên về chính quyền công – nông, rèn luyện lực lượng và ý chí chiến đấu.',
    color: '#fc8181',
  },
  {
    period: '1936–1939',
    label: 'Phong trào Dân chủ Đông Dương',
    desc: 'Tận dụng Mặt trận Bình dân Pháp, giác ngộ và tổ chức quần chúng rộng rãi trên toàn quốc.',
    color: '#f0b400',
  },
  {
    period: '1939–1945',
    label: 'Cao trào kháng Nhật cứu nước',
    desc: 'Lập Mặt trận Việt Minh, xây dựng căn cứ Việt Bắc, thành lập Đội VNTTGPQ, chuẩn bị Tổng khởi nghĩa.',
    color: '#68d391',
  },
];

const EVIDENCE = [
  {
    icon: '📅',
    title: '15 ngày – cả nước giành chính quyền',
    desc: 'Từ 14 đến 28/8/1945, khởi nghĩa thắng lợi ở toàn bộ tỉnh thành. Sức mạnh ấy không thể là "may mắn" mà đến trong 15 ngày.',
  },
  {
    icon: '🌏',
    title: 'Bằng chứng so sánh khu vực',
    desc: 'Các nước Đông Nam Á khác cùng bối cảnh Nhật đầu hàng, nhưng không nước nào lập được chính quyền cách mạng ngay lập tức như Việt Nam.',
  },
  {
    icon: '📋',
    title: 'Chỉ thị 12/3/1945 – phản ứng chủ động',
    desc: 'Chưa đầy 24 giờ sau đảo chính Nhật, Đảng đã ra chỉ thị định hướng hành động – minh chứng cho sự chuẩn bị và năng lực lãnh đạo kịp thời.',
  },
];

export default function Debate() {
  const [refHeader, inHeader] = useInView();
  const [refVs, inVs] = useInView();
  const [refPrep, inPrep] = useInView();
  const [refEvidence, inEvidence] = useInView();
  const [refVerdict, inVerdict] = useInView();

  return (
    <section
      id="debate"
      className="py-20 px-6 text-white"
      style={{ background: 'linear-gradient(170deg,#0a0a1a 0%,#1a0520 50%,#0f0a00 100%)' }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div
          ref={refHeader}
          className="text-center mb-16 transition-all duration-700"
          style={{ opacity: inHeader ? 1 : 0, transform: inHeader ? 'translateY(0)' : 'translateY(28px)' }}
        >
          <div className="text-4xl mb-4">⚖️</div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#f0b400' }}>
            Thảo luận – Phản biện lịch sử
          </p>
          <h2
            className="font-black leading-tight mx-auto"
            style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', maxWidth: 720, color: 'white' }}
          >
            Liệu thắng lợi của Cách mạng Tháng Tám là{' '}
            <span style={{ color: '#fc8181' }}>"ăn may"</span>{' '}
            hay kết quả của một quá trình{' '}
            <span style={{ color: '#68d391' }}>chuẩn bị lâu dài, chủ động và tất yếu?</span>
          </h2>
          <div className="mx-auto mt-5 rounded-full" style={{ width: 64, height: 3, background: '#f0b400' }} />
        </div>

        {/* Two-side debate */}
        <div
          ref={refVs}
          className="grid md:grid-cols-2 gap-6 mb-14"
        >
          {/* Claim side */}
          <div
            className="rounded-2xl p-6 transition-all duration-700"
            style={{
              background: 'rgba(252,129,129,0.08)',
              border: '1px solid rgba(252,129,129,0.3)',
              opacity: inVs ? 1 : 0,
              transform: inVs ? 'translateX(0)' : 'translateX(-32px)',
              transitionDelay: '100ms',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: 'rgba(252,129,129,0.15)' }}
              >
                ❌
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold" style={{ color: 'rgba(252,129,129,0.7)' }}>Ý kiến phản bác</p>
                <h3 className="font-black text-sm" style={{ color: '#fc8181' }}>Chỉ là "ăn may"?</h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,200,200,0.8)' }}>
              Nhật đầu hàng Đồng Minh, chính quyền tay sai rệu rã, Pháp chưa kịp trở lại —
              tạo ra <strong style={{ color: '#fc8181' }}>khoảng trống quyền lực</strong> ngẫu nhiên.
              Thắng lợi đến từ thời cơ khách quan chứ không phải năng lực chủ quan.
            </p>
          </div>

          {/* Counter side */}
          <div
            className="rounded-2xl p-6 transition-all duration-700"
            style={{
              background: 'rgba(104,211,145,0.08)',
              border: '1px solid rgba(104,211,145,0.3)',
              opacity: inVs ? 1 : 0,
              transform: inVs ? 'translateX(0)' : 'translateX(32px)',
              transitionDelay: '250ms',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: 'rgba(104,211,145,0.15)' }}
              >
                ✅
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold" style={{ color: 'rgba(104,211,145,0.7)' }}>Lập trường của nhóm</p>
                <h3 className="font-black text-sm" style={{ color: '#68d391' }}>Tất yếu của lịch sử</h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,255,220,0.8)' }}>
              Thời cơ chỉ là <strong style={{ color: '#68d391' }}>điều kiện cần</strong> — không đủ để quyết định thắng lợi.
              Chính <strong style={{ color: '#68d391' }}>15 năm chuẩn bị bền bỉ</strong> của Đảng mới là điều kiện đủ
              biến thời cơ thành chiến thắng.
            </p>
          </div>
        </div>

        {/* 15 years preparation timeline */}
        <div ref={refPrep} className="mb-14">
          <h3
            className="text-center font-black mb-8 transition-all duration-700"
            style={{
              fontSize: 'clamp(1rem,2.5vw,1.4rem)',
              color: '#f0b400',
              opacity: inPrep ? 1 : 0,
              transform: inPrep ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            15 NĂM CHUẨN BỊ — BA CAO TRÀO
          </h3>
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px transition-all duration-1000"
              style={{
                background: 'linear-gradient(to bottom, #f0b400, rgba(240,180,0,0.1))',
                opacity: inPrep ? 1 : 0,
                transitionDelay: '200ms',
              }}
            />
            <div className="space-y-6">
              {PREP_STAGES.map((stage, i) => (
                <div
                  key={i}
                  className="flex gap-6 transition-all duration-700"
                  style={{
                    opacity: inPrep ? 1 : 0,
                    transform: inPrep ? 'translateX(0)' : 'translateX(-24px)',
                    transitionDelay: `${300 + i * 180}ms`,
                  }}
                >
                  {/* Dot */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-black z-10 relative"
                      style={{ background: `${stage.color}22`, border: `2px solid ${stage.color}`, color: stage.color }}
                    >
                      {i + 1}
                    </div>
                  </div>
                  <div
                    className="flex-1 rounded-xl p-4"
                    style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${stage.color}33` }}
                  >
                    <p className="text-xs font-bold mb-1" style={{ color: stage.color }}>{stage.period}</p>
                    <h4 className="font-black text-sm mb-1 text-white">{stage.label}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,220,180,0.75)' }}>{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Evidence cards */}
        <div ref={refEvidence} className="grid md:grid-cols-3 gap-5 mb-14">
          {EVIDENCE.map((ev, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 transition-all duration-700"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(240,180,0,0.2)',
                opacity: inEvidence ? 1 : 0,
                transform: inEvidence ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <div className="text-3xl mb-3">{ev.icon}</div>
              <h4 className="font-black text-sm mb-2" style={{ color: '#f0b400' }}>{ev.title}</h4>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,220,180,0.75)' }}>{ev.desc}</p>
            </div>
          ))}
        </div>

        {/* Verdict */}
        <div
          ref={refVerdict}
          className="rounded-2xl p-8 text-center transition-all duration-700"
          style={{
            background: 'linear-gradient(135deg, rgba(127,0,0,0.5) 0%, rgba(30,0,60,0.6) 100%)',
            border: '1px solid rgba(240,180,0,0.4)',
            backdropFilter: 'blur(8px)',
            opacity: inVerdict ? 1 : 0,
            transform: inVerdict ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div className="text-4xl mb-4" style={{ color: '#f0b400' }}>★</div>
          <h3 className="font-black mb-4" style={{ fontSize: 'clamp(1rem,2.5vw,1.3rem)', color: '#f0b400' }}>
            KẾT LUẬN CỦA NHÓM
          </h3>
          <p
            className="mx-auto leading-relaxed font-semibold"
            style={{ maxWidth: 620, fontSize: 'clamp(0.85rem,1.8vw,1rem)', color: 'rgba(255,230,180,0.95)' }}
          >
            Cách mạng Tháng Tám <span style={{ color: '#fc8181', fontWeight: 900 }}>không phải "ăn may"</span>.
            Thời cơ do Nhật đầu hàng chỉ là điều kiện thuận lợi —
            chính <span style={{ color: '#68d391', fontWeight: 900 }}>15 năm chuẩn bị chủ động, bền bỉ</span> dưới sự lãnh đạo của Đảng,
            cùng sự sáng suốt trong chớp thời cơ, mới là nhân tố quyết định thắng lợi.
            Đây là kết quả <span style={{ color: '#f0b400', fontWeight: 900 }}>tất yếu của lịch sử dân tộc</span>.
          </p>
        </div>

      </div>
    </section>
  );
}
