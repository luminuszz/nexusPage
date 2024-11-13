export interface ExtractionPageProps {
  params: Promise<{ extractionId: string }>;
}

export default async function ExtractionPage({ params }: ExtractionPageProps) {
  const { extractionId } = await params;

  return (
    <div>
      <strong className="text-emerald-300">{extractionId} cavalo</strong>
    </div>
  );
}
