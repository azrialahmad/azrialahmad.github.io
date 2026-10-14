import { useCallback, useEffect, useRef, useState } from 'react'

// Copies text to the clipboard and reports `copied` for a moment afterwards.
export function useCopy(resetAfter = 2000) {
  const [copied, setCopied] = useState(false)
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(
    async text => {
      try {
        await navigator.clipboard.writeText(text)
      } catch {
        return false
      }
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), resetAfter)
      return true
    },
    [resetAfter],
  )

  return [copied, copy]
}
