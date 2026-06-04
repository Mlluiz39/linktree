import { useState } from "react";
import { IntroScreen } from "./components/IntroScreen";

export default function App() {
  const [route, setRoute] = useState<"intro" | "dashboard">("intro");

  if (route === "dashboard") {
    return (
      <main className="min-h-screen bg-parchment text-ink">
        <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">
          <p className="font-display text-4xl">Dashboard em construcao</p>
        </div>
      </main>
    );
  }

  return <IntroScreen onOpenDashboard={() => setRoute("dashboard")} />;
}
