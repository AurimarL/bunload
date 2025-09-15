import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
// I18N
import { en } from "@payloadcms/translations/languages/en";
import { pt } from "@payloadcms/translations/languages/pt";
import { buildConfig } from "payload";
import sharp from "sharp";
import { migrations } from "./migrations";
// Collections
import { Media } from "./payload/collections/Media";
import Roles from "./payload/collections/Roles";
import { Users } from "./payload/collections/Users";

// const isProd = process.env.NODE_ENV === "production";
const isProd = true;

export default buildConfig({
  editor: lexicalEditor(),
  admin: {
    user: Users.slug,
    importMap: {},
    avatar: { Component: "@/components/(payload)/admin/Header/UserAvatar" },
  },
  collections: [Users, Media, Roles],
  secret: process.env.PAYLOAD_SECRET || "PAYLOAD_SECRET",
  typescript: {
    outputFile: "./src/payload-types.ts",
  },
  db: postgresAdapter({
    pool: {
      connectionString: isProd
        ? process.env.DATABASE_URI
        : process.env.DEV_DATABASE_URI,
    },
    idType: "uuid",
    push: false,
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: isProd,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY || "",
    defaultFromName: process.env.RESEND_NAME || "",
    defaultFromAddress: process.env.RESEND_EMAIL || "",
  }),
  i18n: {
    fallbackLanguage: "pt",
    supportedLanguages: { en, pt },
  },
});
