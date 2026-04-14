import { SearchResult } from "./types";

interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
}

interface OpenLibraryResponse {
  docs: OpenLibraryDoc[];
  numFound: number;
}

export async function searchBooks(query: string): Promise<SearchResult[]> {
  const encoded = encodeURIComponent(query);
  const res = await fetch(
    `https://openlibrary.org/search.json?q=${encoded}&limit=20&fields=key,title,author_name,cover_i`
  );

  if (!res.ok) {
    throw new Error("Failed to search Open Library");
  }

  const data: OpenLibraryResponse = await res.json();

  return data.docs.map((doc) => ({
    key: doc.key,
    title: doc.title,
    author: doc.author_name?.[0] ?? "Unknown",
    cover_id: doc.cover_i ?? null,
  }));
}

export function getCoverUrl(coverId: number, size: "S" | "M" | "L" = "M") {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}
