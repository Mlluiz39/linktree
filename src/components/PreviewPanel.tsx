import { LINK_TYPE_LABELS } from "../lib/linkTypes";
import type { Link } from "../types/link";

type PreviewPanelProps = {
  links: Link[];
};

export function PreviewPanel({ links }: PreviewPanelProps) {
  const activeLinks = links.filter((link) => link.active);

  return (
    <aside className="rounded-lg border border-ink/15 bg-ink p-4 text-linen">
      <div className="mx-auto max-w-sm rounded-[28px] border border-linen/20 bg-parchment p-4 text-ink">
        <div className="mb-5 text-center">
          <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-brass" />
          <p className="font-display text-2xl">marcelo.bio</p>
          <p className="text-sm text-muted">Links ativos e priorizados</p>
        </div>
        <div className="grid gap-3">
          {activeLinks.length > 0 ? activeLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              className="rounded-md bg-ink px-4 py-3 text-center text-sm font-semibold text-linen transition hover:-translate-y-0.5"
            >
              {link.title}
              <span className="block text-xs font-normal text-linen/70">{LINK_TYPE_LABELS[link.type]}</span>
            </a>
          )) : (
            <p className="rounded-md border border-ink/15 px-4 py-5 text-center text-sm text-muted">
              Nenhum link ativo no preview.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
