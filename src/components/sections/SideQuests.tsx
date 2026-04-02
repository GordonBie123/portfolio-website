"use client";

import { motion } from "framer-motion";
import { sideQuests, sideQuestsContent } from "@/data/sidequests";
import { ExperienceCard } from "@/components/ui/ExperienceCard";

export default function SideQuests() {
  return (
    <section id="side-quests" className="scroll-mt-32">
      <h2 className="text-3xl font-display font-bold text-charcoal mb-8">Side Quests</h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-medium-gray text-base leading-relaxed mb-8"
      >
        {sideQuestsContent.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6 flex flex-col"
      >
        {sideQuests.map((quest, index) => (
          <ExperienceCard key={index} experience={quest} />
        ))}
      </motion.div>
    </section>
  );
}
