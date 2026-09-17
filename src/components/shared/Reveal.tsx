import { motion, useReducedMotion } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
  amount?: number
  as?: 'div' | 'section' | 'li' | 'span' | 'p'
}

/**
 * Generic scroll-reveal wrapper. Fades + slides content into view once.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
  amount = 0.2,
  as: Tag = 'div',
}: RevealProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion(Tag)

  return (
    <MotionTag
      className={className}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}