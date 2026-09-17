import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

interface AnimatedButtonProps {
  to?: string
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'outline' | 'ghost' | 'light' | 'gold'
  size?: 'default' | 'lg' | 'sm'
  className?: string
  ariaLabel?: string
  arrows?: boolean
  external?: boolean
}

/**
 * Premium editorial CTA. The label nudges left and the arrow slides in on
 * hover. Works with react-router links, external anchors or buttons.
 */
export function AnimatedButton({
  to,
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'default',
  className,
  ariaLabel,
  external = false,
}: AnimatedButtonProps) {
  const reduced = useReducedMotion()
  const content = (
    <motion.span
      className="relative inline-flex items-center gap-3"
      whileHover={reduced ? undefined : 'hover'}
    >
      <motion.span
        variants={reduced ? undefined : { hover: { x: -6 } }}
        className="inline-block"
      >
        {children}
      </motion.span>
      <motion.span
        variants={reduced ? undefined : { hover: { x: 4 } }}
        className="inline-flex items-center overflow-hidden"
      >
        <ArrowRight
          className="h-3.5 w-3.5"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </motion.span>
    </motion.span>
  )

  const classes = cn(buttonVariants({ variant, size }), className)

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} aria-label={ariaLabel} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={classes}>
      {content}
    </button>
  )
}