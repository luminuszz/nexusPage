import { z } from "zod";

export const envSchema = z.object({
  RESEND_API_KEY: z.string(),
  TEMP_FILE_DIR: z.string(),
  RESENT_FROM_EMAIL: z.string(),
});

export type EnvType = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
