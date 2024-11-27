/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    BASE_API_URL: 'https://visitor-management-system-backend.vercel.app/api/',
    VISITOR_REGISTRATION: 'visitor-register',
    VISITOR_BY_ID: 'visitor/',
  },
};

export default nextConfig;
