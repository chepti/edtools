console.log("Next.config.js MONGODB_URI:", process.env.MONGODB_URI);
console.log("Next.config.js TEST_VARIABLE:", process.env.TEST_VARIABLE); // אם הוספת אותו בעבר לבדיקה

/** @type {import('next').NextConfig} */

const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({
      enabled: true,
    })
  : (config) => config;

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'img.clerk.com', // For Clerk user images
    ],
  },
  // Enable SWC minification
  // swcMinify: true,
  compiler: {
    // Enables emotion for styled components
    emotion: false,
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = withBundleAnalyzer(nextConfig); 