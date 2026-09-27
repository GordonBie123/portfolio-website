"use client";

import { useState } from "react";
import { menu, type MenuItem } from "@/data/cafeMenu";
import { ItemArt } from "./ItemArt";
import { Modal } from "./Modal";
import { StampMark } from "./StampMark";

type Props = {
  stamps: Set<string>;
  onOrder: (item: MenuItem) => void;
  onClose: () => void;
  initialCategory?: string;
};

export function MenuPanel({ stamps, onOrder, onClose, initialCategory }: Props) {
  const [active, setActive] = useState(initialCategory ?? menu[0].id);
  const category = menu.find((c) => c.id === active) ?? menu[0];

  return (
    <Modal title="Menu" kicker="お品書き · What'll it be?" onClose={onClose} wide>
      <div className="flex flex-col sm:flex-row min-h-0">
        {/* Category tabs */}
        <nav className="sm:w-56 shrink-0 flex sm:flex-col overflow-x-auto no-scrollbar border-b sm:border-b-0 sm:border-r border-[#E2D8C8]">
          {menu.map((c) => {
            const tried = c.items.filter((i) => stamps.has(i.id)).length;
            const selected = c.id === active;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`shrink-0 text-left px-5 sm:px-6 py-3.5 sm:py-4 border-b-2 sm:border-b-0 sm:border-l-2 transition-colors duration-150 ${
                  selected ? "border-accent bg-accent-bg" : "border-transparent hover:bg-[#F1ECE3]"
                }`}
              >
                <span className="block font-mono text-[9px] text-fg-subtle tracking-[0.15em]">{c.jp}</span>
                <span className={`block font-sans text-sm whitespace-nowrap ${selected ? "text-accent" : "text-fg"}`}>{c.name}</span>
                <span className="hidden sm:block mt-0.5 font-mono text-[9px] text-fg-muted">
                  {tried}/{c.items.length} tried
                </span>
              </button>
            );
          })}
        </nav>

        {/* Items */}
        <div className="flex-1 p-5 sm:p-6">
          <p className="text-fg-muted text-[13px] mb-4">{category.blurb}</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {category.items.map((item) => {
              const tried = stamps.has(item.id);
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onOrder(item)}
                    className="group w-full text-left flex items-center gap-3 border border-[#E2D8C8] bg-[#FBF8F2] p-3 transition-[border-color,background-color,transform] duration-150 hover:border-accent hover:bg-accent-bg active:scale-[0.99]"
                  >
                    <span className="relative shrink-0 w-16 h-16 bg-[#F1ECE3] flex items-center justify-center">
                      <ItemArt art={item.art} color={item.color} className="w-14 h-14 transition-transform duration-200 group-hover:-translate-y-0.5" />
                      {tried && <StampMark className="absolute -top-1.5 -right-1.5 w-5 h-5" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="font-display italic font-semibold text-xl leading-tight text-fg group-hover:text-accent transition-colors duration-150">
                          {item.name}
                        </span>
                        <span className="font-mono text-[11px] text-fg-muted shrink-0">¥{item.price}</span>
                      </span>
                      <span className="block mt-0.5 text-[12px] text-fg-muted truncate">
                        {item.title} · {item.subtitle.split(" · ")[0]}
                      </span>
                      <span className="block mt-1 font-mono text-[9px] text-fg-subtle tracking-[0.12em]">{item.jp}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
