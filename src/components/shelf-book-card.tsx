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
    <div className="flex gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <div className="h-36 w-24 flex-shrink-0 overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
        {book.cover_id ? (
          <Image
            src={getCoverUrl(book.cover_id)}
            alt={book.title}
            width={96}
            height={144}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            No Cover
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-semibold leading-tight">{book.title}</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {book.author}
          </p>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as BookStatus)}
            className="rounded-md border border-gray-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
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
            className="rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-950"
          >
            {removing ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}
