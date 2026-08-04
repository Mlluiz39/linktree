type IntroScreenProps = {
  onSignup: () => void;
  onLogin: () => void;
};

export function IntroScreen({ onSignup, onLogin }: IntroScreenProps) {
  return (
    <main className="w-full max-w-md mx-auto flex flex-col h-screen justify-between px-container-margin py-stack-lg">
      <div className="flex-grow" />

      <div className="flex flex-col items-center text-center pb-20">
        <div className="w-16 h-16 rounded-full border border-border-low flex items-center justify-center mb-stack-md bg-transparent">
          <span
            className="material-symbols-outlined text-text-primary"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 300", fontSize: "28px" }}
          >
            link
          </span>
        </div>

        <h1 className="font-display text-display mb-stack-sm flex items-center justify-center">
          <span className="text-text-primary">links</span>
          <span className="text-primary-container">hub</span>
        </h1>

        <p className="font-body-lg text-body-lg text-text-secondary mt-1">
          Seu catálogo pessoal de links.
        </p>
      </div>

      <div className="flex-grow" />

      <div className="flex flex-col items-center w-full mb-8">
        <button
          type="button"
          onClick={onSignup}
          className="w-full bg-primary-container text-surface-container-lowest h-[48px] rounded-xl flex items-center justify-center font-button text-button mb-stack-md transition-all hover:bg-[#E09D60] active:scale-[0.98] focus:outline-none"
        >
          Começar
        </button>
        <button
          type="button"
          onClick={onLogin}
          className="font-body-md text-body-md text-text-secondary hover:text-text-primary transition-colors py-2"
        >
          Já tenho conta
        </button>
      </div>
    </main>
  );
}
