import { Metadata } from "next";
import ExperienceSection from "@/components/sections/ExperienceSection";
import Research from "@/components/sections/Research";
import SideQuests from "@/components/sections/SideQuests";
import { GradientPanel } from "@/components/ui/GradientPanel";
import { WaveDivider } from "@/components/ui/WaveDivider";

export const metadata: Metadata = { title: "Experience — Gordon Bie" };

const NAVBAR_H = 77;

export default function ExperiencePage() {
  return (
    <main style={{ paddingTop: NAVBAR_H }}>
      {/* Split header */}
      <div className="border-b border-border-light flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-10">
          <div>
            <p className="font-mono text-[9px] text-accent uppercase tracking-[0.25em] mb-2">
              Career
            </p>
            <h1
              className="font-display italic font-semibold text-fg leading-none"
              style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
            >
              Experience.
            </h1>
          </div>
        </div>
        <div className="w-full md:w-[44%] border-t md:border-t-0 md:border-l border-border-light">
          <GradientPanel
            watermark="<3"
            colors={["#1A0E08", "#2E1A0F", "#5C3A20", "#8B5E3C", "#3A2510", "#0F0A07"]}
            speed={0.22}
            distortion={0.6}
            swirl={0.28}
          />
        </div>
      </div>

      {/* Professional */}
      <ExperienceSection standalone />

      <WaveDivider />

      {/* Research */}
      <div className="px-6 sm:px-12 lg:px-16 py-14">
        <Research />
      </div>

      <WaveDivider />

      {/* Side Quests */}
      <div className="px-6 sm:px-12 lg:px-16 py-14 pb-24">
        <SideQuests />
      </div>
    </main>
  );
}
