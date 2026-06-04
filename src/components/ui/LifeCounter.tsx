"use client";

import { useEffect, useState } from "react";

// Jan 19, 2005 at 23:00:00 local time
const BIRTH = new Date(2005, 0, 19, 23, 0, 0);

export function LifeCounter() {
  const [tick, setTick] = useState<{ h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    function compute() {
      const diff = Math.floor((Date.now() - BIRTH.getTime()) / 1000);
      setTick({
        h: Math.floor(diff / 3600),
        m: Math.floor((diff % 3600) / 60),
        s: diff % 60,
      });
    }
    compute();
    const id = setInterval(compute, 1000);
    return () => clearInterval(id);
  }, []);

  if (!tick) return null;

  return (
    <span className="font-mono text-[9px] text-fg-subtle tabular-nums tracking-tight">
      {tick.h.toLocaleString()}h {String(tick.m).padStart(2, "0")}m {String(tick.s).padStart(2, "0")}s
    </span>
  );
}
