import { motion, useReducedMotion } from 'framer-motion'
import { pageTransition } from '@/lib/motion'

/**
 * Wraps each route's content so navigation fades + drifts vertically.
 * Exit is handled by AnimatePresence in App.tsx.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      variants={reduced ? undefined : pageTransition}
      initial={reduced ? { opacity: 1 } : 'hidden'}
      animate={reduced ? undefined : 'visible'}
      exit={reduced ? undefined : 'exit'}
    >
      {children}
    </motion.div>
  )
}