"use client";

import type { UseFormReturn } from "react-hook-form";
import type { CreateFlow } from "@/lib/types";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

function UnitInput({
  label,
  unit,
  error,
  inputProps,
}: {
  label: string;
  unit: string;
  error?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="relative">
        <Input {...inputProps} />
        <span className="pointer-events-none absolute right-3 top-2.5 text-sm text-muted-foreground">
          {unit}
        </span>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

function ShipDateInput() {
  const [value, setValue] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(new Date().toLocaleDateString("en-US"));
  }, []);

  return <Input value={value} readOnly className="bg-muted" />;
}

export default function ParcelForm({
  form,
}: {
  form: UseFormReturn<CreateFlow>;
}) {
  const {
    register,
    formState: { errors },
  } = form;

  const e = errors.parcel;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <div className="text-xl font-semibold">Parcel Information</div>
          <div className="text-sm text-muted-foreground">
            Enter package dimensions and weight.
          </div>
        </div>

        <div className="col-span-4 flex justify-end">
          <div className="text-sm text-muted-foreground">Inches / Ounces</div>
        </div>

        <div className="col-span-3">
          <UnitInput
            label="Length *"
            unit="in"
            error={e?.length?.message}
            inputProps={{
              type: "number",
              step: "0.01",
              ...register("parcel.length"),
            }}
          />
        </div>

        <div className="col-span-3">
          <UnitInput
            label="Width *"
            unit="in"
            error={e?.width?.message}
            inputProps={{
              type: "number",
              step: "0.01",
              ...register("parcel.width"),
            }}
          />
        </div>

        <div className="col-span-3">
          <UnitInput
            label="Height *"
            unit="in"
            error={e?.height?.message}
            inputProps={{
              type: "number",
              step: "0.01",
              ...register("parcel.height"),
            }}
          />
        </div>

        <div className="col-span-3">
          <UnitInput
            label="Weight *"
            unit="oz"
            error={e?.weightOz?.message}
            inputProps={{
              type: "number",
              step: "0.01",
              ...register("parcel.weightOz"),
            }}
          />
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="text-xl font-semibold">Label Options</div>
          <div className="text-sm text-muted-foreground">
            For the MVP, we generate labels as PDF.
          </div>
        </div>

        <div className="col-span-6 space-y-2">
          <Label>Label Format</Label>
          <Input value="PDF" readOnly className="bg-muted" />
        </div>

        <div className="col-span-6 space-y-2">
          <Label>Ship Date</Label>
          <ShipDateInput />
        </div>

        <div className="col-span-12">
          <Card className="p-4">
            <div className="text-sm font-medium">Add-ons (Later)</div>
            <div className="text-sm text-muted-foreground">
              Insurance, signature, return label, pickup scheduling.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
