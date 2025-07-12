/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages requires static export
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  images: {
    unoptimized: true,
  },
  
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig
