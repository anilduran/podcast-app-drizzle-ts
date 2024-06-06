CREATE TABLE IF NOT EXISTS "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "listening_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"podcast_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "playlists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"creator_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "podcast_categories" (
	"podcast_id" uuid,
	"category_id" uuid,
	CONSTRAINT "podcast_categories_podcast_id_category_id_pk" PRIMARY KEY("podcast_id","category_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "podcast_comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"podcast_id" uuid,
	"content" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "podcast_likes" (
	"user_id" uuid,
	"podcast_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "podcast_list_categories" (
	"podcast_list_id" uuid,
	"category_id" uuid,
	CONSTRAINT "podcast_list_categories_podcast_list_id_category_id_pk" PRIMARY KEY("podcast_list_id","category_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "podcast_list_comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"podcast_list_id" uuid,
	"content" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "podcast_list_subscriptions" (
	"podcast_list_id" uuid,
	"user_id" uuid,
	CONSTRAINT "podcast_list_subscriptions_podcast_list_id_user_id_pk" PRIMARY KEY("podcast_list_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "podcast_lists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"creator_id" uuid,
	"image_url" varchar,
	"is_public" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "podcasts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"creator_id" uuid,
	"image_url" varchar,
	"podcast_url" varchar,
	"is_public" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"profile_photo_url" varchar
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "podcast_categories" ADD CONSTRAINT "podcast_categories_podcast_id_podcasts_id_fk" FOREIGN KEY ("podcast_id") REFERENCES "public"."podcasts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "podcast_categories" ADD CONSTRAINT "podcast_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "podcast_likes" ADD CONSTRAINT "podcast_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "podcast_likes" ADD CONSTRAINT "podcast_likes_podcast_id_podcasts_id_fk" FOREIGN KEY ("podcast_id") REFERENCES "public"."podcasts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "podcast_list_categories" ADD CONSTRAINT "podcast_list_categories_podcast_list_id_podcast_lists_id_fk" FOREIGN KEY ("podcast_list_id") REFERENCES "public"."podcast_lists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "podcast_list_categories" ADD CONSTRAINT "podcast_list_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "podcast_list_subscriptions" ADD CONSTRAINT "podcast_list_subscriptions_podcast_list_id_podcast_lists_id_fk" FOREIGN KEY ("podcast_list_id") REFERENCES "public"."podcast_lists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "podcast_list_subscriptions" ADD CONSTRAINT "podcast_list_subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
