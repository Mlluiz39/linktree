import { BarChart3, MousePointerClick, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import type { Link } from "../types/link";

type StatsBarProps = {
  links: Link[];
};

export function StatsBar({ links }: StatsBarProps) {
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const activeCount = links.filter((link) => link.active).length;
  const topLink = [...links].sort((a, b) => b.clicks - a.clicks)[0];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Stat
        icon={<MousePointerClick size={18} />}
        label="Cliques totais"
        value={totalClicks.toLocaleString("pt-BR")}
        accent="bg-accent/10 text-accent"
      />
      <Stat
        icon={<BarChart3 size={18} />}
        label="Links ativos"
        value={`${activeCount} / ${links.length}`}
        accent="bg-success/10 text-success"
      />
      <Stat
        icon={<TrendingUp size={18} />}
        label="Melhor link"
        value={topLink?.title ?? "Sem links"}
        accent="bg-warning/10 text-warning"
      />
    </div>
  );
}

function Stat({ icon, label, value, accent }: { icon: ReactNode; label: string; value: string; accent: string }) {
  return (
    <div className="animate-fade-in rounded-lg border border-ink/10 bg-linen p-4 transition-all hover:shadow-sm">
      <div className="flex items-center gap-2.5">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent}`}>
          {icon}
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{label}</p>
      </div>
      <p className="mt-3 truncate font-display text-2xl animate-counter">{value}</p>
    </div>
  );
}
