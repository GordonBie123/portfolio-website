"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Download, Linkedin, Github } from "lucide-react";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section id="home" className="flex flex-col items-center text-center pt-12 pb-8 w-full scroll-mt-28">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 125, delay: 0.1, duration: 0.7 }}
        className="relative w-28 h-28 overflow-hidden rounded-full border-4 border-white shadow-lg bg-off-white mb-8"
      >
        {profile.headshot ? (
          <Image
            src={profile.headshot}
            alt={profile.name}
            fill
            className="object-cover"
            sizes="112px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-matcha-light text-matcha font-bold text-3xl">
            {profile.name[0]}
          </div>
        )}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-3xl font-medium leading-relaxed text-charcoal mb-8 px-4"
      >
        <span className="font-bold">Hello, I&apos;m {profile.name.split(" ")[0]}.</span> {profile.shortBio}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          href="#contact"
          className="px-6 py-2.5 bg-charcoal text-white rounded-full font-medium hover:bg-black transition-colors flex items-center gap-2 group"
        >
          Contact me here <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        <Link
          href="/Bie_Gordon_Resume.pdf"
          target="_blank"
          className="px-6 py-2.5 bg-white text-charcoal shadow-sm border border-light-gray border-b-2 rounded-full font-medium hover:bg-off-white hover:-translate-y-px active:translate-y-px active:border-b transition-all flex items-center gap-2"
        >
          Download CV <Download size={16} />
        </Link>
        <Link
          href={profile.links.linkedin}
          target="_blank"
          className="p-2.5 bg-white text-charcoal shadow-sm border border-light-gray border-b-2 rounded-full hover:bg-off-white hover:-translate-y-px active:translate-y-px active:border-b transition-all"
        >
          <Linkedin size={20} />
        </Link>
        <Link
          href={profile.links.github}
          target="_blank"
          className="p-2.5 bg-white text-charcoal shadow-sm border border-light-gray border-b-2 rounded-full hover:bg-off-white hover:-translate-y-px active:translate-y-px active:border-b transition-all"
        >
          <Github size={20} />
        </Link>
      </motion.div>
    </section>
  );
}
