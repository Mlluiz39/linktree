import {
  createItem,
  deleteItem,
  readItems,
  updateItem,
} from "@directus/sdk";
import { directus, toLink, toDbPayload } from "./directus";
import type { Link, LinkDraft } from "../types/link";
import type { DbLink } from "./directus";

// ---------------------------------------------------------------------------
// Thin API layer — replaces linksStorage.ts
// ---------------------------------------------------------------------------

export async function fetchLinks(): Promise<Link[]> {
  const rows = await directus.request(
    readItems("links" as never, {
      sort: ["sort"],
      limit: -1,
    }),
  );
  return (rows as DbLink[]).map(toLink);
}

export async function createLink(
  draft: LinkDraft,
  order: number,
): Promise<Link> {
  const row = await directus.request(
    createItem("links" as never, {
      ...toDbPayload(draft),
      sort: order,
      clicks: 0,
    } as never),
  );
  return toLink(row as DbLink);
}

export async function updateLink(
  id: string,
  patch: Partial<Link>,
): Promise<Link> {
  const row = await directus.request(
    updateItem("links" as never, id, toDbPayload(patch) as never),
  );
  return toLink(row as DbLink);
}

export async function deleteLink(id: string): Promise<void> {
  await directus.request(deleteItem("links" as never, id));
}

export async function reorderLinks(ids: string[]): Promise<void> {
  await Promise.all(
    ids.map((id, index) =>
      directus.request(
        updateItem("links" as never, id, { sort: index } as never),
      ),
    ),
  );
}
