"use client";

import { motion } from "framer-motion";
import { researchOverview } from "@/data/research";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { experiences } from "@/data/experience";

export default function Research() {
  return (
    <section id="research" className="scroll-mt-32">
      <h2 className="text-3xl font-display font-bold text-charcoal mb-8">Research</h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <p
          className="text-medium-gray text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: researchOverview }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-medium-gray italic text-sm mb-12"
      >
        I am open to and interested in researching more and learning more as long as it can help make the world a better place and is somewhat related to AI.
      </motion.p>

      {/* Research Experience Subsection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-bold text-charcoal mb-6">Research Experience</h3>
        <div className="space-y-6 flex flex-col">
          {experiences
            .filter((exp) => exp.type === "research")
            .map((exp, index) => (
              <ExperienceCard key={index} experience={exp} />
            ))}
        </div>
      </motion.div>
    </section>
  );
}
