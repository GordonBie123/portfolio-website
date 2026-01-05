"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { navLinks } from "@/data/links";
import { profile } from "@/data/profile";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-light-gray hover:text-matcha transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 mb-12">
          <Link
            href={profile.links.github}
            target="_blank"
            className="p-3 bg-white/5 rounded-full hover:bg-matcha hover:text-white transition-all duration-300"
          >
            <Github size={20} />
          </Link>
          <Link
            href={profile.links.linkedin}
            target="_blank"
            className="p-3 bg-white/5 rounded-full hover:bg-matcha hover:text-white transition-all duration-300"
          >
            <Linkedin size={20} />
          </Link>
          <Link
            href={`mailto:${profile.email}`}
            className="p-3 bg-white/5 rounded-full hover:bg-matcha hover:text-white transition-all duration-300"
          >
            <Mail size={20} />
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-light-gray/60 space-y-2">
          <p>© {new Date().getFullYear()} Gordon. All rights reserved.</p>
          <p>Built with React & Next.js</p>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="mt-12 p-3 border border-white/10 rounded-full hover:bg-matcha hover:border-matcha transition-all duration-300 group"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
