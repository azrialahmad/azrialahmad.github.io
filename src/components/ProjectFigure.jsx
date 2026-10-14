import { useEffect, useRef } from 'react'
import { useInView } from '../hooks/useInView'

// Small line-drawn "plates" that explain each project at a glance, in the
// same blue ink as the rest of the page. Animations only run while visible.

const AIM_TARGETS = [
  { x: 92, y: 196, n: 1 },
  { x: 196, y: 102, n: 2 },
  { x: 306, y: 176, n: 3 },
]

function AimFigure() {
  return (
    <>
      <rect className="fig__frame" x="24" y="24" width="352" height="232" rx="2" />
      <path
        className="fig__draw fig__dash"
        pathLength="1"
        d="M92 196 C 120 140, 150 110, 196 102 S 280 130, 306 176"
      />
      {AIM_TARGETS.map(t => (
        <g key={t.n} className="fig__target" style={{ '--n': t.n }}>
          <circle className="fig__approach" cx={t.x} cy={t.y} r="22" />
          <circle className="fig__hit" cx={t.x} cy={t.y} r="22" />
          <text className="fig__num" x={t.x} y={t.y + 5} textAnchor="middle">
            {t.n}
          </text>
        </g>
      ))}
      <g className="fig__box">
        <path className="fig__bracket" d="M-34 -22v-12h12M22 -34h12v12M34 22v12h-12M-22 34h-12v-12" />
        <rect className="fig__label-bg" x="-34" y="-52" width="76" height="15" />
        <text className="fig__label" x="-30" y="-41">
          circle 0.97
        </text>
      </g>
      <text className="fig__meta" x="364" y="246" textAnchor="end">
        YOLOv11 · ONNX
      </text>
    </>
  )
}

// Deterministic "photos": subject positions clustering on the thirds.
const DOTS = [
  [140, 78], [152, 88], [135, 91], [158, 76], [147, 97],
  [258, 79], [246, 90], [266, 88], [251, 72],
  [141, 150], [155, 140], [134, 138], [149, 156],
  [259, 150], [245, 139], [266, 138], [254, 158], [240, 150],
  [200, 114], [92, 58], [318, 182], [212, 100], [110, 176],
]
const BARS = [18, 34, 56, 40, 72, 48, 30, 14]

function CompositionFigure() {
  return (
    <>
      <rect className="fig__frame" x="40" y="24" width="320" height="180" rx="2" />
      <g className="fig__thirds">
        <line x1="146.7" y1="24" x2="146.7" y2="204" />
        <line x1="253.3" y1="24" x2="253.3" y2="204" />
        <line x1="40" y1="84" x2="360" y2="84" />
        <line x1="40" y1="144" x2="360" y2="144" />
      </g>
      {DOTS.map(([x, y], i) => (
        <circle key={i} className="fig__dot" cx={x} cy={y} r="3.5" style={{ '--n': i }} />
      ))}
      {BARS.map((h, i) => (
        <rect
          key={i}
          className="fig__bar"
          x={46 + i * 40}
          y={256 - h / 2}
          width="28"
          height={h / 2}
          style={{ '--n': i }}
        />
      ))}
      <line className="fig__axis" x1="40" y1="256.5" x2="360" y2="256.5" />
      <text className="fig__meta" x="360" y="16" textAnchor="end">
        n = 90+
      </text>
    </>
  )
}

const PATHS = {
  linear: 'M60 232 L336 72',
  eased: 'M60 232 C 150 228, 250 90, 336 72',
  human: 'M60 232 C 96 196, 132 92, 268 70 C 318 62, 356 56, 350 70 C 346 79, 340 74, 336 72',
}

function TrajectoryFigure() {
  return (
    <>
      <path className="fig__draw fig__line fig__line--1" pathLength="1" d={PATHS.linear} />
      <path className="fig__draw fig__line fig__line--2" pathLength="1" d={PATHS.eased} />
      <path className="fig__draw fig__line fig__line--3" pathLength="1" d={PATHS.human} />
      <circle className="fig__start" cx="60" cy="232" r="5" />
      <circle className="fig__goal" cx="336" cy="72" r="16" />
      <circle className="fig__goal-core" cx="336" cy="72" r="3" />
      <path className="fig__cursor" d="M0 0 L0 15 L4 11 L7 18 L10 17 L7 10 L12 10 Z">
        <animateMotion
          dur="3.4s"
          repeatCount="indefinite"
          path={PATHS.human}
          keyPoints="0;1;1"
          keyTimes="0;0.7;1"
          calcMode="spline"
          keySplines="0.45 0 0.25 1;0 0 1 1"
        />
      </path>
      <g className="fig__legend">
        <line className="fig__line--1" x1="40" y1="34" x2="62" y2="34" />
        <text x="70" y="38">01 baseline</text>
        <line className="fig__line--2" x1="40" y1="52" x2="62" y2="52" />
        <text x="70" y="56">02</text>
        <line className="fig__line--3" x1="40" y1="70" x2="62" y2="70" />
        <text x="70" y="74">03 biomechanical</text>
      </g>
    </>
  )
}

// Fig — fivesight: audio in, transcript lines with timestamps, notes out.
const WAVE = [0.35, 0.6, 0.9, 0.5, 1, 0.7, 0.4, 0.85, 0.55, 0.95, 0.45, 0.65, 0.3]
const TRANSCRIPT = [64, 48, 58, 40, 62, 52]
const NOTES = [52, 40, 56, 34]

