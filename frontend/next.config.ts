import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    }
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_HOST_NAME || 'localhost',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
