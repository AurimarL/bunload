import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "teams" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"logo_id" uuid,
  	"plan" varchar DEFAULT 'free',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "nav_main_links_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "nav_main_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"icon" varchar NOT NULL
  );
  
  CREATE TABLE "nav_main_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "nav_main" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_rels" ADD COLUMN "teams_id" uuid;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "teams_id" uuid;
  ALTER TABLE "teams" ADD CONSTRAINT "teams_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "nav_main_links_items" ADD CONSTRAINT "nav_main_links_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_main_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_main_links" ADD CONSTRAINT "nav_main_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_main"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_main_projects" ADD CONSTRAINT "nav_main_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_main"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "teams_logo_idx" ON "teams" USING btree ("logo_id");
  CREATE INDEX "teams_updated_at_idx" ON "teams" USING btree ("updated_at");
  CREATE INDEX "teams_created_at_idx" ON "teams" USING btree ("created_at");
  CREATE INDEX "nav_main_links_items_order_idx" ON "nav_main_links_items" USING btree ("_order");
  CREATE INDEX "nav_main_links_items_parent_id_idx" ON "nav_main_links_items" USING btree ("_parent_id");
  CREATE INDEX "nav_main_links_order_idx" ON "nav_main_links" USING btree ("_order");
  CREATE INDEX "nav_main_links_parent_id_idx" ON "nav_main_links" USING btree ("_parent_id");
  CREATE INDEX "nav_main_projects_order_idx" ON "nav_main_projects" USING btree ("_order");
  CREATE INDEX "nav_main_projects_parent_id_idx" ON "nav_main_projects" USING btree ("_parent_id");
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_teams_fk" FOREIGN KEY ("teams_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_teams_fk" FOREIGN KEY ("teams_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_rels_teams_id_idx" ON "users_rels" USING btree ("teams_id");
  CREATE INDEX "payload_locked_documents_rels_teams_id_idx" ON "payload_locked_documents_rels" USING btree ("teams_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "teams" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_main_links_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_main_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_main_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nav_main" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "teams" CASCADE;
  DROP TABLE "nav_main_links_items" CASCADE;
  DROP TABLE "nav_main_links" CASCADE;
  DROP TABLE "nav_main_projects" CASCADE;
  DROP TABLE "nav_main" CASCADE;
  ALTER TABLE "users_rels" DROP CONSTRAINT "users_rels_teams_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_teams_fk";
  
  DROP INDEX "users_rels_teams_id_idx";
  DROP INDEX "payload_locked_documents_rels_teams_id_idx";
  ALTER TABLE "users_rels" DROP COLUMN "teams_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "teams_id";`)
}
