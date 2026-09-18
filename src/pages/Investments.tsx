import { motion, useReducedMotion } from 'framer-motion'
import { PageHero } from '@/components/shared/PageHero'
import { Reveal } from '@/components/shared/Reveal'
import { AnimatedButton } from '@/components/shared/AnimatedButton'
import { SectionDivider } from '@/components/shared/SectionDivider'
import { IMAGES } from '@/data/images'
import { allocation, investmentPillars, trackRecord } from '@/data/company'
import { caseStudies } from '@/data/caseStudies'
import { Seo } from '@/components/seo/Seo'

export default function Investments() {
  const reduced = useReducedMotion()

  return (
    <>
      <Seo
        title="Investments | Vantage Commercial Real Estate"
        description="Vantage combines disciplined underwriting, local market intelligence and long-term ownership to invest across office, industrial, logistics, retail, mixed-use and data infrastructure."
      />
      <PageHero
        eyebrow="Investment Platform"
        title={'CAPITAL\nWITH CONVICTION.'}
        image={IMAGES.skyline}
        alt="City skyline aerial view"
        description="We combine disciplined underwriting, local market intelligence and long-term thinking to identify opportunities where real estate can create durable value."
      />

      {/* Philosophy */}
      <section className="bg-bone py-20 md:py-28" aria-label="Philosophy">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionDivider index="01" label="Philosophy" className="mb-8" />
            <h2 className="serif-display text-3xl text-ink md:text-5xl">Three disciplines. One objective.</h2>
          </Reveal>
          <div className="flex flex-col">
            {investmentPillars.map((pillar, i) => (
              <Reveal key={pillar.number} delay={i * 0.08}>
                <div className="group flex flex-col gap-3 border-t border-ink/10 py-8 md:flex-row md:gap-8">
                  <span className="font-serif text-base italic text-gold">{pillar.number}</span>
                  <div>
                    <h3 className="serif-display text-2xl text-ink md:text-3xl">{pillar.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-ink/10" />
          </div>
        </div>
      </section>

      {/* Portfolio allocation */}
      <section className="bg-sand py-20 md:py-28" aria-label="Portfolio allocation">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <Reveal>
            <SectionDivider index="02" label="Allocation" className="mb-8" />
            <h2 className="serif-display text-3xl text-ink md:text-5xl">
              Diversified across the classes that matter.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              A thoughtfully balanced portfolio across income-producing asset
              classes, each with distinct demand drivers and return profiles.
            </p>
            <p className="mt-8 text-[0.6rem] uppercase tracking-[0.22em] text-muted">
              Illustrative portfolio allocation.
            </p>

            {/* Legend */}
            <ul className="mt-6 space-y-3">
              {allocation.map((slice) => (
                <li key={slice.label} className="flex items-center gap-4">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: slice.color }} aria-hidden="true" />
                  <span className="w-32 text-[0.7rem] uppercase tracking-[0.22em] text-ink">{slice.label}</span>
                  <span className="h-px flex-1 bg-ink/10" aria-hidden="true" />
                  <span className="font-serif text-lg text-ink">{slice.value}%</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex justify-center">
              <AllocationDonut />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Track record */}
      <section className="bg-bone py-20 md:py-28" aria-label="Track record">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionDivider index="03" label="Track Record" className="mb-6" />
              <h2 className="serif-display text-3xl text-ink md:text-5xl">Discipline, measured.</h2>
            </div>
            <p className="max-w-xs text-[0.6rem] uppercase tracking-[0.2em] leading-relaxed text-muted">
              Illustrative demo data — not performance of any real fund.
            </p>
          </div>

          <div className="border border-ink/10 bg-white/40">
            <div className="grid grid-cols-[0.6fr_1fr_0.8fr] items-center gap-4 border-b border-ink/10 px-6 py-4">
              <span className="eyebrow text-muted">Year</span>
              <span className="eyebrow text-muted">Metric</span>
              <span className="eyebrow text-muted text-right">Value</span>
            </div>
            {trackRecord.map((row, i) => (
              <Reveal key={row.year} delay={i * 0.05}>
                <div className="grid grid-cols-[0.6fr_1fr_0.8fr] items-center gap-4 border-b border-ink/10 px-6 py-5 last:border-b-0">
                  <span className="font-serif text-lg italic text-gold">{row.year}</span>
                  <span className="text-[0.72rem] uppercase tracking-[0.18em] text-ink">{row.label}</span>
                  <motion.span
                    className="text-right font-serif text-xl text-ink"
                    initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    {row.value}
                  </motion.span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-[0.6rem] uppercase tracking-[0.22em] text-muted">
            Showcased for demonstration. Always consult a licensed advisor before making investment decisions.
          </p>
        </div>
      </section>

      {/* Case studies */}
      <section className="bg-sand py-20 md:py-28" aria-label="Featured outcomes">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionDivider index="04" label="Featured Outcomes" className="mb-6" />
              <h2 className="serif-display text-3xl text-ink md:text-5xl">The work, in practice.</h2>
            </div>
            <p className="max-w-xs text-[0.6rem] uppercase tracking-[0.2em] leading-relaxed text-muted">
              Illustrative case studies for demonstration.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.id} delay={i * 0.1}>
                <article className="group flex h-full flex-col border border-ink/10 bg-white/40 transition-colors duration-500 hover:border-gold/40">
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                    <img
                      src={cs.image}
                      alt={cs.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                    <div className="absolute bottom-4 left-5 flex items-center gap-3">
                      <span className="eyebrow text-gold">{cs.category}</span>
                      <span className="h-px w-5 bg-bone/40" aria-hidden="true" />
                      <span className="text-[0.6rem] uppercase tracking-[0.22em] text-bone/70">
                        {cs.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="serif-display text-xl text-ink transition-colors duration-300 group-hover:text-[#3a3a3a] md:text-2xl">
                      {cs.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{cs.summary}</p>
                    <div className="mt-auto grid grid-cols-3 gap-4 border-t border-ink/10 pt-5">
                      {cs.metrics.map((m) => (
                        <div key={m.label}>
                          <p className="serif-display text-xl text-ink md:text-2xl">{m.value}</p>
                          <p className="mt-1 text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Risk management + CTA */}
      <section className="bg-ink py-20 text-bone md:py-28" aria-label="Risk approach">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionDivider index="05" label="Risk" dark className="mb-8" />
            <h2 className="serif-display text-3xl text-bone md:text-4xl">Risk, underwritten before it is taken.</h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-bone/60 md:text-lg">
              Every investment is stress-tested against market, tenant and capital-cycle
              scenarios before capital is committed. We position each asset with covenants,
              counterparties and capital structures designed to withstand the full cycle.
            </p>
          </Reveal>
          <div className="flex flex-col justify-center gap-5">
            {[
              'Multi-scenario underwriting before commitment',
              'Anchor tenant and covenant analysis at every asset',
              'Conservative leverage with refinancing headroom',
              'Active asset management through the cycle',
            ].map((item, i) => (
              <Reveal key={item} delay={i * 0.06}>
                <div className="flex items-center gap-5 border-b border-line-light pb-5">
                  <span className="font-serif text-sm italic text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-bone/90">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.3} className="mt-4">
              <AnimatedButton to="/contact" variant="gold">
                Discuss an investment
              </AnimatedButton>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Strategies grid */}
      <section className="bg-bone py-20 md:py-28" aria-label="Asset classes">
        <div className="container-x">
          <div className="mb-12">
            <SectionDivider index="06" label="Asset Classes" className="mb-6" />
            <h2 className="serif-display text-3xl text-ink md:text-5xl">Where we allocate capital.</h2>
          </div>
          <StrategyGrid />
        </div>
      </section>
    </>
  )
}

function AllocationDonut() {
  const r = 70
  const circumference = 2 * Math.PI * r
  let cumulative = 0

  return (
    <svg width="300" height="300" viewBox="0 0 200 200" role="img" aria-label="Illustrative portfolio allocation donut chart">
      <circle cx="100" cy="100" r={r} fill="none" stroke="#e7e3dc" strokeWidth="26" />
      <circle cx="100" cy="100" r={110} fill="none" stroke="#111111" strokeOpacity="0.06" strokeWidth="1" />
      <g transform="rotate(-90 100 100)">
        {allocation.map((slice) => {
          const dash = (slice.value / 100) * circumference
          const offset = -cumulative
          cumulative += dash
          return (
            <circle
              key={slice.label}
              cx="100"
              cy="100"
              r={r}
              fill="none"
              stroke={slice.color}
              strokeWidth="26"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={offset}
            >
              <title>{`${slice.label} — ${slice.value}%`}</title>
            </circle>
          )
        })}
      </g>
      <text x="100" y="96" textAnchor="middle" fontSize="30" fill="#111111" fontFamily="DM Serif Display" className="fill-ink">
        $2.4B
      </text>
      <text x="100" y="116" textAnchor="middle" fontSize="9" fill="#6b6b6b" letterSpacing="2">
        AUM
      </text>
    </svg>
  )
}

function StrategyGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[
        { name: 'Office', image: IMAGES.tower, meta: 'Grade A · Mumbai, Bengaluru, Delhi NCR' },
        { name: 'Industrial', image: IMAGES.warehouseAisle, meta: 'Manufacturing · Chennai, Pune' },
        { name: 'Logistics', image: IMAGES.warehouse, meta: 'Distribution · Pune, Chennai' },
        { name: 'Retail', image: IMAGES.retail, meta: 'Curated assets · Hyderabad, Kolkata' },
        { name: 'Mixed Use', image: IMAGES.retailStreet, meta: 'Integrated districts' },
        { name: 'Data Centers', image: IMAGES.dataCenter, meta: 'Contracted · Mumbai' },
      ].map((s, i) => (
        <Reveal key={s.name} delay={i * 0.05}>
          <div className="group relative aspect-[4/3] overflow-hidden bg-sand">
            <img
              src={s.image}
              alt={s.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="serif-display text-2xl text-bone">{s.name}</h3>
              <p className="mt-2 text-[0.62rem] uppercase tracking-[0.22em] text-bone/60">{s.meta}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}