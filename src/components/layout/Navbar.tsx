"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/data/links";
import { profile } from "@/data/profile";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`fixed top-0 w-full z-[999] transition-all duration-500 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm h-16" : "bg-transparent h-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#home"
          className="text-2xl font-display font-bold text-charcoal flex items-center"
        >
          <span className="text-matcha">{profile.logoText.split("'")[0]}</span>
          {profile.logoText.slice(profile.logoText.split("'")[0].length)}
          <span className="text-matcha">.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-charcoal/70 hover:text-matcha transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="primary" size="sm" onClick={() => (window.location.hash = "contact")}>
            Contact Me
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-charcoal" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-charcoal/20 backdrop-blur-sm z-[998] md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-[#ffffff] z-[10000] shadow-2xl p-8 flex flex-col md:hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-display font-bold">Menu</span>
                <button onClick={toggleMenu}>
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={toggleMenu}
                    className="text-lg font-medium text-charcoal hover:text-matcha transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button variant="primary" className="mt-4" onClick={() => { toggleMenu(); window.location.hash = "contact"; }}>
                  Get in Touch
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
