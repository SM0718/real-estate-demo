import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { IMAGES } from '@/data/images'
import { AnimatedButton } from '@/components/shared/AnimatedButton'
import { RevealLines } from '@/components/shared/AnimatedText'

export function Hero() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Translate the background down by exactly the amount the hero has scrolled
  // off-screen so the image stays pinned to the viewport while the page
  // content scrolls over it.
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '100%'])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -90])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, reduced ? 1 : 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.45, reduced ? 0.45 : 0.9])
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden bg-ink"
      aria-label="Vantage Commercial Real Estate"
    >
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <motion.div
          className="absolute -inset-y-[12%] inset-x-0"
          initial={{ scale: reduced ? 1.08 : 1.12, opacity: reduced ? 1 : 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <img
            src={IMAGES.tower}
            alt="Modern commercial skyscraper within a business district"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </motion.div>
      </motion.div>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/55 to-ink/35"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute top-1/2 right-8 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
        style={{ opacity: eyebrowOpacity }}
        aria-hidden="true"
      >
        <span className="text-[0.55rem] uppercase tracking-[0.4em] text-bone/50 [writing-mode:vertical-rl]">
          Scroll to explore
        </span>
        <span className="relative block h-20 w-px bg-bone/20">
          <motion.span
            className="absolute left-0 top-0 h-6 w-px bg-gold"
            animate={reduced ? {} : { y: [0, 48], opacity: [1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        className="container-x relative z-10 pb-16 pt-40 md:pb-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="eyebrow mb-8 flex items-center gap-4 text-bone/70"
          initial={{ opacity: reduced ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          <span className="h-px w-10 bg-gold" />
          Commercial Real Estate
        </motion.p>

        <h1 className="serif-display text-bone">
          <RevealLines
            className="text-[clamp(2.9rem,8.5vw,7.75rem)]"
            delay={0.35}
            trigger="mount"
          >
            <span className="block">BUILDING</span>
            <span className="block">THE FUTURE</span>
            <span className="block italic">OF COMMERCE.</span>
          </RevealLines>
        </h1>

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-md text-sm leading-relaxed text-bone/70 md:text-base"
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            We acquire, develop and manage exceptional commercial properties in
            the markets shaping tomorrow&apos;s economy.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatedButton to="/properties" variant="gold" size="lg">
              Explore Properties
            </AnimatedButton>
            <AnimatedButton to="/about" variant="outline" size="lg" className="!border-bone/30 !text-bone hover:!bg-bone/10">
              Our Approach
            </AnimatedButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}