"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { allItems, baristaChat, type MenuItem } from "@/data/cafeMenu";
import { CounterScene, type Hotspot } from "./CounterScene";
import { Dialogue, type Choice } from "./Dialogue";
import { MenuPanel } from "./MenuPanel";
import { Brewing, ServedCard } from "./OrderViews";
import { GuestbookPanel, PantryPanel, StaffPanel, StampCardPanel } from "./Panels";
import { StampMark } from "./StampMark";

type Panel = null | "menu" | "pantry" | "guestbook" | "stamps" | "staff";
type Order = { item: MenuItem; phase: "brewing" | "served"; ticket: number; firstTime: boolean };

const STAMP_KEY = "cafe:stamps";

const GREETING = [
  "Irasshaimase! Welcome to Gordon's Matcha.",
  "I'm Gordon. Everything on the menu is a piece of my story: jobs are drinks, projects are sweets, side quests are small plates.",
  "Poke around, most things in here are clickable. What can I get you?",
];

const SERVED_LINES = [
  "Order up! Careful, it's hot.",
  "Here you go. Freshly made, just for you.",
  "One of my favourites. Enjoy!",
  "Done! Tell me what you think.",
];

const PANEL_LINES: Record<Exclude<Panel, null>, string> = {
  menu: "Take your time. Everything's made to order.",
  pantry: "That's the pantry. Everything I cook with.",
  guestbook: "Leave a note! I read every one.",
  stamps: "Fill the card and there's a free drink in it for you.",
  staff: "Ah, my staff card. Don't look too closely at the photo.",
};

function loadStamps(): Set<string> {
  try {
    const saved: string[] = JSON.parse(localStorage.getItem(STAMP_KEY) ?? "[]");
    return new Set(saved.filter((id) => allItems.some((i) => i.id === id)));
  } catch {
    return new Set();
  }
}

function useBostonClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", hour: "numeric", minute: "2-digit" });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function CafeGame({ stats, onLeave }: { stats: ReactNode; onLeave: () => void }) {
  const [panel, setPanel] = useState<Panel>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [lastServed, setLastServed] = useState<MenuItem | null>(null);
  // Only ever rendered client-side (after walking in), so storage is safe to read here
  const [stamps, setStamps] = useState<Set<string>>(loadStamps);
  const [lines, setLines] = useState<string[]>(() =>
    stamps.size
      ? [
          "Welcome back! Good to see a regular.",
          `You've tried ${stamps.size} of ${allItems.length} things on the menu. What'll it be today?`,
        ]
      : GREETING,
  );
  const [talking, setTalking] = useState(false);
  const [ticket, setTicket] = useState(1);
  const clock = useBostonClock();

  const say = useCallback((next: string[]) => setLines([...next]), []);

  const openPanel = useCallback(
    (p: Exclude<Panel, null>) => {
      setPanel(p);
      say([PANEL_LINES[p]]);
    },
    [say],
  );

  const chat = useCallback(() => {
    setPanel(null);
    say(baristaChat);
  }, [say]);

  const placeOrder = useCallback(
    (item: MenuItem) => {
      setPanel(null);
      setOrder({ item, phase: "brewing", ticket, firstTime: !stamps.has(item.id) });
      setTicket((t) => t + 1);
      say([`One ${item.name}, coming right up!`]);
    },
    [say, stamps, ticket],
  );

  const finishBrewing = useCallback(() => {
    if (!order) return;
    setOrder({ ...order, phase: "served" });
    setLastServed(order.item);

    if (stamps.has(order.item.id)) {
      say(["Back for another? Good taste.", "Anything else?"]);
      return;
    }
    const next = new Set(stamps).add(order.item.id);
    setStamps(next);
    localStorage.setItem(STAMP_KEY, JSON.stringify([...next]));
    say(
      next.size === allItems.length
        ? ["That's the whole menu. You're officially a regular!", "Check your stamp card, your free drink is waiting."]
        : [SERVED_LINES[next.size % SERVED_LINES.length], "Anything else?"],
    );
  }, [order, stamps, say]);

  const closeAll = useCallback(() => {
    setPanel(null);
    setOrder((o) => (o?.phase === "served" ? null : o));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAll();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAll]);

  const onHotspot = useCallback(
    (h: Hotspot) => {
      if (order?.phase === "brewing") return;
      if (h === "barista") chat();
      else openPanel(h);
    },
    [order, chat, openPanel],
  );

  const choices: Choice[] = useMemo(
    () => [
      { label: "Order", onSelect: () => openPanel("menu"), primary: true },
      { label: "Chat", onSelect: chat },
      { label: "Pantry", onSelect: () => openPanel("pantry") },
      { label: "Staff card", onSelect: () => openPanel("staff") },
      { label: "Guestbook", onSelect: () => openPanel("guestbook") },
    ],
    [openPanel, chat],
  );

  const brewing = order?.phase === "brewing";
  const stampCount = stamps.size;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F2EDE5]">
      <CounterScene
        onHotspot={onHotspot}
        brewing={brewing}
        talking={talking && !brewing}
        served={brewing ? null : lastServed}
        stampCount={stampCount}
      />

      {/* HUD */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 px-4 sm:px-8 pt-4 sm:pt-5">
        <button
          onClick={onLeave}
          className="group flex items-center gap-2 bg-[#F8F4EC]/85 backdrop-blur-sm border border-[#CDBFA8] px-3 py-2 font-mono text-[9px] sm:text-[10px] text-fg-muted uppercase tracking-[0.2em] hover:text-fg transition-colors duration-150"
        >
          <ArrowLeft size={12} className="transition-transform duration-150 group-hover:-translate-x-0.5" />
          Outside
        </button>

        <div className="flex items-center gap-2">
          {clock && (
            <span className="hidden md:flex items-center gap-2 bg-[#F8F4EC]/85 backdrop-blur-sm border border-[#CDBFA8] px-3 py-2 font-mono text-[10px] text-fg-muted uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 bg-accent block animate-pulse" />
              Open · BOS {clock}
            </span>
          )}
          <button
            onClick={() => openPanel("stamps")}
            className="flex items-center gap-2 bg-[#F8F4EC]/85 backdrop-blur-sm border border-[#CDBFA8] px-3 py-1.5 font-mono text-[10px] text-fg uppercase tracking-[0.15em] hover:border-accent transition-colors duration-150"
            aria-label={`Stamp card, ${stampCount} of ${allItems.length} tried`}
          >
            <StampMark className="w-4 h-4" label="印" />
            <span className="tabular-nums">
              {stampCount}/{allItems.length}
            </span>
          </button>
          <a
            href="/Bie_Gordon_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#F8F4EC]/85 backdrop-blur-sm border border-[#CDBFA8] px-3 py-2 font-mono text-[9px] sm:text-[10px] text-fg-muted uppercase tracking-[0.2em] hover:text-accent transition-colors duration-150"
          >
            Résumé
          </a>
          <Link
            href="/about"
            className="hidden sm:block bg-[#F8F4EC]/85 backdrop-blur-sm border border-[#CDBFA8] px-3 py-2 font-mono text-[10px] text-fg-muted uppercase tracking-[0.2em] hover:text-accent transition-colors duration-150"
          >
            Classic site
          </Link>
        </div>
      </div>

      {/* Dialogue / brewing */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center px-3 sm:px-8 pb-4 sm:pb-8">
        <AnimatePresence mode="wait">
          {brewing && order ? (
            <Brewing key={`brew-${order.ticket}`} item={order.item} onDone={finishBrewing} />
          ) : (
            <Dialogue key="dialogue" lines={lines} choices={choices} onTalkingChange={setTalking} />
          )}
        </AnimatePresence>
      </div>

      {/* Panels */}
      <AnimatePresence>
        {panel === "menu" && <MenuPanel key="menu" stamps={stamps} onOrder={placeOrder} onClose={() => setPanel(null)} />}
        {panel === "pantry" && <PantryPanel key="pantry" onClose={() => setPanel(null)} />}
        {panel === "guestbook" && <GuestbookPanel key="guestbook" onClose={() => setPanel(null)} />}
        {panel === "staff" && <StaffPanel key="staff" stats={stats} onClose={() => setPanel(null)} />}
        {panel === "stamps" && (
          <StampCardPanel key="stamps" stamps={stamps} onPick={placeOrder} onClose={() => setPanel(null)} />
        )}
        {order?.phase === "served" && (
          <ServedCard
            key={`served-${order.ticket}`}
            item={order.item}
            ticket={order.ticket}
            firstTime={order.firstTime}
            onAnother={() => {
              setOrder(null);
              openPanel("menu");
            }}
            onClose={() => setOrder(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
