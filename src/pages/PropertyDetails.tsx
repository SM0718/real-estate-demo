import { useParams } from 'react-router-dom'
import { MapPin, Mail, Phone } from 'lucide-react'
import { useProperty, useRelatedProperties } from '@/api/queries'
import { PageHero } from '@/components/shared/PageHero'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/shared/ErrorState'
import { AnimatedButton } from '@/components/shared/AnimatedButton'
import { Reveal } from '@/components/shared/Reveal'
import { SectionDivider } from '@/components/shared/SectionDivider'
import { Seo } from '@/components/seo/Seo'

export default function PropertyDetails() {
  const { slug = '' } = useParams()
  const { data: property, isLoading, isError, refetch } = useProperty(slug)
  const { data: related } = useRelatedProperties(property)

  if (isLoading) return <PropertyDetailsSkeleton />
  if (isError || !property) {
    return (
      <div className="bg-bone pt-40 md:pt-48">
        <ErrorState
          title="Property unavailable"
          message="This property could not be found or is temporarily unavailable."
          onRetry={() => refetch()}
        />
      </div>
    )
  }

  const overview = [
    { label: 'Area', value: `${property.areaSqFt.toLocaleString()} SF` },
    { label: 'Class', value: property.certification ? property.certification : 'Grade A' },
    { label: 'Year', value: String(property.yearBuilt) },
    { label: 'Floors', value: String(property.floors) },
    { label: 'Status', value: property.status },
  ]

  return (
    <>
      <Seo
        title={`${property.name} | Vantage Commercial Real Estate`}
        description={property.description}
      />
      <PageHero
        eyebrow={`${property.category} · ${property.location.city}`}
        title={`${property.name}\n${property.location.city.toUpperCase()}, INDIA`}
        image={property.image}
        alt={`${property.name} in ${property.location.city}`}
      />

      {/* Overview strip */}
      <section className="border-b border-ink/10 bg-bone" aria-label="Property overview">
        <div className="container-x grid grid-cols-2 py-10 md:grid-cols-5 md:py-12">
          {overview.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06} className="border-t border-ink/10 pt-6 md:border-t-0 md:pt-0 md:pr-6">
              <p className="eyebrow text-muted">{item.label}</p>
              <p className="serif-display mt-3 text-2xl text-ink md:text-3xl">{item.value}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Description */}
      <section className="bg-bone py-20 md:py-28" aria-label="About this property">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionDivider index={String(property.index).padStart(2, '0')} label="Overview" className="mb-8" />
            <h2 className="serif-display text-3xl text-ink md:text-4xl">
              {property.name}
            </h2>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
              {property.location.city}, {property.location.region}, {property.location.country}
            </p>
            {property.leaseRate && (
              <p className="mt-6 border border-ink/10 bg-white/50 p-5 text-sm text-muted">
                Indicative rate: <span className="font-medium text-ink">{property.leaseRate}</span>
              </p>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6 text-base leading-relaxed text-ink/80">
              {property.longDescription.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="bg-sand py-20 md:py-28" aria-label="Features and amenities">
        <div className="container-x grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal>
            <SectionDivider index="↑" label="Features" className="mb-8" />
            <h2 className="serif-display text-3xl text-ink md:text-4xl">Engineered for performance.</h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Specifications and amenities curated around how institutional
              occupiers operate.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {property.features.map((feature, i) => (
                <li
                  key={feature}
                  className="flex items-center gap-4 border-b border-ink/10 py-4"
                >
                  <span className="font-serif text-xs italic text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-medium uppercase tracking-[0.18em] text-ink">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-bone py-20 md:py-28" aria-label="Gallery">
        <div className="container-x">
          <SectionDivider index="→" label="Gallery" className="mb-12" />
          <div className="grid gap-5 md:grid-cols-2">
            {property.gallery.map((img, i) => (
              <Reveal key={img + i} delay={i * 0.08} className={i === 0 || i === 3 ? 'md:col-span-2' : ''}>
                <img
                  src={img}
                  alt={`${property.name} view ${i + 1}`}
                  loading="lazy"
                  className={`w-full object-cover ${i === 0 || i === 3 ? 'aspect-[16/8]' : 'aspect-[4/3]'}`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Location map placeholder */}
      <section className="bg-bone pb-20 md:pb-28" aria-label="Location">
        <div className="container-x">
          <SectionDivider index="◆" label="Location" className="mb-12" />
          <div className="relative overflow-hidden border border-ink/10 bg-sand">
            <div className="relative aspect-[16/7] min-h-[260px]">
              {/* Stylized placeholder map */}
              <svg viewBox="0 0 120 50" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-60" aria-hidden="true">
                <defs>
                  <pattern id="mapGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#111111" strokeOpacity="0.08" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mapGrid)" />
                <path
                  d="M -5 12 L 28 9 L 52 15 L 78 8 L 125 14"
                  stroke="#b89b5e" strokeWidth="1.6" fill="none" strokeOpacity="0.5"
                />
                <path
                  d="M -5 32 L 34 28 L 64 36 L 96 30 L 125 34"
                  stroke="#b89b5e" strokeWidth="1.2" fill="none" strokeOpacity="0.4" strokeDasharray="4 6"
                />
                <path
                  d="M 20 -5 L 24 55 M 48 -5 L 45 55 M 76 -5 L 80 55 M 102 -5 L 98 55"
                  stroke="#111111" strokeWidth="0.8" strokeOpacity="0.1"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-bone/60 via-transparent to-bone/30" />

              {/* Marker card */}
              <div className="absolute left-6 bottom-6 max-w-sm border border-ink/10 bg-bone/95 p-6 shadow-[0_12px_40px_rgba(17,17,17,0.12)] backdrop-blur md:left-10 md:bottom-10">
                <p className="flex items-center gap-2 eyebrow text-gold">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {property.location.city.toUpperCase()}, {property.location.region.toUpperCase()}
                </p>
                <p className="serif-display mt-3 text-2xl text-ink">{property.name}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
                  {property.category} · {property.areaSqFt.toLocaleString()} SF
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-ink py-20 text-bone md:py-28" aria-label="Leasing contact">
        <div className="container-x flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-4 text-bone/60">
              <span className="h-px w-10 bg-gold" /> Leasing
            </p>
            <h2 className="serif-display max-w-2xl text-[clamp(2rem,5vw,3.75rem)] text-bone">
              Interested in {property.name}?
            </h2>
          </div>
          <Reveal delay={0.15} className="flex flex-col items-start gap-6 md:items-end">
            <AnimatedButton to="/contact" variant="gold" size="lg">
              Speak with our leasing team
            </AnimatedButton>
            <div className="flex flex-col gap-2 text-sm text-bone/70 md:text-right">
              <a href="mailto:hello@vantage-demo.com" className="flex items-center gap-2 transition-colors hover:text-gold">
                <Mail className="h-4 w-4" strokeWidth={1.25} /> hello@vantage-demo.com
              </a>
              <a href="tel:+910000000000" className="flex items-center gap-2 transition-colors hover:text-gold">
                <Phone className="h-4 w-4" strokeWidth={1.25} /> +91 00000 00000
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="bg-bone py-20 md:py-28" aria-label="Related properties">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <SectionDivider index="→" label="Also in the portfolio" className="mb-6" />
              <h2 className="serif-display text-3xl text-ink md:text-4xl">Explore more assets.</h2>
            </div>
            <AnimatedButton to="/properties" variant="outline" size="sm">
              View All Properties
            </AnimatedButton>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {(related ?? []).map((p, i) => (
              <PropertyCard key={p.id} property={p} eager={i === 0} />
            ))}
          </div>
          {related && related.length > 0 && (
            <p className="mt-10 text-[0.6rem] uppercase tracking-[0.22em] text-muted">
              Figures shown are illustrative for demonstration purposes.
            </p>
          )}
        </div>
      </section>
    </>
  )
}

function PropertyDetailsSkeleton() {
  return (
    <div className="bg-bone">
      <Skeleton className="h-[62vh] w-full rounded-none" />
      <div className="container-x grid grid-cols-2 gap-6 py-12 md:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-3 w-20" />
            <Skeleton className="mt-3 h-8 w-24" />
          </div>
        ))}
      </div>
      <div className="container-x grid gap-10 py-16 lg:grid-cols-2">
        <Skeleton className="h-6 w-2/3" />
        <div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-3 h-4 w-4/5" />
        </div>
      </div>
    </div>
  )
}