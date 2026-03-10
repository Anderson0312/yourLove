import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["canvas"],
  images: {
    domains: ['storage.googleapis.com', 'i.ytimg.com','tailwindui.com','yt3.ggpht.com'],
  },
};

export default nextConfig;
