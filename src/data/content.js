// All copy and structured content for the site lives here, so components stay
// presentational and the text can be edited in one place.

export const PERSON = {
  name: 'Azrial Ahmad Haidar Daffi Zuhri',
  email: 'azrialahmad@gmail.com',
  github: 'https://github.com/azrialahmad',
  repo: 'https://github.com/azrialahmad/portofolio',
  city: 'Yogyakarta',
  country: 'Indonesia',
  timeZone: 'Asia/Jakarta',
  timeZoneLabel: 'WIB',
}

export const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'photography', label: 'Photography' },
  { id: 'design', label: 'Design' },
]

export const ROLES = ['Data Engineering', 'Machine Learning', 'QA', 'Full-Stack Development']

export const DISCIPLINES = [
  'Data Engineering',
  'Machine Learning',
  'Computer Vision',
  'Quality Assurance',
  'Full-Stack',
  'Street Photography',
  'Cosplay Portraits',
  'Editorial Design',
]

export const TOOLKIT = [
  { category: 'Data & AI', items: ['Python', 'Pandas', 'YOLOv11', 'Scikit-learn', 'SQL', 'LLM tooling'] },
  { category: 'Web', items: ['React', 'TypeScript', 'Svelte', 'Node.js', 'HTML/CSS'] },
  { category: 'Tools', items: ['Rust', 'Git', 'GitHub', 'Linux', 'Figma', 'OpenCV'] },
]

const gh = repo => `https://github.com/azrialahmad/${repo}`

// Featured work — each gets an illustrated figure plate (ProjectFigure.jsx).
export const PROJECTS = [
  {
    id: 'fivesight',
    name: 'fivesight',
    figure: 'transcript',
    caption: 'Listen, transcribe, write up',
    description:
      'A meeting notepad for Windows that listens on your own PC. Speech is transcribed locally with whisper.cpp on the GPU; your shorthand is expanded into notes, and Ask answers questions about meetings, your files, and Jira — read-only, every command checked against an exact allowlist. Works in Indonesian, English, or both.',
    tags: ['Rust', 'Svelte', 'TypeScript', 'whisper.cpp', 'Jira'],
    links: [{ href: gh('fivesight'), label: 'Source' }],
  },
  {
    id: 'ai-governance-proxy',
    name: 'ai-governance-proxy',
    figure: 'pipeline',
    caption: 'Governance pipeline',
    description:
      'Gatekeeper, an inline proxy between apps and LLMs: scrubs PII with regex and a local model, blocks prompt injection before any paid call, routes by complexity between Gemini 2.5 Flash and Llama 3.3 70B to save budget, and rejects answers an LLM judge scores as likely hallucinated.',
    tags: ['Python', 'Ollama', 'Gemini', 'Groq', 'LLM-as-a-Judge'],
    links: [{ href: gh('ai-governance-proxy'), label: 'Source' }],
  },
  {
    id: 'osu-aim-assistant',
    name: 'osu-aim-assistant',
    figure: 'aim',
    caption: 'Detection loop',
    description:
      'An AI-powered aim assist tool for osu! using YOLOv11 for real-time target detection and high-performance screen capture. Explores the boundary between computer vision and game interaction.',
    tags: ['Python', 'YOLOv11', 'OpenCV', 'ONNX', 'Computer Vision'],
    links: [{ href: gh('osu-aim-assistant'), label: 'Source' }],
  },
  {
    id: 'virtual-photography-analysis',
    name: 'virtual-photography-analysis',
    figure: 'composition',
    caption: 'Composition study',
    description:
      'A data analysis project that explores a dataset of 90+ top-rated virtual photos from gaming to uncover the key visual and compositional characteristics behind a successful gaming photograph.',
    tags: ['Python', 'Pandas', 'Jupyter', 'Visualization'],
    links: [{ href: gh('virtual-photography-analysis'), label: 'Source' }],
  },
  {
    id: 'mouse-movements',
    name: 'mouse-movements',
    figure: 'trajectories',
    caption: 'Three trajectories',
    description:
      'An interactive, side-by-side visualizer for three mouse movement algorithms commonly used in aimbots — from a simple linear baseline to a full biomechanical model.',
    tags: ['Vite', 'JavaScript', 'Pico CSS'],
    links: [
      { href: 'https://azrialahmad.is-a.dev/mousemovements/', label: 'Live demo' },
      { href: gh('mousemovements'), label: 'Source' },
    ],
  },
]

