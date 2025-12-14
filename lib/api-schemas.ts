import { z } from "zod";
import { addressSchema, createFlowSchema } from "@/lib/schemas";

export const verifyAddressRequestSchema = addressSchema;

export const ratesRequestSchema = createFlowSchema;

export const purchaseRequestSchema = z.object({
  shipmentId: z.string().min(1),
  rateId: z.string().min(1),
  labelFormat: z.literal("PDF").default("PDF"),
});
