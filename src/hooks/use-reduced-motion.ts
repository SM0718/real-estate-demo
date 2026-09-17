import { useReducedMotion } from 'framer-motion'

export function usePrefersReducedMotion() {
  return useReducedMotion()
}

/**
 * Resolves a motion value driven by scroll/timeline. When the user prefers
 * reduced motion, it hard-wires the value so nothing moves.
 */
export function useReducedMotionValue(value: number, device?: boolean) {
  const reduced = useReducedMotion()
  return reduced && device ? value : device
}