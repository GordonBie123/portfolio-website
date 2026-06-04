"use client";

import { MeshGradient } from "@paper-design/shaders-react";

interface GradientPanelProps {
  colors?: string[];
  speed?: number;
  distortion?: number;
  swirl?: number;
  watermark?: string;
}

export function GradientPanel({
  colors = ["#0D1A0C", "#1C2B1A", "#4A6741", "#6B8E5E", "#2A2520", "#111110"],
  speed = 0.18,
  distortion = 0.5,
  swirl = 0.22,
  watermark,
}: GradientPanelProps) {
  return (
    <div className="relative w-full h-[40vw] md:h-full overflow-hidden">
      <MeshGradient
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        colors={colors}
        speed={speed}
        distortion={distortion}
        swirl={swirl}
      />
      {watermark && (
        <div className="absolute inset-0 flex items-end justify-end p-8 pointer-events-none select-none">
          <span
            className="font-display italic font-semibold text-white/[0.06] leading-none"
            style={{ fontSize: "clamp(6rem, 14vw, 14rem)" }}
          >
            {watermark}
          </span>
        </div>
      )}
    </div>
  );
}
