import { LucideIcon, Hospital, Factory, MessageSquare, Pill } from "lucide-react";

export interface ResearchTopic {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const researchTopics: ResearchTopic[] = [
  {
    title: "Healthcare AI & Decision Support",
    description: "Developing intelligent systems and predictive models to support clinical decisions and improve patient outcomes.",
    icon: Hospital
  },
  {
    title: "Industrial Engineering",
    description: "Applying AI to optimize manufacturing processes, supply chains, and operational efficiency.",
    icon: Factory
  },
  {
    title: "Medicine Development",
    description: "Leveraging machine learning to accelerate drug discovery and the development of novel therapeutics.",
    icon: Pill
  },
  {
    title: "Linguistics & Emotion",
    description: "Exploring Natural Language Processing to better understand human communication and emotional processing.",
    icon: MessageSquare
  }
];

export const researchOverview = "I'm early in my research journey, but hooked on how AI can transform different fields—from healthcare to manufacturing to business. I love exploring where deep learning and NLP can make a real impact. <strong>Ultimate goal?</strong> Making the world a little better, one project at a time.";

export const researchCTA = {
  title: "Currently building my research portfolio",
  description: "Interested in collaborating on any AI/ML projects? I'm always looking for new research opportunities and partnerships."
};