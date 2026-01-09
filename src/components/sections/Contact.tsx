"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Linkedin, Github, Music } from "lucide-react";
import Section from "@/components/ui/Section";
import ContactForm from "@/components/ui/ContactForm";
import { profile } from "@/data/profile";
import Link from "next/link";

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: null,
    },
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
  ];

  return (
    <Section id="contact" variant="white">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display font-bold mb-4"
        >
          {profile.contactTitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-medium-gray max-w-2xl"
        >
          {profile.contactDescription}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-4 space-y-8"
        >
          {contactInfo.map((info) => (
            <div key={info.label} className="flex items-start gap-4">
              <div className="p-3 bg-matcha/10 text-matcha rounded-xl">
                <info.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-medium-gray mb-1">
                  {info.label}
                </p>
                {info.href ? (
                  <Link
                    href={info.href}
                    target="_blank"
                    className="text-lg font-medium text-charcoal hover:text-matcha transition-colors"
                  >
                    {info.value}
                  </Link>
                ) : (
                  <p className="text-lg font-medium text-charcoal">{info.value}</p>
                )}
              </div>
            </div>
          ))}

          <div className="pt-8 space-y-4 border-t border-light-gray">
            <h4 className="text-sm font-bold uppercase tracking-widest text-matcha">
              Social Media
            </h4>
            <div className="flex gap-4">
              <Link
                href={profile.links.github}
                target="_blank"
                className="p-3 border border-light-gray rounded-full text-charcoal hover:bg-matcha hover:text-white hover:border-matcha transition-all duration-300"
              >
                <Github size={20} />
              </Link>
              <Link
                href={profile.links.linkedin}
                target="_blank"
                className="p-3 border border-light-gray rounded-full text-charcoal hover:bg-matcha hover:text-white hover:border-matcha transition-all duration-300"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href={profile.links.spotify}
                target="_blank"
                className="p-3 border border-light-gray rounded-full text-charcoal hover:bg-matcha hover:text-white hover:border-matcha transition-all duration-300"
              >
                <Music size={20} />
              </Link>
            </div>
          </div>
          
          <div className="p-6 bg-matcha/5 rounded-2xl border border-matcha/10">
            <p className="text-sm font-medium text-matcha-dark flex items-center gap-2">
              <span className="w-2 h-2 bg-matcha rounded-full animate-pulse" />
              {profile.contactStatus}
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-8"
        >
          <ContactForm />
        </motion.div>
      </div>
    </Section>
  );
}
