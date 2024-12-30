import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  // User-agent: *
  // Disallow: /
  // Allow : /

  // # Google Search
  // User-agent: Googlebot
  // Disallow: /
  // Allow : /

  // # Naver Search
  // User-agent: Yeti
  // Disallow: /
  // Allow : /

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: '/',
      },
      {
        userAgent: ['Applebot', 'Bingbot'],
        allow: ['/'],
        disallow: '/',
      },
      {
        userAgent: ['Yeti'],
        allow: ['/'],
        disallow: '/',
      },
    ],
    sitemap: 'https://99-f.com/sitemap.xml',
  }
}