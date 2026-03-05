import { useEffect, useState } from 'react';

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden"
      style={{
        background: 'linear-gradient(150deg, #5c0000 0%, #9b0000 40%, #cc0000 100%)',
      }}
    >
      {/* Background image — founding meeting painting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/dang-cong-san-vn-ra-doi.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.08,
          filter: 'grayscale(100%)',
        }}
      />

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gold side bars */}
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: '#f0b400' }} />
      <div className="absolute right-0 top-0 bottom-0 w-1" style={{ background: '#f0b400' }} />

      {/* Main content */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full transition-all duration-1000"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
        }}
      >
        {/* Star emblem */}
        <div
          className="text-7xl mb-6 select-none"
          style={{
            color: '#f0b400',
            textShadow: '0 0 30px rgba(240,180,0,0.6), 0 0 60px rgba(240,180,0,0.3)',
          }}
        >
          ★
        </div>

        {/* Chapter badge */}
        <div
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-8 rounded-full"
          style={{ border: '1px solid rgba(240,180,0,0.6)', color: '#f0b400' }}
        >
          Chương III — Đảng Cộng Sản Việt Nam Ra Đời
        </div>

        {/* Main title */}
        <h1
          className="font-black leading-tight mb-2"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          ĐẢNG CỘNG SẢN
          <br />
          VIỆT NAM RA ĐỜI
        </h1>

        {/* Gold divider */}
        <div
          className="mx-auto my-6 rounded-full"
          style={{ width: '80px', height: '3px', background: '#f0b400' }}
        />

        {/* Subtitle */}
        <p
          className="font-light mb-8"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: 'rgba(255,255,255,0.9)' }}
        >
          Và lãnh đạo đấu tranh giành chính quyền{' '}
          <span style={{ color: '#f0b400', fontWeight: 700 }}>(1930–1945)</span>
        </p>

        {/* Two-column layout: callout + image */}
        <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
          {/* Focus callout */}
          <div
            className="rounded-xl px-6 py-5"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: '#f0b400' }}
            >
              Trọng tâm
            </p>
            <p className="text-white mb-5" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
              Phong trào giải phóng dân tộc{' '}
              <span style={{ color: '#f0b400', fontWeight: 600 }}>1939–1945</span> và thắng lợi
              của{' '}
              <span style={{ color: '#f0b400', fontWeight: 600 }}>Cách mạng Tháng Tám 1945</span>.
            </p>
            <blockquote
              className="italic border-l-4 pl-4"
              style={{
                borderColor: '#f0b400',
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.9)',
              }}
            >
              "Từ thân phận nô lệ trở thành người làm chủ đất nước."
            </blockquote>
          </div>

          {/* Historical photo */}
          <div
            className="rounded-xl overflow-hidden transition-all duration-1000"
            style={{
              border: '1px solid rgba(240,180,0,0.35)',
              opacity: visible ? 1 : 0,
              transitionDelay: '600ms',
            }}
          >
            <img
              src="/dang-cong-san-viet-nam-ra-doi.jpg"
              alt="Hội nghị thành lập Đảng Cộng sản Việt Nam (3/2/1930)"
              className="w-full object-cover"
              style={{
                height: '180px',
                filter: 'grayscale(100%) contrast(1.1) brightness(0.85)',
              }}
            />
            <div
              className="text-center text-xs py-2 px-3 font-semibold tracking-wide"
              style={{ background: 'rgba(0,0,0,0.55)', color: '#fde68a' }}
            >
              Hội nghị thành lập Đảng Cộng sản Việt Nam — 3/2/1930
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{
          transform: 'translateX(-50%)',
          opacity: visible ? 0.7 : 0,
          transition: 'opacity 1s 0.5s',
          animation: 'heroScroll 2s ease-in-out infinite',
        }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Cuộn xuống
        </span>
        <svg className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.7)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <style>{`
        @keyframes heroScroll {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}
