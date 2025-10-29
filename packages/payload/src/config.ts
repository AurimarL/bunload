// storage-adapter-import-placeholder

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { Todos } from "./collections/Todo";

// const dirname = import.meta.url

export const config = (secret: string, dbUri: string) =>
	buildConfig({
		admin: {
			user: Users.slug,
			importMap: {
				// baseDir: dirname,
			},
		},
		collections: [Users, Media, Todos],
		editor: lexicalEditor(),
		secret: secret,
		typescript: {
			// outputFile: `src/payload-types.ts`,
			outputFile: `src/payload-types.ts`,
		},
		// database-adapter-config-start
		db: postgresAdapter({
			// Postgres-specific arguments go here.
			// `pool` is required.
			pool: {
				connectionString: dbUri,
			},
			idType: "uuid"
		}),
		// database-adapter-config-end
		plugins: [
			// storage-adapter-placeholder
		],
	});
