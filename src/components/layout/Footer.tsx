import { Link } from 'react-router-dom'
import { COMPANY } from '@/data/company'
import { SectionDivider } from '@/components/shared/SectionDivider'

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Properties', to: '/properties' },
      { label: 'Services', to: '/services' },
      { label: 'Investments', to: '/investments' },
      { label: 'Insights', to: '/insights' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative bg-ink py-16 text-bone md:py-24" aria-label="Footer">
      <div className="container-x">
        <SectionDivider index="10" label="Footer" dark className="mb-14" />

        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + tagline */}
          <div>
            <Link to="/" className="inline-flex flex-col leading-none" aria-label="Vantage — Home">
              <span className="text-[1.6rem] font-medium tracking-[0.32em] text-bone">
                VANTAGE
              </span>
              <span className="mt-1.5 text-[0.55rem] font-medium uppercase tracking-[0.48em] text-bone/50">
                Commercial Real Estate
              </span>
            </Link>
            <p className="mt-8 max-w-xs font-serif text-lg italic leading-relaxed text-bone/60">
              &ldquo;{COMPANY.tagline}&rdquo;
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="eyebrow text-bone/50">{col.title}</h3>
              <ul className="mt-6 space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-bone/80 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="eyebrow text-bone/50">Connect</h3>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-bone/80 transition-colors hover:text-gold"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-bone/80 transition-colors hover:text-gold"
                >
                  Instagram
                </a>
              </li>
            </ul>
            <div className="mt-8 space-y-1.5">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-bone/40">Offices</p>
              {COMPANY.cities.map((c) => (
                <p key={c} className="text-sm text-bone/70">
                  {c}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-bone/12 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-bone/45">
            © 2026 {COMPANY.fullName}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {['Privacy', 'Terms', 'Disclaimer'].map((label) => (
              <a
                key={label}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[0.65rem] uppercase tracking-[0.22em] text-bone/45 transition-colors hover:text-gold"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 text-[0.6rem] uppercase tracking-[0.2em] text-bone/30">
          Vantage is a fictional company built for demonstration purposes. All figures and
          references are illustrative.
        </p>
      </div>
    </footer>
  )
}