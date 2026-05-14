import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias["@data"] = path.resolve(__dirname, "../../data");
    return config;
  },
};

export default nextConfig;
