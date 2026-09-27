import type { KeyboardEvent, ReactNode } from "react";
import { menu, type MenuItem } from "@/data/cafeMenu";
import { ItemArt } from "./ItemArt";

export type Hotspot = "menu" | "pantry" | "staff" | "guestbook" | "barista" | "stamps";

type Props = {
  onHotspot: (h: Hotspot) => void;
  brewing: boolean;
  talking: boolean;
  served: MenuItem | null;
  stampCount: number;
};

const SKIN = "#F2D5B8";
const HAIR = "#2A2522";
const INK = "#2E2B27";

function Spot({
  id,
  label,
  tipX,
  tipY,
  onHotspot,
  children,
}: {
  id: Hotspot;
  label: string;
  tipX: number;
  tipY: number;
  onHotspot: (h: Hotspot) => void;
  children: ReactNode;
}) {
  const w = label.length * 8.4 + 28;
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onHotspot(id);
    }
  };
  return (
    <g className="cafe-hotspot" role="button" tabIndex={0} aria-label={label} onClick={() => onHotspot(id)} onKeyDown={onKeyDown}>
      <g className="cafe-hotspot-body">{children}</g>
      <circle className="cafe-hint" cx={tipX} cy={tipY + 30} r="5" fill="#FFF6DE" stroke="#E2C27A" strokeWidth="1.5" pointerEvents="none" />
      <g className="cafe-hotspot-label" pointerEvents="none">
        <rect x={tipX - w / 2} y={tipY - 16} width={w} height="30" fill="#2B2824" />
        <text x={tipX} y={tipY + 4} textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="12" letterSpacing="2" fill="#F8F4EC">
          {label.toUpperCase()}
        </text>
      </g>
    </g>
  );
}

function Lamp({ x }: { x: number }) {
  return (
    <g>
      <line x1={x} y1="0" x2={x} y2="130" stroke="#6B5846" strokeWidth="2" />
      <ellipse cx={x} cy="178" rx="70" ry="26" fill="#FFE9BE" opacity="0.5" filter="url(#c-glow)" />
      <path d={`M${x - 34},168 Q${x - 30},128 ${x},128 Q${x + 30},128 ${x + 34},168 Z`} fill="#E9DFCF" />
      <ellipse cx={x} cy="168" rx="34" ry="6" fill="#FFF3D6" />
    </g>
  );
}

