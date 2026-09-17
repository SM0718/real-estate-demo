import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'
import { AnimatedWords } from './AnimatedText'

interface SectionHeaderProps {
  index?: string
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
  dark?: boolean
}

/**
 * Editorial section header: small numbered eyebrow, large serif headline
 * revealed word-by-word, and an optional supporting description.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  className,
  align = 'left',
  dark = false,
}: SectionHeaderProps) {
  const isCenter = align === 'center'

  return (
    <div className={cn(isCenter ? 'text-center' : '', className)}>
      {(index || eyebrow) && (
        <Reveal className="mb-6 md:mb-8">
          <div
            className={cn(
              'flex items-center gap-4',
              isCenter && 'justify-center',
            )}
          >
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
            {index && <span className={cn('h-px w-8', dark ? 'bg-line-light' : 'bg-line')} />}
            <span
              className={cn(
                'eyebrow',
                dark ? 'text-bone/70' : 'text-muted',
              )}
            >
              {eyebrow}
            </span>
          </div>
        </Reveal>
      )}
      <h2
        className={cn(
          'serif-display text-[2.5rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-[4.25rem]',
          dark ? 'text-bone' : 'text-ink',
        )}
      >
        <AnimatedWords text={title} as="span" />
      </h2>
      {description && (
        <Reveal delay={0.15} className="mt-6">
          <p
            className={cn(
              'max-w-xl text-base leading-relaxed md:text-lg',
              isCenter && 'mx-auto',
              dark ? 'text-bone/60' : 'text-muted',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}