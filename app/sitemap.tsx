import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://99-f.com',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://99-f.com/jobs',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://99-f.com/location',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://99-f.com/community',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://99-f.com/article',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://99-f.com/jobs/post-view',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://99-f.com/location/post-view',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://99-f.com/community/post-view',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://99-f.com/article/post-view',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.6,
    }
  ]
}