"use server";

import { db } from "@/db/db";
import {
  extractions,
  fileExtractionEventLog,
  fileExtractions,
} from "@/db/schema";
import { z } from "zod";

const createExtractionIntentSchema = z.object({
  kindleEmail: z.string().email(),
  urls: z
    .array(z.string().url())
    .min(1)
    .refine((urls) => new Set(urls).size === urls.length, {
      message: "URLs must be unique",
    }),
});

export type CreateExtractionIntentType = z.infer<
  typeof createExtractionIntentSchema
>;

export async function createExtractionIntent(data: CreateExtractionIntentType) {
  try {
    const { kindleEmail, urls } =
      await createExtractionIntentSchema.parseAsync(data);

    const [{ extractionId }] = await db
      .insert(extractions)
      .values({
        kindleEmail,
        status: "pending",
      })
      .returning({ extractionId: extractions.id });

    await db.insert(fileExtractions).values(
      urls.map((item) => ({
        extractionId,
        urlScrapping: item,
      })),
    );

    await db
      .insert(fileExtractionEventLog)
      .values({ extractionId, status: "pending" });

    return {
      extractionId,
    };
  } catch (error) {
    console.error(error);
  }
}
