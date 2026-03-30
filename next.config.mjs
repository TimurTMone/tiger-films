/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ui-avatars.com", "picsum.photos", "drive.google.com", "lh3.googleusercontent.com"],
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
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/**",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
