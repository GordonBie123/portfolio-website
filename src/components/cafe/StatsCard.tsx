import Link from "next/link";
import { LifeCounter } from "@/components/ui/LifeCounter";
import ContributionHeatmap from "@/components/ui/ContributionHeatmap";

export function StatsCard() {
  return (
    <div className="border border-border-light bg-surface w-full">
      {/* Row 1 — Context: Study / Next / Based */}
      <div className="grid grid-cols-[1.3fr_1fr_1fr] divide-x divide-border-light border-b border-border-light">
        {([
          { label: "Study",  value: "Northeastern ‧27",       href: null },
          { label: "Next",   value: "Flow Traders",  href: "https://www.flowtraders.com" },
          { label: "Current Base",  value: "BOS → NY",      href: null },
        ] as { label: string; value: string; href: string | null }[]).map(({ label, value, href }) => (
          <div key={label} className="px-5 py-4">
            <p className="font-mono text-[9px] text-fg-muted uppercase tracking-[0.15em] mb-2">{label}</p>
            {href ? (
              <Link href={href} target="_blank" className="font-sans text-[15px] text-accent hover:underline underline-offset-2 leading-tight block">
                {value}
              </Link>
            ) : (
              <p className="font-sans text-[15px] text-fg leading-tight whitespace-nowrap">{value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Row 2 — Domains */}
      <div className="px-5 py-4 border-b border-border-light flex flex-wrap gap-2">
        {["ML / AI", "SWE", "Markets"].map((d) => (
          <span key={d} className="font-mono text-[9px] uppercase tracking-[0.13em] text-fg-muted border border-border-light px-2.5 py-1">
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
          { n: "2",  label: "Yrs Coding\nExperience" },
        ] as { n: string; label: string }[]).map(({ n, label }) => (
          <div key={label} className="px-4 py-4">
            <p className="font-mono text-3xl text-fg leading-none mb-2">{n}</p>
            <p className="font-mono text-[9px] text-fg-muted uppercase tracking-[0.1em] leading-[1.4] whitespace-pre-line">{label}</p>
          </div>
        ))}
      </div>

      {/* Row 4 — GitHub contribution heatmap */}
      <ContributionHeatmap />

      {/* Row 5 — Active + life counter */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-accent block animate-pulse" />
          <span className="font-mono text-[9px] text-fg-muted uppercase tracking-[0.15em]">Active</span>
        </div>
        <LifeCounter />
      </div>
    </div>
  );
}
