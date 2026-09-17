import { motion, useReducedMotion } from 'framer-motion'
import { investmentPillars } from '@/data/company'
import { AnimatedWords } from '@/components/shared/AnimatedText'
import { Reveal } from '@/components/shared/Reveal'
import { AnimatedButton } from '@/components/shared/AnimatedButton'

export function InvestmentPhilosophy() {
  const reduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-bone md:py-36" aria-label="Investment philosophy">
      {/* Oversized background index */}
      <span
        className="pointer-events-none absolute -right-8 top-6 select-none font-serif text-[clamp(8rem,20vw,18rem)] leading-none text-bone/[0.04]"
        aria-hidden="true"
      >
        03
      </span>

      <div className="container-x relative">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
          <div>
            <motion.p
              className="mb-8 flex items-center gap-4"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-serif text-sm italic text-gold">03</span>
              <span className="h-px w-8 bg-line-light" aria-hidden="true" />
              <span className="eyebrow text-bone/70">Our Approach</span>
            </motion.p>

            <h2 className="serif-display text-[clamp(2.6rem,6vw,5.5rem)] text-bone">
              <AnimatedWords text="CAPITAL WITH CONVICTION." />
            </h2>

            <Reveal delay={0.15} className="mt-8 max-w-xl">
              <p className="text-base leading-relaxed text-bone/60 md:text-lg">
                We combine disciplined underwriting, local market intelligence and
                long-term thinking to identify opportunities where real estate can
                create durable value.
              </p>
            </Reveal>

            <Reveal delay={0.25} className="mt-10">
              <AnimatedButton to="/investments" variant="light">
                Investment Platform
              </AnimatedButton>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center">
            {investmentPillars.map((pillar, i) => (
              <PillarRow key={pillar.number} pillar={pillar} index={i} reduced={Boolean(reduced)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PillarRow({
  pillar,
  index,
  reduced,
}: {
  pillar: { number: string; title: string; description: string }
  index: number
  reduced: boolean
}) {
  return (
    <Reveal delay={index * 0.1} className="group">
      <motion.div
        className="flex flex-col gap-1 border-t border-line-light py-7 transition-colors duration-500 md:flex-row md:items-start md:gap-8 md:py-9"
        whileHover={reduced ? undefined : { x: 8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-serif text-sm italic text-gold">{pillar.number}</span>
        <div>
          <h3 className="serif-display text-2xl text-bone md:text-3xl">
            {pillar.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-bone/55">
            {pillar.description}
          </p>
          <motion.span
            className="mt-4 block h-px w-0 bg-gold/70 transition-all duration-500 group-hover:w-16"
            initial={reduced ? { width: '4rem' } : false}
            aria-hidden="true"
          />
        </div>
      </motion.div>
    </Reveal>
  )
}