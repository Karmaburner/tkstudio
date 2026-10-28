import type { MetadataRoute } from "next";
import { salong } from "@/lib/salong";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const sider = ["", "/frisyrer", "/priser", "/bestill-time", "/om-demoen"];
  return sider.map((s) => ({ url: `${salong.url}${s}/`, lastModified: new Date() }));
}
