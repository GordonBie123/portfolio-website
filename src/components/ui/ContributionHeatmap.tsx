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

// level 0 → faint sub-alt; levels 1–4 → matcha main ramp
const LEVEL_COLORS = [
  "rgba(110, 102, 93, 0.12)",
  "rgba(74, 103, 65, 0.35)",
  "rgba(74, 103, 65, 0.55)",
  "rgba(74, 103, 65, 0.78)",
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
    <section aria-label="github activity" className="rounded-lg bg-sub-alt p-5">
      <div className="mb-3 flex items-baseline justify-between text-xs text-sub">
        <p>github activity</p>
        <p>
          <span className="text-main">{total}</span> contributions · last year
        </p>
      </div>

      <div
        className="grid w-full"
        style={{
          gridTemplateRows: "repeat(7, 1fr)",
          gridAutoFlow: "column",
          gridAutoColumns: "1fr",
          gap: "3px",
          height: "84px",
        }}
        title={`${total} contributions in the last year`}
      >
        {cells.map((cell, i) =>
          cell ? (
            <div
              key={cell.date}
              className="rounded-[2px]"
              title={`${cell.count} contribution${cell.count !== 1 ? "s" : ""} on ${cell.date}`}
              style={{ backgroundColor: LEVEL_COLORS[cell.level] ?? LEVEL_COLORS[0] }}
            />
          ) : (
            <div key={`pad-${i}`} />
          )
        )}
      </div>
      <p className="mt-3 text-[11px] text-sub opacity-80">git commits are squashed</p>
    </section>
  );
}