function TranscriptFigure() {
  return (
    <>
      <text className="fig__meta" x="30" y="50">mic + call</text>
      {WAVE.map((h, i) => (
        <rect
          key={i}
          className="fig__wave"
          x={30 + i * 7.5}
          y={140 - h * 34}
          width="3.5"
          height={h * 68}
          rx="1.75"
          style={{ '--n': i }}
        />
      ))}
      <path className="fig__arrow" d="M134 140 H156 M151 135 L156 140 L151 145" />

      <text className="fig__meta" x="164" y="50">transcript</text>
      <rect className="fig__frame" x="164" y="60" width="104" height="160" rx="2" />
      {TRANSCRIPT.map((w, i) => (
        <g key={i} className="fig__line-in" style={{ '--n': i }}>
          <text className="fig__stamp" x="171" y={87 + i * 24}>
            0:{String(4 + i * 7).padStart(2, '0')}
          </text>
          <rect className="fig__text" x="196" y={82 + i * 24} width={w} height="3" rx="1.5" />
        </g>
      ))}
      <path className="fig__arrow" d="M272 140 H282 M277 135 L282 140 L277 145" />

      <text className="fig__meta" x="286" y="50">notes</text>
      <rect className="fig__frame" x="286" y="60" width="94" height="160" rx="2" />
      <rect className="fig__note-title fig__line-in" x="296" y="74" width="58" height="6" rx="1" style={{ '--n': 6 }} />
      {NOTES.map((w, i) => (
        <g key={i} className="fig__line-in" style={{ '--n': 7 + i }}>
          <circle className="fig__bullet" cx="299" cy={100 + i * 22} r="2" />
          <rect className="fig__text" x="306" y={98.5 + i * 22} width={w} height="3" rx="1.5" />
        </g>
      ))}

      <text className="fig__meta" x="30" y="246">ID · EN</text>
      <text className="fig__meta" x="380" y="246" textAnchor="end">
        local · whisper.cpp
      </text>
    </>
  )
}

// Fig — ai-governance-proxy: scrub → guard → route → judge, with rejections.
const ROUTES = {
  fast: 'M24 140 H187 L205 140 C 216 140, 214 85, 226 85 H286 C 298 85, 296 140, 306 140 H372',
  deep: 'M24 140 H187 L205 140 C 216 140, 214 195, 226 195 H286 C 298 195, 296 140, 306 140 H372',
}

function Stage({ x, y = 124, w = 52, label }) {
  return (
    <g>
      <rect className="fig__stage" x={x} y={y} width={w} height="32" rx="2" />
      <text className="fig__stage-label" x={x + w / 2} y={y + 19.5} textAnchor="middle">
        {label}
      </text>
    </g>
  )
}

function PipelineFigure() {
  return (
    <>
      <path className="fig__wire" d={ROUTES.fast} />
      <path className="fig__wire" d={ROUTES.deep} />
      <path className="fig__wire fig__wire--blocked" d="M138 156 V200" />
      <path className="fig__wire fig__wire--blocked" d="M332 156 V200" />
      <text className="fig__reject" x="138" y="216" textAnchor="middle">400</text>
      <text className="fig__reject" x="332" y="216" textAnchor="middle">422</text>

      {/* Drawn beneath the stages, so requests pass *through* each one. */}
      {['fast', 'deep'].map((route, i) => (
        <circle key={route} className="fig__packet" r="4" cx="0" cy="0">
          <animateMotion dur="4s" begin={`${-i * 2}s`} repeatCount="indefinite" path={ROUTES[route]} />
        </circle>
      ))}

      <circle className="fig__start" cx="24" cy="140" r="5" />
      <Stage x={44} label="PII" />
      <Stage x={112} label="guard" />
      <rect className="fig__stage fig__router" x="187" y="131" width="18" height="18" transform="rotate(45 196 140)" />
      <Stage x={226} y={70} w={60} label="Flash" />
      <Stage x={226} y={180} w={60} label="70B" />
      <Stage x={306} label="judge" />
      <circle className="fig__goal" cx="380" cy="140" r="8" />
      <circle className="fig__goal-core" cx="380" cy="140" r="3" />

      <text className="fig__meta" x="24" y="40">simple → fast model</text>
      <text className="fig__meta" x="24" y="252">complex → large model</text>
    </>
  )
}

const FIGURES = {
  aim: AimFigure,
  composition: CompositionFigure,
  trajectories: TrajectoryFigure,
  transcript: TranscriptFigure,
  pipeline: PipelineFigure,
}

export default function ProjectFigure({ type, number, caption }) {
  const ref = useRef(null)
  const svgRef = useRef(null)
  const inView = useInView(ref, '0px 0px -15% 0px')
  const Figure = FIGURES[type]

  // SMIL animations (the travelling cursor) aren't paused by CSS.
  useEffect(() => {
    const svg = svgRef.current
    if (!svg?.pauseAnimations) return
    if (inView) svg.unpauseAnimations()
    else svg.pauseAnimations()
  }, [inView])

  if (!Figure) return null

  return (
    <figure ref={ref} className={`fig fig--${type}`} data-play={inView ? 'true' : 'false'}>
      <svg ref={svgRef} viewBox="0 0 400 280" role="img" aria-label={`Illustration: ${caption}`}>
        <Figure />
      </svg>
      <figcaption>
        <span>Fig. {number}</span> {caption}
      </figcaption>
    </figure>
  )
}
