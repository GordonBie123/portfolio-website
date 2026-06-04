"use client";

import { motion } from "framer-motion";

export default function Matcha() {
  return (
    <section id="matcha">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-display italic font-semibold text-2xl text-fg mb-6">
          Matcha Ratings
        </h2>
        <div className="h-px bg-border-light mb-8" />

        <div className="border border-border-light bg-accent-bg p-8">
          <p className="font-mono text-[9px] text-accent uppercase tracking-[0.25em] mb-3">
            Coming Soon
          </p>
          <p className="text-fg-muted text-[15px] leading-relaxed max-w-sm">
            A dedicated space for matcha discovery and ratings — currently brewing.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
