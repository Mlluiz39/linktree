import { X } from "lucide-react";
import { useState } from "react";
import { LINK_TYPE_OPTIONS } from "../lib/linkTypes";
import type { Link, LinkDraft, LinkType } from "../types/link";
import { ToggleSwitch } from "./ToggleSwitch";

type LinkEditorModalProps = {
  editingLink: Link | null;
  onClose: () => void;
  onSave: (draft: LinkDraft) => void;
};

export function LinkEditorModal({ editingLink, onClose, onSave }: LinkEditorModalProps) {
  const [title, setTitle] = useState(editingLink?.title ?? "");
  const [url, setUrl] = useState(editingLink?.url ?? "");
  const [type, setType] = useState<LinkType>(editingLink?.type ?? "website");
  const [active, setActive] = useState(editingLink?.active ?? true);
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedUrl = url.trim();

    if (!trimmedTitle || !trimmedUrl) {
      setError("Titulo e URL sao obrigatorios.");
      return;
    }

    try {
      new URL(trimmedUrl);
    } catch {
      setError("URL invalida. Use um formato como https://exemplo.com");
      return;
    }

    onSave({ title: trimmedTitle, url: trimmedUrl, type, active });
  }

  return (
    <div
      className="animate-overlay-in fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 py-6 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={editingLink ? "Editar link" : "Novo link"}
    >
      <form
        onSubmit={handleSubmit}
        className="animate-scale-in w-full max-w-lg rounded-xl bg-linen p-6 shadow-[0_25px_80px_rgba(29,27,22,0.25)]"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-display text-3xl">{editingLink ? "Editar link" : "Novo link"}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-muted transition-colors hover:bg-ink/10 hover:text-ink"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <label className="block text-sm font-semibold" htmlFor="link-title">Titulo</label>
        <input
          id="link-title"
          className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
          placeholder="Ex: Meu canal no YouTube"
          value={title}
          onChange={(event) => { setTitle(event.target.value); setError(""); }}
        />

        <label className="mt-5 block text-sm font-semibold" htmlFor="link-url">URL</label>
        <input
          id="link-url"
          className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
          placeholder="https://..."
          value={url}
          onChange={(event) => { setUrl(event.target.value); setError(""); }}
        />

        <label className="mt-5 block text-sm font-semibold" htmlFor="link-type">Tipo</label>
        <select
          id="link-type"
          className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
          value={type}
          onChange={(event) => setType(event.target.value as LinkType)}
        >
          {LINK_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        <div className="mt-5">
          <ToggleSwitch
            checked={active}
            onChange={setActive}
            label="Link ativo"
            id="link-active-toggle"
          />
        </div>

        {error ? (
          <p className="mt-4 rounded-lg bg-danger/10 px-3 py-2 text-sm font-medium text-danger">{error}</p>
        ) : null}

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-ink/15 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-parchment"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-linen transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
