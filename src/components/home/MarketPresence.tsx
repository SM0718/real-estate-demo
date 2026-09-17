import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { markets } from '@/data/markets'
import type { Market } from '@/types'
import { AnimatedWords } from '@/components/shared/AnimatedText'
import { Reveal } from '@/components/shared/Reveal'

/**
 * Interactive market presence with a stylized SVG silhouette of India.
 * Hovering a city reveals its footprint. Pure illustration — not a live map.
 */
export function MarketPresence() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState<Market | null>(null)

  return (
    <section className="relative bg-bone py-24 md:py-36" aria-label="Market presence">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:items-center">
          {/* Copy */}
          <div>
            <Reveal className="mb-8">
              <div className="flex items-center gap-4">
                <span className="font-serif text-sm italic text-gold">05</span>
                <span className="h-px w-8 bg-line" aria-hidden="true" />
                <span className="eyebrow text-muted">Market Presence</span>
              </div>
            </Reveal>
            <h2 className="serif-display text-[clamp(2.4rem,5.5vw,4.5rem)] text-ink">
              <AnimatedWords text="PRESENT WHERE OPPORTUNITY IS GROWING." />
            </h2>
            <Reveal delay={0.15} className="mt-8">
              <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
                Our teams operate on the ground across India&apos;s principal
                commercial corridors — sourcing, developing and managing assets
                where economic fundamentals support durable growth.
              </p>
            </Reveal>

            <Reveal delay={0.25} className="mt-10">
              <ul className="space-y-0">
                {markets.map((m) => (
                  <li key={m.id}>
                    <button
                      type="button"
                      className="group flex w-full items-baseline justify-between gap-4 border-b border-ink/10 py-3 text-left outline-none transition-colors hover:border-gold/50"
                      onMouseEnter={() => setActive(m)}
                      onFocus={() => setActive(m)}
                      onClick={() => setActive(m)}
                      onBlur={() => setActive(null)}
                    >
                      <span
                        className={`text-sm font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${
                          active?.id === m.id ? 'text-gold' : 'text-ink'
                        }`}
                      >
                        {m.city}
                      </span>
                      <span className="text-xs text-muted">
                        {m.properties} {m.properties === 1 ? 'property' : 'properties'}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Map */}
          <Reveal delay={0.1}>
            <div className="relative mx-auto max-w-[520px]">
              <IndiaMap active={active} setActive={setActive} reduced={Boolean(reduced)} />
              <p className="mt-6 text-center text-[0.6rem] uppercase tracking-[0.25em] text-muted">
                Stylized map · illustrative positions
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function IndiaMap({
  active,
  setActive,
  reduced,
}: {
  active: Market | null
  setActive: (m: Market | null) => void
  reduced: boolean
}) {
  return (
    <svg
      viewBox="0 0 1000 1120"
      className="w-full"
      role="img"
      aria-label="Stylized map of India showing Vantage market presence"
    >
      <defs>
        <linearGradient id="indiaFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e7e3dc" />
          <stop offset="100%" stopColor="#f5f3ef" />
        </linearGradient>
      </defs>

      {/* Landmass */}
      <motion.path
        d="M 205 105 C 240 35 305 35 330 78 C 348 105 360 118 385 130 C 420 150 470 162 520 172 C 570 182 610 172 645 170 C 680 168 700 178 728 178 C 760 178 790 185 820 205 C 852 225 878 262 892 300 C 898 322 880 340 858 348 C 840 356 824 356 806 344 C 792 335 782 322 776 306 C 768 286 764 262 748 248 C 726 230 700 224 676 224 C 650 224 630 232 614 240 C 600 250 590 262 585 278 C 580 296 582 312 578 328 C 574 344 566 356 553 366 C 540 378 524 388 516 402 C 508 418 504 434 500 452 C 498 470 498 488 495 505 C 492 523 487 540 484 558 C 480 575 478 590 492 604 C 505 618 520 628 528 644 C 536 660 539 676 546 691 C 553 707 565 721 572 738 C 580 756 585 775 592 793 C 598 811 606 828 616 844 C 626 861 635 875 645 890 C 655 905 663 922 670 940 C 676 956 684 971 695 985 C 706 1000 718 1014 731 1026 C 742 1036 750 1048 758 1060 C 765 1070 772 1082 776 1090 C 760 1080 742 1064 726 1046 C 710 1028 696 1008 682 988 C 668 968 656 946 642 924 C 628 900 612 878 596 856 C 578 831 558 808 540 786 C 522 764 504 744 488 724 C 472 704 458 684 446 662 C 434 640 424 616 412 592 C 400 568 388 545 372 522 C 356 500 340 478 322 456 C 304 436 286 418 270 400 C 254 384 240 366 226 346 C 214 328 204 308 196 286 C 188 264 182 240 178 214 C 174 190 176 164 180 142 C 184 122 192 110 205 105 Z"
        fill="url(#indiaFill)"
        stroke="#b89b5e"
        strokeOpacity="0.55"
        strokeWidth="2"
        initial={reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Optional latitude ticks */}
      {[1120 * 0.32, 1120 * 0.5, 1120 * 0.7, 1120 * 0.85].map((y) => (
        <motion.line
          key={y}
          x1="120"
          x2="880"
          y1={y}
          y2={y}
          stroke="#111111"
          strokeOpacity="0.05"
          strokeWidth="1"
          strokeDasharray="3 7"
          initial={{ opacity: reduced ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
      ))}

      {/* City markers */}
      {markets.map((m) => {
        const isActive = active?.id === m.id
        return (
          <g
            key={m.id}
            transform={`translate(${m.position.x * 10 + (m.id === 'mumbai' ? 4 : m.id === 'kolkata' ? -6 : 0)}, ${m.position.y * 11.2})`}
          >
            <circle
              r="34"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setActive(m)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(m)}
            />
            <motion.circle
              r="3.5"
              fill="#b89b5e"
              animate={
                isActive
                  ? { r: 4, opacity: 1 }
                  : reduced
                    ? undefined
                    : { opacity: [0.55, 1, 0.55] }
              }
              transition={{ duration: 2.2, repeat: reduced ? 0 : Infinity }}
            />
            <motion.circle
              r="7"
              fill="#b89b5e"
              opacity="0.25"
              animate={isActive ? { r: 14, opacity: 0 } : reduced ? undefined : { r: [6, 12], opacity: [0.25, 0] }}
              transition={{ duration: 2.2, repeat: reduced ? 0 : Infinity }}
            />
            <text
              x="11"
              y="4"
              fontSize="17"
              fill="#6b6b6b"
              letterSpacing="2"
              textAnchor="start"
              className="select-none"
              style={{ textTransform: 'uppercase' }}
            >
              {m.city}
            </text>
            <AnimatePresence>
              {isActive && (
                <motion.g
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.35 }}
                >
                  <rect x="-34" y="-104" width="150" height="86" fill="#111111" rx="2" />
                  <rect x="-34" y="-104" width="150" height="86" fill="none" stroke="#b89b5e" strokeOpacity="0.5" />
                  <text x="-18" y="-82" fontSize="20" fontWeight="500" letterSpacing="3" fill="#f5f3ef">
                    {m.city.toUpperCase()}
                  </text>
                  <text x="-18" y="-58" fontSize="16" fill="#b89b5e" letterSpacing="1">
                    {m.properties} properties
                  </text>
                  <text x="-18" y="-36" fontSize="16" fill="#f5f3ef" opacity="0.85">
                    {m.sqft} SF
                  </text>
                  <text x="-18" y="-18" fontSize="12" fill="#f5f3ef" opacity="0.5" letterSpacing="1">
                    {m.anchor}
                  </text>
                </motion.g>
              )}
            </AnimatePresence>
          </g>
        )
      })}

      {/* Legend */}
      <g transform="translate(120, 1090)">
        <circle r="3" fill="#b89b5e" />
        <text x="12" y="4" fontSize="15" fill="#6b6b6b" letterSpacing="2">
          VANTAGE MARKETS
        </text>
      </g>
    </svg>
  )
}