import Link from "next/link";
import { ShaderPanel } from "@/components/ui/ShaderPanel";
import { LifeCounter } from "@/components/ui/LifeCounter";

const NAVBAR_H = 77;

export default function Landing() {
  return (
    <main
      className="flex flex-col md:flex-row"
      style={{ minHeight: `calc(100vh - ${NAVBAR_H}px)`, marginTop: NAVBAR_H }}
    >
      {/* Left panel */}
      <div className="flex-1 flex flex-col px-8 sm:px-12 lg:px-16 py-12 md:py-16">
        <h1
          className="font-display italic font-semibold text-fg leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(4.5rem, 10vw, 10rem)" }}
        >
          Gordon
          <br />
          Bie.
        </h1>

        <div className="mt-8 h-px bg-border-light" />

        {/* Stats card — table structure */}
        <div className="mt-6 border border-border-light bg-surface max-w-sm">

          {/* Row 1 — Context: Study / Next / Based */}
          <div className="grid grid-cols-3 divide-x divide-border-light border-b border-border-light">
            {([
              { label: "Study",  value: "NEU ‧27",       href: null },
              { label: "Next",   value: "Flow Traders",  href: "https://www.flowtraders.com" },
              { label: "Current Base",  value: "BOS → NY",      href: null },
            ] as { label: string; value: string; href: string | null }[]).map(({ label, value, href }) => (
              <div key={label} className="px-4 py-3">
                <p className="font-mono text-[8px] text-fg-subtle uppercase tracking-[0.15em] mb-1.5">{label}</p>
                {href ? (
                  <Link href={href} target="_blank" className="font-sans text-[13px] text-accent hover:underline underline-offset-2 leading-tight block">
                    {value}
                  </Link>
                ) : (
                  <p className="font-sans text-[13px] text-fg leading-tight">{value}</p>
                )}
              </div>
            ))}
          </div>

          {/* Row 2 — Domains */}
          <div className="px-4 py-3 border-b border-border-light flex flex-wrap gap-1.5">
            {["ML / AI", "SWE", "Markets"].map((d) => (
              <span key={d} className="font-mono text-[8px] uppercase tracking-[0.13em] text-fg-muted border border-border-light px-2 py-0.5">
                {d}
              </span>
            ))}
          </div>

          {/* Row 3 — Stats */}
          <div className="grid grid-cols-4 divide-x divide-border-light border-b border-border-light">
            {([
              { n: "17", label: "Prev.\nJobs" },
              { n: "5",  label: "Natural\nLanguages" },
              { n: "4",  label: "Cities" },
              { n: "∞",  label: "Matcha" },
            ] as { n: string; label: string }[]).map(({ n, label }) => (
              <div key={label} className="px-3 py-3">
                <p className="font-mono text-xl text-fg leading-none mb-1.5">{n}</p>
                <p className="font-mono text-[8px] text-fg-subtle uppercase tracking-[0.1em] leading-[1.4] whitespace-pre-line">{label}</p>
              </div>
            ))}
          </div>

          {/* Row 4 — Active + life counter */}
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-accent block animate-pulse" />
              <span className="font-mono text-[8px] text-fg-subtle uppercase tracking-[0.15em]">Active</span>
            </div>
            <LifeCounter />
          </div>

        </div>
      </div>

      {/* Right panel — shader */}
      <div className="w-full md:w-[44%] border-t md:border-t-0 md:border-l border-border-light min-h-[55vw] md:min-h-0">
        <ShaderPanel />
      </div>
    </main>
  );
}
