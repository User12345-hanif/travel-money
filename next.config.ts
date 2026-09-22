import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site's URL architecture uses trailing slashes (e.g.
  // /currencies/turkish-lira/). Serving them canonically avoids a redirect hop
  // between the canonical/sitemap URLs and the actually-served pages.
  trailingSlash: true,
};

export default nextConfig;
