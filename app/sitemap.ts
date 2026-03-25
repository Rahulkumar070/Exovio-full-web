import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://exovio.agency/", lastModified: new Date() },
    { url: "https://exovio.agency/about", lastModified: new Date() },
    { url: "https://exovio.agency/services", lastModified: new Date() },
    { url: "https://exovio.agency/work", lastModified: new Date() },
    { url: "https://exovio.agency/contact", lastModified: new Date() },
  ];
}
