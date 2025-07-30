const nextConfig = {
  images: {
    domains: [
      "sportfix-git-main-mauricio-ferge-projects.vercel.app", // Domínio da Vercel
      "sportfix.vercel.app", // Substituir pelo domínio principal
    ],
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
