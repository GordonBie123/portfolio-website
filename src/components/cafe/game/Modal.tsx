"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  title: string;
  kicker: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
};

export function Modal({ title, kicker, onClose, children, wide }: Props) {
  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-end sm:items-center justify-center bg-[#2B2824]/25 backdrop-blur-[3px] p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative w-full ${wide ? "sm:max-w-5xl" : "sm:max-w-xl"} max-h-[88vh] sm:max-h-[86vh] flex flex-col bg-[#F8F4EC] border border-[#CDBFA8] shadow-[0_30px_80px_-30px_rgba(58,47,37,0.55)]`}
        initial={{ y: 24, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 16, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-2 texture-wood border-b border-[#CDBFA8] shrink-0" />
        <div className="flex items-start justify-between px-6 sm:px-8 pt-6 pb-4 border-b border-[#E2D8C8] shrink-0">
          <div>
            <p className="font-mono text-[9px] text-fg-muted uppercase tracking-[0.25em]">{kicker}</p>
            <h2 className="mt-1 font-display italic font-semibold text-3xl sm:text-4xl text-fg leading-none">{title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 -mr-2 text-fg-muted hover:text-fg transition-colors duration-150"
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto">{children}</div>
      </motion.div>
    </motion.div>
  );
}
