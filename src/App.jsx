import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { VideoBlock } from "@/components/VideoBlock";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-foreground/10">
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <VideoBlock />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
