"use client";

import { motion } from "framer-motion";
import { sideQuests, sideQuestsContent } from "@/data/sidequests";
import { ExperienceCard } from "@/components/ui/ExperienceCard";

export default function SideQuests() {
  return (
    <section id="side-quests">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-[9px] text-accent uppercase tracking-[0.25em] mb-2">
          Personal
        </p>
        <h2 className="font-display italic font-semibold text-2xl text-fg mb-6">Side Quests</h2>
        <div className="h-px bg-accent/30 mb-8" />

        <p className="font-sans text-sm text-fg-muted leading-relaxed mb-10">
          {sideQuestsContent.subtitle}
        </p>

        <div className="flex flex-col gap-3">
          {sideQuests.map((quest, i) => (
            <ExperienceCard key={i} experience={quest} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
