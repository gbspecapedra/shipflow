"use client";

import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { CreateFlow, Address } from "@/lib/types";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

function AddressSummary({ a }: { a: Address }) {
  return (
    <div className="text-sm leading-5 text-muted-foreground">
      <div className="font-medium text-foreground">{a.name}</div>
      <div>{a.street1}</div>
      {a.street2 ? <div>{a.street2}</div> : null}
      <div>
        {a.city} {a.state} {a.zip}
      </div>
      <div>{a.country}</div>
    </div>
  );
}

function SenderEditDialog({
  open,
  onOpenChange,
  form,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  form: UseFormReturn<CreateFlow>;
}) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const from = watch("from");
  const e = errors.from;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Sender Information</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 space-y-2">
            <Label>Sender Name *</Label>
            <Input {...register("from.name")} />
            {e?.name?.message ? (
              <p className="text-sm text-red-600">{e.name.message}</p>
            ) : null}
          </div>

          <div className="col-span-4 space-y-2">
            <Label>Company</Label>
            <Input {...register("from.company")} />
          </div>

          <div className="col-span-8 space-y-2">
            <Label>Email</Label>
            <Input {...register("from.email")} />
            {e?.email?.message ? (
              <p className="text-sm text-red-600">{e.email.message}</p>
            ) : null}
          </div>

          <div className="col-span-4 space-y-2">
            <Label>Phone</Label>
            <Input {...register("from.phone")} />
            {e?.phone?.message ? (
              <p className="text-sm text-red-600">{e.phone.message}</p>
            ) : null}
          </div>

          <div className="col-span-12 space-y-2">
            <Label>Street 1 *</Label>
            <Input {...register("from.street1")} />
            {e?.street1?.message ? (
              <p className="text-sm text-red-600">{e.street1.message}</p>
            ) : null}
          </div>

          <div className="col-span-12 space-y-2">
            <Label>Street 2</Label>
            <Input {...register("from.street2")} />
          </div>

          <div className="col-span-3 space-y-2">
            <Label>Country *</Label>
            <Input value="US" readOnly className="bg-muted" />
          </div>

          <div className="col-span-3 space-y-2">
            <Label>Zip *</Label>
            <Input {...register("from.zip")} />
            {e?.zip?.message ? (
              <p className="text-sm text-red-600">{e.zip.message}</p>
            ) : null}
          </div>

          <div className="col-span-3 space-y-2">
            <Label>State *</Label>
            <Input {...register("from.state")} />
            {e?.state?.message ? (
              <p className="text-sm text-red-600">{e.state.message}</p>
            ) : null}
          </div>

          <div className="col-span-3 space-y-2">
            <Label>City *</Label>
            <Input {...register("from.city")} />
            {e?.city?.message ? (
              <p className="text-sm text-red-600">{e.city.message}</p>
            ) : null}
          </div>

          <div className="col-span-12 flex items-center gap-2 pt-2">
            <Checkbox
              checked={Boolean(from.isBusiness)}
              onCheckedChange={(v) => setValue("from.isBusiness", Boolean(v))}
            />
            <span className="text-sm">This is a business address</span>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function SenderCard({
  form,
}: {
  form: UseFormReturn<CreateFlow>;
}) {
  const [open, setOpen] = useState(false);
  const from = form.watch("from");

  return (
    <>
      <Card className="p-6">
        <div className="mb-2 text-base font-semibold">Sender Information:</div>
        <AddressSummary a={from} />

        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setOpen(true)}
          >
            Change Sender Info
          </Button>
        </div>
      </Card>

      <SenderEditDialog open={open} onOpenChange={setOpen} form={form} />
    </>
  );
}
