/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'th.bing.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {}


// module.exports = {
//   ...nextConfig,
//   typescript: {
//     ignoreBuildErrors: true,
//   },
// images: {
//   domains: ["th.bing.com"],
// }
// }