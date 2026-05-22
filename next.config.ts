import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Keep Node-only packages external (Turbopack/Edge bundlers compatibility)
  serverExternalPackages: ["socket.io", "@prisma/client"],
  images: {
    remotePatterns: [
      {protocol: "https", hostname: "lh3.googleusercontent.com"},
      {protocol: "https", hostname: "avatars.githubusercontent.com"},
    ],
  },
};

export default withNextIntl(nextConfig);
