"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Project } from "@/data/projects";

function ProjectVisual({ id }: { id: string }) {
  const base = "absolute inset-0 overflow-hidden";

  if (id === "unsprawl") {
    return (
      <div className={base}>
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, rgba(74,103,65,0.5) 1.5px, transparent 0)",
          backgroundSize: "22px 22px",
        }} />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="none">
          <line x1="22" y1="24" x2="66" y2="24" stroke="rgba(74,103,65,0.35)" strokeWidth="1" />
          <line x1="66" y1="24" x2="110" y2="48" stroke="rgba(74,103,65,0.35)" strokeWidth="1" />
          <line x1="110" y1="48" x2="154" y2="48" stroke="rgba(74,103,65,0.35)" strokeWidth="1" />
          <line x1="66" y1="24" x2="66" y2="72" stroke="rgba(74,103,65,0.2)" strokeWidth="1" />
          <line x1="110" y1="48" x2="110" y2="96" stroke="rgba(74,103,65,0.2)" strokeWidth="1" />
          <line x1="44" y1="72" x2="110" y2="72" stroke="rgba(74,103,65,0.25)" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  if (id === "sp500") {
    const bars = [38, 55, 42, 68, 52, 74, 45, 82, 60, 71, 50, 66, 78, 55, 63];
    return (
      <div className={base + " flex items-end px-4 pb-4 pt-6 gap-[3px]"}>
        {bars.map((h, i) => (
          <div key={i} className="flex-1 bg-accent/25" style={{ height: `${h}%` }} />
        ))}
      </div>
    );
  }

  if (id === "relaylist") {
    const wave = [20, 45, 70, 55, 85, 65, 40, 90, 60, 75, 50, 80, 45, 65, 30, 70, 55, 40, 60, 25];
    return (
      <div className={base + " flex items-center px-4 gap-[3px]"}>
        {wave.map((h, i) => (
          <div key={i} className="flex-1 bg-accent/28" style={{ height: `${h}%` }} />
        ))}
      </div>
    );
  }

  if (id === "Opvol") {
    return (
      <div className={base}>
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(74,103,65,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(74,103,65,0.13) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }} />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="none">
          <path d="M0,90 Q40,20 80,40 Q120,60 160,10 Q180,5 200,30" stroke="rgba(74,103,65,0.5)" strokeWidth="1.5" fill="none" />
          <path d="M0,100 Q40,40 80,55 Q120,70 160,25 Q180,18 200,45" stroke="rgba(74,103,65,0.28)" strokeWidth="1" fill="none" />
        </svg>
      </div>
    );
  }

  if (id === "trading") {
    return (
      <div className={base}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
          <path d="M0,30 Q40,60 80,45 Q120,30 160,55 Q180,65 200,50" stroke="rgba(74,103,65,0.55)" strokeWidth="1.5" fill="none" />
          <path d="M0,70 Q40,40 80,55 Q120,70 160,45 Q180,35 200,50" stroke="rgba(74,103,65,0.32)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
          <rect x="70" y="40" width="80" height="20" fill="rgba(74,103,65,0.05)" />
        </svg>
      </div>
    );
  }

  if (id === "portfolio") {
    return (
      <div className={base + " p-5 flex flex-col"}>
        <div className="flex gap-1.5 mb-3">
          {[0,1,2].map(i => <div key={i} className="w-2 h-2 border border-fg/15 bg-fg/06" />)}
        </div>
        <div className="flex-1 border border-fg/12 p-3 flex flex-col gap-2">
          <div className="h-1.5 bg-fg/10" style={{ width: "70%" }} />
          <div className="h-1.5 bg-fg/07" style={{ width: "50%" }} />
          <div className="mt-1 flex gap-2 flex-1">
            <div className="w-1/3 bg-fg/05 border border-fg/08" />
            <div className="flex-1 flex flex-col gap-1.5 pt-1">
              <div className="h-1.5 bg-fg/08" />
              <div className="h-1.5 bg-fg/08" style={{ width: "80%" }} />
              <div className="h-1.5 bg-fg/08" style={{ width: "60%" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  span?: "1" | "2";
  visualHeight?: string;
}

export function ProjectCard({ project, index, span = "1", visualHeight = "h-40" }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className={`bg-surface flex flex-col group hover:bg-surface-hover transition-colors duration-200 ${span === "2" ? "md:col-span-2" : ""}`}
    >
      {/* Visual zone */}
      <div className={`relative ${visualHeight} border-b border-border-light bg-background overflow-hidden`}>
        <ProjectVisual id={project.id} />
        <span className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-wide text-fg-subtle bg-background/80 px-2 py-0.5">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <span className="font-mono text-[9px] text-fg-subtle mb-2">{String(index + 1).padStart(2, "0")}</span>

        <h3 className="font-display font-semibold text-lg text-fg leading-tight mb-2">
          <Link href={project.githubUrl} target="_blank"
            className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
            {project.title}
            <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 shrink-0" />
          </Link>
        </h3>

        <p className="text-fg-muted text-[13px] leading-relaxed mb-4 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-light">
          {project.techStack.slice(0, span === "2" ? 8 : 5).map((tech) => (
            <span key={tech} className="px-2 py-0.5 border border-border-light text-fg-muted font-mono text-[9px] uppercase tracking-wide">
              {tech}
            </span>
          ))}
          {project.techStack.length > (span === "2" ? 8 : 5) && (
            <span className="font-mono text-[9px] text-fg-subtle px-1">+{project.techStack.length - (span === "2" ? 8 : 5)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
