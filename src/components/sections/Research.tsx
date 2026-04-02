"use client";

import { motion } from "framer-motion";
import { researchTopics, researchOverview } from "@/data/research";
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

      {/* Research Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {researchTopics.map((topic, index) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-off-white/50 p-6 rounded-2xl border border-light-gray hover:border-matcha/30 hover:bg-white transition-all duration-300"
          >
            <div className="w-10 h-10 bg-white rounded-lg border border-light-gray flex items-center justify-center text-matcha mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <topic.icon size={20} />
            </div>
            <h3 className="text-lg font-bold text-charcoal mb-2">{topic.title}</h3>
            <p className="text-medium-gray text-sm leading-relaxed">
              {topic.description}
            </p>
          </motion.div>
        ))}
      </div>

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
