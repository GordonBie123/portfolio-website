import { motion } from "framer-motion";
import { Experience } from "@/data/experience";
import Image from "next/image";

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative pl-8 pb-12 last:pb-0 group"
    >
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-light-gray group-last:bg-transparent" />
      
      {/* Timeline Dot */}
      <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-matcha group-hover:scale-150 transition-transform duration-300" />

      <div className="bg-white p-6 rounded-xl border border-light-gray hover:border-matcha/30 hover:shadow-lg hover:shadow-matcha/5 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-off-white rounded-lg overflow-hidden border border-light-gray flex-shrink-0 flex items-center justify-center">
              {experience.logo ? (
                <Image
                  src={experience.logo}
                  alt={experience.company}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-matcha-light">
                  {experience.company[0]}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-charcoal leading-tight">{experience.role}</h3>
              <p className="text-matcha font-medium">{experience.company}</p>
            </div>
          </div>
          <div className="text-sm text-medium-gray text-left md:text-right">
            <p className="font-medium">{experience.duration}</p>
            <p>{experience.location}</p>
          </div>
        </div>

        <ul className="space-y-2 mb-6">
          {experience.responsibilities.map((resp, i) => (
            <li key={i} className="text-medium-gray text-sm flex gap-2">
              <span className="text-matcha mt-1">•</span>
              <span>{resp}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {experience.skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="px-3 py-1 bg-off-white text-medium-gray text-xs font-medium rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
