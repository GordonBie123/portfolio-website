"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Pull quote */}
        <blockquote
          className="font-display italic font-semibold text-2xl sm:text-3xl text-fg leading-snug mb-10"
          style={{ maxWidth: "32rem" }}
        >
          &ldquo;Building at the intersection of intelligence and intention.&rdquo;
        </blockquote>

        <div className="h-px bg-accent/30 mb-8" />

        <div className="space-y-5 text-fg-muted leading-relaxed text-[15px]">
          {profile.aboutBio.map((paragraph, index) => (
            <p
              key={index}
              dangerouslySetInnerHTML={{ __html: paragraph }}
              className="[&>strong]:text-fg [&>strong]:font-medium"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
