import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['atomsystem'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
