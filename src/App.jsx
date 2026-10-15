import './styles/index.css'

import About from './components/About'
import Design from './components/Design'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import Photography from './components/Photography'
import Projects from './components/Projects'
import Publications from './components/Publications'
import { useReveal } from './hooks/useReveal'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const [theme, toggleTheme] = useTheme()
  useReveal()

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Publications />
        <Photography />
        <Design />
      </main>
      <Footer />
    </>
  )
}
