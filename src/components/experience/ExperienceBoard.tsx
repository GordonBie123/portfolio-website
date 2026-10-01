"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type Row = {
  role: string;
  company: string;
  line?: string;
  duration: string;
  location: string;
  logo?: string;
};

export type Board = { id: string; label: string; rows: Row[] };

// Monkeytype leaderboard: mode toggles on top, zebra-striped ranked rows below
export function ExperienceBoard({ boards }: { boards: Board[] }) {
  const [active, setActive] = useState(boards[0].id);

  // Deep-link a tab with #research etc.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (boards.some((b) => b.id === id)) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [boards]);

  const board = boards.find((b) => b.id === active) ?? boards[0];

  return (
    <div className="flex flex-col gap-6">
      <div role="tablist" aria-label="experience type" className="flex flex-wrap gap-2">
        {boards.map((b) => {
          const selected = b.id === active;
          return (
            <button
              key={b.id}
              role="tab"
              aria-selected={selected}
              onClick={() => {
                setActive(b.id);
                history.replaceState(null, "", `#${b.id}`);
              }}
              className={`rounded-md px-4 py-2 text-sm transition-colors duration-150 ${
                selected ? "bg-main text-bg" : "bg-sub-alt text-text hover:bg-text hover:text-bg"
              }`}
            >
              {b.label}
              <span className={`ml-2 text-xs ${selected ? "text-bg/70" : "text-sub"}`}>{b.rows.length}</span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="overflow-hidden rounded-lg">
        <div className="hidden grid-cols-[3rem_1fr_16rem_8rem] gap-4 px-4 pb-2 text-xs text-sub md:grid">
          <span>#</span>
          <span>role</span>
          <span>where</span>
          <span className="text-right">when</span>
        </div>
        <ol>
          {board.rows.map((r, i) => (
            <li
              key={`${r.company}-${r.role}`}
              className={`grid grid-cols-[2rem_1fr] gap-x-4 gap-y-1 rounded-lg px-4 py-3.5 md:grid-cols-[3rem_1fr_16rem_8rem] md:items-center ${
                i % 2 === 0 ? "bg-sub-alt" : ""
              }`}
            >
              <span className="text-sm text-sub tabular-nums">{i + 1}</span>
              <div className="min-w-0">
                <p className="text-[15px] text-text">{r.role}</p>
                {r.line && <p className="mt-0.5 text-xs leading-relaxed text-sub">{r.line}</p>}
              </div>
              <div className="col-start-2 flex min-w-0 items-center gap-2 md:col-start-auto">
                {r.logo && (
                  <Image src={r.logo} alt="" width={20} height={20} className="h-5 w-5 shrink-0 rounded object-cover" />
                )}
                <div className="min-w-0">
                  <p className="text-sm leading-snug text-text">{r.company.toLowerCase()}</p>
                  <p className="truncate text-xs text-sub">{r.location.toLowerCase()}</p>
                </div>
              </div>
              <span className="col-start-2 text-xs text-sub tabular-nums md:col-start-auto md:text-right md:text-sm">
                {r.duration.toLowerCase()}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
