import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { navItems, COMPANY } from '@/data/company'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

/**
 * Full-screen mobile menu. Numbered links reveal with a staggered upward
 * slide, followed by contact details and a large CTA.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const reduced = useReducedMotion()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col bg-ink text-bone lg:hidden"
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="container-x flex h-20 items-center justify-between">
            <span className="text-[1.05rem] font-medium tracking-[0.3em]">VANTAGE</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="container-x flex flex-1 flex-col justify-center" aria-label="Mobile">
            <ul className="space-y-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className="group flex items-baseline gap-5 py-3"
                  >
                    <span className="font-serif text-sm italic text-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="serif-display text-5xl text-bone transition-colors group-hover:text-gold">
                      {item.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + navItems.length * 0.06, duration: 0.5 }}
              >
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="group flex items-baseline gap-5 py-3"
                >
                  <span className="font-serif text-sm italic text-gold">
                    {String(navItems.length + 1).padStart(2, '0')}
                  </span>
                  <span className="serif-display text-5xl text-bone transition-colors group-hover:text-gold">
                    Contact
                  </span>
                </Link>
              </motion.li>
            </ul>
          </nav>

          <motion.div
            className="container-x border-t border-bone/15 pb-10 pt-8"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="eyebrow text-bone/50">{COMPANY.fullName}</p>
            <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
              {COMPANY.cities.map((city) => (
                <span key={city} className="text-[0.68rem] uppercase tracking-[0.25em] text-bone/70">
                  {city}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-2">
              <a href={`mailto:${COMPANY.email}`} className="text-sm text-bone/80">
                {COMPANY.email}
              </a>
              <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="text-sm text-bone/80">
                {COMPANY.phone}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}