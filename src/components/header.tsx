import Link from "next/link";
import { SignInButton, UserButton, Show } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="border-b border-card-border bg-card-bg">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-accent">
            BookShelf
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/"
              className="text-muted hover:text-foreground transition-colors"
            >
              Search
            </Link>
            <Link
              href="/my-shelf"
              className="text-muted hover:text-foreground transition-colors"
            >
              My Shelf
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <SignInButton>
              <button className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors">
                Sign In
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}
