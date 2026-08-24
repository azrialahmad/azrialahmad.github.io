export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-name">Azrial Ahmad<br />Haidar Daffi Zuhri</p>

          <nav aria-label="Footer navigation">
            <ul className="footer-links">
              <li>
                <a
                  href="https://github.com/azrialahmad"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:azrialahmad@gmail.com"
                  aria-label="Send an email"
                >
                  Email
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} — built with React &amp; Vite
          </p>

          {/* dot arc decoration — like the reference image */}
          <div className="dot-arc" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
