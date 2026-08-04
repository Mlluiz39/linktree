import { useCallback, useEffect, useState } from "react";
import { AuthScreen } from "./components/AuthScreen";
import { IntroScreen } from "./components/IntroScreen";
import { LinkForm } from "./components/LinkForm";
import { LinkOptionsSheet } from "./components/LinkOptionsSheet";
import { LinksScreen } from "./components/LinksScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import {
  createLink as apiCreateLink,
  deleteLink as apiDeleteLink,
  fetchLinks,
  updateLink as apiUpdateLink,
} from "./lib/linksApi";
import {
  getSession,
  onAuthStateChange,
  signOut as apiSignOut,
  type AuthUser,
} from "./lib/auth";
import type { Link, LinkDraft } from "./types/link";

type Route = "links" | "new" | "edit" | "settings";
type AuthMode = "login" | "signup";

function toAuthUser(user: { id: string; email?: string | null }): AuthUser {
  return { id: user.id, email: user.email ?? "" };
}

export default function App() {
  const [route, setRoute] = useState<Route>("links");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [optionsLink, setOptionsLink] = useState<Link | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLinks();
      setLinks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar links");
      setLinks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Restore / observe the Supabase session.
  useEffect(() => {
    const unsubscribe = onAuthStateChange((session) => {
      setUser(session ? toAuthUser(session.user) : null);
    });
    getSession().then((session) => {
      setUser(session ? toAuthUser(session.user) : null);
      setAuthChecking(false);
    });
    return unsubscribe;
  }, []);

  // Load links only once we have an authenticated user.
  useEffect(() => {
    if (user) loadData();
  }, [user, loadData]);

  function openNew() {
    setEditingLink(null);
    setRoute("new");
  }

  function openEdit(link: Link) {
    setOptionsLink(null);
    setEditingLink(link);
    setRoute("edit");
  }

  async function handleSave(draft: LinkDraft) {
    try {
      if (editingLink) {
        const updated = await apiUpdateLink(editingLink.id, draft);
        setLinks((prev) => prev.map((l) => (l.id === editingLink.id ? updated : l)));
      } else {
        const created = await apiCreateLink(draft, links.length);
        setLinks((prev) => [...prev, created]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar link");
    } finally {
      setEditingLink(null);
      setRoute("links");
    }
  }

  async function handleDelete(id: string) {
    setOptionsLink(null);
    try {
      await apiDeleteLink(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir link");
      return;
    }
    setLinks((prev) =>
      prev
        .filter((l) => l.id !== id)
        .map((l, i) => ({ ...l, order: i })),
    );
  }

  async function handleLogout() {
    setAuthMode(null);
    try {
      await apiSignOut();
    } catch {
      // onAuthStateChange will clear the session state regardless.
    }
    setUser(null);
    setRoute("links");
  }

  // While the initial session is being restored, show a splash/loading state.
  if (authChecking) {
    return (
      <div className="bg-background text-text-primary min-h-screen flex items-center justify-center">
        <span
          className="material-symbols-outlined text-text-secondary animate-spin"
          style={{ fontSize: "32px" }}
        >
          progress_activity
        </span>
      </div>
    );
  }

  // Not authenticated → intro screen, or the login/signup form.
  if (!user) {
    if (authMode) {
      return (
        <AuthScreen
          mode={authMode}
          onSwitchMode={setAuthMode}
          onSuccess={() => setAuthMode(null)}
        />
      );
    }
    return (
      <IntroScreen
        onSignup={() => setAuthMode("signup")}
        onLogin={() => setAuthMode("login")}
      />
    );
  }

  if (route === "new" || route === "edit") {
    return (
      <LinkForm
        editingLink={editingLink}
        onSave={handleSave}
        onClose={() => {
          setEditingLink(null);
          setRoute("links");
        }}
      />
    );
  }

  if (route === "settings") {
    return (
      <SettingsScreen
        onBack={() => setRoute("links")}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <>
      <LinksScreen
        links={links}
        loading={loading}
        error={error}
        onDismissError={() => setError(null)}
        onMore={(link) => setOptionsLink(link)}
        onOpenNew={openNew}
        onOpenSettings={() => setRoute("settings")}
      />
      {optionsLink ? (
        <LinkOptionsSheet
          link={optionsLink}
          onClose={() => setOptionsLink(null)}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      ) : null}
    </>
  );
}
