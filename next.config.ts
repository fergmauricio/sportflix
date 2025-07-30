const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sportflix-three.vercel.app",
      },

      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
