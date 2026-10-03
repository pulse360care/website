import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/locales";
import { en } from "@/lib/i18n/en";
import { doctorLive, tamilLive } from "@/lib/config";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://pulse360care.in").replace(/\/+$/, "");

const staticPaths = [
  "",
  "/about",
  "/technology-and-trust",
  "/blog",
  "/for-professionals",
  "/for-hospitals",
  "/contact",
  ...(doctorLive ? ["/doctor-consultation"] : []),
  // CHANGES-2026-10-03 #3: an article stays out of the sitemap until a
  // clinician has reviewed it (matches the noindex in blog/[slug]/page.tsx).
  ...en.blog.posts.filter((post) => post.reviewed).map((post) => `/blog/${post.slug}`),
];

/**
 * CHANGES-2026-09-30 #15: `/ta` stays out of the sitemap while `tamilLive`
 * is false — the routes still exist and serve content, they're just not
 * advertised for indexing yet (see the matching `noindex` in
 * app/[locale]/layout.tsx's generateMetadata).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const activeLocales = tamilLive ? locales : (["en"] as const);
  return activeLocales.flatMap((locale) => staticPaths.map((path) => ({ url: `${siteUrl}/${locale}${path}` })));
}
