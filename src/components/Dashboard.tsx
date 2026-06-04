import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { loadLinks, saveLinks, sortLinks } from "../lib/linksStorage";
import type { Link } from "../types/link";
import { LinkEditorModal } from "./LinkEditorModal";
import { LinksList } from "./LinksList";
import { PreviewPanel } from "./PreviewPanel";
import { StatsBar } from "./StatsBar";

type LinkDraft = Pick<Link, "title" | "url" | "type" | "active">;

export function Dashboard() {
  const [links, setLinks] = useState<Link[]>(() => loadLinks());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  const orderedLinks = useMemo(() => sortLinks(links), [links]);

  useEffect(() => {
    saveLinks(links);
  }, [links]);

  function openCreateModal() {
    setEditingLink(null);
    setIsModalOpen(true);
  }

  function handleSave(draft: LinkDraft) {
    setLinks((currentLinks) => {
      if (editingLink) {
        return currentLinks.map((link) => link.id === editingLink.id ? { ...link, ...draft } : link);
      }
      const nextOrder = currentLinks.length;
      const newLink: Link = {
        id: crypto.randomUUID(),
        ...draft,
        clicks: 0,
        order: nextOrder,
        createdAt: new Date().toISOString()
      };
      return [...currentLinks, newLink];
    });
    setIsModalOpen(false);
    setEditingLink(null);
  }

  function handleEdit(link: Link) {
    setEditingLink(link);
    setIsModalOpen(true);
  }

  function handleDelete(id: string) {
    setLinks((currentLinks) => currentLinks.filter((link) => link.id !== id).map((link, index) => ({ ...link, order: index })));
  }

  function handleToggle(id: string) {
    setLinks((currentLinks) => currentLinks.map((link) => link.id === id ? { ...link, active: !link.active } : link));
  }

  return (
    <main className="min-h-screen bg-parchment px-4 py-5 text-ink sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted">LinkHub</p>
            <h1 className="font-display text-4xl">Links Manager</h1>
          </div>
          <button type="button" onClick={openCreateModal} className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-semibold text-linen transition hover:-translate-y-0.5">
            <Plus size={18} />
            Novo link
          </button>
        </header>

        <div className="mb-5">
          <StatsBar links={orderedLinks} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="rounded-lg border border-ink/15 bg-linen p-4">
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted">Sua ordem publica</p>
            <LinksList
              links={orderedLinks}
              onReorder={setLinks}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onCreate={openCreateModal}
            />
          </div>
          <PreviewPanel links={orderedLinks} />
        </div>
      </div>

      {isModalOpen ? (
        <LinkEditorModal editingLink={editingLink} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      ) : null}
    </main>
  );
}
