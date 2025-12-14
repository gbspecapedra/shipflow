import Link from "next/link";
import { cn } from "@/lib/utils";

export type Crumb = {
  label: string;
  href?: string; // if absent, means current page
};

export default function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  if (!items?.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li
              key={`${item.label}-${idx}`}
              className="flex items-center gap-2"
            >
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(isLast ? "text-foreground font-medium" : "")}
                >
                  {item.label}
                </span>
              )}

              {!isLast ? <span className="text-gray-300">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