// Everything else worth a look, as a compact index.
export const ARCHIVE = [
  {
    name: 'agent-guild',
    language: 'TypeScript',
    description:
      'A desktop companion that turns live coding-agent activity into pixel characters — with short adventures while you wait.',
    href: gh('agent-guild'),
  },
  {
    name: 'apex-pity-tracker',
    language: 'React',
    description:
      'Zero-server Apex Legends heirloom pity tracker that parses EA data exports entirely in the browser.',
    href: 'https://azrialahmad.is-a.dev/apex-pity-tracker/',
    live: true,
  },
  {
    name: 'Arduino-Mouse-Passthrough',
    language: 'C++',
    description:
      'USB host-to-device mouse passthrough on an ATmega32U4 with 16-bit movement precision.',
    href: gh('Arduino-Mouse-Passthrough'),
  },
]

export const PUBLICATIONS = [
  {
    id: 'zuhri2025yolov12',
    title:
      'A Comparative Analysis of YOLOv12 Model Sizes for Road Damage Detection on an Indonesian Dataset',
    authors: ['Azrial Ahmad Haidar Daffi Zuhri', 'Dhomas Hatta Fudholi', 'Rahadian Kurniawan', 'Tisara Sita'],
    // BibTeX wants "Last, First" — Indonesian names have no formal surname, so
    // the final name is used as the family name, as IEEE indexes it.
    bibAuthors: [
      'Zuhri, Azrial Ahmad Haidar Daffi',
      'Fudholi, Dhomas Hatta',
      'Kurniawan, Rahadian',
      'Sita, Tisara',
    ],
    venue: '10th International Conference on Information Technology and Digital Application (ICITDA)',
    publisher: 'IEEE',
    library: 'IEEE Xplore',
    year: '2025',
    href: 'https://ieeexplore.ieee.org/document/11332249',
  },
]

export function toBibTeX(pub) {
  return [
    `@inproceedings{${pub.id},`,
    `  title     = {${pub.title}},`,
    `  author    = {${pub.bibAuthors.join(' and ')}},`,
    `  booktitle = {${pub.venue}},`,
    `  publisher = {${pub.publisher}},`,
    `  year      = {${pub.year}},`,
    `  url       = {${pub.href}}`,
    '}',
  ].join('\n')
}

// Alt text keyed by image filename (without extension). Images without an
// entry still render, with a generic numbered description.
export const ALT_TEXT = {
  'street-1': 'Morning haze over a quiet street lined with red-and-white flags, a motorbike riding toward the camera',
  'street-2': 'A petrol station on a wide road in late-afternoon light, a lone motorbike pulling in',
  'street-3': 'An elderly woman resting barefoot on a park bench, cyclists passing behind her',
  'street-4': 'Looking up through a market hall at a blue glass skylight hung with banners',
  'street-5': 'An old man sitting on a stool in a narrow market corridor strung with red and white decorations',
  'street-6': 'A man in a batik shirt working at a roadside stall beside parked motorbikes',
  'street-7': 'A football team in red celebrating on a pitch, arms raised toward the sky',
  'cosplay-1': 'A cosplayer in a blood-spattered shirt and chainsaw mask mid-leap on a concert stage',
  'cosplay-2': 'A cosplayer in white robes and goggles holding a sword beneath a large tree',
  'cosplay-3': 'A cosplayer in a silver wig and straw hat smiling behind a mask in a busy mall',
  'cosplay-4': 'A cosplayer in a witch hat and red robe reaching a gloved hand toward the camera',
  'cosplay-5': 'A cosplayer in a red sweater dress aiming forward under neon mall lights',
  'cosplay-6': 'A cosplayer with violet hair and a long grey coat on a rooftop at dusk',
  'design-1': 'Poster reading “Bike and Cats” in bold red lettering above a smiling cyclist holding a cat',
  'design-2': 'Editorial cover of a figure in a white shirt walking away, red brush calligraphy across the frame',
  'design-2-3': 'Blue duotone social post about managing scholarship money, set in an italic serif headline',
  'design-4': 'Product promo for a sticker capsule on a yellow background with repeated purple type',
}
