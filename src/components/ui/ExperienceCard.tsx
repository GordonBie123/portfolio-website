"use client";

import { motion } from "framer-motion";
import { Experience } from "@/data/experience";
import Image from "next/image";

export function ExperienceCard({ experience, index = 0 }: { experience: Experience; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border border-border-light border-l-[3px] border-l-accent bg-surface hover:bg-surface-hover transition-colors duration-200"
    >
      <div className="p-5 sm:p-6">

        {/* Top row — logo + company + duration */}
        <div className="flex items-start justify-between gap-3 mb-4 overflow-hidden">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 border border-border-light bg-background flex-shrink-0 flex items-center justify-center overflow-hidden">
              {experience.logo ? (
                <Image src={experience.logo} alt={experience.company} width={32} height={32} className="w-full h-full object-cover" />
              ) : (
                <span className="font-display italic text-sm text-accent leading-none">{experience.company[0]}</span>
              )}
            </div>
            <p className="font-mono text-[9px] text-accent uppercase tracking-[0.18em] leading-tight">
              {experience.company}
            </p>
          </div>

          <div className="text-right flex-shrink-0 max-w-[44%]">
            <p className="font-mono text-[9px] text-fg-muted tabular-nums truncate">{experience.duration}</p>
            <p className="font-mono text-[9px] text-fg-subtle mt-0.5 truncate">{experience.location}</p>
          </div>
        </div>

        {/* Role — hero */}
        <h3 className="font-display italic font-semibold text-2xl text-fg leading-tight mb-2">
          {experience.role}
        </h3>

        {/* Description or responsibilities */}
        {experience.description ? (
          <p className="font-sans text-sm text-fg-muted leading-relaxed">
            {experience.description}
          </p>
        ) : experience.responsibilities.length > 0 && (
          <div className="space-y-1.5">
            {experience.responsibilities.map((r, i) => (
              <p key={i} className="font-sans text-sm text-fg-muted leading-relaxed">{r}</p>
            ))}
          </div>
        )}

        {/* Skills */}
        {experience.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border-light">
            {experience.skills.map((skill) => (
              <span key={skill} className="px-2 py-0.5 border border-border-light text-fg-muted font-mono text-[9px] uppercase tracking-wide">
                {skill}
              </span>
            ))}
          </div>
        )}

      </div>
    </motion.div>
  );
}
