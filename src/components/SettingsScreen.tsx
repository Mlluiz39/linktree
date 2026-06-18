type SettingsScreenProps = {
  onBack: () => void;
  onLogout: () => void;
};

export function SettingsScreen({ onBack, onLogout }: SettingsScreenProps) {
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
        <section className="flex flex-col items-center mb-stack-lg">
          <div className="w-[88px] h-[88px] rounded-full border border-border-low flex items-center justify-center font-display text-display text-text-primary bg-surface">
            A
          </div>
          <button
            type="button"
            className="mt-stack-sm font-button text-button text-primary-container hover:text-primary transition-colors py-2 px-4"
          >
            Alterar foto
          </button>
        </section>

        <section className="flex flex-col w-full">
          <SettingRow label="Nome" value="Ana Silva" />
          <SettingRow label="E-mail" value="ana.silva@example.com" />
          <SettingRow label="Senha" value="••••••••" masked />
        </section>

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

function SettingRow({
  label,
  value,
  masked = false,
}: {
  label: string;
  value: string;
  masked?: boolean;
}) {
  return (
    <button
      type="button"
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
