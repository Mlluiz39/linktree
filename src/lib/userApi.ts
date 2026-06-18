import { readMe, updateMe } from "@directus/sdk";
import { directus } from "./directus";

export type CurrentUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const client = directus as any;

export async function fetchCurrentUser(): Promise<CurrentUser> {
  const me = await client.request(
    (readMe as any)({
      fields: ["id", "first_name", "last_name", "email", "avatar"],
    }),
  );
  return {
    id: me.id,
    firstName: me.first_name ?? "",
    lastName: me.last_name ?? "",
    email: me.email ?? "",
    avatar: me.avatar ?? null,
  };
}

export async function updateUser(patch: {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}): Promise<void> {
  const payload: Record<string, unknown> = {};
  if (patch.firstName !== undefined) payload.first_name = patch.firstName;
  if (patch.lastName !== undefined) payload.last_name = patch.lastName;
  if (patch.email !== undefined) payload.email = patch.email;
  if (patch.password !== undefined) payload.password = patch.password;
  await client.request((updateMe as any)(payload));
}
