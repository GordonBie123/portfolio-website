"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CafeScene, COUNTER_FOCUS, SCENE_H, SCENE_W } from "./CafeScene";
import { CafeGame } from "./game/CafeGame";

type Stage = "outside" | "entering" | "inside";

const SESSION_KEY = "cafe:inside";
const ZOOM = 2.1;
const EASE = [0.65, 0, 0.35, 1] as const;

// Where the counter lands in the container, given the SVG's "slice" crop
function focusOrigin(el: HTMLElement) {
  const { width, height } = el.getBoundingClientRect();
  const scale = Math.max(width / SCENE_W, height / SCENE_H);
  const x = (width - SCENE_W * scale) / 2 + COUNTER_FOCUS.x * scale;
  const y = (height - SCENE_H * scale) / 2 + COUNTER_FOCUS.y * scale;
  return `${x}px ${y}px`;
}

export function Cafe({ stats }: { stats: ReactNode }) {
  const [stage, setStage] = useState<Stage>("outside");
  const [origin, setOrigin] = useState("50% 50%");
  const [instant, setInstant] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Returning in the same session: skip the walk-in and go straight to the counter
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) && sceneRef.current) {
      setOrigin(focusOrigin(sceneRef.current));
      setInstant(true);
      setStage("inside");
    }
  }, []);

  const enter = useCallback(() => {
    if (!sceneRef.current || stage !== "outside") return;
    setOrigin(focusOrigin(sceneRef.current));
    setInstant(false);
    setStage("entering");
    sessionStorage.setItem(SESSION_KEY, "1");
  }, [stage]);

  const leave = useCallback(() => {
    setInstant(false);
    setStage("outside");
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  const zoomed = stage !== "outside";
  const duration = instant || reduceMotion ? 0 : 1.1;

  return (
    <main className="fixed inset-0 overflow-hidden bg-background">
      <motion.div
        ref={sceneRef}
        className="absolute inset-0"
        style={{ transformOrigin: origin }}
        initial={false}
        animate={{ scale: zoomed ? ZOOM : 1 }}
        transition={{ duration, ease: EASE }}
        onAnimationComplete={() => stage === "entering" && setStage("inside")}
      >
        <CafeScene onCounterClick={stage === "outside" ? enter : undefined} counterHint={stage === "outside"} />
      </motion.div>

      {/* Storefront overlay */}
      <AnimatePresence>
        {stage === "outside" && (
          <motion.div
            key="outside"
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.8, delay: instant ? 0 : 0.3 }}
          >
            <div className="absolute top-5 right-6 sm:top-7 sm:right-10 flex items-center gap-2 bg-[#F8F4EC]/80 backdrop-blur-sm border border-[#CDBFA8] px-3 py-1.5">
              <span className="w-1.5 h-1.5 bg-accent block animate-pulse" />
              <span className="font-mono text-[9px] text-fg-muted uppercase tracking-[0.2em]">Open now</span>
            </div>

            {/* On narrow screens the curved sign is cropped, so it's hidden and replaced here */}
            <p className="sm:hidden absolute inset-x-0 top-[13%] text-center font-sans font-medium text-[22px] tracking-[0.3em] text-[#2B2824] [text-shadow:0_0_14px_#FFF6E4]">
              GORDON&apos;S MATCHA
            </p>

            <div className="absolute inset-x-0 bottom-0 px-6 pb-8 sm:pb-12 flex flex-col items-center text-center">
              <p className="font-mono text-[9px] sm:text-[10px] text-fg-muted uppercase tracking-[0.25em] mb-4 [text-shadow:0_0_12px_#F8F4EC]">
                A portfolio · Boston → New York
              </p>
              <button
                onClick={enter}
                className="pointer-events-auto group flex items-center gap-3 bg-fg text-background px-7 py-3.5 font-sans text-xs uppercase tracking-[0.2em] transition-[background-color,transform] duration-200 hover:bg-accent active:scale-[0.97]"
              >
                Step inside
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <p className="hidden sm:block mt-3 font-mono text-[9px] text-fg-subtle uppercase tracking-[0.2em]">
                or walk up to the counter
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inside: the counter */}
      <AnimatePresence>
        {stage === "inside" && (
          <motion.div
            key="inside"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: instant ? 0 : 0.5 }}
          >
            <CafeGame stats={stats} onLeave={leave} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
