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
    <div className="relative mx-auto min-h-screen bg-background pt-28 pb-20">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 flex flex-col items-center">
        <Hero />
        
        <div className="w-px h-12 md:h-16 bg-light-gray my-12" />
        
        <div className="flex flex-col gap-20 w-full">
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
