import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.exovio.agency/",
      lastModified: new Date(),
    },
    {
      url: "https://www.exovio.agency/about",
      lastModified: new Date(),
    },
    {
      url: "https://www.exovio.agency/services",
      lastModified: new Date(),
    },
    {
      url: "https://www.exovio.agency/work",
      lastModified: new Date(),
    },
    {
      url: "https://www.exovio.agency/contact",
      lastModified: new Date(),
    },
  ];
}
