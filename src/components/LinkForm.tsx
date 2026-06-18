import { useEffect, useRef, useState } from "react";
import { LINK_TYPE_OPTIONS } from "../lib/linkTypes";
import type { Link, LinkDraft, LinkType } from "../types/link";

type LinkFormProps = {
  editingLink: Link | null;
  onSave: (draft: LinkDraft) => void;
  onClose: () => void;
};

export function LinkForm({ editingLink, onSave, onClose }: LinkFormProps) {
  const [title, setTitle] = useState(editingLink?.title ?? "");
  const [url, setUrl] = useState(editingLink?.url ?? "");
  const [type, setType] = useState<LinkType>(editingLink?.type ?? "website");
  const [selectOpen, setSelectOpen] = useState(false);
  const [error, setError] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setSelectOpen(false);
      }
    }
    if (selectOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectOpen]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedUrl = url.trim();

    if (!trimmedTitle || !trimmedUrl) {
      setError("Nome e link são obrigatórios.");
      return;
    }
    try {
      new URL(trimmedUrl);
    } catch {
      setError("Link inválido. Use um formato como https://exemplo.com");
      return;
    }

    onSave({ title: trimmedTitle, url: trimmedUrl, type, active: true });
  }

  const selected = LINK_TYPE_OPTIONS.find((o) => o.value === type) ?? LINK_TYPE_OPTIONS[0];

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col antialiased">
      <header className="flex justify-between items-center w-full px-container-margin h-16 bg-surface border-b border-border-low flex-shrink-0 relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="w-10 h-10 flex items-center justify-start text-text-secondary hover:text-on-surface transition-opacity hover:opacity-80 active:scale-95 duration-100"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 200" }}>
            close
          </span>
        </button>
        <h1 className="font-headline-md text-headline-md text-on-surface absolute left-1/2 -translate-x-1/2 pointer-events-none">
          {editingLink ? "Editar link" : "Novo link"}
        </h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 flex flex-col px-container-margin py-stack-lg max-w-md mx-auto w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
          <div className="flex flex-col gap-stack-sm">
            <label className="font-body-md text-body-md text-text-secondary" htmlFor="link-name">
              Nome
            </label>
            <input
              id="link-name"
              type="text"
              placeholder="Ex: Tutorial de edição"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
              className="w-full bg-surface border border-border-low rounded-xl px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-text-secondary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
            />
          </div>

          <div className="flex flex-col gap-stack-sm">
            <label className="font-body-md text-body-md text-text-secondary" htmlFor="link-url">
              Link
            </label>
            <input
              id="link-url"
              type="url"
              placeholder="https://"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              className="w-full bg-surface border border-border-low rounded-xl px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-text-secondary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
            />
          </div>

          <div className="flex flex-col gap-stack-sm relative" ref={selectRef}>
            <label className="font-body-md text-body-md text-text-secondary">Plataforma</label>
            <button
              type="button"
              onClick={() => setSelectOpen((v) => !v)}
              className={`w-full bg-surface border rounded-xl px-4 py-3 flex items-center justify-between transition-all ${
                selectOpen ? "border-primary-container ring-1 ring-primary-container" : "border-border-low"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-border-low flex items-center justify-center bg-transparent shrink-0">
                  <span className="material-symbols-outlined text-on-surface" style={{ fontSize: "18px" }}>
                    {selected.icon}
                  </span>
                </span>
                <span className="font-body-md text-body-md text-on-surface">{selected.label}</span>
              </span>
              <span
                className={`material-symbols-outlined text-text-secondary transition-transform duration-200 ${
                  selectOpen ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </button>

            {selectOpen ? (
              <div className="absolute top-[80px] left-0 w-full bg-surface border border-border-low rounded-xl flex flex-col overflow-hidden z-20 shadow-2xl">
                {LINK_TYPE_OPTIONS.map((option) => {
                  const isActive = option.value === type;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setType(option.value);
                        setSelectOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-3 hover:bg-surface-container transition-colors border-b border-border-low last:border-b-0 ${
                        isActive ? "bg-surface-container-highest" : ""
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-full border flex items-center justify-center bg-transparent shrink-0 ${
                          isActive ? "border-primary-container" : "border-border-low"
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined ${isActive ? "text-primary-container" : "text-text-secondary"}`}
                          style={{ fontSize: "18px" }}
                        >
                          {option.icon}
                        </span>
                      </span>
                      <span
                        className={`font-body-md text-body-md ${
                          isActive ? "text-primary-container" : "text-on-surface"
                        }`}
                      >
                        {option.label}
                      </span>
                      {isActive ? (
                        <span
                          className="material-symbols-outlined text-primary-container ml-auto"
                          style={{ fontSize: "18px" }}
                        >
                          check
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          {error ? (
            <p className="rounded-lg bg-danger/10 px-3 py-2 font-body-md text-body-md text-danger">
              {error}
            </p>
          ) : null}

          <div className="flex-1 min-h-[40px]" />

          <div className="pt-stack-md border-t border-border-low mt-auto mb-stack-md">
            <button
              type="submit"
              className="w-full bg-primary-container text-surface-container-lowest font-button text-button py-[14px] rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center"
            >
              Salvar link
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
