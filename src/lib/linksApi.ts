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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readItems("links" as any, {
      sort: ["sort"],
      limit: -1,
    }),
  );
  return (rows as unknown as DbLink[]).map(toLink);
}

export async function createLink(
  draft: LinkDraft,
  order: number,
): Promise<Link> {
  const row = await directus.request(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createItem("links" as any, {
      ...toDbPayload(draft),
      sort: order,
      clicks: 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any),
  );
  return toLink(row as unknown as DbLink);
}

export async function updateLink(
  id: string,
  patch: Partial<Link>,
): Promise<Link> {
  const row = await directus.request(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateItem("links" as any, id, toDbPayload(patch) as any),
  );
  return toLink(row as unknown as DbLink);
}

export async function deleteLink(id: string): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await directus.request(deleteItem("links" as any, id));
}

export async function reorderLinks(ids: string[]): Promise<void> {
  await Promise.all(
    ids.map((id, index) =>
      directus.request(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updateItem("links" as any, id, { sort: index } as any),
      ),
    ),
  );
}
