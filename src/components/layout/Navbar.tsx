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
      <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-background/85 backdrop-blur-md rounded-full shadow-sm border border-light-gray whitespace-nowrap">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="px-4 py-2 text-sm font-medium text-charcoal/70 hover:text-charcoal hover:bg-white/5 rounded-full transition-all"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
