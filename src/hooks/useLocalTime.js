import { useEffect, useState } from 'react'

// Current wall-clock time in a given IANA time zone, e.g. "14:32".
// Null until mounted, so server and client render the same placeholder.
export function useLocalTime(timeZone) {
  const [time, setTime] = useState(null)

  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
    const tick = () => setTime(format.format(new Date()))
    tick()
    const id = setInterval(tick, 15_000)
    return () => clearInterval(id)
  }, [timeZone])

  return time
}
