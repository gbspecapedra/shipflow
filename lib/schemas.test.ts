import { describe, it, expect } from "vitest";
import { createFlowSchema } from "./schemas";
import type { CreateFlow } from "@/lib/types";
import { makeFlow } from "@/test/factories";

describe("createFlowSchema", () => {
  it("accepts a valid flow", () => {
    const payload = makeFlow();
    const result = createFlowSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("rejects non-US country (simulating external input)", () => {
    const payload = makeFlow();

    const invalidPayload = {
      ...payload,
      to: { ...payload.to, country: "CA" },
    } as unknown as CreateFlow;

    const result = createFlowSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });

  it("rejects missing required fields", () => {
    const payload = makeFlow({ to: { name: "" } });
    const result = createFlowSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it("rejects non-positive parcel values", () => {
    const payload = makeFlow({ parcel: { weightOz: 0 } });
    const result = createFlowSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });
});
