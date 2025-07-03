"use strict";

// next.config.js
var nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        // Added Firebase Storage
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**"
      }
      // No need to add patterns for local images in /public
    ]
  }
};
module.exports = nextConfig;
