import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Calendar, Clock, User } from 'lucide-react'
import { useInsight, useRelatedInsights } from '@/api/queries'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/shared/ErrorState'
import { InsightCard } from '@/components/insights/InsightCard'
import { SectionDivider } from '@/components/shared/SectionDivider'
import { AnimatedButton } from '@/components/shared/AnimatedButton'
import { Reveal } from '@/components/shared/Reveal'
import { AnimatedWords } from '@/components/shared/AnimatedText'
import { Seo } from '@/components/seo/Seo'

export default function InsightDetails() {
  const { slug = '' } = useParams()
  const { data: insight, isLoading, isError, refetch } = useInsight(slug)
  const { data: related } = useRelatedInsights(insight)
  const reduced = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '100%'])

  if (isLoading) return <InsightSkeleton />
  if (isError || !insight) {
    return (
      <div className="bg-bone pt-40 md:pt-48">
        <ErrorState
          title="Article unavailable"
          message="This article could not be found or is temporarily unavailable."
          onRetry={() => refetch()}
        />
      </div>
    )
  }

  return (
    <>
      <Seo title={`${insight.title} | Vantage Insights`} description={insight.excerpt} />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink pt-32 pb-16 md:pt-40"
      >
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img
            src={insight.image}
            alt={insight.title}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/55 to-ink/40" />
        <div className="container-x relative z-10">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="eyebrow text-gold">{insight.category}</span>
              <span className="h-px w-8 bg-line-light" aria-hidden="true" />
              <span className="eyebrow text-bone/60">{insight.date}</span>
            </div>
          </Reveal>
          <h1 className="serif-display mt-6 max-w-4xl text-[clamp(2.2rem,5.5vw,4.75rem)] text-bone">
            <AnimatedWords text={insight.title} delay={0.2} trigger="mount" />
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-bone/70">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4 text-gold" strokeWidth={1.5} />
              {insight.author} · {insight.role}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gold" strokeWidth={1.5} />
              {insight.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold" strokeWidth={1.5} />
              {insight.readingTime}
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="bg-bone py-20 md:py-28" aria-label="Article">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="serif-display border-b border-ink/10 pb-10 text-2xl leading-normal text-ink/90 md:text-3xl">
                {insight.excerpt}
              </p>
            </Reveal>
            <div className="mt-10 space-y-7 text-base leading-loose text-ink/80 md:text-lg">
              {insight.body.map((para, i) => (
                <Reveal key={i} delay={Math.min(i * 0.04, 0.2)}>
                  <p>{para}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-14 border-y border-ink/10 py-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="serif-display text-xl text-ink">{insight.author}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted">
                    {insight.role} · Vantage
                  </p>
                </div>
                <AnimatedButton to="/insights" variant="outline" size="sm">
                  All Insights
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {related && related.length > 0 && (
        <section className="bg-sand py-20 md:py-28" aria-label="Related articles">
          <div className="container-x">
            <SectionDivider index="→" label="Continue Reading" className="mb-12" />
            <div className="grid gap-12 md:grid-cols-2 md:gap-8">
              {related.map((item, i) => (
                <InsightCard key={item.id} insight={item} eager={i === 0} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

function InsightSkeleton() {
  return (
    <div className="bg-bone">
      <Skeleton className="h-[70vh] w-full rounded-none" />
      <div className="container-x mx-auto max-w-3xl space-y-5 py-20">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <div className="pt-8">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="mt-8 h-4 w-full" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-3 h-4 w-11/12" />
          <Skeleton className="mt-3 h-4 w-full" />
        </div>
      </div>
    </div>
  )
}