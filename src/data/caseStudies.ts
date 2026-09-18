import type { CaseStudy } from '@/types'
import { IMAGES } from './images'

export const caseStudies: CaseStudy[] = [
  {
    id: 'logistics-corridor',
    title: 'A distribution platform on the Western Corridor',
    category: 'Logistics',
    location: 'Pune · Chennai',
    image: IMAGES.warehouseAisle,
    summary:
      'Assembled 3.2M SF of modern distribution space along high-throughput freight corridors, contracted to a national retail group and two third-party logistics majors.',
    metrics: [
      { label: 'Square feet', value: '3.2M' },
      { label: 'Pre-lease rate', value: '92%' },
      { label: 'Hold horizon', value: '20 yrs' },
    ],
  },
  {
    id: 'office-repositioning',
    title: 'Repositioning a 1990s office tower into Grade A',
    category: 'Office',
    location: 'Bengaluru',
    image: IMAGES.towerAlt,
    summary:
      'Acquired a dated campus, executed a phased capex and leased repositioning, taking occupancy from 62% to 97% within four years and refinanced at a lower cost of capital.',
    metrics: [
      { label: 'Occupancy', value: '97%' },
      { label: 'Rent uplift', value: '+38%' },
      { label: 'Lease tenor', value: '7.4 yrs' },
    ],
  },
  {
    id: 'data-platform',
    title: 'Contracted digital infrastructure in Mumbai',
    category: 'Data Center',
    location: 'Mumbai',
    image: IMAGES.dataCenterWide,
    summary:
      'Developed a carrier-neutral data center with a 15-year contracted anchor tenant, layering a long-duration, triple-net income stream onto the platform.',
    metrics: [
      { label: 'Contracted MW', value: '45 MW' },
      { label: 'Anchor term', value: '15 yrs' },
      { label: 'Delivered', value: '2024' },
    ],
  },
]