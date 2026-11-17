import type { NextConfig } from "next";

// The multi-page version is served under a sub-path of dev.dealer.winal.ru (default "/full").
// Set NEXT_PUBLIC_BASE_PATH="" to build it for the domain root. The same value feeds asset() in src/lib/asset.ts.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/full";
process.env.NEXT_PUBLIC_BASE_PATH = basePath;

// Until there is an SEO decision every response carries a noindex header. Set SITE_INDEXING=1 to lift it.
const siteIndexing = process.env.SITE_INDEXING === "1";

const nextConfig: NextConfig = {
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  allowedDevOrigins: ["192.168.1.118", "172.23.144.1"],
  // The old installation pages are replaced by the «Монтаж» screen on the home page.
  async redirects() {
    return [
      { source: "/tech/montazh-panelej", destination: "/#montazh", permanent: false },
      { source: "/tech/montazh-panelej/:path*", destination: "/#montazh", permanent: false },
    ];
  },
  async headers() {
    if (siteIndexing) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
