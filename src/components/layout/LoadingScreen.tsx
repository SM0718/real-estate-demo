import { motion, useReducedMotion } from 'framer-motion'

/**
 * Brief institutional loading sequence: the wordmark draws in followed
 * by a hairline expansion. Kept deliberately short (~1.2s).
 */
export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-ink"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          onAnimationComplete={() => {
            if (!reduced) setTimeout(onComplete, 1150)
            else onComplete()
          }}
        >
          <motion.span
            className="block text-3xl font-medium tracking-[0.4em] text-bone"
            initial={reduced ? { opacity: 1, y: 0 } : { y: '120%', opacity: 0 }}
            animate={reduced ? undefined : { y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            VANTAGE
          </motion.span>
        </motion.div>
        <motion.span
          className="mt-3 text-[0.55rem] font-medium uppercase tracking-[0.5em] text-bone/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          Commercial Real Estate
        </motion.span>
        <motion.div
          className="mt-8 h-px w-40 overflow-hidden bg-bone/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-gold/80"
            initial={{ scaleX: 0 }}
            animate={reduced ? { scaleX: 1 } : { scaleX: 1 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}