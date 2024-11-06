"user server";

import { access, unlink } from "fs/promises";
import type { FilesData } from "./dto";

interface DeleteTempFilesInput {
  filesPaths: FilesData;
}

export async function deleteTempFiles({ filesPaths }: DeleteTempFilesInput) {
  for (const file of filesPaths) {
    try {
      await access(file.filePath);
      await unlink(file.filePath);
      console.log(`File ${file.filePath} deleted successfully`);
    } catch (error) {
      console.log(
        `File ${file.filePath} not found or could not be deleted: ${error}`,
      );
    }
  }
}
