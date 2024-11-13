"use server";

import { db } from "@/db/db";
import { extractions, fileExtractions } from "@/db/schema";
import { deleteTempFiles } from "@/functions/delete-temp-files";
import { FilesData } from "@/functions/dto";
import { scrapingLightNovelByUrl } from "@/functions/scrapping-ligth-novel-by-url";
import { sendEmailWithPdfs } from "@/functions/send-email-with.pdfs";
import { z } from "zod";

const sendUrlsToScrappingSchema = z.object({
  urls: z
    .array(z.string().url())
    .min(1)
    .refine((urls) => new Set(urls).size === urls.length, {
      message: "URLs must be unique",
    }),

  kindleEmail: z.string().email(),
});

type SendUrlToTransformSchemaType = z.infer<typeof sendUrlsToScrappingSchema>;

export async function sendUrlsToScrapping(data: SendUrlToTransformSchemaType) {
  const filesHistory: FilesData = [];

  try {
    const { urls, kindleEmail } = sendUrlsToScrappingSchema.parse(data);

    const [{ extractionId }] = await db
      .insert(extractions)
      .values({
        kindleEmail,
      })
      .returning({ extractionId: extractions.id });

    console.log("Buscando os arquivos nos links: ", JSON.stringify(urls));

    const { filesPaths } = await scrapingLightNovelByUrl({ urls });

    await db.insert(fileExtractions).values(
      filesPaths.map((item) => ({
        extractionId,
        filename: item.filename,
        urlScrapping: item.url,
      })),
    );

    filesHistory.push(...filesPaths);

    console.log("Arquivos encontrados: ", JSON.stringify(filesPaths));

    console.log("Enviando os arquivos por email");

    await sendEmailWithPdfs({ filesPaths, kindleEmail });

    console.log("sucesso");

    return {
      success: true,
      extractionId,
    };
  } catch (e) {
    console.error(e);

    return {
      success: false,
      message: e,
    };
  } finally {
    console.log("Deletando arquivos temporários");
    await deleteTempFiles({ filesPaths: filesHistory });
  }
}
