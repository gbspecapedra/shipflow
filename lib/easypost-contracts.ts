import { z } from "zod";

export const epRateSchema = z.object({
  id: z.string(),
  carrier: z.string(),
  service: z.string(),
  rate: z.string(),
  currency: z.string().optional().default("USD"),
  delivery_days: z.number().nullable().optional(),
});

export const epShipmentSchema = z.object({
  id: z.string(),
  rates: z.array(epRateSchema).default([]),
  tracking_code: z.string().nullable().optional(),
  postage_label: z
    .object({
      label_url: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
});

export const epAddressSchema = z.object({
  name: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  street1: z.string().nullable().optional(),
  street2: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  zip: z.string().nullable().optional(),
  country: z.string().nullable().optional(),

  verifications: z
    .object({
      delivery: z
        .object({
          success: z.boolean().optional(),
          errors: z
            .array(
              z.object({
                message: z.string().optional(),
              })
            )
            .optional(),
        })
        .optional(),
    })
    .optional(),
});
