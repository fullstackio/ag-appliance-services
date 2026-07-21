import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained `.next/standalone` build (server.js + the minimal
  // subset of node_modules needed at runtime). This is what the Docker
  // `runner` stage copies, so the final image ships without a full
  // `node_modules` install. See node_modules/next/dist/docs/.../output.md.
  output: "standalone",
};

export default nextConfig;
