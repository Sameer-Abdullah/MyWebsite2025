import ParallaxHero from "./components/ParallaxHero";
import SkillsShowcase from "./components/SkillsShowcase";
import ProjectsCoverflow from "./components/ProjectsCoverflow";
import ExperiencePath from "./components/ExperiencePath";
import AboutMe from "./components/AboutMe";
import SiteFooter from "./components/SiteFooter";



export default function Home() {
  return (
    <main className="relative min-h-screen"> 
      <ParallaxHero /> 
      <SkillsShowcase />       
      <ProjectsCoverflow />
      <ExperiencePath />
      <AboutMe />               
      <SiteFooter />  
               
    </main>
  );
}



