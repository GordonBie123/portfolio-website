export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming & Query Languages",
    skills: ["Python", "R", "SQL", "JavaScript", "TypeScript", "CSS/HTML", "Racket", "Cypher"]
  },
  {
    title: "Frameworks & Libraries",
    skills: ["Sklearn", "TensorFlow", "PyTorch", "Jax", "SciPy", "NumPy", "Pandas", "Seaborn", "FastAPI", "React", "Node.js"]
  },
  {
    title: "Tools",
    skills: ["Git", "Linux", "PowerShell", "Claude Code", "Ansible", "AWX", "Docker", "Kubernetes", "ArgoCD", "Airflow", "Prometheus", "Grafana"]
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL/pgvector", "SQLite", "MongoDB", "Neo4j", "Kuzu", "AWS S3", "OracleSQL 12"]
  },
  {
    title: "Natural Languages",
    skills: ["English (Native)", "Mandarin (Native)", "Spanish (Professional)", "French (Intermediate)", "Japanese (Intermediate)"]
  }
];
