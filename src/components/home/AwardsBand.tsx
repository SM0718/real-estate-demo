import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { awards } from '@/data/awards'
import { Reveal } from '@/components/shared/Reveal'
import { AnimatedWords } from '@/components/shared/AnimatedText'

/**
 * Editorial awards & recognition band. Rows reveal on scroll and lift with a
 * gold cue on hover.
 */
export function AwardsBand() {
  const reduced = useReducedMotion()

  return (
    <section className="relative bg-sand py-24 md:py-32" aria-label="Awards and recognition">
      <div className="container-x">
        <Reveal className="mb-12 md:mb-16">
          <div className="flex items-center gap-4">
            <span className="font-serif text-sm italic text-gold">◆</span>
            <span className="h-px w-8 bg-line" aria-hidden="true" />
            <span className="eyebrow text-muted">Recognition</span>
          </div>
        </Reveal>

        <h2 className="serif-display max-w-3xl text-[clamp(2.4rem,5.5vw,4.5rem)] text-ink">
          <AnimatedWords text="MEASURED BY THE WORK, JUDGED BY THE MARKET." />
        </h2>

        <div className="mt-14 border-t border-ink/10 md:mt-20">
          {awards.map((award, i) => (
            <Reveal key={`${award.year}-${award.title}`} delay={i * 0.04}>
              <div className="group flex flex-col gap-3 border-b border-ink/10 py-6 transition-colors duration-300 hover:border-gold/40 md:flex-row md:items-center md:gap-12 md:py-8">
                <span className="font-serif text-lg italic text-gold md:w-20 md:text-xl">
                  {award.year}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="serif-display text-xl text-ink transition-colors duration-300 group-hover:text-[#3a3a3a] md:text-2xl">
                    {award.title}
                  </h3>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.24em] text-muted">
                    {award.org}
                  </p>
                </div>
                <motion.span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink md:self-center"
                  animate={reduced ? { rotate: 0 } : undefined}
                  whileHover={reduced ? undefined : { rotate: 45, borderColor: '#b89b5e' }}
                  transition={{ duration: 0.35 }}
                  aria-hidden="true"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </motion.span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}