import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { testimonials } from '@/data/company'
import { AnimatedWords } from '@/components/shared/AnimatedText'
import { Reveal } from '@/components/shared/Reveal'

export function Testimonials() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const active = testimonials[index]

  const next = () => setIndex((i) => (i + 1) % testimonials.length)
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-bone md:py-36" aria-label="Client testimonials">
      <span
        className="pointer-events-none absolute -left-10 -bottom-24 select-none font-serif text-[clamp(14rem,36vw,30rem)] leading-none text-bone/[0.03]"
        aria-hidden="true"
      >
        &rdquo;
      </span>

      <div className="container-x relative">
        <Reveal className="mb-14">
          <div className="flex items-center gap-4">
            <span className="font-serif text-sm italic text-gold">08</span>
            <span className="h-px w-8 bg-line-light" aria-hidden="true" />
            <span className="eyebrow text-bone/60">Client Perspectives</span>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-20">
          <div>
            <h2 className="serif-display text-[clamp(2.2rem,5vw,4.25rem)] text-bone">
              <AnimatedWords text="TRUSTED BY PEOPLE BUILDING WHAT&apos;S NEXT." />
            </h2>

            <div className="mt-14 min-h-[220px] md:min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="serif-display text-2xl leading-normal text-bone/90 md:text-3xl">
                    &ldquo;{active.quote}&rdquo;
                  </p>
                  <footer className="mt-8 flex items-center gap-4">
                    <span className="h-px w-8 bg-gold" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.18em] text-bone">
                        {active.name}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.22em] text-bone/50">
                        {active.role} · {active.company}
                      </p>
                    </div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between border-t border-line-light pt-6 lg:justify-end lg:gap-8 lg:border-t-0 lg:pt-0">
            <span className="font-serif text-sm italic text-gold">
              {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone transition-colors hover:border-gold hover:text-gold focus-visible:outline-1"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M11 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone transition-colors hover:border-gold hover:text-gold focus-visible:outline-1"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <Reveal className="mt-14">
          <p className="text-[0.6rem] uppercase tracking-[0.22em] text-bone/40">
            Client names and organizations are fictional and featured for demonstration purposes.
          </p>
        </Reveal>
      </div>
    </section>
  )
}