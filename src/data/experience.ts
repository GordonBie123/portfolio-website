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
    role: "Incoming Data Science Intern / Co-op",
    company: "Johnson & Johnson",
    duration: "Jan 2026 - May 2026",
    location: "Cambridge, MA",
    responsibilities: [
      "Selected for co-op program on the innovative medicine team, will apply AI & deep learning to drug development"
    ],
    skills: ["TBD"],
    type: "professional",
    logo: "/logos/j&j.jpg" 
  },
  {
    role: "AI Engineer Intern / Co-op",
    company: "State Street Corporation",
    duration: "Oct 2025 - Dec 2025",
    location: "Boston, MA",
    responsibilities: [
      "Shipped an AI audit-report generation app using LLMs that transforms transaction data and document notes into GAAP-compliant reports, reducing preparation time by 95%."
    ],
    skills: ["Python", "FastAPI", "MLFlow", "LLM Integration", "Base64"],
    type: "professional",
    logo: "/logos/ssc.png" 
  },
  {
    role: "Data Analytics Intern / Co-op",
    company: "State Street Investment Management",
    duration: "Jul 2025 - Sep 2025",
    location: "Boston, MA",
    responsibilities: [
      "Analyzed satisfaction survey data from clients creating executive dashboards and presentations that informed product enhancements and helped retain $10M+ in revenue."
    ],
    skills: ["Salesforce", "Qualtrics", "PowerBI", "Powerpoint","Excel"],
    type: "professional",
    logo: "/logos/ssim.jpg" 
  },
  {
    role: "Technical Product Manager",
    company: "Cutis Intelligence",
    duration: "Nov 2025 - Present",
    location: "Boston, MA",
    responsibilities: [
      "Leading team of engineers to develop CV powered skin analysis software to prescribe acne medications.",
    ],
    skills: ["OpenCV", "Python", "Docker", "FastAPI", "SQL", "PostgreSQL", "pgvector", "PyTorch", "LLM Integration", "Streamlit", "Slack"],
    type: "professional",
    logo: "/logos/cutis.jpg"
  },
  {
    role: "Technical Lead",
    company: "Generate Product Studio",
    duration: "Aug 2025 - Present",
    location: "Boston, MA",
    responsibilities: [
      "Leading team of engineers to deliver data products for our clients.",
      "Current Project: Axiris, AI Powered portable autorefractor with the JHU Eye Institute.",
      "Previous Project: Unsprawl, AI B2B SaaS Workflow Optimization Startup."
    ],
    skills: ["OpenCV", "Python", "Docker", "FastAPI", "SQL", "PostgreSQL", "pgvector", "SBERT", "LLM Integration", "Streamlit", "Alembic", "Digital Ocean"],
    type: "professional",
    logo: "/logos/generate.jpg"
  },

  {
    role: "Data Annotator",
    company: "Handshake AI",
    duration: "Jun 2025 - Present",
    location: "Remote",
    responsibilities: [
      "Freelance labelling image and video data for ethical generative AI model training and validation"
    ],
    skills: ["Labelbox", "CVAT"],
    type: "professional",
    logo: "/logos/handshake.jpg"
  },
  {
    role: "Student Researcher",
    company: "Northeastern University College of Engineering",
    duration: "Oct 2025 - Present",
    location: "Boston, MA",
    responsibilities: [
      "Developing self-supervised transformers for predictive maintenance on 500K+ sensor rows using PyTorch, collaborating with Seagate Technologies and PhD researchers to co-author a peer-reviewed paper."
    ],
    skills: ["PyTorch"],
    type: "research",
    logo: "/logos/neu.jpg"
  },
  {
    role: "Peer Tutor",
    company: "Northeastern University",
    duration: "Jan 2024 - May 2025",
    location: "Boston, MA",
    responsibilities: [
      "Led weekly study groups for Python programming, linear algebra, and machine learning courses."
    ],
    skills: ["Python", "pandas", "numpy", "scipy","scikit-learn", "matplotlib", "seaborn", "statsmodels", "autograd"],
    type: "professional",
    logo: "/logos/neu.jpg"
  }
];
