"use server";

import { env } from "@/lib/env";
import { resend } from "@/lib/resend";
import { readFile } from "fs/promises";
import type { FilesData } from "./dto";

interface SendEmailWithPdfsInput {
  filesPaths: FilesData;
  kindleEmail: string;
}

export async function sendEmailWithPdfs({
  filesPaths,
  kindleEmail,
}: SendEmailWithPdfsInput) {
  for (const file of filesPaths) {
    try {
      const currentFile = await readFile(file.filePath);

      console.log(
        `Reading file ${file.filename} with size ${(currentFile.length / 1024 / 1024).toFixed(4) + "MB"}`,
      );

      const data = {
        filename: file.filename,
        content: currentFile,
      };

      const { error } = await resend.emails.send({
        to: kindleEmail,
        subject: "Convert",
        from: env.RESENT_FROM_EMAIL,
        attachments: [data],
        text: "Convert to Kindle format.",
      });

      if (error) {
        throw new Error("Error sending email: " + error.message);
      }
    } catch (error) {
      throw new Error(`Error processing file ${file.filePath}: ${error}`);
    }
  }
}
