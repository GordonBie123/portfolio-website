"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-white"
    >
      {/* Background Visual Element */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-matcha-light/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-matcha-light/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        {/* Left Column: Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1"
        >
          <motion.p 
            variants={itemVariants} 
            className="text-matcha font-bold mb-4 tracking-widest uppercase text-sm flex items-center justify-center lg:justify-start gap-2"
          >
            <span className="w-8 h-[1px] bg-matcha/40 hidden lg:block" />
            {profile.welcomeMessage}
          </motion.p>
          
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl xl:text-8xl font-display font-bold text-charcoal mb-6 leading-[1.1]"
          >
            Hello, I&apos;m <span className="text-matcha relative underline-offset-8 decoration-matcha/10">
              {profile.name}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-medium-gray mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
          >
            {profile.summary}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full sm:w-auto px-8"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto px-8"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get in Touch
            </Button>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xs uppercase tracking-[0.2em] font-bold text-medium-gray/40 mt-12 hidden lg:block"
          >
            {profile.thankYouMessage}
          </motion.p>
        </motion.div>

        {/* Right Column: Headshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-5 order-1 lg:order-2 flex justify-center relative"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]">
            {/* Interactive Glow/Background */}
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0] 
              }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-0 bg-matcha/5 rounded-[40px] -rotate-6 blur-2xl"
            />
            
            {/* Image Container */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-full h-full rounded-[40px] overflow-hidden border-2 border-matcha/10 shadow-2xl shadow-matcha/20 group bg-off-white"
            >
              <img
                src={profile.headshot}
                alt={profile.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-matcha/10 to-transparent opacity-40 mix-blend-overlay" />
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-matcha/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-matcha/5 rounded-full blur-lg animate-pulse delay-700" />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-medium-gray flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest font-medium opacity-50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={20} className="text-matcha" />
        </motion.div>
      </motion.div>
    </section>
  );
}
