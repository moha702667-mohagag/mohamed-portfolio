import Navbar from "./components/Navbar/Navbar";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Work from "./components/Work/Work";
import Expertise from "./components/Expertise/Expertise";
import Approach from "./components/Approach/Approach";
import Stack from "./components/Stack/Stack";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <ScrollProgress />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Work />
        <Expertise />
        <Approach />
        <Stack />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;