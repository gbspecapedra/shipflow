"use client";

import type { UseFormReturn } from "react-hook-form";
import type { CreateFlow } from "@/lib/types";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export default function AddressForm({
  form,
}: {
  form: UseFormReturn<CreateFlow>;
}) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const to = watch("to");
  const e = errors.to;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="text-base font-semibold">Recipient:</div>
          <div className="text-sm text-muted-foreground">Contact:</div>
        </div>

        <div className="col-span-8 space-y-2">
          <Label>Send To / Recipient *</Label>
          <Input {...register("to.name")} placeholder="John Doe" />
          {e?.name?.message ? (
            <p className="text-sm text-red-600">{e.name.message}</p>
          ) : null}
        </div>

        <div className="col-span-4 space-y-2">
          <Label>Company Name</Label>
          <Input {...register("to.company")} placeholder="" />
        </div>

        <div className="col-span-8 space-y-2">
          <Label>Email Address</Label>
          <Input {...register("to.email")} placeholder="john@email.com" />
          {e?.email?.message ? (
            <p className="text-sm text-red-600">{e.email.message}</p>
          ) : null}
        </div>

        <div className="col-span-4 space-y-2">
          <Label>Phone Number</Label>
          <Input {...register("to.phone")} placeholder="1234567890" />
          {e?.phone?.message ? (
            <p className="text-sm text-red-600">{e.phone.message}</p>
          ) : null}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="text-base font-semibold">Address:</div>
        </div>

        <div className="col-span-12 space-y-2">
          <Label>Street 1 *</Label>
          <Input {...register("to.street1")} placeholder="2889 W Ashton Blvd" />
          {e?.street1?.message ? (
            <p className="text-sm text-red-600">{e.street1.message}</p>
          ) : null}
        </div>

        <div className="col-span-12 space-y-2">
          <Label>Street 2</Label>
          <Input {...register("to.street2")} placeholder="" />
        </div>

        <div className="col-span-3 space-y-2">
          <Label>Country *</Label>
          <Input value="US" readOnly className="bg-muted" />
        </div>

        <div className="col-span-3 space-y-2">
          <Label>Zip / Postal Code *</Label>
          <Input {...register("to.zip")} placeholder="84043" />
          {e?.zip?.message ? (
            <p className="text-sm text-red-600">{e.zip.message}</p>
          ) : null}
        </div>

        <div className="col-span-3 space-y-2">
          <Label>State *</Label>
          <Input {...register("to.state")} placeholder="UT" />
          {e?.state?.message ? (
            <p className="text-sm text-red-600">{e.state.message}</p>
          ) : null}
        </div>

        <div className="col-span-3 space-y-2">
          <Label>City / Province *</Label>
          <Input {...register("to.city")} placeholder="Lehi" />
          {e?.city?.message ? (
            <p className="text-sm text-red-600">{e.city.message}</p>
          ) : null}
        </div>

        <div className="col-span-12 flex items-center gap-2">
          <Checkbox
            checked={Boolean(to.isBusiness)}
            onCheckedChange={(v) => setValue("to.isBusiness", Boolean(v))}
          />
          <span className="text-sm">This is a business address</span>
        </div>
      </div>
    </div>
  );
}
