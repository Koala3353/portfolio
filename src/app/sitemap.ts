import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { allRoutes, site } from "@/lib/site";

export const dynamic = "force-static";

// Higher priority for the pages a recruiter or searcher should land on first.
const priorities: Record<string, number> = {
  "/": 1,
  "/projects": 0.9,
  "/experience": 0.9,
  "/about": 0.8,
  "/cv": 0.8,
  "/achievements": 0.7,
  "/services": 0.6,
  "/testimonials": 0.5,
  "/contact": 0.5,
};

// Last commit touching a route's page (or its data), so Google sees real update dates.
function lastModified(route: string): Date {
  const page = route === "/" ? "src/app/page.tsx" : `src/app${route}/page.tsx`;
  try {
    const iso = execSync(`git log -1 --format=%cI -- ${page} src/data`, { encoding: "utf8" }).trim();
    if (iso) return new Date(iso);
  } catch {}
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes.map((route) => ({
    url: `${site.url}${route === "/" ? "/" : route}`,
    lastModified: lastModified(route),
    changeFrequency: route === "/" || route === "/projects" ? "weekly" : "monthly",
    priority: priorities[route] ?? 0.5,
    ...(route === "/" && { images: [`${site.url}/opengraph-image`] }),
  }));
}
