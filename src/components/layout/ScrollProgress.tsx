import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/**
 * Ultra-thin gold scroll progress indicator fixed at the top of the viewport.
 */
export function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gold/80"
      style={reduced ? { scaleX: 0 } : { scaleX }}
      role="presentation"
    />
  )
}