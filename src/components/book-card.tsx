"use client";

import Image from "next/image";
import { useState } from "react";
import { getCoverUrl } from "@/lib/open-library";
import { SearchResult } from "@/lib/types";
import { addBook } from "@/app/actions";

export function BookCard({
  book,
  isSaved,
}: {
  book: SearchResult;
  isSaved: boolean;
}) {
  const [saved, setSaved] = useState(isSaved);
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    setLoading(true);
    try {
      await addBook({
        open_library_key: book.key,
        title: book.title,
        author: book.author,
        cover_id: book.cover_id,
      });
      setSaved(true);
    } catch {
      // Could show a toast here
    } finally {
      setLoading(false);
    }
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
        {saved ? (
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            On your shelf
          </span>
        ) : (
          <button
            onClick={handleAdd}
            disabled={loading}
            className="mt-2 w-fit rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            {loading ? "Adding..." : "Add to Shelf"}
          </button>
        )}
      </div>
    </div>
  );
}
