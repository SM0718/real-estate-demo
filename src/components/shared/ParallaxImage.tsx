import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  speed?: number
  reveal?: boolean
  objectPosition?: string
}

/**
 * Image wrapper with a subtle parallax on scroll and an optional
 * clip-path reveal on first entry. Image scales slightly to avoid
 * exposing edges during the parallax.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  speed = 0.08,
  reveal = false,
  objectPosition = 'center',
}: ParallaxImageProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`])
  const safeY = reduced ? 0 : y

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="absolute -inset-y-[12%] inset-x-0 will-change-transform"
        style={{ y: safeY }}
        initial={reveal && !reduced ? { clipPath: 'inset(0 100% 0 0)' } : false}
        whileInView={
          reveal && !reduced ? { clipPath: 'inset(0 0% 0 0)' } : undefined
        }
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn('h-full w-full object-cover', imgClassName)}
          style={{ objectPosition }}
          initial={reveal && !reduced ? { scale: 1.06 } : false}
          whileInView={reveal && !reduced ? { scale: 1 } : undefined}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </div>
  )
}