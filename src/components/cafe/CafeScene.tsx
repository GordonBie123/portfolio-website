// Illustrated storefront, drawn in a 1600×1000 viewBox and cropped to fill.
// Everything procedural (leaves, motes) uses a seeded RNG so server and client
// render identical markup.

export const SCENE_W = 1600;
export const SCENE_H = 1000;
// Point the camera zooms into when entering (centre of the counter)
export const COUNTER_FOCUS = { x: 620, y: 720 };

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const r2 = (n: number) => Math.round(n * 100) / 100;

const LEAF_COLORS = ["#6F7F4E", "#839459", "#97A66B", "#A9B67E", "#5E6E42", "#8C9A62"];

type Leaf = { x: number; y: number; rx: number; ry: number; rot: number; fill: string; o: number };

function makeCanopy(seed: number, clusters: { x: number; y: number; r: number }[], perCluster: number, s: number) {
  const rand = rng(seed);
  const leaves: Leaf[] = [];
  for (const c of clusters) {
    for (let i = 0; i < perCluster; i++) {
      // bias toward the cluster centre, flattened vertically
      const a = rand() * Math.PI * 2;
      const d = Math.sqrt(rand()) * c.r;
      leaves.push({
        x: r2(c.x + Math.cos(a) * d),
        y: r2(c.y + Math.sin(a) * d * 0.72),
        rx: r2((5 + rand() * 4) * s),
        ry: r2((2 + rand() * 1.6) * s),
        rot: r2(rand() * 180),
        fill: LEAF_COLORS[Math.floor(rand() * LEAF_COLORS.length)],
        o: r2(0.75 + rand() * 0.25),
      });
    }
  }
  return leaves;
}

function Tree({ cx, baseY, s, seed, delay = 0 }: { cx: number; baseY: number; s: number; seed: number; delay?: number }) {
  const top = baseY - 300 * s;
  const clusters = [
    { x: cx - 95 * s, y: top + 70 * s, r: 70 * s },
    { x: cx + 90 * s, y: top + 60 * s, r: 75 * s },
    { x: cx - 10 * s, y: top + 10 * s, r: 80 * s },
    { x: cx - 150 * s, y: top + 130 * s, r: 50 * s },
    { x: cx + 150 * s, y: top + 125 * s, r: 55 * s },
    { x: cx + 20 * s, y: top + 95 * s, r: 65 * s },
  ];
  const leaves = makeCanopy(seed, clusters, Math.round(95 * Math.min(1, s + 0.2)), s);
  const trunk = "#6B5846";

  return (
    <g className="cafe-sway" style={{ transformOrigin: `${cx}px ${baseY}px`, animationDelay: `${delay}s` }}>
      <g stroke={trunk} strokeLinecap="round" fill="none">
        <path d={`M${cx},${baseY} C${cx - 6 * s},${baseY - 90 * s} ${cx + 10 * s},${baseY - 160 * s} ${cx - 4 * s},${top + 40 * s}`} strokeWidth={9 * s} />
        <path d={`M${cx - 2 * s},${baseY - 120 * s} C${cx - 40 * s},${baseY - 170 * s} ${cx - 80 * s},${top + 110 * s} ${cx - 120 * s},${top + 90 * s}`} strokeWidth={5 * s} />
        <path d={`M${cx + 2 * s},${baseY - 150 * s} C${cx + 40 * s},${baseY - 190 * s} ${cx + 80 * s},${top + 100 * s} ${cx + 115 * s},${top + 80 * s}`} strokeWidth={5 * s} />
        <path d={`M${cx - 30 * s},${baseY - 175 * s} C${cx - 90 * s},${baseY - 190 * s} ${cx - 130 * s},${top + 150 * s} ${cx - 160 * s},${top + 140 * s}`} strokeWidth={3 * s} />
        <path d={`M${cx + 30 * s},${baseY - 185 * s} C${cx + 100 * s},${baseY - 200 * s} ${cx + 130 * s},${top + 150 * s} ${cx + 160 * s},${top + 130 * s}`} strokeWidth={3 * s} />
      </g>
      {leaves.map((l, i) => (
        <ellipse
          key={i}
          cx={l.x}
          cy={l.y}
          rx={l.rx}
          ry={l.ry}
          fill={l.fill}
          opacity={l.o}
          transform={`rotate(${l.rot} ${l.x} ${l.y})`}
        />
      ))}
    </g>
  );
}

