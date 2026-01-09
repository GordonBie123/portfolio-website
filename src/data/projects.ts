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
    id: "sp500",
    title: "SP500 Stock Price Predictor",
    description: "Built a system that uses and compares multiple machine learning models to predict SP500 stock prices.",
    image: "/images/projects/sp500s.jpg",
    githubUrl: "https://github.com/GordonBie123/sp500_predictor_v2",
    techStack: ["Python", "TensorFlow", "Keras", "Sci-kit Learn","Pandas", "NumPy", "Plotly", "Streamlit"],
    category: "ML",
    featured: true
  },
  {
    id: "relaylist",
    title: "Relaylist",
    description: "Built a web app that analyzes conversation sentiment to generate emotion-based Spotify playlists.",
    image: "/images/projects/relaylist4.jpg",
    githubUrl: "https://github.com/GordonBie123/relaylist",
    techStack: ["Python", "Streamlit", "Plotly", "Spotify API", "NLTK", "VADER", "SQLite"],
    category: "ML"
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description: "A modern and simple portfolio website made with Next.js and Tailwind CSS. Wnated to learn frontend and web development.",
    image: "/images/projects/portfolio1.jpg",
    githubUrl: "https://github.com/GordonBie123/portfolio-website",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Web Dev",
    featured: true
  }
];
