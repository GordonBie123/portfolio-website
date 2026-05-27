import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Research from "@/components/sections/Research";
import ExperienceSection from "@/components/sections/ExperienceSection";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import SideQuests from "@/components/sections/SideQuests";
import Matcha from "@/components/sections/Matcha";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background pt-24 pb-20">
      <Navbar />
      <main className="mx-auto max-w-4xl px-8">
        <Hero />
        <div className="flex flex-col gap-20">
          <About />
          <ExperienceSection />
          <Research />
          <Projects />
          <Skills />
          <SideQuests />
          <Matcha />
          <Contact />
        </div>
      </main>
    </div>
  );
}
