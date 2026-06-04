import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
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
      <div className="rounded-md border border-dashed border-ink/25 bg-parchment p-8 text-center">
        <p className="font-display text-3xl">Nenhum link ainda</p>
        <p className="mt-2 text-muted">Crie o primeiro link para montar sua pagina publica.</p>
        <button type="button" onClick={onCreate} className="mt-5 rounded-md bg-ink px-4 py-3 text-sm font-semibold text-linen">
          Criar primeiro link
        </button>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={links.map((link) => link.id)} strategy={verticalListSortingStrategy}>
        <div className="grid gap-3">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
