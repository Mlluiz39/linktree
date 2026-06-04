import { ExternalLink } from "lucide-react";
import { LINK_TYPE_COLORS, LINK_TYPE_ICONS, LINK_TYPE_LABELS } from "../lib/linkTypes";
import type { Link } from "../types/link";

type PreviewPanelProps = {
  links: Link[];
};

export function PreviewPanel({ links }: PreviewPanelProps) {
  const activeLinks = links.filter((link) => link.active);

  return (
    <aside className="animate-fade-in rounded-xl bg-gradient-to-br from-ink via-ink to-[#2a2720] p-5 text-linen lg:sticky lg:top-5 lg:self-start">
      <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-linen/50">
        <span>Preview público</span>
        <span className="rounded-full bg-linen/10 px-2.5 py-1">{activeLinks.length} links</span>
      </div>

      {/* Phone frame */}
      <div className="mx-auto max-w-[320px] overflow-hidden rounded-[32px] border-2 border-linen/10 bg-parchment shadow-[0_0_60px_rgba(0,0,0,0.3)]">
        {/* Notch */}
        <div className="flex justify-center bg-parchment pt-3 pb-1">
          <div className="h-[5px] w-24 rounded-full bg-ink/15" />
        </div>

        {/* Content */}
        <div className="px-5 pb-6 pt-4 text-ink">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brass to-[#d4a853]">
              <span className="text-2xl font-bold text-white">M</span>
            </div>
            <p className="font-display text-xl">marcelo.bio</p>
            <p className="mt-1 text-xs text-muted">Links ativos e priorizados</p>
          </div>

          <div className="grid gap-2.5">
            {activeLinks.length > 0 ? activeLinks.map((link) => {
              const TypeIcon = LINK_TYPE_ICONS[link.type];
              const colors = LINK_TYPE_COLORS[link.type];
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl bg-ink px-4 py-3.5 text-sm font-medium text-linen transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${colors.bg}`}>
                    <TypeIcon size={14} className={colors.text} />
                  </span>
                  <span className="flex-1">
                    <span className="block leading-tight">{link.title}</span>
                    <span className="block text-[10px] font-normal text-linen/50">{LINK_TYPE_LABELS[link.type]}</span>
                  </span>
                  <ExternalLink size={13} className="text-linen/30 transition-colors group-hover:text-linen/60" />
                </a>
              );
            }) : (
              <div className="rounded-xl border-2 border-dashed border-ink/10 px-4 py-8 text-center">
                <p className="text-sm text-muted">Nenhum link ativo</p>
                <p className="mt-1 text-xs text-muted/60">Ative links no painel à esquerda</p>
              </div>
            )}
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center bg-parchment pb-2 pt-1">
          <div className="h-[4px] w-28 rounded-full bg-ink/20" />
        </div>
      </div>
    </aside>
  );
}
