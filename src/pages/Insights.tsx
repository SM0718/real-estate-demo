import { useInsights } from '@/api/queries'
import { PageHero } from '@/components/shared/PageHero'
import { InsightCard } from '@/components/insights/InsightCard'
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
    </>
  )
}