"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { sideQuests, sideQuestsContent } from "@/data/sidequests";
import { ExperienceCard } from "@/components/ui/ExperienceCard";

export default function SideQuests() {
  return (
    <Section id="side-quests" variant="off-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold mb-6"
          >
            Side Quests
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-medium-gray max-w-2xl leading-relaxed"
          >
            {sideQuestsContent.subtitle}
          </motion.p>
          <div className="w-12 h-1 bg-matcha rounded-full mt-8" />
        </div>

        <div className="mt-12">
          {sideQuests.map((quest, index) => (
            <ExperienceCard key={index} experience={quest} />
          ))}
        </div>
      </div>
    </Section>
  );
}
