import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.uepa.br" },
      { protocol: "https", hostname: "www.fiap.com.br" },
    ],
  },
};

export default nextConfig;
