"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Section from "@/components/ui/Section";
import { projects } from "@/data/projects";
import Link from "next/link";

export default function Projects() {
  return (
    <Section id="projects" variant="off-white">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display font-bold mb-4"
        >
          Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-medium-gray"
        >
          Bringing ideas to life through code
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-2xl overflow-hidden border border-light-gray hover:border-matcha/30 transition-all duration-500 hover:shadow-2xl hover:shadow-matcha/10"
          >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden bg-matcha-light/10">
              <div className="absolute inset-0 bg-matcha/5 group-hover:bg-matcha/0 transition-colors duration-500" />
              {/* Fallback pattern if no image */}
              <div className="w-full h-full flex items-center justify-center text-matcha-light">
                <span className="text-4xl font-bold opacity-20">{project.category}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-charcoal group-hover:text-matcha transition-colors">
                  {project.title}
                </h3>
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="text-medium-gray hover:text-matcha transition-colors"
                >
                  <Github size={20} />
                </Link>
              </div>
              <p className="text-medium-gray text-sm leading-relaxed mb-6 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-matcha/10 text-matcha-dark text-[10px] font-bold uppercase tracking-wider rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                href={project.githubUrl}
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-bold text-matcha hover:text-matcha-dark transition-colors group/link"
              >
                View Repository
                <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
