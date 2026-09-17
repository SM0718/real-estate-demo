import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from '@/components/layout/Layout'
import { LoadingScreen } from '@/components/layout/LoadingScreen'

const Home = lazy(() => import('@/pages/Home'))
const Properties = lazy(() => import('@/pages/Properties'))
const PropertyDetails = lazy(() => import('@/pages/PropertyDetails'))
const Services = lazy(() => import('@/pages/Services'))
const Investments = lazy(() => import('@/pages/Investments'))
const Insights = lazy(() => import('@/pages/Insights'))
const InsightDetails = lazy(() => import('@/pages/InsightDetails'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
})

function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:slug" element={<PropertyDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AnimatePresence onExitComplete={() => setBooted(true)}>
          {!booted && <LoadingScreen key="loader" onComplete={() => setBooted(true)} />}
        </AnimatePresence>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  )
}