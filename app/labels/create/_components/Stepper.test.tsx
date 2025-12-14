import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Stepper from "./Stepper";

describe("Stepper", () => {
  const steps = [
    { key: "addresses", label: "Addresses" },
    { key: "parcel", label: "Parcel & Label Options" },
    { key: "rates", label: "Carrier & Service" },
    { key: "print", label: "Print Label" },
  ];

  it("shows checkmarks for completed steps", () => {
    render(<Stepper steps={steps} currentStep={4} completedStep={3} />);

    const checks = screen.getAllByText("✓");
    expect(checks.length).toBe(3);

    expect(screen.getByText("Print Label")).toBeInTheDocument();
  });

  it("shows step numbers for steps not completed yet", () => {
    render(<Stepper steps={steps} currentStep={2} completedStep={1} />);

    expect(screen.getByText("✓")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });
});
