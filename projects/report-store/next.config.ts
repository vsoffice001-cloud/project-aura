import type { NextConfig } from 'next';

const config: NextConfig = {
  transpilePackages: ['@kenresearch/design-system', '@kenresearch/tokens'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@kenresearch/design-system'],
  },
};

export default config;
