"use client";

import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UrlCard } from "@/components/url-card";
import { Label } from "@radix-ui/react-label";
import { FileCode, Globe, Plus } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { sendUrlsToScrapping } from "./actions/send-urls-to-scrapping";

interface UrlItem {
  id: string;
  url: string;
}

const validUrl = z.string().url();

export default function Home() {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleRemoveUrl(id: string) {
    setUrls((prev) => prev.filter((item) => item.id !== id));
  }

  function handleAddUrl() {
    const results = validUrl.safeParse(inputRef.current?.value);

    if (results.error) {
      toast.error("Url inválida", {
        description: "Por favor, adicione uma url válida",
      });
      return;
    }

    const isDuplicate = urls.some((urlObj) => urlObj.url === results.data);

    if (isDuplicate) {
      toast.error("URL duplicada", {
        description: "URL já foi adicionada",
      });

      return;
    }

    setUrls((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        url: results.data,
      },
    ]);
  }

  async function handleSubmit(e: FormEvent) {
    setIsLoading(true);

    try {
      await sendUrlsToScrapping({
        urls: urls.map((item) => item.url),
      });
    } catch {
      toast.error("Erro ao enviar urls");
    } finally {
      setIsLoading(false);
    }
  }

  const canDisableButton = urls.length === 0 || isLoading;

  return (
    <Container>
      <div className="m-auto flex flex-1 items-center justify-center">
        <section className="flex flex-col items-center gap-2">
          <Logo width="150px" height="150px" />
          <h1 className="text-4xl font-bold text-foreground">NexusPage</h1>
          <h1 className="text2xl font-bold text-muted-foreground">
            from Okami
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">
              <Label htmlFor="urlInput">Url</Label>
              <Input
                id="urlInput"
                ref={inputRef}
                className="w-[600px]"
                placeholder="https://example.com"
              />

              <Button
                size="icon"
                variant="secondary"
                type="button"
                onClick={handleAddUrl}
              >
                <Plus className="size-5" />
              </Button>
            </div>

            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              <Globe className="h-6 w-6" />
              Urls adicionadas
            </h2>

            {urls.length === 0 && (
              <p className="text-muted-foreground">Nenhuma url adicionada</p>
            )}

            <aside className="grid max-w-[600px] grid-cols-2 gap-4">
              {urls.map((item) => (
                <UrlCard
                  removeUrl={handleRemoveUrl}
                  key={item.id}
                  url={{ id: item.id, submittedUrl: item.url }}
                />
              ))}
            </aside>

            <Button
              className="w-full"
              type="submit"
              disabled={canDisableButton}
            >
              <FileCode className="size-4" />
              Enviar
            </Button>
          </form>
        </section>
      </div>
    </Container>
  );
}
