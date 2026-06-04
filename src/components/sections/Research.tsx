"use client";

import { motion } from "framer-motion";
import { researchOverview } from "@/data/research";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { experiences } from "@/data/experience";

export default function Research() {
  return (
    <section id="research">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-[9px] text-accent uppercase tracking-[0.25em] mb-2">
          Research
        </p>
        <h2 className="font-display italic font-semibold text-2xl text-fg mb-6">Academic Research</h2>
        <div className="h-px bg-accent/30 mb-8" />

        <p
          className="font-sans text-sm text-fg-muted leading-relaxed mb-5"
          dangerouslySetInnerHTML={{ __html: researchOverview }}
        />
        <p className="font-sans text-sm text-fg-subtle italic mb-10">
          Open to researching anything that can help make the world a better place and is related to AI.
        </p>

        <div className="flex flex-col gap-3">
          {experiences
            .filter((e) => e.type === "research")
            .map((exp, i) => (
              <ExperienceCard key={i} experience={exp} index={i} />
            ))}
        </div>
      </motion.div>
    </section>
  );
}
