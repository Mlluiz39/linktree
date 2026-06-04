import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit3, GripVertical, Trash2 } from "lucide-react";
import { LINK_TYPE_COLORS, LINK_TYPE_ICONS, LINK_TYPE_LABELS } from "../lib/linkTypes";
import type { Link } from "../types/link";
import { ToggleSwitch } from "./ToggleSwitch";

type LinkCardProps = {
  link: Link;
  index: number;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export function LinkCard({ link, index, onEdit, onDelete, onToggle }: LinkCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    animationDelay: `${index * 60}ms`
  };

  const TypeIcon = LINK_TYPE_ICONS[link.type];
  const colors = LINK_TYPE_COLORS[link.type];

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`stagger-item rounded-lg border bg-white p-4 transition-all duration-200 ${
        isDragging
          ? "scale-[1.02] border-accent/30 shadow-[0_20px_60px_rgba(99,102,241,0.15)] ring-2 ring-accent/20"
          : "border-ink/10 shadow-sm hover:shadow-md hover:border-ink/20"
      } ${!link.active ? "opacity-60" : ""}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex min-w-0 flex-1 gap-3">
          <button
            type="button"
            className="mt-1 rounded-md p-1.5 text-muted/60 transition-colors hover:bg-parchment hover:text-muted"
            aria-label="Arrastar link"
            {...attributes}
            {...listeners}
          >
            <GripVertical size={18} />
          </button>

          <div className={`mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${colors.bg}`}>
            <TypeIcon size={18} className={colors.text} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-semibold leading-tight">{link.title}</h3>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${colors.badge}`}>
                {LINK_TYPE_LABELS[link.type]}
              </span>
            </div>
            <p className="mt-1 truncate text-sm text-muted">{link.url}</p>
            <p className="mt-2.5 text-sm">
              <span className="font-semibold">{link.clicks.toLocaleString("pt-BR")}</span>
              <span className="text-muted"> cliques</span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <ToggleSwitch
            checked={link.active}
            onChange={() => onToggle(link.id)}
            label={link.active ? "Ativo" : "Inativo"}
            id={`toggle-${link.id}`}
          />
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => onEdit(link)}
              className="rounded-md p-2 text-muted/70 transition-colors hover:bg-parchment hover:text-ink"
              aria-label="Editar link"
            >
              <Edit3 size={16} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(link.id)}
              className="rounded-md p-2 text-muted/70 transition-colors hover:bg-danger/10 hover:text-danger"
              aria-label="Excluir link"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
