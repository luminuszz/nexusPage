import { ExtractionStatus } from "@/db/schema";
import { CheckCircle, CircleX, LoaderCircle } from "lucide-react";

export interface EventIndicatorProps {
  event: {
    status: ExtractionStatus;
    title: string;
    description: string;
  };
  showLoading: boolean;
}

export function EventIndicator({ event, showLoading }: EventIndicatorProps) {
  const { description, status, title } = event;

  const icon = {
    success: <CheckCircle className="size-5 text-emerald-500" />,
    error: <CircleX className="size-5 text-red-500" />,
  };

  return (
    <div className="mb-4 flex justify-between last:mb-0">
      <div className="mb-2 flex items-center gap-2">
        {showLoading ? (
          <LoaderCircle className="size-5 animate-spin" />
        ) : status === "error" ? (
          icon.error
        ) : (
          icon.success
        )}
        <span className="text md text-foreground">{title}</span>
      </div>

      <div className="mb-4 last:mb-0">
        <p className="tex-sm break-all text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
