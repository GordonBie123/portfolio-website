import { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Info, Link2, Wrench } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { profile } from "@/data/profile";
import { skillCategories } from "@/data/skills";

export const metadata: Metadata = { title: "about | gordon bie" };

const facts = [
  { label: "major", value: "business analytics + international business" },
  { label: "minor", value: "data science" },
  { label: "school", value: "northeastern '27" },
  { label: "now", value: "swe intern @ flow traders" },
];

const links = [
  { label: "linkedin", href: profile.links.linkedin },
  { label: "github", href: profile.links.github },
  { label: "spotify", href: profile.links.spotify },
  { label: "email", href: `mailto:${profile.email}` },
];

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-[920px] flex-col gap-14">
      {/* Profile card, like monkeytype's account page */}
      <section className="grid gap-6 rounded-lg bg-sub-alt p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 sm:p-8">
        <div className="flex items-center gap-5">
          <Image
            src={profile.headshot}
            alt="Hand-drawn avatar of Gordon Bie"
            width={88}
            height={88}
            className="h-[88px] w-[88px] rounded-full bg-white object-cover object-top"
          />
          <div>
            <h1 className="text-3xl text-text">gordon bie</h1>
            <p className="mt-1 text-sm text-sub">boston → new york</p>
          </div>
        </div>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          {facts.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-xs text-sub">{label}</dt>
              <dd className="text-sm text-text">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="flex flex-col gap-5">
        <Heading icon={Info}>about</Heading>
        <div className="flex max-w-[70ch] flex-col gap-4 text-[15px] leading-relaxed text-sub">
          {profile.aboutBio.map((p, i) => (
            <p key={i} className="[&>strong]:font-normal [&>strong]:text-text" dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>
      </section>

      {/* Skills, laid out like monkeytype settings rows */}
      <section className="flex flex-col gap-5">
        <Heading icon={Wrench}>skills</Heading>
        <div className="flex flex-col gap-6">
          {skillCategories.map((c) => (
            <div key={c.title} className="grid gap-3 sm:grid-cols-[220px_1fr] sm:gap-8">
              <p className="text-sm text-text">{c.title.toLowerCase()}</p>
              <ul className="flex flex-wrap gap-2">
                {c.skills.map((s) => (
                  <li key={s} className="rounded-md bg-sub-alt px-3 py-1.5 text-xs text-text">
                    {s.toLowerCase()}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <Heading icon={Link2}>find me</Heading>
        <div className="flex flex-wrap gap-2">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md bg-sub-alt px-4 py-2.5 text-sm text-text transition-colors duration-150 hover:bg-text hover:text-bg"
            >
              {label}
              <ArrowUpRight size={14} aria-hidden />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
