import {
  ok,
  badRequest,
  fromZodError,
  readJson,
  serverError,
} from "@/app/api/_shared/http";
import { getEasyPostClient } from "@/lib/easypost";
import { ratesRequestSchema } from "@/lib/api-schemas";
import { toEasyPostAddress, toEasyPostParcel } from "@/lib/easypost-mappers";
import { epShipmentSchema } from "@/lib/easypost-contracts";
import type { Rate, RatesResponse } from "@/lib/types";
import { ZodError } from "zod";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await readJson<unknown>(req);
    const parsed = ratesRequestSchema.parse(body);

    if (parsed.from.country !== "US" || parsed.to.country !== "US") {
      return badRequest("Only US addresses are supported.");
    }

    const client = getEasyPostClient();

    const shipment = await client.Shipment.create({
      to_address: toEasyPostAddress(parsed.to, false),
      from_address: toEasyPostAddress(parsed.from, false),
      parcel: toEasyPostParcel(parsed.parcel),
    });

    const ship = epShipmentSchema.parse(shipment);

    // MVP: USPS only
    const uspsRates: Rate[] = ship.rates
      .filter((r) => r.carrier === "USPS")
      .map((r) => ({
        id: r.id,
        carrier: r.carrier,
        service: r.service,
        deliveryDays: r.delivery_days ?? null,
        rate: r.rate,
        currency: r.currency ?? "USD",
      }));

    const resp: RatesResponse = {
      shipmentId: ship.id,
      rates: uspsRates,
    };

    return ok(resp);
  } catch (err) {
    if (err instanceof ZodError) return fromZodError(err);
    if (err instanceof Error && err.message === "Invalid JSON body") {
      return badRequest("Invalid JSON body");
    }
    return serverError("Failed to fetch rates.");
  }
}
