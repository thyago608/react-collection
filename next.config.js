/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["d1ptd3zs6hice0.cloudfront.net", "d3j9qmbv5hjp0y.cloudfront.net"],
  },
};

module.exports = nextConfig;
