import '@testing-library/jest-dom/vitest'

// jsdom does not implement IntersectionObserver (used by scroll-reveal)
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback
  }

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

globalThis.IntersectionObserver = globalThis.IntersectionObserver || MockIntersectionObserver

// jsdom does not implement matchMedia (used by theme detection)
globalThis.matchMedia = globalThis.matchMedia || ((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent() {
    return false
  },
}))

// jsdom does not implement scrollIntoView (used by nav links)
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}

// jsdom does not implement scrollTo (used by the navbar logo)
if (!window.scrollTo) {
  window.scrollTo = () => {}
}
