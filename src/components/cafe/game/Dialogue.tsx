"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type Choice = { label: string; onSelect: () => void; primary?: boolean };

type Props = {
  lines: string[];
  choices: Choice[];
  onTalkingChange: (talking: boolean) => void;
};

const CHAR_MS = 22;

export function Dialogue({ lines, choices, onTalkingChange }: Props) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(0);
  const [script, setScript] = useState(lines);
  const reduceMotion = useReducedMotion();

  // New script: start from the top
  if (script !== lines) {
    setScript(lines);
    setIndex(0);
    setShown(0);
  }

  const line = lines[index] ?? "";
  const visible = reduceMotion ? line.length : shown;
  const typing = visible < line.length;
  const last = index >= lines.length - 1;

  useEffect(() => {
    if (!typing) return;
    const id = setTimeout(() => setShown((n) => n + 1), CHAR_MS);
    return () => clearTimeout(id);
  }, [typing, shown]);

  useEffect(() => {
    onTalkingChange(typing);
  }, [typing, onTalkingChange]);

  const advance = () => {
    if (typing) setShown(line.length);
    else if (!last) {
      setIndex((i) => i + 1);
      setShown(0);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div
        className="relative bg-[#F8F4EC]/95 backdrop-blur-sm border border-[#CDBFA8] shadow-[0_20px_60px_-25px_rgba(58,47,37,0.5)] cursor-pointer"
        onClick={advance}
      >
        <span className="absolute -top-3 left-5 bg-accent text-[#F8F4EC] font-mono text-[9px] uppercase tracking-[0.2em] px-2.5 py-1">
          Gordon · Barista
        </span>
        <p aria-hidden="true" className="px-6 pt-6 pb-4 min-h-[5.5rem] font-sans text-[15px] sm:text-base text-fg leading-relaxed">
          {line.slice(0, visible)}
        </p>
        <p className="sr-only" aria-live="polite">{line}</p>
        {!typing && !last && (
          <span className="absolute bottom-2 right-4 font-mono text-[10px] text-fg-muted animate-bounce">▼ tap</span>
        )}
      </div>

      {choices.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {choices.map((c) => (
            <button
              key={c.label}
              onClick={c.onSelect}
              className={`px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] border transition-[background-color,color,transform] duration-150 active:scale-[0.97] ${
                c.primary
                  ? "bg-fg text-background border-fg hover:bg-accent hover:border-accent"
                  : "bg-[#F8F4EC]/95 text-fg border-[#CDBFA8] hover:bg-accent-bg hover:border-accent"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
