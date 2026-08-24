import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Lightbox from '../Lightbox'
import { useLightbox } from '../useLightbox'

function LightboxStub() {
  const lightbox = useLightbox()
  return (
    <>
      <button onClick={() => lightbox.open('/img/photo.webp')}>open</button>
      <Lightbox src={lightbox.src} onClose={lightbox.close} />
    </>
  )
}

describe('Lightbox', () => {
  afterEach(() => {
    document.body.style.overflow = ''
  })

  it('renders nothing when no image is selected', () => {
    const { container } = render(<Lightbox src={null} onClose={() => {}} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('shows the full-size image when opened', () => {
    render(<LightboxStub />)

    fireEvent.click(screen.getByText('open'))

    const img = screen.getByRole('img', { name: 'Full-size preview' })
    expect(img).toHaveAttribute('src', '/img/photo.webp')
  })

  it('locks body scroll while open and unlocks on close', () => {
    render(<LightboxStub />)

    fireEvent.click(screen.getByText('open'))
    expect(document.body.style.overflow).toBe('hidden')

    fireEvent.click(screen.getByRole('button', { name: 'Close lightbox' }))
    expect(document.body.style.overflow).toBe('')
  })

  it('closes when the Escape key is pressed', () => {
    render(<LightboxStub />)
    fireEvent.click(screen.getByText('open'))

    fireEvent.keyDown(window, { key: 'Escape' })

    expect(screen.queryByRole('img', { name: 'Full-size preview' })).not.toBeInTheDocument()
  })

  it('closes when the overlay is clicked but not the image', () => {
    const { container } = render(<LightboxStub />)
    fireEvent.click(screen.getByText('open'))

    fireEvent.click(screen.getByRole('img', { name: 'Full-size preview' }))
    expect(screen.getByRole('img', { name: 'Full-size preview' })).toBeInTheDocument()

    fireEvent.click(container.querySelector('.lightbox-overlay'))
    expect(screen.queryByRole('img', { name: 'Full-size preview' })).not.toBeInTheDocument()
  })
})