// Front half of an elliptical ring bench: side face, then seat top
function RingBench({ cx, cy, rx, ry, w, h }: { cx: number; cy: number; rx: number; ry: number; w: number; h: number }) {
  const irx = rx - w;
  const iry = ry - (w * ry) / rx;
  const slats = Array.from({ length: 18 }, (_, i) => {
    const t = Math.PI * (i / 17);
    const x = cx - Math.cos(t) * rx;
    const y = cy + Math.sin(t) * ry;
    return { x: r2(x), y: r2(y) };
  });
  return (
    <g>
      <ellipse cx={cx} cy={cy + h + 4} rx={rx + 20} ry={ry * 0.6} fill="#000" opacity="0.06" />
      {/* back rest (rear half, behind the tree) */}
      <path
        d={`M${cx - irx},${cy} A${irx},${iry} 0 0 1 ${cx + irx},${cy} L${cx + irx},${cy - h * 0.9} A${irx},${iry} 0 0 0 ${cx - irx},${cy - h * 0.9} Z`}
        fill="url(#wood-dark)"
      />
      <path
        d={`M${cx - rx},${cy} A${rx},${ry} 0 0 0 ${cx + rx},${cy} L${cx + rx},${cy + h} A${rx},${ry} 0 0 1 ${cx - rx},${cy + h} Z`}
        fill="url(#wood-side)"
      />
      {slats.map((p, i) => (
        <line key={i} x1={p.x} y1={p.y} x2={p.x} y2={p.y + h} stroke="#8A6A4A" strokeOpacity="0.25" strokeWidth="1.2" />
      ))}
      <path
        d={`M${cx - rx},${cy} A${rx},${ry} 0 0 0 ${cx + rx},${cy} L${cx + irx},${cy} A${irx},${iry} 0 0 1 ${cx - irx},${cy} Z`}
        fill="#E2CFB0"
      />
    </g>
  );
}

function Stool({ cx, cy, rx, ry, h }: { cx: number; cy: number; rx: number; ry: number; h: number }) {
  return (
    <g>
      <ellipse cx={cx + 8} cy={cy + h + 2} rx={rx * 1.15} ry={ry * 0.9} fill="#000" opacity="0.07" />
      <path d={`M${cx - rx},${cy} L${cx - rx},${cy + h} A${rx},${ry} 0 0 0 ${cx + rx},${cy + h} L${cx + rx},${cy} Z`} fill="url(#wood-side)" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#DCC6A3" />
      <ellipse cx={cx} cy={cy} rx={rx * 0.7} ry={ry * 0.7} fill="none" stroke="#C8AE87" strokeOpacity="0.5" />
    </g>
  );
}

function Table({ x, y, w, d, legH }: { x: number; y: number; w: number; d: number; legH: number }) {
  return (
    <g>
      <rect x={x + 10} y={y + legH + d - 4} width={w} height="8" fill="#000" opacity="0.05" />
      {[x + 14, x + w - 18].map((lx) => (
        <rect key={lx} x={lx} y={y + d} width="5" height={legH} fill="#8A6A4A" />
      ))}
      <path d={`M${x + 14},${y} L${x + w + 14},${y} L${x + w},${y + d} L${x},${y + d} Z`} fill="#D9C19C" />
      <rect x={x} y={y + d} width={w} height="6" fill="#B89468" />
    </g>
  );
}

function Tins({ x, y }: { x: number; y: number }) {
  const tins = [
    { w: 16, h: 28, c: "#4A6741" },
    { w: 16, h: 28, c: "#F1ECE3" },
    { w: 12, h: 20, c: "#2F2C28" },
    { w: 18, h: 32, c: "#7A9B72" },
    { w: 14, h: 22, c: "#E7DCCB" },
    { w: 16, h: 28, c: "#4A6741" },
    { w: 10, h: 34, c: "#3A342E" },
  ];
  let cx = x;
  return (
    <g>
      {tins.map((t, i) => {
        const el = (
          <g key={i}>
            <rect x={cx} y={y - t.h} width={t.w} height={t.h} fill={t.c} />
            <rect x={cx} y={y - t.h} width={t.w} height="3" fill="#000" opacity="0.12" />
          </g>
        );
        cx += t.w + (i % 3 === 2 ? 26 : 8);
        return el;
      })}
    </g>
  );
}

