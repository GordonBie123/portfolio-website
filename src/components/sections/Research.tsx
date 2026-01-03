"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { researchTopics, researchOverview } from "@/data/research";
import { Button } from "@/components/ui/Button";

export default function Research() {
  return (
    <Section id="research" variant="white">
      <div className="flex flex-col items-center text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display font-bold mb-6"
        >
          Research Interests
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-medium-gray max-w-3xl leading-relaxed"
        >
          {researchOverview}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {researchTopics.map((topic, index) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-off-white p-8 rounded-2xl border border-transparent hover:border-matcha/30 hover:bg-white transition-all duration-300 hover:shadow-xl hover:shadow-matcha/5"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-matcha mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <topic.icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-charcoal mb-3">{topic.title}</h3>
            <p className="text-medium-gray text-sm leading-relaxed">
              {topic.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 p-8 rounded-2xl border-2 border-dashed border-light-gray flex flex-col items-center text-center"
      >
        <div className="text-matcha mb-4">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block"
          >
            📝
          </motion.span>
        </div>
        <h3 className="text-xl font-bold mb-2">Currently building my research portfolio</h3>
        <p className="text-medium-gray text-sm mb-6 max-w-lg">
          Interested in collaborating on applied ML or bioinformatics projects? I&apos;m always looking for new research opportunities and partnerships.
        </p>
        <Button 
          variant="outline" 
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        >
          Let&apos;s Connect
        </Button>
      </motion.div>
    </Section>
  );
}
