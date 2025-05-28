import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_HOST_NAME,
        port: '8080',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
