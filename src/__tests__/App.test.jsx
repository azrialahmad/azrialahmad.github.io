import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders all main sections', () => {
    render(<App />)

    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
    expect(document.getElementById('top')).toBeInTheDocument()
    expect(document.getElementById('about')).toBeInTheDocument()
    expect(document.getElementById('projects')).toBeInTheDocument()
    expect(document.getElementById('publications')).toBeInTheDocument()
    expect(document.getElementById('photography')).toBeInTheDocument()
    expect(document.getElementById('design')).toBeInTheDocument()
  })

  it('applies a theme to the document root', () => {
    render(<App />)

    const theme = document.documentElement.getAttribute('data-theme')
    expect(['light', 'dark']).toContain(theme)
  })
})
