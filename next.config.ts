import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  images: {
    domains: ["*"], // Note: In production, specify exact domains
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ['127.0.0.1', 'localhost', '192.168.1.66'],
};

export default nextConfig as NextConfig;
