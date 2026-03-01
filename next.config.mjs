/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ui-avatars.com", "picsum.photos"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/**",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
