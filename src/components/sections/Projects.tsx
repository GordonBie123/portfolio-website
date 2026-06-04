"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import Link from "next/link";
import { ProjectCard } from "@/components/ui/ProjectCard";

export default function Projects() {
  const [featured, ...rest] = projects;
  const [p2, p3, p4, p5, p6] = rest;

  return (
    <section id="projects">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="h-px bg-border-light" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border-light border border-border-light">
        <ProjectCard project={featured} index={0} span="2" visualHeight="h-56" />
        {p2 && <ProjectCard project={p2} index={1} span="1" visualHeight="h-56" />}
        {p3 && <ProjectCard project={p3} index={2} span="1" />}
        {p4 && <ProjectCard project={p4} index={3} span="1" />}
        {p5 && <ProjectCard project={p5} index={4} span="1" />}
        {p6 && <ProjectCard project={p6} index={5} span="2" visualHeight="h-40" />}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8"
      >
        <Link
          href={profile.links.github}
          target="_blank"
          className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg-muted hover:text-accent transition-colors"
        >
          Full Archive →
        </Link>
      </motion.div>
    </section>
  );
}
