import type { Leader } from '@/types'
import { IMAGES } from './images'

export const leaders: Leader[] = [
  {
    name: 'Ravi Chandran',
    role: 'Managing Partner',
    bio: 'Co-founded Vantage in 2002 and has led more than $2.4B across acquisitions and development in India\'s principal markets.',
    image: IMAGES.portrait1,
  },
  {
    name: 'Meera Iyer',
    role: 'Partner, Capital Markets',
    bio: 'Formerly an institutional allocator, now deploys and structures equity partnerships across Vantage\'s investment platform.',
    image: IMAGES.portrait2,
  },
  {
    name: 'Aditya Malhotra',
    role: 'Partner, Development',
    bio: 'Oversees design-led delivery and built-to-suit execution, from land strategy through stabilization.',
    image: IMAGES.portrait3,
  },
  {
    name: 'Karan Bhandari',
    role: 'Partner, Asset Management',
    bio: 'Leads portfolio operations, capex planning and leasing strategy across the stabilized platform.',
    image: IMAGES.portrait4,
  },
]