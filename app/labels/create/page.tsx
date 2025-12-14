"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createFlowSchema } from "@/lib/schemas";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CreateFlow, Rate, Address, PurchaseResponse } from "@/lib/types";
import AddressForm from "./_components/AddressForm";
import ConfirmAddressDialog from "./_components/ConfirmAddressDialog";
import ParcelForm from "./_components/ParcelForm";
import RatesTable from "./_components/RatesTable";
import Stepper from "./_components/Stepper";
import SenderCard from "./_components/SenderCard";

import Breadcrumbs from "@/components/breadcrumbs";
import LabelReadyBar from "./_components/LabelReadyBar";
import LabelGeneratingBar from "./_components/LabelGeneratingBar";
import PdfPreview from "./_components/PdfPreview";

type Step = 1 | 2 | 3 | 4;

const steps = [
  { key: "addresses", label: "Addresses" },
  { key: "parcel", label: "Parcel & Label Options" },
  { key: "rates", label: "Carrier & Service" },
  { key: "print", label: "Print Label" },
];

export default function CreateLabelPage() {
  const [isGeneratingLabel, setIsGeneratingLabel] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmPayload, setConfirmPayload] = useState<{
    kind: "from" | "to";
    original: Address;
    verified: Address;
  } | null>(null);

  const [shipmentId, setShipmentId] = useState<string | null>(null);
  const [rates, setRates] = useState<Rate[]>([]);
  const [selectedRateId, setSelectedRateId] = useState<string | null>(null);

  const [labelUrl, setLabelUrl] = useState<string | null>(null);
  const [trackingCode, setTrackingCode] = useState<string | null>(null);

  const completedStep = labelUrl ? 4 : Math.min(step - 1, 3);

  const defaultValues = useMemo<CreateFlow>(
    () => ({
      from: {
        name: "Jane Doe",
        company: "",
        email: "",
        phone: "",
        street1: "1600 Pennsylvania Ave NW",
        street2: "",
        city: "Washington",
        state: "DC",
        zip: "20500",
        country: "US",
        isBusiness: false,
      },
      to: {
        name: "",
        company: "",
        email: "",
        phone: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        zip: "",
        country: "US",
        isBusiness: false,
      },
      parcel: {
        length: 5,
        width: 5,
        height: 5,
        weightOz: 16,
        labelFormat: "PDF",
      },
    }),
    []
  );

  const startNewLabel = () => {
    form.reset(defaultValues);
    setStep(1);

    setRates([]);
    setShipmentId(null);
    setSelectedRateId(null);

    setLabelUrl(null);
    setTrackingCode(null);

    setConfirmPayload(null);
    setConfirmOpen(false);

    setIsGeneratingLabel(false);
  };

  const form = useForm<CreateFlow>({
    resolver: zodResolver(createFlowSchema),
    defaultValues,
    mode: "onBlur",
  });

  async function verifyAddress(kind: "from" | "to") {
    const addr = form.getValues(kind);
    const res = await fetch("/api/address/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addr),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Address verification failed");

    if (data.needsConfirm) {
      setConfirmPayload({
        kind,
        original: data.original,
        verified: data.verified,
      });
      setConfirmOpen(true);
      return false;
    }

    return true;
  }

  async function onNextFromAddresses() {
    const ok = await form.trigger(["from", "to"]);
    if (!ok) return;

    const toOk = await verifyAddress("to");
    if (!toOk) return;

    setStep(2);
  }

  async function onNextFromParcel() {
    const ok = await form.trigger(["parcel"]);
    if (!ok) return;

    const payload = form.getValues();

    const res = await fetch("/api/labels/rates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to fetch rates");

    setShipmentId(data.shipmentId);
    setRates(data.rates);
    setSelectedRateId(null);
    setStep(3);
  }

  async function onCheckout() {
    if (!shipmentId || !selectedRateId) return;

    setIsGeneratingLabel(true);

    try {
      const res = await fetch("/api/labels/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipmentId,
          rateId: selectedRateId,
          labelFormat: "PDF",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to purchase label");

      setLabelUrl(data.labelUrl);
      setTrackingCode(data.trackingCode);
      setStep(4);
    } finally {
      setIsGeneratingLabel(false);
    }
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Labels", href: "/labels/create" },
          { label: "Create Label" },
        ]}
      />

      <div className="mb-4 flex items-center gap-3">
        <h1 className="text-xl font-semibold">Create a Label</h1>
      </div>

      <Stepper steps={steps} currentStep={step} completedStep={completedStep} />

      <div className="mt-6">
        {step === 1 && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4">
              <SenderCard form={form} />
            </div>
            <div className="col-span-8">
              <Card className="p-6">
                <AddressForm form={form} />
                <div className="mt-6 flex justify-end">
                  <Button onClick={onNextFromAddresses}>
                    Next: Parcel & Label Options
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {step === 2 && (
          <Card className="p-6">
            <ParcelForm form={form} />
            <div className="mt-6 flex items-center justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back: Addresses
              </Button>
              <Button onClick={onNextFromParcel}>
                Next: Carrier & Service
              </Button>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-6">
            <RatesTable
              rates={rates}
              selectedRateId={selectedRateId}
              onSelect={setSelectedRateId}
            />
            <div className="mt-6 flex items-center justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back: Parcel & Label Options
              </Button>
              <Button disabled={!selectedRateId} onClick={onCheckout}>
                Checkout: Print Label
              </Button>
            </div>
          </Card>
        )}

        {step === 4 && (
          <div className="space-y-4">
            {/* Loading */}
            {isGeneratingLabel && (
              <LabelGeneratingBar onBack={() => setStep(3)} />
            )}

            {/* Ready */}
            {!isGeneratingLabel && labelUrl && (
              <LabelReadyBar
                trackingCode={trackingCode}
                labelUrl={labelUrl}
                onNewLabel={startNewLabel}
              />
            )}

            {/* Preview area (skeleton if no label) */}
            <Card className="p-6">
              {labelUrl ? (
                <PdfPreview url={labelUrl} />
              ) : (
                <div className="h-[520px] w-full animate-pulse rounded-lg border bg-muted" />
              )}
            </Card>
          </div>
        )}
      </div>

      <ConfirmAddressDialog
        open={confirmOpen}
        payload={confirmPayload}
        onOpenChange={setConfirmOpen}
        onConfirm={(choice) => {
          if (!confirmPayload) return;
          const { kind, original, verified } = confirmPayload;
          form.setValue(kind, choice === "verified" ? verified : original, {
            shouldValidate: true,
          });
          setConfirmOpen(false);
          setConfirmPayload(null);
        }}
      />
    </div>
  );
}
