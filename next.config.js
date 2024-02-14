/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_SERVER_PROTOCOL ,
        hostname: process.env.NEXT_PUBLIC_SERVER_HOST,
        port: process.env.NEXT_PUBLIC_SERVER_PORT,
        pathname: process.env.NEXT_PUBLIC_SERVER_PATH,
      },
    ],
  },
}
module.exports = nextConfig
