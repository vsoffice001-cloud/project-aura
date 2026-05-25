import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // NOTE: outputFileTracingRoot removed — Next 16 Turbopack forces this value as
  // workspace root for module resolution, breaking next/package.json lookup.
  // Re-add only when @kenresearch packages are symlinked outside project node_modules.
  transpilePackages: ['@kenresearch/design-system', '@kenresearch/tokens'],
  // Hide floating "N" dev indicator (clutters screenshots · disables turbopack build status pill)
  devIndicators: false,
};

export default nextConfig;
