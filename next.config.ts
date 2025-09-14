import path from "node:path";
import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  experimental: {
    reactCompiler: true,
  },
  turbopack: {
    root: path.join(__dirname, ".."),
  },
   images: {
    domains: ["www.gravatar.com"],
  },
};

// Make sure you wrap your `nextConfig`
// with the `withPayload` plugin
export default withPayload(nextConfig, { devBundleServerPackages: false });
