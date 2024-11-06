"use client";

import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UrlCard } from "@/components/url-card";
import { Label } from "@radix-ui/react-label";
import { FileCode, Globe, LoaderCircle, Plus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendUrlsToScrapping } from "./actions/send-urls-to-scrapping";

const validUrl = z.string().url().trim();

const schema = z.object({
  currentUrl: z.string().optional(),
  urlsList: z.array(validUrl).min(1),
  kindleEmail: z.string().email(),
});

type FormSchema = z.infer<typeof schema>;

export default function Home() {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    setValue,
    watch,
    register,
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    values: {
      currentUrl: "",
      urlsList: [],
      kindleEmail: "",
    },
  });

  console.log({
    errors,
  });

  const urlList = watch("urlsList");
  const currentUrl = watch("currentUrl");

  function handleRemoveUrl(currentUrl: string) {
    setValue(
      "urlsList",
      urlList.filter((url) => url !== currentUrl),
    );
  }

  function handleAddUrl() {
    const results = validUrl.safeParse(currentUrl);

    if (results.error) {
      toast.error("Url inválida", {
        description: "Por favor, adicione uma url válida",
      });
      return;
    }

    const isDuplicate = urlList.some((url) => url === results.data);

    if (isDuplicate) {
      toast.error("URL duplicada", {
        description: "URL já foi adicionada",
      });

      return;
    }

    setValue("urlsList", [...urlList, results.data]);
    setValue("currentUrl", "");
  }

  async function handleSendToScrapping({ kindleEmail, urlsList }: FormSchema) {
    try {
      await sendUrlsToScrapping({
        urls: urlsList,
        kindleEmail,
      });

      reset();
      toast.success("Urls enviadas com sucesso");
    } catch (e) {
      console.log(e);
      toast.error("Erro ao enviar urls");
    }
  }

  const canDisableButton = !!isSubmitting;

  console.log({
    urlList,
    currentUrl,
    isValid,
  });

  return (
    <Container>
      <div className="m-auto flex flex-1 items-center justify-center">
        <section className="flex flex-col items-center gap-2">
          <Logo width="150px" height="150px" />
          <h1 className="text-4xl font-bold text-foreground">NexusPage</h1>
          <h1 className="text2xl font-bold text-muted-foreground">
            from Okami
          </h1>

          <form
            className="space-y-4"
            onSubmit={handleSubmit(handleSendToScrapping)}
          >
            <div className="justify-center-center flex flex-col gap-2">
              <Label htmlFor="kindleEmail">Kindle E-mail</Label>
              <Input
                className="w-[400px]"
                placeholder="Email do Kindle"
                type="email"
                {...register("kindleEmail")}
              />
            </div>

            <div className="flex items-center gap-2">
              <Input
                className="w-[600px]"
                placeholder="Adicione uma url ex:https://example.com"
                {...register("currentUrl")}
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

            {urlList.length === 0 && (
              <p className="text-muted-foreground">Nenhuma url adicionada</p>
            )}

            <aside className="grid max-w-[600px] grid-cols-2 gap-4">
              {urlList.map((url) => (
                <UrlCard
                  removeUrl={handleRemoveUrl}
                  key={url}
                  url={{ submittedUrl: url }}
                />
              ))}
            </aside>

            <Button
              className="w-full"
              type="submit"
              disabled={canDisableButton}
            >
              {isSubmitting ? (
                <LoaderCircle className="size-5 animate-spin" />
              ) : (
                <>
                  <FileCode className="size-4" />
                  Enviar
                </>
              )}
            </Button>
          </form>
        </section>
      </div>
    </Container>
  );
}
