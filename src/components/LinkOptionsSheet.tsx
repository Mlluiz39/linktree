import { useState } from "react";
import { LINK_TYPE_ICONS } from "../lib/linkTypes";
import type { Link } from "../types/link";

type LinkOptionsSheetProps = {
  link: Link;
  onClose: () => void;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
};

function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function LinkOptionsSheet({ link, onClose, onEdit, onDelete }: LinkOptionsSheetProps) {
  const [view, setView] = useState<"options" | "delete">("options");

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-end">
      <div
        className="absolute inset-0 bg-background/50 animate-overlay-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        className="w-full max-w-md bg-surface rounded-t-[12px] z-10 flex flex-col animate-slide-up"
      >
        <div className="w-full flex justify-center pt-3 pb-1">
          <div className="w-12 h-[4px] bg-border-low rounded-full" />
        </div>

        <div className="px-container-margin py-stack-md flex items-center gap-4 border-b border-border-low">
          <div className="w-10 h-10 rounded-full border border-border-low flex items-center justify-center text-text-secondary shrink-0">
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
              {LINK_TYPE_ICONS[link.type]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-title-sm text-title-sm text-text-primary truncate" id="sheet-title">
              {link.title}
            </h2>
            <p className="font-caption text-caption text-text-secondary truncate">
              {displayUrl(link.url)}
            </p>
          </div>
        </div>

        {view === "options" ? (
          <div className="flex flex-col py-2">
            <button
              type="button"
              onClick={() => onEdit(link)}
              className="w-full px-container-margin py-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors text-left"
            >
              <span className="material-symbols-outlined text-text-secondary">edit</span>
              <span className="font-body-lg text-body-lg text-text-primary">Editar link</span>
            </button>
            <button
              type="button"
              onClick={() => setView("delete")}
              className="w-full px-container-margin py-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors text-left"
            >
              <span className="material-symbols-outlined text-danger">delete</span>
              <span className="font-body-lg text-body-lg text-danger">Excluir link</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col px-container-margin py-stack-lg">
            <p className="font-body-md text-body-md text-text-primary text-center mb-stack-lg">
              Tem certeza que deseja excluir este link? Esta ação não pode ser desfeita.
            </p>
            <div className="flex flex-col gap-stack-md">
              <button
                type="button"
                onClick={() => onDelete(link.id)}
                className="w-full py-3 rounded-lg bg-danger text-surface font-button text-button transition-opacity hover:opacity-90"
              >
                Excluir
              </button>
              <button
                type="button"
                onClick={() => setView("options")}
                className="w-full py-3 rounded-lg border border-text-primary text-text-primary font-button text-button transition-colors hover:bg-surface-container-low"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="h-8 w-full" />
      </div>
    </div>
  );
}
