"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ui/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-32">
      <h2 className="text-3xl font-display font-bold text-charcoal mb-8">Contact</h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-medium-gray text-base leading-relaxed mb-8">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <ContactForm />
      </motion.div>
    </section>
  );
}
