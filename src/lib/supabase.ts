import { createClient } from "@supabase/supabase-js";
import type { Link, LinkType } from "../types/link";

// ---------------------------------------------------------------------------
// Supabase client — single source of truth for the backend integration.
// Configure via VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (.env).
// ---------------------------------------------------------------------------

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase config. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---------------------------------------------------------------------------
// DB row shapes (match src/schema.sql)
// ---------------------------------------------------------------------------

export type DbLink = {
  id: string;
  user_id: string;
  title: string;
  url: string;
  type: string;
  clicks: number;
  active: boolean;
  sort: number;
  created_at: string;
  updated_at: string | null;
};

export type DbProfile = {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
  created_at: string;
  updated_at: string | null;
};

// ---------------------------------------------------------------------------
// Field mapping helpers
// ---------------------------------------------------------------------------

export function toLink(row: DbLink): Link {
  return {
    id: row.id,
    title: row.title,
    url: row.url,
    type: row.type as LinkType,
    clicks: row.clicks,
    active: row.active,
    order: row.sort,
    createdAt: row.created_at,
  };
}

export function toDbPayload(
  link: Partial<Omit<Link, "id" | "createdAt">>,
): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  if (link.title !== undefined) payload.title = link.title;
  if (link.url !== undefined) payload.url = link.url;
  if (link.type !== undefined) payload.type = link.type;
  if (link.clicks !== undefined) payload.clicks = link.clicks;
  if (link.active !== undefined) payload.active = link.active;
  if (link.order !== undefined) payload.sort = link.order;
  return payload;
}
