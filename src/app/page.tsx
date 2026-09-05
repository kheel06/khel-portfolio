import { About } from "@/components/about/about";
import { CertificationSection } from "@/components/certifications/certification-section";
import { ContactSection } from "@/components/contact/contact-section";
import { Experience } from "@/components/experience/experience";
import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { Navbar } from "@/components/navbar/navbar";
import { ProjectSection } from "@/components/projects/project-section";
import { Skills } from "@/components/skills/skills";
import { Education } from "@/components/education/education";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070b14]">
      <Navbar />

      <Hero />

      <About />
      
      <Education />

      <Experience />

      <Skills />

      <ProjectSection />

      <CertificationSection />

      <ContactSection />

      <Footer />
    </main>
  );
}