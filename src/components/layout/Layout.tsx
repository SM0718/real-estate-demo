import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { FloatingCTA } from '@/components/layout/FloatingCTA'
import { pageTransition } from '@/lib/motion'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const reduced = useReducedMotion()
  const exitEnabled = !reduced

  return (
    <div className="grain relative min-h-screen bg-bone">
      <ScrollToTop />
      <ScrollProgress />
      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          variants={reduced ? undefined : pageTransition}
          initial={reduced ? { opacity: 1 } : 'hidden'}
          animate="visible"
          exit={exitEnabled ? 'exit' : undefined}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
      <FloatingCTA />
    </div>
  )
}