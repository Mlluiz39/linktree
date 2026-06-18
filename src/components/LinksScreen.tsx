import { useMemo } from "react";
import { LINK_TYPE_ICONS, LINK_TYPE_LABELS, LINK_TYPE_OPTIONS } from "../lib/linkTypes";
import type { Link, LinkType } from "../types/link";
import { BottomNav } from "./BottomNav";

type LinksScreenProps = {
  links: Link[];
  loading: boolean;
  error: string | null;
  onDismissError: () => void;
  onMore: (link: Link) => void;
  onOpenNew: () => void;
  onOpenSettings: () => void;
};

function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function LinksScreen({
  links,
  loading,
  error,
  onDismissError,
  onMore,
  onOpenNew,
  onOpenSettings,
}: LinksScreenProps) {
  const groups = useMemo(() => {
    const map = new Map<LinkType, Link[]>();
    for (const link of links) {
      const arr = map.get(link.type) ?? [];
      arr.push(link);
      map.set(link.type, arr);
    }
    const order = LINK_TYPE_OPTIONS.map((o) => o.value).filter((t) => map.has(t));
    return order.map((type) => ({
      type,
      items: (map.get(type) ?? []).slice().sort((a, b) => a.order - b.order),
    }));
  }, [links]);

  return (
    <div className="bg-background text-text-primary antialiased min-h-screen flex flex-col">
      <header className="bg-surface border-b border-border-low flex justify-between items-center w-full px-container-margin h-16 sticky top-0 z-50">
        <h1 className="font-headline-lg text-headline-lg text-text-primary">Meus links</h1>
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label="Configurações"
          className="text-text-primary hover:opacity-80 transition-opacity active:scale-95 duration-100 flex items-center justify-center p-2 rounded-full"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      {error ? (
        <div className="mx-container-margin mt-stack-md flex items-center justify-between rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-body-md text-danger">
          <span className="font-body-md">{error}</span>
          <button
            type="button"
            onClick={onDismissError}
            className="ml-3 rounded-full p-1 hover:bg-danger/20"
            aria-label="Fechar"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      ) : null}

      <main className="flex-grow flex flex-col pb-24">
        {loading ? (
          <div className="flex-grow flex items-center justify-center">
            <span
              className="material-symbols-outlined text-text-secondary animate-spin"
              style={{ fontSize: "32px" }}
            >
              progress_activity
            </span>
          </div>
        ) : groups.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center px-container-margin mt-stack-lg">
            <div className="w-20 h-20 rounded-full border border-border-low flex items-center justify-center bg-transparent mb-stack-md">
              <span
                className="material-symbols-outlined text-text-secondary"
                style={{ fontSize: "36px" }}
              >
                link
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-text-primary mb-stack-sm text-center">
              Nenhum link ainda
            </h3>
            <p className="font-body-md text-body-md text-text-secondary text-center max-w-xs">
              Toque em + para adicionar seu primeiro link.
            </p>
          </div>
        ) : (
          groups.map((group, index) => (
            <section key={group.type} className={index === 0 ? "mt-stack-lg" : "mt-stack-md"}>
              <div className="px-container-margin py-stack-sm border-b border-border-low">
                <h2 className="font-label-caps text-label-caps text-text-secondary uppercase">
                  {LINK_TYPE_LABELS[group.type]}
                </h2>
              </div>
              <ul>
                {group.items.map((link) => (
                  <li
                    key={link.id}
                    className="flex items-center px-container-margin py-stack-md border-b border-border-low w-full"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full border border-border-low flex items-center justify-center bg-transparent mr-gutter">
                      <span className="material-symbols-outlined text-text-primary">
                        {LINK_TYPE_ICONS[link.type]}
                      </span>
                    </div>
                    <div className="flex-grow flex flex-col min-w-0 pr-gutter">
                      <span className="font-title-sm text-title-sm text-text-primary truncate">
                        {link.title}
                      </span>
                      <span className="font-caption text-caption text-text-secondary truncate mt-1">
                        {displayUrl(link.url)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onMore(link)}
                      aria-label="Mais opções"
                      className="flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors p-2 -mr-2"
                    >
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </main>

      <button
        type="button"
        onClick={onOpenNew}
        aria-label="Adicionar Link"
        className="fixed bottom-24 right-container-margin w-14 h-14 bg-primary-container text-surface-dim rounded-full flex items-center justify-center hover:opacity-90 active:scale-95 transition-all z-40"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>

      <BottomNav
        active="home"
        onHome={() => {}}
        onAdd={onOpenNew}
        onProfile={onOpenSettings}
      />
    </div>
  );
}
