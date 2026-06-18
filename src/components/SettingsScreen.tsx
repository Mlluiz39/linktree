import { useEffect, useState } from "react";
import { fetchCurrentUser, updateUser, type CurrentUser } from "../lib/userApi";

type SettingsScreenProps = {
  onBack: () => void;
  onLogout: () => void;
};

type EditingField = "nome" | "email" | "senha" | null;

export function SettingsScreen({ onBack, onLogout }: SettingsScreenProps) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<EditingField>(null);
  const [draftValue, setDraftValue] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCurrentUser()
      .then(setUser)
      .catch(() => setError("Não foi possível carregar seus dados."))
      .finally(() => setLoading(false));
  }, []);

  function startEdit(field: EditingField) {
    if (!user) return;
    setEditing(field);
    if (field === "nome") setDraftValue(`${user.firstName} ${user.lastName}`.trim());
    else if (field === "email") setDraftValue(user.email);
    else setDraftValue("");
  }

  async function saveEdit() {
    if (!user || !editing) return;
    setSaving(true);
    setError(null);
    try {
      if (editing === "nome") {
        const [firstName, ...rest] = draftValue.trim().split(" ");
        await updateUser({ firstName: firstName ?? "", lastName: rest.join(" ") });
        setUser({ ...user, firstName: firstName ?? "", lastName: rest.join(" ") });
      } else if (editing === "email") {
        await updateUser({ email: draftValue.trim() });
        setUser({ ...user, email: draftValue.trim() });
      } else if (editing === "senha") {
        if (draftValue.length < 8) {
          setError("A senha deve ter no mínimo 8 caracteres.");
          setSaving(false);
          return;
        }
        await updateUser({ password: draftValue });
      }
      setEditing(null);
    } catch {
      setError("Erro ao salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  const displayName = user ? `${user.firstName} ${user.lastName}`.trim() : "—";
  const initial = user?.firstName?.[0]?.toUpperCase() ?? "A";

  return (
    <div className="bg-background text-text-primary font-body-md min-h-screen flex flex-col antialiased">
      <header className="flex justify-start items-center w-full px-container-margin h-16 border-b border-border-low bg-surface shrink-0">
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar"
          className="flex items-center justify-center mr-4 hover:opacity-80 transition-opacity"
        >
          <span className="material-symbols-outlined text-text-primary">arrow_back</span>
        </button>
        <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight">
          Configurações
        </h1>
      </header>

      <main className="flex-1 flex flex-col px-container-margin py-stack-lg w-full max-w-md mx-auto">
        {loading ? (
          <div className="flex-grow flex items-center justify-center">
            <span
              className="material-symbols-outlined text-text-secondary animate-spin"
              style={{ fontSize: "32px" }}
            >
              progress_activity
            </span>
          </div>
        ) : (
          <>
            <section className="flex flex-col items-center mb-stack-lg">
              <div className="w-[88px] h-[88px] rounded-full border border-border-low flex items-center justify-center font-display text-display text-text-primary bg-surface">
                {initial}
              </div>
              <button
                type="button"
                className="mt-stack-sm font-button text-button text-primary-container hover:text-primary transition-colors py-2 px-4"
              >
                Alterar foto
              </button>
            </section>

            {error ? (
              <div className="mb-stack-md rounded-lg bg-danger/10 px-3 py-2 font-body-md text-body-md text-danger">
                {error}
              </div>
            ) : null}

            <section className="flex flex-col w-full">
              <SettingRow
                label="Nome"
                value={displayName}
                isEditing={editing === "nome"}
                draftValue={draftValue}
                saving={saving}
                onDraftChange={setDraftValue}
                onStartEdit={() => startEdit("nome")}
                onSave={saveEdit}
                onCancel={() => setEditing(null)}
              />
              <SettingRow
                label="E-mail"
                value={user?.email ?? "—"}
                isEditing={editing === "email"}
                draftValue={draftValue}
                saving={saving}
                onDraftChange={setDraftValue}
                onStartEdit={() => startEdit("email")}
                onSave={saveEdit}
                onCancel={() => setEditing(null)}
              />
              <SettingRow
                label="Senha"
                value="••••••••"
                masked
                isEditing={editing === "senha"}
                draftValue={draftValue}
                saving={saving}
                onDraftChange={setDraftValue}
                onStartEdit={() => startEdit("senha")}
                onSave={saveEdit}
                onCancel={() => setEditing(null)}
                inputType="password"
                placeholder="Nova senha"
              />
            </section>
          </>
        )}

        <div className="mt-auto pt-stack-lg pb-stack-md w-full flex justify-center">
          <button
            type="button"
            onClick={onLogout}
            className="w-full py-4 rounded-lg border border-danger text-danger bg-transparent font-button text-button text-center uppercase tracking-wider hover:bg-danger/10 transition-colors focus:ring-1 focus:ring-danger focus:outline-none"
          >
            Sair da conta
          </button>
        </div>
      </main>
    </div>
  );
}

type SettingRowProps = {
  label: string;
  value: string;
  masked?: boolean;
  isEditing: boolean;
  draftValue: string;
  saving: boolean;
  inputType?: string;
  placeholder?: string;
  onDraftChange: (value: string) => void;
  onStartEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
};

function SettingRow({
  label,
  value,
  masked = false,
  isEditing,
  draftValue,
  saving,
  inputType = "text",
  placeholder,
  onDraftChange,
  onStartEdit,
  onSave,
  onCancel,
}: SettingRowProps) {
  if (isEditing) {
    return (
      <div className="py-stack-md border-b border-border-low w-full">
        <div className="flex flex-col gap-1 mb-stack-sm">
          <span className="font-caption text-caption text-text-secondary uppercase tracking-wider">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-stack-sm">
          <input
            type={inputType}
            value={draftValue}
            placeholder={placeholder}
            autoFocus
            onChange={(e) => onDraftChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSave();
              if (e.key === "Escape") onCancel();
            }}
            className="flex-1 bg-surface border border-border-low rounded-xl px-4 py-3 font-body-md text-body-md text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
          />
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            aria-label="Salvar"
            className="flex-shrink-0 text-primary-container hover:text-primary transition-colors p-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined">check</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            aria-label="Cancelar"
            className="flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors p-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onStartEdit}
      className="flex items-center justify-between py-stack-md border-b border-border-low w-full group text-left transition-colors"
    >
      <div className="flex flex-col gap-1">
        <span className="font-caption text-caption text-text-secondary uppercase tracking-wider">
          {label}
        </span>
        <span
          className={`font-body-lg text-body-lg text-text-primary ${masked ? "tracking-[0.2em] pt-1" : ""}`}
        >
          {value}
        </span>
      </div>
      <span className="material-symbols-outlined text-text-secondary group-hover:text-text-primary transition-colors">
        edit
      </span>
    </button>
  );
}
