import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '@/data/services'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { cn } from '@/lib/utils'

/**
 * Interactive editorial service list. On desktop a sticky image panel
 * crossfades to the active service; on mobile each row expands inline.
 */
export function ServicesPreview() {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  const activeService = services[active]

  return (
    <section className="relative bg-sand py-24 md:py-36" aria-label="Services">
      <div className="container-x">
        <div className="mb-14 md:mb-20">
          <SectionHeader
            index="04"
            eyebrow="What We Do"
            title="FROM ACQUISITION TO ASSET CREATION."
            description="An integrated platform covering the full commercial real estate lifecycle — from sourcing capital-efficient acquisitions to operating assets that perform."
          />
        </div>

        <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* List */}
          <div className="flex flex-col" role="list">
            {services.map((service, i) => {
              const isActive = active === i
              return (
                <div key={service.id} role="listitem" className="border-t border-ink/10">
                  <div
                    className="group flex w-full cursor-pointer flex-col gap-2 py-7 outline-none md:flex-row md:items-center md:gap-8 md:py-8"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onTouchStart={() => setActive(i)}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isActive}
                    aria-controls={`service-desc-${service.id}`}
                  >
                    <span className="w-10 font-serif text-sm italic text-gold">
                      {service.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3
                        className={cn(
                          'serif-display text-3xl transition-all duration-500 md:text-4xl lg:text-[2.6rem]',
                          isActive ? 'text-ink' : 'text-ink/55',
                        )}
                      >
                        {service.title}
                      </h3>
                      <AnimatePresence initial={false}>
                        {isActive && !reduced && (
                          <motion.div
                            key={`desc-${service.id}`}
                            id={`service-desc-${service.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
                              {service.description}
                            </p>
                            <ServicePoints points={service.points} />
                            <Link
                              to="/services"
                              className="mt-4 inline-flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-ink transition-colors hover:text-gold"
                            >
                              Learn more
                              <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
                            </Link>
                          </motion.div>
                        )}
                        {isActive && reduced && (
                          <div id={`service-desc-${service.id}`} className="mt-3">
                            <p className="max-w-md text-sm leading-relaxed text-muted md:text-base">
                              {service.description}
                            </p>
                            <ServicePoints points={service.points} />
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                    <motion.span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/20"
                      animate={isActive ? { rotate: 45, borderColor: '#b89b5e' } : { rotate: 0 }}
                      whileHover={reduced ? undefined : { x: 2 }}
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </motion.span>
                  </div>
                </div>
              )
            })}

            {/* Conditional mobile layout: image below list on small screens */}
            <div className="mt-10 lg:hidden">
              {reduced ? (
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <motion.img
                  key={activeService.id}
                  src={activeService.image}
                  alt={activeService.title}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </div>
          </div>

          {/* Sticky image panel (desktop) */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                {reduced ? (
                  <img src={activeService.image} alt={activeService.title} className="h-full w-full object-cover" />
                ) : (
                  <AnimatePresence mode="popLayout">
                    <motion.img
                      key={activeService.id}
                      src={activeService.image}
                      alt={`${activeService.title} — imagery`}
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </AnimatePresence>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div>
                    <p className="eyebrow text-gold">{activeService.number}</p>
                    <p className="mt-2 serif-display text-2xl text-bone">{activeService.title}</p>
                  </div>
                  <span className="text-[0.65rem] uppercase tracking-[0.3em] text-bone/60">
                    Vantage
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicePoints({ points }: { points: string[] }) {
  return (
    <ul className="mt-4 space-y-1.5">
      {points.map((p) => (
        <li key={p} className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          <span className="h-px w-4 bg-gold" aria-hidden="true" />
          {p}
        </li>
      ))}
    </ul>
  )
}