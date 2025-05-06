import { useEffect, useState } from 'react'
import { AboutSection } from './components/Home/jsx/AboutSection'
import { HomeComponent } from './components/Home/jsx/HomeComponent'
import { AnimatePresence, motion } from "framer-motion"
import { Projects } from './components/Home/jsx/Projects'
import { LineWork } from './components/Home/jsx/LineWork'
import { Contact } from './components/Home/jsx/Contact'
import { MdEmail } from 'react-icons/md'
import { IoLogoWhatsapp } from 'react-icons/io'

// import ContactSection from './components/ContactSection'

const sections = [<HomeComponent />, <AboutSection />, <Projects />, <LineWork />]

function App() {

  const [index, setIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [touchStart, setTouchStart] = useState(null)

  useEffect(() => {

    const handleWheel = (e) => {

      if (isAnimating) return

      setIsAnimating(true)

      if (e.deltaY > 0 && index < sections.length - 1) {
        setIndex((prev) => prev + 1)
      } else if (e.deltaY < 0 && index > 0) {
        setIndex((prev) => prev - 1)
      }

      setTimeout(() => setIsAnimating(false), 1000)
    }

    const handleTouchMove = (e) => {

      if (isAnimating) return

      const touch = e.touches[0]
      const deltaY = touch.clientY - touchStart.clientY

      if (deltaY > 0 && index < sections.length - 1) {
        setIndex((prev) => prev + 1)
      } else if (deltaY < 0 && index > 0) {
        setIndex((prev) => prev - 1)
      }

      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }

    const handleTouchStart = (e) => {
      setTouchStart(e.touches[0].clientY)
    }

    window.addEventListener("wheel", handleWheel)
    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchstart", handleTouchStart)

    return () => {
      window.removeEventListener("wheel", handleWheel)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchstart", handleTouchStart)
    }
  }, [index, isAnimating])

  return (
    <div className="h-screen overflow-hidden">      
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {sections[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App