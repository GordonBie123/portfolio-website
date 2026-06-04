"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ui/ContactForm";
import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-[11px] text-fg-muted uppercase tracking-[0.2em] mb-1">08</p>
        <h2 className="font-display font-extrabold text-3xl uppercase tracking-tight text-fg">Contact</h2>
        <div className="mt-3 h-[2px] bg-fg mb-10" />

        <p className="text-fg-muted text-base leading-relaxed mb-2">
          {profile.contactDescription}
        </p>
        <p className="font-mono text-[11px] text-fg-subtle uppercase tracking-[0.15em] mb-10">
          {profile.contactStatus}
        </p>

        <ContactForm />
      </motion.div>
    </section>
  );
}
