"use client";

import { useEffect, useState } from "react";

export default function PdfPreview({ url }: { url: string | null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[520px] w-full animate-pulse rounded-lg border bg-muted" />
    );
  }

  if (!url) {
    return <div className="h-[520px] w-full rounded-lg border bg-muted" />;
  }

  return (
    <iframe
      src={url}
      className="h-[520px] w-full rounded-lg border bg-white"
      title="Shipping label preview"
    />
  );
}
