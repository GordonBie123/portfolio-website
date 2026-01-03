import { LucideIcon, Dna, Hospital, Pill, Activity, Microscope, BrainCircuit } from "lucide-react";

export interface ResearchTopic {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const researchTopics: ResearchTopic[] = [
  {
    title: "Healthcare AI",
    description: "Developing intelligent systems to support clinical decisions and improve patient outcomes in hospital settings.",
    icon: Hospital
  },
  {
    title: "Bioinformatics",
    description: "Analyzing large-scale biological datasets to uncover genetic patterns and disease mechanisms.",
    icon: Dna
  },
  {
    title: "Clinical Decision Support",
    description: "Building predictive models that assist healthcare professionals in early diagnosis and personalized treatment.",
    icon: Activity
  },
  {
    title: "Medical Imaging",
    description: "Using deep learning to enhance medical image analysis for faster and more accurate diagnostics.",
    icon: BrainCircuit
  },
  {
    title: "Drug Discovery",
    description: "Leveraging machine learning to accelerate the search for novel therapeutic compounds.",
    icon: Pill
  },
  {
    title: "Genomic Analysis",
    description: "Exploring variations in human genomes to predict susceptibility to rare and common diseases.",
    icon: Microscope
  }
];

export const researchOverview = "My research focuses on the intersection of deep learning and biological sciences. I am driven by the potential of AI to transform healthcare from a reactive system to a proactive and personalized one. By developing robust models for genomic analysis and clinical predictions, I aim to bridge the gap between computational innovation and real-world medical impact.";
