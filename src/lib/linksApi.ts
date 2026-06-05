import {
  createItem,
  deleteItem,
  readItems,
  updateItem,
} from "@directus/sdk";
import { getDirectus, toLink, toDbPayload } from "./directus";
import type { Link, LinkDraft } from "../types/link";
import type { DbLink } from "./directus";

// ---------------------------------------------------------------------------
// Thin API layer — replaces linksStorage.ts
// ---------------------------------------------------------------------------

/** Fetch all links, ordered by `sort` ascending */
export async function fetchLinks(): Promise<Link[]> {
  const directus = getDirectus();
  const rows = await directus.request(
    readItems("links", {
      sort: ["sort"],
      limit: -1,
    }),
  );
  return (rows as DbLink[]).map(toLink);
}

/** Create a new link. Returns the full Link with server-assigned id/date. */
export async function createLink(
  draft: LinkDraft,
  order: number,
): Promise<Link> {
  const directus = getDirectus();
  const payload = {
    ...toDbPayload(draft),
    sort: order,
    clicks: 0,
  };
  const row = await directus.request(createItem("links", payload as never));
  return toLink(row as DbLink);
}

/** Update an existing link (partial). Returns updated Link. */
export async function updateLink(
  id: string,
  patch: Partial<Link>,
): Promise<Link> {
  const directus = getDirectus();
  const payload = toDbPayload(patch);
  const row = await directus.request(
    updateItem("links", id, payload as never),
  );
  return toLink(row as DbLink);
}

/** Delete a link by id */
export async function deleteLink(id: string): Promise<void> {
  const directus = getDirectus();
  await directus.request(deleteItem("links", id));
}

/** Batch-update `sort` for every link in the ordered id list */
export async function reorderLinks(ids: string[]): Promise<void> {
  const directus = getDirectus();
  await Promise.all(
    ids.map((id, index) =>
      directus.request(updateItem("links", id, { sort: index } as never)),
    ),
  );
}
