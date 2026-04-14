"use client";

import Image from "next/image";
import { useState } from "react";
import { getCoverUrl } from "@/lib/open-library";
import { Book, BookStatus } from "@/lib/types";
import { updateBookStatus, removeBook } from "@/app/actions";

const STATUS_LABELS: Record<BookStatus, string> = {
  want_to_read: "Want to Read",
  reading: "Reading",
  finished: "Finished",
};

const STATUS_COLORS: Record<BookStatus, string> = {
  want_to_read: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  reading: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  finished: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
};

export function ShelfBookCard({ book }: { book: Book }) {
  const [status, setStatus] = useState<BookStatus>(book.status);
  const [removing, setRemoving] = useState(false);

  async function handleStatusChange(newStatus: BookStatus) {
    setStatus(newStatus);
    await updateBookStatus(book.id, newStatus);
  }

  async function handleRemove() {
    setRemoving(true);
    await removeBook(book.id);
  }

  return (
    <div className="flex gap-4 rounded-lg border border-card-border bg-card-bg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="h-36 w-24 flex-shrink-0 overflow-hidden rounded bg-accent-light">
        {book.cover_id ? (
          <Image
            src={getCoverUrl(book.cover_id)}
            alt={book.title}
            width={96}
            height={144}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-muted">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="mt-1 text-xs">No Cover</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-semibold leading-tight">{book.title}</h3>
          <p className="mt-1 text-sm text-muted">{book.author}</p>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as BookStatus)}
            className={`rounded-full px-3 py-1 text-xs font-medium border-0 cursor-pointer transition-colors ${STATUS_COLORS[status]}`}
          >
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <button
            onClick={handleRemove}
            disabled={removing}
            className="rounded-md px-2 py-1 text-sm text-muted hover:text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors dark:hover:text-red-400 dark:hover:bg-red-950"
          >
            {removing ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}
