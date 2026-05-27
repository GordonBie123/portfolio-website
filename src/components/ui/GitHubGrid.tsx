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

  // Sum contributions per week
  const weeks: number[] = [];
  for (let i = 0; i < days.length; i += 7) {
    const total = days.slice(i, i + 7).reduce((sum, d) => sum + d.count, 0);
    weeks.push(total);
  }

  const total = weeks.reduce((s, n) => s + n, 0);
  const max = Math.max(...weeks, 1);
  const MAX_HEIGHT = 72;

  return (
    <div className="mt-10">
      <p className="text-medium-gray text-sm mb-3">
        {total} contributions in the last year
      </p>
      <div className="flex items-end gap-[3px] overflow-hidden w-full" style={{ height: `${MAX_HEIGHT + 4}px` }}>
        {weeks.map((count, i) => {
          const height = count === 0 ? 2 : Math.max(4, Math.round((count / max) * MAX_HEIGHT));
          const intensity = count === 0 ? 0 : count / max;
          const color = count === 0
            ? '#1c2035'
            : `rgba(0, ${Math.round(140 + intensity * 72)}, ${Math.round(180 + intensity * 75)}, ${0.4 + intensity * 0.6})`;
          return (
            <div
              key={i}
              title={`${count} contribution${count !== 1 ? 's' : ''} this week`}
              style={{ height: `${height}px`, backgroundColor: color, minWidth: '3px' }}
              className="flex-1 rounded-[2px]"
            />
          );
        })}
      </div>
    </div>
  );
}
