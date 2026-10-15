import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import Projects from '../components/Projects'
import { ARCHIVE, PROJECTS } from '../data/content'

describe('Projects', () => {
  it('renders every featured project with a heading and an illustrated figure', () => {
    render(<Projects />)

    PROJECTS.forEach(({ name }) => {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument()
    })
    expect(screen.getAllByRole('img', { name: /^Illustration:/ })).toHaveLength(PROJECTS.length)
  })

  it('links featured projects to their source and live demos', () => {
    render(<Projects />)

    expect(screen.getByRole('link', { name: 'Source: fivesight' })).toHaveAttribute(
      'href',
      'https://github.com/azrialahmad/fivesight',
    )
    expect(screen.getByRole('link', { name: 'Source: osu-aim-assistant' })).toHaveAttribute(
      'href',
      'https://github.com/azrialahmad/osu-aim-assistant',
    )
    expect(screen.getByRole('link', { name: 'Live demo: mouse-movements' })).toHaveAttribute(
      'href',
      'https://azrialahmad.is-a.dev/mousemovements/',
    )
    expect(screen.getByRole('link', { name: 'Source: mouse-movements' })).toHaveAttribute(
      'href',
      'https://github.com/azrialahmad/mousemovements',
    )
  })

  it('lists the other repositories in an index', () => {
    render(<Projects />)

    const index = screen.getByRole('heading', { name: /Also on the bench/ }).parentElement
    expect(within(index).getAllByRole('link')).toHaveLength(ARCHIVE.length)
    expect(within(index).getByRole('link', { name: /^apex-pity-tracker \(live\)/ })).toHaveAttribute(
      'href',
      'https://azrialahmad.is-a.dev/apex-pity-tracker/',
    )
  })

  it('only links to azrialahmad on GitHub or the live site', () => {
    render(<Projects />)

    screen.getAllByRole('link').forEach(link => {
      expect(link.getAttribute('href')).toMatch(
        /^https:\/\/(github\.com\/azrialahmad(\/|$)|azrialahmad\.is-a\.dev\/)/,
      )
    })
  })

  it('links to the GitHub profile', () => {
    render(<Projects />)

    expect(screen.getByRole('link', { name: /All on GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/azrialahmad',
    )
  })
})
