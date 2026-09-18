import { Children } from 'react'
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedWordsProps {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  once?: boolean
  amount?: number
  trigger?: 'scroll' | 'mount'
}

/**
 * Splits a headline into words and reveals them line-by-line with an upward
 * mask. Handles the large editorial headlines used across the site.
 * `trigger="mount"` animates as soon as the component mounts instead of
 * waiting for the IntersectionObserver, so hero headlines always appear on
 * navigation-triggered remounts.
 */
export function AnimatedWords({
  text,
  className,
  delay = 0,
  as: Tag = 'span',
  once = true,
  amount = 0.6,
  trigger = 'scroll',
}: AnimatedWordsProps) {
  const reduced = useReducedMotion()
  const words = text.split(' ')
  const mount = trigger === 'mount'

  return (
    <Tag className={cn('inline-block', className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={
              reduced ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }
            }
            animate={
              reduced || !mount ? undefined : { y: '0%', opacity: 1 }
            }
            whileInView={
              reduced || mount ? undefined : { y: '0%', opacity: 1 }
            }
            viewport={{ once, amount }}
            transition={{
              delay: delay + i * 0.045,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {'\u00A0'}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/**
 * Line-by-line mask reveal for multi-line headline text where each line
 * is passed as a child element. Lines slide up from beneath an overflow mask.
 * `trigger="mount"` animates as soon as the component mounts instead of
 * waiting for the IntersectionObserver.
 */
export function RevealLines({
  children,
  delay = 0,
  className,
  once = true,
  amount = 0.4,
  trigger = 'scroll',
}: {
  children: ReactNode
  delay?: number
  className?: string
  once?: boolean
  amount?: number
  trigger?: 'scroll' | 'mount'
}) {
  const reduced = useReducedMotion()
  const mount = trigger === 'mount'
  return (
    <span className={cn('block', className)}>
      {Children.map(children, (child, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="block will-change-transform"
            initial={reduced ? { y: 0 } : { y: '110%' }}
            animate={reduced || !mount ? undefined : { y: '0%' }}
            whileInView={reduced || mount ? undefined : { y: '0%' }}
            viewport={{ once, amount }}
            transition={{ delay: delay + i * 0.09, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {child}
          </motion.span>
        </span>
      ))}
    </span>
  )
}