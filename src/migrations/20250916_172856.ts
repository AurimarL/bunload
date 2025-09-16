import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "nav_main_links" RENAME COLUMN "title" TO "name";
  ALTER TABLE "nav_main_projects" RENAME COLUMN "title" TO "name";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "nav_main_links" RENAME COLUMN "name" TO "title";
  ALTER TABLE "nav_main_projects" RENAME COLUMN "name" TO "title";`)
}
