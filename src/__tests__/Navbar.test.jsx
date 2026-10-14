import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import Navbar from '../components/Navbar'

const SECTIONS = ['About', 'Projects', 'Publications', 'Photography', 'Design']

function setup(theme = 'light') {
  const onToggleTheme = vi.fn()
  render(<Navbar theme={theme} onToggleTheme={onToggleTheme} />)
  return { onToggleTheme }
}

describe('Navbar', () => {
  it('links every section to its id', () => {
    setup()

    const menu = screen.getByRole('list')
    SECTIONS.forEach(label => {
      expect(within(menu).getByRole('link', { name: new RegExp(label) })).toHaveAttribute(
        'href',
        `#${label.toLowerCase()}`,
      )
    })
  })

  it('links to the contact section', () => {
    setup()

    expect(screen.getByRole('link', { name: 'Say hello' })).toHaveAttribute('href', '#contact')
  })

  it('asks for the opposite theme and passes the button as the transition origin', () => {
    const { onToggleTheme } = setup('dark')

    const button = screen.getByRole('button', { name: 'Switch to light mode' })
    fireEvent.click(button)

    expect(onToggleTheme).toHaveBeenCalledWith(button)
  })

  it('opens the mobile menu and closes it with Escape', () => {
    setup()

    const burger = screen.getByRole('button', { name: 'Toggle menu' })
    expect(burger).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(burger)
    expect(burger).toHaveAttribute('aria-expanded', 'true')
    expect(document.documentElement).toHaveClass('menu-open')

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(burger).toHaveAttribute('aria-expanded', 'false')
    expect(document.documentElement).not.toHaveClass('menu-open')
  })

  it('closes the mobile menu when a link is chosen', () => {
    setup()

    const burger = screen.getByRole('button', { name: 'Toggle menu' })
    fireEvent.click(burger)
    fireEvent.click(within(screen.getByRole('list')).getByRole('link', { name: /Projects/ }))

    expect(burger).toHaveAttribute('aria-expanded', 'false')
  })
})
