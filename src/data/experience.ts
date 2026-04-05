export interface Experience {
  role: string;
  company: string;
  duration: string;
  location: string;
  responsibilities: string[];
  skills: string[];
  type: "professional" | "research";
  logo?: string;
}

export const experiences: Experience[] = [
  {
    role: "Incoming Engineer",
    company: "Flow Traders · Internship",
    duration: "Feb 2026 - Present · 3 mos",
    location: "New York, New York, United States · On-site",
    responsibilities: [],
    skills: [],
    type: "professional",
    logo: "/logos/flowtraders.jpeg"
  },
  {
    role: "Researcher",
    company: "Northeastern University · Part-time",
    duration: "Oct 2025 - Present · 7 mos",
    location: "Boston, Massachusetts, United States · Hybrid",
    responsibilities: [],
    skills: [],
    type: "research",
    logo: "/logos/neu.jpg"
  },
    {
    role: "Engineer",
    company: "Skinapse Labs · Part-time",
    duration: "Apr 2024 - Present · 25 mos",
    location: "Boston, Massachusetts, United States · Hybrid",
    responsibilities: [],
    skills: [],
    type: "professional",
    logo: "/logos/skinapse.jpg"
  },
  {
    role: "Engineer",
    company: "Cortex Ventures · Contract",
    duration: "Jan 2026 - Apr 2026 · 4 mos",
    location: "Cambridge, Massachusetts, United States · Hybrid",
    responsibilities: [],
    skills: [],
    type: "professional",
    logo: "/logos/cortexx.jpeg"
  },
  {
    role: "Engineer",
    company: "State Street · Apprenticeship",
    duration: "Oct 2025 - Dec 2025 · 3 mos",
    location: "Boston, Massachusetts, United States · Hybrid",
    responsibilities: [],
    skills: [],
    type: "professional",
    logo: "/logos/ssc.png"
  },
  {
    role: "Analyst",
    company: "State Street Investment Management · Internship",
    duration: "Jul 2025 - Sep 2025 · 3 mos",
    location: "Boston, Massachusetts, United States · Hybrid",
    responsibilities: [],
    skills: [],
    type: "professional",
    logo: "/logos/ssim.jpg"
  },
  {
    role: "Research Assistant",
    company: "Massachusetts Institute of Technology · Part-time",
    duration: "Jun 2025 - Aug 2025 · 3 mos",
    location: "Cambridge, Massachusetts, United States · Hybrid",
    responsibilities: [],
    skills: [],
    type: "research",
    logo: "/logos/MIT.jpeg"
  },
  {
    role: "Analyst",
    company: "Apple · Contract",
    duration: "Apr 2025 - Jul 2025 · 4 mos",
    location: "Cambridge, Massachusetts, United States · Remote",
    responsibilities: [],
    skills: [],
    type: "professional",
    logo: "/logos/applelogo.jpeg"
  }
];
