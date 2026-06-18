import { useCallback, useEffect, useState } from "react";
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
import { seedLinks } from "./lib/seedLinks";
import type { Link, LinkDraft } from "./types/link";

type Route = "intro" | "links" | "new" | "edit" | "settings";

export default function App() {
  const [route, setRoute] = useState<Route>("intro");
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
    } catch {
      // Fallback to seed data so the catalog is visible without a backend.
      setLinks(seedLinks);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  if (route === "intro") {
    return <IntroScreen onStart={() => setRoute("links")} />;
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
        onLogout={() => {
          setRoute("intro");
          loadData();
        }}
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
