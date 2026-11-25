import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  devIndicators: false,
  // Keep the adapter and its native SQLite dependency in Node, not in the
  // development bundle (the native bindings loader needs real file paths).
  serverExternalPackages: ["@prisma/adapter-better-sqlite3"],


};

export default nextConfig;
