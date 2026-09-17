import { useProperties } from '@/api/queries'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { AnimatedButton } from '@/components/shared/AnimatedButton'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/shared/ErrorState'
import { Reveal } from '@/components/shared/Reveal'

export function FeaturedProperties() {
  const { data, isLoading, isError, refetch } = useProperties()

  const featured = data?.filter((p) => p.featured) ?? []

  return (
    <section className="relative bg-bone py-24 md:py-36" aria-label="Selected properties">
      <div className="container-x">
        <div className="mb-14 flex flex-col justify-between gap-10 md:mb-20 lg:flex-row lg:items-end">
          <SectionHeader
            index="02"
            eyebrow="Selected Properties"
            title="PLACES THAT MOVE BUSINESS FORWARD."
          />
          <Reveal delay={0.2}>
            <AnimatedButton to="/properties" variant="outline">
              View All Properties
            </AnimatedButton>
          </Reveal>
        </div>

        {isLoading && <FeaturedSkeleton />}
        {isError && (
          <ErrorState
            title="Properties unavailable"
            message="We could not load the portfolio right now. Please try again."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && featured.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
            <PropertyCard property={featured[0]} layout="large" className="lg:col-span-7 lg:row-span-2" eager />
            <PropertyCard
              property={featured[1]}
              layout="medium"
              className="lg:col-span-5 lg:row-span-1"
            />
            <PropertyCard
              property={featured[2]}
              layout="medium"
              className="lg:col-span-5 lg:row-span-1"
            />
            <PropertyCard
              property={featured[3]}
              layout="wide"
              className="lg:col-span-12"
            />
          </div>
        )}
      </div>
    </section>
  )
}

function FeaturedSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
      <Skeleton className="aspect-[4/3] md:min-h-[560px] lg:col-span-7 lg:row-span-2" />
      <Skeleton className="aspect-[4/3] md:min-h-[270px] lg:col-span-5" />
      <Skeleton className="aspect-[4/3] md:min-h-[270px] lg:col-span-5" />
      <Skeleton className="aspect-[16/9] md:min-h-[340px] lg:col-span-12" />
    </div>
  )
}