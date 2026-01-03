export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: ["Python", "R", "SQL", "TypeScript", "JavaScript", "HTML", "CSS"]
  },
  {
    title: "Frameworks & Libraries",
    skills: ["FastAPI", "Streamlit", "React", "Next.js", "Flask", "Node.js", "Django", "Matplotlib", "Seaborn", "Plotly", "dplyr", "ggplot2", "tidyr2", "readr", "BeautifulSoup"]
  },
  {
    title: "Tools & Technologies",
    skills: ["Git", "Docker", "AWS", "Google Cloud", "PostgreSQL", "MongoDB", "Supabase", "DigitalOcean", "MLFlow", "Keras", "CUDA", "Android Studio", "Vercel"]
  },
  {
    title: "Data Science & ML",
    skills: ["Scikit-learn", "PyTorch", "TensorFlow", "Scipy", "Autograd", "Jax", "Pandas", "NumPy", "HuggingFace"]
  },
  {
    title: "Beyond the Code",
    skills: ["Tableau", "PowerBI", "Excel", "Salesforce", "Qualtrics", "PowerPoint", "Canva", "Power Query", "Figma"]
  }
];
