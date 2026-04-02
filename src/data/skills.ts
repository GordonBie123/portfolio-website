export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming & Query Languages",
    skills: ["Python", "C++", "R", "SQL", "JavaScript", "TypeScript", "CSS/HTML", "Cypher"]
  },
  {
    title: "Frameworks & Libraries",
    skills: ["Sklearn", "TensorFlow", "PyTorch", "Jax", "NumPy", "Pandas", "Seaborn", "FastAPI", "React.js", "Node.js"]
  },
  {
    title: "Tools",
    skills: ["Git", "Docker", "Kubernetes", "Android Studio", "Expo", "MLFlow", "Keras", "Tableau", "PowerPoint", "Excel", "PowerShell", "Linux"]
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL/pgvector", "SQLite", "MongoDB", "Neo4j", "Kuzu", "AWS S3", "OracleSQL 12"]
  },
  {
    title: "Natural Languages",
    skills: ["English (Native)", "Mandarin (Native)", "Spanish (Professional)", "Japanese (Elementary)", "French (Elementary)"]
  }
];