const moteRand = rng(7);
const MOTES = Array.from({ length: 22 }, () => ({
  x: r2(880 + moteRand() * 480),
  y: r2(340 + moteRand() * 340),
  r: r2(0.8 + moteRand() * 1.6),
  d: r2(moteRand() * 8),
  dur: r2(7 + moteRand() * 6),
}));

// Floor perspective lines
const VP = { x: 800, y: 380 };
const FLOOR_Y = 700;
const floorRays = Array.from({ length: 21 }, (_, i) => -1200 + i * 200);
const floorRows = [716, 738, 768, 810, 868, 945];

export function CafeScene({ onCounterClick, counterHint }: { onCounterClick?: () => void; counterHint?: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full select-none"
      role="img"
      aria-label="Illustration of a bright matcha café with a round skylight, olive trees and wooden benches"
    >
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4F0EA" />
          <stop offset="0.7" stopColor="#EDE6DB" />
          <stop offset="1" stopColor="#E4DCCF" />
        </linearGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E6DED2" />
          <stop offset="1" stopColor="#F1ECE4" />
        </linearGradient>
        <linearGradient id="curve-wall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#EAE3D8" />
          <stop offset="0.35" stopColor="#F5F1EA" />
          <stop offset="0.7" stopColor="#E8E0D4" />
          <stop offset="1" stopColor="#F2EDE5" />
        </linearGradient>
        <radialGradient id="skylight" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.75" stopColor="#FDFCFA" />
          <stop offset="1" stopColor="#F1ECE4" />
        </radialGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="wood-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C8A57C" />
          <stop offset="1" stopColor="#A8845C" />
        </linearGradient>
        <linearGradient id="wood-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B8966C" />
          <stop offset="1" stopColor="#9A7852" />
        </linearGradient>
        <linearGradient id="counter-front" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B38E63" />
          <stop offset="0.5" stopColor="#CBA87E" />
          <stop offset="1" stopColor="#A9845A" />
        </linearGradient>
        <linearGradient id="fascia" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBF9F5" />
          <stop offset="1" stopColor="#EFEAE2" />
        </linearGradient>
        <radialGradient id="warm" cx="0.25" cy="0.55" r="0.8">
          <stop offset="0" stopColor="#FFE9C7" stopOpacity="0.28" />
          <stop offset="1" stopColor="#FFE9C7" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.75">
          <stop offset="0.6" stopColor="#3A2F25" stopOpacity="0" />
          <stop offset="1" stopColor="#3A2F25" stopOpacity="0.16" />
        </radialGradient>
        <radialGradient id="counter-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFF4DC" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFF4DC" stopOpacity="0" />
        </radialGradient>
        <filter id="soft-glow" x="-30%" y="-80%" width="160%" height="260%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id="sign-halo" x="-10%" y="-60%" width="120%" height="220%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="b" />
          <feFlood floodColor="#FFF6E4" floodOpacity="0.95" />
          <feComposite in2="b" operator="in" result="halo" />
          <feMerge>
            <feMergeNode in="halo" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="floor-clip">
          <rect x="0" y={FLOOR_Y} width={SCENE_W} height={SCENE_H - FLOOR_Y} />
        </clipPath>
        <path id="sign-path" d="M-20,252 Q700,132 1620,187" />
      </defs>

      {/* Room shell */}
      <rect width={SCENE_W} height={SCENE_H} fill="url(#bg)" />

      {/* Ceiling downlights */}
      {[[260, 70], [520, 40], [1180, 60], [1420, 90], [1300, 30]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <ellipse cx={x} cy={y} rx="7" ry="3" fill="#FFFFFF" />
          <ellipse cx={x} cy={y} rx="7" ry="3" fill="none" stroke="#D9D2C6" />
        </g>
      ))}

      {/* Curved back wall under the dome */}
      <rect x="740" y="330" width="860" height={FLOOR_Y - 330} fill="url(#curve-wall)" />
      <rect x="0" y="420" width="760" height={FLOOR_Y - 420} fill="#F1ECE4" />
      <rect x="0" y="416" width="760" height="6" fill="#000" opacity="0.035" />

      {/* Skylight dome */}
      <ellipse cx="1120" cy="330" rx="400" ry="108" fill="#E7E0D5" />
      <ellipse cx="1120" cy="326" rx="360" ry="90" fill="#EFEAE2" />
      <ellipse cx="1120" cy="322" rx="330" ry="78" fill="#FFFFFF" filter="url(#soft-glow)" className="cafe-breathe" />
      <ellipse cx="1120" cy="322" rx="310" ry="70" fill="url(#skylight)" />
      <polygon points="830,340 1410,340 1560,700 700,700" fill="url(#beam)" style={{ mixBlendMode: "screen" }} />

      {/* Left wall niche with lit shelf */}
      <rect x="80" y="470" width="360" height="130" fill="#F7F4EE" />
      <rect x="80" y="470" width="360" height="5" fill="#000" opacity="0.05" />
      <rect x="80" y="552" width="360" height="4" fill="#FFE7B8" />
      <rect x="80" y="548" width="360" height="16" fill="#FFE7B8" opacity="0.35" filter="url(#soft-glow)" />
      <Tins x={110} y={550} />
      <text x="260" y="500" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="8" letterSpacing="3" fill="#9A9186">
        GORDON&apos;S MATCHA · 抹茶
      </text>

      {/* Floor */}
      <rect x="0" y={FLOOR_Y} width={SCENE_W} height={SCENE_H - FLOOR_Y} fill="url(#floor)" />
      <g clipPath="url(#floor-clip)" stroke="#8B7B68" strokeOpacity="0.09" strokeWidth="1.2">
        {floorRays.map((x) => (
          <line key={x} x1={VP.x} y1={VP.y} x2={x} y2={SCENE_H} />
        ))}
        {floorRows.map((y) => (
          <line key={y} x1="0" y1={y} x2={SCENE_W} y2={y} />
        ))}
      </g>
      <rect x="0" y={FLOOR_Y} width={SCENE_W} height="3" fill="#000" opacity="0.04" />

      {/* Distant tree + tables */}
      <g opacity="0.8">
        <Tree cx={1290} baseY={640} s={0.62} seed={31} delay={1.2} />
      </g>
      <Table x={1130} y={630} w={260} d={16} legH={38} />
      <Stool cx={1170} cy={676} rx={22} ry={6} h={20} />
      <Stool cx={1330} cy={676} rx={22} ry={6} h={20} />

      {/* Main tree with ring bench */}
      <Tree cx={1010} baseY={695} s={1} seed={11} />
      <RingBench cx={1010} cy={700} rx={185} ry={34} w={38} h={36} />

      {/* Right tree with ring bench */}
      <Tree cx={1490} baseY={705} s={0.9} seed={23} delay={0.6} />
      <RingBench cx={1490} cy={712} rx={150} ry={28} w={32} h={32} />

      {/* Service counter — the way in */}
      <g
        className={`cafe-counter ${onCounterClick ? "cursor-pointer" : ""}`}
        onClick={onCounterClick}
        role={onCounterClick ? "button" : undefined}
        tabIndex={onCounterClick ? 0 : undefined}
        aria-label={onCounterClick ? "Walk up to the counter and see the menu" : undefined}
        onKeyDown={(e) => {
          if (onCounterClick && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onCounterClick();
          }
        }}
      >
        <ellipse className="cafe-counter-glow" cx="620" cy="700" rx="260" ry="130" fill="url(#counter-glow)" opacity={counterHint ? 0.6 : 0} />
        <ellipse cx="630" cy="818" rx="220" ry="18" fill="#000" opacity="0.08" />
        <path d="M440,652 Q620,672 800,652 L800,806 Q620,826 440,806 Z" fill="url(#counter-front)" />
        {Array.from({ length: 24 }, (_, i) => {
          const x = 452 + i * 14.5;
          const bow = 10 * (1 - Math.pow((x - 620) / 180, 2));
          return <line key={i} x1={x} y1={652 + bow} x2={x} y2={806 + bow} stroke="#7E5E3E" strokeOpacity="0.22" strokeWidth="1.4" />;
        })}
        <path d="M428,640 Q620,662 812,640 L812,654 Q620,676 428,654 Z" fill="#F4F0E9" />
        <path d="M428,654 Q620,676 812,654 L812,658 Q620,680 428,658 Z" fill="#000" opacity="0.08" />

        {/* matcha bowl + whisk */}
        <ellipse cx="505" cy="646" rx="24" ry="6" fill="#2E2B27" />
        <path d="M481,646 Q484,628 505,626 Q526,628 529,646 Z" fill="#2E2B27" />
        <ellipse cx="505" cy="628" rx="20" ry="4.5" fill="#7A9B5A" />
        <ellipse cx="505" cy="628" rx="12" ry="2.5" fill="#A9C27F" opacity="0.7" />
        <g className="cafe-steam" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8">
          <path d="M498,620 q-6,-10 0,-20 q6,-10 0,-20" />
          <path d="M512,618 q-6,-10 0,-20 q6,-10 0,-20" style={{ animationDelay: "1.2s" }} />
        </g>
        <path d="M545,648 L551,622 L559,622 L565,648 Z" fill="#D9C7A6" />
        <rect x="551" y="608" width="8" height="15" fill="#8A6A4A" />

        {/* A-frame menu */}
        <path d="M688,646 L706,582 L746,582 L764,646" fill="#2F2C28" />
        <rect x="700" y="590" width="52" height="46" fill="#F6F1E7" />
        <text x="726" y="606" textAnchor="middle" fontFamily="var(--font-cormorant), serif" fontStyle="italic" fontWeight="600" fontSize="13" fill="#2F2C28">
          Menu
        </text>
        {[614, 620, 626, 632].map((y) => (
          <line key={y} x1="706" y1={y} x2="746" y2={y} stroke="#4A6741" strokeOpacity="0.5" />
        ))}

        {/* order sign */}
        <text x="620" y="740" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="11" letterSpacing="5" fill="#F7F0E4" opacity="0.9">
          ORDER HERE
        </text>
      </g>

      {/* Foreground stools */}
      <Stool cx={170} cy={835} rx={90} ry={20} h={78} />
      <Stool cx={330} cy={900} rx={70} ry={16} h={70} />
      <g>
        <rect x="-20" y="760" width="130" height="92" fill="url(#wood-side)" />
        <path d="M-20,760 L110,760 L126,748 L-4,748 Z" fill="#DCC6A3" />
      </g>

      {/* Curved fascia + halo-lit sign */}
      <path d="M-20,210 Q700,90 1620,145 L1620,0 L-20,0 Z" fill="#EDE8E0" />
      <path d="M-20,215 Q700,95 1620,150 L1620,220 Q700,165 -20,285 Z" fill="url(#fascia)" />
      <path d="M-20,285 Q700,165 1620,220 L1620,226 Q700,171 -20,291 Z" fill="#FFE7B8" opacity="0.7" />
      <path d="M-20,288 Q700,168 1620,223" stroke="#FFE7B8" strokeWidth="14" fill="none" opacity="0.35" filter="url(#soft-glow)" />
      <text
        className="cafe-sign"
        fontFamily="var(--font-sans), sans-serif"
        fontSize="42"
        fontWeight="500"
        letterSpacing="14"
        fill="#2B2824"
        filter="url(#sign-halo)"
      >
        <textPath href="#sign-path" startOffset="50%" textAnchor="middle" dominantBaseline="middle">
          GORDON&apos;S MATCHA
        </textPath>
      </text>

      {/* Light + atmosphere */}
      <rect width={SCENE_W} height={SCENE_H} fill="url(#warm)" pointerEvents="none" />
      <g pointerEvents="none">
        {MOTES.map((m, i) => (
          <circle
            key={i}
            className="cafe-mote"
            cx={m.x}
            cy={m.y}
            r={m.r}
            fill="#FFFFFF"
            style={{ animationDelay: `${m.d}s`, animationDuration: `${m.dur}s` }}
          />
        ))}
      </g>
      <rect width={SCENE_W} height={SCENE_H} fill="url(#vignette)" pointerEvents="none" />
    </svg>
  );
}
