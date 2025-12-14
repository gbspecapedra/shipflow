import type { Metadata } from "next";
import "./globals.css";
import AppShell from "../components/app-shell";

export const metadata: Metadata = {
  title: "Shipping Labels",
  description: "Create USPS shipping labels",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#F6F7FB] text-foreground"
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
