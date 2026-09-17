import { Hero } from '@/components/home/Hero'
import { Metrics } from '@/components/home/Metrics'
import { FeaturedProperties } from '@/components/home/FeaturedProperties'
import { InvestmentPhilosophy } from '@/components/home/InvestmentPhilosophy'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { MarketPresence } from '@/components/home/MarketPresence'
import { AboutPreview } from '@/components/home/AboutPreview'
import { InsightsPreview } from '@/components/home/InsightsPreview'
import { Testimonials } from '@/components/home/Testimonials'
import { HomeContactCTA } from '@/components/home/HomeContactCTA'
import { Seo } from '@/components/seo/Seo'

export default function Home() {
  return (
    <>
      <Seo
        title="Vantage Commercial Real Estate | Creating Long-Term Value"
        description="Vantage is a commercial real estate platform focused on acquisition, development, investment and asset management."
      />
      <Hero />
      <Metrics />
      <FeaturedProperties />
      <InvestmentPhilosophy />
      <ServicesPreview />
      <MarketPresence />
      <AboutPreview />
      <InsightsPreview />
      <Testimonials />
      <HomeContactCTA />
    </>
  )
}