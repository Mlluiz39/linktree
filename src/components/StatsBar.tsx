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
      <Stat label="Cliques totais" value={totalClicks.toLocaleString("pt-BR")} />
      <Stat label="Links ativos" value={String(activeCount)} />
      <Stat label="Melhor link" value={topLink?.title ?? "Sem links"} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-ink/15 bg-linen p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-2 truncate font-display text-2xl">{value}</p>
    </div>
  );
}
