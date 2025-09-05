import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {},
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
  }),
  sharp,
  plugins: [],
});
