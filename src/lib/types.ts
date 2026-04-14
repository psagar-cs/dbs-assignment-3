export type BookStatus = "want_to_read" | "reading" | "finished";

export interface Book {
  id: string;
  user_id: string;
  open_library_key: string;
  title: string;
  author: string;
  cover_id: number | null;
  status: BookStatus;
  created_at: string;
  updated_at: string;
}

export interface SearchResult {
  key: string; // e.g. "/works/OL45883W"
  title: string;
  author: string;
  cover_id: number | null;
}
