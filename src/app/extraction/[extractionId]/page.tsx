import { sendUrlsToScrapping } from "@/app/actions/send-urls-to-scrapping";
import { db } from "@/db/db";
import { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";
import { RealtimeExtraction } from "./components/real-time-extraction";

export interface ExtractionPageProps {
  params: Promise<{ extractionId: string }>;
}

export const metadata: Metadata = {
  title: "Extração de arquivos",
  description: "Light novel script integration for kindle format",
  authors: { name: "Nexus Page", url: "https://me.daviribeiro.com" },
};

async function startExtractionProcess(extractionId: string) {
  const extraction = await db.query.extractions.findFirst({
    where: (ext, { eq }) => eq(ext.id, extractionId),
  });

  if (!extraction) {
    return redirect("/", RedirectType.replace);
  }

  if (extraction.status === "pending") {
    sendUrlsToScrapping({ extractionId });
  }
}

export default async function ExtractionPage({ params }: ExtractionPageProps) {
  const { extractionId } = await params;

  await startExtractionProcess(extractionId);

  return <RealtimeExtraction extractionId={extractionId} />;
}
