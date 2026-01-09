"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Section from "@/components/ui/Section";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import Link from "next/link";
import Image from "next/image";

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
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e) => {
                    // Hide image on error and show fallback
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : null}
              {/* Fallback pattern if no image or image fails to load */}
              <div className="absolute inset-0 w-full h-full flex items-center justify-center text-matcha-light pointer-events-none">
                <span className="text-4xl font-bold opacity-20">{project.category}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-charcoal group-hover:text-matcha transition-colors">
                  {project.title}
                </h3>
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

      {/* Currently Building Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12"
      >
        <div className="bg-gradient-to-br from-matcha/5 to-matcha-light/5 rounded-2xl p-6 border-2 border-dashed border-matcha/30">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-matcha/10 flex items-center justify-center">
                <span className="text-2xl">🚧</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-charcoal mb-2">Currently Building</h3>
              <p className="text-medium-gray leading-relaxed">
                A mobile iOS and Android <span className="font-semibold text-matcha-dark">AI Voice Journaling App</span> with Expo and Node.js
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* More Projects Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center"
      >
        <p className="text-medium-gray text-lg mb-4">
          I have more projects! You can view them on my GitHub.
        </p>
        <Link
          href={profile.links.github}
          target="_blank"
          className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-white rounded-full font-bold hover:bg-matcha transition-colors duration-300"
        >
          <Github size={20} />
          Visit My GitHub
        </Link>
      </motion.div>
    </Section>
  );
}
