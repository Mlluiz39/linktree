import { X } from "lucide-react";
import { useState } from "react";
import { LINK_TYPE_OPTIONS } from "../lib/linkTypes";
import type { Link, LinkType } from "../types/link";

type LinkDraft = Pick<Link, "title" | "url" | "type" | "active">;

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
    if (!title.trim() || !url.trim()) {
      setError("Titulo e URL sao obrigatorios.");
      return;
    }
    onSave({ title: title.trim(), url: url.trim(), type, active });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/35 px-4 py-6">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-linen p-5 shadow-2xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="font-display text-3xl">{editingLink ? "Editar link" : "Novo link"}</h2>
          <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-ink/10" aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <label className="block text-sm font-semibold" htmlFor="link-title">Titulo</label>
        <input
          id="link-title"
          className="mt-2 w-full rounded-md border border-ink/20 bg-white px-3 py-3 outline-none transition focus:border-ink"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label className="mt-4 block text-sm font-semibold" htmlFor="link-url">URL</label>
        <input
          id="link-url"
          className="mt-2 w-full rounded-md border border-ink/20 bg-white px-3 py-3 outline-none transition focus:border-ink"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />

        <label className="mt-4 block text-sm font-semibold" htmlFor="link-type">Tipo</label>
        <select
          id="link-type"
          className="mt-2 w-full rounded-md border border-ink/20 bg-white px-3 py-3 outline-none transition focus:border-ink"
          value={type}
          onChange={(event) => setType(event.target.value as LinkType)}
        >
          {LINK_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        <label className="mt-4 flex items-center gap-3 text-sm font-semibold">
          <input type="checkbox" checked={active} onChange={(event) => setActive(event.target.checked)} />
          Link ativo
        </label>

        {error ? <p className="mt-4 text-sm font-semibold text-red-700">{error}</p> : null}

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-md border border-ink/25 px-4 py-2">Cancelar</button>
          <button type="submit" className="rounded-md bg-ink px-4 py-2 font-semibold text-linen">Salvar</button>
        </div>
      </form>
    </div>
  );
}
