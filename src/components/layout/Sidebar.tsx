import Link from "next/link";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { navLinks } from "@/data/links";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full space-y-8">
      {/* Header Info */}
      <div className="space-y-4">
        {/* Placeholder for Image */}
        <div className="relative w-24 h-24 overflow-hidden rounded-full border-2 border-matcha/50 mb-4 bg-matcha-light flex items-center justify-center">
          {profile.headshot ? (
            <Image
              src={profile.headshot}
              alt={profile.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <span className="text-3xl font-bold text-matcha">G</span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-charcoal sm:text-5xl">
          {profile.name}
        </h1>
        <h2 className="text-xl font-medium tracking-tight text-charcoal sm:text-2xl">
          {profile.role}
        </h2>
        <p className="mt-4 max-w-xs leading-relaxed text-medium-gray">
          {profile.shortBio}
        </p>

        {/* Action Button: Download Resume */}
        <div className="pt-2">
          <Link
            href="/resume.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal text-white rounded-full font-bold text-sm hover:bg-matcha transition-colors duration-300 w-fit cursor-pointer"
          >
            <Download size={16} />
            Download Resume
          </Link>
        </div>
      </div>

      {/* Navigation (Desktop only) */}
      <nav className="nav hidden lg:block flex-1 mt-12">
        <ul className="flex flex-col w-max space-y-2">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="group flex items-center py-3 active-nav-item"
              >
                <span className="nav-indicator mr-4 h-px w-8 bg-light-gray transition-all group-hover:w-16 group-hover:bg-matcha" />
                <span className="nav-text text-xs font-bold uppercase tracking-widest text-medium-gray group-hover:text-matcha">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Social Links */}
      <div className="mt-8 flex items-center gap-5 text-medium-gray lg:mt-auto">
        <Link
          href={profile.links.github}
          target="_blank"
          className="hover:text-matcha transition-colors"
          aria-label="GitHub"
        >
          <Github className="h-6 w-6" />
        </Link>
        <Link
          href={profile.links.linkedin}
          target="_blank"
          className="hover:text-matcha transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-6 w-6" />
        </Link>
        <Link
          href={`mailto:${profile.email}`}
          className="hover:text-matcha transition-colors"
          aria-label="Email"
        >
          <Mail className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}
