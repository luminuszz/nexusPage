import { LinkIcon, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export interface UrlCardProps {
  url: {
    submittedUrl: string;
  };
  removeUrl: (id: string) => void;
}

export function UrlCard({ url, removeUrl }: UrlCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <a
            href={url.submittedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 truncate text-blue-600 hover:underline"
          >
            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{url.submittedUrl}</span>
            </div>
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeUrl(url.submittedUrl)}
            className="flex-shrink-0 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
