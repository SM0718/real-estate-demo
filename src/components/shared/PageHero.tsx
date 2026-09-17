import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { RevealLines, AnimatedWords } from '@/components/shared/AnimatedText'

interface PageHeroProps {
  eyebrow: string
  title: string
  image: string
  description?: string
  alt?: string
}

/**
 * Full-bleed editorial hero used on every inner page: image with parallax,
 * layered overlay and headline reveal.
 */
export function PageHero({ eyebrow, title, image, description, alt }: PageHeroProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '14%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.75], [0.55, reduced ? 0.55 : 0.92])

  return (
    <section ref={ref} className="relative flex min-h-[62vh] items-end overflow-hidden bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute -inset-y-[10%] inset-x-0">
          <img src={image} alt={alt ?? ''} className="h-full w-full object-cover" />
        </div>
      </motion.div>
      <motion.div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/40" style={{ opacity: overlayOpacity }} />

      <div className="container-x relative z-10">
        <motion.p
          className="eyebrow mb-6 flex items-center gap-4 text-bone/70"
          initial={{ opacity: reduced ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="h-px w-10 bg-gold" />
          {eyebrow}
        </motion.p>

        {title.split('\n').length > 1 ? (
          <h1 className="serif-display max-w-4xl text-[clamp(2.6rem,7vw,6.5rem)] text-bone">
            <RevealLines delay={0.2}>
              {title.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === title.split('\n').length - 1 ? line.replace(/\.$/, '') + '.' : line}
                </span>
              ))}
            </RevealLines>
          </h1>
        ) : (
          <h1 className="serif-display max-w-4xl text-[clamp(2.6rem,7vw,6.5rem)] text-bone">
            <AnimatedWords text={title} delay={0.15} />
          </h1>
        )}

        {description && (
          <motion.p
            className="mt-8 max-w-xl text-base leading-relaxed text-bone/70 md:text-lg"
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}