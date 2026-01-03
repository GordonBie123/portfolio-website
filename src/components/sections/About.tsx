"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { experiences } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { topTracks } from "@/data/spotify";
import { SpotifyCard } from "@/components/ui/SpotifyCard";
import { profile } from "@/data/profile";

interface NowPlaying {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export default function About() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("/api/now-playing");
        const data = await res.json();
        setNowPlaying(data);
      } catch (e) {
        console.error("Error fetching Spotify data", e);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  const displayTracks = (nowPlaying?.isPlaying && nowPlaying.title && nowPlaying.artist && nowPlaying.albumImageUrl && nowPlaying.songUrl)
    ? [{ 
        title: nowPlaying.title, 
        artist: nowPlaying.artist, 
        albumArt: nowPlaying.albumImageUrl, 
        url: nowPlaying.songUrl,
        isNowPlaying: true 
      }, ...topTracks.slice(0, 3)]
    : topTracks;

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

          {/* Spotify Integration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-display font-bold text-matcha flex items-center gap-2">
              <span className="w-8 h-[2px] bg-matcha" />
              Currently Listening To
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {displayTracks.map((song) => (
                <SpotifyCard key={song.title} song={song} />
              ))}
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
