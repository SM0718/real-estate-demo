import { useEffect } from 'react'

interface SeoProps {
  title?: string
  description?: string
}

/**
 * Lightweight document head manager — sets title and meta description per page.
 * Swap for react-helmet-async if richer per-route metadata is needed.
 */
export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    if (title) document.title = title
    if (description) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', description)
    }
  }, [title, description])

  return null
}