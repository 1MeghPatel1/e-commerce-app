import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Check the NODE_ENV environment variable to determine the environment
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://your-production-api-url.com"
        : process.env.NEXT_PUBLIC_API_URL || `http://localhost:${3001}`;
        
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiUrl}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;

