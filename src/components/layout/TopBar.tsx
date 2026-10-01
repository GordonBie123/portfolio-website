"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, Code, FileText, Github, Info, Keyboard, Leaf, Mail, type LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";

const pages: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "home", href: "/", icon: Keyboard },
  { label: "about", href: "/about", icon: Info },
  { label: "experience", href: "/experience", icon: BriefcaseBusiness },
  { label: "work", href: "/work", icon: Code },
  { label: "cv", href: "/cv", icon: FileText },
  { label: "contact", href: "/contact", icon: Mail },
];

const external: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "github", href: profile.links.github, icon: Github },
];

// Icon button with a monkeytype-style tooltip underneath
function NavIcon({ label, icon: Icon, active }: { label: string; icon: LucideIcon; active?: boolean }) {
  return (
    <>
      <Icon size={20} strokeWidth={2} className={active ? "text-text" : undefined} aria-hidden />
      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-text px-2 py-1 text-xs text-bg opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
        {label}
      </span>
    </>
  );
}

const iconCls =
  "group relative flex h-10 w-10 items-center justify-center rounded-md text-sub transition-colors duration-150 hover:text-text";

export default function TopBar() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between gap-4 pt-6 sm:pt-8">
      <div className="flex items-center gap-3 sm:gap-6">
        <Link href="/" className="group flex items-center gap-2" aria-label="gordon bie, home">
          <Leaf size={30} strokeWidth={2.25} className="text-main" aria-hidden />
          <span className="relative hidden sm:block">
            <span className="absolute -top-2.5 left-0 text-[10px] leading-none text-sub">ml · swe · operations</span>
            <span className="text-[26px] leading-none tracking-tight text-text transition-colors duration-150 group-hover:text-main">
              gordonbie
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="flex items-center">
          {pages.map((p) => {
            const active = p.href === "/" ? pathname === "/" : pathname.startsWith(p.href);
            return (
              <Link key={p.href} href={p.href} aria-label={p.label} aria-current={active ? "page" : undefined} className={iconCls}>
                <NavIcon label={p.label} icon={p.icon} active={active} />
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center">
        {external.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} className={iconCls}>
            <NavIcon label={l.label} icon={l.icon} />
          </a>
        ))}
      </div>
    </header>
  );
}
