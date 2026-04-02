"use client";

import { motion } from "framer-motion";

export default function Matcha() {
  return (
    <section id="matcha" className="scroll-mt-32">
      <h2 className="text-3xl font-display font-bold text-charcoal mb-8 flex items-center gap-2">
        Matcha <span className="text-matcha">Ratings</span>
      </h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-matcha-light/10 border border-matcha/20 rounded-2xl p-8 backdrop-blur-sm flex flex-col items-center text-center"
      >
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-matcha font-bold tracking-[0.2em] uppercase text-xs mb-4"
        >
          Coming Soon
        </motion.div>
        <p className="text-medium-gray leading-relaxed max-w-sm">
          I&apos;m currently whisking up a dedicated space to share my matcha journey and ratings. Stay tuned! 🍵
        </p>
      </motion.div>
    </section>
  );
}
