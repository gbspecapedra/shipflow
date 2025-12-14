import type { z } from "zod";
import type { addressSchema, parcelSchema, createFlowSchema } from "./schemas";

export type Address = z.input<typeof addressSchema>;
export type Parcel = z.input<typeof parcelSchema>;
export type CreateFlow = z.input<typeof createFlowSchema>;

export type AddressKind = "from" | "to";

export type VerifiedAddressResponse =
  | {
      needsConfirm: true;
      kind?: AddressKind;
      original: Address;
      verified: Address;
      message?: string;
    }
  | {
      needsConfirm: false;
      kind?: AddressKind;
      original: Address;
      verified: Address | null;
      message?: string;
    };

export type Rate = {
  id: string;
  carrier: "USPS" | string;
  service: string;
  deliveryDays: number | null;
  rate: string; // EasyPost retorna string
  currency: string; // geralmente "USD"
};

export type RatesResponse = {
  shipmentId: string;
  rates: Rate[];
};

export type PurchaseResponse = {
  shipmentId: string;
  trackingCode: string | null;
  labelUrl: string | null;
};
