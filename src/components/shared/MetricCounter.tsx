import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MetricCounterProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
  className?: string
  labelClassName?: string
  dark?: boolean
}

/**
 * Counts from 0 to `value` when scrolled into view using rAF for a smooth,
 * premium feel. Respects prefers-reduced-motion.
 */
export function MetricCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  label,
  className,
  labelClassName,
  dark = false,
}: MetricCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(reduced ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(value)
      return
    }
    let raf = 0
    const duration = 1600
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplay(parseFloat((value * eased).toFixed(decimals)))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, decimals, reduced])

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <div ref={ref} className={cn('flex flex-col', className)}>
      <span
        className={cn(
          'serif-display text-5xl md:text-6xl lg:text-7xl tabular-nums',
          dark ? 'text-bone' : 'text-ink',
        )}
        aria-label={`${prefix}${formatted}${suffix} ${label}`}
      >
        {prefix}
        {formatted}
        {suffix}
      </span>
      <span
        className={cn(
          'mt-4 max-w-[11rem] text-[0.6875rem] uppercase tracking-[0.22em]',
          dark ? 'text-bone/60' : 'text-muted',
          labelClassName,
        )}
      >
        {label}
      </span>
    </div>
  )
}