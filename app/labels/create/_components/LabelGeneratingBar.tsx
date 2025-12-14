"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Spinner() {
  return (
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground" />
  );
}

export default function LabelGeneratingBar({ onBack }: { onBack: () => void }) {
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Spinner />
          <div>
            <div className="text-sm text-muted-foreground">Status</div>
            <div className="text-base font-semibold">Generating label…</div>
            <div className="mt-1 text-sm text-muted-foreground">
              We&apos;re purchasing postage and preparing your PDF.
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button disabled>Print</Button>
          <Button disabled>Open PDF</Button>
        </div>
      </div>
    </Card>
  );
}
