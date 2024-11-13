"use client";

import { sendUrlsToScrapping } from "@/app/actions/send-urls-to-scrapping";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { FileCode, Globe, LoaderCircle, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { UrlCard } from "./url-card";

const validUrl = z.string().url().trim();

const schema = z.object({
  currentUrl: z.string().optional(),
  urlsList: z.array(validUrl).min(1),
  kindleEmail: z.string().email(),
});

type FormSchema = z.infer<typeof schema>;

export function Form() {
  const router = useRouter();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
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
    mode: "onChange",
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
    const response = await sendUrlsToScrapping({
      urls: urlsList,
      kindleEmail,
    });

    if (response.success) {
      const { extractionId } = response;

      toast.success("Urls enviadas com sucesso", {
        description: `Extraction ID: ${extractionId}`,
      });

      reset();

      router.push(`/extraction/${extractionId}`);
    } else {
      toast.error("Erro ao enviar urls", {
        description: String(response.message),
      });
    }
  }

  const canDisableButton = !!isSubmitting;

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleSendToScrapping)}>
      <div className="flex flex-col justify-center gap-2">
        <Label htmlFor="kindleEmail">Kindle E-mail</Label>
        <Input
          className="w-[400px]"
          placeholder="Email do Kindle"
          {...register("kindleEmail")}
        />
        {!!errors.kindleEmail?.message && (
          <p className="text-red-500">{errors.kindleEmail.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Input
          className="w-[600px]"
          placeholder="Adicione uma url ex:https://example.com"
          {...register("currentUrl")}
        />
        {errors.currentUrl && (
          <p className="text-red-500">{errors.currentUrl.message}</p>
        )}

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

      <Button className="w-full" type="submit" disabled={canDisableButton}>
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
  );
}
