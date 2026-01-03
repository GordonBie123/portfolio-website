import { Experience } from "./experience";

export type SideQuest = Omit<Experience, 'type'> & { type?: "professional" | "research" | "other" };

export const sideQuests: Experience[] = [
  {
    role: "Hackathon Organizer",
    company: "HackNU",
    duration: "Oct 2024",
    location: "Boston, MA",
    responsibilities: [
      "Coordinated logistics for a 500+ participant student hackathon.",
      "Managed sponsor relations and technical workshops during the 24-hour event."
    ],
    skills: ["Leadership", "Event Planning", "Public Speaking"],
    type: "professional", // Dummy type for compatibility
    logo: "https://logo.clearbit.com/northeastern.edu"
  },
  {
    role: "Open Source Contributor",
    company: "ML Community",
    duration: "Jun 2024 - Present",
    location: "Remote",
    responsibilities: [
      "Contributing bug fixes and feature enhancements to popular machine learning libraries.",
      "Engaging in code reviews and documentation improvements."
    ],
    skills: ["Git", "Python", "OSS Compliance"],
    type: "professional"
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
    role: "CRM & Sales Intern",
    company: "Indigo Education",
    duration: "May 2024 - Aug 2024",
    location: "Vancouver, BC",
    responsibilities: [
      "Assisted in the management of customer relationships and closing deals with prospective clients."
    ],
    skills: ["Sales Pitching", "Customer Service", "CRM Management"],
    type: "professional",
    logo: "/logos/IndigoeducationLogo.jpg"
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
  }
];
