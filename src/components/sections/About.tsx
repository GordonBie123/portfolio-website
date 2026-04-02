"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-4 text-medium-gray leading-relaxed text-base"
      >
        <h2 className="text-3xl font-display font-bold text-charcoal mb-8">About</h2>
        {profile.aboutBio.map((paragraph, index) => (
          <p 
            key={index} 
            dangerouslySetInnerHTML={{ __html: paragraph }}
            className="[&>strong]:text-charcoal/90 [&>strong]:font-semibold mb-4"
          />
        ))}
      </motion.div>
    </section>
  );
}
