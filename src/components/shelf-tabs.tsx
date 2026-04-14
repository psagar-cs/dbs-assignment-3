"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BookStatus } from "@/lib/types";

const TABS: { label: string; value: BookStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Want to Read", value: "want_to_read" },
  { label: "Reading", value: "reading" },
  { label: "Finished", value: "finished" },
];

export function ShelfTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("status") ?? "all";

  function handleClick(value: string) {
    if (value === "all") {
      router.push("/my-shelf");
    } else {
      router.push(`/my-shelf?status=${value}`);
    }
  }

  return (
    <div className="flex gap-2">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleClick(tab.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            current === tab.value
              ? "bg-accent text-white"
              : "bg-accent-light text-muted hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
