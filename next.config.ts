import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  async redirects() {
    return [
      {
        source: "/mississauga",
        destination: "/locations/mississauga",
        permanent: true,
      },
      {
        source: "/portal/sign",
        destination: "/portal/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;