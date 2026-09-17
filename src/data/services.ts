import type { Service } from '@/types'
import { IMAGES } from './images'

export const services: Service[] = [
  {
    id: 'acquisitions',
    number: '01',
    title: 'Acquisitions',
    description:
      'Identifying high-conviction opportunities across commercial real estate markets.',
    points: [
      'Sourcing off-market and institutional deals',
      'Rigorous underwriting and diligence',
      'Capital-structure engineering',
    ],
    image: IMAGES.facade,
  },
  {
    id: 'development',
    number: '02',
    title: 'Development',
    description:
      'Creating destinations designed around how businesses operate today and tomorrow.',
    points: [
      'Land strategy and entitlements',
      'Design-led delivery',
      'Built-to-suit execution',
    ],
    image: IMAGES.towerUp,
  },
  {
    id: 'asset-management',
    number: '03',
    title: 'Asset Management',
    description:
      'Driving long-term performance through disciplined operations and active portfolio management.',
    points: [
      'P&L level ownership',
      'Capex programme planning',
      'Tenant and operations management',
    ],
    image: IMAGES.officeMeeting,
  },
  {
    id: 'leasing',
    number: '04',
    title: 'Leasing',
    description:
      'Connecting exceptional spaces with organizations that shape their industries.',
    points: [
      'One-stop leasing for tenants and occupiers',
      'Research-backed market positioning',
      'Transaction execution',
    ],
    image: IMAGES.workspace,
  },
  {
    id: 'investment-advisory',
    number: '05',
    title: 'Investment Advisory',
    description:
      'Providing market intelligence and strategic insight across the real estate investment lifecycle.',
    points: [
      'Market and data intelligence',
      'Portfolio strategy',
      'Deal sourcing and advisory',
    ],
    image: IMAGES.skylineNight,
  },
]