import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  items: string[]
  className?: string
  itemClassName?: string
  separator?: string
  duration?: number
  edgeClassName?: string
}

/**
 * Infinite horizontal ticker. The item list is duplicated so the inner row
 * can translate by -50% for a seamless loop. Reduced-motion users get a
 * static (non-animated) strip.
 */
export function Marquee({
  items,
  className,
  itemClassName,
  separator = '✦',
  duration = 36,
  edgeClassName = 'from-bone',
}: MarqueeProps) {
  const reduced = useReducedMotion()
  const sequence = [...items, ...items]

  return (
    <div className={cn('relative overflow-hidden whitespace-nowrap', className)} aria-hidden="true">
      <motion.ul
        className="inline-flex items-center"
        animate={reduced ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {sequence.map((item, i) => (
          <li
            key={i}
            className={cn(
              'flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10',
              itemClassName,
            )}
          >
            <span>{item}</span>
            <span className="font-serif italic">{separator}</span>
          </li>
        ))}
      </motion.ul>

      {/* Fade edges */}
      <div
        className={cn(
          'pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r to-transparent',
          edgeClassName,
        )}
      />
      <div
        className={cn(
          'pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l to-transparent',
          edgeClassName,
        )}
      />
    </div>
  )
}