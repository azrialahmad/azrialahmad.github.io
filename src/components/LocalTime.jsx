import { PERSON } from '../data/content'
import { useLocalTime } from '../hooks/useLocalTime'

export default function LocalTime({ withCity = true }) {
  const time = useLocalTime(PERSON.timeZone)
  const [hh, mm] = (time ?? '--:--').split(':')

  return (
    <span className="local-time">
      <span className="local-time__dot" aria-hidden="true" />
      {withCity && <span>{PERSON.city}&nbsp;</span>}
      <time aria-label={time ? `Local time ${time}` : undefined}>
        {hh}
        <span className="local-time__colon" aria-hidden="true">:</span>
        {mm}
      </time>
      &nbsp;{PERSON.timeZoneLabel}
    </span>
  )
}
