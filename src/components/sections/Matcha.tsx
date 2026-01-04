"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";

export default function Matcha() {
  return (
    <Section id="matcha" variant="white">
      <div className="max-w-4xl mx-auto py-20 min-h-[400px] flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-charcoal">
            Matcha <span className="text-matcha">Ratings</span>
          </h2>
          <div className="w-16 h-1 bg-matcha rounded-full mx-auto mb-10" />
          
          <div className="bg-matcha-light/10 border border-matcha/20 rounded-3xl p-12 backdrop-blur-sm">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-matcha font-bold tracking-[0.2em] uppercase text-sm mb-4"
            >
              Coming Soon
            </motion.div>
            <p className="text-xl text-medium-gray leading-relaxed max-w-lg mx-auto">
              I&apos;m currently whisking up a dedicated space to share my matcha journey and ratings. Stay tuned! 🍵
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
