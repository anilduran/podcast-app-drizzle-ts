CREATE TABLE IF NOT EXISTS "playlist_podcasts" (
	"playlist_id" uuid,
	"podcast_id" uuid,
	CONSTRAINT "playlist_podcasts_playlist_id_podcast_id_pk" PRIMARY KEY("playlist_id","podcast_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "podcast_list_podcasts" (
	"podcast_list_id" uuid,
	"podcast_id" uuid,
	CONSTRAINT "podcast_list_podcasts_podcast_id_podcast_list_id_pk" PRIMARY KEY("podcast_id","podcast_list_id")
);
--> statement-breakpoint
ALTER TABLE "listening_history" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "playlists" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "playlists" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "podcast_comments" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "podcast_comments" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "podcast_list_comments" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "podcast_list_comments" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "podcast_lists" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "podcast_lists" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "podcasts" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "podcasts" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playlist_podcasts" ADD CONSTRAINT "playlist_podcasts_playlist_id_playlists_id_fk" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playlist_podcasts" ADD CONSTRAINT "playlist_podcasts_podcast_id_podcasts_id_fk" FOREIGN KEY ("podcast_id") REFERENCES "public"."podcasts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "podcast_list_podcasts" ADD CONSTRAINT "podcast_list_podcasts_podcast_list_id_podcast_lists_id_fk" FOREIGN KEY ("podcast_list_id") REFERENCES "public"."podcast_lists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "podcast_list_podcasts" ADD CONSTRAINT "podcast_list_podcasts_podcast_id_podcasts_id_fk" FOREIGN KEY ("podcast_id") REFERENCES "public"."podcasts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
