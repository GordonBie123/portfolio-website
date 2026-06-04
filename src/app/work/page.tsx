import { Metadata } from "next";
import Projects from "@/components/sections/Projects";
import { GradientPanel } from "@/components/ui/GradientPanel";
import { WaveDivider } from "@/components/ui/WaveDivider";

export const metadata: Metadata = { title: "Work — Gordon Bie" };

const NAVBAR_H = 77;

export default function WorkPage() {
  return (
    <main style={{ paddingTop: NAVBAR_H }}>
      {/* Split header */}
      <div className="border-b border-border-light flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-10">
          <div>
            <p className="font-mono text-[9px] text-accent uppercase tracking-[0.25em] mb-2">
              Selected Work
            </p>
            <h1
              className="font-display italic font-semibold text-fg leading-none"
              style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
            >
              Projects.
            </h1>
          </div>
        </div>
        <div className="w-full md:w-[44%] border-t md:border-t-0 md:border-l border-border-light">
          <GradientPanel
            watermark="^_^"
            colors={["#0A0F1A", "#132035", "#1A3A52", "#2A5A6E", "#111110", "#0A0A08"]}
            speed={0.15}
            distortion={0.45}
            swirl={0.18}
          />
        </div>
      </div>

      <WaveDivider />

      {/* Bento grid */}
      <div className="px-6 sm:px-12 lg:px-16 py-14 pb-24">
        <Projects />
      </div>
    </main>
  );
}
