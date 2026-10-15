import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Publications from '../components/Publications'
import { PUBLICATIONS, toBibTeX } from '../data/content'

describe('Publications', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    })
  })

  it('shows the paper with a link to IEEE Xplore', () => {
    render(<Publications />)

    expect(
      screen.getByRole('heading', { name: /Comparative Analysis of YOLOv12 Model Sizes/ }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Read paper on IEEE Xplore' })).toHaveAttribute(
      'href',
      'https://ieeexplore.ieee.org/document/11332249',
    )
  })

  it('emphasises Azrial in the author list', () => {
    render(<Publications />)

    expect(screen.getByText('Azrial Ahmad Haidar Daffi Zuhri').tagName).toBe('STRONG')
  })

  it('copies a BibTeX citation', async () => {
    render(<Publications />)

    fireEvent.click(screen.getByRole('button', { name: 'Copy BibTeX' }))

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(toBibTeX(PUBLICATIONS[0]))
    expect(await screen.findByRole('button', { name: 'Copied ✓' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('BibTeX citation copied')
  })
})

describe('toBibTeX', () => {
  it('produces a well-formed inproceedings entry', () => {
    const bib = toBibTeX(PUBLICATIONS[0])

    expect(bib).toMatch(/^@inproceedings\{zuhri2025yolov12,/)
    expect(bib).toContain(
      'author    = {Zuhri, Azrial Ahmad Haidar Daffi and Fudholi, Dhomas Hatta and Kurniawan, Rahadian and Sita, Tisara},',
    )
    expect(bib).toContain('year      = {2025},')
    expect(bib.trim().endsWith('}')).toBe(true)
  })
})
