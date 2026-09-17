import type { Testimonial, TimelineEvent, Strategy, InvestmentPillar, AllocationSlice } from '@/types'
import { IMAGES } from './images'

export interface NavItem {
  label: string
  to: string
}

export const navItems: NavItem[] = [
  { label: 'Properties', to: '/properties' },
  { label: 'Services', to: '/services' },
  { label: 'Investments', to: '/investments' },
  { label: 'Insights', to: '/insights' },
  { label: 'About', to: '/about' },
]

export const COMPANY = {
  name: 'Vantage',
  fullName: 'Vantage Commercial Real Estate',
  tagline: 'Where exceptional spaces create exceptional value.',
  phone: '+91 00000 00000',
  email: 'hello@vantage-demo.com',
  cities: ['Mumbai', 'Bengaluru', 'New Delhi'],
  metrics: [
    {
      value: 2.4,
      prefix: '$',
      suffix: 'B+',
      decimals: 1,
      label: 'Assets Under Management',
    },
    {
      value: 18,
      suffix: 'M+',
      label: 'Square Feet Managed',
    },
    {
      value: 32,
      label: 'Markets',
    },
    {
      value: 24,
      suffix: '+',
      label: 'Years of Experience',
    },
  ],
} as const

export const testimonials: Testimonial[] = [
  {
    quote:
      'Vantage understands that great real estate is not simply about the building. It\u2019s about creating an environment where businesses can perform.',
    name: 'Arjun Mehta',
    role: 'Chief Operating Officer',
    company: 'Example Capital',
  },
  {
    quote:
      'Their discipline underwriting and local intelligence gave us conviction to deploy capital into assets we could not have sourced internally.',
    name: 'Sara Whitfield',
    role: 'Partner, Investment Committee',
    company: 'Meridian Family Office',
  },
  {
    quote:
      'What separates Vantage is ownership. They manage the asset as if it were their own — and the difference shows in occupancy, operations and renewal rates.',
    name: 'Vikram Khanna',
    role: 'Group Treasurer',
    company: 'Northstar Industries',
  },
]

export const timeline: TimelineEvent[] = [
  {
    year: '2002',
    title: 'Vantage founded',
    description:
      'Founded in Mumbai with a focus on institutional-grade commercial office assets and a long-term ownership philosophy.',
  },
  {
    year: '2008',
    title: 'Expanded into institutional office assets',
    description:
      'Acquired and repositioned landmark office towers through the downturn, establishing our core underwriting discipline.',
  },
  {
    year: '2014',
    title: 'Entered industrial & logistics',
    description:
      'Pioneered the modern logistics asset class in India, acquiring and developing large-format distribution facilities.',
  },
  {
    year: '2019',
    title: 'Launched investment platform',
    description:
      'Established an institutional investment platform with aligned co-investment and dedicated fund management.',
  },
  {
    year: '2024',
    title: 'Expanded into data infrastructure',
    description:
      'Entered digital infrastructure — a deliberate, contracted, long-duration extension of our institutional thesis.',
  },
]

export const strategies: Strategy[] = [
  {
    name: 'Office',
    description:
      'Grade A office assets in deep-labour markets, engineered for occupier performance and long-term relevance.',
    market: 'Mumbai · Bengaluru · Delhi NCR',
    image: IMAGES.tower,
  },
  {
    name: 'Industrial',
    description:
      'Built-to-suit and large-format manufacturing campuses serving export and heavy-engineering corridors.',
    market: 'Chennai · Pune',
    image: IMAGES.warehouseAisle,
  },
  {
    name: 'Logistics',
    description:
      'Modern distribution facilities on strategic freight corridors with proven occupier demand.',
    market: 'Pune · Chennai',
    image: IMAGES.warehouse,
  },
  {
    name: 'Retail',
    description:
      'Curated destinations and high-street assets where dwell time drives defensible income.',
    market: 'Hyderabad · Kolkata',
    image: IMAGES.retail,
  },
  {
    name: 'Mixed Use',
    description:
      'Integrated districts that layer office, retail and hospitality around a coherent sense of place.',
    market: 'Hyderabad · Delhi NCR',
    image: IMAGES.retailStreet,
  },
  {
    name: 'Data Centers',
    description:
      'Carrier-neutral, contracted digital infrastructure for the long-duration demand of a digital economy.',
    market: 'Mumbai',
    image: IMAGES.dataCenter,
  },
]

export const investmentPillars: InvestmentPillar[] = [
  {
    number: '01',
    title: 'Disciplined Underwriting',
    description:
      'Every investment is stress-tested against market, tenant and capital-cycle scenarios before capital is committed.',
  },
  {
    number: '02',
    title: 'Local Market Expertise',
    description:
      'Our teams operate on the ground in each market, building relationships and intelligence that remote analysis cannot replicate.',
  },
  {
    number: '03',
    title: 'Long-Term Ownership',
    description:
      'We build and hold. Our time horizon aligns us with tenants, communities and partners over multiple market cycles.',
  },
]

export const allocation: AllocationSlice[] = [
  { label: 'Office', value: 38, color: '#b89b5e' },
  { label: 'Industrial', value: 27, color: '#6b6b6b' },
  { label: 'Logistics', value: 18, color: '#111111' },
  { label: 'Retail', value: 10, color: '#3a3a3a' },
  { label: 'Other', value: 7, color: '#d8d4cb' },
]

export const trackRecord = [
  { year: '2021', label: 'Portfolio occupancy (weighted avg)', value: '94%' },
  { year: '2022', label: 'NOI growth (same-store)', value: '+8.4%' },
  { year: '2023', label: 'Portfolio occupancy (weighted avg)', value: '95%' },
  { year: '2024', label: 'Same-store NOI growth', value: '+7.9%' },
  { year: '2025', label: 'Weighted average lease tenor', value: '6.2 yrs' },
]