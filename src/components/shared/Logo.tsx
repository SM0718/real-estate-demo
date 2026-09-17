import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  light?: boolean
}

/**
 * Minimal wordmark lockup: VANTAGE with COMMERCIAL REAL ESTATE beneath.
 */
export function Logo({ className, light = false }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn('group inline-flex flex-col leading-none', className)}
      aria-label="Vantage Commercial Real Estate — Home"
    >
      <span
        className={cn(
          'text-[1.4rem] font-medium tracking-[0.28em] transition-colors duration-300',
          light ? 'text-bone' : 'text-ink',
        )}
      >
        VANTAGE
      </span>
      <span
        className={cn(
          'mt-1 text-[0.5rem] font-medium uppercase tracking-[0.42em] transition-colors duration-300',
          light ? 'text-bone/60' : 'text-muted',
        )}
      >
        Commercial Real Estate
      </span>
    </Link>
  )
}