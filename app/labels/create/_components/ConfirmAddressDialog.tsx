"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Address, AddressKind } from "@/lib/types";

type ConfirmPayload = {
  kind: AddressKind;
  original: Address;
  verified: Address;
};

export default function ConfirmAddressDialog({
  open,
  payload,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  payload: ConfirmPayload | null;
  onOpenChange: (v: boolean) => void;
  onConfirm: (choice: "verified" | "original") => void;
}) {
  const [choice, setChoice] = useState<"verified" | "original">(
    open ? "verified" : "original"
  );

  if (!payload) return null;

  const renderAddress = (a: Address) => (
    <div className="text-sm leading-5">
      <div className="font-medium">{a.name}</div>
      <div>{a.street1}</div>
      {a.street2 ? <div>{a.street2}</div> : null}
      <div>
        {a.city} {a.state} {a.zip}
      </div>
      <div>{a.country}</div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Confirm Address</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          We found a better match for the address you supplied. Which address
          would you prefer to use?
        </p>

        <div className="mt-4 grid grid-cols-2 gap-6">
          <label className="cursor-pointer rounded-lg border p-4">
            <div className="flex items-start gap-2">
              <input
                type="radio"
                checked={choice === "verified"}
                onChange={() => setChoice("verified")}
              />
              <div>
                <div className="mb-2 font-medium">Verified Address</div>
                {renderAddress(payload.verified)}
              </div>
            </div>
          </label>

          <label className="cursor-pointer rounded-lg border p-4">
            <div className="flex items-start gap-2">
              <input
                type="radio"
                checked={choice === "original"}
                onChange={() => setChoice("original")}
              />
              <div>
                <div className="mb-2 font-medium">Original Address</div>
                {renderAddress(payload.original)}
              </div>
            </div>
          </label>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={() => onConfirm(choice)}>Use Address</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
