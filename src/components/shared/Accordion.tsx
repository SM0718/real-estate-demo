import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { Faq } from '@/types'
import { cn } from '@/lib/utils'

interface AccordionProps {
  items: Faq[]
  className?: string
  dark?: boolean
  defaultOpen?: number
}

/**
 * Accessible single-open accordion with animated height. Used for FAQ and
 * similar disclosure lists.
 */
export function Accordion({ items, className, dark = false, defaultOpen = 0 }: AccordionProps) {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState<number | null>(defaultOpen)

  return (
    <div className={cn('divide-y', dark ? 'divide-line-light' : 'divide-ink/10', className)}>
      {items.map((item, i) => {
        const isOpen = open === i
        const id = `faq-${i}`
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={id}
              className={cn(
                'group flex w-full items-center justify-between gap-6 py-6 text-left outline-none md:py-7',
              )}
            >
              <span
                className={cn(
                  'serif-display text-xl leading-snug transition-colors duration-300 md:text-2xl',
                  dark ? (isOpen ? 'text-gold' : 'text-bone') : isOpen ? 'text-ink' : 'text-ink/80',
                  'group-hover:text-gold',
                )}
              >
                {item.question}
              </span>
              <motion.span
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300',
                  dark
                    ? 'border-bone/25 text-bone group-hover:border-gold group-hover:text-gold'
                    : 'border-ink/15 text-ink group-hover:border-gold group-hover:text-gold',
                )}
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              >
                <Plus className="h-4 w-4" strokeWidth={1.5} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={id}
                  role="region"
                  initial={reduced ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={reduced ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p
                    className={cn(
                      'max-w-2xl pb-7 text-sm leading-relaxed md:text-base',
                      dark ? 'text-bone/60' : 'text-muted',
                    )}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}