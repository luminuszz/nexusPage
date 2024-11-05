"use server";

import { z } from "zod";

const sendUrlsToScrappingSchema = z.object({
  urls: z
    .array(z.string().url())
    .min(1)
    .refine((urls) => new Set(urls).size === urls.length, {
      message: "URLs must be unique",
    }),
});

type SendUrlToTransformSchemaType = z.infer<typeof sendUrlsToScrappingSchema>;

export async function sendUrlsToScrapping(data: SendUrlToTransformSchemaType) {
  const { urls } = await sendUrlsToScrappingSchema.parseAsync(data);

  const requestId = Math.random().toString(36).substring(7);

  console.log({
    urls,
    requestId,
  });
}
