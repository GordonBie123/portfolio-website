export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  techStack: string[];
  featured?: boolean;
  category: "ML" | "Data Science" | "Web Dev" | "Bioinformatics";
}

export const projects: Project[] = [
  {
    id: "AI Voice Journaling Mobile App",
    title: "AI Voice Journaling Mobile App",
    description: "Built a machine learning model to predict patient readmission rates using clinical data with XGBoost and Scikit-learn.",
    image: "/images/projects/healthcare.jpg",
    githubUrl: "https://github.com",
    techStack: ["Python", "XGBoost", "Scikit-learn", "Pandas"],
    category: "ML",
    featured: true
  },
  {
    id: "Relaylist",
    title: "Relaylist",
    description: "Distributed genomic sequence analysis tool using Nextflow and Python for large-scale bioinformatics research.",
    image: "/images/projects/bioinfo.jpg",
    githubUrl: "https://github.com",
    techStack: ["Python", "Nextflow", "Docker", "R"],
    category: "Bioinformatics"
  },
  {
    id: "SP500 Stock Price Predictor",
    title: "SP500 Stock Price Predictor",
    description: "Segmenting MRI brain tumors using U-Net architecture implemented in PyTorch.",
    image: "/images/projects/imaging.jpg",
    githubUrl: "https://github.com",
    techStack: ["PyTorch", "OpenCV", "Matplotlib"],
    category: "ML"
  }
];
