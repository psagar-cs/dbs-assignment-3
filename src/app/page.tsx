import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
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

  const { userId } = await auth();
  const results = q ? await searchBooks(q) : [];
  const savedKeys = await getUserBookKeys();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">Find your next read</h1>
        <p className="mt-3 text-lg text-muted">
          Search millions of books and add them to your shelf.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>

      {q && (
        <div className="mt-10">
          <p className="mb-4 text-sm text-muted">
            Showing results for &ldquo;{q}&rdquo;
          </p>
          <SearchResults results={results} savedKeys={savedKeys} isSignedIn={!!userId} />
        </div>
      )}
    </div>
  );
}
