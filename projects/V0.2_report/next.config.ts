import type { NextConfig } from 'next';

const config: NextConfig = {
  transpilePackages: ['@kenresearch/design-system', '@kenresearch/tokens'],
  experimental: {
    optimizePackageImports: ['lucide-react', '@kenresearch/design-system'],
  },
};

export default config;
