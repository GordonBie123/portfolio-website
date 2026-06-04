"use client";

import { motion } from "framer-motion";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { experiences } from "@/data/experience";

const professional = experiences.filter((e) => e.type === "professional");

export default function ExperienceSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id="experience" className="px-6 sm:px-12 lg:px-16 py-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {standalone && (
          <>
            <p className="font-mono text-[9px] text-accent uppercase tracking-[0.25em] mb-2">
              Professional
            </p>
            <h2 className="font-display italic font-semibold text-2xl text-fg mb-6">
              Work Experience
            </h2>
            <div className="h-px bg-accent/30 mb-8" />
          </>
        )}

        <div className="flex flex-col gap-3">
          {professional.map((exp, i) => (
            <ExperienceCard key={i} experience={exp} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
