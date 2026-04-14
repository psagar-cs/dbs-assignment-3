import { SearchResult } from "@/lib/types";
import { BookCard } from "./book-card";

export function SearchResults({
  results,
  savedKeys,
  isSignedIn,
}: {
  results: SearchResult[];
  savedKeys: Set<string>;
  isSignedIn: boolean;
}) {
  if (results.length === 0) {
    return (
      <div className="py-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <p className="mt-4 text-muted">
          No results found. Try a different search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {results.map((book) => (
        <BookCard
          key={book.key}
          book={book}
          isSaved={savedKeys.has(book.key)}
          isSignedIn={isSignedIn}
        />
      ))}
    </div>
  );
}
