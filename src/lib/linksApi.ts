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
//
// SDK v21 generics are too strict for loosely-typed schemas.
// We use `as any` on the client and request calls — runtime works fine.
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const client = directus as any;

export async function fetchLinks(): Promise<Link[]> {
  const rows = await client.request(
    readItems("links", { sort: ["sort"], limit: -1 }),
  );
  return (rows as unknown as DbLink[]).map(toLink);
}

export async function createLink(
  draft: LinkDraft,
  order: number,
): Promise<Link> {
  const row = await client.request(
    createItem("links", {
      ...toDbPayload(draft),
      sort: order,
      clicks: 0,
    }),
  );
  return toLink(row as unknown as DbLink);
}

export async function updateLink(
  id: string,
  patch: Partial<Link>,
): Promise<Link> {
  const row = await client.request(
    updateItem("links", id, toDbPayload(patch)),
  );
  return toLink(row as unknown as DbLink);
}

export async function deleteLink(id: string): Promise<void> {
  await client.request(deleteItem("links", id));
}

export async function reorderLinks(ids: string[]): Promise<void> {
  await Promise.all(
    ids.map((id, index) =>
      client.request(updateItem("links", id, { sort: index })),
    ),
  );
}
