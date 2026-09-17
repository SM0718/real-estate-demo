import { motion, useReducedMotion } from 'framer-motion'
import { IMAGES } from '@/data/images'
import { ParallaxImage } from '@/components/shared/ParallaxImage'
import { RevealLines } from '@/components/shared/AnimatedText'
import { Reveal } from '@/components/shared/Reveal'
import { AnimatedButton } from '@/components/shared/AnimatedButton'

const stats = [
  { value: '24+', label: 'Years' },
  { value: '32', label: 'Markets' },
  { value: '$2.4B+', label: 'AUM' },
]

export function AboutPreview() {
  const reduced = useReducedMotion()
  return (
    <section className="relative overflow-hidden bg-sand py-24 md:py-36" aria-label="About Vantage">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
          {/* Left: editorial typography */}
          <div className="order-2 lg:order-1">
            <Reveal className="mb-8">
              <div className="flex items-center gap-4">
                <span className="font-serif text-sm italic text-gold">06</span>
                <span className="h-px w-8 bg-line" aria-hidden="true" />
                <span className="eyebrow text-muted">About Vantage</span>
              </div>
            </Reveal>

            <h2 className="serif-display text-[clamp(2.6rem,6vw,5rem)] text-ink">
              <RevealLines>
                <span className="block">REAL ESTATE.</span>
                <span className="block">
                  <span className="italic">RETHOUGHT.</span>
                </span>
              </RevealLines>
            </h2>

            <Reveal delay={0.1} className="mt-8 max-w-lg">
              <p className="text-base leading-relaxed text-muted md:text-lg">
                Vantage is a commercial real estate platform focused on acquiring,
                developing and managing assets in markets with strong economic
                fundamentals and long-term growth potential.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <div className="flex gap-12 border-t border-ink/10 pt-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="serif-display text-4xl text-ink md:text-5xl">{s.value}</p>
                    <p className="mt-2 text-[0.65rem] uppercase tracking-[0.25em] text-muted">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
              <AnimatedButton to="/about" variant="outline">
                Our Firm
              </AnimatedButton>
            </Reveal>
          </div>

          {/* Right: architectural image */}
          <div className="order-1 lg:order-2">
            <Reveal amount={0.3}>
              <div className="relative">
                <ParallaxImage
                  src={IMAGES.lowAngle}
                  alt="Low-angle view of a contemporary commercial tower"
                  className="aspect-[4/5] w-full"
                  speed={0.06}
                  reveal
                />
                <motion.p
                  className="absolute bottom-6 left-6 font-serif text-lg italic text-bone"
                  initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                  whileInView={reduced ? undefined : { opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Built for the long term.
                </motion.p>
                <span
                  className="pointer-events-none absolute -top-10 -right-4 select-none font-serif text-[clamp(6rem,14vw,11rem)] leading-none text-ink/[0.06]"
                  aria-hidden="true"
                >
                  25
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}