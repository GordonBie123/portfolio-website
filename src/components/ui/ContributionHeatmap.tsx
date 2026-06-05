type Day = { date: string; count: number; level: number };

async function getContributions(): Promise<Day[] | null> {
  try {
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/GordonBie123?y=last",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.contributions ?? null;
  } catch {
    return null;
  }
}

// level 0 → faint sumi ink; levels 1–4 → matcha accent ramp
const LEVEL_COLORS = [
  "rgba(17, 17, 16, 0.06)",
  "rgba(74, 103, 65, 0.30)",
  "rgba(74, 103, 65, 0.50)",
  "rgba(74, 103, 65, 0.75)",
  "rgba(74, 103, 65, 1)",
];

export default async function ContributionHeatmap() {
  const days = await getContributions();
  if (!days?.length) return null;

  const total = days.reduce((s, d) => s + d.count, 0);

  // Pad the front so columns align to GitHub-style weekday rows (Sun → Sat).
  const firstWeekday = new Date(`${days[0].date}T00:00:00`).getDay();
  const cells: (Day | null)[] = [...Array(firstWeekday).fill(null), ...days];

  return (
    <div className="px-4 py-3 border-b border-border-light">
      <div className="flex items-baseline justify-between mb-2">
        <p className="font-mono text-[8px] text-fg-subtle uppercase tracking-[0.15em]">
          GitHub
        </p>
        <p className="font-mono text-[8px] text-fg-subtle uppercase tracking-[0.1em]">
          {total} contributions · 1yr
        </p>
      </div>

      <div
        className="grid w-full"
        style={{
          gridTemplateRows: "repeat(7, 1fr)",
          gridAutoFlow: "column",
          gridAutoColumns: "1fr",
          gap: "2px",
          height: "52px",
        }}
        title={`${total} contributions in the last year`}
      >
        {cells.map((cell, i) =>
          cell ? (
            <div
              key={cell.date}
              title={`${cell.count} contribution${cell.count !== 1 ? "s" : ""} on ${cell.date}`}
              style={{ backgroundColor: LEVEL_COLORS[cell.level] ?? LEVEL_COLORS[0] }}
            />
          ) : (
            <div key={`pad-${i}`} />
          )
        )}
      </div>
    </div>
  );
}
