import { properties } from '@/data/properties'
import { insights } from '@/data/insights'
import type { Insight, Property } from '@/types'

const delay = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms))
const latency = (min = 280, max = 620) => min + Math.random() * (max - min)

/**
 * Simulated API layer. Each function mirrors a REST endpoint:
 *
 *   GET /api/properties          -> fetchProperties()
 *   GET /api/properties/:slug    -> fetchProperty(slug)
 *   GET /api/insights            -> fetchInsights()
 *   GET /api/insights/:slug      -> fetchInsight(slug)
 *
 * Swap the bodies for real fetch() calls when a backend becomes available.
 */
export async function fetchProperties(): Promise<Property[]> {
  await delay(latency())
  return properties
}

export async function fetchProperty(slug: string): Promise<Property> {
  await delay(latency())
  const found = properties.find((p) => p.slug === slug)
  if (!found) throw new Error('Property not found')
  return found
}

export async function fetchRelatedProperties(property: Property): Promise<Property[]> {
  await delay(latency(200, 420))
  return properties
    .filter((p) => p.slug !== property.slug)
    .sort((a, b) => {
      const aScore = a.category === property.category ? 1 : 0
      const bScore = b.category === property.category ? 1 : 0
      return bScore - aScore
    })
    .slice(0, 3)
}

export async function fetchInsights(): Promise<Insight[]> {
  await delay(latency())
  return insights
}

export async function fetchInsight(slug: string): Promise<Insight> {
  await delay(latency())
  const found = insights.find((i) => i.slug === slug)
  if (!found) throw new Error('Article not found')
  return found
}

export async function fetchRelatedInsights(insight: Insight): Promise<Insight[]> {
  await delay(latency(200, 420))
  return insights.filter((i) => i.slug !== insight.slug).slice(0, 2)
}