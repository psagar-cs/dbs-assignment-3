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
              ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
