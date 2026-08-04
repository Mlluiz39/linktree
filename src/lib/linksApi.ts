import { supabase, toLink, toDbPayload } from "./supabase";
import type { DbLink } from "./supabase";
import type { Link, LinkDraft } from "../types/link";

// ---------------------------------------------------------------------------
// Thin API layer — CRUD on the "links" table via Supabase.
// Public interface is unchanged (fetch/create/update/delete/reorder),
// so UI components do not need to know about the backend.
// RLS ensures each user only reads/writes their own rows.
// ---------------------------------------------------------------------------

const TABLE = "links";

export async function fetchLinks(): Promise<Link[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("sort", { ascending: true });
  if (error) throw error;
  return (data as unknown as DbLink[]).map(toLink);
}

export async function createLink(
  draft: LinkDraft,
  order: number,
): Promise<Link> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado.");

  const { data, error } = await supabase
    .from(TABLE)
    .insert({ ...toDbPayload(draft), user_id: user.id, sort: order, clicks: 0 })
    .select()
    .single();
  if (error) throw error;
  return toLink(data as unknown as DbLink);
}

export async function updateLink(
  id: string,
  patch: Partial<Link>,
): Promise<Link> {
  const { data, error } = await supabase
    .from(TABLE)
    .update(toDbPayload(patch))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return toLink(data as unknown as DbLink);
}

export async function deleteLink(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}

export async function reorderLinks(ids: string[]): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .upsert(ids.map((id, index) => ({ id, sort: index })));
  if (error) throw error;
}

