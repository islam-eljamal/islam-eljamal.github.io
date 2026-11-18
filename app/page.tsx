import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Motion from '@/components/Motion';
import Stats from '@/components/Stats';
import AiLab from '@/components/AiLab';
import Experience from '@/components/Experience';
import Certificates from '@/components/Certificates';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Page() {
  return (
    <>
      <Motion />
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
        <AiLab />
        <Experience />
        <Certificates />
        <About />
        <Contact />
      </main>
    </>
  );
}
