import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Download, FileText, GraduationCap, Lightbulb, Presentation } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { cvPdf, education, honors, posters, researchInterests } from "@/data/cv";

export const metadata: Metadata = { title: "cv | gordon bie" };

export default function CVPage() {
  return (
    <div className="mx-auto flex max-w-[920px] flex-col gap-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Heading icon={FileText} as="h1">
          cv
        </Heading>
        <div className="flex flex-wrap gap-2">
          <a
            href={cvPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md bg-sub-alt px-4 py-2.5 text-sm text-text transition-colors duration-150 hover:bg-text hover:text-bg"
          >
            <Download size={14} aria-hidden />
            download pdf
          </a>
          <Link
            href="/experience"
            className="flex items-center gap-2 rounded-md px-4 py-2.5 text-sm text-sub transition-colors duration-150 hover:text-text"
          >
            experience
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </div>

      <section className="flex flex-col gap-5">
        <Heading icon={Lightbulb}>research interests</Heading>
        <ul className="flex flex-col gap-4">
          {researchInterests.map((r) => (
            <li key={r.title} className="grid gap-1 sm:grid-cols-[240px_1fr] sm:gap-8">
              <p className="text-sm text-text">{r.title}</p>
              <p className="text-sm leading-relaxed text-sub">{r.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-5">
        <Heading icon={GraduationCap}>education</Heading>
        <ul className="flex flex-col gap-3">
          {education.map((e) => (
            <li key={e.school} className="rounded-lg bg-sub-alt p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-[15px] text-text">{e.school.toLowerCase()}</p>
                <p className="text-sm text-sub tabular-nums">{e.years}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-sub">{e.detail}</p>
              {e.note && <p className="mt-2 text-sm text-main">{e.note}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-5">
        <Heading icon={Presentation}>poster presentations</Heading>
        <ol className="flex flex-col gap-5">
          {posters.map((p) => (
            <li key={p.title} className="grid grid-cols-[3.5rem_1fr] gap-4">
              <p className="text-sm text-sub tabular-nums">{p.year}</p>
              <div>
                <p className="text-[15px] leading-snug text-text">{p.title.toLowerCase()}</p>
                <p className="mt-1 text-xs leading-relaxed text-sub">{p.authors}</p>
                <p className="mt-1 text-xs text-sub">
                  {p.venue.toLowerCase()} · <span className={p.status === "presented" ? "text-main" : undefined}>{p.status}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-5">
        <Heading icon={Award}>honors &amp; scholarships</Heading>
        <ul>
          {honors.map((h, i) => (
            <li
              key={h.name}
              className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-lg px-4 py-3 ${i % 2 === 0 ? "bg-sub-alt" : ""}`}
            >
              <span className="text-sm text-text">
                {h.name.toLowerCase()}
                {h.from && <span className="text-sub"> · {h.from.toLowerCase()}</span>}
              </span>
              <span className="text-sm text-sub tabular-nums">{h.years}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
