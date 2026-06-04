import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Link2 } from "lucide-react";
import type { Link } from "../types/link";
import { LinkCard } from "./LinkCard";

type LinksListProps = {
  links: Link[];
  onReorder: (links: Link[]) => void;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onCreate: () => void;
};

export function LinksList({ links, onReorder, onEdit, onDelete, onToggle, onCreate }: LinksListProps) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = links.findIndex((link) => link.id === active.id);
    const newIndex = links.findIndex((link) => link.id === over.id);
    const reordered = arrayMove(links, oldIndex, newIndex).map((link, index) => ({ ...link, order: index }));
    onReorder(reordered);
  }

  if (links.length === 0) {
    return (
      <div className="animate-fade-in rounded-xl border-2 border-dashed border-ink/15 bg-parchment/60 px-6 py-14 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
          <Link2 size={24} className="text-accent" />
        </div>
        <p className="font-display text-2xl">Nenhum link ainda</p>
        <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
          Crie o primeiro link para montar sua pagina publica.
        </p>
        <button
          type="button"
          onClick={onCreate}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-linen transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          Criar primeiro link
        </button>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={links.map((link) => link.id)} strategy={verticalListSortingStrategy}>
        <div className="grid gap-3">
          {links.map((link, index) => (
            <LinkCard key={link.id} link={link} index={index} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
