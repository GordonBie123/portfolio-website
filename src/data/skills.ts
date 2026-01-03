export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: ["Python", "R", "SQL", "TypeScript", "JavaScript", "C++"]
  },
  {
    title: "Frameworks & Libraries",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "React", "Next.js", "Flask"]
  },
  {
    title: "Tools & Technologies",
    skills: ["Git", "Docker", "AWS", "Google Cloud", "PostgreSQL", "MongoDB"]
  },
  {
    title: "Data Science & ML",
    skills: ["Deep Learning", "NLP", "Computer Vision", "Statistical Modeling", "Feature Engineering"]
  },
  {
    title: "Beyond the Code",
    skills: ["Project Management", "Technical Writing", "Science Communication", "Mentorship"]
  }
];
