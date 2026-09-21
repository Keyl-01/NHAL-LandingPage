import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" jsonb,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"payload_folders_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"image_id" integer,
  	"href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_hero_hero_stats_avatars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"avatar_id" integer
  );
  
  CREATE TABLE "home_blocks_hero_sponsors" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sponsor_logo_id" integer
  );
  
  CREATE TABLE "home_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"hero_stats_count" varchar,
  	"hero_stats_label" varchar,
  	"heading" jsonb,
  	"sub_heading" jsonb,
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"hero_story_thumbnail_id" integer,
  	"hero_story_video_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"simple_badge" varchar,
  	"content_heading" jsonb,
  	"content_description1" varchar,
  	"content_description2" varchar,
  	"about_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_benefit_benefit_wrappers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit_card1_icon_id" integer,
  	"benefit_card1_title" varchar,
  	"benefit_card1_description" varchar,
  	"benefit_card2_icon_id" integer,
  	"benefit_card2_title" varchar,
  	"benefit_card2_description" varchar
  );
  
  CREATE TABLE "home_blocks_benefit" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_service_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"card_icon_id" integer,
  	"card_description" varchar,
  	"is_active" boolean DEFAULT false
  );
  
  CREATE TABLE "home_blocks_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"img_wrapper_img_card1_id" integer,
  	"img_wrapper_img_card2_id" integer,
  	"img_wrapper_img_card3_id" integer,
  	"img_wrapper_img_card4_id" integer,
  	"img_wrapper_img_card5_id" integer,
  	"heading" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_methodology" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" jsonb,
  	"cover_image_id" integer,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" jsonb,
  	"description" jsonb,
  	"important_description" jsonb,
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_testimonial_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar
  );
  
  CREATE TABLE "home_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "home_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_sponsor_sponsors" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" jsonb,
  	"description" jsonb,
  	"logo_id" integer
  );
  
  CREATE TABLE "home_blocks_sponsor" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"link" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE "home_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_nav_flyout_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"target_anchor" varchar
  );
  
  CREATE TABLE "home_blocks_nav_flyout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"_status" "enum_home_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_home_v_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"image_id" integer,
  	"href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_hero_hero_stats_avatars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"avatar_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_blocks_hero_sponsors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sponsor_logo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"hero_stats_count" varchar,
  	"hero_stats_label" varchar,
  	"heading" jsonb,
  	"sub_heading" jsonb,
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"hero_story_thumbnail_id" integer,
  	"hero_story_video_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"simple_badge" varchar,
  	"content_heading" jsonb,
  	"content_description1" varchar,
  	"content_description2" varchar,
  	"about_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_benefit_benefit_wrappers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"benefit_card1_icon_id" integer,
  	"benefit_card1_title" varchar,
  	"benefit_card1_description" varchar,
  	"benefit_card2_icon_id" integer,
  	"benefit_card2_title" varchar,
  	"benefit_card2_description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_blocks_benefit" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_service_service_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"card_icon_id" integer,
  	"card_description" varchar,
  	"is_active" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_blocks_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"img_wrapper_img_card1_id" integer,
  	"img_wrapper_img_card2_id" integer,
  	"img_wrapper_img_card3_id" integer,
  	"img_wrapper_img_card4_id" integer,
  	"img_wrapper_img_card5_id" integer,
  	"heading" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_methodology" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" jsonb,
  	"cover_image_id" integer,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" jsonb,
  	"description" jsonb,
  	"important_description" jsonb,
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_testimonial_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_sponsor_sponsors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" jsonb,
  	"description" jsonb,
  	"logo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_blocks_sponsor" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"link" varchar,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_nav_flyout_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"target_anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_blocks_nav_flyout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_banner" ADD CONSTRAINT "home_blocks_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_banner" ADD CONSTRAINT "home_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_hero_hero_stats_avatars" ADD CONSTRAINT "home_blocks_hero_hero_stats_avatars_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_hero_hero_stats_avatars" ADD CONSTRAINT "home_blocks_hero_hero_stats_avatars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_hero_sponsors" ADD CONSTRAINT "home_blocks_hero_sponsors_sponsor_logo_id_media_id_fk" FOREIGN KEY ("sponsor_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_hero_sponsors" ADD CONSTRAINT "home_blocks_hero_sponsors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_hero" ADD CONSTRAINT "home_blocks_hero_hero_story_thumbnail_id_media_id_fk" FOREIGN KEY ("hero_story_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_hero" ADD CONSTRAINT "home_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_about" ADD CONSTRAINT "home_blocks_about_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_about" ADD CONSTRAINT "home_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_benefit_benefit_wrappers" ADD CONSTRAINT "home_blocks_benefit_benefit_wrappers_benefit_card1_icon_id_media_id_fk" FOREIGN KEY ("benefit_card1_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_benefit_benefit_wrappers" ADD CONSTRAINT "home_blocks_benefit_benefit_wrappers_benefit_card2_icon_id_media_id_fk" FOREIGN KEY ("benefit_card2_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_benefit_benefit_wrappers" ADD CONSTRAINT "home_blocks_benefit_benefit_wrappers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_benefit"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_benefit" ADD CONSTRAINT "home_blocks_benefit_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_service_service_cards" ADD CONSTRAINT "home_blocks_service_service_cards_card_icon_id_media_id_fk" FOREIGN KEY ("card_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_service_service_cards" ADD CONSTRAINT "home_blocks_service_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_service" ADD CONSTRAINT "home_blocks_service_img_wrapper_img_card1_id_media_id_fk" FOREIGN KEY ("img_wrapper_img_card1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_service" ADD CONSTRAINT "home_blocks_service_img_wrapper_img_card2_id_media_id_fk" FOREIGN KEY ("img_wrapper_img_card2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_service" ADD CONSTRAINT "home_blocks_service_img_wrapper_img_card3_id_media_id_fk" FOREIGN KEY ("img_wrapper_img_card3_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_service" ADD CONSTRAINT "home_blocks_service_img_wrapper_img_card4_id_media_id_fk" FOREIGN KEY ("img_wrapper_img_card4_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_service" ADD CONSTRAINT "home_blocks_service_img_wrapper_img_card5_id_media_id_fk" FOREIGN KEY ("img_wrapper_img_card5_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_service" ADD CONSTRAINT "home_blocks_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_methodology" ADD CONSTRAINT "home_blocks_methodology_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_methodology" ADD CONSTRAINT "home_blocks_methodology_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_archive" ADD CONSTRAINT "home_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_testimonial_testimonials" ADD CONSTRAINT "home_blocks_testimonial_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_testimonial"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_testimonial" ADD CONSTRAINT "home_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_gallery_images" ADD CONSTRAINT "home_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_gallery_images" ADD CONSTRAINT "home_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_gallery" ADD CONSTRAINT "home_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_sponsor_sponsors" ADD CONSTRAINT "home_blocks_sponsor_sponsors_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_sponsor_sponsors" ADD CONSTRAINT "home_blocks_sponsor_sponsors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_sponsor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_sponsor" ADD CONSTRAINT "home_blocks_sponsor_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_footer_social_links" ADD CONSTRAINT "home_blocks_footer_social_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_footer_social_links" ADD CONSTRAINT "home_blocks_footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_footer" ADD CONSTRAINT "home_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_nav_flyout_nav_items" ADD CONSTRAINT "home_blocks_nav_flyout_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_nav_flyout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_nav_flyout" ADD CONSTRAINT "home_blocks_nav_flyout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_banner" ADD CONSTRAINT "_home_v_blocks_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_banner" ADD CONSTRAINT "_home_v_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_hero_hero_stats_avatars" ADD CONSTRAINT "_home_v_blocks_hero_hero_stats_avatars_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_hero_hero_stats_avatars" ADD CONSTRAINT "_home_v_blocks_hero_hero_stats_avatars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_hero_sponsors" ADD CONSTRAINT "_home_v_blocks_hero_sponsors_sponsor_logo_id_media_id_fk" FOREIGN KEY ("sponsor_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_hero_sponsors" ADD CONSTRAINT "_home_v_blocks_hero_sponsors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_hero" ADD CONSTRAINT "_home_v_blocks_hero_hero_story_thumbnail_id_media_id_fk" FOREIGN KEY ("hero_story_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_hero" ADD CONSTRAINT "_home_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_about" ADD CONSTRAINT "_home_v_blocks_about_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_about" ADD CONSTRAINT "_home_v_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_benefit_benefit_wrappers" ADD CONSTRAINT "_home_v_blocks_benefit_benefit_wrappers_benefit_card1_icon_id_media_id_fk" FOREIGN KEY ("benefit_card1_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_benefit_benefit_wrappers" ADD CONSTRAINT "_home_v_blocks_benefit_benefit_wrappers_benefit_card2_icon_id_media_id_fk" FOREIGN KEY ("benefit_card2_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_benefit_benefit_wrappers" ADD CONSTRAINT "_home_v_blocks_benefit_benefit_wrappers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_benefit"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_benefit" ADD CONSTRAINT "_home_v_blocks_benefit_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_service_service_cards" ADD CONSTRAINT "_home_v_blocks_service_service_cards_card_icon_id_media_id_fk" FOREIGN KEY ("card_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_service_service_cards" ADD CONSTRAINT "_home_v_blocks_service_service_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_service" ADD CONSTRAINT "_home_v_blocks_service_img_wrapper_img_card1_id_media_id_fk" FOREIGN KEY ("img_wrapper_img_card1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_service" ADD CONSTRAINT "_home_v_blocks_service_img_wrapper_img_card2_id_media_id_fk" FOREIGN KEY ("img_wrapper_img_card2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_service" ADD CONSTRAINT "_home_v_blocks_service_img_wrapper_img_card3_id_media_id_fk" FOREIGN KEY ("img_wrapper_img_card3_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_service" ADD CONSTRAINT "_home_v_blocks_service_img_wrapper_img_card4_id_media_id_fk" FOREIGN KEY ("img_wrapper_img_card4_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_service" ADD CONSTRAINT "_home_v_blocks_service_img_wrapper_img_card5_id_media_id_fk" FOREIGN KEY ("img_wrapper_img_card5_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_service" ADD CONSTRAINT "_home_v_blocks_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_methodology" ADD CONSTRAINT "_home_v_blocks_methodology_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_methodology" ADD CONSTRAINT "_home_v_blocks_methodology_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_archive" ADD CONSTRAINT "_home_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_testimonial_testimonials" ADD CONSTRAINT "_home_v_blocks_testimonial_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_testimonial"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_testimonial" ADD CONSTRAINT "_home_v_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_gallery_images" ADD CONSTRAINT "_home_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_gallery_images" ADD CONSTRAINT "_home_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_gallery" ADD CONSTRAINT "_home_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_sponsor_sponsors" ADD CONSTRAINT "_home_v_blocks_sponsor_sponsors_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_sponsor_sponsors" ADD CONSTRAINT "_home_v_blocks_sponsor_sponsors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_sponsor"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_sponsor" ADD CONSTRAINT "_home_v_blocks_sponsor_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_footer_social_links" ADD CONSTRAINT "_home_v_blocks_footer_social_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_footer_social_links" ADD CONSTRAINT "_home_v_blocks_footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_footer" ADD CONSTRAINT "_home_v_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_nav_flyout_nav_items" ADD CONSTRAINT "_home_v_blocks_nav_flyout_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_nav_flyout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_nav_flyout" ADD CONSTRAINT "_home_v_blocks_nav_flyout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_blocks_banner_order_idx" ON "home_blocks_banner" USING btree ("_order");
  CREATE INDEX "home_blocks_banner_parent_id_idx" ON "home_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_banner_path_idx" ON "home_blocks_banner" USING btree ("_path");
  CREATE INDEX "home_blocks_banner_image_idx" ON "home_blocks_banner" USING btree ("image_id");
  CREATE INDEX "home_blocks_hero_hero_stats_avatars_order_idx" ON "home_blocks_hero_hero_stats_avatars" USING btree ("_order");
  CREATE INDEX "home_blocks_hero_hero_stats_avatars_parent_id_idx" ON "home_blocks_hero_hero_stats_avatars" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_hero_hero_stats_avatars_avatar_idx" ON "home_blocks_hero_hero_stats_avatars" USING btree ("avatar_id");
  CREATE INDEX "home_blocks_hero_sponsors_order_idx" ON "home_blocks_hero_sponsors" USING btree ("_order");
  CREATE INDEX "home_blocks_hero_sponsors_parent_id_idx" ON "home_blocks_hero_sponsors" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_hero_sponsors_sponsor_logo_idx" ON "home_blocks_hero_sponsors" USING btree ("sponsor_logo_id");
  CREATE INDEX "home_blocks_hero_order_idx" ON "home_blocks_hero" USING btree ("_order");
  CREATE INDEX "home_blocks_hero_parent_id_idx" ON "home_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_hero_path_idx" ON "home_blocks_hero" USING btree ("_path");
  CREATE INDEX "home_blocks_hero_hero_story_hero_story_thumbnail_idx" ON "home_blocks_hero" USING btree ("hero_story_thumbnail_id");
  CREATE INDEX "home_blocks_about_order_idx" ON "home_blocks_about" USING btree ("_order");
  CREATE INDEX "home_blocks_about_parent_id_idx" ON "home_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_about_path_idx" ON "home_blocks_about" USING btree ("_path");
  CREATE INDEX "home_blocks_about_about_image_idx" ON "home_blocks_about" USING btree ("about_image_id");
  CREATE INDEX "home_blocks_benefit_benefit_wrappers_order_idx" ON "home_blocks_benefit_benefit_wrappers" USING btree ("_order");
  CREATE INDEX "home_blocks_benefit_benefit_wrappers_parent_id_idx" ON "home_blocks_benefit_benefit_wrappers" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_benefit_benefit_wrappers_benefit_card1_benef_idx" ON "home_blocks_benefit_benefit_wrappers" USING btree ("benefit_card1_icon_id");
  CREATE INDEX "home_blocks_benefit_benefit_wrappers_benefit_card2_benef_idx" ON "home_blocks_benefit_benefit_wrappers" USING btree ("benefit_card2_icon_id");
  CREATE INDEX "home_blocks_benefit_order_idx" ON "home_blocks_benefit" USING btree ("_order");
  CREATE INDEX "home_blocks_benefit_parent_id_idx" ON "home_blocks_benefit" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_benefit_path_idx" ON "home_blocks_benefit" USING btree ("_path");
  CREATE INDEX "home_blocks_service_service_cards_order_idx" ON "home_blocks_service_service_cards" USING btree ("_order");
  CREATE INDEX "home_blocks_service_service_cards_parent_id_idx" ON "home_blocks_service_service_cards" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_service_service_cards_card_icon_idx" ON "home_blocks_service_service_cards" USING btree ("card_icon_id");
  CREATE INDEX "home_blocks_service_order_idx" ON "home_blocks_service" USING btree ("_order");
  CREATE INDEX "home_blocks_service_parent_id_idx" ON "home_blocks_service" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_service_path_idx" ON "home_blocks_service" USING btree ("_path");
  CREATE INDEX "home_blocks_service_img_wrapper_img_wrapper_img_card1_idx" ON "home_blocks_service" USING btree ("img_wrapper_img_card1_id");
  CREATE INDEX "home_blocks_service_img_wrapper_img_wrapper_img_card2_idx" ON "home_blocks_service" USING btree ("img_wrapper_img_card2_id");
  CREATE INDEX "home_blocks_service_img_wrapper_img_wrapper_img_card3_idx" ON "home_blocks_service" USING btree ("img_wrapper_img_card3_id");
  CREATE INDEX "home_blocks_service_img_wrapper_img_wrapper_img_card4_idx" ON "home_blocks_service" USING btree ("img_wrapper_img_card4_id");
  CREATE INDEX "home_blocks_service_img_wrapper_img_wrapper_img_card5_idx" ON "home_blocks_service" USING btree ("img_wrapper_img_card5_id");
  CREATE INDEX "home_blocks_methodology_order_idx" ON "home_blocks_methodology" USING btree ("_order");
  CREATE INDEX "home_blocks_methodology_parent_id_idx" ON "home_blocks_methodology" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_methodology_path_idx" ON "home_blocks_methodology" USING btree ("_path");
  CREATE INDEX "home_blocks_methodology_cover_image_idx" ON "home_blocks_methodology" USING btree ("cover_image_id");
  CREATE INDEX "home_blocks_archive_order_idx" ON "home_blocks_archive" USING btree ("_order");
  CREATE INDEX "home_blocks_archive_parent_id_idx" ON "home_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_archive_path_idx" ON "home_blocks_archive" USING btree ("_path");
  CREATE INDEX "home_blocks_testimonial_testimonials_order_idx" ON "home_blocks_testimonial_testimonials" USING btree ("_order");
  CREATE INDEX "home_blocks_testimonial_testimonials_parent_id_idx" ON "home_blocks_testimonial_testimonials" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_testimonial_order_idx" ON "home_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "home_blocks_testimonial_parent_id_idx" ON "home_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_testimonial_path_idx" ON "home_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "home_blocks_gallery_images_order_idx" ON "home_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "home_blocks_gallery_images_parent_id_idx" ON "home_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_gallery_images_image_idx" ON "home_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "home_blocks_gallery_order_idx" ON "home_blocks_gallery" USING btree ("_order");
  CREATE INDEX "home_blocks_gallery_parent_id_idx" ON "home_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_gallery_path_idx" ON "home_blocks_gallery" USING btree ("_path");
  CREATE INDEX "home_blocks_sponsor_sponsors_order_idx" ON "home_blocks_sponsor_sponsors" USING btree ("_order");
  CREATE INDEX "home_blocks_sponsor_sponsors_parent_id_idx" ON "home_blocks_sponsor_sponsors" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_sponsor_sponsors_logo_idx" ON "home_blocks_sponsor_sponsors" USING btree ("logo_id");
  CREATE INDEX "home_blocks_sponsor_order_idx" ON "home_blocks_sponsor" USING btree ("_order");
  CREATE INDEX "home_blocks_sponsor_parent_id_idx" ON "home_blocks_sponsor" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_sponsor_path_idx" ON "home_blocks_sponsor" USING btree ("_path");
  CREATE INDEX "home_blocks_footer_social_links_order_idx" ON "home_blocks_footer_social_links" USING btree ("_order");
  CREATE INDEX "home_blocks_footer_social_links_parent_id_idx" ON "home_blocks_footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_footer_social_links_icon_idx" ON "home_blocks_footer_social_links" USING btree ("icon_id");
  CREATE INDEX "home_blocks_footer_order_idx" ON "home_blocks_footer" USING btree ("_order");
  CREATE INDEX "home_blocks_footer_parent_id_idx" ON "home_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_footer_path_idx" ON "home_blocks_footer" USING btree ("_path");
  CREATE INDEX "home_blocks_nav_flyout_nav_items_order_idx" ON "home_blocks_nav_flyout_nav_items" USING btree ("_order");
  CREATE INDEX "home_blocks_nav_flyout_nav_items_parent_id_idx" ON "home_blocks_nav_flyout_nav_items" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_nav_flyout_order_idx" ON "home_blocks_nav_flyout" USING btree ("_order");
  CREATE INDEX "home_blocks_nav_flyout_parent_id_idx" ON "home_blocks_nav_flyout" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_nav_flyout_path_idx" ON "home_blocks_nav_flyout" USING btree ("_path");
  CREATE INDEX "home_meta_meta_image_idx" ON "home" USING btree ("meta_image_id");
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");
  CREATE INDEX "_home_v_blocks_banner_order_idx" ON "_home_v_blocks_banner" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_banner_parent_id_idx" ON "_home_v_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_banner_path_idx" ON "_home_v_blocks_banner" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_banner_image_idx" ON "_home_v_blocks_banner" USING btree ("image_id");
  CREATE INDEX "_home_v_blocks_hero_hero_stats_avatars_order_idx" ON "_home_v_blocks_hero_hero_stats_avatars" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_hero_hero_stats_avatars_parent_id_idx" ON "_home_v_blocks_hero_hero_stats_avatars" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_hero_hero_stats_avatars_avatar_idx" ON "_home_v_blocks_hero_hero_stats_avatars" USING btree ("avatar_id");
  CREATE INDEX "_home_v_blocks_hero_sponsors_order_idx" ON "_home_v_blocks_hero_sponsors" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_hero_sponsors_parent_id_idx" ON "_home_v_blocks_hero_sponsors" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_hero_sponsors_sponsor_logo_idx" ON "_home_v_blocks_hero_sponsors" USING btree ("sponsor_logo_id");
  CREATE INDEX "_home_v_blocks_hero_order_idx" ON "_home_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_hero_parent_id_idx" ON "_home_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_hero_path_idx" ON "_home_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_hero_hero_story_hero_story_thumbnail_idx" ON "_home_v_blocks_hero" USING btree ("hero_story_thumbnail_id");
  CREATE INDEX "_home_v_blocks_about_order_idx" ON "_home_v_blocks_about" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_about_parent_id_idx" ON "_home_v_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_about_path_idx" ON "_home_v_blocks_about" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_about_about_image_idx" ON "_home_v_blocks_about" USING btree ("about_image_id");
  CREATE INDEX "_home_v_blocks_benefit_benefit_wrappers_order_idx" ON "_home_v_blocks_benefit_benefit_wrappers" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_benefit_benefit_wrappers_parent_id_idx" ON "_home_v_blocks_benefit_benefit_wrappers" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_benefit_benefit_wrappers_benefit_card1_be_idx" ON "_home_v_blocks_benefit_benefit_wrappers" USING btree ("benefit_card1_icon_id");
  CREATE INDEX "_home_v_blocks_benefit_benefit_wrappers_benefit_card2_be_idx" ON "_home_v_blocks_benefit_benefit_wrappers" USING btree ("benefit_card2_icon_id");
  CREATE INDEX "_home_v_blocks_benefit_order_idx" ON "_home_v_blocks_benefit" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_benefit_parent_id_idx" ON "_home_v_blocks_benefit" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_benefit_path_idx" ON "_home_v_blocks_benefit" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_service_service_cards_order_idx" ON "_home_v_blocks_service_service_cards" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_service_service_cards_parent_id_idx" ON "_home_v_blocks_service_service_cards" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_service_service_cards_card_icon_idx" ON "_home_v_blocks_service_service_cards" USING btree ("card_icon_id");
  CREATE INDEX "_home_v_blocks_service_order_idx" ON "_home_v_blocks_service" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_service_parent_id_idx" ON "_home_v_blocks_service" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_service_path_idx" ON "_home_v_blocks_service" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_service_img_wrapper_img_wrapper_img_card1_idx" ON "_home_v_blocks_service" USING btree ("img_wrapper_img_card1_id");
  CREATE INDEX "_home_v_blocks_service_img_wrapper_img_wrapper_img_card2_idx" ON "_home_v_blocks_service" USING btree ("img_wrapper_img_card2_id");
  CREATE INDEX "_home_v_blocks_service_img_wrapper_img_wrapper_img_card3_idx" ON "_home_v_blocks_service" USING btree ("img_wrapper_img_card3_id");
  CREATE INDEX "_home_v_blocks_service_img_wrapper_img_wrapper_img_card4_idx" ON "_home_v_blocks_service" USING btree ("img_wrapper_img_card4_id");
  CREATE INDEX "_home_v_blocks_service_img_wrapper_img_wrapper_img_card5_idx" ON "_home_v_blocks_service" USING btree ("img_wrapper_img_card5_id");
  CREATE INDEX "_home_v_blocks_methodology_order_idx" ON "_home_v_blocks_methodology" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_methodology_parent_id_idx" ON "_home_v_blocks_methodology" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_methodology_path_idx" ON "_home_v_blocks_methodology" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_methodology_cover_image_idx" ON "_home_v_blocks_methodology" USING btree ("cover_image_id");
  CREATE INDEX "_home_v_blocks_archive_order_idx" ON "_home_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_archive_parent_id_idx" ON "_home_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_archive_path_idx" ON "_home_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_testimonial_testimonials_order_idx" ON "_home_v_blocks_testimonial_testimonials" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_testimonial_testimonials_parent_id_idx" ON "_home_v_blocks_testimonial_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_testimonial_order_idx" ON "_home_v_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_testimonial_parent_id_idx" ON "_home_v_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_testimonial_path_idx" ON "_home_v_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_gallery_images_order_idx" ON "_home_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_gallery_images_parent_id_idx" ON "_home_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_gallery_images_image_idx" ON "_home_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_home_v_blocks_gallery_order_idx" ON "_home_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_gallery_parent_id_idx" ON "_home_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_gallery_path_idx" ON "_home_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_sponsor_sponsors_order_idx" ON "_home_v_blocks_sponsor_sponsors" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_sponsor_sponsors_parent_id_idx" ON "_home_v_blocks_sponsor_sponsors" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_sponsor_sponsors_logo_idx" ON "_home_v_blocks_sponsor_sponsors" USING btree ("logo_id");
  CREATE INDEX "_home_v_blocks_sponsor_order_idx" ON "_home_v_blocks_sponsor" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_sponsor_parent_id_idx" ON "_home_v_blocks_sponsor" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_sponsor_path_idx" ON "_home_v_blocks_sponsor" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_footer_social_links_order_idx" ON "_home_v_blocks_footer_social_links" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_footer_social_links_parent_id_idx" ON "_home_v_blocks_footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_footer_social_links_icon_idx" ON "_home_v_blocks_footer_social_links" USING btree ("icon_id");
  CREATE INDEX "_home_v_blocks_footer_order_idx" ON "_home_v_blocks_footer" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_footer_parent_id_idx" ON "_home_v_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_footer_path_idx" ON "_home_v_blocks_footer" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_nav_flyout_nav_items_order_idx" ON "_home_v_blocks_nav_flyout_nav_items" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_nav_flyout_nav_items_parent_id_idx" ON "_home_v_blocks_nav_flyout_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_nav_flyout_order_idx" ON "_home_v_blocks_nav_flyout" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_nav_flyout_parent_id_idx" ON "_home_v_blocks_nav_flyout" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_nav_flyout_path_idx" ON "_home_v_blocks_nav_flyout" USING btree ("_path");
  CREATE INDEX "_home_v_version_meta_version_meta_image_idx" ON "_home_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE INDEX "_home_v_autosave_idx" ON "_home_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_blocks_banner" CASCADE;
  DROP TABLE "home_blocks_hero_hero_stats_avatars" CASCADE;
  DROP TABLE "home_blocks_hero_sponsors" CASCADE;
  DROP TABLE "home_blocks_hero" CASCADE;
  DROP TABLE "home_blocks_about" CASCADE;
  DROP TABLE "home_blocks_benefit_benefit_wrappers" CASCADE;
  DROP TABLE "home_blocks_benefit" CASCADE;
  DROP TABLE "home_blocks_service_service_cards" CASCADE;
  DROP TABLE "home_blocks_service" CASCADE;
  DROP TABLE "home_blocks_methodology" CASCADE;
  DROP TABLE "home_blocks_archive" CASCADE;
  DROP TABLE "home_blocks_testimonial_testimonials" CASCADE;
  DROP TABLE "home_blocks_testimonial" CASCADE;
  DROP TABLE "home_blocks_gallery_images" CASCADE;
  DROP TABLE "home_blocks_gallery" CASCADE;
  DROP TABLE "home_blocks_sponsor_sponsors" CASCADE;
  DROP TABLE "home_blocks_sponsor" CASCADE;
  DROP TABLE "home_blocks_footer_social_links" CASCADE;
  DROP TABLE "home_blocks_footer" CASCADE;
  DROP TABLE "home_blocks_nav_flyout_nav_items" CASCADE;
  DROP TABLE "home_blocks_nav_flyout" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "_home_v_blocks_banner" CASCADE;
  DROP TABLE "_home_v_blocks_hero_hero_stats_avatars" CASCADE;
  DROP TABLE "_home_v_blocks_hero_sponsors" CASCADE;
  DROP TABLE "_home_v_blocks_hero" CASCADE;
  DROP TABLE "_home_v_blocks_about" CASCADE;
  DROP TABLE "_home_v_blocks_benefit_benefit_wrappers" CASCADE;
  DROP TABLE "_home_v_blocks_benefit" CASCADE;
  DROP TABLE "_home_v_blocks_service_service_cards" CASCADE;
  DROP TABLE "_home_v_blocks_service" CASCADE;
  DROP TABLE "_home_v_blocks_methodology" CASCADE;
  DROP TABLE "_home_v_blocks_archive" CASCADE;
  DROP TABLE "_home_v_blocks_testimonial_testimonials" CASCADE;
  DROP TABLE "_home_v_blocks_testimonial" CASCADE;
  DROP TABLE "_home_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_home_v_blocks_gallery" CASCADE;
  DROP TABLE "_home_v_blocks_sponsor_sponsors" CASCADE;
  DROP TABLE "_home_v_blocks_sponsor" CASCADE;
  DROP TABLE "_home_v_blocks_footer_social_links" CASCADE;
  DROP TABLE "_home_v_blocks_footer" CASCADE;
  DROP TABLE "_home_v_blocks_nav_flyout_nav_items" CASCADE;
  DROP TABLE "_home_v_blocks_nav_flyout" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_status";`)
}
