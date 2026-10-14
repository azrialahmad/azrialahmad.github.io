// Responsive <picture> for an image produced by src/lib/images.js.
export default function Picture({ image, sizes, alt = image.alt, priority = false, className }) {
  return (
    <picture className={className}>
      {Object.entries(image.sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
      />
    </picture>
  )
}
