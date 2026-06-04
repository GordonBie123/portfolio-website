"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      {/* Thin announcement strip */}
      <div className="border-b border-border-light px-6 sm:px-10 py-1.5 flex items-center justify-center">
        <p className="font-sans text-[10px] text-fg-muted tracking-[0.15em] uppercase">
          ML, AI, SWE, and Markets — Northeastern &apos;27
        </p>
      </div>

      {/* Main nav */}
      <nav className="border-b border-border-light px-6 sm:px-10 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="hover:text-accent transition-colors duration-200 group"
          aria-label="Gordon Bie — home"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-fg group-hover:text-accent transition-colors duration-200">
            {/* G */}
            <text
              x="1"
              y="22"
              fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
              fontStyle="italic"
              fontWeight="600"
              fontSize="22"
              fill="currentColor"
              letterSpacing="-1"
            >
              G
            </text>
            {/* B — offset, lighter */}
            <text
              x="14"
              y="28"
              fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
              fontStyle="italic"
              fontWeight="300"
              fontSize="16"
              fill="currentColor"
              opacity="0.65"
            >
              B
            </text>
            {/* accent dot */}
            <circle cx="28" cy="28" r="1.8" fill="currentColor" opacity="0.5" />
          </svg>
        </Link>

        <div className="flex items-center gap-7">
          {pages.map((page) => {
            const active = pathname === page.href;
            return (
              <Link
                key={page.href}
                href={page.href}
                className={`font-sans text-xs tracking-[0.12em] uppercase transition-colors ${
                  active
                    ? "text-fg"
                    : "text-fg-muted hover:text-fg"
                }`}
              >
                {page.label}
                {active && (
                  <span className="block h-px bg-accent mt-0.5" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