function Barista({ brewing, talking }: { brewing: boolean; talking: boolean }) {
  return (
    <g className="cafe-bob">
      {/* hair back + neck */}
      <ellipse cx="800" cy="352" rx="70" ry="70" fill={HAIR} />
      <rect x="784" y="400" width="32" height="44" fill="#E6C6A6" />

      {/* shirt + apron */}
      <path d="M688,700 L698,486 Q704,452 746,440 L854,440 Q896,452 902,486 L912,700 Z" fill="#F7F4EE" />
      <path d="M776,440 L800,468 L824,440" fill="none" stroke="#DCD3C4" strokeWidth="2" />
      <path d="M758,472 L842,472 L846,508 L754,508 Z" fill="#4A6741" />
      <path d="M728,506 L872,506 L886,700 L714,700 Z" fill="#4A6741" />
      <line x1="760" y1="474" x2="744" y2="444" stroke="#4A6741" strokeWidth="6" />
      <line x1="840" y1="474" x2="856" y2="444" stroke="#4A6741" strokeWidth="6" />
      <rect x="770" y="560" width="60" height="40" fill="none" stroke="#3B5434" strokeWidth="2" />
      <text x="800" y="588" textAnchor="middle" fontFamily="var(--font-cormorant), serif" fontStyle="italic" fontWeight="600" fontSize="22" fill="#EBF0E9">
        G
      </text>

      {/* left arm, resting on the counter */}
      <path d="M704,480 Q688,560 722,628" stroke="#F7F4EE" strokeWidth="30" strokeLinecap="round" fill="none" />
      <circle cx="728" cy="634" r="13" fill={SKIN} />

      {/* head */}
      <circle cx="740" cy="368" r="10" fill={SKIN} />
      <circle cx="860" cy="368" r="10" fill={SKIN} />
      <circle cx="800" cy="362" r="60" fill={SKIN} />
      <path
        d="M738,352 Q740,290 800,288 Q862,290 864,352 Q852,322 832,318 Q816,338 792,322 Q772,338 754,330 Q744,338 738,352 Z"
        fill={HAIR}
      />
      <g className="cafe-blink" style={{ transformOrigin: "800px 374px" }}>
        {brewing ? (
          <>
            <path d="M772,374 q8,-7 16,0" stroke={HAIR} strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M812,374 q8,-7 16,0" stroke={HAIR} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="780" cy="374" rx="5" ry="6.5" fill={HAIR} />
            <ellipse cx="820" cy="374" rx="5" ry="6.5" fill={HAIR} />
            <circle cx="782" cy="371" r="1.6" fill="#FFFFFF" />
            <circle cx="822" cy="371" r="1.6" fill="#FFFFFF" />
          </>
        )}
      </g>
      <ellipse cx="766" cy="392" rx="10" ry="5" fill="#E89A9A" opacity="0.4" />
      <ellipse cx="834" cy="392" rx="10" ry="5" fill="#E89A9A" opacity="0.4" />
      {talking ? (
        <ellipse className="cafe-talk" cx="800" cy="400" rx="7" ry="5" fill="#8C4A44" style={{ transformOrigin: "800px 400px" }} />
      ) : (
        <path d="M790,397 Q800,406 810,397" stroke="#8C4A44" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
    </g>
  );
}

function WhiskArm({ brewing }: { brewing: boolean }) {
  return (
    <g className="cafe-bob">
      <g className={brewing ? "cafe-whisk" : undefined} style={{ transformOrigin: "896px 486px" }}>
        <path d="M896,486 Q914,570 850,604" stroke="#F7F4EE" strokeWidth="30" strokeLinecap="round" fill="none" />
        {/* chasen */}
        <rect x="834" y="560" width="9" height="46" fill="#C9AE7C" />
        <path d="M828,606 L849,606 L853,640 L824,640 Z" fill="#E3D2AA" />
        {[829, 835, 841, 847].map((x) => (
          <line key={x} x1={x} y1="608" x2={x + (x - 838) * 0.3} y2="640" stroke="#BFA474" strokeWidth="1" />
        ))}
        <circle cx="846" cy="600" r="13" fill={SKIN} />
      </g>
    </g>
  );
}

export function CounterScene({ onHotspot, brewing, talking, served, stampCount }: Props) {
  return (
    <svg
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full select-none"
      role="group"
      aria-label="Café counter with the barista, a menu board, a tea pantry, a guestbook and a stamp card"
    >
      <defs>
        <linearGradient id="c-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EFE9E0" />
          <stop offset="1" stopColor="#F5F1EA" />
        </linearGradient>
        <linearGradient id="c-slats" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#CFB690" />
          <stop offset="0.5" stopColor="#DCC5A1" />
          <stop offset="1" stopColor="#CDB38C" />
        </linearGradient>
        <linearGradient id="c-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6F2EB" />
          <stop offset="1" stopColor="#E9E2D6" />
        </linearGradient>
        <linearGradient id="c-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C29E73" />
          <stop offset="1" stopColor="#A57F55" />
        </linearGradient>
        <radialGradient id="c-vignette" cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.6" stopColor="#3A2F25" stopOpacity="0" />
          <stop offset="1" stopColor="#3A2F25" stopOpacity="0.18" />
        </radialGradient>
        <filter id="c-glow" x="-50%" y="-100%" width="200%" height="300%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      {/* Walls */}
      <rect width="1600" height="1000" fill="url(#c-wall)" />
      <rect width="1600" height="56" fill="#E7E0D5" />
      <rect y="56" width="1600" height="4" fill="#FFE7B8" opacity="0.8" />

      {/* Slatted wood feature wall */}
      <rect x="480" y="60" width="640" height="590" fill="url(#c-slats)" />
      {Array.from({ length: 45 }, (_, i) => (
        <line key={i} x1={488 + i * 14} y1="60" x2={488 + i * 14} y2="650" stroke="#9C7C57" strokeOpacity="0.28" strokeWidth="2" />
      ))}

      {/* Doorway with noren */}
      <rect x="690" y="150" width="220" height="500" fill="#3A342E" />
      <rect x="690" y="150" width="220" height="10" fill="#8A6A4A" />
      <path d="M690,160 L797,160 L797,330 L690,330 Z" fill="#4A6741" />
      <path d="M803,160 L910,160 L910,330 L803,330 Z" fill="#4A6741" />
      <circle cx="800" cy="236" r="34" fill="#F4F0E8" />
      <text x="800" y="250" textAnchor="middle" fontSize="38" fill="#4A6741" fontFamily="serif">抹</text>

      <Lamp x={560} />
      <Lamp x={1040} />

      {/* Menu board */}
      <Spot id="menu" label="Menu board" tipX={280} tipY={96} onHotspot={onHotspot}>
        <line x1="170" y1="56" x2="170" y2="118" stroke="#6B5846" strokeWidth="2" />
        <line x1="390" y1="56" x2="390" y2="118" stroke="#6B5846" strokeWidth="2" />
        <rect x="100" y="118" width="360" height="330" fill="#8A6A4A" />
        <rect x="112" y="130" width="336" height="306" fill="#2F2C28" />
        <text x="280" y="176" textAnchor="middle" fontFamily="var(--font-cormorant), serif" fontStyle="italic" fontWeight="600" fontSize="34" fill="#F1ECE3">
          Menu
        </text>
        <text x="280" y="198" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="10" letterSpacing="4" fill="#A9B67E">
          お品書き
        </text>
        {menu.map((c, i) => (
          <g key={c.id}>
            <text x="140" y={244 + i * 46} fontFamily="var(--font-sans), sans-serif" fontSize="17" fill="#F1ECE3">
              {c.name}
            </text>
            <text x="140" y={262 + i * 46} fontFamily="var(--font-mono), monospace" fontSize="9" letterSpacing="2" fill="#9A9186">
              {c.jp} · {c.items.length} ITEMS
            </text>
          </g>
        ))}
      </Spot>

      {/* Employee of the month */}
      <Spot id="staff" label="Staff card" tipX={270} tipY={480} onHotspot={onHotspot}>
        <rect x="205" y="500" width="130" height="118" fill="#8A6A4A" />
        <rect x="213" y="508" width="114" height="102" fill="#F4F0E8" />
        <circle cx="270" cy="548" r="22" fill={SKIN} />
        <path d="M248,546 Q250,522 270,522 Q292,522 293,546 Q284,536 270,538 Q256,536 248,546 Z" fill={HAIR} />
        <path d="M240,610 Q244,574 270,572 Q296,574 300,610 Z" fill="#4A6741" />
        <text x="270" y="632" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="8" letterSpacing="2" fill="#7A7269">
          EMPLOYEE OF THE MONTH
        </text>
      </Spot>

      {/* Pantry shelf */}
      <Spot id="pantry" label="Pantry" tipX={1340} tipY={150} onHotspot={onHotspot}>
        <rect x="1170" y="176" width="340" height="120" fill="#000" opacity="0" />
        {[
          { x: 1190, c: "#4A6741", h: 70 },
          { x: 1250, c: "#F1ECE3", h: 58 },
          { x: 1306, c: "#2F2C28", h: 76 },
          { x: 1366, c: "#7A9B72", h: 62 },
          { x: 1426, c: "#A7784F", h: 70 },
        ].map((t) => (
          <g key={t.x}>
            <rect x={t.x} y={286 - t.h} width="44" height={t.h} fill={t.c} stroke="#00000018" />
            <rect x={t.x - 2} y={286 - t.h} width="48" height="10" fill="#000" opacity="0.18" />
            <rect x={t.x + 8} y={286 - t.h + 22} width="28" height="22" fill="#F8F4EC" opacity="0.9" />
          </g>
        ))}
        <rect x="1160" y="286" width="360" height="12" fill="#B38E63" />
        <rect x="1160" y="298" width="360" height="4" fill="#000" opacity="0.08" />
      </Spot>

      {/* Lower shelf with chawan */}
      <rect x="1160" y="456" width="360" height="12" fill="#B38E63" />
      {[1200, 1290, 1380, 1460].map((x, i) => (
        <g key={x}>
          <path d={`M${x - 28},${420} Q${x - 26},456 ${x},456 Q${x + 26},456 ${x + 28},420 Z`} fill={["#2E2B27", "#E7DCC8", "#6E7F5A", "#C9A57A"][i]} />
          <ellipse cx={x} cy="420" rx="28" ry="6" fill="#000" opacity="0.15" />
        </g>
      ))}

      {/* Barista (behind the counter) */}
      <Spot id="barista" label="Chat with Gordon" tipX={800} tipY={262} onHotspot={onHotspot}>
        <Barista brewing={brewing} talking={talking} />
      </Spot>

      {/* Counter */}
      <rect x="0" y="640" width="1600" height="64" fill="url(#c-top)" />
      <rect x="0" y="700" width="1600" height="4" fill="#000" opacity="0.08" />
      <rect x="0" y="704" width="1600" height="296" fill="url(#c-front)" />
      {Array.from({ length: 80 }, (_, i) => (
        <line key={i} x1={i * 20 + 10} y1="704" x2={i * 20 + 10} y2="1000" stroke="#7E5E3E" strokeOpacity="0.2" strokeWidth="2" />
      ))}
      <text x="800" y="748" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="14" letterSpacing="8" fill="#F7F0E4" opacity="0.85">
        GORDON&apos;S MATCHA
      </text>

      {/* Plant */}
      <path d="M60,682 L66,640 L114,640 L120,682 Z" fill="#E7DCC8" />
      {[[-30, -60], [-10, -80], [14, -70], [30, -52], [0, -50], [-22, -40], [24, -36]].map(([dx, dy], i) => (
        <ellipse key={i} cx={90 + dx} cy={640 + dy} rx="16" ry="7" fill={["#6F7F4E", "#839459", "#97A66B"][i % 3]} transform={`rotate(${dx * 1.5} ${90 + dx} ${640 + dy})`} />
      ))}

      {/* Register */}
      <path d="M340,680 L350,628 L450,628 L460,680 Z" fill="#2F2C28" />
      <rect x="360" y="592" width="80" height="44" fill="#3A342E" />
      <rect x="368" y="600" width="64" height="26" fill="#A9C27F" opacity="0.8" />

      {/* Stamp card */}
      <Spot id="stamps" label="Stamp card" tipX={540} tipY={600} onHotspot={onHotspot}>
        <path d="M488,672 L500,648 L600,648 L592,672 Z" fill="#F8F4EC" stroke="#CDBFA8" />
        {Array.from({ length: 5 }, (_, i) => (
          <ellipse
            key={i}
            cx={510 + i * 17}
            cy="660"
            rx="6"
            ry="4"
            fill={i < Math.min(5, stampCount) ? "#C94D4D" : "none"}
            stroke="#C94D4D"
            strokeOpacity="0.6"
          />
        ))}
      </Spot>

      {/* Chawan the barista is whisking */}
      <ellipse cx="838" cy="676" rx="34" ry="6" fill="#000" opacity="0.1" />
      <path d="M804,646 Q806,676 838,678 Q870,676 872,646 Z" fill={INK} />
      <ellipse cx="838" cy="646" rx="34" ry="7" fill="#3A3530" />
      <ellipse cx="838" cy="647" rx="30" ry="5" fill={brewing ? "#8DB26B" : "#6E9A48"} />
      {brewing && (
        <g className="cafe-steam" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8">
          <path d="M820,630 q-6,-10 0,-20 q6,-10 0,-20" />
          <path d="M856,630 q-6,-10 0,-20 q6,-10 0,-20" style={{ animationDelay: "0.9s" }} />
        </g>
      )}
      <WhiskArm brewing={brewing} />

      {/* Served order */}
      {served && (
        <g className="cafe-serve">
          <ItemArt art={served.art} color={served.color} x={884} y={560} size={124} />
        </g>
      )}

      {/* Guestbook + tip jar */}
      <Spot id="guestbook" label="Guestbook" tipX={1180} tipY={590} onHotspot={onHotspot}>
        <path d="M1100,680 L1116,650 L1180,654 L1178,684 Z" fill="#FBF8F2" stroke="#CDBFA8" />
        <path d="M1178,684 L1180,654 L1244,650 L1260,680 Z" fill="#F4EFE6" stroke="#CDBFA8" />
        {[660, 667, 674].map((y) => (
          <line key={y} x1="1124" y1={y} x2="1170" y2={y + 1} stroke="#9A9186" strokeOpacity="0.5" />
        ))}
        <rect x="1196" y="660" width="48" height="3" fill="#2F2C28" transform="rotate(-8 1220 662)" />
        <path d="M1284,684 L1286,620 L1334,620 L1336,684 Z" fill="#FFFFFF" opacity="0.5" stroke="#D9D2C6" />
        <rect x="1290" y="656" width="40" height="26" fill="#D9C08A" opacity="0.7" />
        <text x="1310" y="646" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="9" letterSpacing="1" fill="#7A7269">
          TIPS
        </text>
      </Spot>

      <rect width="1600" height="1000" fill="url(#c-vignette)" pointerEvents="none" />
    </svg>
  );
}
