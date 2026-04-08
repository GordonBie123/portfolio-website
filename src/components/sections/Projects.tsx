"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import Link from "next/link";
import Image from "next/image";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-32">
      <h2 className="text-3xl font-display font-bold text-charcoal mb-8">Projects</h2>

      <div className="flex flex-col gap-8 md:gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col sm:flex-row gap-6 p-4 -space-x-4 sm:-mx-4 sm:space-x-0 rounded-2xl hover:bg-black/5 transition-all"
          >
            {/* Image */}
            <div className="relative z-10 w-full sm:w-1/3 shrink-0 h-32 overflow-hidden rounded border border-light-gray bg-matcha-light/10">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-xs font-bold opacity-20 text-matcha-light">{project.category}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="z-10 flex flex-col justify-center sm:w-2/3">
              <h3 className="font-medium leading-snug text-charcoal group-hover:text-matcha transition-colors">
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 focus-visible:text-matcha"
                >
                  {project.title}
                  <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-medium-gray line-clamp-3">
                {project.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="px-3 py-1 bg-white border border-light-gray text-charcoal rounded-full"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* More Projects Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-12"
      >
        <Link
          href={profile.links.github}
          target="_blank"
          className="inline-flex items-center gap-2 group text-sm font-semibold text-charcoal hover:text-matcha transition-colors"
        >
          View Full Project Archive
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </motion.div>
    </section>
  );
}
