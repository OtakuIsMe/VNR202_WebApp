import { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'vnr_maze_v2';
const BC_NAME     = 'vnr_maze_bc';
const ADMIN_CREDS = { user: 'admin', pass: 'vnr2025' };

/* ═══════════════ QUESTIONS ═══════════════ */
const QUESTIONS = [
  { q: 'Đảng Cộng sản Việt Nam được thành lập vào ngày nào?', opts: ['3/2/1930', '3/2/1929', '19/5/1930', '2/9/1945'], ans: 0 },
  { q: 'Hội nghị thành lập Đảng được tổ chức ở đâu?', opts: ['Hà Nội', 'Sài Gòn', 'Hương Cảng (Hồng Kông)', 'Quảng Châu'], ans: 2 },
  { q: 'Ai chủ trì Hội nghị thành lập Đảng?', opts: ['Trần Phú', 'Lê Hồng Phong', 'Hà Huy Tập', 'Nguyễn Ái Quốc'], ans: 3 },
  { q: 'Tổng Bí thư đầu tiên của Đảng là ai?', opts: ['Nguyễn Ái Quốc', 'Lê Hồng Phong', 'Hà Huy Tập', 'Trần Phú'], ans: 3 },
  { q: 'Cương lĩnh chính trị đầu tiên của Đảng do ai soạn thảo?', opts: ['Trần Phú', 'Hà Huy Tập', 'Lê Hồng Phong', 'Nguyễn Ái Quốc'], ans: 3 },
  { q: 'Phong trào cách mạng 1930–1931 gắn với địa danh nào?', opts: ['Hà Nội – Sài Gòn', 'Nghệ An – Hà Tĩnh', 'Huế – Đà Nẵng', 'Thái Nguyên'], ans: 1 },
  { q: 'Mặt trận Việt Minh được thành lập vào năm nào?', opts: ['1939', '1940', '1941', '1942'], ans: 2 },
  { q: 'Hội nghị Trung ương 8 (5/1941) diễn ra ở đâu?', opts: ['Hà Nội', 'Tân Trào', 'Pác Bó (Cao Bằng)', 'Hội An'], ans: 2 },
  { q: 'Nhật đảo chính Pháp ở Đông Dương ngày nào?', opts: ['9/3/1944', '9/3/1945', '19/8/1945', '2/9/1945'], ans: 1 },
  { q: 'Nguyễn Ái Quốc trở về nước trực tiếp hoạt động năm nào?', opts: ['1939', '1940', '1941', '1942'], ans: 2 },
  { q: 'Đội VNTTGPQ thành lập ngày nào?', opts: ['22/12/1944', '22/12/1945', '7/5/1954', '19/8/1944'], ans: 0 },
  { q: 'Ai thành lập Đội Việt Nam Tuyên truyền Giải phóng quân?', opts: ['Hồ Chí Minh', 'Trường Chinh', 'Phạm Văn Đồng', 'Võ Nguyên Giáp'], ans: 3 },
  { q: 'Khởi nghĩa Bắc Sơn nổ ra năm nào?', opts: ['1939', '1940', '1941', '1942'], ans: 1 },
  { q: 'Khởi nghĩa Nam Kỳ nổ ra năm nào?', opts: ['1939', '1940', '1941', '1942'], ans: 1 },
  { q: 'Nhật Bản đầu hàng Đồng Minh ngày nào?', opts: ['6/8/1945', '9/8/1945', '15/8/1945', '2/9/1945'], ans: 2 },
  { q: 'Tuyên ngôn Độc lập 2/9/1945 được đọc tại đâu?', opts: ['Huế', 'Sài Gòn', 'Quảng trường Ba Đình – Hà Nội', 'Đà Nẵng'], ans: 2 },
  { q: 'Hội Việt Nam Cách mạng Thanh niên thành lập năm nào?', opts: ['1924', '1925', '1926', '1927'], ans: 1 },
  { q: 'Luận cương chính trị tháng 10/1930 do ai soạn thảo?', opts: ['Nguyễn Ái Quốc', 'Hà Huy Tập', 'Lê Hồng Phong', 'Trần Phú'], ans: 3 },
  { q: 'Nạn đói 1945 làm khoảng bao nhiêu người chết ở miền Bắc?', opts: ['500 nghìn', '1 triệu', '2 triệu', '3 triệu'], ans: 2 },
  { q: 'Tân Trào (8/1945) là nơi diễn ra sự kiện gì?', opts: ['Thành lập Đảng', 'Đại hội Quốc dân & phát lệnh Tổng KN', 'Hội nghị TW 8', 'Thành lập Việt Minh'], ans: 1 },
  { q: 'Chính phủ lâm thời VNDCCH thành lập ngày nào?', opts: ['19/8/1945', '25/8/1945', '28/8/1945', '2/9/1945'], ans: 1 },
  { q: 'Chiến tranh thế giới thứ hai bùng nổ năm nào?', opts: ['1937', '1938', '1939', '1940'], ans: 2 },
  { q: 'Hội nghị TW 6 (11/1939) xác định nhiệm vụ trước mắt là gì?', opts: ['Cải cách ruộng đất', 'Đấu tranh nghị trường', 'Xây dựng Đảng', 'Giải phóng dân tộc'], ans: 3 },
  { q: 'Ba tổ chức hợp nhất thành ĐCSVN là?', opts: ['ĐD CS Đảng, AN CS Đảng, ĐD CS Liên đoàn', 'VN QD Đảng, AN CS Đảng, ĐD CS Đảng', 'Hội VNCMTN, AN CS Đảng, Tân Việt', 'ĐD CS Đảng, VN CM Đảng, AN CS Đảng'], ans: 0 },
  { q: 'Nguyễn Ái Quốc đọc Luận cương Lenin về dân tộc thuộc địa năm nào?', opts: ['1919', '1920', '1921', '1922'], ans: 1 },
  { q: 'Đại hội Tours (Pháp) 1920, Nguyễn Ái Quốc tán thành điều gì?', opts: ['Quốc tế II', 'Quốc tế III (Cộng sản)', 'Đảng Xã hội Pháp', 'Quốc tế IV'], ans: 1 },
  { q: 'Bản Yêu sách nhân dân An Nam gửi Versailles năm nào?', opts: ['1918', '1919', '1920', '1921'], ans: 1 },
  { q: 'Hội nghị Trung ương 8 họp tháng mấy năm 1941?', opts: ['Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'], ans: 2 },
  { q: 'Cách mạng tháng Tám thành công, chính quyền về tay ai?', opts: ['Quốc dân Đảng', 'Nhân dân Việt Nam', 'Phong kiến thân Nhật', 'Quân Đồng Minh'], ans: 1 },
  { q: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập ngày nào?', opts: ['19/8/1945', '25/8/1945', '28/8/1945', '2/9/1945'], ans: 3 },
  { q: 'Hội Việt Nam Cách mạng Thanh niên thành lập tại thành phố nào?', opts: ['Hà Nội', 'Quảng Châu', 'Mátxcơva', 'Pari'], ans: 1 },
  { q: 'Việt Nam Quốc Dân Đảng do ai sáng lập?', opts: ['Phan Bội Châu', 'Phan Châu Trinh', 'Nguyễn Thái Học', 'Hoàng Hoa Thám'], ans: 2 },
  { q: 'Khởi nghĩa Yên Bái (1930) do tổ chức nào lãnh đạo?', opts: ['Đảng Cộng sản VN', 'Hội VNCMTN', 'Việt Nam Quốc Dân Đảng', 'Tân Việt'], ans: 2 },
  { q: 'Chỉ thị "Nhật–Pháp bắn nhau và hành động của chúng ta" ra ngày nào?', opts: ['9/3/1945', '12/3/1945', '15/3/1945', '25/3/1945'], ans: 1 },
  { q: 'Đại hội Quốc dân Tân Trào (8/1945) bầu ai làm Chủ tịch Chính phủ lâm thời?', opts: ['Trường Chinh', 'Võ Nguyên Giáp', 'Phạm Văn Đồng', 'Hồ Chí Minh'], ans: 3 },
  { q: '"Đường Kách mệnh" (1927) do ai biên soạn?', opts: ['Trần Phú', 'Hà Huy Tập', 'Nguyễn Ái Quốc', 'Lê Hồng Phong'], ans: 2 },
  { q: 'Nguyễn Ái Quốc rời Việt Nam ra đi tìm đường cứu nước năm nào?', opts: ['1909', '1910', '1911', '1913'], ans: 2 },
  { q: 'Căn cứ địa Pác Bó thuộc tỉnh nào?', opts: ['Lạng Sơn', 'Bắc Kạn', 'Cao Bằng', 'Hà Giang'], ans: 2 },
  { q: 'Quốc tế Cộng sản (Quốc tế III) thành lập năm nào?', opts: ['1917', '1918', '1919', '1920'], ans: 2 },
  { q: 'Mặt trận Bình dân Pháp lên cầm quyền năm nào?', opts: ['1934', '1935', '1936', '1937'], ans: 2 },
  { q: 'Liên Xô tham chiến chống phát xít Đức bắt đầu từ năm nào?', opts: ['1939', '1940', '1941', '1942'], ans: 2 },
  { q: 'Phong trào Xô Viết Nghệ Tĩnh diễn ra vào năm nào?', opts: ['1929–1930', '1930–1931', '1931–1932', '1932–1933'], ans: 1 },
];

/* ═══════════════ CHARACTERS ═══════════════ */
const CHARACTERS = [
  { id: 0, name: 'Nguyễn Ái Quốc', emoji: '🌟', color: '#f0b400' },
  { id: 1, name: 'Trần Phú',        emoji: '⚔️',  color: '#fc8181' },
  { id: 2, name: 'Võ Nguyên Giáp', emoji: '🦅',  color: '#68d391' },
  { id: 3, name: 'Phạm Văn Đồng',  emoji: '📚',  color: '#63b3ed' },
  { id: 4, name: 'Nguyễn Thị Minh Khai', emoji: '🌸', color: '#f687b3' },
  { id: 5, name: 'Lê Hồng Phong',  emoji: '🔥',  color: '#fbd38d' },
  { id: 6, name: 'Hà Huy Tập',     emoji: '⭐',  color: '#b794f4' },
];

/* ═══════════════ MAZE GRAPH ═══════════════ */
const CX = 400, CY = 400, N = 7;
const HALF = 360 / (N * 2); // ≈ 25.71° — half-step between groups
const ANGLES = Array.from({ length: N }, (_, i) => i * (360 / N) - 90);

function polar(r, deg) {
  const a = (deg * Math.PI) / 180;
  return [+(CX + r * Math.cos(a)).toFixed(1), +(CY + r * Math.sin(a)).toFixed(1)];
}

// Node layout: outer → p1/s1 (ring1) → p2/s2 (ring2) → l3 → l4 → center
// Primary nodes (p) align with group angles; Secondary nodes (s) offset by HALF
const NODES = {};
for (let i = 0; i < N; i++) {
  NODES[`o${i}`]  = { pos: polar(305, ANGLES[i]),        ring: 0, group: i };
  NODES[`p1${i}`] = { pos: polar(250, ANGLES[i]),        ring: 1, group: i };
  NODES[`s1${i}`] = { pos: polar(225, ANGLES[i] + HALF), ring: 1, group: i, sec: true };
  NODES[`p2${i}`] = { pos: polar(178, ANGLES[i]),        ring: 2, group: i };
  NODES[`s2${i}`] = { pos: polar(153, ANGLES[i] + HALF), ring: 2, group: i, sec: true };
  NODES[`l3${i}`] = { pos: polar(100, ANGLES[i]),        ring: 3, group: i };
  NODES[`l4${i}`] = { pos: polar(55,  ANGLES[i]),        ring: 4, group: i };
}
NODES.c = { pos: [CX, CY], ring: 5, group: -1 };

const EDGES = {};
let _qi = 0;
function ae(f, t) {
  const id = `${f}__${t}`;
  EDGES[id] = { id, from: f, to: t, qIdx: (_qi++) % QUESTIONS.length };
}
for (let i = 0; i < N; i++) {
  const j = (i + 1) % N;
  ae(`o${i}`,  `p1${i}`);   // straight radial start
  ae(`o${i}`,  `s1${i}`);   // diagonal start
  ae(`p1${i}`, `s1${i}`);   // ring-1 cross (right)
  ae(`s1${i}`, `p1${j}`);   // ring-1 cross (to next group)
  ae(`p1${i}`, `p2${i}`);   // radial through ring-1→2
  ae(`s1${i}`, `s2${i}`);   // secondary radial
  ae(`p2${i}`, `s2${i}`);   // ring-2 cross (right)
  ae(`s2${i}`, `p2${j}`);   // ring-2 cross (to next group)
  ae(`p2${i}`, `l3${i}`);   // radial to l3
  ae(`l3${i}`, `l3${j}`);   // ring-3 cross
  ae(`l3${i}`, `l4${i}`);   // radial to l4
  ae(`l4${i}`, `l4${j}`);   // ring-4 cross
  ae(`l4${i}`, 'c');         // to center
}

function getEdge(a, b) {
  return EDGES[`${a}__${b}`] || EDGES[`${b}__${a}`] || null;
}

function getNeighbors(nodeId, blocked) {
  return Object.values(EDGES)
    .filter(e => !blocked[e.id] && (e.from === nodeId || e.to === nodeId))
    .map(e => e.from === nodeId ? e.to : e.from);
}

/* ═══════════════ SHARED STATE (localStorage + BroadcastChannel) ═══════════════ */
function loadState()   { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; } }
function saveState(s)  { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {} }
function freshState()  { return { players: {}, blocked: {}, leaderboard: [], startTime: null, trails: {}, claimed: {}, gameOpen: false }; }

function calcScore(rank, correct, wrong) {
  return Math.max(0, (N + 1 - rank) * 20 + correct * 5 - wrong * 3);
}

/* ═══════════════ MAIN COMPONENT ═══════════════ */
export default function MazeGame() {
  const [myGroup, setMyGroup]   = useState(null);
  const [shared,  setShared]    = useState(() => loadState() || freshState());
  const [qModal,  setQModal]    = useState(null);
  const [selAns,  setSelAns]    = useState(null);
  const [result,  setResult]    = useState(null);
  const [takenMsg,  setTakenMsg]  = useState('');
  const [claimAlert, setClaimAlert] = useState('');
  const [isAdmin, setIsAdmin]   = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [observeMode, setObserveMode] = useState(false);
  const bcRef = useRef(null);

  // ── Real-time sync ──────────────────────────────────────
  useEffect(() => {
    const bc = new BroadcastChannel(BC_NAME);
    bcRef.current = bc;
    bc.onmessage = (e) => { if (e.data?.type === 'UPDATE') setShared(e.data.state); };
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try { setShared(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => { bc.close(); window.removeEventListener('storage', onStorage); };
  }, []);

  function push(newState) {
    saveState(newState);
    bcRef.current?.postMessage({ type: 'UPDATE', state: newState });
    setShared(newState);
  }

  // ── Join a group ────────────────────────────────────────
  function joinGroup(gid) {
    const cur = loadState() || freshState();
    if (cur.players[gid]) {
      setTakenMsg(`Nhóm ${gid + 1} đã có người chọn rồi!`);
      setTimeout(() => setTakenMsg(''), 3000);
      return;
    }
    const startNode = `o${gid}`;
    push({
      ...cur,
      startTime: cur.startTime || Date.now(),
      claimed: { ...(cur.claimed || {}), [startNode]: gid },
      players: {
        ...cur.players,
        [gid]: { pos: startNode, finished: false, rank: null, time: null, wrong: 0, correct: 0, visited: [startNode] },
      },
    });
    setMyGroup(gid);
  }

  function doReset() { push(freshState()); setMyGroup(null); setQModal(null); setTakenMsg(''); }
  function doOpenGame() { const cur = loadState() || freshState(); push({ ...cur, gameOpen: true }); }

  // ── Game interaction ─────────────────────────────────────
  const myPlayer = myGroup !== null ? shared.players[myGroup] : null;
  const hlNodes  = (!myPlayer || myPlayer.finished || qModal)
    ? []
    : getNeighbors(myPlayer.pos, shared.blocked).filter(id => {
        const claimedBy = (shared.claimed || {})[id];
        const alreadyVisited = (myPlayer.visited || []).includes(id);
        return !alreadyVisited && (claimedBy === undefined || claimedBy === myGroup);
      });

  function onNodeClick(nodeId) {
    if (!myPlayer || myPlayer.finished || qModal) return;
    if (!hlNodes.includes(nodeId)) return;
    const edge = getEdge(myPlayer.pos, nodeId);
    if (!edge) return;
    setQModal({ edgeId: edge.id, targetNode: nodeId, q: QUESTIONS[edge.qIdx] });
    setSelAns(null);
    setResult(null);
  }

  function submitAnswer() {
    if (selAns === null || result) return;
    const ok = selAns === qModal.q.ans;
    setResult(ok ? 'ok' : 'fail');

    setTimeout(() => {
      const cur  = loadState() || shared; // always read freshest
      const prev = cur.players[myGroup];
      if (!prev) { setQModal(null); return; }

      if (ok) {
        const newPos    = qModal.targetNode;
        const claimedBy = (cur.claimed || {})[newPos];
        // Race condition: another group claimed this node while we were answering
        if (claimedBy !== undefined && claimedBy !== myGroup) {
          const rival = CHARACTERS[claimedBy];
          setClaimAlert(`${rival.emoji} Ô này đã bị chiếm bởi Nhóm ${claimedBy + 1}!`);
          setTimeout(() => setClaimAlert(''), 3500);
          setQModal(null);
          return;
        }
        const fin     = newPos === 'c';
        const newRank = fin ? cur.leaderboard.length + 1 : prev.rank;
        const updP    = {
          ...prev, pos: newPos, finished: fin, rank: newRank,
          time: fin ? Math.floor((Date.now() - cur.startTime) / 1000) : prev.time,
          correct: prev.correct + 1,
          visited: [...(prev.visited || []), newPos],
        };
        const newBoard = fin
          ? [...cur.leaderboard, { gid: myGroup, char: CHARACTERS[myGroup], ...updP, score: calcScore(newRank, updP.correct, updP.wrong) }]
          : cur.leaderboard;
        push({
          ...cur,
          players: { ...cur.players, [myGroup]: updP },
          leaderboard: newBoard,
          trails: { ...(cur.trails || {}), [qModal.edgeId]: myGroup },
          claimed: { ...(cur.claimed || {}), [newPos]: myGroup },
        });
      } else {
        push({
          ...cur,
          blocked: { ...cur.blocked, [qModal.edgeId]: true },
          players: { ...cur.players, [myGroup]: { ...prev, wrong: prev.wrong + 1 } },
        });
      }
      setQModal(null);
    }, 1800);
  }

  // ── Render ───────────────────────────────────────────────
  const bgStyle = { background: 'linear-gradient(160deg,#0f0205 0%,#1a0a14 55%,#080a1a 100%)', minHeight: 'calc(100vh - 3.5rem)', padding: '1.5rem 1rem' };

  if (myGroup === null) {
    return (
      <section id="maze-game" style={bgStyle}>
        {observeMode ? (
          <GameView
            observer={true} myGroup={null} shared={shared} hlNodes={[]}
            onNodeClick={() => {}} qModal={null} selAns={null} setSelAns={() => {}}
            result={null} onSubmit={() => {}} claimAlert=""
            onReset={doReset}
            onExitObserve={() => setObserveMode(false)}
          />
        ) : (
          <>
            <GroupSelect
              shared={shared} takenMsg={takenMsg} onJoin={joinGroup} onReset={doReset}
              isAdmin={isAdmin} onOpenGame={doOpenGame}
              onShowLogin={() => setShowLogin(true)}
              onObserve={() => setObserveMode(true)}
            />
            {showLogin && (
              <AdminLoginModal
                onClose={() => setShowLogin(false)}
                onSuccess={() => { setIsAdmin(true); setShowLogin(false); }}
              />
            )}
          </>
        )}
      </section>
    );
  }

  return (
    <section id="maze-game" className="text-white" style={bgStyle}>
      <GameView
        observer={false} myGroup={myGroup} shared={shared} hlNodes={hlNodes}
        onNodeClick={onNodeClick}
        qModal={qModal} selAns={selAns} setSelAns={setSelAns}
        result={result} onSubmit={submitAnswer}
        claimAlert={claimAlert}
        onReset={doReset}
        onExitObserve={null}
      />
    </section>
  );
}

/* ═══════════════ GROUP SELECT SCREEN ═══════════════ */
function GroupSelect({ shared, takenMsg, onJoin, onReset, isAdmin, onOpenGame, onShowLogin, onObserve }) {
  const taken = Object.keys(shared.players).map(Number);
  const gameOpen = !!shared.gameOpen;

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', paddingTop: '2.5rem', position: 'relative' }}>

      {/* Admin login button — top right corner */}
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        {isAdmin ? (
          <div style={{ background: 'rgba(240,180,0,0.18)', border: '1px solid #f0b400', borderRadius: 8, padding: '0.35rem 0.9rem', fontSize: '0.8rem', color: '#f0b400', fontWeight: 800 }}>
            ★ Admin
          </div>
        ) : (
          <button
            onClick={onShowLogin}
            style={{ background: 'rgba(240,180,0,0.12)', border: '1px solid rgba(240,180,0,0.5)', borderRadius: 8, padding: '0.35rem 0.9rem', fontSize: '0.8rem', color: '#f0b400', fontWeight: 700, cursor: 'pointer' }}
          >
            🔑 Admin
          </button>
        )}
      </div>

      <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🗺️</div>
      <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 900, color: '#f0b400', margin: '0 0 0.3rem' }}>
        MÊ CUNG LỊCH SỬ
      </h2>
      <p style={{ color: 'rgba(255,200,150,0.75)', fontSize: '0.95rem', marginBottom: '2rem' }}>
        7 nhóm — 7 con đường — 1 đích đến ★
      </p>

      {/* Admin control panel */}
      {isAdmin && (
        <div style={{ background: 'rgba(240,180,0,0.08)', border: '1px solid rgba(240,180,0,0.35)', borderRadius: 14, padding: '1rem 1.25rem', marginBottom: '1.5rem', textAlign: 'left' }}>
          <div style={{ color: '#f0b400', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.75rem' }}>⚙️ Bảng điều khiển Admin</div>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {!gameOpen ? (
              <button
                onClick={onOpenGame}
                style={{ background: 'linear-gradient(135deg,#276749,#38a169)', border: 'none', color: 'white', fontWeight: 700, fontSize: '0.85rem', padding: '0.5rem 1.2rem', borderRadius: 8, cursor: 'pointer' }}
              >
                ▶ Bắt đầu trò chơi mới
              </button>
            ) : (
              <div style={{ background: 'rgba(104,211,145,0.12)', border: '1px solid rgba(104,211,145,0.4)', borderRadius: 8, padding: '0.5rem 1rem', fontSize: '0.82rem', color: '#68d391', fontWeight: 600 }}>
                ✅ Trò chơi đang mở
              </div>
            )}
            {gameOpen && (
              <button
                onClick={onObserve}
                style={{ background: 'rgba(99,179,237,0.15)', border: '1px solid rgba(99,179,237,0.5)', color: '#63b3ed', fontWeight: 700, fontSize: '0.85rem', padding: '0.5rem 1.2rem', borderRadius: 8, cursor: 'pointer' }}
              >
                👁 Quan sát
              </button>
            )}
            <button
              onClick={onReset}
              style={{ background: 'rgba(245,101,101,0.15)', border: '1px solid rgba(245,101,101,0.5)', color: '#fc8181', fontWeight: 700, fontSize: '0.85rem', padding: '0.5rem 1.2rem', borderRadius: 8, cursor: 'pointer' }}
            >
              🔄 Reset toàn bộ
            </button>
          </div>
        </div>
      )}

      {/* Rules */}
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(240,180,0,0.2)', borderRadius: 14, padding: '1.2rem 1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
        <div style={{ color: '#f0b400', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.6rem' }}>📜 Luật chơi</div>
        <ul style={{ lineHeight: 1.9, color: 'rgba(255,220,180,0.85)', paddingLeft: '1.2rem', margin: 0, fontSize: '0.88rem' }}>
          <li>Chọn số nhóm để tham gia — mỗi nhóm chỉ 1 người chọn.</li>
          <li>Mỗi nhóm chơi <strong>độc lập</strong>, không phụ thuộc lượt nhau.</li>
          <li>Click ô liền kề → trả lời câu hỏi lịch sử để di chuyển.</li>
          <li>Trả lời <span style={{ color: '#fc8181' }}>sai</span> → đường đó <strong>bị chặn vĩnh viễn</strong> cho tất cả.</li>
          <li>Nhóm đến <strong style={{ color: '#f0b400' }}>★ trung tâm</strong> trước giành điểm cao nhất!</li>
        </ul>
      </div>

      {/* Waiting state — game not open yet */}
      {!gameOpen ? (
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '2rem', color: 'rgba(255,200,150,0.6)', fontSize: '0.95rem' }}>
          ⏳ Đang chờ quản trị viên mở trò chơi...
        </div>
      ) : (
        <>
          {/* Group buttons */}
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '1rem' }}>
            Chọn nhóm của bạn
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {CHARACTERS.map((ch, i) => {
              const isTaken    = taken.includes(i);
              const isFinished = shared.players[i]?.finished;
              return (
                <button
                  key={i}
                  onClick={() => onJoin(i)}
                  disabled={isTaken}
                  style={{
                    background: isTaken ? 'rgba(255,255,255,0.04)' : `${ch.color}18`,
                    border: `2px solid ${isTaken ? 'rgba(255,255,255,0.1)' : ch.color + '66'}`,
                    borderRadius: 14, padding: '1rem 0.75rem', cursor: isTaken ? 'not-allowed' : 'pointer',
                    opacity: isTaken ? 0.55 : 1, transition: 'all 0.2s', color: 'white',
                  }}
                >
                  <div style={{ fontSize: '1.6rem', marginBottom: '0.3rem' }}>{ch.emoji}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: ch.color }}>Nhóm {i + 1}</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,220,180,0.7)', marginTop: '0.2rem' }}>{ch.name}</div>
                  {isTaken && (
                    <div style={{ marginTop: '0.4rem', fontSize: '0.7rem', color: '#fc8181', fontWeight: 600 }}>
                      {isFinished ? '✓ Đã về đích' : '🔒 Đã có người'}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Taken message */}
          {takenMsg && (
            <div style={{ background: 'rgba(252,129,74,0.15)', border: '1px solid rgba(252,129,74,0.5)', borderRadius: 10, padding: '0.65rem 1rem', marginBottom: '1rem', color: '#fbd38d', fontWeight: 600, fontSize: '0.9rem' }}>
              ⚠️ {takenMsg}
            </div>
          )}

          {/* Leaderboard if anyone finished */}
          {shared.leaderboard.length > 0 && (
            <div style={{ marginTop: '1rem', background: 'rgba(240,180,0,0.07)', border: '1px solid rgba(240,180,0,0.2)', borderRadius: 14, padding: '1rem' }}>
              <div style={{ color: '#f0b400', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏆 Đã về đích</div>
              {shared.leaderboard.map((b, i) => (
                <div key={b.gid} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'rgba(255,220,180,0.85)', padding: '0.2rem 0' }}>
                  <span>#{i + 1} {b.char?.emoji} Nhóm {b.gid + 1}</span>
                  <span style={{ color: '#f0b400' }}>{b.score} điểm · {b.time}s</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ═══════════════ GAME VIEW ═══════════════ */
function GameView({ observer, myGroup, shared, hlNodes, onNodeClick, qModal, selAns, setSelAns, result, onSubmit, claimAlert, onReset, onExitObserve }) {
  const myPlayer = observer ? null : shared.players[myGroup];
  const ch       = observer ? { color: '#63b3ed', emoji: '👁', name: 'Quan sát' } : CHARACTERS[myGroup];

  return (
    <div style={{ maxWidth: 980, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.5rem', flexWrap: 'wrap' }}>
        <div style={{ fontWeight: 900, fontSize: 'clamp(1rem,2.5vw,1.5rem)', color: '#f0b400' }}>🗺️ Mê Cung Lịch Sử</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ background: `${ch.color}18`, border: `1px solid ${ch.color}55`, borderRadius: 8, padding: '0.35rem 0.85rem', fontSize: '0.85rem', fontWeight: 700, color: ch.color }}>
            {observer ? `${ch.emoji} Admin — Đang quan sát` : `${ch.emoji} Nhóm ${myGroup + 1} — ${ch.name}`}
          </div>
          <button
            onClick={observer ? onExitObserve : onReset}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,200,150,0.6)', fontSize: '0.72rem', padding: '0.35rem 0.8rem', borderRadius: 7, cursor: 'pointer' }}
          >
            {observer ? '← Thoát quan sát' : 'Về màn chọn'}
          </button>
          {observer && (
            <button onClick={onReset} style={{ background: 'rgba(245,101,101,0.1)', border: '1px solid rgba(245,101,101,0.4)', color: '#fc8181', fontSize: '0.72rem', padding: '0.35rem 0.8rem', borderRadius: 7, cursor: 'pointer' }}>
              🔄 Reset
            </button>
          )}
        </div>
      </div>

      {/* Finished banner */}
      {myPlayer?.finished && (
        <div style={{ background: 'rgba(72,187,120,0.15)', border: '1px solid #68d391', borderRadius: 12, padding: '0.75rem 1.2rem', textAlign: 'center', marginBottom: '0.75rem', fontWeight: 700, color: '#68d391', fontSize: '1.05rem' }}>
          🎉 Nhóm {myGroup + 1} đã về đích! Hạng #{myPlayer.rank} · {myPlayer.time}s
        </div>
      )}

      {/* Claim alert — shown when answered correctly but node was already taken */}
      {claimAlert && (
        <div style={{ background: 'rgba(245,101,101,0.15)', border: '1px solid rgba(245,101,101,0.6)', borderRadius: 12, padding: '0.75rem 1.2rem', textAlign: 'center', marginBottom: '0.75rem', fontWeight: 700, color: '#fc8181', fontSize: '1rem', animation: 'fadeIn 0.25s ease' }}>
          🔒 {claimAlert}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 185px', gap: '1rem', alignItems: 'start' }}>
        {/* SVG Maze */}
        <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 16, border: '1px solid rgba(240,180,0,0.12)', overflow: 'hidden' }}>
          <MazeSVG
            players={shared.players} blocked={shared.blocked}
            trails={shared.trails || {}} claimed={shared.claimed || {}}
            hlNodes={hlNodes} onNodeClick={onNodeClick}
            myGroup={myGroup}
          />
        </div>

        {/* Side info */}
        <div>
          <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '0.4rem' }}>Nhóm</div>
          {CHARACTERS.map((c, i) => {
            const p = shared.players[i];
            if (!p) return (
              <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '0.4rem 0.6rem', marginBottom: '0.3rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)' }}>
                {c.emoji} Nhóm {i + 1} <span style={{ fontSize: '0.65rem' }}>— chưa vào</span>
              </div>
            );
            return (
              <div key={i} style={{ background: i === myGroup ? `${c.color}18` : 'rgba(255,255,255,0.04)', border: `1px solid ${i === myGroup ? c.color + '55' : 'rgba(255,255,255,0.08)'}`, borderRadius: 8, padding: '0.4rem 0.6rem', marginBottom: '0.3rem', transition: 'all 0.3s' }}>
                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: p.finished ? '#68d391' : c.color, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {c.emoji} Nhóm {i + 1}
                  {p.finished && <span style={{ fontSize: '0.62rem', background: 'rgba(104,211,145,0.2)', borderRadius: 4, padding: '0 4px' }}>✓#{p.rank}</span>}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,200,150,0.5)', marginTop: '0.1rem' }}>
                  ✅ {p.correct} &nbsp; ❌ {p.wrong}
                </div>
              </div>
            );
          })}

          {shared.leaderboard.length > 0 && (
            <>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', letterSpacing: 2, textTransform: 'uppercase', margin: '0.75rem 0 0.4rem' }}>Đích</div>
              {shared.leaderboard.map((b, i) => (
                <div key={b.gid} style={{ background: 'rgba(240,180,0,0.08)', border: '1px solid rgba(240,180,0,0.2)', borderRadius: 7, padding: '0.35rem 0.55rem', marginBottom: '0.25rem', fontSize: '0.73rem' }}>
                  <span style={{ color: '#f0b400', fontWeight: 700 }}>#{i + 1}</span> {b.char?.emoji} Nhóm {b.gid + 1} — {b.time}s
                  <span style={{ float: 'right', color: '#f0b400', fontWeight: 700 }}>{b.score}đ</span>
                </div>
              ))}
            </>
          )}

          {/* Status tip */}
          {!myPlayer?.finished && hlNodes.length === 0 && myPlayer && (
            <div style={{ marginTop: '0.75rem', background: 'rgba(252,129,74,0.12)', border: '1px solid rgba(252,129,74,0.3)', borderRadius: 8, padding: '0.5rem 0.6rem', fontSize: '0.73rem', color: '#fbd38d' }}>
              ⚠️ Tất cả đường xung quanh đã bị chặn!
            </div>
          )}
        </div>
      </div>

      {qModal && (
        <QuestionModal
          q={qModal.q} selAns={selAns} setSelAns={setSelAns}
          result={result} onSubmit={onSubmit}
          ch={CHARACTERS[myGroup]}
        />
      )}
    </div>
  );
}

/* ═══════════════ SVG MAZE ═══════════════ */
function hexPath(cx, cy, r) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 - 30) * Math.PI / 180;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  });
  return `M ${pts[0]} L ${pts.slice(1).join(' L ')} Z`;
}

function MazeSVG({ players, blocked, trails, claimed, hlNodes, onNodeClick, myGroup }) {
  const myCh = CHARACTERS[myGroup];

  // Draw edges
  const edgeEls = Object.values(EDGES).map(edge => {
    const na = NODES[edge.from], nb = NODES[edge.to];
    const isBlocked = !!blocked[edge.id];
    const trailGid  = trails[edge.id] ?? null; // group that walked this edge
    const [ax, ay] = na.pos, [bx, by] = nb.pos;
    const midX = (ax + bx) / 2, midY = (ay + by) / 2;
    const trailColor = trailGid !== null ? CHARACTERS[trailGid].color : null;

    return (
      <g key={edge.id}>
        {/* Trail glow layer — drawn behind the edge line */}
        {trailColor && !isBlocked && (
          <line x1={ax} y1={ay} x2={bx} y2={by}
            stroke={trailColor} strokeWidth="7" opacity="0.22" strokeLinecap="round"
          />
        )}
        {/* Main edge line */}
        <line x1={ax} y1={ay} x2={bx} y2={by}
          stroke={isBlocked ? '#9b2c2c' : trailColor ? trailColor : 'rgba(255,255,255,0.14)'}
          strokeWidth={isBlocked ? 3 : trailColor ? 2.5 : 2}
          opacity={isBlocked ? 1 : trailColor ? 0.85 : 1}
          strokeLinecap="round"
        />
        {isBlocked && (
          <>
            <circle cx={midX} cy={midY} r="8" fill="rgba(155,44,44,0.7)" />
            <text x={midX} y={midY} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#fc8181" fontWeight="bold">✕</text>
          </>
        )}
      </g>
    );
  });

  // Draw decorative rings
  const ringGuides = [305, 250, 225, 178, 153, 100, 55].map((r, i) => (
    <circle key={i} cx={CX} cy={CY} r={r}
      stroke="rgba(240,180,0,0.07)" strokeWidth="1" fill="none" strokeDasharray="3 9"
    />
  ));

  // Draw nodes
  const nodeEls = Object.entries(NODES).map(([id, node]) => {
    const [x, y] = node.pos;
    const isHL      = hlNodes.includes(id);
    const isCenter  = id === 'c';
    const here      = Object.entries(players).filter(([, p]) => p.pos === id);
    const claimedBy = claimed[id] ?? null;
    const claimCol  = claimedBy !== null ? CHARACTERS[claimedBy].color : null;
    const col       = isCenter ? '#f0b400' : (node.group >= 0 ? CHARACTERS[node.group].color : '#fff');
    const hexR      = isCenter ? 20 : node.ring === 0 ? 14 : node.sec ? 9 : 11;
    // Locked = claimed by another group → show dimmed with a lock indicator
    const isLocked  = claimedBy !== null && claimedBy !== myGroup;

    return (
      <g key={id} onClick={() => onNodeClick(id)} style={{ cursor: isHL ? 'pointer' : 'default' }}>
        {/* Pulse ring for clickable nodes */}
        {isHL && (
          <circle cx={x} cy={y} r={hexR + 10} fill="none" stroke={myCh.color} strokeWidth="1.5" opacity="0.5">
            <animate attributeName="r" values={`${hexR + 6};${hexR + 15};${hexR + 6}`} dur="1.3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.3s" repeatCount="indefinite" />
          </circle>
        )}

        {/* Claimed glow behind hex */}
        {claimCol && !isCenter && (
          <path d={hexPath(x, y, hexR + 4)} fill={claimCol} opacity="0.18" />
        )}

        {/* Hex cell body */}
        <path
          d={hexPath(x, y, hexR)}
          fill={isCenter ? 'rgba(240,180,0,0.12)' : claimCol ? `${claimCol}28` : 'rgba(8,6,18,0.9)'}
          stroke={isHL ? myCh.color : isCenter ? '#f0b400' : claimCol ? claimCol : col + (node.sec ? '55' : '88')}
          strokeWidth={isHL ? 2.5 : isCenter ? 2.5 : claimCol ? 2 : 1.5}
          opacity={isLocked ? 0.6 : 1}
        />

        {/* Center star */}
        {isCenter && (
          <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="#f0b400">★</text>
        )}

        {/* Lock icon on nodes claimed by another group (and no one standing there) */}
        {isLocked && here.length === 0 && (
          <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize={hexR > 10 ? 11 : 8} fill={claimCol} opacity="0.9">🔒</text>
        )}

        {/* Group number on empty start nodes */}
        {node.ring === 0 && here.length === 0 && !isLocked && (
          <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill={col} fontWeight="bold">
            {node.group + 1}
          </text>
        )}

        {/* Player emojis */}
        {here.map(([gidStr], pi) => {
          const gid  = Number(gidStr);
          const offX = here.length > 1 ? (pi - (here.length - 1) / 2) * 15 : 0;
          return (
            <text key={gid} x={x + offX} y={y} textAnchor="middle" dominantBaseline="middle"
              fontSize={isCenter ? 17 : 14}
              style={{ filter: gid === myGroup ? `drop-shadow(0 0 4px ${myCh.color})` : 'none' }}
            >
              {CHARACTERS[gid].emoji}
            </text>
          );
        })}
      </g>
    );
  });

  return (
    <svg viewBox="0 0 800 800" width="100%" style={{ maxHeight: 560, display: 'block' }}>
      <defs>
        <radialGradient id="mgBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#180a20" />
          <stop offset="100%" stopColor="#06040f" />
        </radialGradient>
      </defs>
      <rect width="800" height="800" fill="url(#mgBg)" />
      {ringGuides}
      {edgeEls}
      {nodeEls}
      <text x={CX} y={CY + 33} textAnchor="middle" fill="rgba(240,180,0,0.5)" fontSize="9" fontWeight="bold" letterSpacing="2">
        ĐÍCH
      </text>
    </svg>
  );
}

/* ═══════════════ ADMIN LOGIN MODAL ═══════════════ */
function AdminLoginModal({ onClose, onSuccess }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err,  setErr]  = useState('');

  function doLogin() {
    if (user === ADMIN_CREDS.user && pass === ADMIN_CREDS.pass) {
      onSuccess();
    } else {
      setErr('Sai tài khoản hoặc mật khẩu!');
    }
  }

  function onKey(e) { if (e.key === 'Enter') doLogin(); }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 400, padding: '1rem' }}>
      <div style={{ background: 'linear-gradient(160deg,#120608,#0a0c1c)', border: '2px solid rgba(240,180,0,0.4)', borderRadius: 20, padding: '2rem', maxWidth: 360, width: '100%', boxShadow: '0 0 60px rgba(240,180,0,0.12)' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🔑</div>
          <div style={{ color: '#f0b400', fontWeight: 900, fontSize: '1.1rem', letterSpacing: 1 }}>ĐĂNG NHẬP ADMIN</div>
          <div style={{ color: 'rgba(255,200,150,0.5)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Chỉ quản trị viên mới được phép</div>
        </div>

        <div style={{ marginBottom: '0.85rem' }}>
          <div style={{ color: 'rgba(255,220,180,0.6)', fontSize: '0.75rem', marginBottom: '0.3rem', letterSpacing: 1 }}>TÀI KHOẢN</div>
          <input
            type="text" value={user} onChange={e => setUser(e.target.value)} onKeyDown={onKey}
            autoFocus placeholder="admin"
            style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '0.6rem 0.85rem', color: 'white', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ color: 'rgba(255,220,180,0.6)', fontSize: '0.75rem', marginBottom: '0.3rem', letterSpacing: 1 }}>MẬT KHẨU</div>
          <input
            type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={onKey}
            placeholder="••••••••"
            style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '0.6rem 0.85rem', color: 'white', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {err && (
          <div style={{ background: 'rgba(245,101,101,0.15)', border: '1px solid rgba(245,101,101,0.4)', borderRadius: 8, padding: '0.5rem 0.75rem', marginBottom: '1rem', color: '#fc8181', fontSize: '0.82rem', fontWeight: 600 }}>
            ⚠️ {err}
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            onClick={onClose}
            style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,200,150,0.7)', fontWeight: 600, fontSize: '0.85rem', padding: '0.65rem', borderRadius: 10, cursor: 'pointer' }}
          >
            Hủy
          </button>
          <button
            onClick={doLogin}
            style={{ flex: 2, background: 'linear-gradient(135deg,#7f5800,#c8960a)', border: 'none', color: 'white', fontWeight: 700, fontSize: '0.9rem', padding: '0.65rem', borderRadius: 10, cursor: 'pointer', letterSpacing: 0.5 }}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ QUESTION MODAL ═══════════════ */
function QuestionModal({ q, selAns, setSelAns, result, onSubmit, ch }) {
  const labels = ['A', 'B', 'C', 'D'];
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300, padding: '1rem' }}>
      <div style={{ background: 'linear-gradient(160deg,#120608,#0a0c1c)', border: `2px solid ${ch.color}66`, borderRadius: 20, padding: '2rem', maxWidth: 520, width: '100%', boxShadow: `0 0 80px ${ch.color}22` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '1.8rem' }}>{ch.emoji}</span>
          <div>
            <div style={{ color: ch.color, fontWeight: 700, fontSize: '0.8rem', letterSpacing: 1 }}>CÂU HỎI LỊCH SỬ</div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem' }}>Trả lời đúng để di chuyển</div>
          </div>
        </div>

        <p style={{ fontSize: 'clamp(0.92rem,2vw,1.05rem)', fontWeight: 600, lineHeight: 1.75, marginBottom: '1.4rem', color: 'rgba(255,225,200,0.95)' }}>
          {q.q}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.4rem' }}>
          {q.opts.map((opt, i) => {
            let bg = 'rgba(255,255,255,0.05)'; let border = 'rgba(255,255,255,0.1)'; let color = 'rgba(255,220,200,0.85)';
            if (result) {
              if (i === q.ans) { bg = 'rgba(72,187,120,0.18)'; border = '#68d391'; color = '#68d391'; }
              else if (i === selAns) { bg = 'rgba(245,101,101,0.18)'; border = '#fc8181'; color = '#fc8181'; }
            } else if (i === selAns) { bg = `${ch.color}20`; border = ch.color; color = ch.color; }
            return (
              <button key={i} onClick={() => { if (!result) setSelAns(i); }} disabled={!!result}
                style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 10, padding: '0.65rem 0.8rem', color, cursor: result ? 'default' : 'pointer', textAlign: 'left', fontSize: '0.84rem', lineHeight: 1.4, transition: 'all 0.2s', fontWeight: i === selAns ? 700 : 400 }}
              >
                <span style={{ fontWeight: 700, marginRight: '0.3rem' }}>{labels[i]}.</span>{opt}
              </button>
            );
          })}
        </div>

        {result ? (
          <div style={{ textAlign: 'center', fontSize: '1.15rem', fontWeight: 700, color: result === 'ok' ? '#68d391' : '#fc8181' }}>
            {result === 'ok' ? '✅ Chính xác! Tiến lên!' : '❌ Sai rồi! Đường này bị chặn!'}
          </div>
        ) : (
          <button onClick={onSubmit} disabled={selAns === null}
            style={{ width: '100%', background: selAns !== null ? 'linear-gradient(135deg,#7f0000,#cc0000)' : 'rgba(255,255,255,0.08)', border: 'none', color: 'white', fontWeight: 700, fontSize: '1rem', padding: '0.8rem', borderRadius: 12, cursor: selAns !== null ? 'pointer' : 'not-allowed', opacity: selAns !== null ? 1 : 0.45, letterSpacing: 1 }}
          >
            XÁC NHẬN
          </button>
        )}
      </div>
    </div>
  );
}
