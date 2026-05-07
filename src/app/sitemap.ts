import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://example.com';
  const lastModified = new Date();

  // Mock Data for Sitemap
  const cities = ['delhi', 'mumbai', 'bangalore'];
  const categories = ['independent', 'premium', 'vip', 'college-girls'];
  const profiles = [
    { city: 'delhi', slug: 'ananya' },
    { city: 'mumbai', slug: 'neha' },
    { city: 'bangalore', slug: 'priya' },
  ];

  const cityUrls = cities.map(city => ({
    url: `${baseUrl}/${city}/`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  const categoryUrls = cities.flatMap(city => 
    categories.map(cat => ({
      url: `${baseUrl}/${city}/${cat}/`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  const profileUrls = profiles.map(p => ({
    url: `${baseUrl}/${p.city}/${p.slug}/`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/profiles/`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...cityUrls,
    ...categoryUrls,
    ...profileUrls,
  ];
}