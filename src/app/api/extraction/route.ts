import { db } from "@/db/db";
import { ExtractionStatus } from "@/db/schema";
import { NextRequest } from "next/server";

type ExtractionParsed = {
  title: string;
  description: string;
};

const statusMap: Record<ExtractionStatus, ExtractionParsed> = {
  error: {
    title: "Erro",
    description: "Ocorreu um erro ao extrair os arquivos",
  },
  extracting_pdf_files: {
    title: "Extraindo arquivos",
    description: "Extraindo arquivos do site",
  },
  pending: {
    title: "Pendente",
    description: "Aguardando extração",
  },
  sending_email: {
    title: "Enviando email",
    description: "Enviando email com os arquivos extraídos",
  },
  success: {
    title: "Sucesso",
    description: "Extração concluída com sucesso",
  },
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const extractionId = searchParams.get("extractionId") ?? "";

  const events = await db.query.fileExtractionEventLog.findMany({
    where: (ext, { eq }) => eq(ext.extractionId, extractionId),
    orderBy: (ext, { asc }) => asc(ext.created_at),
  });

  const body = events.map((event) => {
    return {
      ...statusMap[event.status],
      id: event.id,
      status: event.status,
    };
  });

  return new Response(JSON.stringify(body), {
    status: 200,
  });
}
