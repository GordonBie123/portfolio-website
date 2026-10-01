import { FileText, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { LifeCounter } from "@/components/ui/LifeCounter";
import { profile } from "@/data/profile";

const links = [
  { label: "email", href: `mailto:${profile.email}`, icon: Mail },
  { label: "github", href: profile.links.github, icon: Github },
  { label: "linkedin", href: profile.links.linkedin, icon: Linkedin },
  { label: "cv", href: "/cv", icon: FileText },
];

export default function Footer() {
  return (
    <footer className="flex flex-col gap-3 pb-6 pt-10 text-xs text-sub sm:flex-row sm:items-center sm:justify-between sm:pb-8">
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {links.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto:") || href.startsWith("/") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 py-1 transition-colors duration-150 hover:text-text"
          >
            <Icon size={13} aria-hidden />
            {label}
          </a>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="flex items-center gap-1.5">
          <MapPin size={13} aria-hidden />
          boston → new york
        </span>
        <span className="flex items-center gap-1.5" title="time alive">
          uptime in this universe: <LifeCounter />
        </span>
      </div>
    </footer>
  );
}
