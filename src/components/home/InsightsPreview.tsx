import { useInsights } from '@/api/queries'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { InsightCard } from '@/components/insights/InsightCard'
import { AnimatedButton } from '@/components/shared/AnimatedButton'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/shared/ErrorState'
import { Reveal } from '@/components/shared/Reveal'

export function InsightsPreview() {
  const { data, isLoading, isError, refetch } = useInsights()
  const items = data?.slice(0, 3) ?? []

  return (
    <section className="relative bg-bone py-24 md:py-36" aria-label="Market intelligence">
      <div className="container-x">
        <div className="mb-14 flex flex-col justify-between gap-10 md:mb-20 lg:flex-row lg:items-end">
          <SectionHeader
            index="07"
            eyebrow="Insights & Research"
            title="MARKET INTELLIGENCE."
          />
          <Reveal delay={0.2}>
            <AnimatedButton to="/insights" variant="outline">
              All Insights
            </AnimatedButton>
          </Reveal>
        </div>

        {isLoading && (
          <div className="grid gap-10 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <Skeleton className="aspect-[16/10]" />
                <Skeleton className="mt-6 h-4 w-1/3" />
                <Skeleton className="mt-4 h-6 w-full" />
                <Skeleton className="mt-3 h-4 w-4/5" />
              </div>
            ))}
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
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {items.map((insight, i) => (
              <InsightCard key={insight.id} insight={insight} eager={i === 0} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}