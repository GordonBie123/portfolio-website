"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { allItems, pantry, type MenuItem } from "@/data/cafeMenu";
import { profile } from "@/data/profile";
import { ItemArt } from "./ItemArt";
import { Modal } from "./Modal";
import { StampMark } from "./StampMark";

export function PantryPanel({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="The Pantry" kicker="茶葉 · What I cook with" onClose={onClose} wide>
      <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {pantry.map((tin) => (
          <div key={tin.title} className="flex gap-4 border border-[#E2D8C8] bg-[#FBF8F2] p-4">
            <ItemArt art="tin" color={tin.color} className="w-16 h-16 shrink-0" />
            <div className="min-w-0">
              <p className="font-display italic font-semibold text-xl text-fg leading-tight">{tin.title}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tin.skills.map((s) => (
                  <span key={s} className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-muted border border-[#D8CCB8] px-2 py-0.5">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

function Row({ label, value, href }: { label: string; value: string; href: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center justify-between gap-4 px-5 py-4 bg-[#FBF8F2] hover:bg-accent-bg transition-colors duration-150"
    >
      <span>
        <span className="block font-mono text-[9px] text-fg-muted uppercase tracking-[0.18em]">{label}</span>
        <span className="block mt-0.5 text-[14px] text-fg group-hover:text-accent transition-colors duration-150">{value}</span>
      </span>
      <ArrowUpRight size={15} className="text-fg-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

export function GuestbookPanel({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Guestbook" kicker="Leave a note · I read every one" onClose={onClose}>
      <div className="px-6 sm:px-8 py-6">
        <p className="text-[14px] text-fg-muted leading-relaxed">{profile.contactDescription}</p>
        <p className="mt-2 font-mono text-[9px] text-fg-subtle uppercase tracking-[0.15em]">{profile.contactStatus}</p>
        <div className="mt-6 grid gap-px bg-[#E2D8C8] border border-[#E2D8C8]">
          <Row label="Email" value={profile.email} href={`mailto:${profile.email}`} />
          <Row label="LinkedIn" value="in/gordon-bie" href={profile.links.linkedin} />
          <Row label="GitHub" value="GordonBie123" href={profile.links.github} />
        </div>
        <Link
          href="/contact"
          className="mt-6 inline-flex px-5 py-3 bg-fg text-background font-mono text-[10px] uppercase tracking-[0.18em] transition-[background-color,transform] duration-150 hover:bg-accent active:scale-[0.97]"
        >
          Write a longer note
        </Link>
      </div>
    </Modal>
  );
}

export function StampCardPanel({
  stamps,
  onPick,
  onClose,
}: {
  stamps: Set<string>;
  onPick: (item: MenuItem) => void;
  onClose: () => void;
}) {
  const count = allItems.filter((i) => stamps.has(i.id)).length;
  const complete = count === allItems.length;
  return (
    <Modal title="Stamp Card" kicker={`ポイントカード · ${count} of ${allItems.length} tried`} onClose={onClose} wide>
      <div className="px-5 sm:px-8 py-6">
        <div className="h-2 bg-[#E6DED0]">
          <div className="h-full bg-[#C94D4D] transition-[width] duration-500" style={{ width: `${(count / allItems.length) * 100}%` }} />
        </div>
        <p className="mt-3 text-[13px] text-fg-muted">
          {complete
            ? "Every stamp collected. You're officially a regular. Your free drink is below."
            : "Try everything on the menu to fill the card. Tap an empty slot to order it."}
        </p>

        <ul className="mt-5 grid grid-cols-5 sm:grid-cols-9 gap-2">
          {allItems.map((item) => {
            const tried = stamps.has(item.id);
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPick(item)}
                  title={item.name}
                  className={`relative w-full aspect-square flex items-center justify-center border transition-[border-color,background-color] duration-150 ${
                    tried ? "border-[#E2D8C8] bg-[#FBF8F2] hover:border-accent" : "border-dashed border-[#CDBFA8] hover:border-accent hover:bg-accent-bg"
                  }`}
                >
                  {tried ? (
                    <>
                      <ItemArt art={item.art} color={item.color} className="w-4/5 h-4/5" />
                      <StampMark className="absolute top-1 right-1 w-4 h-4" />
                    </>
                  ) : (
                    <span className="font-mono text-[10px] text-fg-subtle">?</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <a
          href="/Bie_Gordon_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 flex items-center justify-between border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-150 ${
            complete ? "border-accent bg-accent-bg text-accent" : "border-[#D8CCB8] text-fg-muted hover:text-accent hover:border-accent"
          }`}
        >
          {complete ? "Claim free drink · Résumé (PDF)" : "Résumé (PDF) · no stamps needed"}
          <ArrowUpRight size={14} />
        </a>
      </div>
    </Modal>
  );
}

export function StaffPanel({ stats, onClose }: { stats: ReactNode; onClose: () => void }) {
  return (
    <Modal title="Staff Card" kicker="Employee of the month · every month" onClose={onClose} wide>
      <div className="px-5 sm:px-8 py-6">
        <p className="text-[14px] text-fg-muted leading-relaxed max-w-2xl">{profile.shortBio}</p>
        <div className="mt-5">{stats}</div>
        <p className="mt-2 font-mono text-[9px] text-fg-subtle tracking-[0.05em]">Git commits are squashed</p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em]">
          {[
            ["Full about page", "/about"],
            ["Experience", "/experience"],
            ["Projects", "/work"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="text-fg-muted hover:text-accent transition-colors duration-150">
              {label} →
            </Link>
          ))}
        </div>
      </div>
    </Modal>
  );
}
