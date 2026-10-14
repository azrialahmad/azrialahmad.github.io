import Picture from './Picture'

const pad = n => String(n).padStart(2, '0')

// Justified rows in pure CSS: each item grows in proportion to its aspect
// ratio, so every photo in a row shares one height and nothing is cropped
// by more than a hair. Works for any mix of portrait / landscape files.
export default function PhotoGrid({ images, prefix, duotone = false, onOpen }) {
  // Lets a small set that fits on one row stretch to fill it.
  const ratioSum = images.reduce((sum, image) => sum + image.width / image.height, 0)

  return (
    <ul className="justified" style={{ '--sum': ratioSum.toFixed(4), '--n': images.length }}>
      {images.map((image, i) => {
        const ratio = image.width / image.height
        return (
          <li key={image.id} style={{ '--ar': ratio.toFixed(4) }}>
            <button
              type="button"
              className={`photo${duotone ? ' duotone' : ''}`}
              onClick={() => onOpen(i)}
              aria-label={`View larger: ${image.alt}`}
            >
              <Picture
                image={image}
                sizes={`(min-width: 700px) ${Math.round(ratio * 420)}px, ${Math.round(ratio * 220)}px`}
              />
              <span className="photo__num" aria-hidden="true">
                {prefix} {pad(i + 1)}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
