import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://developments.elemangroup.com'
  const lastModified = new Date()

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ar`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ar/about`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ar/projects`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/projects`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ar/investment`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/investment`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ar/contact`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Sample project routes - replace with dynamic data when available
  const projectRoutes = [
    'el-eman-heights',
    'belief-gardens',
    'eman-plaza',
    'coastal-retreat'
  ].flatMap(slug => [
    {
      url: `${baseUrl}/ar/projects/${slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/projects/${slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ])

  return [...staticRoutes, ...projectRoutes]
}
