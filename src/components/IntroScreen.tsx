import { ArrowRight, BarChart3, GripVertical, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

type IntroScreenProps = {
  onOpenDashboard: () => void;
};

export function IntroScreen({ onOpenDashboard }: IntroScreenProps) {
  return (
    <section className="min-h-screen bg-parchment text-ink">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="animate-fade-in flex items-center justify-between border-b border-ink/10 pb-4 text-[11px] font-medium uppercase tracking-[0.18em]">
          <strong className="text-sm tracking-[0.14em]">LinkHub</strong>
          <span className="text-muted">Links Manager</span>
        </header>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="animate-fade-in-up">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.24em] text-accent">
              Identity and conversion workspace
            </p>
            <h1 className="max-w-3xl font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              Organize os links que movem sua presença digital.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Crie, priorize e acompanhe links de redes sociais, sites e canais
              de contato em uma interface visual com drag and drop.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenDashboard}
                className="inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3.5 text-sm font-semibold text-linen shadow-[0_14px_35px_rgba(29,27,22,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(29,27,22,0.28)]"
              >
                Abrir dashboard
                <ArrowRight size={17} />
              </button>
              <button
                type="button"
                onClick={onOpenDashboard}
                className="rounded-lg border border-ink/20 px-6 py-3.5 text-sm font-semibold transition-all hover:border-ink/40 hover:bg-linen hover:-translate-y-0.5"
              >
                Ver preview
              </button>
            </div>
          </div>

          <div className="animate-fade-in-up rounded-xl border border-ink/10 bg-linen p-5 shadow-[0_30px_80px_rgba(29,27,22,0.12)]" style={{ animationDelay: "150ms" }}>
            <div className="mb-4 flex items-center justify-between text-sm">
              <strong>marcelo.bio</strong>
              <span className="rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success-dark">12 ativos</span>
            </div>
            <div className="grid gap-2.5">
              {[
                { label: "YouTube", clicks: "1.2k", variant: "bg-ink text-linen" },
                { label: "Instagram", clicks: "864", variant: "border border-ink/10 bg-white" },
                { label: "WhatsApp", clicks: "311", variant: "border border-ink/10 bg-white" }
              ].map(({ label, clicks, variant }) => (
                <div
                  key={label}
                  className={`flex items-center justify-between rounded-lg px-4 py-4 transition-all hover:-translate-y-0.5 hover:shadow-sm ${variant}`}
                >
                  <span className="font-medium">{label}</span>
                  <span className="text-sm tabular-nums">{clicks}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-parchment/70 p-4 text-sm text-muted">
              <span className="mr-1.5">💡</span>
              Drag para reorganizar. Toggle para publicar.
            </div>
          </div>
        </div>

        <div className="animate-fade-in grid gap-4 border-t border-ink/10 pt-5 sm:grid-cols-3" style={{ animationDelay: "300ms" }}>
          <Feature icon={<GripVertical size={18} />} title="Drag and drop" text="Ordem visual dos links" />
          <Feature icon={<BarChart3 size={18} />} title="Analytics" text="Cliques por link" />
          <Feature icon={<Sparkles size={18} />} title="Preview público" text="Somente links ativos" />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-linen">
      <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">{icon}</span>
      <span>
        <strong className="block text-sm">{title}</strong>
        <span className="text-sm text-muted">{text}</span>
      </span>
    </div>
  );
}
