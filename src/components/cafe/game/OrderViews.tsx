"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { MenuItem } from "@/data/cafeMenu";
import { ItemArt } from "./ItemArt";
import { Modal } from "./Modal";
import { StampMark } from "./StampMark";

const STEPS: Record<MenuItem["kind"], string[]> = {
  drink: ["Sifting the matcha", "Pouring water at 80°C", "Whisking in a W motion", "Checking the foam"],
  sweet: ["Picking the prettiest one", "Dusting with kinako", "Plating"],
  snack: ["Firing up the kitchen", "Cooking", "Plating"],
};

const AUTO_MS = 2800;
const WHISK_BOOST = 0.12;

export function Brewing({ item, onDone }: { item: MenuItem; onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const boost = useRef(0);
  const done = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setProgress((p) => {
        const next = Math.min(1, p + dt / AUTO_MS + boost.current);
        boost.current = 0;
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (progress >= 1 && !done.current) {
      done.current = true;
      const id = setTimeout(onDone, reduceMotion ? 0 : 250);
      return () => clearTimeout(id);
    }
  }, [progress, onDone, reduceMotion]);

  const steps = STEPS[item.kind];
  const step = steps[Math.min(steps.length - 1, Math.floor(progress * steps.length))];
  const verb = item.kind === "drink" ? "Whisk!" : "Hurry up!";

  return (
    <motion.div
      className="w-full max-w-sm bg-[#F8F4EC]/95 backdrop-blur-sm border border-[#CDBFA8] p-5 shadow-[0_20px_60px_-25px_rgba(58,47,37,0.5)]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-mono text-[9px] text-fg-muted uppercase tracking-[0.2em]">Now making</p>
        <p className="font-mono text-[9px] text-fg-subtle tabular-nums">{Math.round(progress * 100)}%</p>
      </div>
      <p className="mt-1 font-display italic font-semibold text-2xl text-fg leading-tight">{item.name}</p>
      <div className="mt-3 h-2 bg-[#E6DED0] overflow-hidden">
        <div className="h-full bg-accent origin-left" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-[13px] text-fg-muted">{step}…</p>
        <button
          onClick={() => (boost.current += WHISK_BOOST)}
          className="px-4 py-2 bg-fg text-background font-mono text-[10px] uppercase tracking-[0.18em] transition-[background-color,transform] duration-100 hover:bg-accent active:scale-[0.94]"
        >
          {verb}
        </button>
      </div>
    </motion.div>
  );
}

export function ServedCard({
  item,
  ticket,
  firstTime,
  onAnother,
  onClose,
}: {
  item: MenuItem;
  ticket: number;
  firstTime: boolean;
  onAnother: () => void;
  onClose: () => void;
}) {
  return (
    <Modal title={item.name} kicker={`Order #${String(ticket).padStart(3, "0")} · Order up!`} onClose={onClose}>
      <div className="px-6 sm:px-8 py-6">
        <div className="flex gap-5 items-center">
          <div className="relative shrink-0 w-28 h-28 sm:w-32 sm:h-32 bg-[#F1ECE3] flex items-center justify-center">
            <ItemArt art={item.art} color={item.color} className="w-24 h-24 sm:w-28 sm:h-28" />
            {firstTime && (
              <motion.span
                className="absolute -top-3 -right-3"
                initial={{ scale: 2.2, opacity: 0, rotate: -25 }}
                animate={{ scale: 1, opacity: 1, rotate: -8 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 380, damping: 16 }}
              >
                <StampMark className="w-11 h-11" label="済" />
              </motion.span>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[9px] text-fg-subtle tracking-[0.15em]">{item.jp}</p>
            <p className="mt-1 font-sans text-lg text-fg leading-snug capitalize">{item.title}</p>
            <div className="mt-1 flex items-center gap-2">
              {item.logo && (
                <Image src={item.logo} alt="" width={18} height={18} className="w-[18px] h-[18px] object-cover border border-[#E2D8C8]" />
              )}
              <p className="text-[13px] text-fg-muted">{item.subtitle}</p>
            </div>
          </div>
        </div>

        {item.meta.length > 0 && (
          <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E2D8C8] border border-[#E2D8C8]">
            {item.meta.map((m) => (
              <div key={m.label} className="bg-[#FBF8F2] px-4 py-3">
                <dt className="font-mono text-[9px] text-fg-muted uppercase tracking-[0.18em]">{m.label}</dt>
                <dd className="mt-1 text-[13px] text-fg leading-snug">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {item.notes.length > 0 && (
          <div className="mt-6">
            <p className="font-mono text-[9px] text-accent uppercase tracking-[0.2em] mb-2">Tasting notes</p>
            <ul className="space-y-1.5">
              {item.notes.map((n) => (
                <li key={n} className="text-[14px] text-fg leading-relaxed first-letter:uppercase">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.ingredients.length > 0 && (
          <div className="mt-6">
            <p className="font-mono text-[9px] text-accent uppercase tracking-[0.2em] mb-2">Ingredients</p>
            <div className="flex flex-wrap gap-1.5">
              {item.ingredients.map((s) => (
                <span key={s} className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted border border-[#D8CCB8] px-2 py-1">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {item.links?.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 flex items-center justify-between border border-[#D8CCB8] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-fg hover:border-accent hover:text-accent transition-colors duration-150"
          >
            {l.label}
            <ArrowUpRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ))}

        <div className="mt-7 flex flex-wrap gap-2">
          <button
            onClick={onAnother}
            className="px-5 py-3 bg-fg text-background font-mono text-[10px] uppercase tracking-[0.18em] transition-[background-color,transform] duration-150 hover:bg-accent active:scale-[0.97]"
          >
            Order something else
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 border border-[#CDBFA8] text-fg font-mono text-[10px] uppercase tracking-[0.18em] transition-[background-color,transform] duration-150 hover:bg-accent-bg active:scale-[0.97]"
          >
            Enjoy at the counter
          </button>
        </div>
      </div>
    </Modal>
  );
}
