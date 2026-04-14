"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/client";
import { Book, BookStatus } from "@/lib/types";

export async function addBook(data: {
  open_library_key: string;
  title: string;
  author: string;
  cover_id: number | null;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const { error } = await supabase.from("books").insert({
    user_id: userId,
    open_library_key: data.open_library_key,
    title: data.title,
    author: data.author,
    cover_id: data.cover_id,
    status: "want_to_read",
  });

  if (error) {
    if (error.code === "23505") {
      throw new Error("Book already on your shelf");
    }
    throw new Error("Failed to add book");
  }

  revalidatePath("/");
  revalidatePath("/my-shelf");
}

export async function updateBookStatus(bookId: string, status: BookStatus) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("books")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", bookId)
    .eq("user_id", userId);

  if (error) throw new Error("Failed to update status");

  revalidatePath("/my-shelf");
}

export async function removeBook(bookId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("books")
    .delete()
    .eq("id", bookId)
    .eq("user_id", userId);

  if (error) throw new Error("Failed to remove book");

  revalidatePath("/");
  revalidatePath("/my-shelf");
}

export async function getUserBooks(
  statusFilter?: BookStatus
): Promise<Book[]> {
  const { userId } = await auth();
  if (!userId) return [];

  let query = supabase
    .from("books")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (statusFilter) {
    query = query.eq("status", statusFilter);
  }

  const { data, error } = await query;
  if (error) throw new Error("Failed to fetch books");

  return data as Book[];
}

export async function getUserBookKeys(): Promise<Set<string>> {
  const { userId } = await auth();
  if (!userId) return new Set();

  const { data, error } = await supabase
    .from("books")
    .select("open_library_key")
    .eq("user_id", userId);

  if (error) return new Set();

  return new Set(data.map((row) => row.open_library_key));
}
