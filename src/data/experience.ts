export interface Experience {
  role: string;
  company: string;
  duration: string;
  location: string;
  description?: string;
  responsibilities: string[];
  skills: string[];
  type: "professional" | "research";
  logo?: string;
}

export const experiences: Experience[] = [
  // ── Professional ──────────────────────────────────────────────
  {
    role: "engineer",
    company: "Flow Traders · Internship",
    duration: "Jun 2026 - Present · 1 mo",
    location: "New York, New York, United States · On-site",
    description: "trading systems",
    responsibilities: [],
    skills: [],
    type: "professional",
    logo: "/logos/flowtraders.jpeg",
  },
  {
    role: "engineer",
    company: "Mercor · Contract",
    duration: "Apr 2026 - Jun 2026 · 3 mos",
    location: "Toronto, Ontario, Canada · Remote",
    description: "image gen ai",
    responsibilities: [],
    skills: [],
    type: "professional",
    logo: "/logos/mercor.png",
  },
  {
    role: "cpo & engineer",
    company: "Skinapse Labs · Part-time",
    duration: "Apr 2024 - Present · 2 yrs 3 mos",
    location: "Boston, Massachusetts, United States · Hybrid",
    description: "ai dermatologist",
    responsibilities: [],
    skills: [],
    type: "professional",
    logo: "/logos/skinapse.jpg",
  },
  {
    role: "engineer",
    company: "Cortex Ventures · Contract",
    duration: "Jan 2026 - Apr 2026 · 4 mos",
    location: "Cambridge, Massachusetts, United States · Hybrid",
    description: "intelligent knowledgebase",
    responsibilities: [],
    skills: [],
    type: "professional",
    logo: "/logos/cortexx.jpeg",
  },
  {
    role: "analyst & engineer",
    company: "State Street · Internship",
    duration: "Jul 2025 - Dec 2025 · 6 mos",
    location: "Boston, Massachusetts, United States · Hybrid",
    description: "crm + ai apps",
    responsibilities: [],
    skills: [],
    type: "professional",
    logo: "/logos/ssc.png",
  },
  {
    role: "analyst",
    company: "Apple · Contract",
    duration: "Apr 2025 - Jun 2025 · 3 mos",
    location: "Cambridge, Massachusetts, United States · Remote",
    description: "consumer audio marketing analytics",
    responsibilities: [],
    skills: [],
    type: "professional",
    logo: "/logos/applelogo.jpeg",
  },
  // ── Research ──────────────────────────────────────────────────
  {
    role: "researcher",
    company: "Northeastern University · Part-time",
    duration: "Oct 2025 - Present · 9 mos",
    location: "Boston, Massachusetts, United States · Hybrid",
    description: "intelligent manufacturing",
    responsibilities: [],
    skills: [],
    type: "research",
    logo: "/logos/neu.jpg",
  },
  {
    role: "research assistant",
    company: "Massachusetts Institute of Technology · Part-time",
    duration: "Jun 2025 - Aug 2025 · 3 mos",
    location: "Cambridge, Massachusetts, United States · Hybrid",
    description: "gnn in blockchain",
    responsibilities: [],
    skills: [],
    type: "research",
    logo: "/logos/MIT.jpeg",
  },
];
