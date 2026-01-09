import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Research from "@/components/sections/Research";
import SideQuests from "@/components/sections/SideQuests";
import Projects from "@/components/sections/Projects";
import Matcha from "@/components/sections/Matcha";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <Hero />
      <About />
      <Research />
      <Projects />
      <SideQuests />
      <Matcha />
      <Contact />

      <Footer />
    </main>
  );
}
