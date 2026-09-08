export default function sitemap() {
  const baseUrl = "https://campusplugedu.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
    },
  ];
}
