import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { AnimatedButton } from './AnimatedButton'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  light?: boolean
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load this content. Please try again.',
  onRetry,
  light = false,
}: ErrorStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-5 px-6 py-20 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <AlertTriangle
        className={light ? 'h-8 w-8 text-bone/50' : 'h-8 w-8 text-gold'}
        strokeWidth={1.25}
      />
      <div>
        <p
          className={`serif-display text-2xl md:text-3xl ${light ? 'text-bone' : 'text-ink'}`}
        >
          {title}
        </p>
        <p className={`mt-3 max-w-md text-sm text-muted ${light ? '!text-bone/60' : ''}`}>
          {message}
        </p>
      </div>
      {onRetry && (
        <AnimatedButton onClick={onRetry} variant={light ? 'light' : 'primary'} size="sm">
          Retry
        </AnimatedButton>
      )}
    </motion.div>
  )
}