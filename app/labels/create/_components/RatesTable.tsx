"use client";

import type { Rate } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RatesTable({
  rates,
  selectedRateId,
  onSelect,
}: {
  rates: Rate[];
  selectedRateId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="text-xl font-semibold">
        Select Carrier and Delivery Service:
      </div>

      <div className="overflow-hidden rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Carrier</TableHead>
              <TableHead>Service Level</TableHead>
              <TableHead>Transit Days</TableHead>
              <TableHead className="text-right">Your Cost</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rates.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  No USPS rates found.
                </TableCell>
              </TableRow>
            ) : (
              rates.map((r) => (
                <TableRow
                  key={r.id}
                  className="cursor-pointer"
                  onClick={() => onSelect(r.id)}
                >
                  <TableCell>
                    <input
                      type="radio"
                      checked={selectedRateId === r.id}
                      onChange={() => onSelect(r.id)}
                    />
                  </TableCell>
                  <TableCell>{r.carrier}</TableCell>
                  <TableCell>{r.service}</TableCell>
                  <TableCell>{r.deliveryDays ?? "Unknown"}</TableCell>
                  <TableCell className="text-right">
                    {r.currency} {r.rate}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
