import { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/*
 * `output: "export"` has no request to generate this on, so it must be generated at build time.
 * Next requires that to be stated rather than inferred, because the alternative -- a route that
 * wants to be dynamic in a build that cannot be -- is a silent 404 on the deployed site.
 *
 * `lastModified` therefore means "when the site was last built", which for a static deploy is the
 * same thing as when it last changed.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE.www;

  // Staging (NEXT_PUBLIC_NOINDEX=true) is crawlable, so agents and reviewers can fetch it to test
  // (dev, 2026-11-06); the noindex meta on every page keeps it out of search results, and a
  // crawler has to fetch a page to see that.
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
