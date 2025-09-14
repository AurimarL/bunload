import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
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
    push: false, // DO NOT USE ON PRODUCTION
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      // Specify which collections should use Vercel Blob
      collections: {
        media: true,
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  email: resendAdapter({
    defaultFromAddress: "send@aurimarlopes.com",
    defaultFromName: "Aurimar",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
});
