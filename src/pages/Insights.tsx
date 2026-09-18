import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInsights } from '@/api/queries'
import { PageHero } from '@/components/shared/PageHero'
import { InsightCard } from '@/components/insights/InsightCard'
import { AnimatedButton } from '@/components/shared/AnimatedButton'
import { Reveal } from '@/components/shared/Reveal'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/shared/ErrorState'
import { IMAGES } from '@/data/images'
import { Seo } from '@/components/seo/Seo'

export default function Insights() {
  const { data, isLoading, isError, refetch } = useInsights()
  const items = data ?? []

  return (
    <>
      <Seo
        title="Insights & Research | Vantage Commercial Real Estate"
        description="Market intelligence and research from Vantage's investment and research platform."
      />
      <PageHero
        eyebrow="Insights & Research"
        title={'MARKET\nINTELLIGENCE.'}
        image={IMAGES.skyAerial}
        alt="Aerial view across a city"
        description="Perspectives on the markets, cycles and structural trends shaping commercial real estate."
      />

      <section className="bg-bone py-16 md:py-24" aria-label="Journal">
        <div className="container-x">
          {isLoading && (
            <div className="space-y-16">
              <div>
                <Skeleton className="aspect-[16/9]" />
                <Skeleton className="mt-6 h-4 w-40" />
                <Skeleton className="mt-4 h-8 w-2/3" />
              </div>
              <div className="grid gap-12 md:grid-cols-2">
                {[0, 1].map((i) => (
                  <div key={i}>
                    <Skeleton className="aspect-[16/9]" />
                    <Skeleton className="mt-5 h-4 w-32" />
                    <Skeleton className="mt-3 h-6 w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {isError && (
            <ErrorState
              title="Insights unavailable"
              message="We could not load the journal right now. Please try again."
              onRetry={() => refetch()}
            />
          )}

          {!isLoading && !isError && items.length > 0 && (
            <>
              <InsightCard insight={items[0]} layout="large" eager />
              <div className="mt-16 grid gap-12 border-t border-ink/10 pt-16 md:grid-cols-2 md:gap-8">
                {items.slice(1).map((insight, i) => (
                  <InsightCard key={insight.id} insight={insight} eager={i === 0} />
                ))}
              </div>
            </>
          )}

          {!isLoading && !isError && items.length === 0 && (
            <ErrorState
              title="No articles yet"
              message="Our editorial desk is busy. Please check back soon."
            />
          )}
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterBand />
    </>
  )
}

function NewsletterBand() {
  const reduced = useReducedMotion()
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = () => {
    if (!email.trim()) return
    setDone(true)
  }

  return (
    <section className="bg-ink py-20 text-bone md:py-28" aria-label="Newsletter signup">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-20">
        <div>
          <div className="mb-8 flex items-center gap-4">
            <span className="font-serif text-sm italic text-gold">◆</span>
            <span className="h-px w-8 bg-line-light" aria-hidden="true" />
            <span className="eyebrow text-bone/60">The Vantage Brief</span>
          </div>
          <h2 className="serif-display max-w-xl text-[clamp(2.2rem,5vw,4rem)] text-bone">
            <span className="italic">BRIEF</span> INSIGHTS, DELIVERED QUARTERLY.
          </h2>
          <motion.p
            className="mt-6 max-w-md text-base leading-relaxed text-bone/60"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            Four pages on the markets we operate in — cycles, capital and real
            estate. No noise, no frequency creep.
          </motion.p>
        </div>

        <Reveal delay={0.15}>
          {done ? (
            <motion.p
              className="flex items-center gap-4 border border-gold/40 bg-gold/10 px-6 py-5 text-sm text-bone/90"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
              Subscribed. The next brief lands in your inbox quarterly.
            </motion.p>
          ) : (
            <motion.form
              onSubmit={(e) => {
                e.preventDefault()
                submit()
              }}
              className="flex flex-col gap-4 sm:flex-row"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <label htmlFor="brief-email" className="sr-only">
                Work email
              </label>
              <input
                id="brief-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email"
                className="h-12 flex-1 border border-bone/25 bg-transparent px-5 text-sm text-bone placeholder:text-bone/40 focus:border-gold focus:outline-none"
              />
              <AnimatedButton variant="gold" size="lg" onClick={submit}>
                Subscribe
              </AnimatedButton>
            </motion.form>
          )}
        </Reveal>
      </div>
    </section>
  )
}