import { useQuery } from '@tanstack/react-query'
import {
  fetchInsight,
  fetchInsights,
  fetchProperty,
  fetchProperties,
  fetchRelatedInsights,
  fetchRelatedProperties,
} from './client'
import type { Insight, Property } from '@/types'

export const queryKeys = {
  properties: ['properties'] as const,
  property: (slug: string) => ['properties', slug] as const,
  relatedProperties: (slug: string) => ['properties', slug, 'related'] as const,
  insights: ['insights'] as const,
  insight: (slug: string) => ['insights', slug] as const,
  relatedInsights: (slug: string) => ['insights', slug, 'related'] as const,
}

export function useProperties() {
  return useQuery({
    queryKey: queryKeys.properties,
    queryFn: fetchProperties,
    staleTime: 5 * 60 * 1000,
  })
}

export function useProperty(slug: string) {
  return useQuery({
    queryKey: queryKeys.property(slug),
    queryFn: () => fetchProperty(slug),
    enabled: Boolean(slug),
  })
}

export function useRelatedProperties(property: Property | undefined) {
  return useQuery({
    queryKey: queryKeys.relatedProperties(property?.slug ?? ''),
    queryFn: () => fetchRelatedProperties(property as Property),
    enabled: Boolean(property),
  })
}

export function useInsights() {
  return useQuery({
    queryKey: queryKeys.insights,
    queryFn: fetchInsights,
    staleTime: 5 * 60 * 1000,
  })
}

export function useInsight(slug: string) {
  return useQuery({
    queryKey: queryKeys.insight(slug),
    queryFn: () => fetchInsight(slug),
    enabled: Boolean(slug),
  })
}

export function useRelatedInsights(insight: Insight | undefined) {
  return useQuery({
    queryKey: queryKeys.relatedInsights(insight?.slug ?? ''),
    queryFn: () => fetchRelatedInsights(insight as Insight),
    enabled: Boolean(insight),
  })
}