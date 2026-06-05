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
// SDK v21 generics too strict for loosely-typed schemas → cast inputs.
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const client = directus as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const C = "links" as any;

export async function fetchLinks(): Promise<Link[]> {
  const rows = await client.request(
    (readItems as any)(C, { sort: ["sort"], limit: -1 }),
  );
  return (rows as unknown as DbLink[]).map(toLink);
}

export async function createLink(
  draft: LinkDraft,
  order: number,
): Promise<Link> {
  const row = await client.request(
    (createItem as any)(C, {
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
    (updateItem as any)(C, id, toDbPayload(patch)),
  );
  return toLink(row as unknown as DbLink);
}

export async function deleteLink(id: string): Promise<void> {
  await client.request((deleteItem as any)(C, id));
}

export async function reorderLinks(ids: string[]): Promise<void> {
  await Promise.all(
    ids.map((id, index) =>
      client.request((updateItem as any)(C, id, { sort: index })),
    ),
  );
}
