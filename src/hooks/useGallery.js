import { useCallback, useState } from 'react'

// Which image (if any) is open in the lightbox, for a list of series.
export function useGallery(series) {
  const [active, setActive] = useState(null) // { series, index } | null

  const open = useCallback((seriesIndex, index) => setActive({ series: seriesIndex, index }), [])
  const close = useCallback(() => setActive(null), [])
  const navigate = useCallback(
    step =>
      setActive(current => {
        if (!current) return current
        const count = series[current.series].images.length
        return { ...current, index: (current.index + step + count) % count }
      }),
    [series],
  )

  const current = active ? series[active.series] : null

  return {
    images: current?.images ?? [],
    index: active?.index ?? null,
    title: current?.name ?? '',
    open,
    close,
    navigate,
  }
}
