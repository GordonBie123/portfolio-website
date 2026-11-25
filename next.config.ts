import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old routes from earlier versions of the site
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: false },
      { source: "/cafe", destination: "/", permanent: false },
      // the old pages now open as sheets on the home page
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/experience", destination: "/#experience", permanent: false },
      { source: "/work", destination: "/#experience", permanent: false },
      { source: "/contact", destination: "/", permanent: false },
      { source: "/cv", destination: "/Bie_Gordon_CV.pdf", permanent: false },
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
