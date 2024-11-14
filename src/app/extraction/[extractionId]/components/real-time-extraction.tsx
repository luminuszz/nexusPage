"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExtractionStatus } from "@/db/schema";
import { uniqBy } from "lodash";
import { FileArchive } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EventIndicator } from "./eventIndicator";

export type ExtractionParsed = {
  title: string;
  description: string;
  id: string;
  status: ExtractionStatus;
};

export interface Props {
  extractionId: string;
}

export function RealtimeExtraction({ extractionId }: Props) {
  const [events, setEvents] = useState<ExtractionParsed[]>([]);

  const [iStopped, setIsStopped] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let intervalId: NodeJS.Timeout;

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `/api/extraction?extractionId=${extractionId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch extraction events");
        }
        const data: ExtractionParsed[] = await response.json();

        const isFinished = data.some((item) =>
          ["error", "success"].includes(item.status),
        );

        if (isFinished) {
          clearInterval(intervalId);
          setIsStopped(true);
        }

        setEvents(uniqBy(data, "status"));
      } catch (error) {
        console.error("Error fetching extraction events:", error);
      }
    };

    fetchEvents();

    intervalId = setInterval(fetchEvents, 2000);

    return () => clearInterval(intervalId);
  }, [extractionId]);

  return (
    <main className="flex h-screen flex-1 flex-col items-center justify-center gap-4">
      <Logo width="150px" height="150px" />
      <h1 className="text-4xl font-bold text-foreground">NexusPage</h1>
      <h1 className="text2xl font-bold text-muted-foreground">from Okami</h1>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Progresso da extração
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {events.map((event, index) => (
              <EventIndicator
                key={event.id}
                event={event}
                showLoading={index === events.length - 1 && !iStopped}
              />
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <Link href="/" replace>
        <Button variant="default" disabled={!iStopped}>
          <FileArchive className="size-5" />
          Nova extração
        </Button>
      </Link>
    </main>
  );
}
/* 


*/
