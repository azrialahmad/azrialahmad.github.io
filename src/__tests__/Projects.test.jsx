import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Projects from '../Projects'

describe('Projects', () => {
  it('renders a card for each project with a working link', () => {
    render(<Projects />)

    const osu = screen.getByRole('link', { name: 'View osu-aim-assistant on GitHub' })
    const virtual = screen.getByRole('link', { name: 'View virtual-photography-analysis on GitHub' })
    const mouse = screen.getByRole('link', { name: 'View mouse-movements on GitHub' })

    expect(osu).toHaveAttribute('href', 'https://github.com/azrialahmad/osu-aim-assistant')
    expect(virtual).toHaveAttribute('href', 'https://github.com/azrialahmad/virtual-photography-analysis')
    expect(mouse).toHaveAttribute('href', 'https://azrialahmad.is-a.dev/mousemovements/')
  })

  it('renders every project name and its tags', () => {
    render(<Projects />)

    expect(screen.getByText('osu-aim-assistant')).toBeInTheDocument()
    expect(screen.getAllByText('YOLOv11').length).toBeGreaterThan(0)
    expect(screen.getByText('Pandas')).toBeInTheDocument()
  })

  it('links to the GitHub profile', () => {
    render(<Projects />)

    expect(screen.getByRole('link', { name: 'All on GitHub ↗' })).toHaveAttribute(
      'href',
      'https://github.com/azrialahmad'
    )
  })
})
