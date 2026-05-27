"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { navLinks } from "@/data/links";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] overflow-x-auto no-scrollbar"
    >
      <div className="flex items-center gap-0 md:gap-1 px-2 md:px-3 py-1.5 bg-background/85 backdrop-blur-md rounded-full shadow-sm border border-light-gray whitespace-nowrap">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="px-3 py-1.5 text-sm text-charcoal/50 hover:text-charcoal/90 rounded-full transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
