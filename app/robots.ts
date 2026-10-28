import type { MetadataRoute } from "next";
import { salong } from "@/lib/salong";

export const dynamic = "force-static";

// Demoen er oppdiktet og skal ikke vises i søk. På en ekte salongside: allow: "/".
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    sitemap: `${salong.url}/sitemap.xml`,
  };
}
