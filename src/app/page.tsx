import { Suspense } from "react";
import { searchBooks } from "@/lib/open-library";
import { getUserBookKeys } from "@/app/actions";
import { SearchBar } from "@/components/search-bar";
import { SearchResults } from "@/components/search-results";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const results = q ? await searchBooks(q) : [];
  const savedKeys = await getUserBookKeys();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Find your next read</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Search millions of books and add them to your shelf.
        </p>
      </div>

      <Suspense>
        <SearchBar />
      </Suspense>

      {q && (
        <div className="mt-8">
          <SearchResults results={results} savedKeys={savedKeys} />
        </div>
      )}
    </div>
  );
}
