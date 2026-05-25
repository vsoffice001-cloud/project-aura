import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  outputFileTracingRoot: path.resolve(__dirname, '../..'),
  transpilePackages: ['@kenresearch/design-system', '@kenresearch/tokens'],
};

export default nextConfig;
