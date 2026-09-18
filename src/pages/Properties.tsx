import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useProperties } from '@/api/queries'
import { PageHero } from '@/components/shared/PageHero'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { MetricCounter } from '@/components/shared/MetricCounter'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/shared/ErrorState'
import { Seo } from '@/components/seo/Seo'
import { IMAGES } from '@/data/images'
import { locationOptions, propertyTypes, sizeOptions, statusOptions } from '@/data/properties'
import type { AssetClass, PropertyFilters, PropertyStatus } from '@/types'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const initialFilters: PropertyFilters = {
  type: 'All',
  location: 'All',
  status: 'All',
  size: 'Any size',
  query: '',
}

export default function Properties() {
  const { data, isLoading, isError, refetch } = useProperties()
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters)
  const [debouncedQuery, setDebouncedQuery] = useState('')

  const update = <K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) =>
    setFilters((f) => ({ ...f, [key]: value }))

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(filters.query), 300)
    return () => clearTimeout(t)
  }, [filters.query])

  const filtered = useMemo(() => {
    if (!data) return []
    const q = debouncedQuery.trim().toLowerCase()
    return data.filter((p) => {
      if (filters.type !== 'All' && p.category !== (filters.type as AssetClass)) return false
      if (filters.location !== 'All' && p.location.city !== filters.location) return false
      if (filters.status !== 'All' && p.status !== (filters.status as PropertyStatus)) return false
      if (filters.size === 'Under 300k SF' && p.areaSqFt >= 300000) return false
      if (filters.size === '300k – 600k SF' && (p.areaSqFt < 300000 || p.areaSqFt > 600000)) return false
      if (filters.size === 'Over 600k SF' && p.areaSqFt <= 600000) return false
      if (q) {
        const haystack = `${p.name} ${p.location.city} ${p.location.region} ${p.category}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [data, filters, debouncedQuery])

  const activeFilterCount =
    (filters.type !== 'All' ? 1 : 0) +
    (filters.location !== 'All' ? 1 : 0) +
    (filters.status !== 'All' ? 1 : 0) +
    (filters.size !== 'Any size' ? 1 : 0)

  const clearAll = () => {
    setFilters(initialFilters)
    setDebouncedQuery('')
  }

  const totals = useMemo(() => {
    if (!data) return null
    const assets = data.length
    const cities = new Set(data.map((p) => p.location.city)).size
    const sf = data.reduce((acc, p) => acc + p.areaSqFt, 0)
    const classes = new Set(data.map((p) => p.category)).size
    return { assets, cities, sf, classes }
  }, [data])

  return (
    <>
      <Seo
        title="Portfolio | Vantage Commercial Real Estate"
        description="Explore Vantage's portfolio of commercial real estate across office, industrial, logistics, retail and mixed-use assets in India."
      />
      <PageHero
        eyebrow="Our Portfolio"
        title={'REAL ESTATE\nBUILT AROUND OPPORTUNITY.'}
        image={IMAGES.skylineNight}
        alt="City skyline at night"
        description="A curated portfolio of institutional-grade commercial assets across India's principal growth markets."
      />

      {/* Portfolio stats strip */}
      <section className="border-b border-ink/10 bg-bone" aria-label="Portfolio at a glance">
        <div className="container-x grid grid-cols-2 gap-x-6 gap-y-10 py-10 md:grid-cols-4 md:py-12">
          {totals && (
            <>
              <MetricCounter value={totals.assets} label="Institutional Assets" />
              <MetricCounter value={totals.cities} label="Markets" />
              <MetricCounter
                value={Math.round((totals.sf / 1_000_000) * 10) / 10}
                suffix="M+"
                decimals={1}
                label="Square Feet"
              />
              <MetricCounter value={totals.classes} label="Asset Classes" />
            </>
          )}
        </div>
      </section>

      <section className="bg-bone py-16 md:py-24" aria-label="Property portfolio">
        <div className="container-x">
          {/* Filter bar */}
          <div className="mb-12 border border-ink/10 bg-white/40 p-5 md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted" strokeWidth={1.5} />
                <input
                  type="search"
                  placeholder="Search properties…"
                  value={filters.query}
                  onChange={(e) => update('query', e.target.value)}
                  className="h-12 w-full border border-ink/15 bg-white/60 pl-11 pr-4 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none"
                  aria-label="Search properties"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Select value={filters.type} onValueChange={(v) => update('type', v as PropertyFilters['type'])}>
                  <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filters.location} onValueChange={(v) => update('location', v as PropertyFilters['location'])}>
                  <SelectTrigger><SelectValue placeholder="Location" /></SelectTrigger>
                  <SelectContent>
                    {locationOptions.map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filters.status} onValueChange={(v) => update('status', v as PropertyFilters['status'])}>
                  <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filters.size} onValueChange={(v) => update('size', v)}>
                  <SelectTrigger><SelectValue placeholder="Size" /></SelectTrigger>
                  <SelectContent>
                    {sizeOptions.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-muted">
                {filtered.length} {filtered.length === 1 ? 'property' : 'properties'}
              </p>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className={cn(
                    'text-[0.65rem] uppercase tracking-[0.22em] text-ink underline-offset-4 transition-colors hover:text-gold hover:underline',
                  )}
                >
                  Clear filters ({activeFilterCount})
                </button>
              )}
            </div>
          </div>

          {isLoading && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-[4/3]" />
                  <Skeleton className="mt-5 h-4 w-24" />
                  <Skeleton className="mt-3 h-7 w-3/4" />
                  <Skeleton className="mt-2 h-4 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {isError && (
            <ErrorState
              title="Portfolio unavailable"
              message="We could not load the portfolio right now. Please try again."
              onRetry={() => refetch()}
            />
          )}

          {!isLoading && !isError && filtered.length === 0 && (
            <div className="flex flex-col items-center gap-6 py-24 text-center">
              <p className="serif-display text-3xl text-ink">No properties match your criteria.</p>
              <p className="max-w-md text-sm text-muted">
                Try adjusting the filters or clearing your search to view the full portfolio.
              </p>
              <Button variant="outline" size="sm" onClick={clearAll}>
                Clear filters
              </Button>
            </div>
          )}

          {!isLoading && !isError && filtered.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((property, i) => (
                <PropertyCard key={property.id} property={property} layout="medium" eager={i < 3} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}