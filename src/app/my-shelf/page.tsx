import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { getUserBooks } from "@/app/actions";
import { BookStatus } from "@/lib/types";
import { ShelfTabs } from "@/components/shelf-tabs";
import { ShelfBookCard } from "@/components/shelf-book-card";
import { EmptyShelf } from "@/components/empty-shelf";

export default async function MyShelf({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-24 text-center">
        <svg
          className="mx-auto h-16 w-16 text-muted"
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
        <h1 className="mt-6 text-3xl font-bold">My Shelf</h1>
        <p className="mt-3 text-muted">
          Sign in to view your shelf and track your reading.
        </p>
        <SignInButton>
          <button className="mt-6 rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors">
            Sign In
          </button>
        </SignInButton>
      </div>
    );
  }

  const { status } = await searchParams;
  const validStatuses: BookStatus[] = ["want_to_read", "reading", "finished"];
  const statusFilter = validStatuses.includes(status as BookStatus)
    ? (status as BookStatus)
    : undefined;

  const books = await getUserBooks(statusFilter);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">My Shelf</h1>

      <Suspense>
        <ShelfTabs />
      </Suspense>

      <div className="mt-6">
        {books.length === 0 ? (
          <EmptyShelf />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <ShelfBookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
