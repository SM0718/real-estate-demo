import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { PageHero } from '@/components/shared/PageHero'
import { ParallaxImage } from '@/components/shared/ParallaxImage'
import { Reveal } from '@/components/shared/Reveal'
import { SectionDivider } from '@/components/shared/SectionDivider'
import { AnimatedButton } from '@/components/shared/AnimatedButton'
import { RevealLines, AnimatedWords } from '@/components/shared/AnimatedText'
import { timeline } from '@/data/company'
import { IMAGES } from '@/data/images'
import { Seo } from '@/components/seo/Seo'

export default function About() {
  return (
    <>
      <Seo
        title="About | Vantage Commercial Real Estate"
        description="Vantage is a commercial real estate platform focused on acquiring, developing and managing assets in markets with strong economic fundamentals."
      />
      <PageHero
        eyebrow="About Vantage"
        title={'REAL ESTATE.\nRETHOUGHT.'}
        image={IMAGES.glass}
        alt="Reflective glass exterior of a commercial building"
        description="Vantage is a commercial real estate platform focused on acquiring, developing and managing assets in markets with strong economic fundamentals and long-term growth potential."
      />

      {/* Story */}
      <section className="bg-bone py-20 md:py-28" aria-label="Our story">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <Reveal>
            <SectionDivider index="01" label="The Firm" className="mb-8" />
            <h2 className="serif-display text-[clamp(2rem,4.5vw,3.5rem)] text-ink">
              <RevealLines>
                <span className="block">OWNERSHIP IS</span>
                <span className="block">
                  THE <span className="italic">STANDARD.</span>
                </span>
              </RevealLines>
            </h2>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              Vantage was founded with a simple conviction: exceptional real
              estate is not assembled — it is owned, operated and improved over
              decades. We build and hold, aligning our interest with our tenants,
              partners and the communities we operate in.
            </p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              Today, our platform spans acquisition, development, asset
              management, leasing and investment advisory across India&apos;s
              principal commercial markets.
            </p>
          </Reveal>
          <Reveal amount={0.3}>
            <ParallaxImage
              src={IMAGES.officeLobby}
              alt="Premium commercial office lobby"
              className="aspect-[4/5] w-full"
              speed={0.06}
              reveal
            />
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-sand py-20 md:py-28" aria-label="What we believe">
        <div className="container-x">
          <SectionDivider index="02" label="Principles" className="mb-12" />
          <div className="grid gap-px bg-ink/10 sm:grid-cols-3">
            {[
              {
                title: 'Long-term ownership',
                copy: 'We build and hold through cycles, aligning our capital with the durability of the asset.',
              },
              {
                title: 'Disciplined capital',
                copy: 'Underwriting before enthusiasm. Every deal must survive the test of a full market cycle.',
              },
              {
                title: 'Local intelligence',
                copy: 'Decisions are made on the ground — where relationships and information compound.',
              },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="group flex h-full flex-col justify-between bg-sand p-8 transition-colors duration-500 hover:bg-bone md:p-10">
                  <span className="font-serif text-sm italic text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="mt-16">
                    <h3 className="serif-display text-2xl text-ink md:text-3xl">{v.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{v.copy}</p>
                    <span className="mt-8 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-bone py-20 md:py-32" aria-label="History">
        <div className="container-x">
          <div className="mb-14 md:mb-20">
            <SectionDivider index="03" label="Timeline" className="mb-8" />
            <h2 className="serif-display text-[clamp(2.2rem,5vw,4.25rem)] text-ink">
              TWO DECADES OF <span className="italic">BUILDING.</span>
            </h2>
          </div>
          <Timeline />
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-ink py-16 text-bone md:py-24" aria-label="Company numbers">
        <div className="container-x grid grid-cols-3 gap-8">
          {[
            { value: '24+', label: 'Years' },
            { value: '32', label: 'Markets' },
            { value: '$2.4B+', label: 'AUM' },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <p className="serif-display text-4xl text-bone md:text-6xl">{s.value}</p>
              <p className="mt-3 text-[0.65rem] uppercase tracking-[0.25em] text-bone/50">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bone py-20 md:py-28">
        <div className="container-x flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="serif-display max-w-2xl text-[clamp(2.2rem,5vw,4rem)] text-ink">
            <AnimatedWords text="LET'S BUILD SOMETHING DURABLE." />
          </h2>
          <AnimatedButton to="/contact" size="lg">
            Get in touch
          </AnimatedButton>
        </div>
      </section>
    </>
  )
}

function Timeline() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%'],
  })
  const height = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '100%'] : ['0%', '100%'])

  return (
    <div ref={ref} className="relative">
      {/* Vertical line */}
      <div className="absolute top-0 bottom-0 left-[7px] w-px bg-ink/10 md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
      <motion.div
        className="absolute top-0 bottom-0 left-[7px] w-px origin-top bg-gold md:left-1/2 md:-translate-x-1/2"
        style={{ scaleY: height }}
        aria-hidden="true"
      />

      <div className="space-y-14 md:space-y-0">
        {timeline.map((event, i) => {
          const flip = i % 2 === 1
          return (
            <div key={event.year} className="relative md:grid md:grid-cols-2 md:gap-16 md:py-10">
              {/* Node */}
              <motion.span
                className="absolute top-2 left-0 h-[15px] w-[15px] rounded-full border-2 border-gold bg-bone md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
                initial={reduced ? { scale: 1 } : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                aria-hidden="true"
              />
              <div className={flip ? 'md:col-start-2 md:pl-16' : 'md:pl-16 md:col-start-1 md:pr-4 md:pl-0 md:text-right md:items-end'} style={{ paddingLeft: '3rem', paddingRight: flip ? '0' : undefined }}>
                <Reveal delay={0.05}>
                  <span className="font-serif text-5xl italic text-gold md:text-6xl">{event.year}</span>
                  <h3 className="mt-4 serif-display text-2xl text-ink md:text-3xl">{event.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
                    {event.description}
                  </p>
                </Reveal>
              </div>
              <div className={flip ? 'hidden md:block md:col-start-1' : 'hidden md:block md:col-start-2'} />
            </div>
          )
        })}
      </div>
    </div>
  )
}