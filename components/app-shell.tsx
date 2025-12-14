import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F7FB]">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} ShipFlow</div>
            <div className="flex gap-4">
              <span className="cursor-not-allowed opacity-70">Privacy</span>
              <span className="cursor-not-allowed opacity-70">Terms</span>
              <span className="cursor-not-allowed opacity-70">Support</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="text-xs text-muted-foreground">
            Prototype · USPS test labels via EasyPost
          </div>
        </div>
      </footer>
    </div>
  );
}
