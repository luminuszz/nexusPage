CREATE TABLE IF NOT EXISTS "extractions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kindlerEmail" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "file_extractions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"filename" varchar NOT NULL,
	"urlScrapping" varchar NOT NULL,
	"extractionId" uuid NOT NULL
);
