import { sendUrlsToScrapping } from "@/app/actions/send-urls-to-scrapping";
import { db } from "@/db/db";
import { redirect, RedirectType } from "next/navigation";
import { RealtimeExtraction } from "./components/real-time-extraction";

export interface ExtractionPageProps {
  params: Promise<{ extractionId: string }>;
}

async function startExtractionProcess(extractionId: string) {
  const results = await db.query.extractions.findFirst({
    where(ex, { eq }) {
      return eq(ex.id, extractionId);
    },
  });

  if (!results) {
    return redirect("/", RedirectType.replace);
  }

  if (results.status === "pending") {
    sendUrlsToScrapping({ extractionId });

    console.log("Extraction started");

    return {
      extractionId,
      message: "extraction started",
    };
  }
}

export default async function ExtractionPage({ params }: ExtractionPageProps) {
  const { extractionId } = await params;

  await startExtractionProcess(extractionId);

  return <RealtimeExtraction extractionId={extractionId} />;
}
