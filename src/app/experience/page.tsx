import { Metadata } from "next";
import { BriefcaseBusiness } from "lucide-react";
import { ExperienceBoard, type Board } from "@/components/experience/ExperienceBoard";
import { Heading } from "@/components/ui/Heading";
import { experiences, type Experience } from "@/data/experience";
import { sideQuests } from "@/data/sidequests";

export const metadata: Metadata = { title: "experience | gordon bie" };

const toRow = (e: Experience) => ({
  role: e.role.toLowerCase(),
  company: e.company,
  line: e.description ?? e.responsibilities[0],
  duration: e.duration,
  location: e.location,
  logo: e.logo,
});

const boards: Board[] = [
  { id: "work", label: "work", rows: experiences.filter((e) => e.type === "professional").map(toRow) },
  { id: "research", label: "research", rows: experiences.filter((e) => e.type === "research").map(toRow) },
  { id: "tutoring", label: "tutoring", rows: experiences.filter((e) => e.type === "teaching").map(toRow) },
  { id: "side-quests", label: "side quests", rows: sideQuests.map(toRow) },
];

export default function ExperiencePage() {
  return (
    <div className="mx-auto flex max-w-[1000px] flex-col gap-8">
      <Heading icon={BriefcaseBusiness} as="h1">
        experience
      </Heading>
      <ExperienceBoard boards={boards} />
    </div>
  );
}
