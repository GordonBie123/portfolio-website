import { Metadata } from "next";
import { FileText, Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";
import { Heading } from "@/components/ui/Heading";
import { cvPdf } from "@/data/cv";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "contact | gordon bie" };

const channels = [
  { label: "email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "linkedin", value: "in/gordon-bie", href: profile.links.linkedin, icon: Linkedin },
  { label: "github", value: "GordonBie123", href: profile.links.github, icon: Github },
  { label: "cv", value: "pdf", href: cvPdf, icon: FileText },
];

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-[920px] flex-col gap-10">
      <div className="flex flex-col gap-3">
        <Heading icon={MessageSquare} as="h1">
          contact
        </Heading>
        <p className="max-w-[60ch] text-sm leading-relaxed text-sub">{profile.contactDescription.toLowerCase()}</p>
      </div>

      {/* Big monkeytype-style buttons: invert on hover */}
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {channels.map(({ label, value, href, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-lg bg-sub-alt px-5 py-4 transition-colors duration-150 hover:bg-text"
            >
              <Icon size={20} className="text-sub transition-colors duration-150 group-hover:text-bg" aria-hidden />
              <span className="flex flex-col">
                <span className="text-sm text-text transition-colors duration-150 group-hover:text-bg">{label}</span>
                <span className="text-xs text-sub transition-colors duration-150 group-hover:text-bg/70">{value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <section className="flex flex-col gap-5">
        <Heading icon={Mail}>send a message</Heading>
        <ContactForm />
      </section>
    </div>
  );
}
