DO $$ BEGIN
 ALTER TABLE "file_extractions" ADD CONSTRAINT "file_extractions_extractionId_extractions_id_fk" FOREIGN KEY ("extractionId") REFERENCES "public"."extractions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
