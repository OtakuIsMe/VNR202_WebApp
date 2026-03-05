import MazeGame from '../components/MazeGame';

export default function MinigamePage() {
  function goBack() {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="w-full min-h-screen" style={{ background: 'linear-gradient(160deg,#0f0205 0%,#1a0a14 55%,#080a1a 100%)' }}>
      {/* Mini top-bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14"
        style={{ background: 'rgba(10,6,20,0.92)', borderBottom: '1px solid rgba(240,180,0,0.15)', backdropFilter: 'blur(12px)' }}
      >
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
          style={{ color: 'rgba(255,200,150,0.75)' }}
          onMouseEnter={e => e.currentTarget.style.color = '#f0b400'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,200,150,0.75)'}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại bài học
        </button>

        <div className="flex items-center gap-2">
          <span style={{ color: '#f0b400', fontSize: '1.1rem' }}>★</span>
          <span className="font-black text-white text-xs tracking-widest uppercase">Minigame</span>
          <span className="text-xs font-semibold" style={{ color: 'rgba(240,180,0,0.7)' }}>· Mê Cung Lịch Sử</span>
        </div>

        {/* Empty right slot for balance */}
        <div style={{ width: 120 }} />
      </nav>

      {/* Content — offset for fixed nav */}
      <div className="pt-14">
        <MazeGame />
      </div>
    </div>
  );
}
