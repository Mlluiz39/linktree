import { createDirectus, rest, authentication } from "@directus/sdk";
import type { Link } from "../types/link";

// ---------------------------------------------------------------------------
// DB row shape (matches src/schema.sql)
// ---------------------------------------------------------------------------
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
// Directus client — untyped to avoid SDK v21 generic headaches
// ---------------------------------------------------------------------------
function resolveUrl(): string {
  const configured = import.meta.env.VITE_DIRECTUS_URL ?? "/directus";
  if (configured.startsWith("http")) return configured;
  return `${window.location.origin}${configured}`;
}

const directusUrl = typeof window !== "undefined" ? resolveUrl() : "http://localhost:8055";

export const directus = createDirectus(directusUrl)
  .with(authentication("cookie", { credentials: "include" }))
  .with(rest());

// ---------------------------------------------------------------------------
// Field mapping helpers
// ---------------------------------------------------------------------------

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
