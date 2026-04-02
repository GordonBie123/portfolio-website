"use client";

import { motion } from "framer-motion";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { experiences } from "@/data/experience";

export default function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-display font-bold text-charcoal mb-8">Experience</h2>
        
        <div className="space-y-6">
          <div>
            {experiences
              .filter((exp) => exp.type === "professional")
              .map((exp, index) => (
                <ExperienceCard key={index} experience={exp} />
              ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
