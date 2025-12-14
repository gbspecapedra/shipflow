import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().min(1, "Required"),
  company: z.string().optional().or(z.literal("")),
  email: z.email().optional().or(z.literal("")),
  phone: z.string().min(7).optional().or(z.literal("")),
  street1: z.string().min(1, "Required"),
  street2: z.string().optional().or(z.literal("")),
  city: z.string().min(1, "Required"),
  state: z.string().min(2, "Required"),
  zip: z.string().min(5, "Required"),
  country: z.literal("US"),
  isBusiness: z.boolean().default(false),
});

export const parcelSchema = z.object({
  length: z.coerce.number().positive(),
  width: z.coerce.number().positive(),
  height: z.coerce.number().positive(),
  weightOz: z.coerce.number().positive(),
  labelFormat: z.literal("PDF").default("PDF"),
});

export const createFlowSchema = z.object({
  from: addressSchema,
  to: addressSchema,
  parcel: parcelSchema,
});
