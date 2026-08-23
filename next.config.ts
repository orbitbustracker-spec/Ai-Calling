import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["*"], // Note: In production, specify exact domains
  },
  allowedDevOrigins: ['127.0.0.1', 'localhost', '192.168.1.66'],
};

export default nextConfig;
