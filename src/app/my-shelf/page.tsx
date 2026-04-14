import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
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
  if (!userId) redirect("/");

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
