import { motion, useReducedMotion } from 'framer-motion'
import { services } from '@/data/services'
import { PageHero } from '@/components/shared/PageHero'
import { ParallaxImage } from '@/components/shared/ParallaxImage'
import { Reveal } from '@/components/shared/Reveal'
import { AnimatedButton } from '@/components/shared/AnimatedButton'
import { SectionDivider } from '@/components/shared/SectionDivider'
import { IMAGES } from '@/data/images'
import { Seo } from '@/components/seo/Seo'
import { cn } from '@/lib/utils'

const engageSteps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'A structured brief on objectives, mandate and constraints — then a daily standup cadence with your deal team.',
  },
  {
    number: '02',
    title: 'Structure',
    description:
      'Underwriting, diligence and capital-structure engineering. Every assumption stress-tested before a term is set.',
  },
  {
    number: '03',
    title: 'Execute',
    description:
      'Acquisition or development delivery with design-led oversight, built-to-suit control and milestone governance.',
  },
  {
    number: '04',
    title: 'Operate & Optimize',
    description:
      'Active asset management through the hold — leasing, capex, tenant relationships and cyclical repositioning.',
  },
]

export default function Services() {
  const reduced = useReducedMotion()
  return (
    <>
      <Seo
        title="Services | Vantage Commercial Real Estate"
        description="From acquisition to asset creation — Vantage covers the full commercial real estate lifecycle: acquisitions, development, asset management, leasing and investment advisory."
      />
      <PageHero
        eyebrow="What We Do"
        title={'FULL-LIFECYCLE\nREAL ESTATE.'}
        image={IMAGES.facade}
        alt="Modern glass commercial facade"
        description="An integrated platform across the commercial real estate lifecycle — sourcing, building, operating and investing."
      />

      {/* Service sections with alternating editorials */}
      {services.map((service, i) => {
        const flip = i % 2 === 1
        return (
          <section
            key={service.id}
            id={service.id}
            className={cn('py-20 md:py-28', i % 2 === 0 ? 'bg-bone' : 'bg-sand')}
            aria-label={service.title}
          >
            <div className="container-x">
              <div className={cn('grid gap-12 lg:grid-cols-2 lg:gap-0', flip ? 'lg:[&>*:first-child]:order-2' : '')}>
                {/* Image */}
                <div>
                  <Reveal amount={0.3} className="h-full">
                    <ParallaxImage
                      src={service.image}
                      alt={`${service.title} — architectural imagery`}
                      className="aspect-[4/3] w-full lg:aspect-auto lg:h-full"
                      speed={0.05}
                      reveal
                    />
                  </Reveal>
                </div>

                {/* Text */}
                <div className={cn('flex flex-col justify-center lg:px-12 lg:py-8', flip ? 'lg:order-1' : 'lg:order-2')}>
                  <SectionDivider index={service.number} label="Service" className="mb-10" />
                  <Reveal>
                    <h2 className="serif-display text-[clamp(2.4rem,5vw,4rem)] text-ink">
                      {service.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
                      {service.description}
                    </p>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <ul className="mt-8 space-y-3">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-center gap-4">
                          <span className="h-px w-6 bg-gold" aria-hidden="true" />
                          <span className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-ink">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* How we engage */}
      <section className="bg-sand py-20 md:py-28" aria-label="How we engage">
        <div className="container-x">
          <SectionDivider index="→" label="How We Engage" className="mb-14" />
          <div className="relative grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Progress line */}
            <motion.div
              className="absolute top-0 left-0 hidden h-px w-full origin-left bg-ink/10 lg:block"
              aria-hidden="true"
            >
              <motion.div
                className="absolute inset-0 origin-left bg-gold"
                initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
                whileInView={reduced ? undefined : { scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            {engageSteps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.12}>
                <div className="group pt-10 lg:pt-14">
                  <span className="font-serif text-5xl italic text-gold transition-transform duration-500 group-hover:-translate-y-1 md:text-6xl">
                    {step.number}
                  </span>
                  <h3 className="serif-display mt-5 text-2xl text-ink md:text-3xl">{step.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted md:text-base">
                    {step.description}
                  </p>
                  <span
                    className="mt-6 block h-px w-0 bg-gold/70 transition-all duration-500 group-hover:w-16"
                    aria-hidden="true"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-20 text-bone md:py-28">
        <div className="container-x flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="serif-display max-w-2xl text-[clamp(2rem,5vw,3.75rem)] text-bone">
              Unsure which service fits your need?
            </h2>
            <p className="mt-5 max-w-lg text-base text-bone/60">
              Speak with our team and we will map the right approach to your
              requirements.
            </p>
          </div>
          <AnimatedButton to="/contact" variant="gold" size="lg">
            Talk to our team
          </AnimatedButton>
        </div>
      </section>
    </>
  )
}