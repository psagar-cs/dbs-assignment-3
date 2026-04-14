import Link from "next/link";

export function EmptyShelf() {
  return (
    <div className="py-16 text-center">
      <p className="text-lg text-gray-500 dark:text-gray-400">
        Your shelf is empty.
      </p>
      <Link
        href="/"
        className="mt-4 inline-block rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
      >
        Search for books
      </Link>
    </div>
  );
}
