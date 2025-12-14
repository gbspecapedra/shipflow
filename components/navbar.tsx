"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type NavItem = {
  label: string;
  href: string;
  disabled?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Create Label", href: "/labels/create" },
  { label: "History", href: "/labels/history", disabled: true },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold text-blue-700">
            ShipFlow
          </Link>

          <nav className="hidden items-center gap-4 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.disabled ? "#" : item.href}
                  className={cn(
                    "text-sm transition-colors",
                    item.disabled
                      ? "cursor-not-allowed text-muted-foreground opacity-60"
                      : isActive
                      ? "font-medium text-blue-700"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:block">
            Jane Doe
          </span>
          <Button variant="outline" size="sm" className="cursor-not-allowed">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
