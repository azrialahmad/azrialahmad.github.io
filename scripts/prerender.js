// Renders the app to static HTML after `vite build` + the SSR build, so the
// page is readable (and indexable) before any JavaScript runs. The client
// bundle then hydrates the markup instead of rebuilding it.
import { readFile, writeFile, readdir, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const serverDir = path.join(root, 'dist-server')

const { render } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)

const templatePath = path.join(dist, 'index.html')
const template = await readFile(templatePath, 'utf8')
const appHtml = render()

if (!template.includes('<!--app-->')) {
  throw new Error('index.html is missing the <!--app--> placeholder')
}

// Preload the latin display face used by the hero so the name renders in
// Cormorant from the first paint instead of swapping in late.
const assets = await readdir(path.join(dist, 'assets'))
const preloads = assets
  .filter(file => /^cormorant-garamond-latin-wght-italic-.*\.woff2$/.test(file))
  .map(file => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ')

const html = template
  .replace('<!--app-->', appHtml)
  .replace('<!--preload-->', preloads)

await writeFile(templatePath, html)
await rm(serverDir, { recursive: true, force: true })

console.log(`prerendered index.html (${(html.length / 1024).toFixed(1)} kB, ${preloads ? 'font preloaded' : 'no font preload'})`)
