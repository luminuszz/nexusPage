import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

const extractions = pgTable("extractions", {
  id: uuid().primaryKey().defaultRandom(),
  kindleEmail: varchar().notNull(),
});

const fileExtractions = pgTable("file_extractions", {
  id: uuid().primaryKey().defaultRandom(),
  filename: varchar().notNull(),
  urlScrapping: varchar().notNull(),
  extractionId: uuid().notNull(),
});

const extractionsRelations = relations(extractions, ({ many }) => {
  return {
    files: many(fileExtractions),
  };
});

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

export type {
  CreateExtractionDto,
  CreateFileExtractionDto,
  Extraction,
  FileExtraction,
};

export {
  extractions,
  extractionsRelations,
  fileExtractions,
  fileExtractionsRelations,
};
