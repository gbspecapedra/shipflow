import {
  ok,
  badRequest,
  fromZodError,
  readJson,
  serverError,
} from "@/app/api/_shared/http";
import { getEasyPostClient } from "@/lib/easypost";
import { verifyAddressRequestSchema } from "@/lib/api-schemas";
import { toEasyPostAddress } from "@/lib/easypost-mappers";
import { epAddressSchema } from "@/lib/easypost-contracts";
import type { Address, VerifiedAddressResponse } from "@/lib/types";
import { ZodError } from "zod";

export const runtime = "nodejs";

function toAddressFromEasyPost(original: Address, ep: unknown): Address {
  const parsed = epAddressSchema.parse(ep);

  return {
    ...original,
    name: parsed.name ?? original.name,
    company: parsed.company ?? original.company,
    email: parsed.email ?? original.email,
    phone: parsed.phone ?? original.phone,
    street1: parsed.street1 ?? original.street1,
    street2: parsed.street2 ?? original.street2,
    city: parsed.city ?? original.city,
    state: parsed.state ?? original.state,
    zip: parsed.zip ?? original.zip,
    country: "US",
    isBusiness: original.isBusiness,
  };
}

function hasMeaningfulChange(a: Address, b: Address) {
  return (
    a.street1 !== b.street1 ||
    (a.street2 || "") !== (b.street2 || "") ||
    a.city !== b.city ||
    a.state !== b.state ||
    a.zip !== b.zip
  );
}

export async function POST(req: Request) {
  try {
    const body = await readJson<unknown>(req);
    const parsed = verifyAddressRequestSchema.parse(body);

    if (parsed.country !== "US") {
      return badRequest("Only US addresses are supported.");
    }

    const client = getEasyPostClient();

    const epAddress = await client.Address.create(
      toEasyPostAddress(parsed, true)
    );

    const verifiedCandidate = toAddressFromEasyPost(parsed, epAddress);

    const epParsed = epAddressSchema.parse(epAddress);
    const delivery = epParsed.verifications?.delivery;

    if (!delivery?.success) {
      const message =
        delivery?.errors?.[0]?.message ?? "Address could not be verified.";
      const resp: VerifiedAddressResponse = {
        needsConfirm: false,
        original: parsed,
        verified: null,
        message,
      };
      return ok(resp);
    }

    const changed = hasMeaningfulChange(parsed, verifiedCandidate);

    const resp: VerifiedAddressResponse = {
      needsConfirm: changed,
      original: parsed,
      verified: verifiedCandidate,
    };

    return ok(resp);
  } catch (err) {
    if (err instanceof ZodError) return fromZodError(err);
    if (err instanceof Error && err.message === "Invalid JSON body") {
      return badRequest("Invalid JSON body");
    }
    return serverError("Failed to verify address.");
  }
}
