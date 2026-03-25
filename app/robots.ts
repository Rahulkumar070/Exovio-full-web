import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://exovio.agency/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0, // highest — homepage
    },
    {
      url: "https://exovio.agency/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://exovio.agency/services",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9, // high — key conversion page
    },
    {
      url: "https://exovio.agency/work",
      lastModified: new Date(),
      changeFrequency: "weekly", // updated often with new projects
      priority: 0.8,
    },
    {
      url: "https://exovio.agency/contact",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
