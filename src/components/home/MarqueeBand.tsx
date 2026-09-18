import { Marquee } from '@/components/shared/Marquee'

/**
 * Thin gold ticker band placed directly below the hero. Repeats the full
 * service lifecycle as a scrolling accent strip.
 */
export function MarqueeBand() {
  const items = [
    'Acquisitions',
    'Development',
    'Asset Management',
    'Leasing',
    'Investment Advisory',
  ]

  return (
    <div className="relative overflow-hidden bg-gold text-ink" aria-hidden="true">
      <Marquee
        items={items}
        duration={40}
        separator="✦"
        edgeClassName="from-gold"
        itemClassName="text-[0.65rem] font-medium uppercase tracking-[0.32em] md:text-[0.7rem]"
        className="py-4 md:py-5"
      />
    </div>
  )
}