"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const pages = [
  { label: "About",      href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Work",       href: "/work" },
  { label: "Contact",    href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      {/* Announcement strip */}
      <div className="border-b border-border-light px-6 sm:px-10 py-1.5 flex items-center justify-center">
        <p className="font-sans text-[9px] sm:text-[10px] text-fg-muted tracking-[0.12em] sm:tracking-[0.15em] uppercase text-center">
          ML, AI, SWE, and Markets — Northeastern &apos;27
        </p>
      </div>

      {/* Main nav row */}
      <nav className="border-b border-border-light px-6 sm:px-10 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="hover:text-accent transition-colors duration-200 group"
          aria-label="Gordon Bie — home"
          onClick={() => setOpen(false)}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-fg group-hover:text-accent transition-colors duration-200">
            <text
              x="1" y="22"
              fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
              fontStyle="italic" fontWeight="600" fontSize="22"
              fill="currentColor" letterSpacing="-1"
            >G</text>
            <text
              x="14" y="28"
              fontFamily="var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
              fontStyle="italic" fontWeight="300" fontSize="16"
              fill="currentColor" opacity="0.65"
            >B</text>
            <circle cx="28" cy="28" r="1.8" fill="currentColor" opacity="0.5" />
          </svg>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-7">
          {pages.map((page) => {
            const active = pathname === page.href;
            return (
              <Link
                key={page.href}
                href={page.href}
                className={`font-sans text-xs tracking-[0.12em] uppercase transition-colors ${
                  active ? "text-fg" : "text-fg-muted hover:text-fg"
                }`}
              >
                {page.label}
                {active && <span className="block h-px bg-accent mt-0.5" />}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 text-fg-muted hover:text-fg transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-5 h-px bg-current transition-all duration-200 origin-center ${
              open ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-current transition-all duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-current transition-all duration-200 origin-center ${
              open ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden border-b border-border-light bg-background">
          {pages.map((page) => {
            const active = pathname === page.href;
            return (
              <Link
                key={page.href}
                href={page.href}
                onClick={() => setOpen(false)}
                className={`block px-6 py-4 font-sans text-xs tracking-[0.15em] uppercase border-b border-border-light last:border-b-0 transition-colors ${
                  active ? "text-fg" : "text-fg-muted hover:text-fg"
                }`}
              >
                {page.label}
                {active && <span className="inline-block w-4 h-px bg-accent ml-2 align-middle" />}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
