import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit3, ExternalLink, GripVertical, Trash2 } from "lucide-react";
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
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: link.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    animationDelay: `${index * 60}ms`,
  };

  const TypeIcon = LINK_TYPE_ICONS[link.type];
  const colors = LINK_TYPE_COLORS[link.type];

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`stagger-item overflow-hidden rounded-lg border bg-white transition-all duration-200 ${
        isDragging
          ? "scale-[1.02] border-accent/30 shadow-[0_20px_60px_rgba(99,102,241,0.15)] ring-2 ring-accent/20"
          : "border-ink/10 shadow-sm hover:shadow-md hover:border-ink/20"
      } ${!link.active ? "opacity-60" : ""}`}
    >
      <div className="flex min-w-0 items-stretch">
        {/* Drag handle */}
        <button
          type="button"
          className="flex-shrink-0 rounded-l-lg px-1.5 text-muted/40 transition-colors hover:bg-parchment hover:text-muted/70"
          aria-label="Arrastar link"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={18} />
        </button>

        {/* Clickable area — opens original URL in new tab */}
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 flex-1 items-center gap-2.5 p-2.5 no-underline sm:gap-3 sm:p-4"
          title={`Abrir ${link.title}`}
        >
          {/* Icon */}
          <div
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg sm:h-9 sm:w-9 ${colors.bg}`}
          >
            <TypeIcon size={18} className={colors.text} />
          </div>

          {/* Text content */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <h3 className="truncate text-sm font-semibold leading-tight">
                {link.title}
              </h3>
              <span
                className={`inline-block flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium leading-none ${colors.badge}`}
              >
                {LINK_TYPE_LABELS[link.type]}
              </span>
            </div>
            <p className="mt-0.5 flex items-start gap-1 text-xs text-muted">
              <ExternalLink size={11} className="mt-0.5 flex-shrink-0" />
              <span className="min-w-0 break-all">{link.url}</span>
            </p>
            <p className="mt-1 text-xs">
              <span className="font-semibold">
                {link.clicks.toLocaleString("pt-BR")}
              </span>
              <span className="text-muted"> cliques</span>
            </p>
          </div>
        </a>

        {/* Actions column */}
        <div className="flex flex-shrink-0 items-center gap-1 border-l border-ink/5 px-2 sm:px-3">
          <ToggleSwitch
            checked={link.active}
            onChange={() => onToggle(link.id)}
            id={`toggle-${link.id}`}
          />
          <button
            type="button"
            onClick={() => onEdit(link)}
            className="rounded-md p-1.5 text-muted/70 transition-colors hover:bg-parchment hover:text-ink"
            aria-label="Editar link"
          >
            <Edit3 size={15} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(link.id)}
            className="rounded-md p-1.5 text-muted/70 transition-colors hover:bg-danger/10 hover:text-danger"
            aria-label="Excluir link"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
