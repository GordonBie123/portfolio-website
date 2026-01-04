import { Experience } from "./experience";

export type SideQuest = Omit<Experience, 'type'> & { type?: "professional" | "research" | "other" };

export const sideQuests: Experience[] = [
  {
    role: "Business Owner",
    company: "eBay",
    duration: "Jul 2024",
    location: "Remote",
    responsibilities: [
      "Curating and selling vintage watches and watch parts on eBay, 20K MRR",
    ],
    skills: ["SEO", "Choosing Cool Items"],
    type: "professional",
    logo: "/logos/ebay.jpg"
  },
  {
    role: "English Writing Tutor",
    company: "Indigo Education",
    duration: "Jun 2023 - Present",
    location: "Remote",
    responsibilities: [
      "Helping high school students improve their writing and express themselves better in my free time",
    ],
    skills: ["English"],
    type: "professional",
    logo: "/logos/IndigoeducationLogo.jpg"
  },
  {
    role: "Marketing Associate",
    company: "Disrupt Fintech Society",
    duration: "Jan 2024 - Present",
    location: "Boston, MA",
    responsibilities: [
      "Designing social media marketing material for events and campaigns."
    ],
    skills: ["Canva", "PowerPoint", "LinkedIn", "Instagram", "Tiktok"],
    type: "professional",
    logo: "/logos/disruptlogo.jpg"
  },
  {
    role: "Program Ambassador",
    company: "Northeastern University",
    duration: "Jan 2024 - Jul 2025",
    location: "Boston, MA",
    responsibilities: [
      "Created social media marketing content and spoke at information session events for 90,000 prospective students"
    ],
    skills: ["Instagram", "TikTok", "Public Speaking", "Canva"],
    type: "professional",
    logo: "/logos/neu.jpg"
  },
  {
    role: "Strategy Consultant",
    company: "Global Research and Consulting Group",
    duration: "Jan 2024 - May 2025",
    location: "Boston, MA",
    responsibilities: [
      "Researched market trends to inform business decisions for 501(c)(3) non-profits and presented insights with pretty slides."
    ],
    skills: ["PowerPoint", "Excel", "RocketReach"],
    type: "professional",
    logo: "/logos/grc.jpg"
  },
  {
    role: "CRM & Sales Intern",
    company: "Indigo Education",
    duration: "May 2024 - Aug 2024",
    location: "Vancouver, BC",
    responsibilities: [
      "Assisted in the management of customer relationships and closing deals with prospective clients."
    ],
    skills: ["Sales Pitching", "CRM Management"],
    type: "professional",
    logo: "/logos/IndigoeducationLogo.jpg"
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
