import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-theme')
    localStorage.clear()
  })

  it('renders every section in order', () => {
    render(<App />)

    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
    const ids = ['top', 'about', 'projects', 'publications', 'photography', 'design', 'contact']
    const elements = ids.map(id => document.getElementById(id))
    elements.forEach(el => expect(el).toBeInTheDocument())
    // each section follows the previous one in the document
    elements.slice(1).forEach((el, i) => {
      expect(elements[i].compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    })
  })

  it('has a single h1 with the full name for assistive tech', () => {
    render(<App />)

    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent('Azrial Ahmad Haidar')
  })

  it('offers a skip link to the main content', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#about')
  })

  it('toggles and persists the theme', async () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(localStorage.getItem('portfolio-theme')).toBe('dark')

    // The label follows the <html data-theme> attribute via a MutationObserver.
    fireEvent.click(await screen.findByRole('button', { name: 'Switch to light mode' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(localStorage.getItem('portfolio-theme')).toBe('light')
  })
})
