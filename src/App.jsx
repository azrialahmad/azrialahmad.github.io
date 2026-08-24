import { useState, useEffect, useRef } from 'react'
import './index.css'
import './components.css'

import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Projects from './Projects'
import Publications from './Publications'
import Photography from './Photography'
import Design from './Design'
import Footer from './Footer'


function useScrollReveal() {
  const observerRef = useRef(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach(el => observerRef.current.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])
}

function getInitialTheme() {
  const stored = localStorage.getItem('portfolio-theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        return getInitialTheme()
      } catch {
        return 'light'
      }
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  return [theme, toggle]
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  useScrollReveal()

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
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
