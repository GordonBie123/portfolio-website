"use client";

import { motion } from "framer-motion";

// 8 periods of a sine wave — period=240, amplitude=10, center y=20, total width=1920
// Tiles seamlessly: moving -50% of the 200%-wide container = exactly 4 periods
const WAVE =
  "M0,20 C44,10 76,10 120,20 C164,30 196,30 240,20 " +
  "C284,10 316,10 360,20 C404,30 436,30 480,20 " +
  "C524,10 556,10 600,20 C644,30 676,30 720,20 " +
  "C764,10 796,10 840,20 C884,30 916,30 960,20 " +
  "C1004,10 1036,10 1080,20 C1124,30 1156,30 1200,20 " +
  "C1244,10 1276,10 1320,20 C1364,30 1396,30 1440,20 " +
  "C1484,10 1516,10 1560,20 C1604,30 1636,30 1680,20 " +
  "C1724,10 1756,10 1800,20 C1844,30 1876,30 1920,20";

export function WaveDivider({ className }: { className?: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className ?? ""}`}
      style={{ height: 40 }}
    >
      <motion.div
        className="absolute top-0 left-0 h-full"
        style={{ width: "200%" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <svg
          viewBox="0 0 1920 40"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <path d={WAVE} fill="none" stroke="var(--color-accent)" strokeWidth="1" opacity="0.3" />
          <path d={WAVE} fill="none" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.12" transform="translate(-120, 7)" />
        </svg>
      </motion.div>
    </div>
  );
}
