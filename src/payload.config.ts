import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "./payload/collections/Media";
import { Users } from "./payload/collections/Users";

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {},
    avatar: { Component: "@/components/(payload)/admin/Header/UserAvatar" },
  },
  collections: [Users, Media],
  secret: process.env.PAYLOAD_SECRET || "PAYLOAD_SECRET",
  typescript: {
    outputFile: "./src/payload-types.ts",
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    idType: "uuid",
    push: true, // DO NOT USE ON PRODUCTION
  }),
  sharp,
  plugins: [],
  email: resendAdapter({
    defaultFromAddress: "send@aurimarlopes.com",
    defaultFromName: "Aurimar",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
});
