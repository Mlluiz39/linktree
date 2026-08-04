import { useState } from "react";
import { getAuthErrorMessage, resetPassword, signIn, signUp } from "../lib/auth";

type AuthScreenProps = {
  mode: "login" | "signup";
  onSwitchMode: (mode: "login" | "signup") => void;
  onSuccess: () => void;
};

export function AuthScreen({ mode, onSwitchMode, onSuccess }: AuthScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"form" | "reset">("form");

  const isLogin = mode === "login";
  const inputClass =
    "w-full bg-surface border border-border-low rounded-xl px-4 py-3 font-body-md text-body-md text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all";

  function clearError() {
    setError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setInfo("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("Preencha e-mail e senha.");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signIn(trimmedEmail, password);
        onSuccess();
      } else {
        if (password.length < 8) {
          setError("A senha deve ter no mínimo 8 caracteres.");
          setLoading(false);
          return;
        }
        if (password !== confirm) {
          setError("As senhas não coincidem.");
          setLoading(false);
          return;
        }
        const { session } = await signUp(trimmedEmail, password);
        if (session) {
          onSuccess();
        } else {
          setInfo("Conta criada! Verifique seu e-mail para confirmar o cadastro.");
          onSwitchMode("login");
        }
      }
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setInfo("");
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Informe seu e-mail.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(trimmed);
      setInfo("Enviamos um link para redefinir sua senha. Verifique seu e-mail.");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  if (view === "reset") {
    return (
      <div className="bg-background text-text-primary min-h-screen flex flex-col antialiased">
        <header className="flex justify-start items-center w-full px-container-margin h-16 border-b border-border-low bg-surface shrink-0">
          <button
            type="button"
            onClick={() => setView("form")}
            aria-label="Voltar"
            className="flex items-center justify-center mr-4 hover:opacity-80 transition-opacity"
          >
            <span className="material-symbols-outlined text-text-primary">arrow_back</span>
          </button>
          <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight">
            Recuperar senha
          </h1>
        </header>

        <main className="flex-1 flex flex-col px-container-margin py-stack-lg w-full max-w-md mx-auto">
          <p className="font-body-md text-body-md text-text-secondary mb-stack-lg">
            Informe seu e-mail e enviaremos um link para redefinir sua senha.
          </p>

          <form onSubmit={handleReset} className="flex flex-col gap-stack-md">
            <div className="flex flex-col gap-stack-sm">
              <label className="font-body-md text-body-md text-text-secondary" htmlFor="reset-email">
                E-mail
              </label>
              <input
                id="reset-email"
                type="email"
                autoComplete="email"
                placeholder="voce@exemplo.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
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
              {loading ? "Enviando…" : "Enviar link"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setView("form")}
            className="mt-stack-lg font-button text-button text-primary-container hover:text-primary transition-colors"
          >
            Voltar para entrar
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background text-text-primary min-h-screen flex flex-col antialiased">
      <header className="flex justify-start items-center w-full px-container-margin h-16 border-b border-border-low bg-surface shrink-0">
        <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight">
          {isLogin ? "Entrar" : "Criar conta"}
        </h1>
      </header>

      <main className="flex-1 flex flex-col px-container-margin py-stack-lg w-full max-w-md mx-auto">
        <div className="flex flex-col items-center text-center mb-stack-lg">
          <div className="w-16 h-16 rounded-full border border-border-low flex items-center justify-center mb-stack-md bg-transparent">
            <span
              className="material-symbols-outlined text-text-primary"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 300", fontSize: "28px" }}
            >
              link
            </span>
          </div>
          <p className="font-body-md text-body-md text-text-secondary">
            {isLogin
              ? "Acesse seu catálogo de links."
              : "Crie sua conta para gerenciar seus links."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
          <div className="flex flex-col gap-stack-sm">
            <label className="font-body-md text-body-md text-text-secondary" htmlFor="auth-email">
              E-mail
            </label>
            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError();
              }}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-stack-sm">
            <label className="font-body-md text-body-md text-text-secondary" htmlFor="auth-password">
              Senha
            </label>
            <input
              id="auth-password"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              placeholder={isLogin ? "Sua senha" : "Mínimo de 8 caracteres"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError();
              }}
              className={inputClass}
            />
          </div>

          {isLogin ? (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setInfo("");
                  setView("reset");
                }}
                className="font-button text-button text-primary-container hover:text-primary transition-colors"
              >
                Esqueci minha senha
              </button>
            </div>
          ) : null}

          {!isLogin ? (
            <div className="flex flex-col gap-stack-sm">
              <label className="font-body-md text-body-md text-text-secondary" htmlFor="auth-confirm">
                Confirmar senha
              </label>
              <input
                id="auth-confirm"
                type="password"
                autoComplete="new-password"
                placeholder="Repita a senha"
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  clearError();
                }}
                className={inputClass}
              />
            </div>
          ) : null}

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
            {loading ? "Aguarde…" : isLogin ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <p className="mt-stack-lg text-center font-body-md text-body-md text-text-secondary">
          {isLogin ? "Ainda não tem conta?" : "Já tem uma conta?"}{" "}
          <button
            type="button"
            onClick={() => {
              setError("");
              setInfo("");
              onSwitchMode(isLogin ? "signup" : "login");
            }}
            className="font-button text-button text-primary-container hover:text-primary transition-colors"
          >
            {isLogin ? "Cadastre-se" : "Entrar"}
          </button>
        </p>
      </main>
    </div>
  );
}
