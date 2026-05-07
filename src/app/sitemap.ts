export default async function Sitemap() {
  const baseUrl = 'https://example.com';

  return [
    { url: baseUrl },
    { url: `${baseUrl}/profiles` },
    { url: `${baseUrl}/category/independent` },
    { url: `${baseUrl}/service/massage` },
    { url: `${baseUrl}/delhi` },
  ];
}