type ToggleSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
};

export function ToggleSwitch({ checked, onChange, label, id }: ToggleSwitchProps) {
  return (
    <label className="toggle-switch" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="toggle-track" aria-hidden="true" />
      {label ? <span className="text-xs text-muted">{label}</span> : null}
    </label>
  );
}
