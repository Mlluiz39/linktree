type BottomNavProps = {
  active: "home" | "add" | "profile";
  onHome: () => void;
  onAdd: () => void;
  onProfile: () => void;
};

export function BottomNav({ active, onHome, onAdd, onProfile }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center h-20 bg-surface border-t border-border-low">
      <NavButton icon="home" label="Início" onClick={onHome} active={active === "home"} />
      <NavButton icon="add_circle" label="Adicionar" onClick={onAdd} active={active === "add"} />
      <NavButton icon="person" label="Perfil" onClick={onProfile} active={active === "profile"} />
    </nav>
  );
}

function NavButton({
  icon,
  label,
  onClick,
  active,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
        active ? "text-primary" : "text-text-secondary hover:text-on-surface"
      }`}
    >
      <span
        className={`material-symbols-outlined mb-1 ${active ? "filled" : ""}`}
        style={active ? { fontVariationSettings: "'FILL' 1, 'wght' 400" } : undefined}
      >
        {icon}
      </span>
      <span className="font-label-caps text-label-caps sr-only">{label}</span>
    </button>
  );
}
