export interface Experience {
  role: string;
  company: string;
  duration: string;
  location: string;
  responsibilities: string[];
  skills: string[];
  type: "professional" | "research" | "other";
}

export const experiences: Experience[] = [
  {
    role: "ML Researcher (Contract)",
    company: "Healthcare AI Solutions",
    duration: "May 2025 - Present",
    location: "Vancouver, BC",
    responsibilities: [
      "Developing predictive models for early detection of chronic diseases using multi-modal patient data.",
      "Optimizing deep learning architectures for clinical decision support systems.",
      "Collaborating with medical professionals to validate model outputs and ensure clinical relevance."
    ],
    skills: ["Python", "PyTorch", "Medical Imaging", "Clinical Data"],
    type: "professional"
  },
  {
    role: "Research Assistant",
    company: "Bioinformatics Lab, UBC",
    duration: "Jan 2024 - Apr 2025",
    location: "Vancouver, BC",
    responsibilities: [
      "Implemented genomic analysis pipelines using R and Python for large-scale sequencing datasets.",
      "Automated data preprocessing steps, reducing processing time by 40%.",
      "Contributed to research papers on gene expression patterns in rare diseases."
    ],
    skills: ["R", "Python", "Genomics", "Nextflow"],
    type: "research"
  }
];
