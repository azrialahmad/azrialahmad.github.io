import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import Photography from '../components/Photography'

function openPhoto(alt) {
  fireEvent.click(screen.getByRole('button', { name: `View larger: ${alt}` }))
  return document.querySelector('dialog.lightbox')
}

describe('Photography', () => {
  afterEach(() => {
    document.documentElement.style.overflow = ''
  })

  it('renders each series with its frame count', () => {
    render(<Photography />)

    expect(screen.getByRole('heading', { name: /Street & Candid/ })).toHaveTextContent('03 frames')
    expect(screen.getByRole('heading', { name: /Cosplay Portraits/ })).toHaveTextContent('02 frames')
  })

  it('switches between duotone and colour', () => {
    const { container } = render(<Photography />)
    const section = container.querySelector('#photography')

    expect(section).toHaveAttribute('data-tone', 'duotone')
    expect(screen.getByRole('button', { name: 'Duotone' })).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(screen.getByRole('button', { name: 'Color' }))

    expect(section).toHaveAttribute('data-tone', 'color')
    expect(screen.getByRole('button', { name: 'Color' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('opens the lightbox on the chosen photo and locks page scroll', () => {
    render(<Photography />)

    const dialog = openPhoto('Alt text for street-2')

    expect(dialog.open).toBe(true)
    expect(within(dialog).getByText('02 / 03')).toBeInTheDocument()
    expect(within(dialog).getByRole('img', { name: 'Alt text for street-2' })).toBeInTheDocument()
    expect(document.documentElement.style.overflow).toBe('hidden')
  })

  it('steps through the series with arrow keys and wraps around', () => {
    render(<Photography />)
    const dialog = openPhoto('Alt text for street-3')

    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(within(dialog).getByText('01 / 03')).toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    expect(within(dialog).getByText('03 / 03')).toBeInTheDocument()
  })

  it('keeps navigation within the series that was opened', () => {
    render(<Photography />)
    const dialog = openPhoto('Alt text for cosplay-2')

    fireEvent.click(within(dialog).getByRole('button', { name: 'Next image' }))

    expect(within(dialog).getByText('01 / 02')).toBeInTheDocument()
    expect(within(dialog).getByRole('img', { name: 'Alt text for cosplay-1' })).toBeInTheDocument()
  })

  it('closes from the close button and releases the scroll lock', () => {
    render(<Photography />)
    const dialog = openPhoto('Alt text for street-1')

    fireEvent.click(within(dialog).getByRole('button', { name: 'Close' }))

    expect(dialog.open).toBe(false)
    expect(within(dialog).queryByRole('img')).not.toBeInTheDocument()
    expect(document.documentElement.style.overflow).toBe('')
  })

  it('closes when the backdrop is clicked, but not the image', () => {
    render(<Photography />)
    const dialog = openPhoto('Alt text for street-1')

    fireEvent.click(within(dialog).getByRole('img'))
    expect(dialog.open).toBe(true)

    fireEvent.click(dialog)
    expect(dialog.open).toBe(false)
  })
})
