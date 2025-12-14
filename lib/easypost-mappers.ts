import type { Address, Parcel } from "@/lib/types";

export type EasyPostAddressCreate = {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: "US";
  verify?: string[];
};

export type EasyPostParcelCreate = {
  length: number;
  width: number;
  height: number;
  weight: number; // oz
};

export function toEasyPostAddress(
  a: Address,
  verifyDelivery = false
): EasyPostAddressCreate {
  return {
    name: a.name,
    company: a.company || undefined,
    email: a.email || undefined,
    phone: a.phone || undefined,
    street1: a.street1,
    street2: a.street2 || undefined,
    city: a.city,
    state: a.state,
    zip: a.zip,
    country: "US",
    verify: verifyDelivery ? ["delivery"] : undefined,
  };
}

export function toEasyPostParcel(p: Parcel): EasyPostParcelCreate {
  return {
    length: Number(p.length),
    width: Number(p.width),
    height: Number(p.height),
    weight: Number(p.weightOz),
  };
}
