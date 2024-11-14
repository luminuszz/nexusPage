CREATE TYPE "public"."status" AS ENUM('extracting_pdf_files', 'sending_email', 'pending', 'success', 'error');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "extractions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kindleEmail" varchar NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "file_extraction_event_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" "status" NOT NULL,
	"extractionId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "file_extractions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"urlScrapping" varchar NOT NULL,
	"extractionId" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "file_extraction_event_log" ADD CONSTRAINT "file_extraction_event_log_extractionId_extractions_id_fk" FOREIGN KEY ("extractionId") REFERENCES "public"."extractions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
