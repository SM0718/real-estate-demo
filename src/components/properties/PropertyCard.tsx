import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Property } from '@/types'
import { cn } from '@/lib/utils'

interface PropertyCardProps {
  property: Property
  layout?: 'large' | 'medium' | 'wide'
  className?: string
  eager?: boolean
}

const layoutClass = {
  large: 'aspect-[4/3] md:aspect-auto md:min-h-[560px]',
  medium: 'aspect-[4/3] md:min-h-[270px]',
  wide: 'aspect-[16/9] md:aspect-auto md:min-h-[340px]',
}

/**
 * Editorial property card. Image zooms, overlay deepens, metadata lifts and a
 * "View Property" cue appears on hover. Each card links to its detail page.
 */
export function PropertyCard({ property, layout = 'medium', className, eager = false }: PropertyCardProps) {
  const reduced = useReducedMotion()
  const isLarge = layout === 'large'

  return (
    <motion.div
      className={cn('group relative h-full overflow-hidden bg-sand', layoutClass[layout], className)}
      whileHover={reduced ? undefined : 'hover'}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/properties/${property.slug}`}
        className="absolute inset-0 z-10 block"
        aria-label={`View ${property.name} in ${property.location.city}`}
      />

      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={property.image}
          alt={`${property.name} — ${property.category} in ${property.location.city}, ${property.location.region}`}
          loading={eager ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/20 transition-opacity duration-500 group-hover:via-ink/20" />
      <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />

      {/* Index number */}
      <span
        className={cn(
          'absolute top-6 left-6 font-serif italic text-bone/80',
          isLarge ? 'text-2xl' : 'text-base',
        )}
      >
        {String(property.index).padStart(2, '0')}
      </span>

      {/* Arrow chip */}
      <motion.span
        className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-bone/30 bg-ink/30 text-bone backdrop-blur-sm"
        animate={reduced ? { rotate: 0 } : undefined}
        variants={reduced ? undefined : { hover: { rotate: 45 } }}
        transition={{ duration: 0.4 }}
        aria-hidden="true"
      >
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
      </motion.span>

      {/* Metadata */}
      <motion.div
        className="absolute inset-x-0 bottom-0 p-6 md:p-8"
        variants={reduced ? undefined : { hover: { y: -4 } }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-3 flex items-center gap-3">
          <span className="eyebrow text-gold">{property.category}</span>
          <span className="h-px w-6 bg-bone/30" aria-hidden="true" />
          <span className="text-[0.6rem] uppercase tracking-[0.25em] text-bone/60">
            {property.areaSqFt.toLocaleString()} SF
          </span>
        </div>
        <h3
          className={cn(
            'serif-display text-bone',
            isLarge ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl',
          )}
        >
          {property.name}
        </h3>
        <p className="mt-2 text-xs uppercase tracking-[0.22em] text-bone/70">
          {property.location.city}, {property.location.region}
        </p>

        {/* Hover cue */}
        <div className="mt-5 flex max-h-0 items-center gap-3 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-10 group-hover:opacity-100">
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-bone/80">
            View Property
          </span>
          <span className="h-px w-8 bg-gold" aria-hidden="true" />
        </div>
      </motion.div>
    </motion.div>
  )
}