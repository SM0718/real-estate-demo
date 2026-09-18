import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { IMAGES } from '@/data/images'
import { Reveal } from '@/components/shared/Reveal'

/**
 * Full-bleed statement break. The image stays pinned to the viewport while
 * the page scrolls over it (same pinned-parallax technique as the heroes),
 * with an oversized serif line set above it.
 */
export function ImageBreak() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '100%'])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[72vh] items-center overflow-hidden bg-ink"
      aria-label="Our belief"
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={IMAGES.aerial}
          alt="Aerial view across an urban business district"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/35" />

      <div className="container-x relative z-10 py-28 md:py-36">
        <Reveal className="mb-8">
          <div className="flex items-center gap-4">
            <span className="font-serif text-sm italic text-gold">◆</span>
            <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
            <span className="eyebrow text-bone/60">Built to hold</span>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="max-w-4xl serif-display text-[clamp(2.2rem,5.5vw,5rem)] leading-[1.05] text-bone">
            WE DON&apos;T JUST BUILD SPACES. WE BUILD THE ENVIRONMENTS WHERE
            BUSINESSES <span className="italic text-gold">COMPOUND.</span>
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-8">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-bone/50">
            Owned · Operated · Improved over decades
          </p>
        </Reveal>
      </div>
    </section>
  )
}