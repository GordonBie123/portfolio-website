import { LucideIcon, Bot, Store, Users, Workflow } from "lucide-react";

export interface ResearchTopic {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const researchTopics: ResearchTopic[] = [
  {
    title: "Operations Decisions",
    description: "Causal ML for product rollouts with spillovers, delayed feedback, and fair customer service design.",
    icon: Workflow
  },
  {
    title: "Dynamic Marketplaces",
    description: "Matching and pricing on platforms when participants value jobs differently and act strategically.",
    icon: Store
  },
  {
    title: "Collective Intelligence",
    description: "When human-AI collaboration beats delegation, and whether mediation helps teams decide better.",
    icon: Users
  },
  {
    title: "Agentic AI & Human Capital",
    description: "Whether AI gains require workflow redesign, and how they reshape worker skills and roles.",
    icon: Bot
  }
];

export const researchOverview = "I'm interested in how ML and AI change the way people and organizations make decisions: <strong>operations decisions</strong>, <strong>dynamic marketplaces</strong>, <strong>collective intelligence</strong>, and <strong>agentic AI & human capital</strong>. Right now that means time-series tokenization for manufacturing machinery and spatial modeling for acne lesion classification. <strong>Ultimate goal?</strong> Making the world a little better, one project at a time.";

export const researchCTA = {
  title: "Currently building my research portfolio",
  description: "Interested in collaborating on any AI/ML projects? I'm always looking for new research opportunities and partnerships."
};