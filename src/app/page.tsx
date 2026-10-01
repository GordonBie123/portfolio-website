import { AtSign, BriefcaseBusiness, GraduationCap, MapPin } from "lucide-react";
import { Intro } from "@/components/home/Intro";
import ContributionHeatmap from "@/components/ui/ContributionHeatmap";

const stats = [
  { value: "17", label: "previous jobs" },
  { value: "5", label: "languages spoken" },
  { value: "4", label: "cities lived in" },
  { value: "2", label: "years coding" },
];

// Monkeytype's test-config bar, repurposed as a quick "who" line
function ConfigBar() {
  const item = "flex items-center gap-1.5 whitespace-nowrap";
  return (
    <div className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-lg bg-sub-alt px-5 py-2.5 text-xs text-sub">
      <span className={item}>
        <GraduationCap size={13} aria-hidden /> northeastern &apos;27
      </span>
      <span className={item}>
        <MapPin size={13} aria-hidden /> new york
      </span>
      <span className="hidden h-4 w-[3px] rounded-full bg-bg sm:block" aria-hidden />
      <a href="https://www.flowtraders.com" target="_blank" rel="noopener noreferrer" className={`${item} text-main hover:text-text transition-colors duration-150`}>
        <BriefcaseBusiness size={13} aria-hidden /> swe intern @ flow traders
      </a>
      <span className="hidden h-4 w-[3px] rounded-full bg-bg sm:block" aria-hidden />
      {["ml / ai", "swe"].map((d) => (
        <span key={d} className={item}>
          <AtSign size={12} aria-hidden className="opacity-60" />
          {d}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col gap-14 sm:gap-20">
      <ConfigBar />

      <div className="mx-auto w-full max-w-[920px]">
        <Intro />
      </div>

      <section aria-label="stats" className="mx-auto grid w-full max-w-[920px] grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map(({ value, label }) => (
          <div key={label}>
            <p className="text-sm text-sub">{label}</p>
            <p className="text-5xl leading-tight text-main">{value}</p>
          </div>
        ))}
      </section>

      <div className="mx-auto w-full max-w-[920px]">
        <ContributionHeatmap />
      </div>
    </div>
  );
}
