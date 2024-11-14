import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const extractionStatusEnum = [
  "extracting_pdf_files",
  "sending_email",
  "pending",
  "success",
  "error",
] as const;

const extractionStatus = pgEnum("status", extractionStatusEnum);

const extractions = pgTable("extractions", {
  id: uuid().primaryKey().defaultRandom(),
  kindleEmail: varchar().notNull(),
  status: extractionStatus().default("pending").notNull(),
});

const fileExtractions = pgTable("file_extractions", {
  id: uuid().primaryKey().defaultRandom(),
  urlScrapping: varchar().notNull(),
  extractionId: uuid()
    .notNull()
    .references(() => extractions.id),
});

const fileExtractionEventLog = pgTable("file_extraction_event_log", {
  id: uuid().primaryKey().defaultRandom(),
  status: extractionStatus().notNull(),
  created_at: timestamp().defaultNow().notNull(),
  extractionId: uuid()
    .notNull()
    .references(() => extractions.id),
});

const extractionsRelations = relations(extractions, ({ many }) => {
  return {
    files: many(fileExtractions),
  };
});

const fileExtractionEventLogRelations = relations(
  fileExtractionEventLog,
  ({ one }) => {
    return {
      extraction: one(extractions, {
        fields: [fileExtractionEventLog.extractionId],
        references: [extractions.id],
      }),
    };
  },
);

const fileExtractionsRelations = relations(fileExtractions, ({ one }) => {
  return {
    files: one(extractions, {
      fields: [fileExtractions.extractionId],
      references: [extractions.id],
    }),
  };
});

type Extraction = InferSelectModel<typeof extractions>;
type FileExtraction = InferSelectModel<typeof fileExtractions>;

type CreateExtractionDto = InferInsertModel<typeof extractions>;
type CreateFileExtractionDto = InferInsertModel<typeof fileExtractions>;

type ExtractionStatus = (typeof extractionStatusEnum)[number];

export type {
  CreateExtractionDto,
  CreateFileExtractionDto,
  Extraction,
  ExtractionStatus,
  FileExtraction,
};

export {
  extractions,
  extractionsRelations,
  extractionStatus,
  fileExtractionEventLog,
  fileExtractionEventLogRelations,
  fileExtractions,
  fileExtractionsRelations,
};
