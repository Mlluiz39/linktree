import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

// ---------------------------------------------------------------------------
// Thin auth layer — wraps Supabase Auth. UI/components import only from here.
// ---------------------------------------------------------------------------

export type AuthUser = {
  id: string;
  email: string;
};

function toAuthUser(user: User): AuthUser {
  return { id: user.id, email: user.email ?? "" };
}

export type SignUpResult = {
  user: AuthUser | null;
  session: Session | null;
};

// When email confirmation is enabled in the Supabase project, signUp returns a
// user WITHOUT a session until the e-mail is verified. Handle both cases.
export async function signUp(email: string, password: string): Promise<SignUpResult> {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  if (!data.user) throw new Error("Não foi possível criar a conta.");
  return {
    user: toAuthUser(data.user),
    session: data.session,
  };
}

export async function signIn(email: string, password: string): Promise<AuthUser> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  if (!data.user) throw new Error("Não foi possível entrar.");
  return toAuthUser(data.user);
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthStateChange(
  callback: (session: Session | null) => void,
): () => void {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
  return () => data.subscription.unsubscribe();
}
