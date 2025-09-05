import path from "node:path";
import { withPayload } from "@payloadcms/next/withPayload";
import type { Configuration } from "webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  experimental: {
    reactCompiler: true,
  },
  webpack: (webpackConfig: Configuration) => {
    webpackConfig.resolve ??= {}; // garante que resolve existe
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };

    return webpackConfig;
  },
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

// Make sure you wrap your `nextConfig`
// with the `withPayload` plugin
export default withPayload(nextConfig, { devBundleServerPackages: false });
