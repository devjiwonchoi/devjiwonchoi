import type { MetadataRoute } from "next";
import { PROD_BASE_URL } from "@/utils/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${PROD_BASE_URL}/sitemap.xml`,
  };
}
