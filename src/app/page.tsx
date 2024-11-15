import { ExtractionRequestForm } from "@/app/components/extraction-request-form";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <Container>
      <div className="m-auto flex flex-1 items-center justify-center">
        <section className="flex flex-col items-center gap-2">
          <Logo width="150px" height="150px" />
          <h1 className="text-4xl font-bold text-foreground">NexusPage</h1>
          <h1 className="text2xl font-bold text-muted-foreground">
            From Okami
          </h1>

          <ExtractionRequestForm />
        </section>
      </div>
    </Container>
  );
}
