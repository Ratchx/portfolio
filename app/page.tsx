import About from "@/components/About";
import BootScreen from "@/components/BootScreen";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MatrixRain from "@/components/MatrixRain";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <div className="scanlines">
      <SmoothScroll />
      <BootScreen />
      <MatrixRain />
      <Nav />

      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
