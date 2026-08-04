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

export type AuthEvent =
  | "INITIAL_SESSION"
  | "SIGNED_IN"
  | "SIGNED_OUT"
  | "PASSWORD_RECOVERY"
  | "TOKEN_REFRESHED"
  | "USER_UPDATED";

export type AuthChangeCallback = (event: AuthEvent, session: Session | null) => void;

export function onAuthStateChange(callback: AuthChangeCallback): () => void {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event as AuthEvent, session);
  });
  return () => data.subscription.unsubscribe();
}

export async function resetPassword(email: string): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo:
      typeof window !== "undefined" ? window.location.origin : undefined,
  });
  if (error) throw error;
}

export async function updatePassword(password: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
}

// Maps common Supabase Auth errors to friendly PT-BR messages.
export function getAuthErrorMessage(err: unknown): string {
  const message =
    err instanceof Error && err.message ? err.message.toLowerCase() : "";
  if (message.includes("invalid login credentials"))
    return "E-mail ou senha incorretos.";
  if (message.includes("email not confirmed"))
    return "E-mail ainda não confirmado. Verifique sua caixa de entrada.";
  if (message.includes("already registered"))
    return "Este e-mail já está cadastrado. Faça login.";
  if (message.includes("at least 8 characters"))
    return "A senha deve ter no mínimo 8 caracteres.";
  if (
    message.includes("invalid email") ||
    message.includes("unable to validate")
  )
    return "Endereço de e-mail inválido.";
  if (message.includes("rate limit") || message.includes("too many"))
    return "Muitas tentativas. Tente novamente em alguns instantes.";
  return err instanceof Error && err.message
    ? err.message
    : "Não foi possível continuar.";
}

