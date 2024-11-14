"use server";

import { db } from "@/db/db";
import {
  extractions,
  ExtractionStatus,
  fileExtractionEventLog,
} from "@/db/schema";
import { deleteTempFiles } from "@/functions/delete-temp-files";
import { FilesData } from "@/functions/dto";
import { scrapingLightNovelByUrl } from "@/functions/scrapping-ligth-novel-by-url";
import { sendEmailWithPdfs } from "@/functions/send-email-with.pdfs";
import { eq } from "drizzle-orm";
import { z } from "zod";

const sendUrlsToScrappingSchema = z.object({
  extractionId: z.string().uuid(),
});

const updateExtractionStatus = async (
  extractionId: string,
  status: ExtractionStatus,
) => {
  await db.insert(fileExtractionEventLog).values({ status, extractionId });

  if (["error", "success"].includes(status)) {
    await db
      .update(extractions)
      .set({ status })
      .where(eq(extractions.id, extractionId));
  }
};

type SendUrlToTransformSchemaType = z.infer<typeof sendUrlsToScrappingSchema>;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendUrlsToScrapping(data: SendUrlToTransformSchemaType) {
  const filesHistory: FilesData = [];
  const { extractionId } = sendUrlsToScrappingSchema.parse(data);

  try {
    const extraction = await db.query.extractions.findFirst({
      where: (ext, { eq }) => eq(ext.id, extractionId),
      with: {
        files: {
          columns: {
            urlScrapping: true,
          },
        },
      },
    });

    if (!extraction || extraction.status !== "pending") {
      throw new Error("Extraction not found");
    }

    await updateExtractionStatus(extractionId, "extracting_pdf_files");

    await delay(2000);

    const urls = extraction.files.map((file) => file.urlScrapping);

    const { filesPaths } = await scrapingLightNovelByUrl({ urls });

    filesHistory.push(...filesPaths);

    await updateExtractionStatus(extractionId, "sending_email");

    await delay(2000);

    await sendEmailWithPdfs({
      filesPaths,
      kindleEmail: extraction.kindleEmail,
    });

    await updateExtractionStatus(extractionId, "success");
  } catch {
    await updateExtractionStatus(extractionId, "error");
  } finally {
    console.log("Deletando arquivos temporários");
    await deleteTempFiles({ filesPaths: filesHistory });
  }
}
