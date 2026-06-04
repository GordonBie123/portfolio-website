"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import Link from "next/link";

export function ShaderPanel() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <MeshGradient
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        colors={["#0D1A0C", "#1C2B1A", "#4A6741", "#6B8E5E", "#2A2520", "#111110"]}
        speed={0.28}
        distortion={0.65}
        swirl={0.3}
      />

      {/* Bottom gradient so text sits cleanly */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 45%, transparent 70%)" }}
      />

      {/* Quote + button — anchored bottom-left */}
      <div className="absolute bottom-10 left-10 right-10 z-10">
        <p
          className="font-display italic font-light text-white/90 leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)" }}
        >
          finding peace
        </p>
        <p
          className="font-display italic font-light text-white/65 leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)" }}
        >
          and having fun
        </p>
        <p
          className="font-display italic font-light text-white/40 leading-[1.05] tracking-tight"
          style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)" }}
        >
          along the way
        </p>

        <div className="h-px bg-white/15 mt-6 mb-5" />

        <Link
          href="/about"
          className="inline-block font-mono text-[9px] uppercase tracking-[0.22em] text-white/50 border border-white/20 px-4 py-2.5 hover:text-white/80 hover:border-white/40 transition-colors duration-300"
        >
          Learn more about me →
        </Link>
      </div>
    </div>
  );
}
