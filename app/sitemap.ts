import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL ?? "https://example.com";
  const routes = ["","/bmi","/mortgage","/loan","/age","/date-diff","/tip","/business-days"];
  return routes.map((r) => ({
    url: `${base}${r}`,
    changefreq: "weekly",
    priority: r === "" ? 1 : 0.8,
    lastModified: new Date(),
  }));
}
