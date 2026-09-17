import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { navItems } from '@/data/company'

interface NavbarProps {
  onOpenMenu: () => void
}

/**
 * Sticky navigation. Transparent with light text over heroes, then a solid
 * bone surface with a hairline border and blur once the user scrolls.
 */
export function Navbar({ onOpenMenu }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const reduced = useReducedMotion()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setScrolled(window.scrollY > 48)
  }, [location.pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[80] transition-all duration-500',
        scrolled
          ? 'bg-bone/85 text-ink backdrop-blur-md'
          : 'bg-gradient-to-b from-ink/60 to-transparent text-bone',
      )}
      style={{
        borderBottom: scrolled ? '1px solid rgba(17,17,17,0.10)' : '1px solid transparent',
      }}
    >
      <div className="container-x flex h-20 items-center justify-between">
        {/* Wordmark */}
        <Link to="/" className="relative z-10 flex flex-col leading-none" aria-label="Vantage — Home">
          <span
            className={cn(
              'text-[1.05rem] font-medium tracking-[0.3em] transition-colors duration-300',
            )}
          >
            VANTAGE
          </span>
          <span
            className={cn(
              'mt-0.5 text-[0.45rem] font-medium uppercase tracking-[0.45em] transition-colors duration-300',
              scrolled ? 'text-muted' : 'text-bone/60',
            )}
          >
            Commercial Real Estate
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'group relative py-2 text-[0.68rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300',
                  scrolled ? 'text-ink/80 hover:text-ink' : 'text-bone/85 hover:text-bone',
                  isActive && (scrolled ? 'text-ink' : 'text-bone'),
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 h-px bg-gold transition-all duration-300',
                      isActive ? 'w-full' : 'w-0 group-hover:w-full',
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className={cn(
              'hidden items-center border px-6 py-3 text-[0.65rem] font-medium uppercase tracking-[0.25em] transition-all duration-300 md:inline-flex',
              scrolled
                ? 'border-ink/25 text-ink hover:bg-ink hover:text-bone'
                : 'border-bone/40 text-bone hover:bg-bone hover:text-ink',
            )}
          >
            Contact Us
          </Link>

          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open menu"
            className={cn(
              'flex h-10 w-10 items-center justify-center transition-colors lg:hidden',
              scrolled ? 'text-ink' : 'text-bone',
            )}
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Hidden motion ref: reduces motion never blocks normal nav */}
      {reduced ? null : null}
    </header>
  )
}