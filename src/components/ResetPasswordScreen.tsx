import { useState } from "react";
import { getAuthErrorMessage, updatePassword } from "../lib/auth";

type ResetPasswordScreenProps = {
  onDone: () => void;
};

export function ResetPasswordScreen({ onDone }: ResetPasswordScreenProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setInfo("");

    if (password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      await updatePassword(password);
      setInfo("Senha atualizada com sucesso!");
      setTimeout(onDone, 1200);
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-surface border border-border-low rounded-xl px-4 py-3 font-body-md text-body-md text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all";

  return (
    <div className="bg-background text-text-primary min-h-screen flex flex-col antialiased">
      <header className="flex justify-start items-center w-full px-container-margin h-16 border-b border-border-low bg-surface shrink-0">
        <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight">
          Definir nova senha
        </h1>
      </header>

      <main className="flex-1 flex flex-col px-container-margin py-stack-lg w-full max-w-md mx-auto">
        <p className="font-body-md text-body-md text-text-secondary mb-stack-lg">
          Digite uma nova senha para sua conta.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
          <div className="flex flex-col gap-stack-sm">
            <label className="font-body-md text-body-md text-text-secondary" htmlFor="reset-password">
              Nova senha
            </label>
            <input
              id="reset-password"
              type="password"
              autoComplete="new-password"
              placeholder="Mínimo de 8 caracteres"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-stack-sm">
            <label className="font-body-md text-body-md text-text-secondary" htmlFor="reset-confirm">
              Confirmar nova senha
            </label>
            <input
              id="reset-confirm"
              type="password"
              autoComplete="new-password"
              placeholder="Repita a nova senha"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                setError("");
              }}
              className={inputClass}
            />
          </div>

          {error ? (
            <p className="rounded-lg bg-danger/10 px-3 py-2 font-body-md text-body-md text-danger">
              {error}
            </p>
          ) : null}

          {info ? (
            <p className="rounded-lg bg-primary-container/10 px-3 py-2 font-body-md text-body-md text-primary">
              {info}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-stack-sm w-full bg-primary-container text-surface-container-lowest font-button text-button py-[14px] rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center disabled:opacity-60"
          >
            {loading ? "Salvando…" : "Salvar nova senha"}
          </button>
        </form>
      </main>
    </div>
  );
}
