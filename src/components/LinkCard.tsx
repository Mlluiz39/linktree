import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit3, GripVertical, Trash2 } from "lucide-react";
import { LINK_TYPE_LABELS } from "../lib/linkTypes";
import type { Link } from "../types/link";

type LinkCardProps = {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export function LinkCard({ link, onEdit, onDelete, onToggle }: LinkCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`rounded-md border border-ink/15 bg-white p-4 transition ${isDragging ? "scale-[1.01] shadow-2xl" : "shadow-sm"}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex min-w-0 flex-1 gap-3">
          <button
            type="button"
            className="mt-1 rounded p-1 text-muted hover:bg-parchment"
            aria-label="Arrastar link"
            {...attributes}
            {...listeners}
          >
            <GripVertical size={18} />
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-semibold">{link.title}</h3>
              <span className="rounded-full bg-parchment px-2 py-1 text-xs text-muted">{LINK_TYPE_LABELS[link.type]}</span>
            </div>
            <p className="mt-1 truncate text-sm text-muted">{link.url}</p>
            <p className="mt-3 text-sm font-semibold">{link.clicks.toLocaleString("pt-BR")} cliques</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 sm:justify-end">
          <label className="inline-flex items-center gap-2 text-xs text-muted">
            <input type="checkbox" checked={link.active} onChange={() => onToggle(link.id)} />
            Ativo
          </label>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => onEdit(link)} className="rounded p-2 hover:bg-parchment" aria-label="Editar link">
              <Edit3 size={16} />
            </button>
            <button type="button" onClick={() => onDelete(link.id)} className="rounded p-2 hover:bg-parchment" aria-label="Excluir link">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
