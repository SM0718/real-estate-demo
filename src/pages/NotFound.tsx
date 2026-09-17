import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedButton } from '@/components/shared/AnimatedButton'
import { Seo } from '@/components/seo/Seo'

export default function NotFound() {
  const reduced = useReducedMotion()
  return (
    <>
      <Seo title="Page Not Found | Vantage Commercial Real Estate" />
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 py-32 text-center text-bone">
        <span
          className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 select-none font-serif text-[clamp(14rem,42vw,36rem)] leading-none text-bone/[0.04]"
          aria-hidden="true"
        >
          404
        </span>

        <motion.div
          className="relative z-10"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow mb-8 flex items-center justify-center gap-4 text-bone/60">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            Error 404
          </p>
          <h1 className="serif-display text-[clamp(2.6rem,7vw,6rem)] text-bone">
            THIS SPACE IS
            <br />
            CURRENTLY
            <br />
            <span className="italic">UNAVAILABLE.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-bone/60">
            The page you are looking for may have been moved, or does not exist
            within our portfolio.
          </p>
          <div className="mt-10 flex justify-center">
            <AnimatedButton to="/" variant="gold" size="lg">
              Return Home
            </AnimatedButton>
          </div>
        </motion.div>
      </section>
    </>
  )
}