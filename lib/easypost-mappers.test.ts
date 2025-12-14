import { describe, it, expect } from "vitest";
import { makeFlow } from "@/test/factories";
import type { CreateFlow } from "@/lib/types";
import { toEasyPostAddress, toEasyPostParcel } from "./easypost-mappers";

describe("easypost-mappers", () => {
  it("maps flow.from to an EasyPost address payload (with verify) and keeps country US", () => {
    const payload = makeFlow();
    const mapped = toEasyPostAddress(payload.from, true);

    expect(mapped.country).toBe("US");
    expect(mapped.verify).toEqual(["delivery"]);
    expect(mapped.street1).toBe(payload.from.street1);
    expect(mapped.city).toBe(payload.from.city);
    expect(mapped.state).toBe(payload.from.state);
    expect(mapped.zip).toBe(payload.from.zip);
  });

  it("maps flow.to to an EasyPost address payload (with verify) and keeps country US", () => {
    const payload = makeFlow();
    const mapped = toEasyPostAddress(payload.to, true);

    expect(mapped.country).toBe("US");
    expect(mapped.verify).toEqual(["delivery"]);
    expect(mapped.street1).toBe(payload.to.street1);
  });

  it("strips empty optional strings (street2/company/email/phone) from the EasyPost payload", () => {
    const payload = makeFlow({
      from: {
        street2: "",
        company: "",
        email: "",
        phone: "",
      },
    });

    const mapped = toEasyPostAddress(payload.from, true);

    expect(mapped.street2).toBeUndefined();
    expect(mapped.company).toBeUndefined();
    expect(mapped.email).toBeUndefined();
    expect(mapped.phone).toBeUndefined();
  });

  it("maps parcel values to EasyPost parcel payload", () => {
    const payload = makeFlow({
      parcel: { length: 5, width: 6, height: 7, weightOz: 10 },
    });

    const mapped = toEasyPostParcel(payload.parcel);

    expect(mapped.length).toBe(5);
    expect(mapped.width).toBe(6);
    expect(mapped.height).toBe(7);
    expect(mapped.weight).toBe(10);
  });

  it("coerces string parcel values into numbers (simulating external input)", () => {
    const payload = makeFlow();

    const external = {
      ...payload,
      parcel: { ...payload.parcel, weightOz: "10" },
    } as unknown as CreateFlow;

    const mapped = toEasyPostParcel(external.parcel);

    expect(mapped.weight).toBe(10);
    expect(typeof mapped.weight).toBe("number");
  });

  it("produces NaN when parcel values are not numeric", () => {
    const payload = makeFlow();

    const external = {
      ...payload,
      parcel: { ...payload.parcel, weightOz: "abc" },
    } as unknown as CreateFlow;

    const mapped = toEasyPostParcel(external.parcel);

    expect(Number.isNaN(mapped.weight)).toBe(true);
  });
});
