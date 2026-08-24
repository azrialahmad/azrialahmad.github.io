import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '../Navbar'

const NAV_LINKS = ['About', 'Projects', 'Publications', 'Photography', 'Design']

function setup() {
  const onToggleTheme = vi.fn()
  render(<Navbar theme="light" onToggleTheme={onToggleTheme} />)
  return { onToggleTheme }
}

describe('Navbar', () => {
  it('renders a link for every section, including Publications', () => {
    setup()

    NAV_LINKS.forEach(label => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    })
  })

  it('links point to the matching section ids', () => {
    setup()

    const hrefs = NAV_LINKS.map(
      label => screen.getByRole('link', { name: label }).getAttribute('href')
    )
    expect(hrefs).toEqual(
      NAV_LINKS.map(label => `#${label.toLowerCase()}`)
    )
  })

  it('toggles the theme when the theme button is clicked', () => {
    const { onToggleTheme } = setup()

    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }))
    expect(onToggleTheme).toHaveBeenCalledTimes(1)
  })

  it('toggles the mobile menu and reflects aria-expanded', () => {
    setup()

    const burger = screen.getByRole('button', { name: 'Toggle menu' })
    expect(burger).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(burger)
    expect(burger).toHaveAttribute('aria-expanded', 'true')
  })
})
