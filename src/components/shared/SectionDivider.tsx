import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionDividerProps {
  index?: string
  label?: string
  dark?: boolean
  className?: string
}

/**
 * Thin editorial divider: an index number, a label and a hairline that
 * draws in from the left when scrolled into view.
 */
export function SectionDivider({
  index,
  label,
  dark = false,
  className,
}: SectionDividerProps) {
  const reduced = useReducedMotion()
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {index && (
        <span
          className={cn(
            'font-serif text-sm italic',
            dark ? 'text-gold' : 'text-gold',
          )}
        >
          {index}
        </span>
      )}
      {label && (
        <span className={cn('eyebrow', dark ? 'text-bone/70' : 'text-muted')}>{label}</span>
      )}
      <motion.span
        className={cn('h-px flex-1', dark ? 'bg-line-light' : 'bg-line')}
        initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  )
}