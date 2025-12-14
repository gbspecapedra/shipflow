import {
  ok,
  badRequest,
  fromZodError,
  readJson,
  serverError,
} from "@/app/api/_shared/http";
import { getEasyPostClient } from "@/lib/easypost";
import { purchaseRequestSchema } from "@/lib/api-schemas";
import { epShipmentSchema } from "@/lib/easypost-contracts";
import type { PurchaseResponse } from "@/lib/types";
import { ZodError } from "zod";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await readJson<unknown>(req);
    const parsed = purchaseRequestSchema.parse(body);

    const client = getEasyPostClient();

    const boughtRaw = await client.Shipment.buy(
      parsed.shipmentId,
      parsed.rateId
    );

    const boughtParsed = epShipmentSchema.parse(boughtRaw);

    let finalRaw: unknown = boughtRaw;

    if (parsed.labelFormat === "PDF") {
      const shipmentApi = client.Shipment as unknown as {
        convertLabelFormat?: (
          shipmentId: string,
          fmt: string
        ) => Promise<unknown>;
        convert_label_format?: (
          shipmentId: string,
          fmt: string
        ) => Promise<unknown>;
      };

      if (typeof shipmentApi.convertLabelFormat === "function") {
        finalRaw = await shipmentApi.convertLabelFormat(boughtParsed.id, "PDF");
      } else if (typeof shipmentApi.convert_label_format === "function") {
        finalRaw = await shipmentApi.convert_label_format(
          boughtParsed.id,
          "PDF"
        );
      }
    }

    const finalParsed = epShipmentSchema.parse(finalRaw);

    const resp: PurchaseResponse = {
      shipmentId: finalParsed.id,
      trackingCode: finalParsed.tracking_code ?? null,
      labelUrl: finalParsed.postage_label?.label_url ?? null,
    };

    return ok(resp);
  } catch (err) {
    if (err instanceof ZodError) return fromZodError(err);
    if (err instanceof Error && err.message === "Invalid JSON body") {
      return badRequest("Invalid JSON body");
    }
    return serverError("Failed to purchase label.");
  }
}
