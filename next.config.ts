/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false, // Disable React Strict Mode

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/photo-*/**", // Allows Unsplash images
      },
    ],
  },
};
