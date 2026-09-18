import { MapPin, Mail, Phone } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { SectionDivider } from '@/components/shared/SectionDivider'
import { Reveal } from '@/components/shared/Reveal'
import { Accordion } from '@/components/shared/Accordion'
import { COMPANY } from '@/data/company'
import { faqs } from '@/data/faqs'
import { IMAGES } from '@/data/images'
import { Seo } from '@/components/seo/Seo'

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact | Vantage Commercial Real Estate"
        description="Reach the Vantage team for leasing, investment, acquisition, asset management or partnership inquiries."
      />
      <PageHero
        eyebrow="Contact"
        title={'LET&apos;S TALK\nABOUT WHAT&apos;S NEXT.'}
        image={IMAGES.officeEmpty}
        alt="A refined, unoccupied commercial office floor"
      />

      <section className="bg-bone py-20 md:py-28" aria-label="Contact details">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
          {/* Form */}
          <div>
            <SectionDivider index="01" label="Send an Inquiry" className="mb-10" />
            <ContactForm />
          </div>

          {/* Company info */}
          <div>
            <SectionDivider index="02" label="Our Offices" className="mb-10" />
            <address className="space-y-8 not-italic">
              <div>
                <p className="serif-display text-2xl text-ink">{COMPANY.fullName}</p>
                <div className="mt-6 space-y-3">
                  {COMPANY.cities.map((city) => (
                    <p key={city} className="flex items-center gap-3 text-sm text-muted">
                      <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
                      {city} — India
                    </p>
                  ))}
                </div>
              </div>

              <div className="space-y-3 border-t border-ink/10 pt-8">
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-3 text-sm text-ink transition-colors hover:text-gold"
                >
                  <Mail className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  {COMPANY.email}
                </a>
                <a
                  href="tel:+910000000000"
                  className="flex items-center gap-3 text-sm text-ink transition-colors hover:text-gold"
                >
                  <Phone className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  {COMPANY.phone}
                </a>
              </div>
            </address>

            <Reveal delay={0.1} className="mt-10 border border-ink/10 bg-sand/60 p-6">
              <p className="eyebrow text-muted">Response time</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Our team typically responds within one business day. For urgent
                leasing inquiries in a specific building, please reference the
                property name in your message.
              </p>
            </Reveal>

            <p className="mt-8 text-[0.6rem] uppercase tracking-[0.2em] text-muted">
              Contact details shown are illustrative demo information.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ink py-20 text-bone md:py-28" aria-label="Frequently asked questions">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionDivider index="F" label="FAQ" dark className="mb-8" />
            <h2 className="serif-display text-3xl text-bone md:text-5xl">
              Answers, before you ask.
            </h2>
            <Reveal delay={0.15} className="mt-6">
              <p className="max-w-xs text-sm leading-relaxed text-bone/60">
                A few questions we hear often. If yours is missing, our team
                responds within one business day.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Accordion items={faqs} dark />
          </Reveal>
        </div>
      </section>
    </>
  )
}