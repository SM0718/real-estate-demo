import { useRef } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * Subtle floating "Let's Talk" CTA on desktop. Fades out when the user
 * reaches the bottom of the page (footer / contact area).
 */
export function FloatingCTA() {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const visible = useInView(sentinelRef, { amount: 0.6 })
  const reduced = useReducedMotion()

  return (
    <>
      <div ref={sentinelRef} className="pointer-events-none absolute bottom-0 h-24 w-full" aria-hidden="true" />
      <AnimatePresence>
        {!visible && (
          <motion.div
            className="fixed right-8 bottom-8 z-[70] hidden lg:block"
            initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/contact"
              className="group flex items-center gap-3 border border-ink/20 bg-bone/90 px-6 py-4 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-ink backdrop-blur transition-colors hover:border-gold"
            >
              Let&apos;s Talk
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}