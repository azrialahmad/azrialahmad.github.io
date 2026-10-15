import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { PERSON } from './data/content'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production HTML is prerendered (scripts/prerender.js), so hydrate it.
// In dev the root is empty and we render from scratch.
if (container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}

console.log(
  '%cazrial.%c\nCurious how this is built? The source is open:\n' + PERSON.repo,
  'font: italic 300 40px "Cormorant Garamond Variable", Georgia, serif; color: #3451d1;',
  'font: 13px system-ui, sans-serif; color: inherit;',
)
