"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { experiences } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { profile } from "@/data/profile";

export default function About() {

  return (
    <Section id="about" variant="off-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Synopsis & Skills */}
        <div className="lg:col-span-5 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">About Me</h2>
            <div className="space-y-4 text-medium-gray leading-relaxed text-lg">
              {profile.aboutBio.map((paragraph, index) => (
                <p 
                  key={index} 
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                  className="[&>strong]:text-charcoal/80 [&>strong]:font-semibold"
                />
              ))}
            </div>
          </motion.div>

          {/* Spotify Integration - Coming Soon */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-display font-bold text-matcha flex items-center gap-2">
              <span className="w-8 h-[2px] bg-matcha" />
              Currently Listening To
            </h3>
            <div className="bg-white rounded-xl p-6 border border-light-gray">
              <p className="text-medium-gray text-sm leading-relaxed">
                🎵 <span className="font-semibold text-charcoal">Coming Soon!</span> This feature will be implemented once the Spotify Web API is working again. 
                Currently, Spotify is not allowing new API key creation, but I&apos;ll integrate real-time music tracking as soon as it&apos;s available.
              </p>
            </div>
          </motion.div>

          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-display font-bold">Technical Skills</h3>
            <div className="space-y-6">
              {skillCategories.map((category) => (
                <div key={category.title} className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-matcha">
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-white text-charcoal text-sm font-medium rounded-lg border border-light-gray hover:border-matcha hover:text-matcha transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Spoken Languages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-display font-bold">Languages (Non Programming)</h3>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((language) => (
                <span
                  key={language}
                  className="px-4 py-2 bg-white text-charcoal text-sm font-medium rounded-lg border border-light-gray hover:border-matcha hover:text-matcha transition-colors"
                >
                  {language}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Experience */}
        <div className="lg:col-span-7 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">My Journey</h2>
            
            <div className="space-y-12">
              {/* Relevant Experience */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-matcha flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-matcha" />
                  Relevant Experience
                </h3>
                <div>
                  {experiences
                    .filter((exp) => exp.type === "professional")
                    .map((exp, index) => (
                      <ExperienceCard key={index} experience={exp} />
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
