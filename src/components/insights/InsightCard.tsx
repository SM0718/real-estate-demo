import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Insight } from '@/types'
import { cn } from '@/lib/utils'

interface InsightCardProps {
  insight: Insight
  layout?: 'large' | 'compact'
  className?: string
  eager?: boolean
}

export function InsightCard({
  insight,
  layout = 'compact',
  className,
  eager = false,
}: InsightCardProps) {
  const reduced = useReducedMotion()
  const isLarge = layout === 'large'

  return (
    <motion.article
      className={cn('group', className)}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 26 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/insights/${insight.slug}`} className="block outline-none">
        <div
          className={cn(
            'relative overflow-hidden bg-sand',
            isLarge ? 'aspect-[16/10]' : 'aspect-[16/10]',
          )}
        >
          <img
            src={insight.image}
            alt={insight.title}
            loading={eager ? 'eager' : 'lazy'}
            className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-80" />
          <motion.span
            className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-bone/85 text-ink opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100"
            style={{ translateX: 0 }}
            aria-hidden="true"
          >
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </motion.span>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-3">
            <span className="eyebrow text-gold">{insight.category}</span>
            <span className="h-px w-6 bg-line" aria-hidden="true" />
            <span className="text-[0.6rem] uppercase tracking-[0.22em] text-muted">
              {insight.date}
            </span>
          </div>
          <h3
            className={cn(
              'serif-display mt-4 text-ink transition-colors duration-300 group-hover:text-[#3a3a3a]',
              isLarge
                ? 'text-2xl leading-snug md:text-[2rem]'
                : 'text-xl leading-snug md:text-2xl',
            )}
          >
            {insight.title}
          </h3>
          <p className="mt-3 max-h-12 overflow-hidden text-sm leading-relaxed text-muted">
            {insight.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-ink">
            {insight.readingTime}
            <motion.span
              className="block h-px w-8 bg-gold"
              initial={reduced ? { width: 32 } : { width: 20 }}
              whileHover={reduced ? undefined : { width: 44 }}
            />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}