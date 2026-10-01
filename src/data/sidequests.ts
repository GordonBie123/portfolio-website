import { Experience } from "./experience";

export type SideQuest = Omit<Experience, 'type'> & { type?: "professional" | "research" | "other" };

export const sideQuestsContent = {
  subtitle: "Random creative projects and other things I like to do!"
};

export const sideQuests: Experience[] = [
  {
    role: "Matcha Enjoyer",
    company: "Matcha",
    duration: "Jan 2005 - Present",
    location: "Worldwide",
    responsibilities: [
      "Have been enjoying matcha since birth.",
      "Let's connect and have matcha!"
    ],
    skills: ["Whisking", "Spending Money", "Tasting"],
    type: "professional",
    logo: "/logos/matcha.jpg"
  },
  {
    role: "Fabric Enjoyer",
    company: "Fashion",
    duration: "Jan 2005 - Present",
    location: "Worldwide",
    responsibilities: [
      "I like cool clothes and accessories and all the stories about the people and history behind every piece.",
    ],
    skills: ["Financial Irresponsibility"],
    type: "professional",
    logo: "/logos/fabric.png"
  },
  {
    role: "Business Owner",
    company: "eBay",
    duration: "Jul 2024 - Present",
    location: "Remote",
    responsibilities: [
      "Curating and selling vintage watches and watch parts on eBay, 20K MRR",
    ],
    skills: ["SEO", "Choosing Cool Items"],
    type: "professional",
    logo: "/logos/ebay.jpg"
  },
  {
    role: "Marketing Coordinator",
    company: "Disrupt Fintech Society",
    duration: "2024 - 2025",
    location: "Boston, MA",
    responsibilities: [
      "Planned, marketed and ran events for the fintech society, like hackathons, panels and research talks."
    ],
    skills: ["Canva", "PowerPoint", "LinkedIn", "Instagram", "Tiktok"],
    type: "professional",
    logo: "/logos/disruptlogo.jpg"
  },
  {
    role: "Data Science Technical Lead",
    company: "Generate Product Development Studio",
    duration: "2025 - 2026",
    location: "Boston, MA",
    responsibilities: [
      "Technical lead at a student-led product studio building ML and AI software products for startups."
    ],
    skills: [],
    type: "professional",
    logo: "/logos/generate.jpg"
  },
  {
    role: "BSIB Student Mentor",
    company: "D'Amore McKim School of Business",
    duration: "2026 - Present",
    location: "Boston, MA",
    responsibilities: [
      "Mentoring undergraduates in Northeastern's BSIB program on course planning, careers and studying abroad."
    ],
    skills: [],
    type: "professional",
    logo: "/logos/neu.jpg"
  },
  {
    role: "ARAM Enjoyer",
    company: "League of Legends",
    duration: "March 2022 - Present",
    location: "Remote",
    responsibilities: [
      "Playing every now and then to stay in touch with friends, used to be top 1% player, played competitive at university for a bit.",
    ],
    skills: ["Freezing Waves", "Ganking Mid", "Sidestepping", "Landing Skillshots"],
    type: "professional",
    logo: "/logos/league.jpg"
  },
  {
    role: "Puzzle Enjoying Amateur",
    company: "Chess",
    duration: "March 2022 - Present",
    location: "Remote",
    responsibilities: [
      "Not very good, playing for fun & puzzles daily, playing at Harvard Square during summer, 1700 Puzzle, 1500 Rapid, 1100 Blitz",
    ],
    skills: ["Brilliant Moves", "Sacrificing Rooks", "Zugzwang"],
    type: "professional",
    logo: "/logos/chess.png"
  },
  {
    role: "Global Program Alumni Ambassador",
    company: "Northeastern University · Office of Global Experience",
    duration: "2024 - 2025",
    location: "Boston, MA",
    responsibilities: [
      "Planned and presented on Northeastern's global experience programs for prospective and incoming students."
    ],
    skills: ["Instagram", "TikTok", "Public Speaking", "Canva"],
    type: "professional",
    logo: "/logos/neu.jpg"
  },
  {
    role: "Junior Associate Consultant",
    company: "Global Research & Consulting Group",
    duration: "2024 - 2025",
    location: "Boston, MA",
    responsibilities: [
      "Delivered strategic analysis and operational recommendations to international organizations and public-sector clients."
    ],
    skills: ["PowerPoint", "Excel", "RocketReach"],
    type: "professional",
    logo: "/logos/grc.jpg"
  },
  {
    role: "Bartender + Waiter",
    company: "Noodle and Beer Ltd.",
    duration: "Oct 2023 - Apr 2024",
    location: "London, UK",
    responsibilities: [
      "Served a lot of pints, made cool cocktails, and served a lot of noodles to customers, very busy and stressful. Amazing restaurant."
    ],
    skills: ["Bartending", "Upselling", "Customer Service"],
    type: "professional",
    logo: "/logos/nnbl.jpg"
  },
  {
    role: "Pastry Chef",
    company: "Swan Bakery",
    duration: "Sep 2023 - Apr 2024",
    location: "London, UK",
    responsibilities: [
      "Made a lot of pastries, cakes, tarts, and more. Very fun, also learned that professional baking was not all sunshine and rainbows"
    ],
    skills: ["Baking", "Dish Washing"],
    type: "professional",
    logo: "/logos/swan.jpg"
  }
];
