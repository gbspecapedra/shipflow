"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LabelReadyBar({
  trackingCode,
  labelUrl,
  onNewLabel,
}: {
  trackingCode: string | null;
  labelUrl: string | null;
  onNewLabel: () => void;
}) {
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Status</div>
          <div className="text-base font-semibold">Label ready to print</div>
          {trackingCode ? (
            <div className="mt-1 text-sm text-muted-foreground">
              Tracking:{" "}
              <span className="font-medium text-foreground">
                {trackingCode}
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button asChild variant="outline">
            <Link href="/">Back to Dashboard</Link>
          </Button>

          <Button variant="outline" onClick={onNewLabel}>
            Create New Label
          </Button>

          <Button asChild disabled={!labelUrl}>
            <a href={labelUrl ?? "#"} target="_blank" rel="noreferrer">
              Open PDF
            </a>
          </Button>

          <Button
            variant="secondary"
            onClick={() => window.print()}
            disabled={!labelUrl}
          >
            Print
          </Button>
        </div>
      </div>
    </Card>
  );
}
