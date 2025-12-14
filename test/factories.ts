import type { CreateFlow } from "@/lib/types";

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export function makeFlow(overrides: DeepPartial<CreateFlow> = {}): CreateFlow {
  const base: CreateFlow = {
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
      name: "John Doe",
      company: "",
      email: "",
      phone: "",
      street1: "2889 W Ashton Blvd",
      street2: "",
      city: "Lehi",
      state: "UT",
      zip: "84043",
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
  };

  return {
    ...base,
    ...overrides,
    from: { ...base.from, ...(overrides.from ?? {}) },
    to: { ...base.to, ...(overrides.to ?? {}) },
    parcel: { ...base.parcel, ...(overrides.parcel ?? {}) },
  };
}
