"user server";

import { env } from "@/lib/env";
import { writeFile } from "fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";
import type { FilesData } from "./dto";

type Input = {
  urls: string[];
};

interface FilePaths {
  filesPaths: FilesData;
}

const getPath = (filename: string) => path.resolve(env.TEMP_FILE_DIR, filename);

export async function scrapingLightNovelByUrl({
  urls,
}: Input): Promise<FilePaths> {
  const filesPaths: Array<{ filename: string; filePath: string; url: string }> =
    [];

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const url of urls) {
    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    const divSelector = "#readerarea";

    const readContent = await page.$eval(divSelector, (el) => el.innerHTML);

    const title = await page.$eval(".entry-title", (el) => el.innerHTML);

    await page.setContent(title, { waitUntil: "networkidle2" });
    await page.setContent(readContent, { waitUntil: "networkidle2" });

    const pdfStream = await page.pdf({
      format: "A4",
    });

    await page.close();

    const parsedTitle = title.match(/(Mushoku Tensei|Vol\. \d+|Cap\. \d+)/g);

    const fileName = parsedTitle
      ? parsedTitle
          .join("-")
          .normalize("NFD")
          .replace(/ /g, "-")
          .replace(/\./g, "")
          .concat(".pdf")
      : `file-${Date.now()}.pdf`;

    const filePath = getPath(fileName);

    await writeFile(filePath, pdfStream);

    filesPaths.push({ filename: fileName, filePath, url });
  }

  await browser.close();

  return {
    filesPaths,
  };
}
