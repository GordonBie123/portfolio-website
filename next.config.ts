import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old café and chooser routes now live at the home page
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: false },
      { source: "/cafe", destination: "/", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
    ],
  },
};

export default nextConfig;
