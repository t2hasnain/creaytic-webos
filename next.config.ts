// Copyright (c) 2026 Hasnain (https://t2hasnain.me). All rights reserved.
// Licensed under the Creaytic WebOS Proprietary Commercial Source & Security License.
// Made by Hasnain <t2hasnain.me>

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
