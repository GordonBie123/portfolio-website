"use client";

import { motion } from "framer-motion";
import { Experience } from "@/data/experience";
import Image from "next/image";

export function HorizontalExperienceCard({ experience, index }: { experience: Experience; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="flex-shrink-0 w-68 sm:w-72 border border-border-light bg-background flex flex-col hover:border-accent transition-colors duration-200"
      style={{ width: "17rem" }}
    >
      {/* Matcha top stripe */}
      <div className="h-[2px] bg-accent w-full" />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 border border-border-light bg-surface flex items-center justify-center flex-shrink-0 overflow-hidden">
            {experience.logo ? (
              <Image src={experience.logo} alt={experience.company} width={36} height={36} className="w-full h-full object-cover" />
            ) : (
              <span className="font-display italic text-base text-accent">{experience.company[0]}</span>
            )}
          </div>
          <p className="font-mono text-[9px] text-accent uppercase tracking-wide leading-tight">
            {experience.company}
          </p>
        </div>

        <h3 className="font-display font-semibold text-base text-fg leading-tight mb-2">
          {experience.role}
        </h3>

        {experience.description && (
          <p className="text-fg-muted text-xs leading-relaxed flex-1">{experience.description}</p>
        )}

        <div className="mt-auto pt-4 border-t border-border-light">
          <p className="font-mono text-[9px] text-fg-muted">{experience.duration}</p>
          <p className="font-mono text-[9px] text-fg-subtle mt-0.5 truncate">{experience.location}</p>
        </div>
      </div>
    </motion.div>
  );
}
