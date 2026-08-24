import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer', () => {
  it('shows the real email address, not a placeholder', () => {
    render(<Footer />)

    const email = screen.getByRole('link', { name: 'Send an email' })
    expect(email).toHaveAttribute('href', 'mailto:azrialahmad@gmail.com')
    expect(screen.queryByText(/your@email\.com/)).not.toBeInTheDocument()
  })

  it('links to GitHub', () => {
    render(<Footer />)

    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/azrialahmad'
    )
  })

  it('renders the copyright line with the current year', () => {
    render(<Footer />)

    expect(
      screen.getByText(new RegExp(`© ${new Date().getFullYear()} — built with`))
    ).toBeInTheDocument()
  })
})
