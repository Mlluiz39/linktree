import { ArrowLeft, Eye, Loader2, Plus, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createLink as apiCreateLink,
  deleteLink as apiDeleteLink,
  fetchLinks,
  reorderLinks as apiReorderLinks,
  updateLink as apiUpdateLink,
} from "../lib/linksApi";
import type { Link, LinkDraft } from "../types/link";
import { LinkEditorModal } from "./LinkEditorModal";
import { LinksList } from "./LinksList";
import { PreviewPanel } from "./PreviewPanel";
import { StatsBar } from "./StatsBar";

type DashboardProps = {
  onBack?: () => void;
};

export function Dashboard({ onBack }: DashboardProps) {
  const [links, setLinks] = useState<Link[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Initial load ────────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLinks();
      setLinks(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar links",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ── Derived sorted list (keep for StatsBar / PreviewPanel order) ────
  const orderedLinks = useMemo(
    () => [...links].sort((a, b) => a.order - b.order),
    [links],
  );

  // ── Handlers ────────────────────────────────────────────────────────

  function openCreateModal() {
    setEditingLink(null);
    setIsModalOpen(true);
  }

  async function handleSave(draft: LinkDraft) {
    try {
      if (editingLink) {
        const updated = await apiUpdateLink(editingLink.id, draft);
        setLinks((prev) =>
          prev.map((l) => (l.id === editingLink.id ? updated : l)),
        );
      } else {
        const created = await apiCreateLink(draft, links.length);
        setLinks((prev) => [...prev, created]);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao salvar link",
      );
    } finally {
      setIsModalOpen(false);
      setEditingLink(null);
    }
  }

  function handleEdit(link: Link) {
    setEditingLink(link);
    setIsModalOpen(true);
  }

  async function handleDelete(id: string) {
    try {
      await apiDeleteLink(id);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao excluir link",
      );
      return; // don't optimistically remove
    }
    setLinks((prev) =>
      prev
        .filter((l) => l.id !== id)
        .map((l, i) => ({ ...l, order: i })),
    );
  }

  async function handleToggle(id: string) {
    const link = links.find((l) => l.id === id);
    if (!link) return;
    const nextActive = !link.active;
    // Optimistic update
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, active: nextActive } : l)),
    );
    try {
      await apiUpdateLink(id, { active: nextActive });
    } catch (err) {
      // Revert on failure
      setLinks((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, active: link.active } : l,
        ),
      );
      setError(
        err instanceof Error ? err.message : "Erro ao alternar link",
      );
    }
  }

  async function handleReorder(reordered: Link[]) {
    // Optimistic update
    setLinks(reordered);
    try {
      await apiReorderLinks(reordered.map((l) => l.id));
    } catch (err) {
      loadData(); // reload from server on failure
      setError(
        err instanceof Error ? err.message : "Erro ao reordenar links",
      );
    }
  }

  // ── Render ──────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-parchment px-4 py-5 text-ink sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="animate-fade-in mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-5">
          <div className="flex items-center gap-4">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="rounded-lg p-2 text-muted transition-colors hover:bg-linen hover:text-ink"
                aria-label="Voltar"
              >
                <ArrowLeft size={20} />
              </button>
            ) : null}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
                LinkHub
              </p>
              <h1 className="font-display text-3xl sm:text-4xl">
                Links Manager
              </h1>
            </div>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-linen shadow-[0_8px_25px_rgba(29,27,22,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(29,27,22,0.22)] disabled:opacity-50"
          >
            <Plus size={18} />
            Novo link
          </button>
        </header>

        {/* ── Error banner ─────────────────────────────────── */}
        {error ? (
          <div className="animate-fade-in mb-5 flex items-center justify-between rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError(null)}
              className="ml-3 rounded-full p-1 hover:bg-danger/20"
              aria-label="Fechar"
            >
              <X size={16} />
            </button>
          </div>
        ) : null}

        {/* ── Loading state ────────────────────────────────── */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin text-muted" />
            <span className="ml-3 text-sm text-muted">
              Carregando links...
            </span>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <StatsBar links={orderedLinks} />
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
              <div className="animate-fade-in rounded-xl border border-ink/10 bg-linen p-5">
                <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                  Sua ordem pública
                </p>
                <LinksList
                  links={orderedLinks}
                  onReorder={handleReorder}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                  onCreate={openCreateModal}
                />
              </div>
              <div className="hidden lg:block">
                <PreviewPanel links={orderedLinks} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile preview FAB */}
      <button
        type="button"
        onClick={() => setShowMobilePreview(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-linen shadow-[0_8px_30px_rgba(29,27,22,0.3)] transition-all hover:scale-105 hover:shadow-[0_12px_40px_rgba(29,27,22,0.4)] lg:hidden"
        aria-label="Abrir preview"
      >
        <Eye size={22} />
      </button>

      {/* Mobile preview drawer */}
      {showMobilePreview ? (
        <div
          className="animate-overlay-in fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm lg:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowMobilePreview(false);
          }}
        >
          <div className="animate-slide-up absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-parchment p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                Preview público
              </p>
              <button
                type="button"
                onClick={() => setShowMobilePreview(false)}
                className="rounded-full p-2 hover:bg-ink/10"
                aria-label="Fechar preview"
              >
                <X size={18} />
              </button>
            </div>
            <PreviewPanel links={orderedLinks} />
          </div>
        </div>
      ) : null}

      {isModalOpen ? (
        <LinkEditorModal
          editingLink={editingLink}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      ) : null}
    </main>
  );
}
