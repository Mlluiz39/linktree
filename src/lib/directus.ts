import { createDirectus, rest, authentication } from "@directus/sdk";
import type { Link } from "../types/link";

// ---------------------------------------------------------------------------
// Schema — maps frontend Link type to Directus collection shape.
// "links" collection in PostgreSQL (see src/schema.sql).
// ---------------------------------------------------------------------------
export type AppSchema = {
  links: DbLink[];
};

export type DbLink = {
  id: string;
  user_created: string | null;
  title: string;
  url: string;
  type: string;
  clicks: number;
  active: boolean;
  sort: number;
  date_created: string;
  date_updated: string | null;
};

// ---------------------------------------------------------------------------
// Lazy Directus client — only created on first use, avoids crash on import
// ---------------------------------------------------------------------------
let _client: ReturnType<typeof createDirectus<AppSchema>> | null = null;

export function getDirectus() {
  if (!_client) {
    const url = import.meta.env.VITE_DIRECTUS_URL ?? "/directus";
    _client = createDirectus<AppSchema>(url)
      .with(authentication("cookie", { credentials: "include" }))
      .with(rest());
  }
  return _client;
}

// ---------------------------------------------------------------------------
// Field mapping helpers
// ---------------------------------------------------------------------------

/** DB row → frontend Link */
export function toLink(row: DbLink): Link {
  return {
    id: row.id,
    title: row.title,
    url: row.url,
    type: row.type as Link["type"],
    clicks: row.clicks,
    active: row.active,
    order: row.sort,
    createdAt: row.date_created,
  };
}

/** Frontend Link → DB column names (for create/update payloads) */
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
