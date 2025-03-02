/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    domains: ['res.cloudinary.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;