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
        <h1 className="text-3xl font-bold">My Shelf</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Sign in to view your shelf.
        </p>
        <SignInButton>
          <button className="mt-6 rounded-md bg-gray-900 px-6 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">
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
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">My Shelf</h1>

      <Suspense>
        <ShelfTabs />
      </Suspense>

      <div className="mt-6">
        {books.length === 0 ? (
          <EmptyShelf />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {books.map((book) => (
              <ShelfBookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
