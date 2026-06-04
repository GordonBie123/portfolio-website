type Day = { date: string; count: number; level: number };

async function getContributions(): Promise<Day[] | null> {
  try {
    const res = await fetch(
      'https://github-contributions-api.jogruber.de/v4/GordonBie123?y=last',
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.contributions ?? null;
  } catch {
    return null;
  }
}

export default async function GitHubGrid() {
  const days = await getContributions();
  if (!days?.length) return null;

  const weeks: number[] = [];
  for (let i = 0; i < days.length; i += 7) {
    const total = days.slice(i, i + 7).reduce((sum, d) => sum + d.count, 0);
    weeks.push(total);
  }

  const total = weeks.reduce((s, n) => s + n, 0);
  const max = Math.max(...weeks, 1);
  const MAX_HEIGHT = 64;

  return (
    <div className="mt-10">
      <p className="font-mono text-[11px] text-fg-muted mb-3 uppercase tracking-[0.12em]">
        {total} contributions — last year
      </p>
      <div className="flex items-end gap-[3px] overflow-hidden w-full" style={{ height: `${MAX_HEIGHT + 4}px` }}>
        {weeks.map((count, i) => {
          const height = count === 0 ? 2 : Math.max(4, Math.round((count / max) * MAX_HEIGHT));
          const intensity = count === 0 ? 0 : count / max;
          const opacity = count === 0 ? 0.12 : 0.15 + intensity * 0.85;
          return (
            <div
              key={i}
              title={`${count} contribution${count !== 1 ? 's' : ''} this week`}
              style={{
                height: `${height}px`,
                backgroundColor: `rgba(28, 25, 22, ${opacity})`,
                minWidth: '3px',
              }}
              className="flex-1"
            />
          );
        })}
      </div>
    </div>
  );
}
