import { useEffect, useRef, useState } from "react";
import { AboutSection } from "./components/Home/jsx/AboutSection";
import { HomeComponent } from "./components/Home/jsx/HomeComponent";
import { AnimatePresence, motion } from "framer-motion";
import { Projects } from "./components/Home/jsx/Projects";
import { LineWork } from "./components/Home/jsx/LineWork";
import { Contact } from "./components/Home/jsx/Contact";

const sections = [
  <HomeComponent key="home" />,
  <AboutSection key="about" />,
  <Projects key="projects" />,
  <LineWork key="linework" />,
  <Contact key="contact" />,
];

function App() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let lastScrollTime = 0;

    const handleWheel = (e) => {
      const now = Date.now();
      if (isAnimating || now - lastScrollTime < 1000) return; // 1s de cooldown
      lastScrollTime = now;

      setIsAnimating(true);

      if (e.deltaY > 0 && index < sections.length - 1) {
        setIndex((prev) => prev + 1);
      } else if (e.deltaY < 0 && index > 0) {
        setIndex((prev) => prev - 1);
      }

      setTimeout(() => setIsAnimating(false), 1000);
    };

    const handleTouchStart = (e) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      touchEndRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (isAnimating) return;

      const start = touchStartRef.current;
      const end = touchEndRef.current;

      if (start !== null && end !== null) {
        const deltaY = end - start;
        if (deltaY < -50 && index < sections.length - 1) {
          setIsAnimating(true);
          setIndex((prev) => prev + 1);
        } else if (deltaY > 50 && index > 0) {
          setIsAnimating(true);
          setIndex((prev) => prev - 1);
        }

        setTimeout(() => setIsAnimating(false), 1000);
      }

      touchStartRef.current = null;
      touchEndRef.current = null;
    };

    window.addEventListener("wheel", handleWheel);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [index, isAnimating, isMobile]);

  console.log("isMobile", isMobile);

  if (isMobile) {
    return (
      <div className="overflow-x-hidden">
        {sections.map((Section, i) => (
          <div key={i} className="min-h-screen">
            {Section}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 h-screen"
        >
          {sections[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
