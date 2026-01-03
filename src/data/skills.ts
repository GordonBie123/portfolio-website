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
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "React", "Next.js", "Flask"]
  },
  {
    title: "Tools & Technologies",
    skills: ["Git", "Docker", "AWS", "Google Cloud", "PostgreSQL", "MongoDB", "Supabase", "DigitalOcean"]
  },
  {
    title: "Data Science & ML",
    skills: ["Scikit-learn", "PyTorch", "TensorFlow", "Scipy", "Autograd", "Jax"]
  },
  {
    title: "Beyond the Code",
    skills: ["Project Management", "Technical Writing", "Science Communication", "Mentorship"]
  }
];
