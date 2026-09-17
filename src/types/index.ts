export type AssetClass =
  | 'Office'
  | 'Industrial'
  | 'Logistics'
  | 'Retail'
  | 'Mixed Use'
  | 'Data Center'

export type PropertyStatus = 'Leasing' | 'Under Development' | 'Delivered' | 'Stabilized'

export interface Location {
  city: string
  region: string
  country: string
}

export interface Property {
  id: string
  slug: string
  name: string
  location: Location
  category: AssetClass
  areaSqFt: number
  status: PropertyStatus
  yearBuilt: number
  floors: number
  certification?: string
  leaseRate?: string
  assetValue?: string
  description: string
  longDescription: string
  features: string[]
  image: string
  gallery: string[]
  featured?: boolean
  index: number
}

export interface Insight {
  id: string
  slug: string
  title: string
  category: 'MARKET INSIGHTS' | 'INDUSTRIAL' | 'INVESTMENT' | 'OFFICE' | 'LOGISTICS'
  date: string
  author: string
  role: string
  readingTime: string
  excerpt: string
  image: string
  body: string[]
}

export interface Service {
  id: string
  number: string
  title: string
  description: string
  points: string[]
  image: string
}

export interface Market {
  id: string
  city: string
  properties: number
  sqft: string
  position: { x: number; y: number }
  anchor: string
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

export interface Strategy {
  name: string
  description: string
  market: string
  image: string
}

export interface InvestmentPillar {
  number: string
  title: string
  description: string
}

export interface AllocationSlice {
  label: string
  value: number
  color: string
}

export interface PropertyFilters {
  type: AssetClass | 'All'
  location: string
  status: PropertyStatus | 'All'
  size: string
  query: string
}