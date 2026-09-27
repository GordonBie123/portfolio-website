import type { ArtKind } from "@/data/cafeMenu";

type Props = {
  art: ArtKind;
  color: string;
  className?: string;
  // Allows nesting inside the counter scene SVG
  x?: number;
  y?: number;
  size?: number;
};

const INK = "#2E2B27";
const PLATE = "#F4F0E8";

function Plate({ wide = false }: { wide?: boolean }) {
  return (
    <>
      <ellipse cx="60" cy="96" rx={wide ? 50 : 44} ry="11" fill="#000" opacity="0.08" />
      <ellipse cx="60" cy="92" rx={wide ? 48 : 42} ry="11" fill={PLATE} stroke="#DCD3C4" />
      <ellipse cx="60" cy="91" rx={wide ? 34 : 29} ry="6.5" fill="#EAE3D7" />
    </>
  );
}

function Steam() {
  return (
    <g className="cafe-steam" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.9">
      <path d="M52,34 q-5,-8 0,-16 q5,-8 0,-16" />
      <path d="M66,32 q-5,-8 0,-16 q5,-8 0,-16" style={{ animationDelay: "1.1s" }} />
    </g>
  );
}

function Art({ art, color }: { art: ArtKind; color: string }) {
  switch (art) {
    case "bowl":
      return (
        <>
          <ellipse cx="60" cy="98" rx="36" ry="7" fill="#000" opacity="0.08" />
          <path d="M22,58 Q24,96 60,97 Q96,96 98,58 Z" fill={INK} />
          <path d="M26,70 Q60,80 94,70" stroke="#4A443D" strokeWidth="2" fill="none" />
          <rect x="48" y="95" width="24" height="5" fill={INK} />
          <ellipse cx="60" cy="58" rx="38" ry="10" fill="#3A3530" />
          <ellipse cx="60" cy="59" rx="34" ry="8" fill={color} />
          <ellipse cx="56" cy="58" rx="18" ry="3.5" fill="#FFFFFF" opacity="0.18" />
          <Steam />
        </>
      );
    case "latte":
      return (
        <>
          <ellipse cx="60" cy="100" rx="42" ry="8" fill={PLATE} stroke="#DCD3C4" />
          <path d="M30,52 L36,96 Q60,102 84,96 L90,52 Z" fill="#FAF7F1" stroke="#DCD3C4" />
          <path d="M90,60 q16,2 12,18 q-3,10 -14,10" stroke="#DCD3C4" strokeWidth="5" fill="none" />
          <ellipse cx="60" cy="52" rx="30" ry="7" fill={color} />
          <path d="M60,49 q-8,1 -6,4 q2,3 6,1 q4,2 6,-1 q2,-3 -6,-4 Z" fill="#FFFFFF" opacity="0.85" />
          <Steam />
        </>
      );
    case "iced":
      return (
        <>
          <ellipse cx="60" cy="104" rx="26" ry="5" fill="#000" opacity="0.08" />
          <path d="M36,26 L40,102 L80,102 L84,26 Z" fill="#FFFFFF" opacity="0.55" stroke="#D9D2C6" />
          <path d="M39,56 L41,100 L79,100 L81,56 Z" fill={color} />
          <path d="M38,40 L39,56 L81,56 L82,40 Z" fill="#F7F2E8" />
          {[[46, 44], [62, 48], [52, 62], [68, 66]].map(([x, y]) => (
            <rect key={`${x}${y}`} x={x} y={y} width="12" height="11" fill="#FFFFFF" opacity="0.6" transform={`rotate(12 ${x + 6} ${y + 5})`} />
          ))}
          <rect x="66" y="6" width="5" height="60" fill="#4A6741" transform="rotate(10 68 36)" />
        </>
      );
    case "cup":
      return (
        <>
          <ellipse cx="60" cy="100" rx="30" ry="6" fill="#000" opacity="0.08" />
          <path d="M34,48 L38,98 Q60,103 82,98 L86,48 Z" fill="#E7DCC8" />
          <path d="M36,66 L84,66" stroke="#CBBBA0" strokeWidth="2" />
          <ellipse cx="60" cy="48" rx="26" ry="6" fill="#CBBBA0" />
          <ellipse cx="60" cy="49" rx="23" ry="4.5" fill={color} />
          <Steam />
        </>
      );
    case "mochi":
      return (
        <>
          <Plate />
          <ellipse cx="46" cy="80" rx="20" ry="15" fill={color} />
          <ellipse cx="74" cy="80" rx="20" ry="15" fill={color} filter="brightness(0.95)" />
          <ellipse cx="42" cy="74" rx="7" ry="3" fill="#FFFFFF" opacity="0.5" />
          <ellipse cx="70" cy="74" rx="7" ry="3" fill="#FFFFFF" opacity="0.5" />
          <path d="M62,64 q6,-10 16,-8 q-4,8 -16,8 Z" fill="#6E9A48" />
        </>
      );
    case "dango":
      return (
        <>
          <Plate wide />
          <rect x="18" y="80" width="84" height="3" fill="#C9A77A" transform="rotate(-18 60 80)" />
          {[
            [36, 88, "#F4F0E8"],
            [58, 80, color],
            [80, 73, "#A9C27F"],
          ].map(([x, y, c]) => (
            <g key={String(x)}>
              <circle cx={x as number} cy={y as number} r="13" fill={c as string} stroke="#00000014" />
              <ellipse cx={(x as number) - 4} cy={(y as number) - 5} rx="4" ry="2" fill="#FFFFFF" opacity="0.5" />
            </g>
          ))}
        </>
      );
    case "dorayaki":
      return (
        <>
          <Plate />
          <ellipse cx="60" cy="84" rx="34" ry="11" fill="#8E5A2E" />
          <path d="M26,82 Q60,94 94,82 L94,78 Q60,90 26,78 Z" fill="#5A2F2A" />
          <ellipse cx="60" cy="74" rx="34" ry="12" fill={color} />
          <ellipse cx="60" cy="72" rx="24" ry="7" fill="#A86E3C" opacity="0.6" />
        </>
      );
    case "yokan":
      return (
        <>
          <Plate />
          <path d="M34,70 L78,64 L92,74 L48,82 Z" fill="#7A4D46" />
          <path d="M34,70 L48,82 L48,94 L34,84 Z" fill={color} filter="brightness(0.85)" />
          <path d="M48,82 L92,74 L92,86 L48,94 Z" fill={color} />
          <path d="M56,74 L80,70" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="2" />
        </>
      );
    case "monaka":
      return (
        <>
          <Plate />
          <rect x="34" y="62" width="52" height="26" fill={color} />
          <rect x="34" y="62" width="52" height="7" fill="#B98A50" />
          {[42, 52, 62, 72].map((x) => (
            <path key={x} d={`M${x},72 l6,6 l6,-6 l-6,-6 Z`} fill="none" stroke="#B98A50" strokeWidth="1.5" />
          ))}
        </>
      );
    case "onigiri":
      return (
        <>
          <Plate />
          <path d="M60,40 Q64,40 88,82 Q90,90 80,90 L40,90 Q30,90 32,82 Q56,40 60,40 Z" fill={color} stroke="#E4DDCF" />
          <rect x="44" y="70" width="32" height="20" fill="#1F2A22" />
          <circle cx="60" cy="58" r="4" fill="#C94D4D" />
        </>
      );
    case "senbei":
      return (
        <>
          <Plate />
          <ellipse cx="60" cy="80" rx="32" ry="13" fill="#A06A34" />
          <ellipse cx="60" cy="77" rx="32" ry="13" fill={color} />
          <path d="M44,74 h32 v8 h-32 Z" fill="#1F2A22" opacity="0.85" />
          {[[40, 70], [80, 72], [66, 86], [50, 86]].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="1.3" fill="#7A4D26" />
          ))}
        </>
      );
    case "sando":
      return (
        <>
          <Plate />
          <path d="M28,86 L60,52 L92,86 Z" fill="#FBF6EC" stroke="#E4DDCF" />
          <path d="M34,80 L60,58 L86,80 L86,84 L34,84 Z" fill={color} />
          <path d="M36,78 L84,78" stroke="#8FB85C" strokeWidth="3" />
        </>
      );
    case "gyoza":
      return (
        <>
          <Plate wide />
          {[40, 60, 80].map((x, i) => (
            <g key={x} transform={`rotate(${-8 + i * 8} ${x} 80)`}>
              <path d={`M${x - 14},84 Q${x},58 ${x + 14},84 Z`} fill={color} stroke="#D6BD8E" />
              <path d={`M${x - 14},84 Q${x},90 ${x + 14},84`} fill="#B8733C" />
              {[-6, 0, 6].map((d) => (
                <path key={d} d={`M${x + d},70 q2,4 0,8`} stroke="#D6BD8E" fill="none" />
              ))}
            </g>
          ))}
        </>
      );
    case "melonpan":
      return (
        <>
          <Plate />
          <path d="M28,84 Q28,54 60,54 Q92,54 92,84 Z" fill={color} />
          {[40, 52, 64, 76].map((x) => (
            <path key={x} d={`M${x},58 l10,24`} stroke="#C9A04E" strokeWidth="1.5" />
          ))}
          {[44, 56, 68, 80].map((x) => (
            <path key={x} d={`M${x},58 l-10,24`} stroke="#C9A04E" strokeWidth="1.5" />
          ))}
        </>
      );
    case "takoyaki":
      return (
        <>
          <path d="M20,84 L100,84 L90,98 L30,98 Z" fill="#D8C39E" />
          {[42, 60, 78].map((x) => (
            <g key={x}>
              <circle cx={x} cy="76" r="11" fill={color} />
              <path d={`M${x - 8},72 q8,-6 16,0`} stroke="#3A2A22" strokeWidth="3" fill="none" />
              <circle cx={x - 3} cy="70" r="1.5" fill="#6E9A48" />
            </g>
          ))}
        </>
      );
    case "tin":
      return (
        <>
          <ellipse cx="60" cy="102" rx="26" ry="5" fill="#000" opacity="0.1" />
          <rect x="36" y="30" width="48" height="70" fill={color} />
          <rect x="34" y="24" width="52" height="12" fill={color} filter="brightness(0.8)" />
          <rect x="42" y="50" width="36" height="30" fill="#F4F0E8" />
          <text x="60" y="71" textAnchor="middle" fontSize="16" fill={INK} fontFamily="serif">茶</text>
        </>
      );
  }
}

export function ItemArt({ art, color, className, x, y, size }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={className} x={x} y={y} width={size} height={size} aria-hidden="true">
      <Art art={art} color={color} />
    </svg>
  );
}
