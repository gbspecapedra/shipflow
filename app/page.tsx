import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/breadcrumbs";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Home" }]} />

      {/* Header row */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Create and print USPS shipping labels in a few steps.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">Test Mode</Badge>
          <Badge variant="secondary">US Only</Badge>
        </div>
      </div>

      {/* Main action */}
      <Card className="p-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <div className="text-lg font-semibold">Create a shipping label</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter sender and recipient addresses (US only), package details,
              choose a USPS rate, and print a PDF label.
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Button asChild>
                <Link href="/labels/create">Create Label</Link>
              </Button>

              <Button variant="outline" className="cursor-not-allowed">
                View History
              </Button>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4">
            <div className="rounded-lg border bg-[#F6F7FB] p-4">
              <div className="text-sm font-medium">Quick info</div>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Output: PDF label preview + print</li>
                <li>• Carrier: USPS (MVP)</li>
                <li>• Address verification: EasyPost</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Secondary cards */}
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-12 md:col-span-4 p-6">
          <div className="text-sm font-medium">Recent labels</div>
          <p className="mt-1 text-sm text-muted-foreground">
            Coming next: history with reprint.
          </p>
        </Card>

        <Card className="col-span-12 md:col-span-4 p-6">
          <div className="text-sm font-medium">Settings</div>
          <p className="mt-1 text-sm text-muted-foreground">
            Coming next: saved senders and defaults.
          </p>
        </Card>

        <Card className="col-span-12 md:col-span-4 p-6">
          <div className="text-sm font-medium">Tracking</div>
          <p className="mt-1 text-sm text-muted-foreground">
            Coming next: webhook-based tracking updates.
          </p>
        </Card>
      </div>
    </div>
  );
}
