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
      <p className="text-center text-gray-500 dark:text-gray-400">
        No results found. Try a different search.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
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
