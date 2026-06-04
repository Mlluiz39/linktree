import { ArrowRight, BarChart3, GripVertical, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

type IntroScreenProps = {
  onOpenDashboard: () => void;
};

export function IntroScreen({ onOpenDashboard }: IntroScreenProps) {
  return (
    <section className="min-h-screen bg-parchment text-ink">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-ink/15 pb-4 text-xs uppercase tracking-[0.18em]">
          <strong>LinkHub</strong>
          <span>Links Manager</span>
        </header>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.24em] text-muted">
              Identity and conversion workspace
            </p>
            <h1 className="max-w-3xl font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              Organize os links que movem sua presenca digital.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Crie, priorize e acompanhe links de redes sociais, sites e canais
              de contato em uma interface visual com drag and drop.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenDashboard}
                className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-linen shadow-[0_14px_35px_rgba(29,27,22,0.22)] transition hover:-translate-y-0.5"
              >
                Abrir dashboard
                <ArrowRight size={17} />
              </button>
              <button
                type="button"
                onClick={onOpenDashboard}
                className="rounded-md border border-ink/35 px-5 py-3 text-sm font-semibold transition hover:border-ink hover:bg-linen"
              >
                Ver preview
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-ink/15 bg-linen p-4 shadow-[0_30px_80px_rgba(29,27,22,0.14)]">
            <div className="mb-4 flex items-center justify-between text-sm">
              <strong>marcelo.bio</strong>
              <span className="text-muted">12 ativos</span>
            </div>
            <div className="grid gap-3">
              {[
                ["YouTube", "1.2k", "bg-ink text-linen"],
                ["Instagram", "864", "border border-ink/15"],
                ["WhatsApp", "311", "border border-ink/15"]
              ].map(([label, clicks, className]) => (
                <div
                  key={label}
                  className={`flex items-center justify-between rounded-md px-4 py-4 ${className}`}
                >
                  <span>{label}</span>
                  <span>{clicks}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-md bg-parchment p-4 text-sm text-muted">
              Drag para reorganizar. Toggle para publicar.
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-t border-ink/15 pt-5 sm:grid-cols-3">
          <Feature icon={<GripVertical size={18} />} title="Drag and drop" text="Ordem visual dos links" />
          <Feature icon={<BarChart3 size={18} />} title="Analytics" text="Cliques por link" />
          <Feature icon={<Sparkles size={18} />} title="Preview publico" text="Somente links ativos" />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 text-brass">{icon}</span>
      <span>
        <strong className="block">{title}</strong>
        <span className="text-sm text-muted">{text}</span>
      </span>
    </div>
  );
}
