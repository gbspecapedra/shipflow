"use client";

import { cn } from "@/lib/utils";

type Step = {
  key: string;
  label: string;
};

export default function Stepper({
  steps,
  currentStep,
  completedStep,
}: {
  steps: Step[];
  currentStep: number;
  completedStep: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      {steps.map((s, idx) => {
        const stepNumber = idx + 1;
        const isDone = stepNumber <= completedStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={s.key} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium",
                  isDone && "border-blue-700 bg-blue-700 text-white",
                  isActive && !isDone && "border-blue-700 text-blue-700",
                  !isActive &&
                    !isDone &&
                    "border-gray-300 text-muted-foreground"
                )}
              >
                {isDone ? "✓" : stepNumber}
              </div>

              <span
                className={cn(
                  "whitespace-nowrap",
                  isDone && "text-blue-700 font-medium",
                  isActive && !isDone && "text-blue-700 font-medium",
                  !isActive && !isDone && "text-muted-foreground"
                )}
              >
                {s.label}
              </span>
            </div>

            {idx < steps.length - 1 ? (
              <span className="text-gray-300">&#62;</span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
