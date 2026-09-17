import { AnimatedWords } from '@/components/shared/AnimatedText'
import { Reveal } from '@/components/shared/Reveal'
import { AnimatedButton } from '@/components/shared/AnimatedButton'
import { SectionDivider } from '@/components/shared/SectionDivider'

export function HomeContactCTA() {
  return (
    <section className="relative bg-sand py-24 md:py-32" aria-label="Contact Vantage">
      <div className="container-x">
        <SectionDivider index="09" label="Contact" className="mb-14 md:mb-16" />
        <div className="flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">
          <h2 className="serif-display max-w-4xl text-[clamp(2.8rem,7vw,6rem)] leading-[1.02] text-ink">
            <AnimatedWords text="LET&apos;S TALK ABOUT WHAT&apos;S NEXT." />
          </h2>
          <Reveal delay={0.2} className="flex flex-col gap-8">
            <p className="max-w-sm text-base leading-relaxed text-muted">
              Whether you are leasing, investing, developing or partnering — our
              team is ready when you are.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <AnimatedButton to="/contact" size="lg">
                Contact Us
              </AnimatedButton>
              <a
                href="mailto:hello@vantage-demo.com"
                className="border-b border-ink/30 pb-1 text-sm text-ink transition-colors hover:border-gold hover:text-gold"
              >
                hello@vantage-demo.com
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}