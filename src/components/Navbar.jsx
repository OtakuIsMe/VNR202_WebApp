import { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'Giới Thiệu', num: '00' },
  { id: 'context', label: 'Bối Cảnh', num: '01' },
  { id: 'preparation', label: 'Chuẩn Bị', num: '02' },
  { id: 'revolution', label: 'Tổng Khởi Nghĩa', num: '03' },
  { id: 'characteristics', label: 'Tính Chất', num: '04' },
  { id: 'significance', label: 'Ý Nghĩa', num: '05' },
  { id: 'lessons', label: 'Kinh Nghiệm', num: '06' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      setScrolled(y > 60);
      setProgress(total > 0 ? (y / total) * 100 : 0);

      const hit = sections.find(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 80 && bottom > 80;
      });
      if (hit) setActive(hit.id);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,10,0.93)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(240,180,0,0.18)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group">
            <span
              className="text-2xl leading-none select-none transition-transform duration-300 group-hover:scale-110"
              style={{ color: '#f0b400', display: 'block' }}
            >
              ★
            </span>
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-white font-black text-[11px] tracking-[0.2em] uppercase">
                Đảng Cộng Sản Việt Nam
              </p>
              <p className="font-semibold text-[10px] tracking-widest" style={{ color: '#f0b400' }}>
                1930 – 1945
              </p>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-end gap-7">
            {sections.slice(1).map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="relative flex flex-col items-center gap-0.5 pb-1 group"
                >
                  <span
                    className="text-[11px] font-semibold tracking-wide whitespace-nowrap transition-colors duration-200"
                    style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)' }}
                  >
                    {s.label}
                  </span>
                  {/* Gold underline */}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px rounded-full transition-all duration-300 origin-center"
                    style={{
                      background: '#f0b400',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                </button>
              );
            })}

            {/* Minigame button */}
            <a
              href="#minigame"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all duration-200"
              style={{
                background: 'rgba(240,180,0,0.12)',
                border: '1px solid rgba(240,180,0,0.4)',
                color: '#f0b400',
                textDecoration: 'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(240,180,0,0.22)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(240,180,0,0.12)'; }}
            >
              🗺️ Minigame
            </a>
          </div>

          {/* Hamburger — animated */}
          <button
            className="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-px rounded-full transition-all duration-300 origin-center"
                style={{
                  background: '#ffffff',
                  width: i === 1 ? (menuOpen ? '100%' : '65%') : '100%',
                  opacity: i === 1 && menuOpen ? 0 : 1,
                  transform:
                    menuOpen && i === 0 ? 'rotate(45deg) translate(4px, 4px)' :
                      menuOpen && i === 2 ? 'rotate(-45deg) translate(4px, -4px)' :
                        'none',
                }}
              />
            ))}
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ height: '2px', background: 'rgba(240,180,0,0.12)' }}>
          <div
            className="h-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%`, background: '#f0b400' }}
          />
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-opacity duration-300"
        style={{ background: 'rgba(0,0,0,0.55)', pointerEvents: menuOpen ? 'auto' : 'none', opacity: menuOpen ? 1 : 0 }}
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer panel */}
      <aside
        className="fixed top-0 right-0 bottom-0 z-50 w-72 lg:hidden flex flex-col transition-transform duration-300"
        style={{
          background: '#0f0f0f',
          borderLeft: '1px solid rgba(240,180,0,0.15)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-6 h-16 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-3">
            <span style={{ color: '#f0b400', fontSize: '1.3rem' }}>★</span>
            <span className="text-white font-black text-[11px] tracking-widest uppercase">
              Menu
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer items */}
        <div className="flex-1 overflow-y-auto p-4">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="flex items-center gap-4 w-full px-4 py-3 rounded-xl mb-1 text-left transition-all duration-200"
                style={{
                  background: isActive ? 'rgba(240,180,0,0.1)' : 'transparent',
                  borderLeft: `2px solid ${isActive ? '#f0b400' : 'transparent'}`,
                }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)' }}
                >
                  {s.label}
                </span>
              </button>
            );
          })}

          {/* Minigame link in drawer */}
          <a
            href="#minigame"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-4 w-full px-4 py-3 rounded-xl mb-1 text-left transition-all duration-200 mt-2"
            style={{
              background: 'rgba(240,180,0,0.08)',
              border: '1px solid rgba(240,180,0,0.25)',
              textDecoration: 'none',
            }}
          >
            <span className="text-base w-5 text-center flex-shrink-0">🗺️</span>
            <span className="text-sm font-bold" style={{ color: '#f0b400' }}>Minigame</span>
          </a>
        </div>

        {/* Drawer footer */}
        <div
          className="px-6 py-4 text-center flex-shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Cách mạng Tháng Tám · 1945
          </p>
        </div>
      </aside>
    </>
  );
}
