"use client";

import Image from "next/image";
import { useState } from "react";
import { getCoverUrl } from "@/lib/open-library";
import { SearchResult } from "@/lib/types";
import { addBook } from "@/app/actions";

export function BookCard({
  book,
  isSaved,
  isSignedIn,
}: {
  book: SearchResult;
  isSaved: boolean;
  isSignedIn: boolean;
}) {
  const [saved, setSaved] = useState(isSaved);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd() {
    if (!isSignedIn) {
      setError("Sign in to add books to your shelf");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await addBook({
        open_library_key: book.key,
        title: book.title,
        author: book.author,
        cover_id: book.cover_id,
      });
      setSaved(true);
    } catch {
      setError("Failed to add book");
    } finally {
      setLoading(false);
    }
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
        {saved ? (
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            On your shelf
          </span>
        ) : (
          <div>
            <button
              onClick={handleAdd}
              disabled={loading}
              className="mt-2 w-fit rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-50 transition-colors"
            >
              {loading ? "Adding..." : "Add to Shelf"}
            </button>
            {error && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
