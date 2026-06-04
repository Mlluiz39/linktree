import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { IntroScreen } from "./components/IntroScreen";

export default function App() {
  const [route, setRoute] = useState<"intro" | "dashboard">("intro");

  if (route === "dashboard") {
    return <Dashboard />;
  }

  return <IntroScreen onOpenDashboard={() => setRoute("dashboard")} />;
}
