import { Metadata } from "next";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Matcha from "@/components/sections/Matcha";
import { GradientPanel } from "@/components/ui/GradientPanel";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "About — Gordon Bie" };

const NAVBAR_H = 77;

export default function AboutPage() {
  return (
    <main style={{ paddingTop: NAVBAR_H }}>
      {/* Split header */}
      <div className="border-b border-border-light flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-10">
          <div>
            <p className="font-mono text-[9px] text-accent uppercase tracking-[0.25em] mb-2">
              Identity
            </p>
            <h1
              className="font-display italic font-semibold text-fg leading-none"
              style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
            >
              About.
            </h1>
          </div>
        </div>
        <div className="w-full md:w-[44%] border-t md:border-t-0 md:border-l border-border-light">
          <GradientPanel
            watermark=":)"
            colors={["#0D1A0C", "#1C2B1A", "#3A5C38", "#5E8A5A", "#2A1F15", "#0F0E0D"]}
          />
        </div>
      </div>

      {/* Bio */}
      <div className="max-w-4xl px-6 sm:px-12 lg:px-16 py-14">
        <About />
      </div>

      <WaveDivider />

      {/* Skills */}
      <div className="max-w-4xl px-6 sm:px-12 lg:px-16 py-14">
        <Skills />
      </div>

      <WaveDivider />

      {/* Social links */}
      <div className="px-6 sm:px-12 lg:px-16 py-10">
        <p className="font-mono text-[9px] text-fg-subtle uppercase tracking-[0.25em] mb-6">
          Find me
        </p>
        <div className="flex flex-wrap gap-x-10 gap-y-3">
          {[
            { label: "LinkedIn", href: profile.links.linkedin },
            { label: "GitHub",   href: profile.links.github },
            { label: "Spotify",  href: profile.links.spotify },
            { label: "Email",    href: `mailto:${profile.email}` },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-fg-muted hover:text-accent transition-colors"
            >
              {label} ↗
            </a>
          ))}
        </div>
      </div>

      <WaveDivider />

      {/* Matcha */}
      <div className="max-w-3xl px-6 sm:px-12 lg:px-16 py-14 pb-24">
        <Matcha />
      </div>
    </main>
  );
}
