import { Metadata } from "next";
import { Code, Github } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "work | gordon bie" };

export default function WorkPage() {
  return (
    <div className="mx-auto flex max-w-[1000px] flex-col gap-8">
      <Heading icon={Code} as="h1">
        work
      </Heading>

      <ul className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <li key={p.id} className="flex flex-col rounded-lg bg-sub-alt p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-sub">{p.category.toLowerCase()}</p>
                <h2 className="mt-1 text-lg leading-snug text-text">{p.title.toLowerCase()}</h2>
              </div>
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title} on GitHub`}
                className="-m-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-sub transition-colors duration-150 hover:text-text"
              >
                <Github size={18} aria-hidden />
              </a>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-sub">{p.description}</p>
            <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 pt-1 text-xs text-main">
              {p.techStack.map((t) => (
                <li key={t}>{t.toLowerCase()}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
