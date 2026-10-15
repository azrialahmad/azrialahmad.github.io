import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Footer from '../components/Footer'

describe('Footer', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows the real email address, not a placeholder', () => {
    render(<Footer />)

    const email = screen.getByRole('link', { name: 'Send an email' })
    expect(email).toHaveAttribute('href', 'mailto:azrialahmad@gmail.com')
    expect(email).toHaveTextContent('azrialahmad@gmail.com')
    expect(screen.queryByText(/your@email\.com/)).not.toBeInTheDocument()
  })

  it('copies the email address', async () => {
    render(<Footer />)

    fireEvent.click(screen.getByRole('button', { name: 'Copy' }))

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('azrialahmad@gmail.com')
    expect(await screen.findByRole('button', { name: 'Copied ✓' })).toBeInTheDocument()
  })

  it('links to GitHub', () => {
    render(<Footer />)

    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/azrialahmad',
    )
  })

  it('renders the copyright line with the current year', () => {
    render(<Footer />)

    expect(screen.getByText(`© ${new Date().getFullYear()}`)).toBeInTheDocument()
  })

  it('shows the local time in Yogyakarta (UTC+7)', () => {
    vi.useFakeTimers({ toFake: ['Date', 'setInterval', 'clearInterval'] })
    vi.setSystemTime(new Date('2026-03-01T02:05:00Z'))

    render(<Footer />)

    expect(screen.getByLabelText('Local time 09:05')).toBeInTheDocument()

    act(() => {
      vi.setSystemTime(new Date('2026-03-01T02:06:00Z'))
      vi.advanceTimersByTime(15_000)
    })
    expect(screen.getByLabelText('Local time 09:06')).toBeInTheDocument()
  })
})
